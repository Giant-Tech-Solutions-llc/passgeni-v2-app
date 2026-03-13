export const contentHtml = `
<h2>Why your organisation needs a written password policy</h2>
<p>A written password policy is a requirement for SOC 2, ISO 27001, HIPAA, and most enterprise security frameworks. Beyond compliance, it provides a consistent reference that removes subjective interpretation from access control decisions. When an employee asks "does this password meet requirements?" the answer is in the document, not in someone's opinion.</p>
<p>Most organisations don't have one. Use PassGeni's <a href="/tools/policy-generator">Policy Generator</a> for a ready-made version. Below is a framework you can customise.</p>

<h2>Core policy template</h2>
<p><strong>Section 1: Scope</strong><br />This policy applies to all employees, contractors, and third parties with access to [Organisation] information systems. All accounts — user, administrator, service, and API — are covered.</p>

<p><strong>Section 2: Password requirements</strong></p>
<ul>
  <li>Minimum length: 12 characters for standard accounts; 15 characters for privileged accounts</li>
  <li>Character requirements: at least one uppercase, one lowercase, one number, one symbol</li>
  <li>Passphrases (4+ random words) are explicitly permitted as an alternative to complex passwords</li>
  <li>Passwords must not appear in the Have I Been Pwned breach database</li>
  <li>Passwords must not contain the user's name, username, or organisation name</li>
  <li>The same password may not be used for multiple systems</li>
</ul>

<p><strong>Section 3: Password management</strong></p>
<ul>
  <li>All employees must use an approved password manager for work credentials</li>
  <li>Approved password managers: [Bitwarden / 1Password / other]</li>
  <li>Passwords must not be shared via email, Slack, SMS, or any unencrypted channel</li>
  <li>Temporary password sharing (where required) must use encrypted one-time links</li>
</ul>

<p><strong>Section 4: Multi-factor authentication</strong></p>
<ul>
  <li>MFA is required for all cloud services, email, VPN, and systems containing personal data</li>
  <li>TOTP authenticator apps are the minimum; hardware keys are required for privileged access</li>
  <li>SMS 2FA is not acceptable except where no alternative is available</li>
</ul>

<p><strong>Section 5: Password rotation</strong></p>
<ul>
  <li>Passwords are not required to be changed on a fixed schedule unless there is evidence of compromise</li>
  <li>Immediate rotation is required upon any known or suspected compromise</li>
  <li>Service account passwords are rotated quarterly</li>
</ul>

<p><strong>Section 6: Incident response</strong></p>
<ul>
  <li>Any suspected credential compromise must be reported to the security team within 24 hours</li>
  <li>Compromised accounts will be locked and credentials reset before reactivation</li>
</ul>

<p>Tailor section 2 minimums to your specific compliance framework. For HIPAA, 12-character minimum. For SOC 2 Type II, 16-character minimum is defensible. For PCI-DSS v4.0, 12-character minimum with MFA for all CDE access.</p>
`;