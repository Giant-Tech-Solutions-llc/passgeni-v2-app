export const contentHtml = `
<h2>The fundamental difference between LLM output and cryptographic randomness</h2>
<p>When you ask ChatGPT to "generate a random password," it produces a string that <em>looks</em> random. But the randomness properties of that string are completely different from what a cryptographic random number generator produces.</p>
<p>LLMs are trained to produce outputs that look statistically typical for their training data. A "random" string from an LLM isn't truly random — it's the output of a deterministic mathematical function applied to a combination of model weights and your prompt. Two people asking the same prompt with similar context could get identical or near-identical outputs. More importantly, the output space of an LLM is constrained by what "random passwords" look like in its training data.</p>

<h2>Why this matters for security</h2>
<p>The security of a password depends on how many possibilities an attacker must try. True cryptographic randomness (like <code>crypto.getRandomValues()</code> used by PassGeni) draws from a uniform distribution across all possible character combinations. If you have a 20-character password from a 95-character set, there are 95^20 possible passwords. An attacker must search that entire space.</p>
<p>An LLM-generated "random" password doesn't have this property. The effective search space is whatever distribution of "password-looking strings" the model was trained on — which is a much smaller set. If attackers trained a model against common LLM password generation patterns (and some have), the effective entropy of your LLM password could be dramatically lower than it appears.</p>

<h2>What LLMs are actually good for in password security</h2>
<p>LLMs are genuinely useful for:</p>
<ul>
  <li>Generating passphrase <em>word lists</em> for specific domains (though the words still need to be randomly selected from the list, not chosen by the LLM)</li>
  <li>Explaining password policies in plain language</li>
  <li>Writing password policy documentation</li>
  <li>Answering questions about password security best practices</li>
</ul>
<p>They are not appropriate for: generating passwords or passphrases you intend to use for actual account security.</p>

<h2>What to use instead</h2>
<p>For cryptographically secure password generation, you want a tool that explicitly uses <code>crypto.getRandomValues()</code> (in browsers) or equivalent OS-level CSPRNG (Cryptographically Secure Pseudo-Random Number Generator). PassGeni uses <code>crypto.getRandomValues()</code> exclusively — you can verify this by inspecting the network tab while generating (nothing is sent to a server) and reading the source code.</p>
<p>The strength checker's entropy calculation assumes cryptographic randomness. If your password came from an LLM, the displayed entropy figure is an overestimate of actual security.</p>
<p>Generate your passwords with PassGeni's <a href="/#generator">generator</a>. Use an LLM for everything else.</p>
`;