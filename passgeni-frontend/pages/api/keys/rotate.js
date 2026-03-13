// =============================================================
// PASSGENI — API KEY ROTATION
// POST /api/keys/rotate
// =============================================================
// Immediately deactivates the specified key and creates a new one.
// Returns the new raw key (shown once only — never stored).
//
// Request body:
//   { keyId: string }  — UUID of the key to rotate
// =============================================================

import { requireTeam } from "../../../lib/auth.js";
import { generateApiKey } from "../../../lib/apiKeys.js";
import { getDB, createApiKey } from "../../../lib/db/client.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = await requireTeam(req, res);
  if (!auth) return;

  const { keyId } = req.body || {};
  if (!keyId) return res.status(400).json({ error: "keyId required" });

  const db = getDB();

  try {
    // 1. Verify the key belongs to this customer
    const { data: existingKey, error: fetchErr } = await db
      .from("api_keys")
      .select("id, label, customer_id")
      .eq("id", keyId)
      .eq("customer_id", auth.customerId)
      .eq("is_active", true)
      .single();

    if (fetchErr || !existingKey) {
      return res.status(404).json({ error: "Key not found or already inactive" });
    }

    // 2. Deactivate the old key
    const { error: deactivateErr } = await db
      .from("api_keys")
      .update({
        is_active:  false,
        rotated_at: new Date().toISOString(),
      })
      .eq("id", keyId);

    if (deactivateErr) throw deactivateErr;

    // 3. Generate and store the new key
    const { raw, hash, prefix } = generateApiKey("live");

    const newKey = await createApiKey({
      customerId: auth.customerId,
      keyHash:    hash,
      keyPrefix:  prefix,
      label:      existingKey.label || "Default",
    });

    // 4. Return the raw key — this is the ONLY time it will ever be shown
    return res.status(200).json({
      success:   true,
      newKey:    raw,           // shown ONCE — user must copy now
      keyId:     newKey.id,
      keyPrefix: prefix,
      message:   "Old key deactivated. Copy your new key now — it cannot be shown again.",
    });

  } catch (err) {
    console.error("Key rotation error:", err);
    return res.status(500).json({ error: "Key rotation failed. Please try again." });
  }
}
