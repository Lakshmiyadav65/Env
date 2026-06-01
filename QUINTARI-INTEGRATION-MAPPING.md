# Enviraan ↔ Quintari (Catena-X PCF) Integration — Field Mapping

> Status: Draft v1 (2026-06-01). Built from the 4 sovity/Quintari API docs
> (Authentication, Digital Twins, Submodels, PCF) and a catalog of the
> Enviraan `PCF-BACKEND` data model (`src/models/model.ts`).

---

## 1. What we are building

The integration direction is **Enviraan → Quintari** (we push, they share over the
data space). The work is an integration module inside `PCF-BACKEND` that:

1. **Auth** — get an OAuth2 access token from Keycloak (client-credentials flow),
   cache it, and send it as `Authorization: Bearer <token>` on every call.
2. **Digital Twin** — create one twin per Enviraan product
   (`POST /api/core/digital-twins`).
3. **Submodel** — attach a PCF submodel filled with our carbon data
   (`POST /api/core/submodels`), `submodelData` = the Catena-X PCF aspect model.
4. **PCF Requests** — answer incoming partner requests by pointing to that submodel
   (`/api/pcf/requests/incoming/{bpn}/{requestId}/answer`).

Target PCF schema reference: Catena-X `io.catenax.pcf` aspect model (public, v4.0.0
used here as the field reference; exact version to confirm with sovity).

---

## 2. Layer A — Digital Twin mapping

`POST /api/core/digital-twins`

| Quintari field | Enviraan source | Status | Notes |
|---|---|---|---|
| `digitalTwinId` | (generate UUID, store on product) | ➕ ADD | persist a `quintari_twin_id` column on `product` |
| `digitalTwinType` | constant `"PartType"` | ✅ const | product-level PCF = PartType |
| `displayName.text` | `product.product_name` | ✅ map | |
| `description.text` | `product.description` | ✅ map | |
| `manufacturerId` (BPN) | — | ❌ MISSING | need a **BPN** (BPNL + 12 chars) per company; not in schema |
| `specificAssetIds[].manufacturerPartId` | `product.ts_part_number` | ✅ map | fallback `bom.material_number` |
| `specificAssetIds[].customerPartId` | — | ❌ MISSING | no customer part id today; add `customer_part_id` |
| `authorizedGroups[]` | (config / per-customer) | ➕ ADD | which BPNs may read; from integration config |

---

## 3. Layer B — Submodel envelope

`POST /api/core/submodels`

| Quintari field | Enviraan source | Status | Notes |
|---|---|---|---|
| `digitalTwinId` | `product.quintari_twin_id` | ✅ map | from Layer A |
| `submodelId` | (generate UUID) | ➕ ADD | persist a `quintari_submodel_id` per PCF result |
| `semanticId` | constant `urn:samm:io.catenax.pcf:X.Y.Z#Pcf` | ✅ const | exact version per sovity |
| `submodelData` | = the PCF object below | ✅ map | the actual payload (Section 4) |

---

## 4. Layer C — `submodelData` = Catena-X PCF aspect model (the real payload)

### 4.1 Identity & meta

| Quintari PCF field | Enviraan source | Status | Notes |
|---|---|---|---|
| `id` | (generate UUID) | ➕ ADD | one per PCF declaration |
| `specVersion` | constant (e.g. `"2.0.0"`) | ✅ const | WBCSD/Catena-X spec version |
| `version` | `bom_pcf_request.model_version` or `1` | ✅ map | integer ≥ 1 |
| `created` | `pcf_request_stages.pcf_calculated_date` | ✅ map | ISO 8601 |
| `extWBCSD_pfStatus` | `"Active"` (from `product_status`) | ✅ map | Active / Deprecated |
| `companyName` | `manufacturer.name` / `organization_name` | ✅ map | |
| `companyIds[].companyId` | `client_or_manufacturer_ids` | ⚠️ partial | must be a URI/BPN; today a free array |
| `productDescription` | `product.description` | ✅ map | |
| `productIds[].productId` | `product.product_code` / `product.id` | ✅ map | must be URI form |
| `extWBCSD_productCodeCpc` | — | ❌ MISSING | UN CPC product code; add `cpc_code` |
| `productName` | `product.product_name` | ✅ map | |
| `partialFullPcf` | `life_cycle_boundary` | ⚠️ map | normalize to `Cradle-to-gate`/`Cradle-to-grave` |

### 4.2 Unit & amount

| Quintari PCF field | Enviraan source | Status | Notes |
|---|---|---|---|
| `declaredUnit` | `product_unit` | ⚠️ map | map to enum: liter/kilogram/piece/ton kilometer/… |
| `unitaryProductAmount` | `1` (per declared unit) | ✅ const | usually 1 |
| `productMassPerDeclaredUnit` | `product.ts_weight_kg` | ✅ map | kg |

### 4.3 Geography & period

| Quintari PCF field | Enviraan source | Status | Notes |
|---|---|---|---|
| `geographyCountry` | `supplier_country` / manufacturer | ⚠️ map | convert to ISO 3166 2-letter |
| `geographyRegionOrSubregion` | EF `region` (EU/India/Global) | ⚠️ map | map to enum (Europe/Asia/Global…) |
| `referencePeriodStart` | `annual_reporting_period` start | ⚠️ map | parse FY → ISO datetime |
| `referencePeriodEnd` | `annual_reporting_period` end | ⚠️ map | parse FY → ISO datetime |

### 4.4 Standards & rules

