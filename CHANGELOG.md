# Frontend Changelog — 2026-05-15 → 2026-05-25

34 commits, 31 files touched, +1,461 / −999 lines net.

The work over this window was almost entirely UI/UX-driven and split into six themes:
navigation polish, a branded loader system, a DQR assessment overhaul, toolbar
consistency across list pages, a unified header treatment, and tile content fills.
No backend contracts changed; no breaking API or routing changes; no behavioural
regressions reported.

---

## Summary

### 🧭 Navigation & scroll behaviour
- **Settings scroll restoration** — `40d70d5` saves the Settings page scroll
  position to `sessionStorage` on card click and restores it on remount so users
  return to where they left off.
- **Route scroll-to-top** — `79f2671` adds a `useLayoutEffect` in `Layout.tsx`
  that resets the `<main>` scrollTop on every pathname change (excepted when
  Settings has a saved position to restore).
- **Back-to-Settings arrows** — `658fc8a` adds the standard arrow button on
  Manage Users, Authorizations, and Alert Management so users aren't dependent
  on the sidebar for navigation.
- **Centered Suspense fallback** — `4f88ff2` wraps the lazy-route loader in a
  `min-h-[60vh] flex items-center justify-center` container so the spinner no
  longer pins to the top-left of the content area.

### ✨ Branded loading spinner
- **Enviraan logo loader** — `7a937fc` introduces an SVG logo + arc loader in
  `LoadingSpinner.tsx`; later refined down to the small dual-arc form in
  `55ebcef` and `c211716`.
- **Roll-out** — `811537b` and `a1af1f2` migrate ~18 files away from Ant Design's
  default Spin indicator and Lucide `Loader2` icons to the branded
  `<LoadingSpinner />`. Full-page loaders use `size="lg"` with contextual labels
  ("Loading PCF data…", "Loading product…"); section overlays pass the spinner
  to `<Spin indicator={...}>`. Small inline button spinners (download / refresh)
  intentionally left as Lucide icons.
- **Sidebar logo animation** — explored a 3D sway + heartbeat (`bff9bcf`) and a
  one-shot grow reveal (`263326d`); both reverted in `33b5dfd` per user request
  — the sidebar logo is now plain static.

### 🧪 Data Quality Rating overhaul
- **Pill-group selectors** — `d3b9178` replaces every `<select>` dropdown in the
  DQR assessment (TeR / TiR / GR / PDS / C dimensions) with horizontal flex-wrap
  pill button groups via a `PillGroup` helper. One click instead of two; all
  options visible upfront.
- **Centered modal** — `b72ce98` lifts the assessment out of a 35%-wide right
  drawer into a `max-w-6xl` centered modal where the five DQI cards arrange in a
  responsive `lg:grid-cols-2` grid so a fully-answered question fits without
  scroll.
- **z-index fix** — `1ddc084` raises the modal overlay to `z-[60]` so it sits
  above the sidebar's `z-50` instead of being clipped by it.
- **Data Details grid** — `00cdc3f` lays the modal header's Data Details out as
  a 2/4-column grid instead of a stacked list, halving the header height.

### 🧰 List-page toolbar consistency
The All Products toolbar was iterated on through `ad81de9` → `b9494ac` →
`11ed4f6` → `39035b8` to land on a split layout (heading + primary action on
top, search/date/filters on a row below, every control 44 px tall with `flex-1`
search and fixed-width filters). `7a1e8cb` rolls the same pattern out to PCF
Request, Task Management, Document Master, Components Master, and the Data
Quality Ratings list — all five now share the exact same toolbar shape.

### 📊 Hero KPI + status share grid (list-page headers)
- **PCF Request** — `28511b2` replaced seven equal pastel chips with a dark
  slate hero card (`Total + Resolution Rate`) plus a 3×2 grid of compact status
  tiles where each tile shows count, share of total, and a mini progress bar in
  its status color.
- **Donut chart side-experiment** — `3211eda` rebuilt the header as an SVG donut
  + legend; reverted in `5487f71` per user preference.
- **Cascade** — `d974fa8` applied the hero + tile grid pattern to Task
  Management, Document Master, Components Master, Data Quality Ratings, and
  Supplier Questionnaires. Each gets its own derived KPI (Completion Rate /
  Approval Rate) and status mix.
- **All Products promotion** — `8f84808` swapped All Products' chip-only header
  for the full hero + tile grid (Total Products + PCF Coverage; PCF Available /
  In Progress / Not Available tiles).

### 🪟 Non-list-page header polish
- **Settings** — `45720e5` merges the title card and the separate search row
  into one hero card with three stat chips (accessible Categories, total
  Settings, signed-in Role) and an integrated full-width search input.
- **Reports** — `a77ecec` wraps the Reports banner in the same emerald + green
  corner blurs and adds three chips (total Reports, Favorites count with a star
  that lights up, active sidebar tab).
- **All Products chips → grid** — `859c6a9` first added stat chips, then
  `8f84808` upgraded the header to the full hero + tile grid.

