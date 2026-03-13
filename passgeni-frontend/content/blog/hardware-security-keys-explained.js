export const contentHtml = `
<h2>Why hardware security keys are the gold standard</h2>
<p>A hardware security key makes phishing technically impossible for the accounts it protects. That's not marketing language — it's a cryptographic guarantee built into how the FIDO2 protocol works. When you register a YubiKey with a website, the key generates a unique cryptographic key pair for that site. The private key never leaves the hardware. Critically, the authentication response is cryptographically bound to the origin domain — a phishing site at evil-google.com cannot collect and replay a response intended for google.com. The math simply doesn't work.</p>
<p>Compare this to SMS 2FA, TOTP apps, or even push notifications — all of which can be intercepted in real time by a proxy phishing attack. Hardware keys cannot.</p>

<h2>FIDO2 and WebAuthn: how it works</h2>
<p>FIDO2 is the authentication standard. WebAuthn is the browser API that implements it. When you authenticate with a hardware key:</p>
<ol>
  <li>The site sends a challenge (a random nonce)</li>
  <li>The key signs the challenge along with the site's origin using the private key stored in hardware</li>
  <li>The site verifies the signature using the public key registered at enrollment</li>
  <li>Access is granted — no password was transmitted at any point</li>
</ol>
<p>Phishing fails because step 2 includes the origin. A response signed for google.com will fail verification on evil-google.com — and vice versa.</p>

<h2>YubiKey vs Google Titan: a practical comparison</h2>
<p><strong>YubiKey 5 Series:</strong> The benchmark. Available in USB-A, USB-C, NFC variants. Supports FIDO2, U2F, TOTP (via Yubico Authenticator app), PIV, OpenPGP. Most compatible with services that support hardware keys. $50–$70 depending on model. Recommended for most users.</p>
<p><strong>Google Titan:</strong> FIDO2 and U2F support, USB-C and NFC. Simpler than YubiKey — no TOTP or advanced protocols. $30. Good value if you only need basic FIDO2 and primarily use Google accounts.</p>
<p><strong>Yubico Security Key:</strong> Budget version of YubiKey, FIDO2 only. $25. No TOTP, no PIV. Good for users who only need phishing-resistant MFA and nothing else.</p>

<h2>Which accounts to protect with hardware keys</h2>
<p>Priority order:</p>
<ul>
  <li>Your primary email (recovery for everything else)</li>
  <li>Your password manager (1Password, Bitwarden)</li>
  <li>Banking and investment accounts that support it</li>
  <li>Work accounts with privileged access</li>
  <li>Crypto exchange accounts</li>
</ul>
<p>Always register two keys — keep one as a backup. Losing your only hardware key and not having backup codes is a serious recovery problem.</p>

<h2>When hardware keys and passwords still interact</h2>
<p>Hardware keys don't eliminate passwords — they add a second factor. The password still needs to be strong: a hardware key protecting a weak password still leaves you exposed to server-side breaches (if the site stores passwords incorrectly). Generate strong passwords with PassGeni and store them in a password manager, then protect the manager itself with a hardware key.</p>
`;