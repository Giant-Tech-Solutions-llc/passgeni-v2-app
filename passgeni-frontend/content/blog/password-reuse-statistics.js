export const contentHtml = `
<h2>The numbers are worse than you think</h2>
<p>The statistics on password reuse have remained stubbornly consistent across years of research: approximately 65% of people reuse the same password across multiple sites. Around 45% reuse the exact same password on all their accounts. Despite a decade of "don't reuse passwords" messaging, the behaviour hasn't meaningfully changed.</p>
<p>This isn't a knowledge problem. Most people know password reuse is bad. It's a cognitive load problem — managing unique credentials for dozens of accounts is genuinely hard without tools designed for it.</p>

<h2>What credential stuffing data tells us</h2>
<p>When a major breach is published — a database of 100 million email/password pairs from a gaming site — security researchers and threat intelligence firms track what attackers do with it. The pattern is consistent:</p>
<ul>
  <li>Within hours, automated credential stuffing begins against major email providers, banking sites, and e-commerce platforms</li>
  <li>Success rates on high-value targets (financial accounts) typically range from 0.1% to 2%</li>
  <li>On a 100 million credential set, a 0.5% success rate means 500,000 account takeovers</li>
  <li>Attackers specifically target accounts where the stakes are high — banking, email (used for password reset), crypto exchanges</li>
</ul>

<h2>Why the behaviour hasn't changed</h2>
<p>Research from Carnegie Mellon and other institutions has identified why people continue reusing passwords despite knowing the risk:</p>
<ul>
  <li><strong>Perceived low risk:</strong> "My Netflix password being leaked doesn't matter" — without understanding that credential stuffing tries every site</li>
  <li><strong>Password manager friction:</strong> Setup feels complicated; people underestimate how much easier it makes things once configured</li>
  <li><strong>Account complexity:</strong> The average person has 100+ online accounts. Managing unique credentials feels impossible without a tool</li>
  <li><strong>Reset safety net:</strong> "I can always reset it" — underestimating how many accounts use the same email that could also be compromised</li>
</ul>

<h2>What interventions actually work</h2>
<p>Research on behaviour change in password security points to two consistently effective interventions:</p>
<ul>
  <li><strong>Password managers with autofill:</strong> The friction of using unique passwords drops to near zero when a manager fills them automatically. Adoption of unique passwords correlates strongly with password manager use.</li>
  <li><strong>Breach notifications with forced resets:</strong> Firefox Monitor and Google's Password Checkup have shown that proactive breach notifications with a one-click "change password" flow achieve significantly higher remediation rates than passive advice.</li>
</ul>
<p>What doesn't work: repeated reminders, awareness campaigns alone, or complexity requirements (which cause users to make minimal variations: <code>Password1</code> → <code>Password2</code>).</p>
<p>Start by checking your own credentials with PassGeni's <a href="/tools/breach-checker">Breach Checker</a> — it's the fastest way to see exactly what's been exposed.</p>
`;