### 🧱 Tile content fills (no more empty whitespace)
- **PCF Request Status Mix** — `16892bf` added a mini stacked status bar inside
  the hero card; `001da51` removed it per user request — hero is back to just
  Total + Resolution Rate.
- **All Products status tiles** — `8278c5e` filled the empty area below each
  tile's progress bar with a short description and a "View products →" affordance
  that filters the table by that status when clicked. Tile is now a `<button>`.
- **All other list-page tiles** — `d2c4adc` applied the same description
  treatment to Components Master, Document Master, Task Management, and Data
  Quality Ratings. Components Master and Document Master also get the
  click-to-filter button behaviour; Task Management and DQR get descriptions
  only (no status filter exists in their state).

---

## File-by-file deltas

| File | + / − | Theme |
|---|---|---|
| `src/components/Layout.tsx` | +18 / −2 | Scroll-to-top on route change |
| `src/components/LoadingSpinner.tsx` | ~entirely rewritten | Branded loader |
| `src/components/Sidebar.tsx` | +2 / 0 | Logo animation experiments (reverted) |
| `src/components/ProtectedRoute.tsx` | minor | Loader migration |
| `src/index.css` | +12 | `enviraan-pulse` keyframe for loader |
| `src/routes/index.tsx` | +9 / −1 | Centered Suspense fallback |
| `src/pages/Settings.tsx` | +73 / −25 | Hero + stat chips + integrated search |
| `src/pages/Reports.tsx` | +39 / −9 | Stat chips + emerald glow |
| `src/pages/AllProducts.tsx` | +263 / −38 | Toolbar + hero grid + filterable tiles |
| `src/pages/PCFRequest.tsx` | +260 / −126 | Toolbar + hero grid + loader |
| `src/pages/TaskManagement.tsx` | +148 / −61 | Hero grid + toolbar + tile descriptions |
| `src/pages/DocumentMaster.tsx` | +156 / −60 | Hero grid + toolbar + filterable tiles |
| `src/pages/ComponentsMaster.tsx` | +172 / −94 | Hero grid + toolbar + filterable tiles |
| `src/pages/DataQualityRatingList.tsx` | +109 / −42 | Hero grid + toolbar + tile descriptions |
| `src/pages/SupplierQuestionnaireList.tsx` | +80 / −56 | Hero grid |
| `src/pages/DataQualityRating.tsx` | +231 / −182 | Pill-group + centered modal + Data Details grid |
| `src/pages/ProductView.tsx` | +6 / −5 | Loader migration |
| `src/pages/ProductCreate.tsx` / `ProductEdit.tsx` / `TaskCreate.tsx` / `TaskView.tsx` / `PCFRequestEdit.tsx` / `PCFRequestView.tsx` / `ComponentsMasterView.tsx` | minor (2-7 lines each) | Loader migration |
| `src/pages/settings/AlertManagement.tsx` / `Authorizations.tsx` / `Users.tsx` | +7-11 each | Back-to-Settings arrows, loader migration |
| `src/pages/settings/AlertManagementCreate.tsx` / `ManufacturerOnboardingForm.tsx` / `SupplierOnboardingForm.tsx` | minor | Loader migration |
| `src/features/supplier-questionnaire/SupplierQuestionnaire.tsx` / `QuestionnairePreviewModal.tsx` | +6 / −4 | Loader migration |

---

## Bug fixes worth calling out

- **DQR modal clipped behind sidebar** (`1ddc084`) — modal overlay was at `z-40`
  while the sidebar uses `z-50`; raised to `z-[60]`.
- **Suspense fallback pinned to top-left** (`4f88ff2`) — wrapped in a centering
  flex container.
- **All Products toolbar wrapping mid-row** (`11ed4f6`) — Tailwind arbitrary
  widths weren't winning the cascade against Ant's affix-wrapper defaults;
  switched to inline `style={{ width }}` and removed `overflow-x-auto`.
- **Sub-pages opening scrolled** (`79f2671`) — `<main>` scrollTop persisted
  across route changes; now reset on every pathname change.
- **Duplicate spinners on tables** (`a1af1f2` and earlier) — `<Spin>` wrapper
  AND `<Table loading>` were both rendering indicators; removed the redundant
  `loading` prop on Table when Spin is wrapping.

---

## Visual signature established across the suite

Every list-page and dashboard-style header now shares:
1. A soft emerald + green corner blur (top-right) and optional secondary
   indigo/blue blur (bottom-left)
2. A 12 px gradient `from-green-500 to-green-600` icon block with green-500/30
   shadow
3. A `text-2xl font-bold` title + `text-sm text-gray-500` subtitle
4. Either a hero KPI card (dark slate with green KPI rate bar) + compact status
   tile grid, or a row of small color-coded stat chips
5. Status tiles with: icon-and-label / large tabular number / mini progress bar
   in status color / short description / optional "View →" action that
   filters the table

The same vocabulary now reads as one product instead of seven independent
screens.
