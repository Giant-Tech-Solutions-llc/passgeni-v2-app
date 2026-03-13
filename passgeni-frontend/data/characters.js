// =============================================================
// PASSGENI — CHARACTER SETS & WORD LISTS
// =============================================================

// ─── CHARACTER POOLS ─────────────────────────────────────────
export const CHARS = {
  lower:  "abcdefghijklmnopqrstuvwxyz",
  upper:  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  num:    "0123456789",
  sym:    "!@#$%^&*-_=+",
  // Post-quantum uses an expanded symbol set for higher entropy
  symExpanded: "!@#$%^&*-_=+[]{}|;:,.<>?",
};

// ─── ADJECTIVES for passphrase generation ────────────────────
export const ADJECTIVES = [
  "vivid", "neon",  "stark", "swift", "iron",  "ghost",
  "prime", "ultra", "bold",  "nova",  "apex",  "echo",
  "flux",  "grim",  "keen",  "lone",  "pure",  "raw",
  "void",  "zero",  "dark",  "deep",  "fast",  "high",
  "sharp", "cool",  "hard",  "soft",  "bright","calm",
  "cold",  "crisp", "dense", "dry",   "dull",  "firm",
  "flat",  "free",  "full",  "glad",  "hot",   "just",
  "kind",  "lean",  "live",  "loud",  "mad",   "mild",
];

// ─── FALLBACK SEEDS when no profession match found ────────────
export const FALLBACK_SEEDS = [
  "nexus", "vault", "sigma", "prime", "omega",
  "delta", "helix", "pulse", "cipher", "forge",
];

// ─── COLORS used in passphrase word2 slot ────────────────────
export const PASSPHRASE_COLORS = [
  "crimson", "cobalt", "amber",  "onyx",   "jade",
  "slate",   "ivory",  "azure",  "coral",  "ember",
  "frost",   "lunar",  "obsidian","scarlet","teal",
];

// ─── BANNED passphrase numbers (too obvious/common) ──────────
export const BANNED_NUMBERS = new Set([
  "007", "123", "124", "234", "345", "456", "567",
  "678", "789", "111", "222", "333", "444", "555",
  "666", "777", "888", "999", "000", "420",
  "2024", "2025", "2026",
]);
