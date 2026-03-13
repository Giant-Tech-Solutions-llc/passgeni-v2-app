export const contentHtml = `
<h2>SMS 2FA is better than nothing — but not by much</h2>
<p>Enabling SMS two-factor authentication is still a net positive. It stops automated credential stuffing attacks that don't bother with real-time interception. But it provides false confidence about the security of accounts that are actually high-value targets.</p>
<p>Here's what SMS 2FA doesn't protect against: SIM swapping, SS7 network attacks, real-time phishing proxies, and carrier social engineering. These aren't theoretical attacks — they're being used against bank accounts, crypto wallets, and email addresses daily.</p>

<h2>SIM swapping: the most common SMS 2FA bypass</h2>
<p>A SIM swap attack is simple in concept: an attacker calls your mobile carrier, pretends to be you, and convinces the support agent to transfer your number to a SIM card they control. From that point, they receive all your SMS messages — including 2FA codes.</p>
<p>The information needed to pull off a SIM swap is often available from data breaches: your name, address, last 4 digits of Social Security number, account PIN. These appear in the same breach databases that expose your passwords. An attacker who has your password and your personal data from a breach can often also SIM swap your number.</p>
<p>Carriers have tried to add security — account PINs, "SIM lock" features — but social engineering attacks on support agents have a higher success rate than technical security measures. The problem is fundamentally a human one.</p>

<h2>SS7 attacks: the protocol-level vulnerability</h2>
<p>SS7 (Signalling System 7) is the protocol that mobile networks use to communicate with each other globally. It was designed in 1975 with no authentication — any actor with network access can send SS7 messages claiming to be any carrier. This allows interception of SMS and calls without the target's knowledge.</p>
<p>SS7 attacks require more technical sophistication than SIM swapping, but they're available as a commercial service in criminal markets. For high-value targets — executives, crypto holders, high-net-worth individuals — they're a real risk.</p>

<h2>Real-time phishing proxies</h2>
<p>Evilginx2, Modlishka, and similar tools act as transparent proxies between a victim and a legitimate website. The victim logs in through the proxy (which shows an identical phishing page), the proxy forwards credentials and 2FA codes to the real site in real time, and captures session cookies that bypass 2FA entirely. SMS 2FA provides no protection against this attack. Neither does TOTP. Only FIDO2 hardware keys provide protection here, because the cryptographic response is tied to the origin domain.</p>

<h2>What to use instead</h2>
<p>In order of security:</p>
<ul>
  <li><strong>FIDO2 hardware keys (YubiKey, Google Titan):</strong> Phishing-resistant by design. The cryptographic response is domain-bound — a phishing site cannot reuse it. Best security, requires setup effort.</li>
  <li><strong>TOTP authenticator apps (Authy, Google Authenticator):</strong> Not phishing-resistant, but immune to SIM swapping and SS7 attacks. Use for accounts where hardware keys aren't supported.</li>
  <li><strong>Push notifications (Duo, Microsoft Authenticator):</strong> Convenient, immune to SIM swapping. Vulnerable to MFA fatigue attacks (spamming approval prompts until the user approves one accidentally).</li>
  <li><strong>SMS 2FA:</strong> Only if no other option is available. Still better than nothing for automated attacks.</li>
</ul>
<p>For your most important accounts — email, banking, password manager — switch to TOTP minimum, hardware key ideally. The setup takes 10 minutes and significantly raises the cost of any targeted attack against you.</p>
`;