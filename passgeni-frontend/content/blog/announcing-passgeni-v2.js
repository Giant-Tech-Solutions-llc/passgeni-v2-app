// =============================================================
// PASSGENI — BLOG POST CONTENT
// announcing-passgeni-v2
// =============================================================

export const contentHtml = `
<h2>What we built and why</h2>
<p>The original PassGeni was a single-page password generator. It worked, but it was narrow — one tool, no context, no framework for why a particular password was strong or appropriate for a particular use case.</p>
<p>V2 is built on a different premise: password security is a system, not a feature. The generator is still at the center, but it's surrounded by the context, tools, and compliance infrastructure that make passwords actually secure in practice — not just technically complex.</p>

<h2>The DNA Score</h2>
<p>The most visible change: every generated password now gets a DNA Score — a composite metric that evaluates entropy, crack resistance, compliance, character balance, and uniqueness simultaneously.</p>
<p>Most password strength meters are binary. Either a red bar (weak) or a green bar (strong), driven by a simple algorithm that checks for uppercase, lowercase, numbers, and symbols. They tell you almost nothing useful about actual security.</p>
<p>The DNA Score breaks down each dimension separately. You can see exactly why a password scores the way it does, and what would improve it. More importantly, it's calibrated against real-world attack scenarios — the entropy calculation uses the actual character pool size, and crack time estimates are based on current GPU-accelerated cracking rates against industry-standard hash algorithms.</p>

<h2>Compliance presets</h2>
<p>V2 ships with six compliance presets that automatically configure the generator to meet specific framework requirements:</p>
<ul>
  <li><strong>HIPAA:</strong> 12-character minimum, full character set, aligned with HHS guidance and NIST 800-63B</li>
  <li><strong>PCI-DSS v4.0:</strong> 12-character minimum, complexity requirements per Requirement 8.3.6</li>
  <li><strong>SOC 2:</strong> 16-character minimum for CC6.1 compliance — what auditors expect to see</li>
  <li><strong>ISO 27001:</strong> 14-character minimum per Annex A.9 guidance</li>
  <li><strong>NIST 800-63B:</strong> Length-forward, no mandatory complexity, breach-awareness built in</li>
  <li><strong>DoD 8570:</strong> 15-character minimum for Department of Defense Information Assurance requirements</li>
</ul>
<p>Each preset enforces the appropriate minimum length and character requirements at the generation level — you don't need to manually configure anything. Select the framework, generate, done.</p>

<h2>Post-quantum mode</h2>
<p>Post-quantum mode generates passwords with minimum 20-character length and an expanded symbol set, targeting 128+ bits of entropy. This provides a meaningful safety margin against quantum computing advances without waiting for quantum computers to be a practical threat.</p>
<p>The reasoning: credentials generated today may still be in use in 10–15 years. Generating post-quantum resistant passwords now costs nothing extra in time or usability (you're storing it in a password manager anyway). The risk-adjusted case for using it is clear for long-lived secrets.</p>

<h2>Six new tools</h2>
<p>V2 adds six standalone security tools, all free, all client-side:</p>
<ul>
  <li><strong>Breach Checker:</strong> Checks any password against the Have I Been Pwned database using k-anonymity — only the first 5 characters of the SHA-1 hash leave your browser. The full password is never transmitted.</li>
  <li><strong>Strength Checker:</strong> Full entropy analysis with crack time estimates across different attack scenarios and hash algorithms.</li>
  <li><strong>Password Audit:</strong> Batch audit up to 10 passwords simultaneously — entropy, breach status, pattern detection.</li>
  <li><strong>Policy Generator:</strong> Generates a complete, downloadable password policy document configured for any of the six compliance frameworks. Covers minimum length, complexity, rotation, MFA, audit logging, and emergency access.</li>
  <li><strong>Secure Share:</strong> AES-256-GCM encrypted sharing. The decryption key lives in the URL fragment — it is never sent to any server, including ours. Share sensitive credentials with zero server-side exposure.</li>
  <li><strong>WiFi QR Generator:</strong> Generates a scannable QR code from WiFi credentials. Useful for guest networks and onboarding. Entirely client-side.</li>
</ul>

<h2>The developer API</h2>
<p>V2 ships with a documented REST API at <code>/api/v1/generate</code>. The free tier allows 50 calls per day — no API key required. The Team plan ($29/month) unlocks 5,000 calls per day, all compliance presets, and bulk generation up to 500 passwords per request.</p>
<p>The API is built for real workloads: password generation during user onboarding, credential rotation pipelines, compliance audit tooling. Full documentation with code examples in JavaScript, Python, and curl is at <a href="/api">passgeni.ai/api</a>.</p>

<h2>What's coming in V3</h2>
<p>The roadmap is public. In priority order:</p>
<ul>
  <li>Full guide library: 18 compliance and security guides, written for the specific frameworks that security and IT teams actually work with</li>
  <li>Usage analytics dashboard for Team API subscribers</li>
  <li>Password audit reports: exportable CSV analysis of credential batches</li>
  <li>Additional compliance frameworks as they're requested</li>
</ul>
<p>The generator and all tools are free forever. That's not changing. The team plan funds the infrastructure and content development that makes the free tools worth using.</p>
<p>Try it at <a href="/#generator">passgeni.ai</a>.</p>
`;
