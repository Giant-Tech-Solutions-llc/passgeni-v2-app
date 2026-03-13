// =============================================================
// PASSGENI — GUIDE CONTENT
// what-is-password-entropy
// =============================================================

export const toc = [
  { id: "what-is-entropy",         title: "What is password entropy?"             },
  { id: "how-to-calculate",        title: "How to calculate entropy"              },
  { id: "entropy-vs-strength",     title: "Entropy vs. perceived strength"        },
  { id: "crack-time",              title: "Entropy and crack time"                },
  { id: "pool-size-matters",       title: "Why pool size matters"                 },
  { id: "length-vs-complexity",    title: "Length vs. complexity: the numbers"   },
  { id: "practical-targets",       title: "Practical entropy targets"            },
  { id: "entropy-myths",           title: "Common entropy myths"                 },
];

export const contentHtml = `
<h2 id="what-is-entropy">What is password entropy?</h2>
<p>Password entropy is a measurement of how unpredictable a password is — specifically, how many guesses an attacker would need to crack it through brute force. It is expressed in bits, and each additional bit doubles the number of guesses required.</p>
<p>The concept comes from information theory, specifically Claude Shannon's 1948 paper "A Mathematical Theory of Communication." Shannon entropy measures the minimum number of bits needed to represent a piece of information — in the password context, how much information content (unpredictability) a password contains.</p>
<p>A password with 40 bits of entropy requires up to 2<sup>40</sup> guesses to crack by brute force — roughly 1.1 trillion guesses. With 80 bits, that becomes 2<sup>80</sup>, or about 1.2 × 10<sup>24</sup> guesses. The difference is not linear — it is exponential. This is why security professionals care so much about entropy.</p>

<div class="callout">
  <strong>The key formula:</strong> Entropy (bits) = log₂(pool size<sup>length</sup>) = length × log₂(pool size)
</div>

<h2 id="how-to-calculate">How to calculate entropy</h2>
<p>Password entropy depends on two variables: the length of the password and the size of the pool of possible characters at each position.</p>
<p>The formula is: <code>H = L × log₂(N)</code></p>
<p>Where <code>H</code> is entropy in bits, <code>L</code> is password length, and <code>N</code> is the size of the character pool.</p>
<p>Common character pool sizes:</p>

<table>
  <thead><tr><th>Character set</th><th>Pool size (N)</th><th>log₂(N)</th></tr></thead>
  <tbody>
    <tr><td>Digits only (0–9)</td><td>10</td><td>3.32 bits/char</td></tr>
    <tr><td>Lowercase letters (a–z)</td><td>26</td><td>4.70 bits/char</td></tr>
    <tr><td>Lower + uppercase</td><td>52</td><td>5.70 bits/char</td></tr>
    <tr><td>Alphanumeric (lower + upper + digits)</td><td>62</td><td>5.95 bits/char</td></tr>
    <tr><td>Full printable ASCII (including symbols)</td><td>94</td><td>6.55 bits/char</td></tr>
    <tr><td>Full ASCII + Unicode extensions</td><td>100+</td><td>6.64+ bits/char</td></tr>
  </tbody>
</table>

<p>Worked examples:</p>
<ul>
  <li><strong>8-character alphanumeric password:</strong> 8 × log₂(62) = 8 × 5.95 = <strong>47.6 bits</strong></li>
  <li><strong>12-character full ASCII password:</strong> 12 × log₂(94) = 12 × 6.55 = <strong>78.6 bits</strong></li>
  <li><strong>20-character full ASCII password:</strong> 20 × log₂(94) = 20 × 6.55 = <strong>131 bits</strong></li>
</ul>
<p>This is the theoretical maximum entropy — the actual effective entropy depends on how randomly the password was generated. A human-chosen "random" password almost always has far lower effective entropy because humans are predictable.</p>

<h2 id="entropy-vs-strength">Entropy vs. perceived strength</h2>
<p>This is where most password strength meters mislead users. A typical strength meter checks for uppercase, lowercase, numbers, and symbols and reports "strong" when all four are present. But a password like <code>P@ssw0rd1</code> has high perceived strength (4 character types, 9 characters) and very low actual strength — it appears on every cracked password list.</p>
<p>Why? Because entropy measures statistical unpredictability, not just character diversity. When a human chooses a password by substituting <code>@</code> for <code>a</code> and <code>0</code> for <code>o</code>, they are following an extremely predictable pattern. Modern cracking tools handle these substitutions trivially — they are baked into dictionary attack rule sets.</p>
<p>True entropy requires true randomness. A password generator using a cryptographically secure pseudorandom number generator (CSPRNG) — like <code>crypto.getRandomValues()</code> in the browser, which PassGeni uses — produces passwords with entropy close to the theoretical maximum. A human choosing a "random" password typically achieves 10–30% of the theoretical maximum entropy for the same length and character set.</p>

<h2 id="crack-time">Entropy and crack time</h2>
<p>Crack time estimates depend on the attacker's hardware and the hashing algorithm used to store the password. Modern GPU-accelerated cracking rigs can test billions to trillions of guesses per second against weakly hashed passwords (MD5, SHA-1). Against modern slow hashes (bcrypt, Argon2id), the rate drops dramatically.</p>

<table>
  <thead><tr><th>Entropy</th><th>Guesses required</th><th>Time at 10B/sec (MD5)</th><th>Time at 10K/sec (bcrypt)</th></tr></thead>
  <tbody>
    <tr><td>28 bits</td><td>~268 million</td><td>< 1 second</td><td>~7 hours</td></tr>
    <tr><td>40 bits</td><td>~1.1 trillion</td><td>~110 seconds</td><td>~3.5 years</td></tr>
    <tr><td>56 bits</td><td>~72 quadrillion</td><td>~83 days</td><td>Millions of years</td></tr>
    <tr><td>80 bits</td><td>~1.2 × 10²⁴</td><td>Billions of years</td><td>Heat death of universe</td></tr>
    <tr><td>128 bits</td><td>~3.4 × 10³⁸</td><td>Impossible</td><td>Impossible</td></tr>
  </tbody>
</table>

<p>Key takeaway: against a slow hash (which any serious application uses), 40+ bits of entropy is sufficient for most purposes. Against an offline attack on leaked MD5 hashes — the scenario after a major breach — you want 60+ bits. For long-term secrets, 80+ bits provides a meaningful safety margin against near-future computational improvements.</p>

<h2 id="pool-size-matters">Why pool size matters</h2>
<p>Expanding the character pool is the most efficient way to increase entropy per character. Compare:</p>
<ul>
  <li>Lowercase only: 4.70 bits per character</li>
  <li>Full ASCII (lowercase + uppercase + digits + 32 symbols): 6.55 bits per character</li>
  <li>Difference: 1.85 bits per character</li>
</ul>
<p>Over a 12-character password, that difference is 22 bits — equivalent to adding roughly 3–4 characters to a lowercase-only password. This is why including symbols is genuinely valuable, even as NIST warns against <em>requiring</em> them (because requirements lead to predictable substitutions).</p>
<p>The practical recommendation: use a password generator that draws from a large pool. PassGeni's default pool (lowercase + uppercase + digits + symbols) gives 6.55 bits per character. At 18 characters (the default length), that is approximately 118 bits — sufficient against any foreseeable attack.</p>

<h2 id="length-vs-complexity">Length vs. complexity: the numbers</h2>
<p>The NIST guidance to prefer length over complexity is mathematically correct, but the two are not mutually exclusive. The data:</p>

<table>
  <thead><tr><th>Configuration</th><th>Entropy</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td>8 chars, full ASCII (complex)</td><td>52 bits</td><td>Marginal</td></tr>
    <tr><td>12 chars, lowercase only (long)</td><td>56 bits</td><td>Marginal</td></tr>
    <tr><td>12 chars, full ASCII</td><td>79 bits</td><td>Good</td></tr>
    <tr><td>16 chars, full ASCII</td><td>105 bits</td><td>Strong</td></tr>
    <tr><td>20 chars, full ASCII</td><td>131 bits</td><td>Post-quantum safe</td></tr>
    <tr><td>5-word passphrase (EFF list, 7776 words)</td><td>65 bits</td><td>Good for memorability</td></tr>
    <tr><td>6-word passphrase (EFF list)</td><td>78 bits</td><td>Strong</td></tr>
  </tbody>
</table>

<p>The ideal is both: long <em>and</em> drawn from a large pool. A randomly generated 16-character password using the full ASCII printable set achieves 105 bits — better than any human-chosen passphrase, and immune to the pattern-based attacks that defeat complexity rules.</p>

<h2 id="practical-targets">Practical entropy targets</h2>
<p>What entropy should you target for different use cases?</p>

<div class="req-row"><span class="req-label">General online account (with bcrypt storage)</span><span class="req-value">≥ 56 bits</span></div>
<div class="req-row"><span class="req-label">HIPAA / PCI-DSS compliant systems</span><span class="req-value">≥ 78 bits (12 chars, full ASCII)</span></div>
<div class="req-row"><span class="req-label">Admin and privileged accounts</span><span class="req-value">≥ 105 bits (16 chars, full ASCII)</span></div>
<div class="req-row"><span class="req-label">Long-lived secrets, API keys</span><span class="req-value">≥ 128 bits</span></div>
<div class="req-row"><span class="req-label">Post-quantum resistant (long-term)</span><span class="req-value">≥ 128 bits (20 chars, full ASCII)</span></div>

<h2 id="entropy-myths">Common entropy myths</h2>
<p><strong>Myth: "My password is strong because it has uppercase, numbers, and symbols."</strong> Character diversity contributes to pool size but not if the underlying pattern is predictable. <code>P@ssw0rd!</code> has all four types and zero real entropy because it appears in every cracking dictionary.</p>
<p><strong>Myth: "I just need to avoid dictionary words."</strong> Modern cracking tools combine dictionary attacks with rule-based transforms, making this insufficient at short lengths. Below 12 characters, even non-dictionary passwords can be cracked quickly against weakly hashed stores.</p>
<p><strong>Myth: "Entropy is the same thing as strength."</strong> Entropy measures theoretical unpredictability of random selection. Real-world password strength also depends on: the hashing algorithm used to store it, whether it appears in breach databases, the attacker's specific tooling, and rate limiting on the authentication system. A 40-bit randomly generated password stored with Argon2id is practically much stronger than an 80-bit password stored as unsalted MD5.</p>
<p><strong>Myth: "Passphrases always have more entropy than passwords."</strong> A randomly chosen 4-word passphrase from the EFF list has about 51 bits of entropy — less than a 9-character random full-ASCII password. Passphrases win on memorability, not raw entropy at equal length.</p>

<div class="callout">
  PassGeni shows the exact entropy in bits for every generated password, alongside an estimated crack time. Both figures assume cryptographically random generation — which PassGeni uses via <code>crypto.getRandomValues()</code> directly in your browser.
</div>
`;
