export const contentHtml = `
<h2>Why bad password advice persists</h2>
<p>Most organisations are still running password policies written in the early 2000s, when the threat model was different and the research was thinner. Those policies spread through corporate IT as "best practice" and calcified into compliance frameworks. Changing them requires challenging received wisdom — something organisations are reluctant to do without authoritative cover.</p>
<p>The cover now exists: NIST 800-63B, published in 2017 and updated since, explicitly debunks most of these myths. Here are the 10 most persistent ones.</p>

<h2>Myth 1: Change your password every 90 days</h2>
<p><strong>Reality:</strong> Mandatory rotation causes users to make minimal, predictable changes (<code>Password1</code> → <code>Password2</code>). NIST explicitly recommends against mandatory periodic rotation, recommending rotation only when there's evidence of compromise.</p>

<h2>Myth 2: Symbols and uppercase make passwords stronger</h2>
<p><strong>Reality:</strong> Complexity rules produce predictable patterns (<code>P@ssw0rd1!</code>) that are in every cracking dictionary. Length is a more reliable security indicator than complexity. See our <a href="/blog/password-length-vs-complexity">length vs complexity</a> analysis.</p>

<h2>Myth 3: Security questions add security</h2>
<p><strong>Reality:</strong> Security question answers are guessable (mother's maiden name, high school) or appear in data breaches and social media. NIST 800-63B explicitly prohibits knowledge-based authentication (security questions) as a verification method.</p>

<h2>Myth 4: Longer passwords are harder to remember</h2>
<p><strong>Reality:</strong> A 5-word passphrase is both longer (25+ characters) and more memorable than a complex 10-character string. The passphrase mode in PassGeni is specifically designed for this tradeoff.</p>

<h2>Myth 5: Password reuse only matters for important accounts</h2>
<p><strong>Reality:</strong> Attackers try breached credentials against every valuable service automatically. A reused password on a gaming site becomes a reused password on your banking app in the hands of a credential stuffer.</p>

<h2>Myth 6: A site is safe if it shows a green padlock</h2>
<p><strong>Reality:</strong> HTTPS encrypts data in transit. It says nothing about how the site stores your password, whether it's a phishing site, or whether it's been breached.</p>

<h2>Myth 7: Adding a number and symbol to a dictionary word makes it secure</h2>
<p><strong>Reality:</strong> Cracking tools apply these transforms automatically. <code>dragon</code> → <code>Dr@g0n!</code> is a trivial rule set for hashcat.</p>

<h2>Myth 8: You need to memorise your passwords</h2>
<p><strong>Reality:</strong> You need to memorise one good password (your password manager master password) and nothing else. Requiring memorisation of all passwords produces weak, reused passwords.</p>

<h2>Myth 9: Password managers are a single point of failure</h2>
<p><strong>Reality:</strong> A password manager secured with a strong master password and MFA is dramatically more secure than the alternative — weak, reused passwords you can remember. The "single point of failure" concern is real but manageable; the current alternative is worse.</p>

<h2>Myth 10: Breach checking requires giving away your password</h2>
<p><strong>Reality:</strong> PassGeni's <a href="/tools/breach-checker">breach checker</a> uses k-anonymity — only 5 characters of your password's SHA-1 hash go to the Have I Been Pwned API. Your actual password never leaves your browser.</p>
`;