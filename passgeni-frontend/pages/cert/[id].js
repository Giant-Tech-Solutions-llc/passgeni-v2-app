/**
 * /cert/[id] — Public certificate verification page
 * No auth required. Must look like a legal document.
 */

import { useState } from "react";
import Head from "next/head";
import { getCertificate, logCertView } from "../../lib/db/certs.js";
import { verifyCertJWT } from "../../lib/certs.js";
import { STANDARDS } from "../../lib/compliance.js";
import QRCode from "qrcode";
import crypto from "crypto";

const STANDARD_FULL = {
  nist:  { label: "NIST SP 800-63B",       color: "#60a5fa", body: "Digital Identity Guidelines — Length-over-complexity model." },
  hipaa: { label: "HIPAA §164.312(d)",      color: "#34d399", body: "Technical safeguards for electronic protected health information." },
  pci:   { label: "PCI-DSS v4.0 Req 8.3",  color: "#a78bfa", body: "Payment Card Industry Data Security Standard." },
  soc2:  { label: "SOC 2 Trust Criterion CC6.1", color: "#fb923c", body: "Logical and physical access controls for Type II audits." },
  iso:   { label: "ISO/IEC 27001:2022 A.9", color: "#f472b6", body: "Information security access control policy." },
  fips:  { label: "FIPS PUB 140-3",         color: "#facc15", body: "Security requirements for cryptographic modules." },
};

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;

  const cert = await getCertificate(id).catch(() => null);
  if (!cert) return { notFound: true };

  // Verify ES256 signature
  let signatureValid = false;
  let jwtPayload = null;
  try {
    jwtPayload = verifyCertJWT(cert.jwt_token);
    signatureValid = true;
  } catch {
    signatureValid = false;
  }

  // Log view fire-and-forget
  const rawIp = ((req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "")).split(",")[0].trim();
  logCertView(id, rawIp);

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://passgeni.ai";
  const certUrl = `${baseUrl}/cert/${id}`;
  const qrDataUrl = await QRCode.toDataURL(certUrl, {
    width: 160,
    margin: 1,
    color: { dark: "#c8ff00", light: "#00000000" },
  }).catch(() => null);

  const now = new Date();
  const expiresAt = new Date(cert.expires_at);
  const isExpired = expiresAt < now;
  const isRevoked = cert.is_revoked;
  const isValid = !isRevoked && !isExpired && signatureValid;

  // Compute SHA-256 fingerprint of the JWT (so auditors can reference the cert by hash)
  const jwtFingerprint = crypto.createHash("sha256").update(cert.jwt_token).digest("hex");

  return {
    props: {
      cert: {
        id: cert.id,
        email: cert.email
          ? cert.email.replace(/^(.{2}).*(@.*)$/, "$1***$2")  // redact email
          : null,
        compliance_standard: cert.compliance_standard,
        standard_label: STANDARDS[cert.compliance_standard]?.label ?? cert.compliance_standard,
        entropy_bits: cert.entropy_bits,
        char_pool_size: cert.char_pool_size,
        standards_met: cert.standards_met ?? [],
        generation_params: cert.generation_params,
        created_at: cert.created_at,
        expires_at: cert.expires_at,
        is_revoked: isRevoked,
        revoked_at: cert.revoked_at ?? null,
      },
      status: isRevoked ? "revoked" : isExpired ? "expired" : isValid ? "valid" : "invalid",
      signatureValid,
      jwtFingerprint: `${jwtFingerprint.slice(0, 8)}…${jwtFingerprint.slice(-8)}`,
      jwtFingerprintFull: jwtFingerprint,
      qrDataUrl,
      certUrl,
    },
  };
}

