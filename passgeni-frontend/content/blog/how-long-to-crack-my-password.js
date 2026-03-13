export const contentHtml = `
<h2>The number that actually matters</h2>
<p>A modern GPU cracking rig can test approximately 100 billion MD5 password hashes per second. Against bcrypt (cost factor 10), that drops to about 25,000 per second. The hashing algorithm your target site uses matters more than anything else.</p>

<h2>Real crack time estimates by password type</h2>
<h3>Against MD5 (older — still used by many sites)</h3>
<ul>
  <li><strong>6 characters, letters only:</strong> Under 1 second</li>
  <li><strong>8 characters, mixed case + numbers:</strong> About 22 minutes</li>
  <li><strong>10 characters, full character set:</strong> About 3 weeks</li>
  <li><strong>12 characters, full character set:</strong> About 400 years</li>
  <li><strong>16 characters, full character set:</strong> Computationally infeasible</li>
</ul>
<h3>Against bcrypt cost-10 (the modern standard)</h3>
<ul>
  <li><strong>8 characters, mixed case + numbers:</strong> About 3 years</li>
  <li><strong>10 characters, full character set:</strong> Millions of years</li>
  <li><strong>12 characters, any reasonable composition:</strong> The sun burns out first</li>
</ul>

<h2>Why length beats complexity every time</h2>
<p>Adding one character multiplies the search space by the character pool size. A 12-character password from 95 ASCII chars has 95^12 = ~5.4 × 10^23 combinations. A 16-character password has ~4.4 × 10^31 — about 81 million times larger. Swapping a letter for a symbol adds far less. This is why NIST 800-63B prioritises length over complexity requirements.</p>

<h2>The attack that bypasses all of this</h2>
<p>Brute force is rarely how passwords are cracked in practice. Dictionary and rule-based attacks are orders of magnitude faster against common patterns. "P@ssw0rd" has 6.6 × 10^15 combinations in theory but cracks in milliseconds because it's in every wordlist.</p>
<p>Use PassGeni's <a href="/tools/breach-checker">breach checker</a> to see if your password has already appeared in known breach datasets. And use the <a href="/#generator">password generator</a> to create passwords with verified high entropy — the DNA Score shows you exactly where you stand.</p>

<h2>The bottom line on entropy</h2>
<p>80+ bits of entropy is considered secure against all currently feasible brute-force attacks. A 16-character password using uppercase, lowercase, numbers, and symbols gives you approximately 105 bits. PassGeni shows entropy in bits for every password generated — aim for green on the strength bar and 80+ bits on the entropy display.</p>
`;
