// =============================================================
// PASSGENI — GUIDE CONTENT: password-security-for-developers
// =============================================================

export const toc = [
  { id: "credential-surface",   title: "Your credential attack surface"         },
  { id: "personal-accounts",    title: "Personal account hygiene"               },
  { id: "secrets-management",   title: "Secrets management fundamentals"        },
  { id: "env-files",            title: ".env files and what goes wrong"         },
  { id: "git-secrets",          title: "Credentials in Git — the biggest risk" },
  { id: "api-key-hygiene",      title: "API key hygiene"                        },
  { id: "ssh-keys",             title: "SSH key management"                     },
  { id: "ci-cd-secrets",        title: "CI/CD pipeline secrets"                 },
  { id: "database-creds",       title: "Database credentials"                   },
  { id: "team-secrets",         title: "Team credential sharing"               },
  { id: "password-manager",     title: "Password manager setup for developers" },
];

export const contentHtml = `
<h2 id="credential-surface">Your credential attack surface</h2>
<p>A software developer's credential attack surface is vastly larger than a typical employee's. In a given week, a developer might authenticate to: GitHub/GitLab, AWS/GCP/Azure console, production and staging databases, Vercel/Netlify/Railway, Stripe, PagerDuty, Datadog, Sentry, internal admin panels, SSH servers, Kubernetes clusters, HashiCorp Vault, and a dozen SaaS tools. Each is an attack vector. Each credential, if compromised, can cascade.</p>
<p>Developer credentials are also disproportionately high-value targets. A compromised GitHub account with production deploy access is worth vastly more to an attacker than a standard employee's email account. Supply chain attacks — injecting malicious code via compromised developer credentials — have caused some of the most damaging breaches of the past five years (SolarWinds, Codecov, CircleCI).</p>

<h2 id="personal-accounts">Personal account hygiene</h2>
<p>Start with the fundamentals before addressing the developer-specific risks:</p>
<ul>
  <li><strong>GitHub/GitLab:</strong> Enable MFA (prefer hardware key or TOTP, not SMS). Use SSH keys for repository access rather than HTTPS with password. Enable commit signing with GPG.</li>
  <li><strong>Cloud consoles:</strong> MFA on every cloud account without exception. Root/owner accounts should use hardware MFA (YubiKey). Enable login notifications.</li>
  <li><strong>Email:</strong> Your developer email account is a recovery target for every other account. It needs the strongest MFA you have — hardware key if possible. If it falls, everything falls.</li>
  <li><strong>Package registry accounts:</strong> npm, PyPI, RubyGems — these accounts can be used to push malicious packages. Enable MFA. Review what you've published and whether it's still maintained.</li>
</ul>

<div class="callout">
  <strong>Hardware key for developers:</strong> A <a href="https://www.yubico.com/products/yubikey-5-overview/?utm_source=passgeni&utm_medium=guide&utm_campaign=developers" style="color:#C8FF00;" target="_blank" rel="noopener">YubiKey 5</a> supports FIDO2/WebAuthn (for GitHub, cloud consoles), TOTP (for any TOTP site), OpenPGP (for commit signing and email encryption), and PIV (for smart card use). One device covers nearly every authentication use case a developer faces. Buy two — one for daily use, one as a backup stored off-site.
</div>

<h2 id="secrets-management">Secrets management fundamentals</h2>
<p>The core principle: secrets should never be stored in the same place as code. The mechanisms for achieving this have matured significantly:</p>
<ul>
  <li><strong>Development:</strong> Use <code>.env</code> files (never committed) or local secrets manager tooling (1Password CLI, Doppler, direnv)</li>
  <li><strong>CI/CD:</strong> Use your platform's native secrets store (GitHub Actions Secrets, GitLab CI Variables, CircleCI Contexts) — never hardcode in workflow files</li>
  <li><strong>Production:</strong> Use a dedicated secrets management service: HashiCorp Vault (self-hosted), AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, Doppler, or Infisical</li>
  <li><strong>Rotation:</strong> All production secrets should be rotatable with zero downtime. If rotating a secret requires a deploy, the architecture has a problem.</li>
</ul>
<p>The secret management hierarchy in a well-run system:</p>
<ol>
  <li>Vault / cloud secrets manager holds the canonical secret</li>
  <li>Applications authenticate to the vault using short-lived tokens (IAM roles, Vault dynamic credentials)</li>
  <li>Secrets are injected at runtime, never written to disk or included in container images</li>
  <li>Access to the vault itself is logged, audited, and protected with hardware MFA</li>
</ol>

<h2 id="env-files">.env files and what goes wrong</h2>
<p>The <code>.env</code> file pattern is ubiquitous in development. It works well when used correctly and catastrophically when not. The rules:</p>
<ul>
  <li><strong>Always add <code>.env</code> to <code>.gitignore</code> before the first commit.</strong> Adding it later doesn't remove existing history — you need to use <code>git filter-branch</code> or <code>git filter-repo</code>, and the credentials may already be on remotes or forks.</li>
  <li><strong>Commit a <code>.env.example</code> with dummy values</strong> but never commit a <code>.env</code> with real values, even in a private repository.</li>
  <li><strong>Private repositories are not secret storage.</strong> GitHub employees, GitHub security scanning, future collaborators, and anyone who gets read access to the repo all see the full Git history. A secret in a private repo's history is a secret that has been shared with GitHub infrastructure.</li>
  <li><strong>Different secrets per environment.</strong> Development, staging, and production should have different credentials. A developer's local <code>.env</code> should never contain production database credentials.</li>
</ul>

<h2 id="git-secrets">Credentials in Git — the biggest risk</h2>
<p>Accidentally committing credentials to a Git repository is the most common developer security incident. GitHub's secret scanning service finds and reports known credential patterns automatically, but by the time a notification arrives, the secret may already have been indexed by public scanners.</p>
<p>If you commit a secret to a public repository:</p>
<ol>
  <li><strong>Revoke the secret immediately</strong> — before fixing the code, before telling anyone. The secret is already compromised.</li>
  <li>Check your cloud provider's access logs for the period since the commit to identify any unauthorised use</li>
  <li>Rotate the secret to a new value</li>
  <li>Remove the secret from Git history using <code>git filter-repo</code> (the modern replacement for <code>filter-branch</code>)</li>
  <li>Force-push to overwrite the history on all remotes</li>
  <li>Notify any forks or collaborators who may have cloned the repository during the exposure window</li>
</ol>
<p>Tools that help prevent this: <code>git-secrets</code> (AWS), <code>detect-secrets</code> (Yelp), <code>gitleaks</code>, and <code>truffleHog</code> — run as pre-commit hooks to catch credentials before they reach a remote.</p>

<h2 id="api-key-hygiene">API key hygiene</h2>
<p>Most developer credential incidents involve API keys rather than passwords. Best practices:</p>
<ul>
  <li><strong>Scope minimally:</strong> Create API keys with the minimum permissions required. A key for reading analytics data should not have write access to production data.</li>
  <li><strong>One key per environment:</strong> Separate keys for development, staging, and production. If a dev key leaks, production is not exposed.</li>
  <li><strong>Set expiry:</strong> Most platforms support API key expiry. Use it. Short-lived keys reduce the exposure window if a key is compromised.</li>
  <li><strong>Rotate regularly:</strong> API keys for production systems should be rotated on a schedule — quarterly at minimum, or on any suspected exposure.</li>
  <li><strong>Audit active keys:</strong> Review which API keys are active, which are being used, and which haven't been called in 90+ days. Inactive keys are attack surface with no benefit — revoke them.</li>
  <li><strong>Never log API keys:</strong> Application logs frequently capture request headers and body contents. Ensure your logging configuration redacts authorization headers.</li>
</ul>

<h2 id="ssh-keys">SSH key management</h2>
<ul>
  <li><strong>Use Ed25519, not RSA-2048:</strong> <code>ssh-keygen -t ed25519 -C "your_email@example.com"</code>. Ed25519 is faster, shorter, and considered more secure than RSA-2048 or RSA-4096.</li>
  <li><strong>Passphrase-protect your private key:</strong> Use a strong random passphrase (generated by PassGeni or your password manager). The passphrase encrypts the private key on disk — if someone gets your key file, they can't use it without the passphrase.</li>
  <li><strong>Use SSH agent:</strong> <code>ssh-agent</code> caches your decrypted key in memory so you don't retype the passphrase on every connection. On macOS, 1Password integrates directly as an SSH agent.</li>
  <li><strong>One key per device:</strong> Don't copy your private key across machines. Generate a new key on each device and add its public key to each service. This way, if a device is compromised or lost, you revoke only that device's key.</li>
  <li><strong>Audit and remove stale keys:</strong> Review your GitHub, Bitbucket, and server <code>authorized_keys</code> files periodically. Remove keys from devices you no longer own.</li>
</ul>

<h2 id="ci-cd-secrets">CI/CD pipeline secrets</h2>
<p>CI/CD pipelines are high-value targets — they have deployment access and often run with elevated permissions. Common mistakes:</p>
<ul>
  <li>Secrets printed in build logs (especially from debug commands or error messages)</li>
  <li>Secrets in Docker image layers — inspect with <code>docker history</code> to verify no secrets are baked in</li>
  <li>Shared secrets across all branches — use environment-scoped secrets so feature branches can't access production credentials</li>
  <li>Overly permissive pipeline service accounts — apply least privilege to the IAM roles your CI/CD assumes</li>
</ul>
<p>Use short-lived credentials for deployments where possible. OIDC integration between GitHub Actions and AWS/GCP/Azure allows pipelines to authenticate without storing long-lived credentials at all.</p>

<h2 id="database-creds">Database credentials</h2>
<p>Database credentials deserve specific attention because a compromise typically means direct access to all application data:</p>
<ul>
  <li><strong>Never connect to production databases from local development machines</strong> with production credentials</li>
  <li>Use different database users per application/service — don't share a single database superuser credential across all applications</li>
  <li>Database passwords should be at minimum 20 characters, randomly generated, and stored in a secrets manager</li>
  <li>Enable connection string encryption — use SSL/TLS for all database connections, even inside a VPC</li>
  <li>Consider dynamic credentials: HashiCorp Vault database secrets engine generates short-lived credentials on-demand, eliminating long-lived database passwords entirely</li>
</ul>

<h2 id="team-secrets">Team credential sharing</h2>
<p>The inevitable reality of small dev teams: some credentials need to be shared (staging database, shared API keys, deployment accounts). The wrong way: Slack DMs, email, shared Google Docs. The right way:</p>
<ul>
  <li><strong>1Password Teams:</strong> Shared vaults, granular permissions, audit logs, and automatic access revocation when someone leaves the team. The standard tool for dev team credential management.</li>
  <li><strong>Bitwarden Teams:</strong> Open-source option with shared organisations. Slightly less polished UX but free for small teams and fully self-hostable if you need on-premises storage.</li>
  <li><strong>For production secrets specifically:</strong> Use a dedicated secrets manager (Vault, Doppler, Infisical) — not a password manager. Applications should fetch secrets dynamically, not a developer looking them up and pasting them.</li>
</ul>

<div class="callout">
  <strong>Team password manager for developers:</strong> <a href="https://1password.com/teams?utm_source=passgeni&utm_medium=guide&utm_campaign=developers" style="color:#C8FF00;" target="_blank" rel="noopener">1Password Teams</a> ($4/user/month) is the standard for development teams — shared vaults, CLI integration (<code>op run</code> for injecting secrets into processes), SSH agent integration, and automatic access revocation. <a href="https://bitwarden.com/products/business/?utm_source=passgeni&utm_medium=guide&utm_campaign=developers" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden Teams</a> is the open-source alternative at lower cost.
</div>

<h2 id="password-manager">Password manager setup for developers</h2>
<p>The recommended setup for a developer's personal credential management:</p>
<ol>
  <li>Choose a password manager: 1Password (best UX, SSH agent integration) or Bitwarden (open-source, self-hostable)</li>
  <li>Set a strong, unique master password — a 6-word Diceware passphrase you have memorised and stored nowhere digitally</li>
  <li>Enable MFA on your password manager account — hardware key as first factor if supported</li>
  <li>Migrate all existing credentials into the vault — use the built-in audit tools to identify duplicates, weak passwords, and breached credentials</li>
  <li>Install the browser extension and desktop app — auto-fill removes the friction of strong unique passwords</li>
  <li>Set up the CLI: 1Password CLI (<code>op</code>) or Bitwarden CLI (<code>bw</code>) allows secrets injection into local development scripts and terminal workflows</li>
  <li>Configure SSH agent integration if available — 1Password can serve as your SSH agent, so your key passphrase is protected by your vault's biometric unlock</li>
</ol>
`;
