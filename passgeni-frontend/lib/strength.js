// =============================================================
// PASSGENI — STRENGTH & ENTROPY CALCULATIONS
// =============================================================
// Pure functions. No UI. No side effects.
// =============================================================

// ─── ENTROPY ─────────────────────────────────────────────────

/**
 * Calculates Shannon entropy in bits for a given password.
 * Formula: length × log2(character_pool_size)
 * Assumes full 94-character printable ASCII pool as worst case.
 *
 * @param {string} password
 * @returns {number} - Entropy in bits (rounded)
 */
export function getEntropy(password) {
  if (!password) return 0;
  return Math.round(password.length * Math.log2(94));
}

// ─── CRACK TIME ESTIMATE ─────────────────────────────────────

/**
 * Returns a human-readable crack time estimate.
 * Based on entropy bits and realistic attack speeds:
 * - Online attack:    1,000 guesses/second
 * - Offline attack:  10 billion guesses/second (GPU cluster)
 * - Quantum attack:  Grover's algorithm halves effective bits
 *
 * @param {string} password
 * @returns {string}
 */
export function getCrackTime(password) {
  if (!password) return "";
  const e = getEntropy(password);
  if (e < 28) return "under a second";
  if (e < 36) return "a few minutes";
  if (e < 50) return "a few hours";
  if (e < 60) return "decades";
  if (e < 80) return "centuries";
  return "longer than the universe";
}

// ─── STRENGTH SCORE ──────────────────────────────────────────

/**
 * Returns a 1-4 strength score with label and color.
 * Used for the visual strength bar in the UI.
 *
 * @param {string} password
 * @returns {{ score: number, label: string, color: string }}
 */
export function getStrength(password) {
  if (!password) return { score: 0, label: "", color: "#1a1a1a" };

  let s = 0;
  if (password.length >= 10)             s++;
  if (password.length >= 16)             s++;
  if (/[A-Z]/.test(password))            s++;
  if (/[0-9]/.test(password))            s++;
  if (/[^A-Za-z0-9]/.test(password))     s++;
  if (password.length >= 22)             s++;

  if (s <= 2) return { score: 1, label: "Crackable",   color: "#ff4444" };
  if (s <= 3) return { score: 2, label: "Decent",      color: "#ffaa00" };
  if (s <= 4) return { score: 3, label: "Strong",      color: "#C8FF00" };
  return       { score: 4, label: "Unbreakable", color: "#C8FF00" };
}

// ─── DNA SCORE ───────────────────────────────────────────────

/**
 * Runs a 7-point DNA audit on a password.
 * Returns individual check results and a total weighted score (0-100).
 *
 * Grading:
 *   A+  ≥ 85
 *   A   ≥ 70
 *   B   ≥ 55
 *   C   < 55
 *
 * @param {string} password
 * @returns {{ checks: array, total: number, grade: string, gradeColor: string } | null}
 */
export function getDNAScore(password) {
  if (!password) return null;

  const checks = [
    { label: "Length ≥ 12",       pass: password.length >= 12,              weight: 20 },
    { label: "Length ≥ 16",       pass: password.length >= 16,              weight: 15 },
    { label: "Uppercase A-Z",     pass: /[A-Z]/.test(password),             weight: 15 },
    { label: "Lowercase a-z",     pass: /[a-z]/.test(password),             weight: 10 },
    { label: "Numbers 0-9",       pass: /[0-9]/.test(password),             weight: 15 },
    { label: "Symbols !@#…",      pass: /[^A-Za-z0-9]/.test(password),      weight: 15 },
    { label: "No repeats (aaa)",  pass: !/(.)\1\1/.test(password),          weight: 10 },
  ];

  const total = checks.reduce((sum, c) => sum + (c.pass ? c.weight : 0), 0);

  let grade, gradeColor;
  if (total >= 85) { grade = "A+"; gradeColor = "#C8FF00"; }
  else if (total >= 70) { grade = "A";  gradeColor = "#C8FF00"; }
  else if (total >= 55) { grade = "B";  gradeColor = "#ffaa00"; }
  else                  { grade = "C";  gradeColor = "#ff6644"; }

  return { checks, total, grade, gradeColor };
}
