export const contentHtml = `
<h2>The marketing team security problem</h2>
<p>Marketing teams have a credential security problem that's different from most departments. They share access to social media accounts, analytics platforms, ad networks, and CMS systems — often with agency partners, freelancers, and contractors who need temporary access. The institutional answer ("everyone gets their own login") doesn't match reality ("we have one Instagram account").</p>
<p>The result: passwords texted to freelancers, credentials in shared Google Docs, agency account handoffs via email. Each of these is a security incident waiting to happen.</p>

<h2>Social media accounts: the hardest credential problem</h2>
<p>Most social platforms support a single primary account with limited multi-user access. For platforms that do support team access (Meta Business Manager, LinkedIn Company Pages, Twitter/X Teams), use it — it eliminates shared credential risk entirely. For platforms that don't, or where the team plan isn't available:</p>
<ul>
  <li>Store the shared credential in a team password manager vault (Bitwarden Teams, 1Password Teams)</li>
  <li>Grant vault access to specific team members — revoke it when they leave</li>
  <li>Never send credentials via DM, email, or SMS — use PassGeni's <a href="/tools/secure-share">Secure Share</a> for one-time handoffs</li>
  <li>Rotate the credential when anyone who had access leaves</li>
</ul>

<h2>Agency access management</h2>
<p>Agencies should have their own access to platforms where possible — Google Analytics 4 supports property-level user permissions, Meta Business Manager supports partner access, Google Ads supports manager account links. Using platform-native access sharing means no credential sharing and clean offboarding.</p>
<p>When credential sharing is unavoidable: generate a strong credential with PassGeni, share it once via Secure Share, store it in a shared vault, and set a calendar reminder to rotate it after the engagement ends.</p>

<h2>The offboarding checklist</h2>
<p>When a team member or agency relationship ends:</p>
<ul>
  <li>Revoke platform-specific access (Google Analytics, Meta BM, etc.) immediately</li>
  <li>Remove vault access in your password manager</li>
  <li>Rotate any credentials they had direct access to</li>
  <li>Change social account passwords if they were shared directly</li>
  <li>Revoke any API keys or tokens they generated</li>
</ul>
<p>Doing this consistently prevents the "former employee still has access six months later" problem that appears in almost every marketing team security audit.</p>
`;