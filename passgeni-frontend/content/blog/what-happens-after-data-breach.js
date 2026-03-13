export const contentHtml = `
<h2>The timeline most people don't know</h2>
<p>When a company is breached, the stolen data doesn't immediately appear on dark web markets and trigger account takeovers the next morning. There's a pipeline — discovery, exploitation, monetisation — that plays out over weeks to months. Understanding this timeline helps you prioritise your response.</p>

<h2>Day 0 to Day 30: initial exploitation</h2>
<p>Immediately after a breach, the attacker — or the group that purchased the stolen data — begins credential stuffing against high-value targets: major email providers, banking sites, cryptocurrency exchanges. They're looking for accounts where the same email/password combination opens something valuable. This stage is automated and high volume.</p>
<p>If you had an account at the breached site and used the same password elsewhere, this is when that risk materialises. The breach notification you'll receive from the company may come weeks after this stage is already complete.</p>

<h2>Week 2 to Month 3: dark web sale</h2>
<p>Larger breach datasets are often sold in batches on criminal marketplaces. The price depends on data freshness, completeness (email + password + name + address is worth more), and the target demographic (financial account credentials command premiums). Once sold broadly, the dataset is used by many more actors simultaneously.</p>

<h2>Month 3 to Year 2: ongoing stuffing campaigns</h2>
<p>Old breach data doesn't become worthless — it just becomes cheaper. Datasets from 2018 breaches are still being used in credential stuffing campaigns today because password reuse means old credentials still open current accounts. The useful lifetime of a breached credential is the lifetime of the account that reused it.</p>

<h2>What you should do immediately after a breach notification</h2>
<ol>
  <li>Change the password at the breached site immediately</li>
  <li>Check if you used the same password anywhere else — change it there too</li>
  <li>Use PassGeni's <a href="/tools/breach-checker">Breach Checker</a> to see if your credentials appear in other datasets</li>
  <li>Enable MFA on any account that uses the same email, especially your primary email</li>
  <li>Monitor your email for unusual password reset requests — these indicate credential stuffing against accounts using your email</li>
</ol>

<h2>The breach notification gap</h2>
<p>Companies typically don't know they've been breached the moment it happens. Detection lag — the time between breach occurrence and detection — averages 200+ days in enterprise environments. You're often notified long after exploitation has already begun. Proactive breach monitoring (HIBP, PassGeni's breach checker) is more useful than waiting for notifications.</p>
`;