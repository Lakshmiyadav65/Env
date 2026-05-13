// Electricity Emission Factors — categorized EF database seed data.
// Mirrors the Categorized_EF_Database (Electricity) CSV.

import type { EmissionFactorRow } from "../pages/settings/CategorizedEmissionFactorsTable";

const UNIT = "KgCo2e/per kWh";
const CATEGORY = "Electricity";

export const electricityEmissionFactors: EmissionFactorRow[] = [
  { id: "EF_000454", scope: "Scope 2", layer1: "Purchased Electricity",   layer2: "Grid Electricity",         layer3: "Electricity: UK",         layer4: "Electricity generated", region: "EU",     year: 2025, efValue: 0.177,       unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_000455", scope: "Scope 2", layer1: "Purchased Electricity",   layer2: "Grid Electricity",         layer3: "Electricity",             layer4: "Electricity generated", region: "INDIA",  year: 2025, efValue: 0.445,       unit: UNIT, dataSource: "CEA",                       category: CATEGORY },
  { id: "EF_000456", scope: "Scope 2", layer1: "Purchased Electricity",   layer2: "Grid Electricity",         layer3: "Electricity",             layer4: "Electricity generated", region: "GLOBAL", year: 2025, efValue: 0.177,       unit: UNIT, dataSource: "Average Literature Value",  category: CATEGORY },

  { id: "EF_000643", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "Onsite heat and steam",   layer4: "-",                     region: "EU",     year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_000644", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "Onsite heat and steam",   layer4: "-",                     region: "INDIA",  year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "Literature Average Data",   category: CATEGORY },
  { id: "EF_000645", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "Onsite heat and steam",   layer4: "-",                     region: "GLOBAL", year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "Average Literature Value",  category: CATEGORY },

  { id: "EF_000646", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "District heat and steam", layer4: "-",                     region: "EU",     year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_000647", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "District heat and steam", layer4: "-",                     region: "INDIA",  year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "Literature Average Data",   category: CATEGORY },
  { id: "EF_000648", scope: "Scope 2", layer1: "Purchased Heat & Steam",  layer2: "Heat and Steam",           layer3: "District heat and steam", layer4: "-",                     region: "GLOBAL", year: 2025, efValue: 0.17355,     unit: UNIT, dataSource: "Average Literature Value",  category: CATEGORY },

  { id: "EF_001000", scope: "Scope 3", layer1: "Electricity Generated",   layer2: "Grid Electricity",         layer3: "Electricity generated",   layer4: "-",                     region: "EU",     year: 2025, efValue: 0.17489,     unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001001", scope: "Scope 3", layer1: "Electricity Generated",   layer2: "Grid Electricity",         layer3: "Electricity generated",   layer4: "-",                     region: "INDIA",  year: 2025, efValue: 0.17489,     unit: UNIT, dataSource: "Literature Average Data",   category: CATEGORY },
  { id: "EF_001002", scope: "Scope 3", layer1: "Electricity Generated",   layer2: "Grid Electricity",         layer3: "Electricity generated",   layer4: "-",                     region: "GLOBAL", year: 2025, efValue: 0.17489,     unit: UNIT, dataSource: "Average Literature Value",  category: CATEGORY },

  { id: "EF_001324", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "US Average",              layer4: "",                      region: "GLOBAL", year: 2025, efValue: 0.34987525,  unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001325", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "US Average",              layer4: "",                      region: "INDIA",  year: 2025, efValue: 0.34987525,  unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },
  { id: "EF_001326", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "WECC California",         layer4: "",                      region: "GLOBAL", year: 2025, efValue: 0.19804345,  unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001327", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "WECC California",         layer4: "",                      region: "INDIA",  year: 2025, efValue: 0.19804345,  unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },
  { id: "EF_001328", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "ERCOT All",               layer4: "",                      region: "GLOBAL", year: 2025, efValue: 0.334683,    unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001329", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "ERCOT All",               layer4: "",                      region: "INDIA",  year: 2025, efValue: 0.334683,    unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },
  { id: "EF_001330", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "NPCC Upstate NY",         layer4: "",                      region: "GLOBAL", year: 2025, efValue: 0.1092935,   unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001331", scope: "Scope 2", layer1: "Electricity",             layer2: "eGRID Subregion",          layer3: "NPCC Upstate NY",         layer4: "",                      region: "INDIA",  year: 2025, efValue: 0.1092935,   unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },

  { id: "EF_001332", scope: "Scope 2", layer1: "Steam and Heat",          layer2: "Purchased Steam and Heat", layer3: "Steam and Heat",          layer4: "",                      region: "GLOBAL", year: 2025, efValue: 0.225841928, unit: UNIT, dataSource: "UK DEFRA",                  category: CATEGORY },
  { id: "EF_001333", scope: "Scope 2", layer1: "Steam and Heat",          layer2: "Purchased Steam and Heat", layer3: "Steam and Heat",          layer4: "",                      region: "INDIA",  year: 2025, efValue: 0.225841928, unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },
];
