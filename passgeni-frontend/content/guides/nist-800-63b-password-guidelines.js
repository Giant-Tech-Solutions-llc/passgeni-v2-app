// =============================================================
// PASSGENI — GUIDE CONTENT
// nist-800-63b-password-guidelines
// =============================================================

export const toc = [
  { id: "what-is-nist-800-63b",       title: "What is NIST SP 800-63B?"            },
  { id: "what-changed",               title: "What changed from the old guidance"   },
  { id: "length-over-complexity",     title: "Length over complexity"               },
  { id: "no-mandatory-rotation",      title: "No mandatory password rotation"       },
  { id: "banned-passwords",           title: "Banned password lists"                },
  { id: "mfa-guidance",               title: "MFA and authenticator guidance"       },
  { id: "knowledge-based-auth",       title: "No security questions"                },
  { id: "who-must-comply",            title: "Who must comply"                      },
  { id: "implement-nist",             title: "How to implement NIST 800-63B"        },
];

export const contentHtml = `
<h2 id="what-is-nist-800-63b">What is NIST SP 800-63B?</h2>
<p>NIST Special Publication 800-63B is the United States government's authoritative guidance document on digital authentication. Formally titled "Digital Identity Guidelines: Authentication and Lifecycle Management," it is published by the National Institute of Standards and Technology (NIST) and last substantively updated in 2020.</p>
<p>While SP 800-63B is technically a requirement only for US federal agencies and systems that interact with them, it has become the de facto global standard for password policy. When security auditors, compliance frameworks, and enterprise security teams want to justify a password policy, they cite NIST 800-63B.</p>
<p>The reason it matters: the 2017 update reversed decades of password advice that security professionals had accepted as settled. Understanding what changed — and why — is essential for anyone writing or implementing a password policy.</p>

<h2 id="what-changed">What changed from the old guidance</h2>
<p>Before NIST 800-63B's 2017 update, the standard password policy advice was: require complexity (uppercase, lowercase, numbers, symbols), force rotation every 60–90 days, require security questions as a reset mechanism. These rules came from a 2003 NIST Special Publication written by a single author who later publicly stated he regretted writing them.</p>
<p>The research that accumulated over the following 14 years consistently showed these rules were counterproductive:</p>
<ul>
  <li>Complexity rules cause predictable substitutions: <code>Password1!</code> satisfies all four requirements and is trivially guessable</li>
  <li>Mandatory rotation causes users to choose weaker passwords incrementally: <code>Summer2023!</code> becomes <code>Summer2024!</code></li>
  <li>Security questions are either guessable (mother's maiden name) or memorable in ways that make them weak</li>
  <li>The cognitive burden of managing rotating complex passwords drives password reuse, which is far more dangerous than any of the problems the rules were trying to solve</li>
</ul>
<p>The 2017 update replaced this paradigm entirely. The table below summarises the key reversals:</p>

<table>
  <thead><tr><th>Policy area</th><th>Old guidance (pre-2017)</th><th>NIST 800-63B (current)</th></tr></thead>
  <tbody>
    <tr><td>Minimum length</td><td>8 characters</td><td>8 characters minimum, 64+ characters maximum</td></tr>
    <tr><td>Complexity rules</td><td>Required (uppercase + numbers + symbols)</td><td>Not recommended — counterproductive</td></tr>
    <tr><td>Mandatory rotation</td><td>Every 60–90 days</td><td>Only on evidence of compromise</td></tr>
    <tr><td>Security questions</td><td>Standard practice</td><td>Explicitly prohibited</td></tr>
    <tr><td>Password hints</td><td>Allowed</td><td>Not allowed</td></tr>
    <tr><td>SMS OTP for MFA</td><td>Recommended</td><td>Permitted but not recommended (RESTRICTED)</td></tr>
    <tr><td>Breached password check</td><td>Not mentioned</td><td>Required at creation and reset</td></tr>
  </tbody>
</table>

<h2 id="length-over-complexity">Length over complexity</h2>
<p>The single most important principle in NIST 800-63B is that length is a more reliable predictor of password strength than character diversity. The mathematics support this conclusively.</p>
<p>Consider the search space for two passwords:</p>
<ul>
  <li><strong>8-character password with all 4 character types:</strong> ~96 bits of theoretical maximum entropy, but the complexity rules constrain the actual distribution of characters in ways that significantly reduce real-world entropy. The average user choosing a "complex" password achieves around 30–40 bits of effective entropy.</li>
  <li><strong>16-character lowercase passphrase:</strong> With a pool of 26 characters, the theoretical entropy is 75 bits — and crucially, users are far more likely to choose unpredictably, because long passphrases don't have the same human-pattern traps that short complex passwords do.</li>
</ul>
<p>The practical implications for policy:</p>
<ul>
  <li>Set the minimum to 8 characters (the NIST minimum) — but recommend and encourage longer passwords</li>
  <li>Set the maximum to at least 64 characters — long passphrases must be supported</li>
  <li>Do not restrict which characters can be used — accept all Unicode, spaces, and special characters</li>
  <li>Do not require specific character types — make them optional but show the entropy score</li>
</ul>

<h2 id="no-mandatory-rotation">No mandatory password rotation</h2>
<p>NIST 800-63B Section 5.1.1.2 states clearly: "Verifiers SHOULD NOT require memorized secrets to be changed arbitrarily (e.g., periodically)." This represents one of the most significant reversals in the document.</p>
<p>The reasoning: research consistently found that forced rotation caused users to:</p>
<ol>
  <li>Choose weaker baseline passwords because they knew they'd need to change them soon</li>
  <li>Apply predictable transformations: <code>Spring2024!</code> → <code>Summer2024!</code></li>
  <li>Write passwords down to manage the cognitive load</li>
  <li>Reuse passwords across systems with slight variations</li>
</ol>
<p>NIST's recommended approach: require password changes <em>only</em> when there is evidence that a credential has been compromised. "Evidence" includes:</p>
<ul>
  <li>The credential appearing in a known breach database (check against HIBP)</li>
  <li>Suspicious login activity detected in audit logs</li>
  <li>User reports suspected compromise</li>
  <li>Phishing campaign known to have targeted the organisation</li>
</ul>

<div class="callout warning">
  <strong>Note for regulated industries:</strong> NIST 800-63B is guidance, not law. PCI-DSS, some healthcare regulations, and certain government contracts may still require periodic rotation. Where a specific regulation conflicts with NIST, the regulation takes precedence. Document your rationale either way.
</div>

<h2 id="banned-passwords">Banned password lists</h2>
<p>Section 5.1.1.2 requires that newly chosen passwords be checked against a list of commonly used, expected, or compromised values. This is now standard practice and one of the most impactful controls you can implement.</p>
<p>NIST recommends blocking passwords that appear on:</p>
<ul>
  <li>Known breached credential lists — Have I Been Pwned (HIBP) Passwords API contains over 900 million known-compromised passwords</li>
  <li>Dictionary words — single words or simple variations</li>
  <li>Repetitive or sequential characters: <code>aaaa</code>, <code>1234</code>, <code>abcd</code></li>
  <li>Context-specific words: the service name, username, organisation name</li>
</ul>
<p>The HIBP k-anonymity API allows you to check passwords against the breach database without sending the password to any external server — only the first 5 characters of the SHA-1 hash are transmitted. This is the implementation PassGeni's breach checker uses.</p>

<h2 id="mfa-guidance">MFA and authenticator guidance</h2>
<p>NIST 800-63B defines three assurance levels (AAL1, AAL2, AAL3) and specifies which authenticator types meet each level. For most enterprise applications, AAL2 is the appropriate target.</p>
<table>
  <thead><tr><th>Authenticator type</th><th>AAL level</th><th>NIST recommendation</th></tr></thead>
  <tbody>
    <tr><td>Password only</td><td>AAL1</td><td>Acceptable for low-risk only</td></tr>
    <tr><td>SMS / voice OTP</td><td>AAL1 (RESTRICTED)</td><td>Permitted but not recommended — SIM swap risk</td></tr>
    <tr><td>Email OTP / magic link</td><td>AAL1</td><td>Permitted but weak for high-risk access</td></tr>
    <tr><td>TOTP authenticator app (Google Auth, Authy)</td><td>AAL2</td><td>Recommended</td></tr>
    <tr><td>FIDO2 / WebAuthn hardware key</td><td>AAL3</td><td>Highest assurance — phishing-resistant</td></tr>
    <tr><td>Push notification (Duo, Microsoft Authenticator)</td><td>AAL2</td><td>Recommended — watch for push fatigue attacks</td></tr>
  </tbody>
</table>
<p>SMS OTP being marked RESTRICTED is significant. NIST doesn't prohibit it, but organisations at AAL2 should migrate away from SMS toward authenticator apps or hardware tokens, particularly for high-privilege access.</p>

<h2 id="knowledge-based-auth">No security questions</h2>
<p>NIST 800-63B explicitly prohibits knowledge-based authentication (KBA) — security questions — as a standalone authentication mechanism. The document is unambiguous: "Verifiers SHALL NOT use KBA for authentication."</p>
<p>The reasons are well-documented:</p>
<ul>
  <li>Answers to common security questions (mother's maiden name, first pet, high school) are often publicly available through social media</li>
  <li>Users choose predictable answers or lie in consistent ways (favourite colour: always "blue")</li>
  <li>KBA provides false confidence — it appears to add security while the actual entropy is often lower than a 4-digit PIN</li>
</ul>
<p>If you are currently using security questions for account recovery, replace them with: email-based magic link recovery, SMS or authenticator OTP verification, or out-of-band identity verification for high-assurance systems.</p>

<h2 id="who-must-comply">Who must comply</h2>
<p>NIST 800-63B is formally mandatory for US federal agencies and systems that interact with federal identity management. Beyond that, compliance is voluntary — but practically unavoidable:</p>
<ul>
  <li><strong>SOC 2:</strong> Auditors commonly use NIST 800-63B as the reference for evaluating password controls under CC6.1</li>
  <li><strong>FedRAMP:</strong> Cloud service providers seeking FedRAMP authorisation must comply</li>
  <li><strong>HIPAA:</strong> HHS guidance references NIST standards as the implementation benchmark</li>
  <li><strong>CISA guidance:</strong> All critical infrastructure sectors are guided toward NIST standards</li>
  <li><strong>Cyber insurance:</strong> Many underwriters now require NIST-aligned controls as a policy condition</li>
</ul>

<h2 id="implement-nist">How to implement NIST 800-63B</h2>
<p>A practical implementation checklist for aligning your password policy with NIST 800-63B:</p>
<ol>
  <li>Set minimum password length to 8 characters — recommend 15+ characters in UX copy</li>
  <li>Set maximum length to at least 64 characters — do not truncate passphrases</li>
  <li>Accept all printable ASCII and Unicode characters including spaces</li>
  <li>Remove mandatory complexity requirements — make character type badges visual but not enforced</li>
  <li>Implement HIBP breach check at password creation and reset (k-anonymity API — no password transmitted)</li>
  <li>Block obvious bad passwords: dictionary words, sequential characters, username, service name</li>
  <li>Remove forced periodic rotation — change only on evidence of compromise</li>
  <li>Remove security questions — replace with email or OTP account recovery</li>
  <li>Implement account lockout after 10 failed attempts with exponential backoff</li>
  <li>Require MFA for all high-value access (admin accounts, systems with sensitive data)</li>
  <li>Document everything: policy, rationale, deviations, review schedule</li>
</ol>

<div class="callout">
  PassGeni's password generator follows NIST 800-63B guidance: no complexity enforcement by default, length-first approach, and entropy scoring that reflects real-world strength rather than checkbox compliance.
</div>
`;
