// =============================================================
// PASSGENI — BLOG POST CONTENT
// pci-dss-v4-password-changes-explained
// =============================================================

export const contentHtml = `
<h2>The headline number: 7 became 12</h2>
<p>PCI-DSS v3.2.1 required a minimum password length of 7 characters. That requirement was published in 2018, when most security guidance still treated complexity as the primary lever for password strength. PCI-DSS v4.0, which became the sole enforceable version in March 2024, raised that minimum to 12 characters.</p>
<p>Seven to twelve sounds like a modest change. In practice, it is a significant operational shift for organisations whose authentication systems were built against the v3.2.1 baseline — particularly legacy healthcare payment systems, point-of-sale infrastructure, and older enterprise applications that have character length limits baked into their database schemas.</p>

<h2>The change that matters more: MFA scope</h2>
<p>The 12-character minimum got the headlines. The more impactful change was buried in Requirement 8.4.2.</p>
<p>Under v3.2.1, multi-factor authentication was required for remote access and non-console administrative access. That meant your VPN, your admin panels, your remote desktop connections.</p>
<p>Under v4.0, MFA is required for <em>all access into the Cardholder Data Environment</em> — not just remote access. Employees working inside the office, on the corporate network, accessing payment systems, now need a second factor.</p>
<p>For many organisations, this means rolling out MFA to a much broader population of users on a much tighter timeline than they planned for. The complexity is compounded by the variety of authenticator types that qualify: TOTP apps, push notifications, hardware tokens, and (reluctantly) SMS OTP all satisfy the requirement. But SMS is increasingly viewed as inadequate by security-conscious QSAs, and organisations that implement it now may face pressure to migrate again as the standard evolves.</p>

<h2>What auditors will actually check</h2>
<p>Based on QSA guidance and early v4.0 audit cycles, here are the specific controls auditors are scrutinising most closely:</p>
<ul>
  <li><strong>Password length enforcement at the system level, not just policy.</strong> A written policy saying "passwords must be 12+ characters" is not sufficient. The authentication system must enforce it technically. If your legacy POS can still accept a 7-character password, you have a finding.</li>
  <li><strong>MFA coverage for all CDE access paths.</strong> Auditors will map every access path into the CDE — not just the obvious ones. Internal workstations, application-level access, batch processing accounts that can interactively log in, all of it.</li>
  <li><strong>Service account credential management.</strong> Requirement 8.6 is new and catches many organisations off guard. Service account passwords stored in configuration files, environment variables, or version control are findings. Secrets management systems (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) are the expected solution.</li>
  <li><strong>Vendor default password removal.</strong> Requirement 2.2.2 has always existed but is now examined more rigorously. Every network device, every piece of payment hardware, every database with a default credential in scope must have that credential changed before deployment.</li>
</ul>

<h2>The passphrase exception (underused)</h2>
<p>One change in v4.0 that most organisations have not noticed: passphrases are now explicitly permitted. Requirement 8.3.6's guidance text acknowledges that a 15+ character passphrase satisfies the intent of the password strength requirement.</p>
<p>This matters for usability. In environments where users resist 12-character complex passwords (clinical staff, warehouse workers, retail associates), a passphrase like <code>violet-marble-funnel-sunrise</code> is significantly more usable and meets the requirement. The 15-character minimum for passphrases versus 12 for passwords reflects that passphrases typically use smaller character pools (dictionary words).</p>

<h2>Timeline: where are we now</h2>
<p>All v4.0 requirements, including those originally marked as "future-dated" (which had a March 2025 deadline), are now in full effect. There are no remaining grace periods. If you are scheduled for a QSA assessment and have not updated to v4.0 controls, you will have findings.</p>
<p>The most common issues we see in organisations still catching up:</p>
<ul>
  <li>Legacy web application login forms enforcing 7 or 8 character minimums hardcoded in HTML validation</li>
  <li>VoIP systems and building access systems in the CDE scope with default credentials</li>
  <li>Service account passwords in <code>.env</code> files committed to private Git repositories</li>
  <li>MFA deployed for VPN but not for internal CDE access</li>
</ul>

<h2>What to do this week</h2>
<p>If you have not yet audited your authentication controls against PCI-DSS v4.0 Requirement 8, the highest-priority actions:</p>
<ol>
  <li>Inventory every system in your CDE scope that accepts passwords</li>
  <li>For each system, verify technical enforcement of 12+ character minimum (not just policy)</li>
  <li>Map every access path into the CDE — internal and remote — and verify MFA coverage</li>
  <li>Search version control and configuration management for credentials in plaintext</li>
  <li>Run a scan against all in-scope systems for vendor default credentials</li>
</ol>
<p>The PassGeni PCI-DSS preset generates 12-character minimum credentials with full character set complexity, ready to use for any in-scope system.</p>
`;
