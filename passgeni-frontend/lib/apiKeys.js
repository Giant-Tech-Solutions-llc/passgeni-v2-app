// =============================================================
// PASSGENI — API KEY UTILITIES
// =============================================================
// Pure functions for generating, hashing, and validating
// API keys. No UI, no side effects.
//
// Key format:  pg_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//              pg_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// =============================================================

import { createHash, randomBytes } from "crypto";

// ─── GENERATE ─────────────────────────────────────────────────

/**
 * Generates a new API key.
 * Returns the raw key (shown ONCE to the user) and its SHA-256
 * hash (stored in the database — never the raw key).
 *
 * @param {"live"|"test"} mode
 * @returns {{ raw: string, hash: string, prefix: string }}
 */
export function generateApiKey(mode = "live") {
  const random = randomBytes(32).toString("hex");          // 64 hex chars
  const raw    = `pg_${mode}_${random}`;                   // e.g. pg_live_abc123...
  const prefix = raw.slice(0, 16);                         // pg_live_abc1234 — shown for identification
  const hash   = hashApiKey(raw);
  return { raw, hash, prefix };
}

/**
 * SHA-256 hash of an API key.
 * This is what gets stored — never the raw key.
 *
 * @param {string} raw - The full raw API key
 * @returns {string} - Hex-encoded SHA-256 hash
 */
export function hashApiKey(raw) {
  return createHash("sha256").update(raw).digest("hex");
}

/**
 * Validates an incoming API key against the stored hash.
 *
 * @param {string} raw    - Key provided in the request
 * @param {string} stored - Hash stored in the database
 * @returns {boolean}
 */
export function validateApiKey(raw, stored) {
  if (!raw || !stored) return false;
  // Timing-safe comparison
  const incoming = hashApiKey(raw);
  if (incoming.length !== stored.length) return false;
  let diff = 0;
  for (let i = 0; i < incoming.length; i++) {
    diff |= incoming.charCodeAt(i) ^ stored.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Masks a raw API key for display.
 * Shows prefix + dots + last 4 chars.
 * e.g. "pg_live_abc1234...ef89"
 *
 * @param {string} raw
 * @returns {string}
 */
export function maskApiKey(raw) {
  if (!raw || raw.length < 20) return "••••••••••••••••";
  const last4 = raw.slice(-4);
  return `${raw.slice(0, 16)}••••••••••••${last4}`;
}
