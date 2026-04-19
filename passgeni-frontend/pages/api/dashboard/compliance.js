/**
 * GET /api/dashboard/compliance
 * Single round-trip for the compliance monitoring dashboard.
 * Uses requireAuth (same as summary.js) to avoid getToken issues.
 */

import { requireAuth } from "../../../lib/auth.js";
import { getToken }    from "next-auth/jwt";
import { getDB }       from "../../../lib/db/client.js";

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

  // Use requireAuth (getServerSession) — same approach as summary.js which is confirmed working
  const session = await requireAuth(req, res);
  if (!session) return; // requireAuth already sent 401

  // Also get raw JWT token for userId (token.sub = nextauth user ID)
  const token  = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const userId = token?.sub ?? null;
  const plan   = session.user.plan        ?? token?.plan        ?? "free";
  const isPaid = plan !== "free";

  // Guard: if we can't identify the user, return empty state (not an error)
  if (!userId) {
    console.warn("[compliance] No userId from token.sub — returning empty state");
    return res.status(200).json(buildEmpty(plan, session, token));
  }

  const db         = getDB();
  const now        = new Date();
  const soonMs     = 30 * 24 * 60 * 60 * 1000;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  try {
    // ── Parallel queries — simple filters only ────────────────
    const [certsResult, monthResult] = await Promise.all([
      db.from("certificates")
        .select("id, compliance_standard, entropy_bits, char_pool_size, generation_params, standards_met, created_at, expires_at, is_revoked, revoked_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(200),

      db.from("certificates")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_revoked", false)
        .gte("created_at", monthStart),
    ]);

    // Surface real DB errors instead of swallowing them
    if (certsResult.error) {
      console.error("[compliance] certs query error:", certsResult.error);
      return res.status(500).json({
        error:   "Database query failed",
        detail:  certsResult.error.message,
        hint:    certsResult.error.hint ?? null,
      });
    }
    if (monthResult.error) {
      console.error("[compliance] monthly count error:", monthResult.error);
      return res.status(500).json({
        error:  "Database query failed",
        detail: monthResult.error.message,
        hint:   monthResult.error.hint ?? null,
      });
    }

    const allCerts     = certsResult.data  ?? [];
    const monthlyCount = monthResult.count ?? 0;

    // ── Compliance score ──────────────────────────────────────
    const totalCerts = allCerts.length;
    const validCerts = allCerts.filter(
      (c) => !c.is_revoked && new Date(c.expires_at) > now
    ).length;
    const complianceScore = totalCerts === 0 ? 100 : Math.round((validCerts / totalCerts) * 100);
    const scoreColor = complianceScore >= 85 ? "green" : complianceScore >= 60 ? "amber" : "red";

    // ── Risks (JS-side filtering) ─────────────────────────────
    const risks = allCerts
      .filter((cert) => {
        if (cert.is_revoked) return true;
        const exp = new Date(cert.expires_at);
        return exp < now || (exp - now) < soonMs;
      })
      .slice(0, 20)
      .map((cert) => {
        const expDate  = new Date(cert.expires_at);
        const daysLeft = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));
        const issue    = cert.is_revoked ? "revoked"
                       : expDate < now   ? "expired"
                       : "expiring_soon";
        return {
          id:         cert.id,
          standard:   cert.compliance_standard,
          label:      STANDARD_LABELS[cert.compliance_standard] ?? cert.compliance_standard,
          issue,
          expires_at: cert.expires_at,
          revoked_at: cert.revoked_at ?? null,
          days:       issue === "expiring_soon" ? daysLeft : null,
        };
      });

    // ── Recent activity ───────────────────────────────────────
    const certIds   = allCerts.slice(0, 50).map((c) => c.id);
    let recentViews = [];

    if (certIds.length > 0) {
      const { data: views, error: viewErr } = await db
        .from("cert_views")
        .select("cert_id, created_at")
        .in("cert_id", certIds)
        .order("created_at", { ascending: false })
        .limit(10);
      if (viewErr) {
        console.warn("[compliance] cert_views query error (non-fatal):", viewErr.message);
      } else {
        recentViews = views ?? [];
      }
    }

    const certStdMap = Object.fromEntries(allCerts.map((c) => [c.id, c.compliance_standard]));

    const recentActivity = [
      ...allCerts.slice(0, 10).map((c) => ({
        type: "generated",
        cert_id: c.id,
        label: STANDARD_LABELS[c.compliance_standard] ?? c.compliance_standard,
        at: c.created_at,
      })),
      ...recentViews.map((v) => ({
        type: "viewed",
        cert_id: v.cert_id,
        label: STANDARD_LABELS[certStdMap[v.cert_id]] ?? "Certificate",
        at: v.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 10);

    return res.status(200).json({
      complianceScore,
      scoreColor,
      totalCerts,
      validCerts,
      risks,
      certs:        allCerts.slice(0, 100),
      recentActivity,
      monthlyCount,
      monthlyLimit: isPaid ? null : 3,
      plan,
      planStatus:   session.user.planStatus ?? token?.planStatus ?? null,
      trialEnd:     session.user.trialEnd   ?? token?.trialEnd   ?? null,
    });

  } catch (err) {
    console.error("[compliance] unhandled error:", err?.message ?? err);
    return res.status(500).json({
      error:  "Failed to load compliance data",
      detail: err?.message ?? String(err),
    });
  }
}

function buildEmpty(plan, session, token) {
  return {
    complianceScore: 100,
    scoreColor:      "green",
    totalCerts:      0,
    validCerts:      0,
    risks:           [],
    certs:           [],
    recentActivity:  [],
    monthlyCount:    0,
    monthlyLimit:    plan === "free" ? 3 : null,
    plan,
    planStatus:      session?.user?.planStatus ?? token?.planStatus ?? null,
    trialEnd:        session?.user?.trialEnd   ?? token?.trialEnd   ?? null,
  };
}
