// =============================================================
// PASSGENI — GUIDE CONTENT: iso-27001-password-requirements
// =============================================================

export const toc = [
  { id: "iso-overview",         title: "ISO 27001:2022 overview"              },
  { id: "annex-a9",             title: "Annex A.9 access control"             },
  { id: "password-requirements","title": "Specific password requirements"     },
  { id: "password-management",  title: "Secret authenticator management"      },
  { id: "user-access",          title: "User access management (A.9.2)"       },
  { id: "privileged-access",    title: "Privileged access (A.9.2.3)"          },
  { id: "mfa-guidance",         title: "MFA under ISO 27001"                  },
  { id: "isms-documentation",   title: "ISMS documentation requirements"      },
  { id: "certification",        title: "Path to certification"                },
];

export const contentHtml = `
<h2 id="iso-overview">ISO 27001:2022 overview</h2>
<p>ISO/IEC 27001:2022 is the international standard for Information Security Management Systems (ISMS). It provides a framework for establishing, implementing, maintaining, and continually improving an ISMS — a systematic approach to managing sensitive information. Certification to ISO 27001 demonstrates to customers, partners, and regulators that your organisation has implemented documented and audited controls for information security.</p>
<p>The 2022 revision (replacing ISO 27001:2013) restructured Annex A, reducing the number of controls from 114 to 93 and grouping them into four themes: Organisational, People, Physical, and Technological. Password and authentication controls appear primarily under Annex A.9 (Access Control) in the technological theme, though authentication is also referenced in Annex A.8 (Asset Management).</p>

<h2 id="annex-a9">Annex A.9 access control</h2>
<p>Annex A.9 in ISO 27001:2022 maps to the following controls. The controls most relevant to password management:</p>

<table>
  <thead><tr><th>Control</th><th>Title</th><th>Key requirement</th></tr></thead>
  <tbody>
    <tr><td>A.9.2.1</td><td>User registration and de-registration</td><td>Formal process for granting and removing access</td></tr>
    <tr><td>A.9.2.2</td><td>User access provisioning</td><td>Formal authorisation for access rights</td></tr>
    <tr><td>A.9.2.3</td><td>Management of privileged access rights</td><td>Separate management of privileged credentials</td></tr>
    <tr><td>A.9.2.4</td><td>Management of secret authentication information</td><td>Password management policy and controls</td></tr>
    <tr><td>A.9.2.5</td><td>Review of user access rights</td><td>Periodic access reviews</td></tr>
    <tr><td>A.9.2.6</td><td>Removal or adjustment of access rights</td><td>Timely revocation on role change or departure</td></tr>
    <tr><td>A.9.3.1</td><td>Use of secret authentication information</td><td>User obligations for credential handling</td></tr>
    <tr><td>A.9.4.2</td><td>Secure log-on procedures</td><td>Authentication process controls</td></tr>
    <tr><td>A.9.4.3</td><td>Password management system</td><td>Technical password system requirements</td></tr>
  </tbody>
</table>

<h2 id="password-requirements">Specific password requirements</h2>
<p>ISO 27001 does not mandate specific password lengths in the standard text. Instead, it requires organisations to implement "appropriate" controls and to reference ISO 27002 for implementation guidance. ISO 27002:2022 (the companion guidance document) provides specific recommendations for A.9.4.3 (Password management system):</p>
<ul>
  <li>Enforce minimum password quality — length, character composition, and avoidance of common or guessable passwords</li>
  <li>Require users to change temporary passwords on first use</li>
  <li>Keep a history of previous passwords and prevent reuse</li>
  <li>Not display passwords on screen during entry</li>
  <li>Store password files separately from application system data</li>
  <li>Store and transmit passwords in protected form only (hashed, not plaintext)</li>
</ul>
<p>For certification purposes, auditors evaluate whether your stated password standards are "appropriate" for the sensitivity classification of the information being protected. Industry consensus for ISO 27001 certification:</p>

<div class="req-row"><span class="req-label">Standard user accounts</span><span class="req-value">≥ 12 characters</span></div>
<div class="req-row"><span class="req-label">Privileged accounts</span><span class="req-value">≥ 14–16 characters</span></div>
<div class="req-row"><span class="req-label">System and service accounts</span><span class="req-value">≥ 20 characters (randomly generated)</span></div>
<div class="req-row"><span class="req-label">Password complexity</span><span class="req-value">Mixed case + numbers + symbols</span></div>
<div class="req-row"><span class="req-label">Breached password check</span><span class="req-value">Recommended (HIBP or equivalent)</span></div>
<div class="req-row"><span class="req-label">Account lockout</span><span class="req-value">After 5–10 failures; configurable</span></div>
<div class="req-row"><span class="req-label">Session timeout</span><span class="req-value">Risk-based; ≤ 30 minutes for sensitive systems</span></div>

<h2 id="password-management">Secret authenticator management (A.9.2.4)</h2>
<p>A.9.2.4 specifically covers the management of secret authentication information — passwords, PINs, and cryptographic keys. The ISO 27002 guidance for this control requires:</p>
<ul>
  <li>All users must sign an agreement to keep personal authentication information confidential</li>
  <li>Initial passwords must be temporary, unique, and changed on first use</li>
  <li>System administrators must never send passwords in plaintext — use secure delivery mechanisms</li>
  <li>Passwords must not be stored in readable format anywhere in the system</li>
  <li>Default system passwords must be changed after installation</li>
</ul>
<p>For password managers: ISO 27002 explicitly recommends password management tools as an implementation mechanism for this control. Organisations that deploy enterprise password managers (1Password Business, Bitwarden Teams) and can demonstrate adoption are generally viewed favourably by auditors on A.9.2.4 compliance.</p>

<div class="callout">
  <strong>Password manager integration:</strong> ISO 27001 certification is significantly easier when an enterprise password manager is deployed. <a href="https://1password.com/teams?utm_source=passgeni&utm_medium=guide&utm_campaign=iso27001" style="color:#C8FF00;" target="_blank" rel="noopener">1Password Business</a> and <a href="https://bitwarden.com/products/business/?utm_source=passgeni&utm_medium=guide&utm_campaign=iso27001" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden Teams</a> both provide audit logs, centrally managed policies, and user adoption reporting — all directly useful as evidence for A.9.2.4 audits.
</div>

<h2 id="user-access">User access management (A.9.2)</h2>
<p>A.9.2 covers the full lifecycle of user access: provisioning, modification, and revocation. The key controls that auditors examine alongside password requirements:</p>
<ul>
  <li><strong>A.9.2.1 Registration:</strong> Formal process documented for granting accounts. No ad-hoc access grants. New accounts require written authorisation.</li>
  <li><strong>A.9.2.2 Provisioning:</strong> Access granted based on least-privilege. Business justification required for each access grant. No "copy from existing user" as sole basis for access.</li>
  <li><strong>A.9.2.5 Review:</strong> Periodic review of who has access to what. Frequency depends on sensitivity — quarterly for privileged access, semi-annual for standard. Reviews must be documented with evidence of who performed the review and when.</li>
  <li><strong>A.9.2.6 Revocation:</strong> Access revoked promptly on departure or role change. Documented timelines in the offboarding procedure. HR process must trigger IT action.</li>
</ul>

<h2 id="privileged-access">Privileged access management (A.9.2.3)</h2>
<p>ISO 27001 treats privileged access management as a separate, higher-risk control. Auditors scrutinise this more than standard user access. Requirements:</p>
<ul>
  <li>Inventory of all privileged accounts — system administrators, database admins, network administrators, cloud console access</li>
  <li>Privileged accounts must not be used for routine non-privileged activities — dual accounts for administrators</li>
  <li>Strong, unique passwords for each privileged account — 14–20 characters, randomly generated</li>
  <li>Privileged account credentials stored in a privileged access management (PAM) solution or equivalent vault</li>
  <li>Regular rotation of privileged credentials — at minimum on departure of any administrator</li>
  <li>All privileged access activity logged and reviewed</li>
</ul>

<h2 id="mfa-guidance">MFA under ISO 27001</h2>
<p>ISO 27001:2022 added a new control — A.8.5 (Secure Authentication) — that explicitly addresses multi-factor authentication. The ISO 27002 guidance for A.8.5 states that MFA should be used for all privileged access and for all remote access, and recommends it for general user access to sensitive systems.</p>
<p>For certification purposes, MFA is expected for:</p>
<ul>
  <li>All remote access (VPN, SSH, RDP)</li>
  <li>All cloud infrastructure console access (AWS, Azure, GCP)</li>
  <li>All privileged accounts without exception</li>
  <li>Access to systems handling personal data, financial data, or other classified information</li>
</ul>
<p>Phishing-resistant MFA — hardware FIDO2 keys — is noted in ISO 27002 as the strongest option. For organisations seeking certification to both ISO 27001 and SOC 2 simultaneously, hardware keys for admin accounts satisfy both standards.</p>

<h2 id="isms-documentation">ISMS documentation requirements</h2>
<p>ISO 27001 requires formal documentation. For access and password controls:</p>
<ol>
  <li><strong>Information Security Policy (mandatory):</strong> Top-level policy establishing the ISMS</li>
  <li><strong>Access Control Policy:</strong> Password standards, MFA requirements, session controls</li>
  <li><strong>User Access Management Procedure:</strong> Provisioning, modification, revocation workflows</li>
  <li><strong>Privileged Access Management Procedure:</strong> How privileged credentials are issued, stored, rotated, and audited</li>
  <li><strong>Risk Assessment:</strong> ISO 27001 requires a formal risk assessment. Authentication strength is a risk treatment for the credential theft risk.</li>
  <li><strong>Statement of Applicability (SoA):</strong> Documents which Annex A controls apply to your organisation and why</li>
  <li><strong>Access Review Records:</strong> Evidence of completed periodic access reviews</li>
</ol>

<h2 id="certification">Path to certification</h2>
<p>ISO 27001 certification requires a two-stage audit by an accredited certification body (BSI, Bureau Veritas, DNV, LRQA, etc.):</p>
<ul>
  <li><strong>Stage 1 (Documentation review):</strong> Auditor reviews your ISMS documentation — policies, procedures, risk assessment, Statement of Applicability. No on-site testing.</li>
  <li><strong>Stage 2 (Certification audit):</strong> Auditor tests whether controls are actually operational. Interviews, system configuration reviews, evidence requests.</li>
</ul>
<p>Common password-related findings in Stage 2 audits: password policies not technically enforced, MFA deployed but not mandatory, access reviews completed on paper but not documented, privileged account passwords not rotated on administrator departure.</p>
<p>Once certified, surveillance audits occur annually and recertification every three years.</p>

<div class="callout">
  PassGeni's ISO 27001 preset enforces 14-character minimum length with full character set, aligned with the privileged access standards that ISO 27002:2022 guidance recommends. Generated credentials are cryptographically random — no dictionary words, no patterns, nothing that auditors can flag as inadequate.
</div>
`;
