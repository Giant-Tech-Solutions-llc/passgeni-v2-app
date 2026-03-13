export const contentHtml = `
<h2>Why nonprofits are targeted</h2>
<p>Nonprofits are increasingly targeted by cybercriminals for a simple reason: they handle valuable data (donor PII, financial records, sometimes healthcare or legal data) with security budgets a fraction of what commercial organisations spend. The attack surface is real. The defences are often minimal.</p>
<p>A donor database breach isn't just a PR problem — it can trigger regulatory action if the nonprofit processed health-related donations, operates in the EU (GDPR), or is a US healthcare charity (HIPAA may apply). More immediately, it destroys donor trust that took years to build.</p>

<h2>Free and low-cost tools that work</h2>
<ul>
  <li><strong>Bitwarden:</strong> Free tier is genuinely complete for small teams. Paid team plan is $3/user/month — likely the most cost-effective credential management solution available.</li>
  <li><strong>PassGeni free tools:</strong> Password generator, breach checker, strength checker, policy generator — all free, no account required.</li>
  <li><strong>Google Workspace for Nonprofits:</strong> Free for eligible nonprofits. Includes SSO, conditional access, and admin-enforced 2FA.</li>
  <li><strong>Microsoft 365 for Nonprofits:</strong> Heavily discounted. Azure AD enforces MFA and Conditional Access policies.</li>
  <li><strong>Have I Been Pwned:</strong> Free domain-level monitoring — get notified when any email address at your domain appears in a breach.</li>
</ul>

<h2>Volunteer and temporary account management</h2>
<p>Volunteers create a unique security challenge: they need access for a defined period and then leave — often without a formal offboarding process. Best practices:</p>
<ul>
  <li>Create volunteer accounts with expiry dates or review them quarterly</li>
  <li>Use role-based access — volunteers need specific system access, not broad admin rights</li>
  <li>Generate temporary passwords with PassGeni and share via one-time encrypted links</li>
  <li>Enable MFA for all accounts, including volunteer accounts</li>
  <li>Run a quarterly access review to deactivate dormant accounts</li>
</ul>

<h2>Written password policy: required for most grants</h2>
<p>Many foundation grants and government contracts now require nonprofits to have a documented information security policy. Use PassGeni's <a href="/tools/policy-generator">Policy Generator</a> to create a NIST-aligned written password policy in minutes. Having a written policy is itself a significant compliance signal to grant-making bodies.</p>
`;