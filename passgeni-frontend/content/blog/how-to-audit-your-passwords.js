export const contentHtml = `
<h2>Why most people have at least 3 compromised passwords</h2>
<p>The Have I Been Pwned database contains over 12 billion stolen credentials. If you've been online for more than 5 years and reused passwords at all, statistically you have multiple compromised credentials in active use. Most people don't know because no one told them, and checking manually takes too long.</p>
<p>This guide gives you a structured 30-minute process to audit your password security, find the worst problems, and fix them in priority order.</p>

<h2>Step 1: Get your password list (5 minutes)</h2>
<p>If you use a password manager: export a CSV. If you don't (change that after this), use your browser's saved password export. In Chrome: Settings → Passwords → Export. In Safari: Settings → Passwords → Export All Passwords.</p>
<p>Keep this export local. Delete it securely when done.</p>

<h2>Step 2: Run breach checks (5 minutes)</h2>
<p>Use PassGeni's <a href="/tools/breach-checker">Breach Checker</a> to check your most important account passwords. It uses k-anonymity — only 5 characters of your password's SHA-1 hash go to the HIBP API. Your actual password never leaves your browser.</p>
<p>Priority order for checking: email account (recovery for everything), banking, work email, password manager master password, social media (used for "Login with" flows).</p>

<h2>Step 3: Check entropy (5 minutes)</h2>
<p>Paste each password into PassGeni's <a href="/tools/strength-checker">Strength Checker</a>. You're looking for:</p>
<ul>
  <li>Entropy below 60 bits → weak, replace immediately</li>
  <li>Crack time under 1 year → weak, replace this month</li>
  <li>DNA Score below B → review and consider replacing</li>
</ul>

<h2>Step 4: Find duplicates (5 minutes)</h2>
<p>Sort your password list. Identical passwords for different sites are a credential stuffing liability. If site A gets breached, attackers will try that password on every site in your list. Flag every duplicate.</p>

<h2>Step 5: Prioritise what to fix (5 minutes)</h2>
<p>Create a priority list using this framework:</p>
<ul>
  <li><strong>P1 — Fix today:</strong> Compromised in breach + reused elsewhere, or used for email/banking/password manager</li>
  <li><strong>P2 — Fix this week:</strong> Compromised in breach, not reused. Low entropy passwords on important accounts.</li>
  <li><strong>P3 — Fix this month:</strong> Duplicate passwords on lower-priority accounts</li>
  <li><strong>P4 — Fix eventually:</strong> Weak passwords on accounts with no personal data</li>
</ul>

<h2>Step 6: Generate replacements (10 minutes)</h2>
<p>Use PassGeni's <a href="/#generator">password generator</a> with the appropriate compliance preset for each account type:</p>
<ul>
  <li>Work accounts with HIPAA/SOC 2 requirements → use the matching preset</li>
  <li>Personal accounts → 18+ characters, all character types enabled</li>
  <li>Accounts you need to type (TV, game console) → passphrase mode, 4 words</li>
</ul>
<p>Store everything in a password manager immediately. Don't try to remember generated passwords — that defeats the purpose.</p>

<h2>Ongoing: set a quarterly reminder</h2>
<p>This audit should take 30 minutes once you have a password manager. Set a quarterly reminder to run steps 2 and 3 on your most important accounts. New breaches happen constantly — yesterday's safe password may be in a dataset tonight.</p>
`;
