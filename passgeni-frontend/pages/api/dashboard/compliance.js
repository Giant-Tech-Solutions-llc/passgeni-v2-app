/**
 * GET /api/dashboard/compliance
 * Returns everything the compliance dashboard needs in one round-trip.
 *
 * Response shape:
 *   complianceScore   — 0-100 integer
 *   scoreColor        — "green" | "amber" | "red"
 *   totalCerts        — integer
 *   validCerts        — integer
 *   risks             — Array<{ id, standard, issue, expires_at, days }>
 *   certs             — last 100 (for table)
 *   recentActivity    — last 10 events across generated + viewed
 *   monthlyCount      — certs issued this month
 *   monthlyLimit      — 3 (free) | null (paid)
 *   plan              — string
 *   planStatus        — string
 *   trialEnd          — ISO | null
 */

import { getToken }  from "next-auth/jwt";
import { getDB }     from "../../../lib/db/client.js";

const STANDARD_LABELS = {
  nist:  "NIST SP 800-63B",
  hipaa: "HIPAA §164.312",
  pci:   "PCI-DSS v4.0",
  soc2:  "SOC 2 CC6.1",
  iso:   "ISO 27001:2022",
  fips:  "FIPS 140-3",
};

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const userId = token.sub;
  const plan   = token.plan ?? "free";
  const isPaid = plan !== "free";
  const db     = getDB();
  const now    = new Date().toISOString();
  const soon   = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  try {
    // ── Run all queries in parallel ──────────────────────────
    const [
      { count: totalCerts,   error: e1 },
      { count: validCerts,   error: e2 },
      { data: riskRows,      error: e3 },
      { data: certRows,      error: e4 },
      { count: monthlyCount, error: e5 },
    ] = await Promise.all([

      // 1. Total cert count
      db.from("certificates")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),

      // 2. Valid cert count (not revoked, not expired)
      db.from("certificates")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_revoked", false)
        .gt("expires_at", now),

      // 3. Risk rows: expired + expiring soon + revoked
      db.from("certificates")
        .select("id, compliance_standard, expires_at, is_revoked, revoked_at, created_at")
        .eq("user_id", userId)
        .or(`is_revoked.eq.true,expires_at.lt.${now},and(is_revoked.eq.false,expires_at.lt.${soon},expires_at.gt.${now})`)
        .order("expires_at", { ascending: true })
        .limit(20),

      // 4. Full cert list for table (last 100)
      db.from("certificates")
        .select("id, compliance_standard, entropy_bits, char_pool_size, generation_params, standards_met, created_at, expires_at, is_revoked, revoked_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(100),

      // 5. Monthly count
      db.from("certificates")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_revoked", false)
        .gte("created_at", monthStart),
    ]);

    if (e1) throw e1;
    if (e2) throw e2;
    if (e3) throw e3;
    if (e4) throw e4;
    if (e5) throw e5;

    // ── Compliance score ──────────────────────────────────────
    const total = totalCerts ?? 0;
    const valid = validCerts ?? 0;
    const complianceScore = total === 0 ? 100 : Math.round((valid / total) * 100);
    const scoreColor = complianceScore >= 85 ? "green" : complianceScore >= 60 ? "amber" : "red";

    // ── Build risk list ───────────────────────────────────────
    const risks = (riskRows ?? []).map((cert) => {
      const expDate = new Date(cert.expires_at);
      const daysLeft = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));

      let issue;
      if (cert.is_revoked) {
        issue = "revoked";
      } else if (expDate < new Date()) {
        issue = "expired";
      } else {
        issue = "expiring_soon";
      }

      return {
        id:       cert.id,
        standard: cert.compliance_standard,
        label:    STANDARD_LABELS[cert.compliance_standard] ?? cert.compliance_standard,
        issue,
        expires_at: cert.expires_at,
        revoked_at: cert.revoked_at ?? null,
        days: issue === "expiring_soon" ? daysLeft : null,
      };
    });

    // ── Recent activity ───────────────────────────────────────
    // Pull cert_ids for this user to query cert_views
    const certIds = (certRows ?? []).map((c) => c.id);

    let recentViews = [];
    if (certIds.length > 0) {
      const { data: views } = await db
        .from("cert_views")
        .select("cert_id, created_at")
        .in("cert_id", certIds)
        .order("created_at", { ascending: false })
        .limit(10);
      recentViews = views ?? [];
    }

    // Build cert_id → standard lookup for view events
    const certStdMap = {};
    (certRows ?? []).forEach((c) => { certStdMap[c.id] = c.compliance_standard; });

    const generatedEvents = (certRows ?? []).slice(0, 10).map((c) => ({
      type:       "generated",
      cert_id:    c.id,
      standard:   c.compliance_standard,
      label:      STANDARD_LABELS[c.compliance_standard] ?? c.compliance_standard,
      at:         c.created_at,
    }));

    const viewedEvents = recentViews.map((v) => ({
      type:      "viewed",
      cert_id:   v.cert_id,
      standard:  certStdMap[v.cert_id] ?? null,
      label:     certStdMap[v.cert_id] ? (STANDARD_LABELS[certStdMap[v.cert_id]] ?? certStdMap[v.cert_id]) : "Certificate",
      at:        v.created_at,
    }));

    const recentActivity = [...generatedEvents, ...viewedEvents]
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 10);

    return res.status(200).json({
      complianceScore,
      scoreColor,
      totalCerts:   total,
      validCerts:   valid,
      risks,
      certs:        certRows ?? [],
      recentActivity,
      monthlyCount: monthlyCount ?? 0,
      monthlyLimit: isPaid ? null : 3,
      plan,
      planStatus:   token.planStatus ?? null,
      trialEnd:     token.trialEnd   ?? null,
    });

  } catch (err) {
    console.error("[compliance] API error:", err);
    return res.status(500).json({ error: "Failed to load compliance data" });
  }
}
