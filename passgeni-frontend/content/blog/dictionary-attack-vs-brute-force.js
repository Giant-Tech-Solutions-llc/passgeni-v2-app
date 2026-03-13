export const contentHtml = `
<h2>Brute force: trying everything</h2>
<p>A brute force attack tries every possible combination of characters, starting with the shortest and working up: "a", "b", "c"... "aa", "ab"... until it finds the correct password or exhausts the search space. Against modern hashing algorithms and long passwords, this is computationally infeasible — a 20-character random password against bcrypt would take longer than the age of the universe to crack by brute force.</p>
<p>Brute force is relevant primarily for short passwords (under 10 characters), weak hashing (MD5, SHA-1 without proper salting), and offline attacks against leaked databases where the attacker can try billions of combinations per second.</p>

<h2>Dictionary attacks: trying likely passwords</h2>
<p>A dictionary attack uses a pre-compiled list of likely passwords rather than trying all combinations. Modern password dictionaries aren't just word lists — they include:</p>
<ul>
  <li>All previously leaked passwords from breach databases (hundreds of millions of real passwords)</li>
  <li>Common word + number combinations: <code>password1</code>, <code>summer2024</code></li>
  <li>Leet-speak substitutions: <code>p@ssw0rd</code>, <code>l33t</code></li>
  <li>Keyboard walks: <code>qwerty</code>, <code>123456</code></li>
  <li>Corporate patterns: <code>CompanyName2024!</code></li>
</ul>
<p>Dictionary attacks with rule sets (like hashcat's built-in rules) can test billions of plausible variations per second, making them far more practical than brute force for human-created passwords.</p>

<h2>Hybrid attacks</h2>
<p>Hybrid attacks combine both approaches: start with dictionary words and apply brute-force character substitutions to each one. This is how most real-world password cracking works and why complexity rules fail — they teach patterns that become dictionary entries.</p>

<h2>What defeats each attack type</h2>
<p><strong>Against brute force:</strong> Length. A 20-character password has too many possible combinations to enumerate regardless of character set or hashing algorithm.</p>
<p><strong>Against dictionary attacks:</strong> Randomness. A password with no dictionary-word components and no predictable substitution patterns doesn't appear in any wordlist. This is why PassGeni uses <code>crypto.getRandomValues()</code> rather than words with transformations.</p>
<p><strong>Against both:</strong> Random generation + length + strong hashing on the server side. PassGeni handles the first two; the site handles the third (and you can't control that).</p>
<p>Use the <a href="/tools/strength-checker">Strength Checker</a> to see how your current passwords rate against dictionary-based scoring, not just entropy calculations.</p>
`;