export const contentHtml = `
<h2>The numbers that should motivate you</h2>
<p>With a modern GPU cluster (the kind used for password cracking, not generative AI), an 8-character password using uppercase, lowercase, numbers, and symbols can be cracked in under an hour if it's stored as an MD5 hash. The same password stored as bcrypt (work factor 10) takes roughly 3 years. The difference isn't the password — it's how the site stored it.</p>
<p>You don't control how sites store your passwords. You do control the passwords themselves. Here are the actual timelines.</p>

<h2>Cracking rates for current hardware (2025)</h2>
<p>Reference hardware: consumer GPU cluster (4× RTX 4090), which costs under $10,000 and is accessible to well-funded attackers.</p>
<ul>
  <li><strong>MD5:</strong> ~200 billion hashes/second. An 8-character full character set (95 chars): 0.4 hours. 10 characters: 4 years. 12 characters: 35,000 years.</li>
  <li><strong>SHA-256:</strong> ~8 billion hashes/second. 8 chars: 11 hours. 10 chars: 120 years.</li>
  <li><strong>bcrypt (cost 10):</strong> ~8,000 hashes/second per GPU. 8 chars: 4,000 years. 10 chars: effectively infinite.</li>
  <li><strong>Argon2id:</strong> Designed to be memory-hard; GPU cracking is much less effective. Modern best practice.</li>
</ul>

<h2>Why hash algorithm matters more than you might think</h2>
<p>These numbers assume a full brute-force search. In practice, attackers use dictionaries with rule sets that dramatically reduce effective search space by exploiting predictable substitution patterns. An 8-character complex password that follows a common template (<code>Word1!</code>) can crack in seconds even against bcrypt because the effective search space is tiny.</p>
<p>The lesson isn't just "use bcrypt" — it's that you can't know how a site stores your password until they breach (too late). A 20-character random password is computationally infeasible even against MD5. A 20-character passphrase is infeasible against any modern algorithm.</p>

<h2>The practical upshot for password length</h2>
<ul>
  <li><strong>Under 10 characters:</strong> Unsafe against any hashing algorithm given sufficient time and value</li>
  <li><strong>12-14 characters:</strong> Reasonably safe against bcrypt, at risk against MD5 and SHA-1</li>
  <li><strong>16+ characters:</strong> Safe against all common hashing algorithms even for targeted attacks with significant resources</li>
  <li><strong>20+ characters:</strong> Computationally infeasible for the foreseeable future, regardless of hashing</li>
</ul>
<p>PassGeni defaults to 18 characters for exactly this reason. Use the <a href="/tools/strength-checker">Strength Checker</a> to see the estimated crack time for any specific password — it uses current GPU-based cracking rates in its calculation.</p>
`;