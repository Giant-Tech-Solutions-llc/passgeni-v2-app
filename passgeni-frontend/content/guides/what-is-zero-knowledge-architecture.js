// =============================================================
// PASSGENI — GUIDE CONTENT: what-is-zero-knowledge-architecture
// =============================================================

export const toc = [
  { id: "definition",          title: "What zero-knowledge actually means"     },
  { id: "how-it-works",        title: "How it works technically"              },
  { id: "client-side-gen",     title: "Client-side generation explained"      },
  { id: "verify-it",           title: "How to verify a zero-knowledge claim"  },
  { id: "not-zero-knowledge",  title: "What is NOT zero-knowledge"            },
  { id: "zk-proofs",           title: "Zero-knowledge proofs vs. zero-knowledge architecture" },
  { id: "password-managers",   title: "Zero-knowledge in password managers"   },
  { id: "passgeni-approach",   title: "How PassGeni implements it"            },
];

export const contentHtml = `
<h2 id="definition">What zero-knowledge actually means</h2>
<p>Zero-knowledge, in the context of password and data security, means that the service provider literally cannot access the data you've entrusted to them — not because they choose not to, but because the architecture makes it technically impossible without your encryption key.</p>
<p>This is distinct from "we don't look at your data" (a policy claim) or "we encrypt your data" (which might mean the provider holds the keys). True zero-knowledge means the provider receives only ciphertext — data that is meaningless without a key that only you possess. Even a malicious employee, a court order, or a data breach of the provider's servers cannot expose your data because the provider's infrastructure never had the plaintext.</p>

<h2 id="how-it-works">How it works technically</h2>
<p>The core mechanism in zero-knowledge systems is client-side encryption with keys derived from user-controlled secrets (typically a master password). The process for a zero-knowledge password manager:</p>
<ol>
  <li>You choose a master password that never leaves your device</li>
  <li>The application derives an encryption key from your master password using a key derivation function (PBKDF2, Argon2id, or similar) — a computationally expensive one-way function that makes brute-force attacks slow</li>
  <li>All your data is encrypted using that derived key, entirely on your device, before any data is sent to the provider's servers</li>
  <li>The encrypted ciphertext is synced to the provider's servers — the provider stores data that looks like random noise</li>
  <li>When you access your data on another device, the ciphertext is downloaded and decrypted locally using your master password</li>
  <li>At no point does the provider's server have your master password, your derived encryption key, or the plaintext of your data</li>
</ol>
<p>The security consequence: a breach of the provider's servers exposes only ciphertext. The attacker gets the equivalent of a hard drive full of random bytes. Without your master password, it is computationally infeasible to decrypt.</p>

<h2 id="client-side-gen">Client-side generation explained</h2>
<p>Password generation is a specific and important zero-knowledge context. When you use a password generator, where the random number generation happens matters:</p>
<ul>
  <li><strong>Server-side generation:</strong> You click "generate," the server generates a random password and sends it back. The server has seen the plaintext password before you do. Logged? Possibly. Stored? Maybe. Exposed in a breach? If it was logged or cached, yes.</li>
  <li><strong>Client-side generation:</strong> The random number generation happens entirely in your browser using the Web Cryptography API's <code>crypto.getRandomValues()</code>. The generated password never leaves your device before you copy it. The provider's servers never see it. Not logged. Not transmitted. Not stored.</li>
</ul>
<p>Client-side generation is the stronger architecture for a password generator precisely because the generated credential is the thing you're trying to keep secret. Any system that transmits a generated password over a network — even over HTTPS — creates an exposure window that client-side generation eliminates entirely.</p>

<h2 id="verify-it">How to verify a zero-knowledge claim</h2>
<p>Zero-knowledge is a verifiable technical claim, not just a marketing statement. Ways to verify it:</p>
<ul>
  <li><strong>Open source code:</strong> If the client-side application is open source, the encryption implementation can be audited. If it's closed source, you're trusting the claim.</li>
  <li><strong>Network inspection:</strong> Use your browser's developer tools (Network tab) to inspect what is transmitted when you interact with the application. A genuine zero-knowledge password generator should show no outbound network requests containing your password when you generate or copy.</li>
  <li><strong>Independent security audits:</strong> Reputable zero-knowledge services commission regular third-party cryptographic audits. Look for published audit reports from recognised security firms.</li>
  <li><strong>Open cryptography protocols:</strong> Verify that the application uses well-established cryptographic algorithms (AES-256, ChaCha20, Argon2id) rather than proprietary ones. Proprietary cryptography is a red flag.</li>
</ul>
<p>For PassGeni specifically: all password generation uses <code>crypto.getRandomValues()</code> directly in the browser. You can verify this by opening the browser's developer tools, navigating to the Sources tab, and searching the JavaScript for <code>getRandomValues</code>. The function call is there; no server request is made for the random seed.</p>

<h2 id="not-zero-knowledge">What is NOT zero-knowledge</h2>
<p>Many services use the term "zero-knowledge" loosely or incorrectly. Things that are not zero-knowledge despite sometimes being marketed as such:</p>
<ul>
  <li><strong>"We encrypt your data"</strong> — encryption alone is not zero-knowledge if the provider holds the keys. Encryption where the provider controls the keys is standard data protection, not zero-knowledge.</li>
  <li><strong>"We can't access your password"</strong> — if this is a policy statement rather than a technical architecture, it is not zero-knowledge. Policies change; technical architecture is verifiable.</li>
  <li><strong>Server-side password hashing</strong> — hashing your password before storing it is a standard security practice, but it is not zero-knowledge. The provider still has a record of your authentication credential.</li>
  <li><strong>TLS/HTTPS encryption</strong> — this protects data in transit between your device and the server, but the server receives and can store the plaintext after decryption. HTTPS ≠ zero-knowledge.</li>
</ul>

<h2 id="zk-proofs">Zero-knowledge proofs vs. zero-knowledge architecture</h2>
<p>These are related but distinct concepts that are frequently confused:</p>
<p><strong>Zero-knowledge architecture</strong> (this guide) refers to systems where the provider cannot access plaintext user data due to client-side encryption. It is a product design and architecture pattern.</p>
<p><strong>Zero-knowledge proofs</strong> are a cryptographic primitive that allows one party to prove to another that they know something (a value, a fact) without revealing that something. For example: proving you know the password for an account without transmitting the password — the proof reveals that you know it, not what it is. The HIBP k-anonymity breach checker is a practical example: you prove you know the first five characters of a SHA-1 hash without revealing which hash you're checking.</p>
<p>Both are genuinely zero-knowledge in the cryptographic sense, but they apply at different layers of a system. Password managers use zero-knowledge architecture. Authentication protocols increasingly use zero-knowledge proofs.</p>

<h2 id="password-managers">Zero-knowledge in password managers</h2>
<p>The major zero-knowledge password managers implement this architecture with some variation in the specific cryptographic details:</p>
<ul>
  <li><strong>1Password:</strong> Uses 128-bit Secret Key combined with master password as the basis for encryption. Neither is ever transmitted to 1Password's servers in a form that allows decryption. AES-256-GCM encryption. Independent cryptographic audits by Cure53 and others.</li>
  <li><strong>Bitwarden:</strong> Open-source. Master password never transmitted — only a derived authentication hash. AES-CBC-256 + HMAC SHA-256. Code audited by multiple independent security firms. Can be self-hosted.</li>
  <li><strong>ProtonPass:</strong> From the makers of ProtonMail. Same architecture as ProtonMail's end-to-end encryption. Open source, audited.</li>
</ul>
<p>What all three have in common: if their servers were breached tomorrow, the attacker would get encrypted blobs that require your master password to decrypt. The breach notification you'd receive would be "encrypted data was exposed" — not "your passwords were compromised."</p>

<h2 id="passgeni-approach">How PassGeni implements it</h2>
<p>PassGeni is a zero-knowledge password generator by design. The implementation:</p>
<ul>
  <li>All password generation uses <code>crypto.getRandomValues()</code> — the Web Cryptography API's CSPRNG, seeded by the operating system's entropy pool, running entirely in the browser</li>
  <li>No generated password is transmitted to PassGeni's servers. The generation is local; the server never participates.</li>
  <li>No account required to generate passwords — there is no user profile that could be associated with generated credentials</li>
  <li>The breach checker uses k-anonymity: only the first 5 characters of the SHA-1 hash of the checked password are sent to the HIBP API, which returns matching hashes. The full hash and the plaintext password are never transmitted.</li>
  <li>The secure share feature uses AES-256-GCM encryption in the browser; the decryption key lives in the URL fragment, which is never sent to the server by design (browsers do not include the fragment in HTTP requests)</li>
</ul>
`;