| Quintari PCF field | Enviraan source | Status | Notes |
|---|---|---|---|
| `crossSectoralStandardsUsed[]` | `pcf_methodology_used[]` / `standards_followed_iso_14067_GHG_catena_etc` | ✅ map | map to enum: GHG Protocol / ISO 14067 / ISO 14044 |
| `productOrSectorSpecificRules[]` | `reporting_standard` | ⚠️ partial | operator (PEF/EPD) not modeled |
| `extWBCSD_characterizationFactors` | `categorized_emission_factor.data_source` | ⚠️ partial | need explicit AR5/AR6 flag |
| `extWBCSD_allocationRulesDescription` | `allocation_methodology` | ✅ map | |
| `extTFS_allocationWasteIncineration` | waste `treatment_type` | ⚠️ partial | enum: cut-off / reverse cut-off / system expansion |
| `primaryDataShare` | — | ❌ MISSING | % primary vs secondary data; add field |
| `secondaryEmissionFactorSources[]` | `categorized_emission_factor.data_source` (ecoinvent…) | ✅ map | |
| `dataQualityRating{}` | DQR rating tables | ✅ map | see 4.5 |
| `extWBCSD_packagingEmissionsIncluded` | true if `packaging_value` present | ✅ derive | boolean |

### 4.5 Data Quality Rating (Enviraan DQR → Quintari DQR)

| Quintari `dataQualityRating.*` | Enviraan DQR dimension | Status |
|---|---|---|
| `technologicalDQR` | TER (`ter_*`) | ✅ map |
| `temporalDQR` | TIR (`tir_*`) | ✅ map |
| `geographicalDQR` | GR (`gr_*`) | ✅ map |
| `completenessDQR` | C (`c_*`) | ✅ map |
| `reliabilityDQR` | PDS (`pds_*`) | ✅ map |
| `coveragePercent` | — | ❌ MISSING | derive or add |

> Note: Enviraan keeps DQR **per questionnaire question** (50+ tables). Quintari wants
> **one rating per PCF**. We'll need an aggregation rule (e.g. weighted average).

### 4.6 The carbon numbers — the main gap

Enviraan tracks emissions **by life-cycle stage**; Quintari wants them **by carbon
type**. The total maps cleanly; the breakdown does not.

| Quintari PCF field | Enviraan source | Status | Notes |
|---|---|---|---|
| `pcfExcludingBiogenic` | `bom_emission_calculation_engine.total_pcf_value` / `bom_pcf_request.overall_pcf` | ✅ map | the headline number |
| `pcfIncludingBiogenic` | — | ❌ MISSING | biogenic not split out |
| `fossilGhgEmissions` (deprecated) | ≈ total | ⚠️ derive | same as excl-biogenic |
| `biogenicCarbonEmissionsOtherThanCO2` | — | ❌ MISSING | |
| `biogenicCarbonWithdrawal` | — | ❌ MISSING | |
| `dlucGhgEmissions` / `extTFS_luGhgEmissions` | — | ❌ MISSING | land-use change |
| `aircraftGhgEmissions` | logistic engine where mode=aircraft | ⚠️ derive | filterable from transport |
| `extWBCSD_packagingGhgEmissions` | `bom_emission_calculation_engine.packaging_value` | ✅ map | |
| `distributionStagePcfExcludingBiogenic` | `bom_emission_calculation_engine.logistic_value` | ✅ map | transport leg |
| `distributionStage*` (biogenic split) | — | ❌ MISSING | same biogenic gap |
| `carbonContentTotal` / `*Biogenic` / `extWBCSD_fossilCarbonContent` | — | ❌ MISSING | |
| `exemptedEmissionsPercent` | — | ❌ MISSING | usually 0 |

> Enviraan's `material_value`, `production_value`, `waste_value` are **stage** buckets
> with no direct Quintari home (Quintari's PCF object has no per-stage material/
> production/waste fields — those are implicit in the total). They feed
> `pcfExcludingBiogenic`. Waste/packaging/transport detail can optionally go into
> `dtrMetadata` on the twin if sovity wants it exposed.

---

## 5. Fields to ADD to Enviraan (the "missing" list)

To later confirm with the client; collected here so we can add them in one pass:

1. **BPN** (`BPNL` + 12 chars) per company/manufacturer — required by almost every
   Quintari endpoint (`manufacturerId`, `bpn`, `companyIds`).
2. **`customer_part_id`** on product.
3. **`cpc_code`** (UN CPC product code) on product.
4. **Biogenic split** — at minimum `pcfIncludingBiogenic`, `biogenicCarbonWithdrawal`,
   `biogenicCarbonEmissionsOtherThanCO2`.
5. **Land-use-change emissions** (`dlucGhgEmissions`).
6. **`primaryDataShare`** (%).
7. **`coveragePercent`** for DQR (or an aggregation rule over the 50+ DQR tables).
8. **`exemptedEmissionsPercent`** (default 0) + description.
9. **Quintari linkage columns**: `quintari_twin_id`, `quintari_submodel_id`.
10. **Waste incineration allocation** as an enum (cut-off / reverse cut-off / system
    expansion).

---

## 6. Open questions for sovity / Quintari

1. **Direction confirmed?** Enviraan pushes to Quintari (not Quintari pulling from us)?
2. **PCF aspect-model version** — exact `semanticId` (`urn:samm:io.catenax.pcf:?.?.?#Pcf`)?
3. **BPN issuance** — how do we get BPNs for our companies/customers?
4. **Are stage-level breakdowns (material/production/waste) wanted** anywhere
   (e.g. `dtrMetadata`), or is only the carbon-type breakdown used?
5. **DQR aggregation** — how should our per-question DQR roll up to one rating?
6. **EDC endpoint** (`selectedEdcEndpoint`) — what value do we use?

---

## 7. Legend

✅ map = direct mapping exists · ⚠️ = mapping exists but needs transform/normalization ·
➕ ADD = new field/UUID we generate & persist · ❌ MISSING = no Enviraan equivalent, must add
