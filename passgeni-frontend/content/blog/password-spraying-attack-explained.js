export const contentHtml = `
<h2>What is a password spraying attack?</h2>
<p>A password spray attack is the opposite of a brute-force attack. Instead of trying thousands of passwords against one account, an attacker tries <em>one</em> common password against thousands of accounts.</p>
<p>The most commonly sprayed passwords in enterprise environments: <code>Spring2025!</code>, <code>Welcome1</code>, <code>Password1</code>, <code>Company123</code>, <code>January2025</code>. These satisfy most corporate password complexity requirements. Tens of thousands of accounts at any large organisation will use one of them.</p>
<p>The critical advantage for attackers: most account lockout policies trigger after 5–10 failed attempts <em>per account</em>. Spraying one attempt across 10,000 accounts never triggers lockout on any individual account, even if it successfully compromises hundreds of them.</p>

<h2>Why spray attacks are so effective against enterprises</h2>
<p>Corporate environments create the perfect conditions for password spray attacks:</p>
<ul>
  <li><strong>Complexity policies with rotation:</strong> When you force quarterly password resets with complexity requirements, users pick <code>Summer2025!</code> → <code>Fall2025!</code> → <code>Winter2025!</code>. Attackers know this pattern and spray it seasonally.</li>
  <li><strong>Predictable usernames:</strong> Corporate email formats (firstname.lastname@company.com) are easily enumerated from LinkedIn. Attackers have the full target list before they start.</li>
  <li><strong>Per-account lockout policies:</strong> Legacy systems lock accounts after N failures <em>per account</em>, which spray attacks intentionally stay below.</li>
  <li><strong>No breach detection:</strong> One failed login per account looks like a normal mistype, not an attack.</li>
</ul>

<h2>How to detect a spray attack in progress</h2>
<p>Signs in your authentication logs:</p>
<ul>
  <li>Unusual number of failed logins spread across many different accounts in a short window</li>
  <li>Failed logins originating from a single IP or small IP range</li>
  <li>Failed logins exactly <code>N-1</code> times per account (staying just below lockout threshold)</li>
  <li>Timing patterns suggesting automated attempts (precise intervals between requests)</li>
  <li>Logins outside normal business hours across many accounts simultaneously</li>
</ul>

<h2>How to defend against password spraying</h2>
<p><strong>The most important defence: eliminate predictable passwords.</strong> Spray attacks work because password complexity policies produce predictable outputs. If your organisation uses PassGeni's compliance presets to generate employee initial passwords — and enforces passphrases on reset — spray attacks stop finding valid credentials.</p>
<p>Technical defences:</p>
<ul>
  <li><strong>Rate limit by IP, not by account:</strong> Detect unusually high authentication volumes from any source, regardless of which accounts are targeted.</li>
  <li><strong>Anomaly detection:</strong> Flag distributed authentication failures that individually stay below per-account thresholds.</li>
  <li><strong>MFA everywhere:</strong> Even a successfully sprayed password is useless if MFA is required. FIDO2 hardware keys eliminate this attack class entirely for enrolled accounts.</li>
  <li><strong>Conditional access policies:</strong> Require additional verification for logins from new locations, at unusual hours, or from unmanaged devices.</li>
  <li><strong>Breach password checking:</strong> NIST 800-63B recommends checking passwords against known-breached lists at creation. Commonly sprayed passwords are always in breach lists.</li>
</ul>

<h2>What to do if you've been spray-attacked</h2>
<p>If you detect a spray attack in progress or evidence of one in your logs: force password resets for all accounts that received a failed login attempt in the attack window, enable MFA immediately for all accounts if not already enforced, and check authentication logs for successful logins during the attack period — some accounts may be compromised.</p>
<p>Use PassGeni's <a href="/tools/breach-checker">breach checker</a> to verify whether credentials from your organisation appear in known breached datasets.</p>
`;
