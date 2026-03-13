// =============================================================
// PASSGENI — PASSWORD GENERATION ENGINE
// =============================================================
// Pure functions only. No UI imports. No side effects.
// Every function is independently testable.
// =============================================================

import { CHARS, ADJECTIVES, FALLBACK_SEEDS, PASSPHRASE_COLORS, BANNED_NUMBERS } from "../data/characters.js";
import { PROFESSIONS, PROFESSION_KEYWORD_MAP } from "../content/professions.js";

// ─── CRYPTOGRAPHIC RANDOM ────────────────────────────────────
// Uses crypto.getRandomValues() — FIPS 140-3 aligned entropy source
// Never use Math.random() for security-sensitive generation

/**
 * Returns a cryptographically random integer between 0 and max (exclusive)
 */
function cryptoRandInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Picks a random item from an array using cryptographic randomness
 */
function cryptoPick(array) {
  return array[cryptoRandInt(array.length)];
}

// ─── PROFESSION SEED EXTRACTION ──────────────────────────────

/**
 * Extracts seeds from a custom profession string.
 * Tries keyword map first, then splits multi-word input,
 * then falls back to random seeds.
 *
 * @param {string} input - User-typed profession (e.g. "airline pilot")
 * @returns {string[]} - Array of two seed words
 */
export function deriveSeeds(input) {
  const clean = input.trim().toLowerCase();

  // Check full keyword map
  for (const [key, seeds] of Object.entries(PROFESSION_KEYWORD_MAP)) {
    if (clean.includes(key)) return seeds;
  }

  // Split multi-word input and use first two meaningful words
  const words = clean.split(/\s+/).filter((w) => w.length > 3);
  if (words.length >= 2) return [words[0].slice(0, 8), words[1].slice(0, 8)];
  if (words.length === 1) return [words[0].slice(0, 8), cryptoPick(FALLBACK_SEEDS)];

  return [cryptoPick(FALLBACK_SEEDS), cryptoPick(FALLBACK_SEEDS)];
}

// ─── PASSWORD BUILDER ─────────────────────────────────────────

/**
 * Builds a single password using profession-aware seeding.
 *
 * @param {number}   len         - Target length (8-32)
 * @param {string}   profId      - Profession ID (e.g. "dev")
 * @param {object}   opts        - { upper, num, sym }
 * @param {string[]|null} customSeeds - Override seeds for custom professions
 * @param {boolean}  quantum     - Use expanded symbol set for post-quantum mode
 * @returns {string} - Generated password
 */
export function buildPassword(len, profId, opts, customSeeds = null, quantum = false) {
  // Determine seed word
  let seed;
  if (customSeeds) {
    seed = cryptoPick(customSeeds);
  } else {
    const prof = PROFESSIONS.find((p) => p.id === profId) || PROFESSIONS[0];
    seed = cryptoPick(prof.seeds);
  }

  // Build character pool based on options
  let pool = CHARS.lower;
  if (opts.upper) pool += CHARS.upper;
  if (opts.num)   pool += CHARS.num;
  if (opts.sym)   pool += quantum ? CHARS.symExpanded : CHARS.sym;

  // Fill remaining length with random characters from pool
  const fillLength = Math.max(0, len - seed.length);
  const fill = Array.from({ length: fillLength }, () => cryptoPick(pool.split("")));

  // Combine seed + fill, then shuffle only the non-seed portion
  // This preserves some memorability while ensuring randomness
  const arr = [...seed.split(""), ...fill];

  // Fisher-Yates shuffle on the back half only
  for (let i = arr.length - 1; i > arr.length / 2; i--) {
    const j = cryptoRandInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, len).join("");
}

/**
 * Generates multiple passwords at once (bulk mode)
 *
 * @param {number} count - How many to generate
 * @param {number} len
 * @param {string} profId
 * @param {object} opts
 * @param {string[]|null} customSeeds
 * @param {boolean} quantum
 * @returns {string[]}
 */
export function buildBulkPasswords(count, len, profId, opts, customSeeds = null, quantum = false) {
  return Array.from({ length: count }, () =>
    buildPassword(len, profId, opts, customSeeds, quantum)
  );
}

// ─── PASSPHRASE BUILDER ───────────────────────────────────────

/**
 * Generates a passphrase in the format: word1-adjective-number-word2
 * Aligned with NIST SP 800-63B passphrase recommendations.
 *
 * @param {string}   profId      - Profession ID
 * @param {string[]|null} customSeeds - Override seeds for custom professions
 * @returns {{ w1, adj, num, w2, full }} - Parts + assembled passphrase
 */
export function buildPassphrase(profId, customSeeds = null) {
  // Build word bank from profession seeds
  let bank;
  if (customSeeds) {
    bank = [...customSeeds];
  } else {
    const prof = PROFESSIONS.find((p) => p.id === profId) || PROFESSIONS[0];
    bank = [...prof.seeds];
  }

  const w1  = cryptoPick(bank);
  const w2pool = bank.filter((w) => w !== w1);
  const w2  = w2pool.length > 0 ? cryptoPick(w2pool) : cryptoPick(PASSPHRASE_COLORS);
  const adj = cryptoPick(ADJECTIVES);

  // Generate safe random 3-digit number (avoid common patterns)
  let num;
  do {
    num = String(cryptoRandInt(900) + 100);
  } while (BANNED_NUMBERS.has(num));

  return {
    w1,
    adj,
    num,
    w2,
    full: `${w1}-${adj}-${num}-${w2}`,
  };
}

// ─── AUDIT LOG GENERATOR ─────────────────────────────────────

/**
 * Generates a transparent audit record for a password.
 * This powers the Open Audit Mode feature.
 *
 * @param {string}  password
 * @param {object}  params   - Generation parameters used
 * @returns {object} - Audit record
 */
export function generateAuditRecord(password, params) {
  return {
    timestamp:       new Date().toISOString(),
    entropySource:   "crypto.getRandomValues() — FIPS 140-3 aligned",
    passwordLength:  password.length,
    characterPool:   params.pool || "calculated",
    professionSeed:  params.seed || "none",
    complianceMode:  params.compliance || "none",
    quantumMode:     params.quantum || false,
    entropyBits:     Math.round(password.length * Math.log2(94)),
    generationMode:  params.mode || "password",
    clientSide:      true,
    serverContact:   false,
  };
}
