// =============================================================
// PASSGENI — GUIDE CONTENT: best-password-generator-2025
// =============================================================

export const toc = [
  { id: "what-makes-good",      title: "What makes a password generator good"   },
  { id: "comparison-table",     title: "Comparison table"                       },
  { id: "passgeni",             title: "PassGeni"                               },
  { id: "1password",            title: "1Password"                              },
  { id: "bitwarden",            title: "Bitwarden"                              },
  { id: "keepass",              title: "KeePass"                                },
  { id: "dashlane",             title: "Dashlane"                               },
  { id: "browser-generators",   title: "Browser built-in generators"            },
  { id: "verdict",              title: "The verdict by use case"                },
];

export const contentHtml = `
<h2 id="what-makes-good">What makes a password generator good</h2>
<p>Not all password generators are architecturally equivalent. The most important attributes to evaluate:</p>
<ul>
  <li><strong>Random number generation:</strong> The generator must use a cryptographically secure pseudorandom number generator (CSPRNG). Browser-based generators should use <code>crypto.getRandomValues()</code>. Native apps should use the OS CSPRNG. Any generator using <code>Math.random()</code> or a custom PRNG is disqualifying.</li>
  <li><strong>Client-side or server-side:</strong> Client-side generation means the generated password never touches any server — not even encrypted. Server-side generation means the password was known to the server before you saw it, even if transmitted securely.</li>
  <li><strong>Entropy visibility:</strong> A good generator shows you the entropy in bits or an equivalent strength metric — not just a colour bar.</li>
  <li><strong>Character set control:</strong> You should be able to configure the character pool to meet specific compliance requirements or policy constraints.</li>
  <li><strong>Compliance features:</strong> For professional use, the ability to generate passwords meeting HIPAA, PCI-DSS, SOC 2, or other framework requirements without manual configuration.</li>
  <li><strong>Integration:</strong> A standalone generator requires manual copy-paste. An integrated generator (built into a password manager) can autofill directly.</li>
</ul>

<h2 id="comparison-table">Comparison table</h2>

<table>
  <thead><tr><th>Generator</th><th>Client-side</th><th>CSPRNG</th><th>Entropy display</th><th>Compliance presets</th><th>Cost</th></tr></thead>
  <tbody>
    <tr><td>PassGeni</td><td>✓</td><td>✓ (crypto.getRandomValues)</td><td>✓ (bits + crack time)</td><td>✓ (6 frameworks)</td><td>Free</td></tr>
    <tr><td>1Password</td><td>✓ (in-app)</td><td>✓</td><td>Strength bar only</td><td>✗</td><td>$2.99/mo</td></tr>
    <tr><td>Bitwarden</td><td>✓</td><td>✓</td><td>✗</td><td>✗</td><td>Free / $10/yr</td></tr>
    <tr><td>KeePass</td><td>✓ (local)</td><td>✓</td><td>✓</td><td>✗</td><td>Free</td></tr>
    <tr><td>Dashlane</td><td>✓ (in-app)</td><td>✓</td><td>Strength bar</td><td>✗</td><td>$4.99/mo</td></tr>
    <tr><td>Chrome built-in</td><td>✓</td><td>✓</td><td>✗</td><td>✗</td><td>Free</td></tr>
  </tbody>
</table>

<h2 id="passgeni">PassGeni</h2>
<p><strong>Best for: compliance-driven generation, professional use, zero-knowledge requirements</strong></p>
<p>PassGeni is purpose-built for password generation rather than being the generator module inside a larger product. This means it can expose features that password manager generators don't — entropy in bits, crack time estimates across multiple hash algorithms, six compliance presets, profession-specific seed words, a DNA Score composite strength metric, and post-quantum mode.</p>
<p>The architecture is strictly client-side — all generation uses <code>crypto.getRandomValues()</code>, nothing is transmitted to PassGeni's servers, no account is required. The generator works with no network connection after the initial page load.</p>
<p>The limitation: PassGeni is a generator, not a manager. It doesn't store or autofill passwords. The intended workflow is PassGeni for generation + a password manager of your choice for storage and autofill. The free API allows integration into applications that need programmatic generation with compliance constraints.</p>

<h2 id="1password">1Password</h2>
<p><strong>Best for: full-featured password management with a high-quality integrated generator</strong></p>
<p>1Password is the benchmark password manager for individual and team use. Its generator produces strong passwords (it uses the OS CSPRNG, not <code>Math.random()</code>), supports passphrases, and integrates directly with autofill — generated passwords are saved to your vault without a manual copy-paste step.</p>
<p>The generator interface is accessible via the browser extension, the desktop app, and the iOS/Android app. Configuration options include length, character types, and word-based passphrase generation using the EFF word list.</p>
<p>What 1Password's generator lacks compared to a dedicated tool: entropy display in bits, compliance-specific presets, and crack time estimates. These are missing because 1Password's target user is not performing compliance certification — they're generating a password for a new account.</p>
<p>1Password's zero-knowledge architecture means even a breach of 1Password's servers doesn't expose stored passwords — your master password (combined with a 128-bit Secret Key) is the sole decryption key. Independent cryptographic audits by Cure53 and others have validated the implementation.</p>

<div class="callout">
  <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=comparison" style="color:#C8FF00;" target="_blank" rel="noopener">1Password</a> — $2.99/month individual, $4/user/month for teams. 14-day free trial. The standard recommendation for individual users who want the best full-featured password manager.
</div>

<h2 id="bitwarden">Bitwarden</h2>
<p><strong>Best for: open-source users, self-hosters, teams on a budget</strong></p>
<p>Bitwarden is the leading open-source password manager with a generator that produces cryptographically sound passwords. The individual free plan includes all core features including the generator, making it the strongest free option in the market.</p>
<p>The generator supports passwords (configurable length and character set) and passphrases (word count and separator configurable). It does not display entropy in bits or offer compliance presets, but the underlying generation is cryptographically correct.</p>
<p>The key differentiators from 1Password: fully open source (the entire client and server codebase is publicly auditable), self-hostable (run your own Bitwarden server if you need data residency guarantees), and significantly cheaper for teams ($3/user/month vs. $4). The tradeoff is a less polished UX and fewer advanced features.</p>

<div class="callout">
  <a href="https://bitwarden.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=comparison" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden</a> — free individual plan covers all core features. $3/user/month for teams. The best free option and strong alternative to 1Password for cost-sensitive teams or open-source advocates.
</div>

<h2 id="keepass">KeePass</h2>
<p><strong>Best for: maximum control, local storage, advanced users</strong></p>
<p>KeePass is a free, open-source password manager that stores your vault as an encrypted local file rather than syncing to a cloud server. The generator is highly configurable — you can specify exact character sets, entropy requirements, and character distribution rules.</p>
<p>KeePass does not have a cloud service, which means your vault is as secure as your local file system (and your backup strategy). It does not have the polished browser integration of 1Password or Bitwarden — browser autofill requires a plugin (KeePassXC-Browser for KeePassXC, the maintained fork).</p>
<p>The generator in KeePassXC specifically is noteworthy: it shows estimated entropy and allows very precise configuration of character pools. For security researchers and advanced users who want to understand exactly what the generator is doing, KeePassXC is the most transparent option.</p>

<h2 id="dashlane">Dashlane</h2>
<p><strong>Best for: users who also want a VPN and dark web monitoring bundled</strong></p>
<p>Dashlane is a full-featured password manager that includes a dark web monitoring service and a VPN bundled into the premium tier. The generator is functional and cryptographically correct, with a straightforward interface.</p>
<p>The generator is less configurable than KeePass or PassGeni — you control length and whether to include digits and symbols, but not precise character set composition. No entropy display. No compliance presets.</p>
<p>Where Dashlane wins: the bundled dark web monitoring actively checks your stored credentials against breach databases and notifies you when a credential you've stored appears in a known breach. This is a meaningful feature for users who want proactive monitoring without setting it up separately.</p>

<h2 id="browser-generators">Browser built-in generators</h2>
<p>Chrome, Safari, Firefox, and Edge all include built-in password generators that activate on password input fields. They use the browser's CSPRNG (cryptographically correct), generate passwords of approximately 20 characters with mixed character sets, and save the generated password to the browser's credential store.</p>
<p>The case for browser generators: zero friction, zero cost, works everywhere, CSPRNG-backed, syncs across devices via browser account.</p>
<p>The case against: no compliance preset support, no entropy visibility, passwords are stored in the browser (potentially accessible to browser exploits and anyone with physical access to an unlocked device), and the character set composition is not configurable. Browser-stored passwords are generally considered less secure than a dedicated password manager vault — the security model is different.</p>
<p>For generating a one-off credential: browser generators are fine. For managing credentials for work accounts, compliance-sensitive systems, or high-value targets: use a dedicated password manager.</p>

<h2 id="verdict">The verdict by use case</h2>
<ul>
  <li><strong>Generating credentials for compliance-governed systems (HIPAA, PCI-DSS, SOC 2):</strong> PassGeni — the only generator with built-in compliance presets and entropy verification</li>
  <li><strong>Daily use password manager with excellent UX:</strong> <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=comparison" style="color:#C8FF00;" target="_blank" rel="noopener">1Password</a> — best-in-class autofill, zero-knowledge architecture, excellent mobile apps</li>
  <li><strong>Free option or open-source preference:</strong> <a href="https://bitwarden.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=comparison" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden</a> — everything 1Password does at lower cost with full source code transparency</li>
  <li><strong>Maximum control and local storage:</strong> KeePassXC — no cloud dependency, maximum auditability</li>
  <li><strong>Built-in dark web monitoring:</strong> Dashlane — the only option that bundles proactive breach monitoring</li>
  <li><strong>Teams:</strong> 1Password Teams or Bitwarden Teams — shared vaults, centrally managed policies, access revocation</li>
</ul>
<p>The ideal setup for most security-conscious users: PassGeni for generating compliance-grade credentials and checking breach status, 1Password or Bitwarden for storing and autofilling all credentials across devices. These tools complement rather than replace each other.</p>
`;
