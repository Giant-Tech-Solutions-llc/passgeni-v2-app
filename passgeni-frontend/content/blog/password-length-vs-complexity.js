export const contentHtml = `
<h2>The entropy formula</h2>
<p>Password entropy is calculated as: <code>E = L × log2(N)</code>, where L is the length and N is the size of the character pool. This formula tells you everything you need to know about the length vs complexity debate.</p>
<p>A 10-character password using the full printable ASCII set (95 characters): 10 × log2(95) = 65.7 bits. A 20-character password using only lowercase letters (26 characters): 20 × log2(26) = 94.1 bits. The longer lowercase-only password has more entropy. Length wins.</p>

<h2>Why this is counterintuitive</h2>
<p>Decades of corporate password policy have trained us to think that complexity — symbols, uppercase, numbers — is what makes a password strong. IT teams enforce complexity rules because they're visible and auditable. A policy that says "must contain a symbol" is easy to check at registration. A policy that says "must have high entropy" requires calculating entropy, which is harder to communicate and enforce.</p>
<p>The problem is that complexity rules push users toward predictable transformations of dictionary words, which dramatically reduces effective entropy. The formula above assumes random selection. <code>P@ssw0rd!</code> technically uses all four character classes and scores well on mechanical complexity checks. Its actual entropy, accounting for predictable substitution patterns, is near zero — it's in every cracking dictionary.</p>

<h2>The practical upshot</h2>
<p>When choosing between a shorter complex password and a longer simple one, choose longer. But the best choice is longer AND diverse character set — which is what a random generator produces naturally. A 20-character password from the full character set has 130+ bits of entropy and is more secure than either alternative.</p>
<p>PassGeni defaults to 18 characters with all character types enabled precisely because this combination maximises entropy while keeping length practical for most password manager use cases. Use the <a href="/tools/strength-checker">Strength Checker</a> to see the entropy calculation for any specific password.</p>

<h2>The exception: memorised passwords</h2>
<p>For passwords you must actually memorise — password manager master password, device login — the calculus changes. A 5-word passphrase gives you 60+ bits of entropy and is typeable without error. A 20-character random password with full character diversity is theoretically stronger but practically impossible to memorise reliably. Use the passphrase mode in PassGeni for memorised credentials.</p>
`;