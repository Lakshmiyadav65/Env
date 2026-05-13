// Fuel Emission Factors — categorized EF database seed data.
// Mirrors the Categorized_EF_Database (Fuel) CSV.

import type { EmissionFactorRow } from "../pages/settings/CategorizedEmissionFactorsTable";

const YEAR = 2025;
const UNIT = "KgCo2e/per Liter";
const CATEGORY = "Fuel";

const ef = (n: number) => `EF_${String(n).padStart(6, "0")}`;

// EU / INDIA / GLOBAL triplet with the standard data-source pattern used for
// rows under the "Fuel" Layer1 grouping.
const triplet = (
  startId: number,
  scope: string,
  layer1: string,
  layer2: string,
  layer3: string,
  layer4: string,
  value: number
): EmissionFactorRow[] => [
  { id: ef(startId),     scope, layer1, layer2, layer3, layer4, region: "EU",     year: YEAR, efValue: value, unit: UNIT, dataSource: "UK DEFRA",                 category: CATEGORY },
  { id: ef(startId + 1), scope, layer1, layer2, layer3, layer4, region: "INDIA",  year: YEAR, efValue: value, unit: UNIT, dataSource: "Literature Average Data",  category: CATEGORY },
  { id: ef(startId + 2), scope, layer1, layer2, layer3, layer4, region: "GLOBAL", year: YEAR, efValue: value, unit: UNIT, dataSource: "Average Literature Value", category: CATEGORY },
];

// Mobile Combustion rows only carry GLOBAL + INDIA and use a different
// data-source label for the INDIA row.
const mobileCombustion = (
  startId: number,
  fuelName: string,
  globalVal: number,
  indiaVal: number
): EmissionFactorRow[] => [
  { id: ef(startId),     scope: "Scope 1", layer1: "Mobile Combustion", layer2: "Fuel Type", layer3: fuelName, layer4: "", region: "GLOBAL", year: YEAR, efValue: globalVal, unit: UNIT, dataSource: "UK DEFRA",                   category: CATEGORY },
  { id: ef(startId + 1), scope: "Scope 1", layer1: "Mobile Combustion", layer2: "Fuel Type", layer3: fuelName, layer4: "", region: "INDIA",  year: YEAR, efValue: indiaVal,  unit: UNIT, dataSource: "Regional Estimated Average", category: CATEGORY },
];

const SC1 = "Scope 1";
const OOS = "Outside of Scopes";

