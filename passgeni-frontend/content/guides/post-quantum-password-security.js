// =============================================================
// PASSGENI — GUIDE CONTENT: post-quantum-password-security
// =============================================================

export const toc = [
  { id: "quantum-threat",       title: "The quantum computing threat"           },
  { id: "harvest-now",          title: "Harvest now, decrypt later"             },
  { id: "password-specifically","title": "How quantum affects passwords specifically" },
  { id: "nist-pqc",             title: "NIST post-quantum standards (2024)"     },
  { id: "what-to-do-now",       title: "What to do about it today"             },
  { id: "quantum-safe-length",  title: "What makes a password quantum-safe"    },
  { id: "timeline",             title: "Timeline for real-world risk"           },
  { id: "grover-algorithm",     title: "Grover's algorithm explained"           },
];

export const contentHtml = `
<h2 id="quantum-threat">The quantum computing threat</h2>
<p>Quantum computers do not yet threaten passwords in any practical sense. As of 2025, the largest quantum computers — IBM's Heron processors, Google's Willow chip — have hundreds to thousands of physical qubits, but the "cryptographically relevant" quantum computer that could break current encryption standards requires millions of error-corrected logical qubits. We are likely a decade or more away from that capability.</p>
<p>So why does post-quantum password security matter now? Two reasons: the harvest now, decrypt later attack model, and the preparation window for long-lived secrets and infrastructure.</p>

<h2 id="harvest-now">Harvest now, decrypt later</h2>
<p>Nation-state adversaries and well-resourced attackers are actively collecting encrypted data today with the intention of decrypting it when quantum computers become capable. This is the "harvest now, decrypt later" (HNDL) threat model.</p>
<p>For passwords specifically, the HNDL model is less concerning than it is for asymmetric encryption (TLS traffic, encrypted emails) because: passwords are typically salted and hashed rather than encrypted, and the attacker needs to crack an individual hash, not decrypt a ciphertext stream. However, there are specific password-adjacent scenarios where HNDL matters:</p>
<ul>
  <li>Encrypted backup files containing password stores (LastPass-style vaults)</li>
  <li>Encrypted archives containing sensitive documents that remain valuable long-term</li>
  <li>Long-lived API keys and secrets used for systems with 10+ year operational horizons</li>
  <li>SSH private keys stored in encrypted form and transmitted or stored in third-party systems</li>
</ul>

<h2 id="password-specifically">How quantum affects passwords specifically</h2>
<p>The quantum threat to passwords comes primarily from Grover's algorithm — a quantum search algorithm that provides a quadratic speedup in searching unsorted data. The security implications:</p>
<p><strong>For a password stored as a hash:</strong> A classical computer requires O(N) operations to brute-force an N-element search space. Grover's algorithm reduces this to O(√N) — the square root. This means a quantum computer effectively halves the bit-security of a hash function. A hash that provides 256 bits of classical security provides only 128 bits of quantum security.</p>
<p>For password hashing specifically, this means:</p>
<ul>
  <li>A password with 80 bits of classical entropy has only 40 bits of quantum security</li>
  <li>A password with 128 bits of classical entropy has 64 bits of quantum security — still very strong, but the margin is thinner</li>
  <li>The passwords most at risk are those in the 40–80 bit range that are considered "adequate" today — they drop to the 20–40 bit range under quantum attack</li>
</ul>
<p>Importantly, slow hashing algorithms (bcrypt, Argon2id, scrypt) retain their advantage against quantum attackers because Grover's algorithm does not eliminate the cost of hashing — it only reduces the number of hash computations needed. A Grover-based attack on bcrypt-hashed passwords is slower than a Grover-based attack on MD5-hashed passwords by the same factor as classically.</p>

<h2 id="nist-pqc">NIST post-quantum standards (2024)</h2>
<p>In August 2024, NIST published its first three post-quantum cryptography (PQC) standards:</p>
<ul>
  <li><strong>FIPS 203 (ML-KEM, formerly CRYSTALS-Kyber):</strong> Key encapsulation mechanism — replaces RSA and ECC for key exchange. This is the most deployment-critical standard for TLS and encrypted communications.</li>
  <li><strong>FIPS 204 (ML-DSA, formerly CRYSTALS-Dilithium):</strong> Digital signature algorithm — replaces RSA and ECDSA for signatures. Relevant for code signing, certificate authorities, and authentication protocols.</li>
  <li><strong>FIPS 205 (SLH-DSA, formerly SPHINCS+):</strong> Hash-based signature scheme — an alternative signature algorithm for contexts requiring conservative assumptions.</li>
</ul>
<p>For passwords themselves, NIST's guidance is simpler: increase the minimum entropy target. NIST SP 800-131A (Transitioning the Use of Cryptographic Algorithms and Key Lengths) recommends moving toward 128-bit security for long-lived secrets. For passwords, this means targeting 128+ bits of entropy.</p>

<h2 id="what-to-do-now">What to do about it today</h2>
<p>The practical actions for password security in a post-quantum preparation context:</p>
<ol>
  <li><strong>Increase length on long-lived secrets:</strong> API keys, service account credentials, and secrets with multi-year operational horizons should use 20+ character randomly generated passwords, providing 128+ bits of entropy. The cost of switching to longer credentials is minimal; the benefit accrues over the lifetime of the secret.</li>
  <li><strong>Use Argon2id for new password storage implementations:</strong> If you're implementing a password storage system, use Argon2id rather than bcrypt or scrypt. Argon2id's memory-hard design provides additional resistance beyond bcrypt against both classical and quantum cracking attempts.</li>
  <li><strong>Audit long-lived encrypted archives:</strong> Identify any encrypted archives or backup files containing sensitive data that will remain valuable in 10+ years. Consider re-encrypting with AES-256 (256-bit key, 128-bit quantum security) rather than AES-128.</li>
  <li><strong>Monitor NIST PQC adoption timelines:</strong> TLS and authentication protocol libraries are actively adding PQC support. Follow the OpenSSL and browser TLS roadmaps — the infrastructure-level changes will happen without requiring action from most users.</li>
</ol>

<h2 id="quantum-safe-length">What makes a password quantum-safe</h2>
<p>Given Grover's algorithm halving effective entropy, a post-quantum safe password is one that provides at least 128 bits of entropy after the quantum reduction — meaning it needs 256 bits of classical entropy to be quantum-safe in theory, or more practically, 128 bits of classical entropy to provide 64 bits of quantum security that remains computationally infeasible.</p>
<p>The practical target for 128-bit classical entropy (64-bit quantum security — very strong):</p>

<div class="req-row"><span class="req-label">Random password, full ASCII (94 chars)</span><span class="req-value">≥ 20 characters = 131 bits classical</span></div>
<div class="req-row"><span class="req-label">Random password, alphanumeric (62 chars)</span><span class="req-value">≥ 22 characters = 131 bits classical</span></div>
<div class="req-row"><span class="req-label">Diceware passphrase (EFF list, 7776 words)</span><span class="req-value">≥ 10 words = 129 bits classical</span></div>
<div class="req-row"><span class="req-label">Quantum-safe minimum (NIST recommendation)</span><span class="req-value">128 bits classical entropy</span></div>

<p>PassGeni's post-quantum mode generates 20-character minimum passwords with the full ASCII printable character set, producing approximately 131 bits of classical entropy — 65 bits of quantum security. This is the current NIST-recommended minimum for long-lived secrets in a post-quantum threat model.</p>

<h2 id="timeline">Timeline for real-world risk</h2>
<p>The honest assessment of when quantum computers become a practical threat to passwords:</p>
<ul>
  <li><strong>Now (2025):</strong> No practical quantum threat to passwords. Current quantum computers are too small and too error-prone to threaten any real-world cryptographic system.</li>
  <li><strong>2026–2030:</strong> Continued progress on quantum error correction. Quantum computers will solve increasingly complex optimisation problems but are unlikely to threaten standard cryptography during this window.</li>
  <li><strong>2030–2035:</strong> The period where researchers project the first cryptographically relevant quantum computers might emerge — systems capable of breaking RSA-2048 using Shor's algorithm. Password hashing (a symmetric operation vulnerable only to Grover's) is more resistant than asymmetric encryption during this window.</li>
  <li><strong>2035+:</strong> If large-scale fault-tolerant quantum computers exist, passwords with 128+ bits of entropy remain computationally infeasible to brute-force even against quantum attacks. Passwords in the 56–80 bit range become more vulnerable.</li>
</ul>
<p>The takeaway: the immediate risk is near zero. The preparation window is now, and the cost of preparation (using longer passwords) is essentially zero. PassGeni's post-quantum mode applies the appropriate increase in length without any additional complexity.</p>

<h2 id="grover-algorithm">Grover's algorithm explained</h2>
<p>For those who want the technical intuition: Grover's algorithm is a quantum search algorithm that can find a target item in an unsorted list of N items in O(√N) operations, compared to O(N) for a classical computer.</p>
<p>Applied to password cracking: if a password has N possible values (determined by length and character set), a classical computer needs on average N/2 guesses to find it by brute force. Grover's algorithm needs approximately √N guesses — the square root. This is why bit security halves: if N = 2<sup>k</sup>, then √N = 2<sup>k/2</sup>, which is k/2 bits.</p>
<p>Grover's advantage is real but bounded. Unlike Shor's algorithm (which breaks RSA exponentially, making it practically impossible to compensate with longer keys), Grover's quadratic speedup can be compensated for by doubling the key length. For passwords, this means targeting twice the bits of entropy you'd want against a classical attacker. 128 bits classically → 64 bits quantumly, still computationally infeasible for any foreseeable quantum hardware.</p>
`;
