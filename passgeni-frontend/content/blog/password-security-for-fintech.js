export const contentHtml = `
<h2>The fintech credential surface</h2>
<p>Fintech companies have a uniquely complex credential landscape. They handle customer financial data under PCI-DSS, often integrate with banks via Open Banking APIs under strict authentication requirements, run internal developer access to production systems with real money, and manage API keys that directly control financial transactions. A credential failure in any of these areas can have immediate, large-scale financial consequences.</p>

<h2>PCI-DSS v4.0 requirements for fintech</h2>
<p>PCI-DSS v4.0 (effective March 2024) raised the password bar for cardholder data environment (CDE) access:</p>
<ul>
  <li>Minimum 12 characters for all accounts with CDE access (up from 8 in v3.2.1)</li>
  <li>Passwords must include uppercase, lowercase, and either number or special character</li>
  <li>MFA is now required for all access into the CDE, not just remote access</li>
  <li>Service accounts and system passwords must be managed with the same rigour as user accounts</li>
  <li>Shared generic accounts (root, admin) are prohibited — all CDE access must be individual and auditable</li>
</ul>
<p>PassGeni's PCI-DSS preset automatically enforces Requirement 8.3.6 password complexity. Use it for all CDE-adjacent credential generation.</p>

<h2>Open Banking and API authentication</h2>
<p>Open Banking frameworks (UK Open Banking, EU PSD2) require strong customer authentication (SCA) — typically multi-factor — for payment initiation and account access. API credentials (client IDs, secrets, certificates) must be managed with rotation policies and stored in secrets management systems.</p>
<p>Common failures in fintech Open Banking implementations:</p>
<ul>
  <li>API secrets hardcoded in repositories</li>
  <li>Shared client credentials across development and production environments</li>
  <li>No rotation schedule for long-lived API credentials</li>
  <li>Client secrets stored in plaintext in configuration files</li>
</ul>

<h2>Internal developer access to production</h2>
<p>In fintech, production database access means access to real transactions and customer financial data. Controls that should be in place:</p>
<ul>
  <li>Privileged access management (PAM) for production database and infrastructure access</li>
  <li>Just-in-time access provisioning (temporary elevation with full audit trail)</li>
  <li>MFA for all production access without exception</li>
  <li>Secrets rotation integrated with CI/CD pipelines via a secrets manager (HashiCorp Vault, AWS Secrets Manager)</li>
  <li>Service account passwords generated to DoD preset standards (15+ characters) with quarterly rotation</li>
</ul>

<h2>API key lifecycle management</h2>
<p>Generate API keys with maximum entropy (PassGeni's API generates 40-character keys with full character sets by default). Store only the hash server-side. Display the key once at generation, never again. Build key rotation UI into your dashboard from day one — retrofitting it is expensive and leads to rotation being skipped. Set expiry dates on all non-human API credentials. Scan your repositories for accidentally committed secrets using tools like TruffleHog or GitHub Secret Scanning.</p>
`;