// Temporary Gemini API key test endpoint — DELETE after testing
export default async function handler(req, res) {
  const key = process.env.PassGeni_Gemini_APIKEY;
  if (!key) return res.status(500).json({ ok: false, error: 'Key not found in env vars' });

  const MODEL = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

  let genResult = null;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with exactly one word: WORKING' }] }],
        generationConfig: { maxOutputTokens: 10, temperature: 0 }
      })
    });
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    genResult = {
      httpStatus: r.status,
      ok: r.ok,
      reply: reply || null,
      error: r.ok ? null : (data?.error?.message || JSON.stringify(data?.error)),
      errorCode: r.ok ? null : data?.error?.code,
      usageMetadata: data?.usageMetadata || null,
    };
  } catch (e) {
    genResult = { ok: false, error: e.message };
  }

  return res.status(200).json({
    model: MODEL,
    keyFound: true,
    keyPrefix: key.slice(0, 10) + '...',
    keyLength: key.length,
    generation: genResult,
  });
      }