export const fuelEmissionFactors: EmissionFactorRow[] = [
  // Marine gas oil — only an EU row exists in source data.
  { id: ef(70), scope: SC1, layer1: "Fuel", layer2: "Liquid Fuel", layer3: "Fossil Fuel", layer4: "Marine gas oil", region: "EU", year: YEAR, efValue: 23.60958958, unit: UNIT, dataSource: "UK DEFRA", category: CATEGORY },

  // Mobile Combustion — Scope 1, GLOBAL + INDIA only.
  ...mobileCombustion(1294, "Diesel Fuel",        0.007295302, 0.007295302),
  ...mobileCombustion(1296, "Motor Gasoline",     0.007295302, 0.011832387),
  ...mobileCombustion(1298, "Aviation Gasoline",  0.011832387, 0.011832387),
  ...mobileCombustion(1300, "LNG",                0.014043689, 0.014043689),
  ...mobileCombustion(1302, "LPG",                0.014043689, 21.4988),
  ...mobileCombustion(1304, "Biodiesel (100%)",   35.76825,    35.76825),

  // Fuel / Gaseous Fuel / Fossil Fuel
  ...triplet(1,  SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "Butane",                            2.426704536),
  ...triplet(4,  SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "CNG",                               2.060371528),
  ...triplet(7,  SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "LNG",                               2.082643528),
  ...triplet(10, SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "LPG",                               2.35148876),
  ...triplet(13, SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "Natural gas",                       2.060371528),
  ...triplet(16, SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "Natural gas (100% mineral blend)",  2.082643528),
  ...triplet(19, SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "Other petroleum gas",               2.062597176),
  ...triplet(22, SC1, "Fuel", "Gaseous Fuel", "Fossil Fuel", "Propane",                           2.398105864),

  // Fuel / Liquid Fuel / Fossil Fuel
  ...triplet(25, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Aviation spirit",                       2.55495584),
  ...triplet(28, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Aviation turbine fuel",                 2.54269216),
  ...triplet(31, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Burning oil",                           2.532033448),
  ...triplet(34, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Diesel (average biofuel blend)",        2.470355696),
  ...triplet(37, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Diesel (100% mineral diesel)",          2.563129144),
  ...triplet(40, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Fuel oil",                              2.583112152),
  ...triplet(43, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Gas oil",                               2.581262872),
  ...triplet(46, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Lubricants",                            2.544799936),
  ...triplet(49, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Naphtha",                               2.51390312),
  ...triplet(52, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Petrol (average biofuel blend)",        2.21838348),
  ...triplet(55, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Petrol (100% mineral petrol)",          2.523265704),
  ...triplet(58, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Processed fuel oils - residual oil",    2.583112152),
  ...triplet(61, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Processed fuel oils - distillate oil",  2.581262872),
  ...triplet(64, SC1, "Fuel", "Liquid Fuel", "Fossil Fuel", "Refinery miscellaneous",                2.355456744),

  // Fuel / Solid Fuel / Fossil Fuel
  ...triplet(76, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Coal (industrial)",                                       1.916231952),
  ...triplet(79, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Coal (electricity generation)",                           1.780179584),
  ...triplet(82, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Coal (domestic)",                                         2.323961872),
  ...triplet(85, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Coking coal",                                             2.531720016),
  ...triplet(88, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Petroleum coke",                                          2.709257344),
  ...triplet(91, SC1, "Fuel", "Solid Fuel", "Fossil Fuel", "Coal (electricity generation - home produced coal only)", 1.77739736),

  // Fuel / Liquid Fuel / Biofuel
  ...triplet(94,  SC1, "Fuel", "Liquid Fuel", "Biofuel", "Bioethanol",                            37.588064),
  ...triplet(97,  SC1, "Fuel", "Liquid Fuel", "Biofuel", "Biodiesel ME",                          34.751712),
  // Fuel / Gaseous Fuel / Biofuel — interleaved with the above by ID range.
  ...triplet(100, SC1, "Fuel", "Gaseous Fuel", "Biofuel", "Biomethane (compressed)",              44.155112),
  ...triplet(103, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Biodiesel ME (from used cooking oil)", 37.885672),
  ...triplet(106, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Biodiesel ME (from tallow)",           0.994512),
  ...triplet(109, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Biodiesel HVO",                        130968),
  ...triplet(112, SC1, "Fuel", "Gaseous Fuel", "Biofuel", "Biopropane",                           142240),
  ...triplet(115, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Development diesel",                   2.168),
  ...triplet(118, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Development petrol",                   2224),
  ...triplet(121, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Off road biodiesel",                   0.000322281),
  ...triplet(124, SC1, "Fuel", "Gaseous Fuel", "Biofuel", "Biomethane (liquified)",               0.003710354),
  ...triplet(127, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Methanol (bio)",                       0.00669),
  ...triplet(130, SC1, "Fuel", "Liquid Fuel",  "Biofuel", "Avtur (renewable)",                    0.02531),

  // Fuel / Solid Fuel / Biomass
  ...triplet(133, SC1, "Fuel", "Solid Fuel", "Biomass", "Wood logs",    37.588064),
  ...triplet(136, SC1, "Fuel", "Solid Fuel", "Biomass", "Wood chips",   34.751712),
  ...triplet(139, SC1, "Fuel", "Solid Fuel", "Biomass", "Wood pellets", 44.155112),
  ...triplet(142, SC1, "Fuel", "Solid Fuel", "Biomass", "Grass/straw",  37.885672),

  // Fuel / Gaseous Fuel / Biogas
  ...triplet(145, SC1, "Fuel", "Gaseous Fuel", "Biogas", "Biogas", 0.994512),

  // Outside of Scopes / Fuel Emissions / Forecourt Fuels Containing Biofuel
  ...triplet(919, OOS, "Fuel Emissions", "Forecourt Fuels Containing Biofuel", "Diesel (average biofuel blend)", "-", 130968),
  ...triplet(922, OOS, "Fuel Emissions", "Forecourt Fuels Containing Biofuel", "Petrol (average biofuel blend)", "-", 142240),

  // Outside of Scopes / Fuel Emissions / Biofuel
  ...triplet(925, OOS, "Fuel Emissions", "Biofuel", "Bioethanol",                            "-", 2.168),
  ...triplet(928, OOS, "Fuel Emissions", "Biofuel", "Biodiesel ME",                          "-", 2224),
  ...triplet(931, OOS, "Fuel Emissions", "Biofuel", "Biomethane (Compressed)",               "-", 2.168),
  ...triplet(934, OOS, "Fuel Emissions", "Biofuel", "Biodiesel ME (from used cooking oil)",  "-", 2224),
  ...triplet(937, OOS, "Fuel Emissions", "Biofuel", "Biodiesel ME (from Tallow)",            "-", 2390),
  ...triplet(940, OOS, "Fuel Emissions", "Biofuel", "Biodiesel HVO",                         "-", 2430),
  ...triplet(943, OOS, "Fuel Emissions", "Biofuel", "Biopropane",                            "-", 1540),
  ...triplet(946, OOS, "Fuel Emissions", "Biofuel", "Development diesel",                    "-", 2630),
  ...triplet(949, OOS, "Fuel Emissions", "Biofuel", "Development Petrol",                    "-", 2330),
  ...triplet(952, OOS, "Fuel Emissions", "Biofuel", "Offroad bio diesel",                    "-", 2390),
  ...triplet(955, OOS, "Fuel Emissions", "Biofuel", "Biomethane (Liquified)",                "-", 2224),
  ...triplet(958, OOS, "Fuel Emissions", "Biofuel", "Methanol (bio)",                        "-", 1090),
  ...triplet(961, OOS, "Fuel Emissions", "Biofuel", "Avtur (renewable)",                     "-", 2510),
];
