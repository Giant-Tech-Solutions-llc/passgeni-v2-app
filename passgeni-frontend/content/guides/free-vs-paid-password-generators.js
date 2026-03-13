// =============================================================
// PASSGENI — GUIDE CONTENT: free-vs-paid-password-generators
// =============================================================

export const toc = [
  { id: "who-needs-paid",      title: "Who actually needs a paid generator"    },
  { id: "what-free-gives-you", title: "What free generators provide"          },
  { id: "what-paid-adds",      title: "What paid tiers add"                   },
  { id: "compliance-value",    title: "The compliance use case"                },
  { id: "api-access",          title: "API access and programmatic generation" },
  { id: "team-features",       title: "Team and collaboration features"        },
  { id: "passgeni-model",      title: "How PassGeni's free vs. paid works"     },
  { id: "decision-framework",  title: "Decision framework"                     },
];

export const contentHtml = `
<h2 id="who-needs-paid">Who actually needs a paid generator</h2>
<p>The honest answer: most individuals don't need a paid password generator. A free generator that uses a CSPRNG and lets you configure length and character sets provides all the entropy you need. The security of the generated credential is not meaningfully improved by paying for the generator.</p>
<p>Paid generators earn their cost through features that matter for specific use cases: API access for programmatic generation, compliance presets for regulated environments, team management, audit logging, and SLA guarantees. If none of these apply to you, free is genuinely sufficient.</p>
<p>The use cases where a paid tier has clear value:</p>
<ul>
  <li>Development teams that need to generate credentials programmatically in onboarding or rotation scripts</li>
  <li>Companies under compliance frameworks that need to demonstrate that credentials meet specific standards at generation time</li>
  <li>Security teams that need audit logs of credential generation events</li>
  <li>Teams that need to enforce consistent credential standards across multiple people without relying on manual configuration</li>
</ul>

<h2 id="what-free-gives-you">What free generators provide</h2>
<p>The free tier of any reputable password generator should provide:</p>
<ul>
  <li>Cryptographically secure random number generation</li>
  <li>Configurable length (at minimum 8–32 characters; ideally up to 128)</li>
  <li>Configurable character sets (uppercase, lowercase, digits, symbols)</li>
  <li>Client-side generation (no credentials transmitted to a server)</li>
</ul>
<p>PassGeni's free tier adds to this baseline: entropy display in bits, crack time estimates, DNA Score composite metric, post-quantum mode, six compliance presets, and all six security tools (breach checker, strength checker, audit, policy generator, secure share, WiFi QR). The free tier is genuinely free, not a limited preview of a paid product.</p>
<p>When evaluating free generators, the questions to ask:</p>
<ul>
  <li>Does it use <code>crypto.getRandomValues()</code> or the equivalent? (Verifiable via browser dev tools)</li>
  <li>Is generation client-side? (Does any network request occur when you generate?)</li>
  <li>Does it show entropy? (If not, how do you know the generated password is strong?)</li>
</ul>

<h2 id="what-paid-adds">What paid tiers add</h2>
<p>Across password generator products, paid tiers typically add some combination of:</p>
<ul>
  <li><strong>API access:</strong> Programmatic generation via REST API, typically with an API key and usage rate limits</li>
  <li><strong>Bulk generation:</strong> Generate hundreds or thousands of credentials in a single request — useful for provisioning user accounts, rotating database credentials, or seeding test environments</li>
  <li><strong>Compliance presets via API:</strong> Generate credentials that provably meet a specific framework's requirements, with the preset applied at the API level (not just in the UI)</li>
  <li><strong>Audit logs:</strong> Records of who generated what, when, and with which parameters — relevant for compliance audits</li>
  <li><strong>Team management:</strong> Multiple users under one account, with usage attribution and shared API keys</li>
  <li><strong>Export formats:</strong> CSV, JSON, or structured export of generated credential batches</li>
  <li><strong>SLA:</strong> Uptime guarantees and support response times relevant for production integration</li>
</ul>

<h2 id="compliance-value">The compliance use case</h2>
<p>The clearest value case for a paid password generator is in regulated industries. Consider a healthcare IT administrator who needs to provision 50 new employee accounts with HIPAA-compliant credentials before Monday. The options:</p>
<ul>
  <li><strong>Free web generator:</strong> Manually generate each credential, confirm it meets the 12-character minimum with full character set, copy-paste into the provisioning system 50 times</li>
  <li><strong>Paid API tier:</strong> A single API call with the HIPAA preset and <code>count=50</code> returns 50 compliant credentials in JSON format, which the provisioning script ingests directly. The compliance preset ensures every credential meets the standard without manual verification.</li>
</ul>
<p>At 5 minutes per manual credential, the manual approach takes over 4 hours. The API approach takes seconds. For a one-time task, the free approach works. For a recurring operational need, the API's value is immediate.</p>
<p>The compliance value also extends to audibility. A paid tier with audit logs can demonstrate to a SOC 2 auditor or HIPAA compliance officer that all credentials generated for a specific system used the correct preset parameters. A free web generator provides no such audit trail.</p>

<h2 id="api-access">API access and programmatic generation</h2>
<p>API access is the most transformative feature a paid generator tier provides. The ability to generate credentials programmatically enables:</p>
<ul>
  <li><strong>Infrastructure as code:</strong> Terraform, Ansible, and Pulumi scripts can call the generation API to create credentials for new infrastructure components and store them directly in a secrets manager</li>
  <li><strong>User provisioning automation:</strong> Onboarding scripts generate a unique credential for each new user account, meeting the relevant compliance preset, without human involvement</li>
  <li><strong>Credential rotation pipelines:</strong> Scheduled jobs rotate service account credentials automatically, generating new credentials via API and updating secrets managers</li>
  <li><strong>Test environment seeding:</strong> Create realistic, compliant test credentials for staging environments without reusing production credentials</li>
</ul>
<p>PassGeni's Team API provides this at $29/month for 5,000 calls/day — sufficient for most small to mid-size operational needs. The free tier allows 50 calls/day, enough for low-frequency programmatic use.</p>

<h2 id="team-features">Team and collaboration features</h2>
<p>Team features in paid generator tiers address a specific problem: ensuring that everyone on a team generates credentials that meet the same standards. In a free tier, each person manually configures the generator independently — and may configure it differently. In a paid team tier:</p>
<ul>
  <li>Team-wide API key allows multiple team members to use the same generation parameters</li>
  <li>Compliance presets are applied at the API level, enforcing standards regardless of individual user configuration</li>
  <li>Usage tracking shows how many credentials were generated, by whom (by API key), and against which presets</li>
  <li>Team member management allows adding/removing access without changing the underlying API key used in integrations</li>
</ul>

<h2 id="passgeni-model">How PassGeni's free vs. paid works</h2>
<p>PassGeni's model is explicit: the generator and all tools are free forever. The paid Team plan ($29/month) adds API access with five team seats and 5,000 calls/day. The distinction:</p>

<table>
  <thead><tr><th>Feature</th><th>Free</th><th>Team ($29/mo)</th></tr></thead>
  <tbody>
    <tr><td>Web generator</td><td>✓ All presets</td><td>✓ All presets</td></tr>
    <tr><td>All 6 security tools</td><td>✓</td><td>✓</td></tr>
    <tr><td>API calls/day</td><td>50 (no key needed)</td><td>5,000</td></tr>
    <tr><td>Compliance presets via API</td><td>Basic only</td><td>All 6 frameworks</td></tr>
    <tr><td>Bulk generation</td><td>1 per call</td><td>Up to 500 per call</td></tr>
    <tr><td>Team seats</td><td>—</td><td>5 seats</td></tr>
    <tr><td>Usage dashboard</td><td>—</td><td>✓</td></tr>
    <tr><td>Team management</td><td>—</td><td>✓</td></tr>
  </tbody>
</table>

<h2 id="decision-framework">Decision framework</h2>
<p>Use this to decide whether you need a paid generator:</p>
<ol>
  <li><strong>Do you need to generate credentials programmatically (via API)?</strong> If yes, you need the paid tier for anything beyond 50 calls/day.</li>
  <li><strong>Do you need to generate credentials in bulk (50+ at a time)?</strong> If yes, paid tier.</li>
  <li><strong>Do you need compliance preset enforcement at the API level (not just the UI)?</strong> If yes, paid tier for the compliance preset API access.</li>
  <li><strong>Do you need audit logs of generation events for compliance purposes?</strong> If yes, paid tier for the usage tracking.</li>
  <li><strong>Is it just you, generating individual passwords as needed?</strong> Free tier is entirely sufficient.</li>
</ol>
<p>The free tier is not a restricted version of the paid product — it is a genuinely complete tool for individual use. The paid tier is for operational-scale or team use where the API and management features have direct workflow value.</p>
`;
