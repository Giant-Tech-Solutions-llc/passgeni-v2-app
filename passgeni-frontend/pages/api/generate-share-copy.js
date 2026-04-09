import { callGemini } from "../../lib/gemini.js";

const PROMPTS = {
  twitter: `Write a single casual Twitter/X post about using PassGeni (passgeni.ai) to generate a Post-Quantum password.
Rules:
- Sound like a real person, not a brand — conversational, genuine, slightly surprised or impressed
- Mention @PassGeniAI naturally somewhere
- Max 220 characters
- Max 2 hashtags (only use #CyberSecurity or #PasswordSecurity if they fit naturally — do not force them)
- Vary the angle every time: could be technical credibility, NIST mention, "didn't know this existed", daily use, compliance, etc.
- Do not use exclamation marks more than once
- Do not start with "Just"
Output only the post text, nothing else.`,

  linkedin: `Write a short LinkedIn post about using PassGeni (passgeni.ai) to generate a Post-Quantum password.
Rules:
- 3 short paragraphs max
- First line must stop the scroll — a sharp observation or specific insight, not a generic hook
- Professional but human — no corporate jargon, no "excited to share"
- Mention one specific angle: compliance, DevOps, healthcare, finance, or general security
- End with a genuine question or observation that invites a response
- Include passgeni.ai as a plain URL in the last paragraph
- Vary the profession angle and opening every time
Output only the post text, nothing else.`,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { platform } = req.body || {};
  if (platform !== "twitter" && platform !== "linkedin") {
    return res.status(400).json({ error: "Invalid platform" });
  }

  try {
    const { text } = await callGemini(PROMPTS[platform], {
      maxOutputTokens: 300,
      temperature: 0.95,
    });
    return res.status(200).json({ copy: text });
  } catch (err) {
    console.error("[generate-share-copy]", err.message);
    // Fallback copy so the share button always works
    const fallback =
      platform === "twitter"
        ? "Just generated a Post-Quantum password with @PassGeniAI — aligned with NIST 2024 PQC standards. Worth knowing this exists. passgeni.ai"
        : "Most password generators haven't caught up with post-quantum threats yet.\n\nI've been using PassGeni (passgeni.ai) to generate credentials aligned with NIST's 2024 post-quantum standards. One toggle, no extra steps.\n\nAre your current passwords quantum-resistant?";
    return res.status(200).json({ copy: fallback });
  }
}
