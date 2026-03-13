// =============================================================
// PASSGENI — GUIDE CONTENT: passgeni-vs-1password
// =============================================================

export const toc = [
  { id: "different-tools",    title: "They are different tools"              },
  { id: "passgeni-strengths", title: "What PassGeni does better"             },
  { id: "1password-strengths","title": "What 1Password does better"          },
  { id: "architecture",       title: "Architecture comparison"               },
  { id: "compliance",         title: "Compliance use cases"                   },
  { id: "pricing",            title: "Pricing comparison"                    },
  { id: "use-both",           title: "Why most people use both"              },
  { id: "verdict",            title: "The recommendation"                    },
];

export const contentHtml = `
<h2 id="different-tools">They are different tools</h2>
<p>The PassGeni vs. 1Password comparison is frequently framed as a competition, but they solve different problems. PassGeni is a password generator — it creates credentials. 1Password is a password manager — it stores, organises, and autofills credentials. A kitchen knife and a refrigerator are both food tools, but you wouldn't choose between them; you need both.</p>
<p>The reason this comparison exists: 1Password has a built-in generator, and PassGeni is free. Users on a budget sometimes ask whether they can use PassGeni's generator instead of paying for 1Password. The honest answer is: yes, for generation only. But 1Password's value proposition is primarily about storage and workflow, not generation.</p>

<h2 id="passgeni-strengths">What PassGeni does better</h2>
<ul>
  <li><strong>Compliance presets:</strong> PassGeni has six built-in compliance presets (HIPAA, PCI-DSS v4.0, SOC 2, ISO 27001, NIST 800-63B, DoD 8570) that automatically enforce the correct minimum length and character requirements for each framework. 1Password has no compliance-specific generation modes.</li>
  <li><strong>Entropy transparency:</strong> PassGeni shows entropy in bits and estimated crack time across multiple hash algorithm scenarios. 1Password shows a strength indicator bar with no underlying metrics visible to the user.</li>
  <li><strong>DNA Score:</strong> PassGeni's composite strength metric (entropy + crack resistance + compliance + character balance + uniqueness) gives a multi-dimensional view of password quality that no password manager generator provides.</li>
  <li><strong>Post-quantum mode:</strong> PassGeni has an explicit post-quantum mode targeting 128+ bits of entropy. 1Password does not.</li>
  <li><strong>Zero-account generation:</strong> PassGeni requires no account, no login, no subscription for the generator. You open the page and generate. 1Password requires an account for all functionality.</li>
  <li><strong>Breach checking:</strong> PassGeni's integrated breach checker (using HIBP k-anonymity) is a separate tool from the generator. 1Password's Watchtower feature checks stored credentials but is tied to your account.</li>
  <li><strong>API access:</strong> PassGeni's API allows programmatic generation with compliance presets. There is no 1Password API endpoint for generation.</li>
  <li><strong>Cost:</strong> PassGeni's generator is free. 1Password costs $2.99/month individual or $4/user/month for teams.</li>
</ul>

<h2 id="1password-strengths">What 1Password does better</h2>
<ul>
  <li><strong>Storage and autofill:</strong> 1Password stores all your credentials in an encrypted vault and autofills them in browsers and apps. PassGeni has no storage; you must copy generated passwords to a separate manager.</li>
  <li><strong>Cross-device sync:</strong> 1Password syncs your encrypted vault across all devices seamlessly. Your credentials are available on your phone, laptop, tablet, and desktop without any manual transfer.</li>
  <li><strong>Secure notes and documents:</strong> 1Password stores more than passwords — secure notes, payment cards, passports, software licences, and documents, all encrypted.</li>
  <li><strong>Browser integration:</strong> 1Password's browser extensions detect login forms and offer autofill. This eliminates the copy-paste step and the exposure window of having a password in your clipboard.</li>
  <li><strong>Watchtower:</strong> Monitors stored credentials for breach appearances, reuse, and weak passwords across your entire vault. PassGeni's breach checker checks individual passwords; Watchtower checks all of them continuously.</li>
  <li><strong>Travel mode:</strong> Remove sensitive vaults from devices when travelling to high-risk regions. Not a generator feature.</li>
  <li><strong>Team sharing:</strong> Shared vaults with role-based access, team-wide policy enforcement, and access revocation when team members leave.</li>
  <li><strong>Secret Key architecture:</strong> 1Password's 128-bit Secret Key combined with your master password provides security that even a compromised master password alone cannot defeat.</li>
</ul>

<h2 id="architecture">Architecture comparison</h2>

<table>
  <thead><tr><th>Architecture aspect</th><th>PassGeni</th><th>1Password</th></tr></thead>
  <tbody>
    <tr><td>Generation location</td><td>Browser (client-side only)</td><td>App/browser extension (client-side)</td></tr>
    <tr><td>RNG source</td><td>crypto.getRandomValues()</td><td>OS CSPRNG</td></tr>
    <tr><td>Password storage</td><td>None (zero storage)</td><td>AES-256 encrypted vault (cloud-synced)</td></tr>
    <tr><td>Encryption keys held by provider</td><td>N/A (nothing stored)</td><td>Never — zero-knowledge architecture</td></tr>
    <tr><td>Account required</td><td>No (generator); Yes (Team API)</td><td>Yes for all features</td></tr>
    <tr><td>Open source</td><td>Partial (generation logic)</td><td>No (security audited)</td></tr>
    <tr><td>Independent audits</td><td>—</td><td>Cure53, ISE, and others</td></tr>
  </tbody>
</table>

<h2 id="compliance">Compliance use cases</h2>
<p>For compliance-driven credential generation, PassGeni has a clear advantage over 1Password's built-in generator. A SOC 2 audit may require demonstrating that credentials used for privileged access meet a 16-character minimum — PassGeni's SOC 2 preset enforces this automatically. 1Password's generator requires manually setting the length to 16 each time, which introduces human error.</p>
<p>For teams where credential generation is part of a compliance workflow (provisioning admin accounts, rotating service credentials, onboarding contractors), PassGeni's API allows integration into provisioning scripts with compliance presets applied programmatically. 1Password has no equivalent.</p>

<h2 id="pricing">Pricing comparison</h2>

<table>
  <thead><tr><th>Tier</th><th>PassGeni</th><th>1Password</th></tr></thead>
  <tbody>
    <tr><td>Free generator</td><td>Free forever</td><td>No free tier</td></tr>
    <tr><td>Individual (storage + autofill)</td><td>Not applicable</td><td>$2.99/month</td></tr>
    <tr><td>Team API access</td><td>$29/month (5 seats, 5,000 API calls/day)</td><td>Not applicable</td></tr>
    <tr><td>Team password management</td><td>Not applicable</td><td>$4/user/month</td></tr>
  </tbody>
</table>

<p>The pricing comparison shows that PassGeni and 1Password are not competing on the same dimensions. PassGeni charges for API access and team-scale programmatic generation. 1Password charges for storage, sync, and autofill. For a team that needs both, the combined cost ($29/month for PassGeni API + $4/user/month for 1Password Teams) is still well below the cost of most enterprise security tools.</p>

<h2 id="use-both">Why most people use both</h2>
<p>The typical usage pattern among security-conscious users and teams:</p>
<ul>
  <li>Use PassGeni to <em>generate</em> credentials — especially for compliance-sensitive systems where the preset enforcement matters</li>
  <li>Use 1Password to <em>store, autofill, and manage</em> all credentials across devices</li>
</ul>
<p>This combination gives you PassGeni's compliance-grade generation and transparency with 1Password's best-in-class storage and workflow. The generated credentials are just as strong regardless of which tool you use for storage — the security of the stored credential is independent of how it was generated.</p>

<h2 id="verdict">The recommendation</h2>
<p><strong>For individual users</strong> who just need strong passwords and don't have compliance requirements: use <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=vs1password" style="color:#C8FF00;" target="_blank" rel="noopener">1Password</a> for everything. The integrated workflow (generate + save + autofill in one step) is the most friction-free path to strong credential hygiene. The generator is cryptographically sound even without the compliance features PassGeni adds.</p>
<p><strong>For teams with compliance requirements (HIPAA, PCI-DSS, SOC 2):</strong> Use PassGeni for generation via the API or the web generator with compliance presets. Use 1Password Teams for storage and sharing. The combination is more capable than either alone.</p>
<p><strong>For developers and teams doing automated credential rotation:</strong> PassGeni's API is uniquely positioned. There is no 1Password API for generation, and the PassGeni API allows compliance-preset generation in scripts and provisioning workflows.</p>
<p><strong>If you can only choose one:</strong> 1Password for most users. Storage and autofill have more daily security impact than generation features. A credential stored insecurely defeats a perfectly-generated password.</p>

<div class="callout">
  <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=vs1password" style="color:#C8FF00;" target="_blank" rel="noopener">Try 1Password free for 14 days →</a> — individual plan at $2.99/month thereafter. The strongest full-featured password manager available.
</div>
`;
