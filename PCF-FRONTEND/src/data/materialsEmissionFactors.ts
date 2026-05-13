// Categorized EF Database — Materials Emission Factors (static, read-only)
// Each material has 3 consecutive IDs corresponding to EU / IN / GLOBAL regions.
// Source: Categorized_EF_Database.pdf

export type Region = "EU" | "IN" | "GLOBAL";

export interface MaterialEFRow {
  id: string;
  scope: string;
  layer1: string;
  layer2: string;
  layer3: string;
  layer4: string;
  region: Region;
  year: number;
  efValue: number;
  unit: string;
  dataSource: string;
  category: string;
}

interface MaterialDef {
  startId: number; // numeric part of EF_xxxxxx for the EU row; +1 = IN, +2 = GLOBAL
  layer1: string;
  layer2: string;
  layer3: string;
  layer4: string;
  eu: number;
  in: number;
  global: number;
}

const SCOPE = "Scope 3";
const YEAR = 2024;
const UNIT = "KgCo2e/per kg";
const DATA_SOURCE = "Secondary literature / avg";
const CATEGORY = "Packaging";

// Layer1 = "Material Emissions" (Polymers / Plastic & Resin)
const materialEmissions: MaterialDef[] = [
  { startId: 1937, layer1: "Material Emissions", layer2: "Polypropylene (PP)",                 layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1940, layer1: "Material Emissions", layer2: "Polyethylene (PE)",                  layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1943, layer1: "Material Emissions", layer2: "High Density Polyethylene (HDPE)",   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1946, layer1: "Material Emissions", layer2: "Low Density Polyethylene (LDPE)",    layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1949, layer1: "Material Emissions", layer2: "Polyvinyl Chloride (PVC)",           layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1952, layer1: "Material Emissions", layer2: "Acrylonitrile Butadiene Styrene (ABS)", layer3: "Polymer", layer4: "Plastic & Resin", eu: 4.5,  in: 5.5,  global: 5   },
  { startId: 1955, layer1: "Material Emissions", layer2: "Polycarbonate (PC)",                 layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1958, layer1: "Material Emissions", layer2: "Nylon / Polyamide (PA)",             layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1961, layer1: "Material Emissions", layer2: "Polyurethane (PU)",                  layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1964, layer1: "Material Emissions", layer2: "Polystyrene (PS)",                   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1967, layer1: "Material Emissions", layer2: "Polyethylene Terephthalate (PET)",   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1970, layer1: "Material Emissions", layer2: "Thermoplastic Elastomers (TPE)",     layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1973, layer1: "Material Emissions", layer2: "Polyoxymethylene (POM)",             layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1976, layer1: "Material Emissions", layer2: "Epoxy Resins",                       layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1985, layer1: "Material Emissions", layer2: "Polyether Ether Ketone (PEEK)",      layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1988, layer1: "Material Emissions", layer2: "Polyphenylene Sulfide (PPS)",        layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1991, layer1: "Material Emissions", layer2: "Polyetherimide (PEI)",               layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1994, layer1: "Material Emissions", layer2: "Polyamide-imide (PAI)",              layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 1997, layer1: "Material Emissions", layer2: "Liquid Crystal Polymer (LCP)",       layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2006, layer1: "Material Emissions", layer2: "TPU (Thermoplastic Polyurethane)",   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2012, layer1: "Material Emissions", layer2: "Acetal Resin",                       layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2015, layer1: "Material Emissions", layer2: "Phenolic Resin",                     layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2018, layer1: "Material Emissions", layer2: "Melamine Resin",                     layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2021, layer1: "Material Emissions", layer2: "Vinyl Ester Resin",                  layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2024, layer1: "Material Emissions", layer2: "Unsaturated Polyester Resin",        layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2027, layer1: "Material Emissions", layer2: "Fluoropolymers",                     layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2030, layer1: "Material Emissions", layer2: "Polyvinylidene Fluoride (PVDF)",     layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2033, layer1: "Material Emissions", layer2: "Polybutylene Terephthalate (PBT)",   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2036, layer1: "Material Emissions", layer2: "Polyethersulfone (PES)",             layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2039, layer1: "Material Emissions", layer2: "Polyimide",                          layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2042, layer1: "Material Emissions", layer2: "Thermoset Plastics",                 layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2075, layer1: "Material Emissions", layer2: "Polybutadiene Rubber (BR)",          layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2081, layer1: "Material Emissions", layer2: "Polyurethane Rubber",                layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2090, layer1: "Material Emissions", layer2: "Thermoplastic Vulcanizates (TPV)",   layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2441, layer1: "Material Emissions", layer2: "Ion Exchange Resin",                 layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2471, layer1: "Material Emissions", layer2: "Carpets",                            layer3: "Polymer", layer4: "Plastic & Resin", eu: 4.5,  in: 5.5,  global: 5   },
  { startId: 2480, layer1: "Material Emissions", layer2: "Dashboard Polymers",                 layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2498, layer1: "Material Emissions", layer2: "Polyurethane Skin",                  layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2501, layer1: "Material Emissions", layer2: "Thermoplastic Olefin (TPO)",         layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2534, layer1: "Material Emissions", layer2: "Reinforced Plastics",                layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2546, layer1: "Material Emissions", layer2: "Glass Fiber Reinforced Polymer (GFRP)",  layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
  { startId: 2549, layer1: "Material Emissions", layer2: "Carbon Fiber Reinforced Polymer (CFRP)", layer3: "Polymer", layer4: "Plastic & Resin", eu: 22.5, in: 27.5, global: 25  },
  { startId: 2576, layer1: "Material Emissions", layer2: "Thermoplastic Composites",           layer3: "Polymer", layer4: "Plastic & Resin", eu: 2.7,  in: 3.3,  global: 3   },
];

// Layer1 = "Packaging Materials" / Paper-Based
const paperPackaging: MaterialDef[] = [
  { startId: 2711, layer1: "Packaging Materials", layer2: "Corrugated Boxes",        layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2714, layer1: "Packaging Materials", layer2: "Carton Boxes",            layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2717, layer1: "Packaging Materials", layer2: "Paper Wraps",             layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2720, layer1: "Packaging Materials", layer2: "Kraft Paper",             layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2723, layer1: "Packaging Materials", layer2: "Paper Tubes",             layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2726, layer1: "Packaging Materials", layer2: "Honeycomb Paper Boards",  layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2729, layer1: "Packaging Materials", layer2: "Molded Pulp Trays",       layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2732, layer1: "Packaging Materials", layer2: "Fiberboard Sheets",       layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2735, layer1: "Packaging Materials", layer2: "Paper Cushions",          layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2738, layer1: "Packaging Materials", layer2: "Corrugated Dividers",     layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2741, layer1: "Packaging Materials", layer2: "Kraft Liners",            layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2747, layer1: "Packaging Materials", layer2: "Honeycomb Cushion Pads",  layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2750, layer1: "Packaging Materials", layer2: "Paper Corner Protectors", layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2753, layer1: "Packaging Materials", layer2: "Fiber Drums",             layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2756, layer1: "Packaging Materials", layer2: "Chipboard Sheets",        layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2759, layer1: "Packaging Materials", layer2: "Paper Sleeves",           layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
  { startId: 2762, layer1: "Packaging Materials", layer2: "Paper Honeycomb Panels",  layer3: "Paper Packaging", layer4: "Paper-Based Packaging", eu: 1.17, in: 1.43, global: 1.3 },
];

const plasticPackaging: MaterialDef[] = [
  { startId: 2765, layer1: "Packaging Materials", layer2: "Stretch Film",              layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2768, layer1: "Packaging Materials", layer2: "Shrink Wrap",               layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2771, layer1: "Packaging Materials", layer2: "Bubble Wrap",               layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2774, layer1: "Packaging Materials", layer2: "Plastic Pallets",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2777, layer1: "Packaging Materials", layer2: "HDPE Bags",                 layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2780, layer1: "Packaging Materials", layer2: "Polybags",                  layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2783, layer1: "Packaging Materials", layer2: "Plastic Crates",            layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2786, layer1: "Packaging Materials", layer2: "Thermocol / EPS",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2789, layer1: "Packaging Materials", layer2: "PET Straps",                layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2792, layer1: "Packaging Materials", layer2: "PP Straps",                 layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2795, layer1: "Packaging Materials", layer2: "LDPE Films",                layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2798, layer1: "Packaging Materials", layer2: "HDPE Containers",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2801, layer1: "Packaging Materials", layer2: "PVC Shrink Sleeves",        layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2804, layer1: "Packaging Materials", layer2: "Vacuum Formed Trays",       layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2807, layer1: "Packaging Materials", layer2: "Plastic Dunnage",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2810, layer1: "Packaging Materials", layer2: "Anti-static Bags",          layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2813, layer1: "Packaging Materials", layer2: "Conductive Packaging",      layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2816, layer1: "Packaging Materials", layer2: "Plastic Edge Guards",       layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2819, layer1: "Packaging Materials", layer2: "Reusable Plastic Totes",    layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2822, layer1: "Packaging Materials", layer2: "Injection Molded Trays",    layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2825, layer1: "Packaging Materials", layer2: "Partitioned Crates",        layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2828, layer1: "Packaging Materials", layer2: "Pallet Covers",             layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2831, layer1: "Packaging Materials", layer2: "Laminated Films",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2834, layer1: "Packaging Materials", layer2: "ESD Packaging",             layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2837, layer1: "Packaging Materials", layer2: "Component Protection Caps", layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2840, layer1: "Packaging Materials", layer2: "Plastic Spacers",           layer3: "Plastic Packaging", layer4: "Plastic Packaging", eu: 2.52, in: 3.08, global: 2.8 },
];

const woodPackaging: MaterialDef[] = [
  { startId: 2843, layer1: "Packaging Materials", layer2: "Wooden Pallets",             layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2846, layer1: "Packaging Materials", layer2: "Wooden Crates",              layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2849, layer1: "Packaging Materials", layer2: "Dunnage Wood",               layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2852, layer1: "Packaging Materials", layer2: "Plywood Boxes",              layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2855, layer1: "Packaging Materials", layer2: "Heat-treated Wooden Pallets",layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2858, layer1: "Packaging Materials", layer2: "Pinewood Crates",            layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2861, layer1: "Packaging Materials", layer2: "Hardwood Pallets",           layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2864, layer1: "Packaging Materials", layer2: "Engineered Wood Boxes",      layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2867, layer1: "Packaging Materials", layer2: "Wooden Spacers",             layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2870, layer1: "Packaging Materials", layer2: "Wooden Beams",               layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2873, layer1: "Packaging Materials", layer2: "Bamboo Packaging",           layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2876, layer1: "Packaging Materials", layer2: "Hardwood Boxes",             layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2879, layer1: "Packaging Materials", layer2: "Bamboo Pallets",             layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2882, layer1: "Packaging Materials", layer2: "Wooden Frames",              layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2885, layer1: "Packaging Materials", layer2: "Timber Dunnage",             layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
  { startId: 2888, layer1: "Packaging Materials", layer2: "Laminated Wooden Boxes",     layer3: "Wood Packaging", layer4: "Wooden Packaging", eu: 0.81, in: 0.99, global: 0.9 },
];

const metalPackaging: MaterialDef[] = [
  { startId: 2891, layer1: "Packaging Materials", layer2: "Steel Drums",                 layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2894, layer1: "Packaging Materials", layer2: "Aluminum Containers",         layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2897, layer1: "Packaging Materials", layer2: "Metal Bins",                  layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2900, layer1: "Packaging Materials", layer2: "Wire Mesh Containers",        layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2903, layer1: "Packaging Materials", layer2: "Steel Pallet Frames",         layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2906, layer1: "Packaging Materials", layer2: "Roll Containers",             layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2909, layer1: "Packaging Materials", layer2: "Aluminum Drums",              layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2912, layer1: "Packaging Materials", layer2: "Galvanized Bins",             layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2915, layer1: "Packaging Materials", layer2: "Metal Cage Containers",       layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2918, layer1: "Packaging Materials", layer2: "Steel Stillages",             layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2921, layer1: "Packaging Materials", layer2: "Galvanized Storage Bins",     layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2924, layer1: "Packaging Materials", layer2: "Aluminum Storage Cases",      layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2927, layer1: "Packaging Materials", layer2: "Metal Racks",                 layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2930, layer1: "Packaging Materials", layer2: "Returnable Steel Containers", layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2933, layer1: "Packaging Materials", layer2: "Bulk Metal Totes",            layer3: "Metal Packaging", layer4: "Metal Packaging", eu: 3.78, in: 4.62, global: 4.2 },
];

const reusablePackaging: MaterialDef[] = [
  { startId: 2936, layer1: "Packaging Materials", layer2: "Returnable Plastic Crates",   layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2939, layer1: "Packaging Materials", layer2: "Foldable Bins",               layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2942, layer1: "Packaging Materials", layer2: "Reusable Pallets",            layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2945, layer1: "Packaging Materials", layer2: "Metal Racks",                 layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2948, layer1: "Packaging Materials", layer2: "Tote Boxes",                  layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2951, layer1: "Packaging Materials", layer2: "Foldable Plastic Containers", layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.52, in: 3.08, global: 2.8 },
  { startId: 2954, layer1: "Packaging Materials", layer2: "Stackable Crates",            layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2957, layer1: "Packaging Materials", layer2: "Returnable Steel Racks",      layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 3.78, in: 4.62, global: 4.2 },
  { startId: 2960, layer1: "Packaging Materials", layer2: "Reusable Dunnage Systems",    layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2963, layer1: "Packaging Materials", layer2: "Collapsible Bulk Containers", layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2966, layer1: "Packaging Materials", layer2: "Returnable Battery Boxes",    layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2969, layer1: "Packaging Materials", layer2: "Modular Tote Systems",        layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2972, layer1: "Packaging Materials", layer2: "Reusable Foam Inserts",       layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 2975, layer1: "Packaging Materials", layer2: "RFID Enabled Packaging",      layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2978, layer1: "Packaging Materials", layer2: "Multi-use Transit Packaging", layer3: "Reusable Packaging", layer4: "Returnable / Reusable Packaging", eu: 2.25, in: 2.75, global: 2.5 },
];

const protectivePackaging: MaterialDef[] = [
  { startId: 2981, layer1: "Packaging Materials", layer2: "Foam Inserts",              layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 2984, layer1: "Packaging Materials", layer2: "Air Pillows",               layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 2987, layer1: "Packaging Materials", layer2: "Edge Protectors",           layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2990, layer1: "Packaging Materials", layer2: "Cushioning Materials",      layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 2993, layer1: "Packaging Materials", layer2: "Anti-rust VCI Sheets",      layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 2996, layer1: "Packaging Materials", layer2: "Desiccants",                layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 2999, layer1: "Packaging Materials", layer2: "EPE Foam Sheets",           layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3002, layer1: "Packaging Materials", layer2: "PU Foam Blocks",            layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3005, layer1: "Packaging Materials", layer2: "Foam-in-place Packaging",   layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3008, layer1: "Packaging Materials", layer2: "VCI Bags",                  layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3011, layer1: "Packaging Materials", layer2: "Moisture Barrier Bags",     layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 3014, layer1: "Packaging Materials", layer2: "Inflatable Packaging",      layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 3017, layer1: "Packaging Materials", layer2: "Shock Absorbing Pads",      layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 3020, layer1: "Packaging Materials", layer2: "Rubber Padding Sheets",     layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 3023, layer1: "Packaging Materials", layer2: "Edge Foam Rolls",           layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3026, layer1: "Packaging Materials", layer2: "Corner Foam Protectors",    layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.88, in: 3.52, global: 3.2 },
  { startId: 3029, layer1: "Packaging Materials", layer2: "Anti-vibration Pads",       layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
  { startId: 3032, layer1: "Packaging Materials", layer2: "Thermal Protection Covers", layer3: "Protective Packaging", layer4: "Protective Packaging", eu: 2.25, in: 2.75, global: 2.5 },
];

const allDefs: MaterialDef[] = [
  ...materialEmissions,
  ...paperPackaging,
  ...plasticPackaging,
  ...woodPackaging,
  ...metalPackaging,
  ...reusablePackaging,
  ...protectivePackaging,
];

const pad6 = (n: number) => n.toString().padStart(6, "0");

const expandDef = (d: MaterialDef): MaterialEFRow[] => {
  const common = {
    scope: SCOPE,
    layer1: d.layer1,
    layer2: d.layer2,
    layer3: d.layer3,
    layer4: d.layer4,
    year: YEAR,
    unit: UNIT,
    dataSource: DATA_SOURCE,
    category: CATEGORY,
  };
  return [
    { id: `EF_${pad6(d.startId)}`,     region: "EU",     efValue: d.eu,     ...common },
    { id: `EF_${pad6(d.startId + 1)}`, region: "IN",     efValue: d.in,     ...common },
    { id: `EF_${pad6(d.startId + 2)}`, region: "GLOBAL", efValue: d.global, ...common },
  ];
};

export const materialsEmissionFactors: MaterialEFRow[] = allDefs.flatMap(expandDef);
