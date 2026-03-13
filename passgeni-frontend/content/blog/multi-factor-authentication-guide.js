export const contentHtml = `
<h2>What MFA actually protects against</h2>
<p>Microsoft's security team analysed account takeover data and found that enabling multi-factor authentication blocks 99.9% of automated account attacks. That number needs context: it means attacks that use credential stuffing (stolen passwords tried automatically), brute force, and password spray. It doesn't protect against targeted attacks that intercept your second factor in real time — but it eliminates the vast majority of attacks that are actually happening at scale.</p>

<h2>The MFA options, ranked by security</h2>
<ul>
  <li><strong>FIDO2 hardware keys (YubiKey, Google Titan):</strong> Phishing-resistant. The gold standard. See our <a href="/blog/hardware-security-keys-explained">hardware keys guide</a> for details.</li>
  <li><strong>Passkey (device-bound FIDO2):</strong> Increasingly supported. Tied to your device's secure enclave. Phishing-resistant. Requires iOS 16+, Android 9+, or Windows Hello.</li>
  <li><strong>TOTP authenticator apps (Authy, Google Authenticator, Bitwarden Authenticator):</strong> 6-digit codes that rotate every 30 seconds. Immune to SIM swapping. Vulnerable to real-time phishing but blocks automated attacks.</li>
  <li><strong>Push notifications (Duo, Microsoft Authenticator):</strong> Convenient. Vulnerable to MFA fatigue — attackers spam approval requests hoping you'll accidentally tap accept. Enable "number matching" if available.</li>
  <li><strong>SMS/voice codes:</strong> Better than nothing. Vulnerable to SIM swapping and SS7 attacks. Use only when no better option is available.</li>
</ul>

<h2>Step-by-step: setting up TOTP on your most important accounts</h2>
<ol>
  <li>Download Authy or Google Authenticator on your phone</li>
  <li>Go to your account's security settings — look for "Two-factor authentication" or "2-step verification"</li>
  <li>Choose "Authenticator app" (not SMS)</li>
  <li>Scan the QR code with your authenticator app</li>
  <li>Enter the 6-digit code to confirm setup</li>
  <li>Save your backup codes in a secure location (printed copy in a safe, or in your password manager under a separate entry)</li>
</ol>

<h2>Which accounts to prioritise</h2>
<p>In this order:</p>
<ul>
  <li><strong>Your primary email</strong> — it's the recovery method for everything else. If this falls, everything falls.</li>
  <li><strong>Your password manager</strong> — this is the keys to the kingdom</li>
  <li><strong>Banking and investment accounts</strong></li>
  <li><strong>Work accounts with admin privileges</strong></li>
  <li><strong>Social media accounts used for "Login with..." flows</strong> (Google, Apple, Facebook)</li>
  <li><strong>Cloud storage</strong> (Google Drive, iCloud, Dropbox)</li>
</ul>

<h2>Recovery codes: don't skip this step</h2>
<p>Every MFA setup generates recovery codes. These are single-use backup codes that let you access your account if you lose your phone or hardware key. Print them and store them physically, or keep them in your password manager in a separate entry. Not having recovery codes when you need them means permanent account lockout with no recovery path.</p>
`;