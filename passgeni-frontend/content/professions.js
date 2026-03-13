// =============================================================
// PASSGENI — PROFESSION DATA
// =============================================================
// Add new professions here. They appear automatically in the
// generator. No other file needs to be changed.
// =============================================================

// ─── CORE PROFESSION PRESETS ─────────────────────────────────
// These appear as buttons in the generator UI
export const PROFESSIONS = [
  { id: "dev", label: "Developer", seeds: ["stack", "kernel", "deploy", "tensor", "cipher"] },
  { id: "doc", label: "Doctor",    seeds: ["cortex", "neural", "helix", "pulse", "synapse"] },
  { id: "fin", label: "Finance",   seeds: ["alpha", "yield", "delta", "equity", "index"]   },
  { id: "des", label: "Designer",  seeds: ["pixel", "bezier", "vector", "render", "frame"] },
  { id: "law", label: "Legal",     seeds: ["clause", "nexus", "accord", "mandate", "statute"] },
  { id: "edu", label: "Educator",  seeds: ["axiom", "theory", "method", "cipher", "prime"] },
];

// ─── KEYWORD MAP FOR CUSTOM PROFESSION INPUT ─────────────────
// When user types a custom profession, AI extracts seeds from here
// Add more professions below — format: keyword: [seed1, seed2]
export const PROFESSION_KEYWORD_MAP = {
  // Aviation
  pilot:        ["altitude", "vector"],
  aviator:      ["altitude", "vector"],
  // Trades
  plumber:      ["torque", "conduit"],
  electrician:  ["voltage", "circuit"],
  welder:       ["arc", "flux"],
  carpenter:    ["mortise", "grain"],
  mechanic:     ["torque", "valve"],
  // Food
  chef:         ["mise", "saute"],
  cook:         ["simmer", "recipe"],
  baker:        ["knead", "crust"],
  // Design & Architecture
  architect:    ["datum", "facade"],
  photographer: ["aperture", "shutter"],
  videographer: ["frame", "render"],
  // Healthcare
  nurse:        ["dosage", "triage"],
  pharmacist:   ["molecule", "dosage"],
  dentist:      ["calculus", "molar"],
  vet:          ["fauna", "biopsy"],
  therapist:    ["cortex", "rapport"],
  // Finance
  accountant:   ["ledger", "audit"],
  analyst:      ["pivot", "metric"],
  broker:       ["yield", "spread"],
  trader:       ["delta", "alpha"],
  // Creative
  journalist:   ["byline", "source"],
  writer:       ["syntax", "prose"],
  musician:     ["tempo", "chord"],
  artist:       ["chroma", "canvas"],
  // Tech
  developer:    ["stack", "kernel"],
  designer:     ["bezier", "frame"],
  // Education
  teacher:      ["axiom", "method"],
  researcher:   ["datum", "vector"],
  scientist:    ["entropy", "quanta"],
  student:      ["theory", "focus"],
  // Management
  manager:      ["pipeline", "scope"],
  ceo:          ["equity", "pivot"],
  // Sports & Fitness
  athlete:      ["velocity", "stamina"],
  coach:        ["playbook", "drill"],
  // Security & Military
  soldier:      ["cipher", "delta"],
  police:       ["patrol", "sector"],
  firefighter:  ["thermal", "ladder"],
  // Services
  driver:       ["torque", "route"],
  barber:       ["taper", "blade"],
  tailor:       ["seam", "tension"],
  // Agriculture
  farmer:       ["yield", "soil"],
  // Media
  singer:       ["chord", "lyric"],
  coder:        ["stack", "loop"],
  hacker:       ["cipher", "root"],
  guard:        ["patrol", "watch"],
  miner:        ["shaft", "ore"],
  diver:        ["depth", "tank"],
  boxer:        ["jab", "ring"],
  sailor:       ["tide", "mast"],
  lawyer:       ["clause", "writ"],
  judge:        ["bench", "rule"],
};