/* ─── Status badge ───────────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cfg = {
    valid:   { bg: "rgba(0,208,132,0.1)",  border: "rgba(0,208,132,0.35)",  color: "#00d084", icon: "✦", label: "VERIFIED" },
    revoked: { bg: "rgba(255,68,68,0.1)",  border: "rgba(255,68,68,0.35)",  color: "#ff4444", icon: "✕", label: "REVOKED" },
    expired: { bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.35)", color: "#facc15", icon: "!", label: "EXPIRED" },
    invalid: { bg: "rgba(255,68,68,0.1)",  border: "rgba(255,68,68,0.35)",  color: "#ff4444", icon: "✕", label: "INVALID SIGNATURE" },
  };
  const c = cfg[status] ?? cfg.invalid;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 20px",
      borderRadius: 8,
      background: c.bg,
      border: `1px solid ${c.border}`,
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: c.color,
        boxShadow: status === "valid" ? `0 0 8px ${c.color}` : "none",
      }} />
      <span style={{ fontFamily: "Space Mono, monospace", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: c.color }}>
        {c.icon} {c.label}
      </span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function CertPage({ cert, status, signatureValid, jwtFingerprint, jwtFingerprintFull, qrDataUrl, certUrl }) {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const stdInfo = STANDARD_FULL[cert.compliance_standard] ?? { label: cert.standard_label, color: "#c8ff00", body: "" };
  const fmt = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <Head>
        <title>PassGeni Certificate — {cert.standard_label}</title>
        <meta name="description" content={`PassGeni compliance certificate for ${cert.standard_label}. Entropy: ${cert.entropy_bits} bits. Issued ${fmt(cert.created_at)}.`} />
        <meta name="robots" content="noindex" />
      </Head>

      {/* outer page */}
      <div style={{ minHeight: "100vh", background: "#060608", color: "#e0e0e0", fontFamily: "Outfit, sans-serif" }}>

        {/* header bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 0" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 28, height: 28, background: "#c8ff00", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontWeight: 900, color: "#000", fontSize: 14 }}>✦</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: "-0.02em" }}>PassGeni</span>
            </a>
            <a href="/signup" style={{ fontSize: 12, color: "#c8ff00", textDecoration: "none", border: "1px solid rgba(200,255,0,0.3)", padding: "5px 12px", borderRadius: 6 }}>
              Get PassGeni →
            </a>
          </div>
        </div>

        {/* certificate document */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

          {/* document header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#555", marginBottom: 12, fontFamily: "Space Mono, monospace" }}>
              COMPLIANCE CERTIFICATE
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 8 }}>
              {stdInfo.label}
            </h1>
            <p style={{ fontSize: 13, color: "#666", maxWidth: 400, margin: "0 auto" }}>
              {stdInfo.body}
            </p>
          </div>

          {/* status badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <StatusBadge status={status} />
          </div>

          {/* main certificate card */}
          <div style={{
            background: "#0a0a0c",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            overflow: "hidden",
          }}>
            {/* card header */}
            <div style={{
              padding: "20px 28px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(200,255,0,0.025)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: 12, color: "#666" }}>
                CERT ID
                <div style={{ color: "#888", marginTop: 2, fontSize: 11 }}>{cert.id}</div>
              </div>
              <div style={{ fontSize: 11, color: stdInfo.color, fontWeight: 700, letterSpacing: "0.08em" }}>
                ● {cert.standard_label}
              </div>
            </div>

            {/* fields */}
            <div style={{ padding: "8px 0" }}>
              {[
                ["Issuer",          "PassGeni Authority (passgeni.ai)"],
                ["Standard",        cert.standard_label],
                ["Entropy",         `${cert.entropy_bits} bits`],
                ["Character Pool",  `${cert.char_pool_size} characters`],
                ["Entropy Source",  "crypto.getRandomValues (FIPS 140-3 aligned)"],
                ["Length",          `${cert.generation_params?.length ?? "—"} characters`],
                ["Includes Upper",  cert.generation_params?.has_upper ? "Yes" : "No"],
                ["Includes Lower",  cert.generation_params?.has_lower ? "Yes" : "No"],
                ["Includes Numbers",cert.generation_params?.has_numbers ? "Yes" : "No"],
                ["Includes Special",cert.generation_params?.has_special ? "Yes" : "No"],
                ["Issued For",      cert.email ?? "Anonymous"],
                ["Issued",          fmt(cert.created_at)],
                ["Expires",         fmt(cert.expires_at)],
                ["Algorithm",       "ES256 (ECDSA P-256 / SHA-256)"],
                ["Signature",       signatureValid ? "Valid — cryptographically verified" : "INVALID"],
                ["JWT Fingerprint", jwtFingerprint],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 28px",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  gap: 16,
                }}>
                  <span style={{ fontSize: 12, color: "#555", flexShrink: 0, fontFamily: "Space Mono, monospace" }}>{k}</span>
                  <span style={{
                    fontSize: 12,
                    color: k === "Signature" ? (signatureValid ? "#00d084" : "#ff4444") : "#ccc",
                    textAlign: "right",
                    fontFamily: k === "JWT Fingerprint" || k === "Algorithm" ? "Space Mono, monospace" : "inherit",
                  }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* standards also met */}
            {cert.standards_met && cert.standards_met.length > 1 && (
              <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 10, fontFamily: "Space Mono, monospace", letterSpacing: "0.07em" }}>
                  ALSO SATISFIES
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {cert.standards_met
                    .filter((s) => s !== cert.compliance_standard)
                    .map((s) => (
                      <span key={s} style={{
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 99,
                        border: `1px solid ${STANDARD_FULL[s]?.color ?? "#333"}40`,
                        color: STANDARD_FULL[s]?.color ?? "#888",
                        background: `${STANDARD_FULL[s]?.color ?? "#333"}10`,
                      }}>
                        {STANDARDS[s]?.label ?? s}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* QR + revoke warning */}
            <div style={{
              padding: "20px 28px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 6, fontFamily: "Space Mono, monospace" }}>SCANNABLE URL</div>
                {qrDataUrl && (
                  <img src={qrDataUrl} alt="Certificate QR code" style={{ width: 80, height: 80, display: "block" }} />
                )}
              </div>
              <div style={{ maxWidth: 340, fontSize: 12, color: "#444", lineHeight: 1.65 }}>
                This certificate was issued by PassGeni and cryptographically signed using ES256 (ECDSA P-256).
                It can be verified offline using the public key at{" "}
                <span style={{ color: "#666", fontFamily: "Space Mono, monospace" }}>passgeni.ai/api/certs/jwks</span>.
                The original credential is never stored.
              </div>
            </div>
          </div>

          {/* revoked/expired notice */}
          {(status === "revoked" || status === "expired") && (
            <div style={{
              marginTop: 20,
              padding: "16px 20px",
              borderRadius: 10,
              background: "rgba(255,68,68,0.08)",
              border: "1px solid rgba(255,68,68,0.2)",
              fontSize: 13,
              color: "#ff9999",
            }}>
              {status === "revoked"
                ? `This certificate was revoked${cert.revoked_at ? ` on ${fmt(cert.revoked_at)}` : ""}. The credential it certified may still be valid — the owner can re-certify at any time.`
                : `This certificate expired on ${fmt(cert.expires_at)}. The credential it certified may still be valid — the owner can re-certify to get a current certificate.`}
            </div>
          )}

          {/* offline verification collapsible */}
          <div style={{ marginTop: 20, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
            <button
              onClick={() => setVerifyOpen((v) => !v)}
              style={{ width: "100%", background: "none", border: "none", padding: "14px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#666", fontSize: 13, fontFamily: "inherit" }}
            >
              <span>How to verify this certificate offline</span>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{verifyOpen ? "−" : "+"}</span>
            </button>
            {verifyOpen && (
              <div style={{ padding: "0 20px 20px", fontSize: 13, color: "#888", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ marginTop: 14 }}>
                  This certificate can be verified using PassGeni&apos;s public key at{" "}
                  <span style={{ fontFamily: "Space Mono, monospace", color: "#c8ff00", fontSize: 11 }}>passgeni.ai/.well-known/jwks.json</span>.
                  Decode the JWT and verify the ES256 signature. No login or API call required.
                </p>
                <p style={{ margin: 0 }}>
                  The JWT fingerprint for this certificate is{" "}
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: "#aaa" }}>{jwtFingerprintFull}</span>.
                </p>
              </div>
            )}
          </div>

          {/* footer CTA */}
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <div style={{ fontSize: 12, color: "#444", marginBottom: 16 }}>
              This certificate was verified by PassGeni. Get your own.
            </div>
            <a href="/signup" style={{
              display: "inline-block",
              background: "#c8ff00",
              color: "#000",
              fontWeight: 800,
              fontSize: 14,
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              Get PassGeni — Free →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
