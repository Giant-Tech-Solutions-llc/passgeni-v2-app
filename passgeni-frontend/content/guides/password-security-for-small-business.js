// =============================================================
// PASSGENI — GUIDE CONTENT: password-security-for-small-business
// =============================================================

export const toc = [
  { id: "why-smbs-targeted",   title: "Why small businesses are primary targets"  },
  { id: "biggest-risks",       title: "The three biggest credential risks"        },
  { id: "password-policy",     title: "Writing a simple password policy"          },
  { id: "password-manager",    title: "Choosing a business password manager"      },
  { id: "mfa-rollout",         title: "Rolling out MFA without IT staff"          },
  { id: "shared-accounts",     title: "Handling shared accounts and logins"       },
  { id: "offboarding",         title: "When someone leaves"                       },
  { id: "compliance-lite",     title: "Compliance without an IT department"       },
  { id: "quick-wins",          title: "Quick wins this week"                      },
];

export const contentHtml = `
<h2 id="why-smbs-targeted">Why small businesses are primary targets</h2>
<p>Small businesses are the most targeted sector for credential-based attacks — not the least. The logic from an attacker's perspective: large enterprises have security teams, endpoint detection, and SIEM tools that make sustained attacks expensive. Small businesses typically have none of these. The attack difficulty is lower, the credential hygiene is usually worse, and cyber insurance coverage (if it exists) means there may be a payout at the end.</p>
<p>The FBI's Internet Crime Report consistently places business email compromise (BEC) and credential theft among the top losses for small businesses. A compromised email account can redirect invoices, authorize wire transfers, and access banking portals. The financial impact of a single credential compromise often exceeds $50,000 for small businesses, primarily through fraudulent transfers that are not recoverable.</p>

<h2 id="biggest-risks">The three biggest credential risks</h2>
<p><strong>1. Shared passwords across the team.</strong> The most common small business credential failure: one password for the company's social media, one for the shared email inbox, one for the accounting software. When an employee leaves, no one changes it. When a breach occurs, it's unclear whose credentials were involved. Shared passwords eliminate accountability and make revocation impossible.</p>
<p><strong>2. Password reuse.</strong> The business owner using the same password for personal email, the business bank portal, and the company Wi-Fi router is the norm, not the exception. When any one of these is breached (and personal email accounts are breached constantly), all of them are exposed simultaneously.</p>
<p><strong>3. No offboarding process.</strong> An ex-employee who still has login credentials to the company's Shopify store, G Suite account, or QuickBooks is not an abstract risk — it is an active security incident waiting to happen. Departing-employee access revocation is the most consistently overlooked credential control in small businesses.</p>

<h2 id="password-policy">Writing a simple password policy</h2>
<p>You do not need a security team to write a usable password policy. A one-page document is sufficient. The essentials:</p>
<ul>
  <li><strong>Minimum length:</strong> 12 characters for all accounts. 16+ for banking, accounting software, and email.</li>
  <li><strong>No reuse across accounts:</strong> Every system gets a unique password. The password manager handles this — employees don't need to memorise unique passwords for each system.</li>
  <li><strong>Password manager required:</strong> Specify the approved tool (see next section) and state that it is the required mechanism for storing business credentials.</li>
  <li><strong>MFA on all critical accounts:</strong> Define "critical" for your business — typically: email, banking, accounting software, CRM, primary cloud provider.</li>
  <li><strong>No sharing:</strong> Each employee has their own credentials to each system. Shared accounts are documented exceptions, managed through the password manager's shared vault feature.</li>
  <li><strong>Offboarding:</strong> All access must be revoked within [24 hours] of departure. One person is responsible for this.</li>
</ul>
<p>Post this somewhere visible. Review it annually. Update it when you add new critical systems to the business.</p>

<h2 id="password-manager">Choosing a business password manager</h2>
<p>A business password manager is the single highest-impact security investment for a small business. It enables unique passwords without cognitive burden, handles team sharing securely, and provides audit logs for compliance purposes.</p>
<p>The main options for small businesses:</p>

<table>
  <thead><tr><th>Product</th><th>Price</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>1Password Teams</td><td>$4/user/month</td><td>Best UX, easiest adoption, excellent support</td></tr>
    <tr><td>Bitwarden Teams</td><td>$3/user/month</td><td>Open-source, self-hostable, lower cost</td></tr>
    <tr><td>Dashlane Business</td><td>$8/user/month</td><td>Includes dark web monitoring and VPN</td></tr>
    <tr><td>Keeper Business</td><td>$4.50/user/month</td><td>Strong compliance reporting features</td></tr>
  </tbody>
</table>

<div class="callout">
  For most small businesses, <a href="https://1password.com/teams?utm_source=passgeni&utm_medium=guide&utm_campaign=smb" style="color:#C8FF00;" target="_blank" rel="noopener">1Password Teams</a> is the right choice — the onboarding experience is the most friction-free of any business password manager, which means actual employee adoption rather than a tool that IT set up and no one uses. <a href="https://bitwarden.com/products/business/?utm_source=passgeni&utm_medium=guide&utm_campaign=smb" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden Teams</a> is the strong alternative if cost is a primary concern or if you want open-source software.
</div>

<h2 id="mfa-rollout">Rolling out MFA without IT staff</h2>
<p>Multi-factor authentication is the most impactful single control you can add after a password manager. The implementation is straightforward even without a dedicated IT team:</p>
<ol>
  <li><strong>Prioritise by risk:</strong> Start with email (everything else can be reset from email), then banking and accounting, then CRM and customer data systems.</li>
  <li><strong>Choose authenticator apps over SMS:</strong> Google Authenticator, Authy, or the MFA built into 1Password are more secure than SMS codes and work offline. Avoid SMS where possible.</li>
  <li><strong>Set a deadline:</strong> "All employees will have MFA enabled on company email by [date]." Without a deadline, adoption stalls.</li>
  <li><strong>Enforce at the platform level where possible:</strong> Google Workspace and Microsoft 365 both support mandatory MFA policies — turn them on so employees can't opt out.</li>
  <li><strong>Document backup codes:</strong> Every MFA setup generates backup codes. Store these in the business password manager, not in someone's personal email.</li>
</ol>

<h2 id="shared-accounts">Handling shared accounts and logins</h2>
<p>Some accounts genuinely need to be shared — a company social media account, a shared email inbox, a vendor portal with a single-user license. The secure way to manage these:</p>
<ul>
  <li>Store shared credentials in a dedicated shared vault in your password manager — all team members access via their individual login to the password manager, not by knowing the actual credential</li>
  <li>When a team member leaves, change the shared credential immediately — this is much easier when it's in a password manager vault than when it's stored in people's heads</li>
  <li>Document every shared account in the vault with context: what it's for, who manages it, when it was last rotated</li>
  <li>Consider whether a shared account can be replaced with individual provisioned accounts — many services that used to require shared logins now offer team plans with individual accounts</li>
</ul>

<h2 id="offboarding">When someone leaves</h2>
<p>Employee offboarding is where most small business credential disasters originate. A disgruntled ex-employee with access to the business email is a serious incident. A checklist for every departure:</p>
<ol>
  <li>Suspend or delete their account in your Identity Provider (Google Workspace, Microsoft 365) — this disables all SSO-connected apps simultaneously</li>
  <li>Remove them from the business password manager organisation</li>
  <li>Change all shared credentials they had access to</li>
  <li>Revoke their access in any systems with direct logins (accounting software, banking, e-commerce platforms)</li>
  <li>Recover any company devices and remotely wipe if recovery is not possible</li>
  <li>Review recent activity logs for unusual actions in the 2 weeks before departure</li>
</ol>
<p>Steps 1 and 2 should happen on their last day, before they hand in their badge. Step 3 should happen within 24 hours. Everything else within one week.</p>

<h2 id="compliance-lite">Compliance without an IT department</h2>
<p>Many small businesses unexpectedly need to demonstrate basic security compliance — for a customer enterprise contract, a cyber insurance application, or an industry certification. The password controls that come up most frequently:</p>
<ul>
  <li><strong>Cyber insurance:</strong> Most cyber insurers now require MFA on email and banking, a documented password policy, and evidence of a password manager. These are the three baseline controls.</li>
  <li><strong>Customer security questionnaires:</strong> Enterprise customers increasingly ask vendors about credential management. "We use 1Password Business with mandatory MFA on all critical systems" is a credible, complete answer.</li>
  <li><strong>SOC 2 (if you're heading there):</strong> Start with the password manager and MFA now — you'll need evidence that controls were operational for 6–12 months. Retroactively implementing controls doesn't satisfy a Type II audit.</li>
</ul>

<h2 id="quick-wins">Quick wins this week</h2>
<p>If you do nothing else, do these five things in the next week:</p>
<ol>
  <li>Sign up for a business password manager and invite your team</li>
  <li>Enable mandatory MFA on your Google Workspace or Microsoft 365 tenant</li>
  <li>Change the passwords on your business banking portal and accounting software to randomly generated 16-character credentials stored in the password manager</li>
  <li>Write a one-page password policy — even if it's just the bullet points from the "Writing a simple password policy" section above</li>
  <li>Create an offboarding checklist and assign one person to own it</li>
</ol>
<p>These five steps reduce your credential attack surface by an estimated 80%. The remaining 20% is incremental hardening you can address over the following months.</p>
`;
