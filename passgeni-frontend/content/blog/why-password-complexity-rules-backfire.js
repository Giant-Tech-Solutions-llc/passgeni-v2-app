// =============================================================
// PASSGENI — BLOG POST CONTENT
// why-password-complexity-rules-backfire
// =============================================================

export const contentHtml = `
<h2>The rule that teaches the wrong lesson</h2>
<p>When you tell someone their password must contain an uppercase letter, a number, and a special character, you are not improving their security. You are teaching them a formula: take a word, capitalise the first letter, append a number, add a symbol at the end.</p>
<p>The result is a massive percentage of passwords that look like this: <code>Password1!</code>, <code>Summer2024!</code>, <code>Welcome123!</code>. These satisfy all four complexity requirements. They are all in every serious cracking dictionary. They crack in seconds.</p>
<p>The failure mode of complexity rules is not that users are careless — it is that the rules are legible. When you tell someone the exact requirements a password must meet, you tell attackers exactly what patterns to target.</p>

<h2>What the research actually shows</h2>
<p>The empirical case against mandatory complexity rules comes from multiple independent lines of research. The most influential:</p>
<p><strong>The Komanduri et al. study (Carnegie Mellon, 2011)</strong> analysed 12,000 passwords collected under different policy regimes. Passwords created under "basic complexity" policies — the uppercase/lowercase/number/symbol requirement — had lower entropy than passwords created under "length-only" policies requiring 16+ characters. The complexity-required passwords clustered on predictable patterns. The long passwords were more varied.</p>
<p><strong>The Microsoft Research study (2010)</strong> found that frequent password rotation — a natural companion to complexity requirements — caused users to make minimal, predictable changes. <code>Spring2023!</code> becomes <code>Summer2023!</code> becomes <code>Fall2023!</code>. The password is technically new. The cracking resistance is essentially unchanged.</p>
<p><strong>NIST's 2017 reversal</strong> formalised what security researchers had been saying for years. SP 800-63B, the authoritative US government guidance on digital authentication, explicitly removed mandatory complexity requirements from its recommendations. The document is blunt: "composition rules... often make it harder for people to choose strong passwords." NIST recommends checking passwords against breached credential lists instead.</p>

<h2>The substitution problem</h2>
<p>Complexity requirements create a predictable substitution pattern that attackers exploit directly. Modern cracking tools — hashcat, John the Ripper — ship with rule sets specifically designed to apply common complexity-satisfying transforms to dictionary words:</p>
<ul>
  <li>Capitalise the first letter: <code>password</code> → <code>Password</code></li>
  <li>Replace 'a' with '@': <code>Password</code> → <code>P@ssword</code></li>
  <li>Replace 'o' with '0': <code>P@ssword</code> → <code>P@ssw0rd</code></li>
  <li>Append a common suffix: <code>P@ssw0rd</code> → <code>P@ssw0rd1!</code></li>
</ul>
<p>These four rules, applied in sequence to a dictionary of 10,000 common words, generate most of what users produce under standard complexity policies. The entire search space that looks "complex" is actually a few hundred thousand candidates, not the billions that true entropy would imply.</p>

<h2>What actually improves security</h2>
<p>The research consensus on effective controls:</p>
<ul>
  <li><strong>Length requirements:</strong> Minimum 12–15 characters significantly increases the brute-force search space. Longer passwords are better even without complexity requirements, because length adds entropy multiplicatively.</li>
  <li><strong>Breached credential checks:</strong> Checking new passwords against known-compromised lists (the HIBP API contains 900+ million entries) directly prevents the reuse of known-bad credentials. This catches more real-world attacks than complexity requirements do.</li>
  <li><strong>No mandatory rotation:</strong> Forcing rotation leads to predictable patterns. Change passwords on evidence of compromise, not on a calendar schedule.</li>
  <li><strong>Password managers:</strong> The root problem is that humans are bad at generating random-looking strings. Password managers solve this by generating and storing truly random credentials. Organisations that actively support password manager use see better credential hygiene than organisations that mandate complexity.</li>
  <li><strong>MFA:</strong> A phished or breached password is useless to an attacker if a second factor is required. MFA reduces the practical impact of weak passwords more than any policy change to password composition.</li>
</ul>

<h2>Why organisations keep the old rules</h2>
<p>If the research is this clear, why do most organisations still enforce complexity requirements?</p>
<p>Three reasons: compliance theatre, audit expectations, and institutional inertia.</p>
<p>Many compliance frameworks — particularly older versions and healthcare-specific regulations — were written when complexity requirements were considered best practice. Auditors trained on those frameworks look for complexity rules and mark their absence as a finding, even if the control is demonstrably ineffective. Organisations that want to remove complexity requirements often face resistance from QSAs or internal compliance teams who interpret the absence of a checkbox as a deficiency.</p>
<p>The practical path forward: implement the effective controls (length, breach checking, MFA), and document explicitly why you've moved away from complexity requirements — citing NIST SP 800-63B as the authoritative reference. "We removed mandatory complexity in favour of a 15-character minimum and HIBP breach checking, consistent with NIST 800-63B Section 5.1.1.2" is a defensible audit position.</p>

<h2>The takeaway</h2>
<p>Complexity requirements are not harmless. They actively degrade security by producing predictable patterns while creating the appearance of rigor. The security community has known this for over a decade. The right controls are length, randomness (ideally via a password generator), breach checking, and MFA.</p>
<p>The best password policy is one that maximises the probability users choose truly unpredictable credentials — which means minimising the cognitive burden of following the policy and providing tools that do the hard work of randomness for them.</p>
`;
