export const contentHtml = `
<h2>Why NIST recommends passphrases</h2>
<p>NIST Special Publication 800-63B, the US government's authoritative authentication guidance, made a significant shift in 2017: it recommends length over complexity. Specifically, it recommends passphrases — multiple random words — over complex character requirements, and explicitly discourages mandatory periodic rotation and complexity rules that produce predictable patterns.</p>
<p>The reason is entropy. Four random words from a 7,776-word wordlist (standard Diceware) give you roughly 51 bits of entropy. That beats any 8-character complex password (52 bits at most, much less in practice due to predictable patterns) while being dramatically more memorable.</p>

<h2>How to use PassGeni's passphrase generator</h2>
<p>PassGeni's passphrase tab generates NIST 800-63B compliant passphrases entirely in your browser:</p>
<ol>
  <li>Go to the generator and click the <strong>Passphrase</strong> tab</li>
  <li>Select your profession — this seeds the word pool with domain-relevant vocabulary, making the result 30% more recognisable without reducing entropy</li>
  <li>Set word count: 4 words for personal accounts, 5+ for high-security accounts</li>
  <li>Choose a separator: hyphens, spaces, dots, or none</li>
  <li>Generate — your passphrase is created with <code>crypto.getRandomValues()</code>, never transmitted to any server</li>
</ol>

<h2>When to use a passphrase vs a password</h2>
<p><strong>Use a passphrase when:</strong></p>
<ul>
  <li>You need to type the credential manually (TV apps, terminal, phone keyboard)</li>
  <li>The account requires memorisation without a password manager</li>
  <li>You want something you can say over the phone to IT support</li>
  <li>Password manager master password (you can't autofill this)</li>
</ul>
<p><strong>Use a password when:</strong></p>
<ul>
  <li>The account has strict format requirements (some systems reject spaces)</li>
  <li>Maximum entropy is the priority over memorability</li>
  <li>The credential will be stored in a password manager and never typed</li>
</ul>

<h2>The entropy math</h2>
<p>A 4-word Diceware passphrase: 7776^4 ≈ 3.6 × 10^15 combinations = 51.7 bits of entropy. A 5-word passphrase: 62.5 bits. A 6-word passphrase: 77.5 bits — exceeding the NIST recommendation for most use cases.</p>
<p>For comparison: an 18-character random password with all character types (95 chars) has approximately 118 bits of entropy — more than a 6-word passphrase, but impossible to remember. The passphrase wins on the memorability/security tradeoff for accounts that require human memory.</p>
`;