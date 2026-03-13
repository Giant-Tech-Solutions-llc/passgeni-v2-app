// =============================================================
// PASSGENI — GUIDE CONTENT: password-security-for-healthcare-workers
// =============================================================

export const toc = [
  { id: "clinical-reality",    title: "The clinical reality of passwords"       },
  { id: "hipaa-obligations",   title: "Your HIPAA obligations"                  },
  { id: "shared-workstations", title: "Shared workstations and fast-user switch" },
  { id: "ehr-access",          title: "EHR/EMR best practices"                   },
  { id: "mobile-devices",      title: "Mobile devices and tablets"              },
  { id: "password-manager",    title: "Using a password manager in healthcare"  },
  { id: "mfa-in-clinical",     title: "MFA in clinical settings"                },
  { id: "personal-vs-work",    title: "Personal vs. work credentials"           },
  { id: "quick-reference",     title: "Quick reference card"                    },
];

export const contentHtml = `
<h2 id="clinical-reality">The clinical reality of passwords</h2>
<p>Healthcare workers manage more credentials than almost any other profession — EHR systems, PACS imaging, lab portals, scheduling software, email, device lock screens, and increasingly, telehealth platforms. The security posture of most healthcare environments adds further friction: mandatory complex passwords, forced rotation every 90 days, no password reuse across 12 cycles.</p>
<p>The predictable result: sticky notes on monitors, passwords written in phone notes, identical passwords reused everywhere with a changing number suffix. Healthcare consistently ranks among the top industries for credential-based breaches — not because clinicians are careless, but because the security requirements conflict directly with the speed and workflow demands of patient care.</p>
<p>This guide covers approaches that are actually usable in a clinical environment while maintaining HIPAA compliance.</p>

<h2 id="hipaa-obligations">Your HIPAA obligations</h2>
<p>As a healthcare worker with access to ePHI (electronic Protected Health Information), you have specific HIPAA obligations regarding authentication:</p>
<ul>
  <li><strong>Unique user identification (§164.312(a)(2)(i)):</strong> You must have your own credentials — shared logins are a HIPAA violation. Even if it's inconvenient to wait for IT to set up your account, using a colleague's login creates an unacceptable compliance and personal liability risk.</li>
  <li><strong>Automatic logoff (§164.312(a)(2)(iii)):</strong> Workstations should lock after a period of inactivity. This protects against unattended workstations in common areas. If your workstation doesn't lock automatically, that's an IT configuration issue — report it.</li>
  <li><strong>Audit controls (§164.312(b)):</strong> Every access to patient data is logged under your credentials. If a colleague borrows your login, any access they make is attributed to you. This creates liability even for actions you didn't take.</li>
</ul>
<p>The most serious HIPAA violations related to credentials are typically not technology failures — they are procedure failures: shared logins, passwords written down and discovered, failure to log out on shared workstations.</p>

<h2 id="shared-workstations">Shared workstations and fast-user switching</h2>
<p>Most clinical environments use shared workstations — nursing stations, medication rooms, charting areas. The security challenge is real: you need to authenticate quickly to access a patient record, but you also need to ensure the workstation is secured when you step away.</p>
<p>Best practices for shared workstations:</p>
<ul>
  <li><strong>Always log out, never just close the browser:</strong> A closed browser tab on a logged-in session still leaves the session active. Always use the application's sign-out function.</li>
  <li><strong>Use Windows fast user switching instead of full logout where available:</strong> Fast user switching (Win+L) locks your session but keeps it loaded — faster to return to than a full login while still protecting your session.</li>
  <li><strong>Never leave a workstation unattended while logged in:</strong> Even a 30-second gap is enough for an accidental (or intentional) access event to be logged under your credentials.</li>
  <li><strong>Report workstations that don't auto-lock:</strong> If a workstation doesn't lock within 10–15 minutes, the IT configuration is non-compliant. This is an IT issue, not something you should work around.</li>
</ul>

<div class="callout warning">
  <strong>The proximity card exception:</strong> Some facilities use proximity card or fingerprint authentication on shared workstations — tap-to-lock, tap-to-unlock. If your facility offers this, use it. The speed advantage is significant and the security posture is better than typed passwords on shared devices.
</div>

<h2 id="ehr-access">EHR/EMR best practices</h2>
<p>Electronic Health Records and Electronic Medical Records systems (Epic, Cerner, Meditech, Allscripts) are the highest-value credential targets in healthcare. A compromised EHR login can access thousands of patient records. Treat EHR credentials with maximum security:</p>
<ul>
  <li>Use a unique, randomly generated password for your EHR login — different from any other system</li>
  <li>If your facility allows passphrase-based passwords, use a 5–6 word random passphrase — far more secure than the complex-but-predictable 12-character passwords most people choose</li>
  <li>Never share EHR credentials with colleagues, students, or temporary staff — each person must have individually provisioned access</li>
  <li>Report any suspicious login notifications immediately to IT security — EHR systems typically send alerts for off-hours or unusual location access</li>
  <li>If your EHR offers MFA as an option, enable it even if not required by policy</li>
</ul>

<h2 id="mobile-devices">Mobile devices and tablets</h2>
<p>Mobile devices carrying ePHI require specific controls under HIPAA. For personal devices used for work (BYOD) and employer-issued devices:</p>
<ul>
  <li><strong>Device lock screen:</strong> Minimum 6-digit PIN, preferably biometric (Face ID, fingerprint) with a strong PIN fallback. Simple swipe patterns are insufficient.</li>
  <li><strong>Auto-lock timeout:</strong> Devices should auto-lock after 2–5 minutes. In a clinical setting where phones are frequently set down, this is critical.</li>
  <li><strong>Remote wipe capability:</strong> Any device with access to ePHI should be enrolled in a Mobile Device Management (MDM) solution that allows remote wipe if the device is lost or stolen.</li>
  <li><strong>Secure messaging apps:</strong> Use only facility-approved secure messaging for any communication involving patient information. Standard SMS is not HIPAA-compliant.</li>
  <li><strong>App-specific passwords:</strong> If your facility uses Microsoft 365 or Google Workspace, set up app-specific passwords for mobile email rather than using your main account password on the device.</li>
</ul>

<h2 id="password-manager">Using a password manager in healthcare</h2>
<p>A password manager is the single most effective tool for managing the credential burden of healthcare work. The key benefits in a clinical context:</p>
<ul>
  <li>Generates and stores unique, strong passwords for every system — no more reusing variations of the same password</li>
  <li>Auto-fills credentials quickly, reducing the friction of complex passwords</li>
  <li>Works across devices — desktop workstations, mobile devices, tablets</li>
  <li>Encrypted vault — passwords are not stored in plaintext on any device or server</li>
</ul>
<p>For personal healthcare worker use, both 1Password and Bitwarden are zero-knowledge architectures — the vendor cannot access your passwords even if their servers are compromised.</p>

<div class="callout">
  <strong>Recommended for individual healthcare workers:</strong> <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=healthcare" style="color:#C8FF00;" target="_blank" rel="noopener">1Password</a> ($2.99/month) or <a href="https://bitwarden.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=healthcare" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden</a> (free for individuals) provide encrypted storage for all your credentials. Both are zero-knowledge — they never see your master password or your stored credentials.
</div>

<p>Important note: Check with your IT department before installing personal password managers on employer-issued devices. Some facilities have policies about approved software. On personal devices, you are generally free to use any password manager.</p>

<h2 id="mfa-in-clinical">MFA in clinical settings</h2>
<p>Multi-factor authentication presents usability challenges in clinical environments — you can't fumble with a phone authenticator app during a code blue. However, modern MFA options have addressed many of the clinical workflow concerns:</p>
<ul>
  <li><strong>Push notification (Duo, Microsoft Authenticator):</strong> One-tap approval on your smartphone. Fast and workable in most clinical contexts. The downside: requires phone in hand.</li>
  <li><strong>Hardware token (YubiKey):</strong> A physical key on your badge lanyard. Tap or insert to authenticate. Works on shared workstations without requiring a personal device. Very fast. Increasingly common in high-security clinical environments.</li>
  <li><strong>SMS OTP:</strong> The most common but least recommended. Works without a smartphone app, but susceptible to SIM swap attacks and adds friction during urgent care moments.</li>
  <li><strong>Biometric workstation authentication:</strong> Fingerprint or face authentication on dedicated workstations. Available in some facilities — fastest for clinical use.</li>
</ul>
<p>If your facility offers hardware token MFA and you're in a role that requires frequent authentication to sensitive systems, request a YubiKey from IT — the time savings over repeated TOTP lookups on a phone are meaningful over a full shift.</p>

<h2 id="personal-vs-work">Personal vs. work credentials</h2>
<p>One of the most common healthcare worker security failures is password reuse between personal and work accounts. The risk: if your personal email (likely weaker security, possibly breached) uses the same password as your EHR login, a breach of your personal account exposes patient data.</p>
<ul>
  <li><strong>Never use your work password for any personal account</strong></li>
  <li><strong>Never use a personal password for any work system</strong></li>
  <li>Use a different email address for work and personal accounts — never register for personal services with your work email</li>
  <li>Enable two-factor authentication on your personal email — if your personal email is compromised, attackers can reset other accounts through email recovery</li>
</ul>

<h2 id="quick-reference">Quick reference card</h2>
<p>Print this and keep it at your workstation — share it with students and new colleagues:</p>
<ol>
  <li>Never share your credentials with anyone — not colleagues, students, or supervisors</li>
  <li>Log out when you leave any shared workstation, even briefly</li>
  <li>Use a unique password for each system — use a password manager</li>
  <li>Report suspicious login notifications to IT Security immediately</li>
  <li>Lock your phone before setting it down in patient care areas</li>
  <li>Never send patient information over standard SMS</li>
  <li>If your workstation doesn't auto-lock after 15 minutes, report it to IT</li>
  <li>A borrowed login is a HIPAA violation — for you and for the person who lent it</li>
</ol>
`;
