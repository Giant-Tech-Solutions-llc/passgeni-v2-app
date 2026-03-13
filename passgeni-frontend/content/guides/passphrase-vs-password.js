// =============================================================
// PASSGENI — GUIDE CONTENT
// passphrase-vs-password
// =============================================================

export const toc = [
  { id: "definitions",          title: "Definitions"                         },
  { id: "entropy-comparison",   title: "Entropy comparison"                  },
  { id: "memorability",         title: "Memorability and usability"          },
  { id: "attack-resistance",    title: "Attack resistance"                   },
  { id: "when-to-use-each",     title: "When to use each"                    },
  { id: "diceware-eff",         title: "Diceware and the EFF word list"      },
  { id: "passphrase-mistakes",  title: "Common passphrase mistakes"          },
  { id: "compliance",           title: "Compliance considerations"           },
  { id: "recommendation",       title: "The verdict"                         },
];

export const contentHtml = `
<h2 id="definitions">Definitions</h2>
<p>A <strong>password</strong> is a relatively short string of characters — typically 8–20 characters — drawn from a pool of letters, numbers, and symbols. The security model depends on unpredictability and pool size. Example: <code>nX9#kT2@mP5!</code></p>
<p>A <strong>passphrase</strong> is a longer string composed of multiple words. The security model depends on the number of words and the size of the word pool. Example: <code>correct-horse-battery-staple</code> (the famous XKCD 936 example) or <code>violet marble funnel sunrise</code>.</p>
<p>Both are forms of "something you know" authentication. The difference is in how they achieve security and usability.</p>

<h2 id="entropy-comparison">Entropy comparison</h2>
<p>Entropy is the right way to compare them. Let's do the math honestly.</p>
<p><strong>Random password, 12 characters, full ASCII (94-character pool):</strong><br>
Entropy = 12 × log₂(94) = 12 × 6.55 = <strong>78.6 bits</strong></p>
<p><strong>Random password, 16 characters, full ASCII:</strong><br>
Entropy = 16 × log₂(94) = 16 × 6.55 = <strong>104.8 bits</strong></p>
<p><strong>Diceware passphrase, 4 words, EFF large word list (7,776 words):</strong><br>
Entropy = 4 × log₂(7776) = 4 × 12.92 = <strong>51.7 bits</strong></p>
<p><strong>Diceware passphrase, 5 words, EFF large word list:</strong><br>
Entropy = 5 × log₂(7776) = 5 × 12.92 = <strong>64.6 bits</strong></p>
<p><strong>Diceware passphrase, 6 words, EFF large word list:</strong><br>
Entropy = 6 × log₂(7776) = 6 × 12.92 = <strong>77.5 bits</strong></p>

<table>
  <thead><tr><th>Credential type</th><th>Length</th><th>Entropy</th><th>Example strength</th></tr></thead>
  <tbody>
    <tr><td>4-word EFF passphrase</td><td>~24 chars avg</td><td>51.7 bits</td><td>Marginal</td></tr>
    <tr><td>8-char random full ASCII</td><td>8 chars</td><td>52.4 bits</td><td>Marginal</td></tr>
    <tr><td>5-word EFF passphrase</td><td>~30 chars avg</td><td>64.6 bits</td><td>Adequate</td></tr>
    <tr><td>12-char random full ASCII</td><td>12 chars</td><td>78.6 bits</td><td>Strong</td></tr>
    <tr><td>6-word EFF passphrase</td><td>~36 chars avg</td><td>77.5 bits</td><td>Strong</td></tr>
    <tr><td>16-char random full ASCII</td><td>16 chars</td><td>104.8 bits</td><td>Very strong</td></tr>
    <tr><td>7-word EFF passphrase</td><td>~42 chars avg</td><td>90.3 bits</td><td>Very strong</td></tr>
    <tr><td>20-char random full ASCII</td><td>20 chars</td><td>131 bits</td><td>Post-quantum safe</td></tr>
  </tbody>
</table>

<p>The takeaway: a 6-word passphrase and a 12-character random password have roughly equivalent entropy (~78 bits). The passphrase is 3× longer in character count but far easier to type and remember.</p>

<h2 id="memorability">Memorability and usability</h2>
<p>This is where passphrases win decisively. The human brain is designed to encode and retrieve linguistic sequences — words, stories, and verbal patterns. It is not designed to remember arbitrary strings of characters.</p>
<p>Research on password memorability consistently shows:</p>
<ul>
  <li>Passphrases are 2–3× easier to recall accurately after a 1-week delay than equivalent-entropy random passwords</li>
  <li>Users who are forced to use complex passwords are significantly more likely to write them down, store them insecurely, or reuse them</li>
  <li>The cognitive cost of passphrases is lower even at greater entropy levels — "violet marble funnel sunrise" is easier to remember than "nX9#kT2@mP" despite higher entropy</li>
</ul>
<p>There is one important caveat: the passphrase must be <em>randomly</em> generated, not human-chosen. When people choose their own passphrases, they pick words with strong associations (<code>blue sky happy dog</code>), names, song lyrics, or memorable quotes. These have dramatically lower effective entropy than randomly generated word combinations because attackers can model human preferences.</p>

<h2 id="attack-resistance">Attack resistance</h2>
<p>Different attack types favour different credential types:</p>
<p><strong>Brute force attacks:</strong> Both benefit equally from higher entropy. At equal entropy, the attack difficulty is identical — brute force doesn't care whether you're attacking a random string or a random word sequence.</p>
<p><strong>Dictionary attacks on random passphrases:</strong> A randomly chosen passphrase from a known word list (like the EFF list) is actually slightly more vulnerable than the entropy calculation suggests — because an attacker who knows you used the EFF list can target that specific space. A 5-word EFF passphrase has 64.6 bits of entropy from that dictionary's perspective, but an attacker trying all combinations of 5 EFF words can crack it significantly faster than a general brute force would suggest.</p>
<p><strong>Dictionary attacks on random passwords:</strong> A randomly generated character-based password has no dictionary to attack. An attacker must brute-force the full character space.</p>
<p><strong>Pattern attacks on human-chosen passphrases:</strong> This is the critical weakness. Humans choosing passphrases gravitate toward:</p>
<ul>
  <li>Song lyrics, movie quotes, book titles</li>
  <li>Geographic references (city + street + number)</li>
  <li>Famous phrases with simple substitutions</li>
  <li>Personal associations (pet names, family members)</li>
</ul>
<p>These are all in attacker wordlists. Human-chosen passphrases consistently crack faster than their theoretical entropy suggests.</p>

<h2 id="when-to-use-each">When to use each</h2>
<p>The best choice depends on the use case:</p>
<ul>
  <li><strong>Use a passphrase for:</strong> Credentials you must memorise without a password manager — primary email account, device unlock PIN, password manager master password, recovery codes</li>
  <li><strong>Use a random password for:</strong> Any credential stored in a password manager. Since you're not memorising it, length and memorability are irrelevant. A randomly generated 20-character full-ASCII password stored in a vault is superior to a passphrase in every measurable way.</li>
  <li><strong>Use a passphrase for:</strong> Situations where you need to type the credential frequently on varying keyboards (SSH server passwords, shared team credentials typed by multiple people)</li>
  <li><strong>Use a random password for:</strong> Any compliance-governed credential (HIPAA, PCI-DSS) — regulators and auditors may not recognise passphrase-based approaches, and the length-vs-complexity requirements can be ambiguous</li>
</ul>

<h2 id="diceware-eff">Diceware and the EFF word list</h2>
<p>Diceware is the gold standard method for generating passphrases. The process:</p>
<ol>
  <li>Download the EFF Large Wordlist — 7,776 words, each indexed by a 5-digit dice roll (11111 to 66666)</li>
  <li>Roll 5 physical dice (or use a cryptographically secure random source)</li>
  <li>Look up the result in the wordlist</li>
  <li>Repeat for each word in the passphrase</li>
  <li>Separate words with spaces, hyphens, or nothing — your choice</li>
</ol>
<p>The EFF wordlist was specifically designed for memorability — it excludes offensive words, proper nouns, and hard-to-spell terms. Each word averages about 7 characters, meaning a 5-word passphrase averages about 35 characters.</p>
<p>Software alternatives to physical dice: any CSPRNG that maps uniformly to the word list. PassGeni's passphrase mode uses this approach.</p>

<div class="callout warning">
  <strong>Never use "famous quotes" or song lyrics as a passphrase.</strong> Even obscure lyrics appear in cracking wordlists. The first time a passphrase gets cracked anywhere, attackers add that phrase to their dictionaries. True randomness is non-negotiable.
</div>

<h2 id="passphrase-mistakes">Common passphrase mistakes</h2>
<ul>
  <li><strong>Choosing words yourself:</strong> Human choices cluster on a tiny fraction of possible word combinations. Use a random generator.</li>
  <li><strong>Using too few words:</strong> 3-word passphrases have only 38.8 bits of entropy from the EFF list — weaker than an 8-character random password.</li>
  <li><strong>Adding a digit or symbol at the end:</strong> <code>correct-horse-battery-staple1!</code> adds almost nothing. The extra predictable characters don't significantly increase entropy.</li>
  <li><strong>Using a small word list:</strong> Not all passphrase generators use the EFF large list. A 1,000-word list gives only 9.97 bits per word — a 5-word passphrase is less than 50 bits.</li>
  <li><strong>Reusing across accounts:</strong> A passphrase cracked in one context immediately exposes all accounts where it's reused.</li>
</ul>

<h2 id="compliance">Compliance considerations</h2>
<p>Most compliance frameworks were written with character-based passwords in mind. Here is how they handle passphrases:</p>
<ul>
  <li><strong>NIST 800-63B:</strong> Explicitly encourages passphrases. Sets maximum length at 64+ characters to support them. No complexity requirements that would disadvantage passphrases.</li>
  <li><strong>PCI-DSS v4.0:</strong> Explicitly permits passphrases (Requirement 8.3.6 guidance). Minimum passphrase length is 15 characters.</li>
  <li><strong>HIPAA:</strong> Leaves implementation to covered entities. Passphrases that meet minimum entropy thresholds should be acceptable — document the decision explicitly.</li>
  <li><strong>SOC 2:</strong> Auditors assess controls against best practices. A well-documented passphrase policy referencing NIST 800-63B should satisfy CC6.1 requirements.</li>
  <li><strong>ISO 27001:</strong> Framework-based, not prescriptive. Passphrases aligned with documented policy satisfy the intent of Annex A.9.</li>
</ul>

<h2 id="recommendation">The verdict</h2>
<p>There is no universal winner. The right answer depends on the use case:</p>
<ul>
  <li><strong>For your password manager master password:</strong> 6-word Diceware passphrase. You must memorise it, and it's the key to everything else.</li>
  <li><strong>For everything in your password manager:</strong> 16–20 character randomly generated full-ASCII password. The vault handles memorability. Maximise entropy.</li>
  <li><strong>For shared team credentials typed frequently:</strong> 5–6 word Diceware passphrase. Balances security and usability across people.</li>
  <li><strong>For compliance-regulated systems:</strong> Random passwords meeting the specific framework requirements — passphrases can require additional documentation.</li>
</ul>
<p>The common thread: whatever you use must be randomly generated. Human choice is the enemy of password security, regardless of whether you're choosing a character string or a sequence of words.</p>

<div class="callout">
  PassGeni supports both modes. The Passphrase tab generates random word sequences using the EFF large wordlist and a CSPRNG. The Password tab generates random character strings with configurable pool and length. Both display entropy in bits so you can compare directly.
</div>
`;
