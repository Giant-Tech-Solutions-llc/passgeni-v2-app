// =============================================================
// PASSGENI — GEMINI RESILIENT CLIENT
// Tested working models (confirmed live 2026-03-15):
//   gemini-2.5-flash          ✅ WORKING — primary
//   gemini-3.1-flash-lite-preview ✅ WORKING — secondary
//   gemini-flash-lite-latest   ✅ WORKING — last resort
// =============================================================

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// Resilient model list — primary first, fallbacks after
// gemini-2.5-flash is the confirmed best for this account
export const GEMINI_MODELS = [
  'gemini-2.5-flash',             // Primary: Latest, fast, confirmed working
  'gemini-3.1-flash-lite-preview', // Secondary: Ultra-fast confirmed working
  'gemini-flash-lite-latest',      // Last resort: Legacy alias confirmed working
];

export const GEMINI_PRIMARY_MODEL = GEMINI_MODELS[0];

/**
 * Resilient Gemini API caller — tries models in order, skips on 404/429
 * @param {string} prompt
 * @param {object} options - generationConfig overrides
 * @returns {{ text: string, modelUsed: string }}
 */
export async function callGemini(prompt, options = {}) {
  const key = process.env.PassGeni_Gemini_APIKEY;
  if (!key) throw new Error('PassGeni_Gemini_APIKEY not set in environment');

  const generationConfig = {
    maxOutputTokens: 512,
    temperature: 0.7,
    ...options,
  };

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig,
  });

  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(
        `${GEMINI_API_BASE}/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
      );

      const data = await res.json();

      if (res.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        return { text, modelUsed: model };
      }

      const errorCode = data?.error?.code;
      // Only continue to next model on deprecation (404) or quota (429)
      if (errorCode === 404 || errorCode === 429) {
        console.warn(`[Gemini] Model ${model} unavailable (${errorCode}), trying next...`);
        continue;
      }

      // Other errors (400 bad request, 403 auth) — throw immediately
      throw new Error(`Gemini error ${errorCode}: ${data?.error?.message}`);

    } catch (err) {
      if (err.message?.includes('Gemini error')) throw err;
      console.warn(`[Gemini] Model ${model} fetch failed: ${err.message}`);
      continue;
    }
  }

  throw new Error('All Gemini models failed. Check API key and billing.');
}

/**
 * Generate a profession-aware password seed using Gemini
 * @param {string} profession
 * @returns {Promise<string[]>} array of 3 seed words
 */
export async function generateProfessionSeeds(profession) {
  const prompt = `You are a password security assistant. Given the profession "${profession}", 
return exactly 3 short memorable words (4-8 chars each) that a ${profession} would relate to.
Format: word1,word2,word3 — nothing else. No explanation.`;

  const { text, modelUsed } = await callGemini(prompt, {
    maxOutputTokens: 20,
    temperature: 0.8,
  });

  const seeds = text.split(',').map(s => s.trim().toLowerCase()).filter(s => /^[a-z]{3,10}$/.test(s));
  if (seeds.length < 1) throw new Error('Gemini returned invalid seeds: ' + text);
  return { seeds: seeds.slice(0, 3), modelUsed };
                                 }
