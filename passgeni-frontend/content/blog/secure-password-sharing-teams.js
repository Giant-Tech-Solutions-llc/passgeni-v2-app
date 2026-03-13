export const contentHtml = `
<h2>The problem with Slack passwords</h2>
<p>Ask any IT security professional their biggest credential management frustration, and a large percentage will say: people sharing passwords via Slack, WhatsApp, or email. It happens constantly. It's completely understandable why — the alternatives seem complicated. But it creates a security problem that compounds over time.</p>
<p>When a password exists in a Slack message: it's searchable, it persists indefinitely, it's included in backup exports, it may be visible to admins, and it travels across Slack's infrastructure. None of those are properties you want for a credential.</p>

<h2>Why teams share passwords insecurely</h2>
<p>Teams share credentials because the problem is real: multiple people need access to the same account, and the account doesn't support proper multi-user access. This is especially common with:</p>
<ul>
  <li>Social media accounts (Twitter/X, LinkedIn company pages, Instagram)</li>
  <li>Shared email accounts (info@, support@)</li>
  <li>Analytics platforms without team plans</li>
  <li>Development environment credentials passed during onboarding</li>
  <li>Vendor portal credentials tied to a single account</li>
</ul>

<h2>Secure alternatives for different situations</h2>
<p><strong>For one-time shares:</strong> Use PassGeni's <a href="/tools/secure-share">Secure Share tool</a>. It creates an AES-256-GCM encrypted link. The decryption key is in the URL fragment — never transmitted to any server. The link can be used once and the secret disappears. This replaces the "DM me the password" workflow with something that doesn't leave a permanent record.</p>
<p><strong>For ongoing team access:</strong> Use a shared vault in a password manager. Bitwarden Teams and 1Password Teams both offer shared collections with granular access controls. Team members access credentials through the app without ever seeing the raw password (it autofills). When someone leaves, you revoke their access to the collection without needing to change the passwords.</p>
<p><strong>For service accounts and API keys:</strong> Use a secrets manager — HashiCorp Vault, AWS Secrets Manager, Doppler, or 1Password Secrets Automation. These provide rotation, audit logs, and access policies that shared Slack messages will never have.</p>

<h2>What to do when someone leaves the team</h2>
<p>This is where insecure sharing compounds. If passwords were shared via Slack, you need to rotate every credential that person had access to — and you probably don't have a comprehensive list. With a shared vault, you revoke access, confirm which credentials they could see, and rotate those on a schedule.</p>
<p>The audit trail in a password manager vault makes offboarding dramatically simpler and more complete than trying to reconstruct what was shared in chat history.</p>
`;