export const contentHtml = `
<h2>What GDPR actually says about passwords</h2>
<p>GDPR does not specify a minimum password length. It does not mandate two-factor authentication. It does not reference specific encryption algorithms for stored credentials. What it requires, under Article 32, is "appropriate technical and organisational measures" to ensure a level of security "appropriate to the risk."</p>
<p>That vagueness is intentional — the regulation is designed to be technology-neutral and future-proof. But it creates a genuine compliance challenge: how do you demonstrate that your password controls are "appropriate"?</p>

<h2>Article 32: what it requires</h2>
<p>Article 32(1) requires controllers and processors to implement measures including "pseudonymisation and encryption of personal data" and "the ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems."</p>
<p>For authentication systems specifically, this means:</p>
<ul>
  <li>Passwords must be stored as cryptographic hashes, not plaintext or reversible encryption</li>
  <li>The hashing algorithm must be current and appropriate (bcrypt, Argon2, scrypt — not MD5 or SHA-1 alone)</li>
  <li>Password policies must be proportionate to the sensitivity of the data being protected</li>
  <li>Breach detection and response must be in place (Article 33 requires 72-hour breach notification to supervisory authorities)</li>
</ul>

<h2>What "appropriate" means in practice</h2>
<p>The EDPB (European Data Protection Board) and national supervisory authorities have provided guidance that makes the standard more concrete. For most systems handling personal data:</p>
<ul>
  <li>Minimum 8 characters is the floor for low-sensitivity systems; 12+ for systems handling special category data</li>
  <li>Passwords should be checked against known-breached credential lists (NIST 800-63B recommendation)</li>
  <li>Multi-factor authentication is "strongly recommended" for systems processing sensitive personal data — not technically mandatory, but its absence will be scrutinised in a breach investigation</li>
  <li>Account lockout or rate limiting to prevent brute-force attacks</li>
</ul>

<h2>Where UK-GDPR diverges post-Brexit</h2>
<p>UK-GDPR (the post-Brexit version) is substantively identical to EU GDPR for most purposes, including Article 32. The ICO (Information Commissioner's Office) applies the same "appropriate measures" standard. The practical difference: UK organisations report to the ICO, EU organisations report to their local supervisory authority.</p>

<h2>GDPR and the breach notification requirement</h2>
<p>If your organisation suffers a credential breach, GDPR requires notification to your supervisory authority within 72 hours of becoming aware. If the breach is "likely to result in a high risk to the rights and freedoms of individuals," you must also notify affected individuals without undue delay. Having strong password controls (hashing, MFA, breach detection) is relevant context that supervisory authorities will consider when determining whether a fine is appropriate.</p>

<h2>Practical steps for GDPR compliance</h2>
<ul>
  <li>Use PassGeni's <a href="/tools/policy-generator">Password Policy Generator</a> to create a documented policy — having written policy is itself a compliance signal</li>
  <li>Ensure passwords are hashed with bcrypt, Argon2id, or scrypt with an appropriate work factor</li>
  <li>Implement MFA for any system with access to personal data</li>
  <li>Log and monitor authentication attempts for anomaly detection</li>
  <li>Check employee credentials against breach databases periodically</li>
</ul>
`;