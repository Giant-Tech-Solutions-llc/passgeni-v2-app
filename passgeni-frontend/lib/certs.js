/**
 * lib/certs.js — Certificate engine core
 *
 * Handles:
 *  - Compliance rule validation
 *  - HMAC-SHA256 generation session tokens (server-issued, prevents external certs)
 *  - ES256 JWT certificate signing + verification
 *  - JWKS public-key export
 */

import crypto from "crypto";

/* ─── base64url helpers ────────────────────────────────────────────────────── */
const b64u = (buf) => Buffer.from(buf).toString("base64url");
const fromb64u = (str) => Buffer.from(str, "base64url");

/* ─── Compliance rules ────────────────────────────────────────────────────── */
export const STANDARDS = {
  nist:  { label: "NIST SP 800-63B",  minLength: 8,  minEntropy: 0,  requireUpper: false, requireLower: false, requireNumbers: false, requireSpecial: false },
  hipaa: { label: "HIPAA §164.312",   minLength: 12, minEntropy: 0,  requireUpper: true,  requireLower: true,  requireNumbers: true,  requireSpecial: true  },
  pci:   { label: "PCI-DSS v4.0 R8",  minLength: 12, minEntropy: 40, requireUpper: true,  requireLower: true,  requireNumbers: true,  requireSpecial: true  },
  soc2:  { label: "SOC 2 CC6.1",      minLength: 16, minEntropy: 0,  requireUpper: true,  requireLower: true,  requireNumbers: true,  requireSpecial: true  },
  iso:   { label: "ISO 27001:2022 A9", minLength: 14, minEntropy: 0,  requireUpper: true,  requireLower: true,  requireNumbers: true,  requireSpecial: true  },
  fips:  { label: "FIPS 140-3",        minLength: 20, minEntropy: 64, requireUpper: true,  requireLower: true,  requireNumbers: true,  requireSpecial: true  },
};

/** Returns { valid: bool, gaps: string[] } */
export function validateCompliance(params, standard) {
  const rules = STANDARDS[standard];
  if (!rules) return { valid: false, gaps: [`Unknown standard: ${standard}`] };

  const { length, has_upper, has_lower, has_numbers, has_special, entropy_bits } = params;
  const gaps = [];

  if (length < rules.minLength)
    gaps.push(`Minimum length for ${rules.label} is ${rules.minLength} (got ${length})`);
  if (rules.requireUpper && !has_upper)
    gaps.push(`${rules.label} requires uppercase letters`);
  if (rules.requireLower && !has_lower)
    gaps.push(`${rules.label} requires lowercase letters`);
  if (rules.requireNumbers && !has_numbers)
    gaps.push(`${rules.label} requires numbers`);
  if (rules.requireSpecial && !has_special)
    gaps.push(`${rules.label} requires special characters`);
  if (rules.minEntropy > 0 && entropy_bits < rules.minEntropy)
    gaps.push(`${rules.label} requires ≥${rules.minEntropy} bits of entropy (got ${entropy_bits})`);

  return { valid: gaps.length === 0, gaps };
}

/** Returns all standards satisfied by the given params */
export function getStandardsMet(params) {
  return Object.keys(STANDARDS).filter(
    (s) => validateCompliance(params, s).valid
  );
}

/* ─── Session tokens (HMAC-HS256) ────────────────────────────────────────── */
const SESSION_TTL = 10 * 60; // 10 minutes

export function issueSessionToken(params) {
  const secret = process.env.CERT_SESSION_SECRET;
  if (!secret) throw new Error("CERT_SESSION_SECRET is not configured");

  const payload = {
    ...params,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
  };
  const header = b64u(JSON.stringify({ alg: "HS256", typ: "session" }));
  const body = b64u(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const sig = crypto
    .createHmac("sha256", secret)
    .update(signingInput)
    .digest();
  return `${signingInput}.${b64u(sig)}`;
}

export function verifySessionToken(token) {
  const secret = process.env.CERT_SESSION_SECRET;
  if (!secret) throw new Error("CERT_SESSION_SECRET is not configured");

  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed session token");
  const [header, body, sig] = parts;
  const signingInput = `${header}.${body}`;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(signingInput)
    .digest();
  const actual = fromb64u(sig);

  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual))
    throw new Error("Invalid session token signature");

  const payload = JSON.parse(fromb64u(body).toString());
  if (payload.exp < Math.floor(Date.now() / 1000))
    throw new Error("Session token expired");

  return payload;
}

/* ─── ES256 Certificate JWTs ─────────────────────────────────────────────── */
const CERT_KID = "passgeni-cert-key-1";

export function signCertJWT(payload) {
  const privKey = process.env.CERT_PRIVATE_KEY;
  if (!privKey) throw new Error("CERT_PRIVATE_KEY is not configured");

  // PEM may be stored with literal \n — normalise them
  const pem = privKey.replace(/\\n/g, "\n");

  const header = b64u(JSON.stringify({ alg: "ES256", typ: "JWT", kid: CERT_KID }));
  const body = b64u(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;

  const sign = crypto.createSign("SHA256");
  sign.update(signingInput);
  // ieee-p1363 = raw R+S bytes (required for JWT ES256)
  const sig = sign.sign({ key: pem, dsaEncoding: "ieee-p1363" });
  return `${signingInput}.${b64u(sig)}`;
}

export function verifyCertJWT(token) {
  const pubKey = process.env.CERT_PUBLIC_KEY;
  if (!pubKey) throw new Error("CERT_PUBLIC_KEY is not configured");

  const pem = pubKey.replace(/\\n/g, "\n");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed JWT");
  const [header, body, sig] = parts;
  const signingInput = `${header}.${body}`;

  const verify = crypto.createVerify("SHA256");
  verify.update(signingInput);
  const valid = verify.verify(
    { key: pem, dsaEncoding: "ieee-p1363" },
    fromb64u(sig)
  );
  if (!valid) throw new Error("Invalid certificate signature");

  return JSON.parse(fromb64u(body).toString());
}

/** Returns a JWK Set containing the public key — used at /api/certs/jwks */
export function getJWKS() {
  const pubKey = process.env.CERT_PUBLIC_KEY;
  if (!pubKey) return { keys: [] };

  const pem = pubKey.replace(/\\n/g, "\n");
  const keyObj = crypto.createPublicKey({ key: pem, format: "pem" });
  const jwk = keyObj.export({ format: "jwk" });

  return {
    keys: [
      {
        ...jwk,
        alg: "ES256",
        use: "sig",
        kid: CERT_KID,
      },
    ],
  };
}

/* ─── Cert payload builder ───────────────────────────────────────────────── */
export function buildCertPayload({ certId, userId, email, sessionParams }) {
  const { compliance_standard, length, has_upper, has_lower, has_numbers, has_special, entropy_bits, char_pool_size } = sessionParams;
  const standards_met = getStandardsMet(sessionParams);
  const now = Math.floor(Date.now() / 1000);

  return {
    jti: certId,
    iss: "passgeni.ai",
    sub: userId,
    email,
    cert_version: "2.0",
    compliance_standard,
    entropy_bits,
    char_pool_size,
    generation_params: { length, has_upper, has_lower, has_numbers, has_special },
    entropy_source: "crypto.getRandomValues (FIPS 140-3 aligned)",
    standards_met,
    iat: now,
    exp: now + 365 * 24 * 60 * 60, // 1 year
  };
}
