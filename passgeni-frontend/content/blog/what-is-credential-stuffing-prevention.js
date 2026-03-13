export const contentHtml = `
<h2>Why credential stuffing is a volume game</h2>
<p>Credential stuffing works because most people reuse passwords. After a breach of site A, attackers take those email/password pairs and try them automatically against site B, C, and D. Success rates are low — typically 0.1% to 2% — but on a breach of 100 million credentials, a 1% success rate means a million account takeovers. The economics work at scale even with low success rates.</p>

<h2>What doesn't work (well)</h2>
<p><strong>CAPTCHA alone:</strong> Modern CAPTCHA solving services cost less than $1 per 1,000 solves. Attackers factor this in. CAPTCHAs slow them down but don't stop them.</p>
<p><strong>IP blocking alone:</strong> Credential stuffing attacks use residential proxy networks with millions of IPs. Blocking individual IPs is a game of whack-a-mole. Blocking entire IP ranges causes collateral damage to legitimate users.</p>
<p><strong>Rate limiting per IP:</strong> Proxy rotation defeats per-IP rate limits. Distributed attacks spread attempts across thousands of IPs to stay below any threshold.</p>

<h2>What actually works</h2>
<p><strong>Multi-factor authentication:</strong> Even a valid username/password pair is useless to a credential stuffer if MFA is required. This is the single most effective control. TOTP adds a time-sensitive element that automated attacks cannot handle without real-time interception infrastructure.</p>
<p><strong>Breach password checking at login:</strong> Check submitted passwords against the Have I Been Pwned API during authentication. If the credential matches a known breach pair, prompt for a password reset regardless of whether the login "succeeded." NIST 800-63B recommends this approach explicitly.</p>
<p><strong>Behavioural anomaly detection:</strong> Flag authentication attempts that deviate from a user's established pattern — unusual geolocation, new device, unusual time, velocity anomalies. Require step-up authentication for flagged logins.</p>
<p><strong>Passkey / FIDO2 adoption:</strong> Credential stuffing requires a password to stuff. Passkeys eliminate passwords from the authentication flow entirely. Not yet universally supported, but adoption is accelerating.</p>
<p>Use PassGeni's <a href="/tools/breach-checker">Breach Checker</a> to verify whether your credentials appear in known datasets before attackers do.</p>
`;