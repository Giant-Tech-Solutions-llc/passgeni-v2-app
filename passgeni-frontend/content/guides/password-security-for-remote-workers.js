// =============================================================
// PASSGENI — GUIDE CONTENT: password-security-for-remote-workers
// =============================================================

export const toc = [
  { id: "remote-threat-model",  title: "The remote worker threat model"         },
  { id: "home-network",         title: "Home network security"                  },
  { id: "personal-devices",     title: "Personal devices for work (BYOD)"       },
  { id: "public-wifi",          title: "Public WiFi and coffee shops"           },
  { id: "vpn-authentication",   title: "VPN authentication"                     },
  { id: "family-shared-devices","title": "Shared home devices"                 },
  { id: "video-conferencing",   title: "Video conferencing credentials"         },
  { id: "password-manager",     title: "Password manager for remote work"       },
  { id: "corporate-policy",     title: "Meeting your employer's expectations"   },
];

export const contentHtml = `
<h2 id="remote-threat-model">The remote worker threat model</h2>
<p>The office network, for all its imperfections, provided meaningful security guarantees: corporate firewall, managed devices, physical access controls, and IT staff who could respond to incidents. Remote work eliminates most of these. The threat model for a remote worker is fundamentally different from an office worker's:</p>
<ul>
  <li>Home networks are shared with family members, smart devices, gaming consoles, and other systems over which the corporate IT team has no visibility</li>
  <li>Personal devices may have weaker security configurations, out-of-date software, and personal applications that are vectors for malware</li>
  <li>Work sessions happen alongside personal sessions in the same browser, the same device, the same network — blurring the security boundary</li>
  <li>Physical security is absent — shoulder surfing in cafes, shoulder surfing by family members, unattended unlocked screens</li>
  <li>IT response time to a security incident is measured in hours or days, not minutes</li>
</ul>
<p>The credential implications: every credential you use for work is more exposed when you work remotely than when you work in an office. The compensating controls are primarily authentication-based — stronger credentials, MFA, and clear separation between work and personal accounts.</p>

<h2 id="home-network">Home network security</h2>
<p>Your home router is the perimeter between your work traffic and the internet. Default configurations on most home routers are inadequate for work-from-home use:</p>
<ul>
  <li><strong>Change the router admin password:</strong> The default admin credential for your router is the same as every other router of that model. If your router administration interface is accessible from your local network (it typically is), anyone on your network can access it with a Google search for the default password. Change it to a unique 20-character randomly generated password, stored in your password manager.</li>
  <li><strong>Update router firmware:</strong> Router firmware updates patch security vulnerabilities. Most routers don't auto-update. Check your router's admin interface for firmware updates annually at minimum.</li>
  <li><strong>Separate work from IoT devices:</strong> Smart TVs, cameras, thermostats, and other IoT devices often have poor security. A separate guest network or VLAN for IoT devices isolates them from your work devices.</li>
  <li><strong>Use WPA3 if available:</strong> If your router supports WPA3, enable it for your primary network. If not, WPA2-AES is acceptable; WEP and WPA are not.</li>
  <li><strong>Strong WiFi password:</strong> The password for your work WiFi network should be a minimum 20-character randomly generated string, not <code>YourAddress2024!</code>.</li>
</ul>

<h2 id="personal-devices">Personal devices for work (BYOD)</h2>
<p>Using personal devices for work (BYOD — Bring Your Own Device) is common in remote work but creates credential risks that office environments don't have:</p>
<ul>
  <li><strong>Browser profiles:</strong> Use a separate browser profile (or a separate browser) for work. This prevents personal browser extensions from accessing work sessions, and prevents work cookies and sessions from being exposed if you visit a malicious site during personal browsing.</li>
  <li><strong>Keep OS and software updated:</strong> Personal devices that accumulate updates are a common attack vector. Enable automatic OS updates.</li>
  <li><strong>Device encryption:</strong> Enable full-disk encryption. On macOS, this is FileVault (System Preferences → Security & Privacy). On Windows, BitLocker. If the device is stolen, encryption prevents access to stored credentials and documents.</li>
  <li><strong>Screen lock:</strong> Auto-lock after 5 minutes of inactivity. This is especially important in shared spaces or when you have family members around.</li>
  <li><strong>Antivirus:</strong> On Windows, Windows Defender is adequate for most users. On macOS, the built-in XProtect combined with careful behaviour is sufficient — expensive commercial AV products add little on modern macOS.</li>
</ul>

<h2 id="public-wifi">Public WiFi and coffee shops</h2>
<p>Public WiFi networks — cafes, airports, hotels, co-working spaces — should be treated as hostile networks for work purposes. Specific risks:</p>
<ul>
  <li><strong>Evil twin attacks:</strong> An attacker sets up a WiFi network named "Starbucks WiFi" or "Airport Free WiFi" that proxies traffic — allowing credential interception on non-HTTPS connections and session hijacking on poorly implemented HTTPS sites.</li>
  <li><strong>Network sniffing:</strong> On unencrypted or weakly encrypted public networks, traffic can be observed by other network participants.</li>
  <li><strong>Physical shoulder surfing:</strong> In busy public spaces, screens are visible to people behind and beside you. Password fields, MFA codes, and sensitive documents can be observed directly.</li>
</ul>
<p>The mitigation: always use a VPN when on public WiFi. Your employer should provide one. If they don't, a personal VPN (Mullvad, ProtonVPN) is adequate for personal threat models — though it does not provide the network access controls of a corporate VPN. A cellular hotspot (personal hotspot from your phone) is preferable to public WiFi for sensitive work.</p>

<h2 id="vpn-authentication">VPN authentication</h2>
<p>Corporate VPNs are primary targets for credential attacks — a compromised VPN credential gives an attacker direct access to the internal network from anywhere in the world. VPN authentication deserves heightened security compared to other credentials:</p>
<ul>
  <li>Your VPN password should be unique, long (≥ 20 characters), and stored in your password manager — never reused anywhere else</li>
  <li>MFA must be enabled for VPN access — if your employer hasn't required it, ask IT to enable it</li>
  <li>TOTP authenticator app or hardware key for VPN MFA — SMS OTP is the weakest acceptable option</li>
  <li>Never share VPN credentials with family members or give someone else access to your VPN session — your credentials are tied to your identity and audited</li>
  <li>Report immediately if you suspect your VPN credentials have been compromised — VPN credential compromise is a major incident, not a minor issue</li>
</ul>

<h2 id="family-shared-devices">Shared home devices</h2>
<p>Working from home in a household with other adults or children creates credential risks that single-occupant offices don't have:</p>
<ul>
  <li><strong>Separate user accounts:</strong> If family members use your work computer, they should have their own user account — not access under your account. This prevents accidental access to work systems and credential exposure.</li>
  <li><strong>Lock before walking away:</strong> Develop the habit of locking (Win+L or Cmd+Ctrl+Q on macOS) whenever you leave the keyboard — even to answer the door or get coffee.</li>
  <li><strong>Password manager master password:</strong> Your password manager's master password should be something you have memorised and that family members (especially children) do not know. Consider using a passphrase that you don't write down anywhere in the home.</li>
  <li><strong>Work documents and shared folders:</strong> Don't save work documents to shared family cloud storage (family Google Drive, Dropbox). Keep work documents in employer-provided or dedicated work storage.</li>
</ul>

<h2 id="video-conferencing">Video conferencing credentials</h2>
<p>Video conferencing accounts — Zoom, Teams, Google Meet, Webex — are a frequently underestimated credential risk. A compromised Zoom account can expose private meetings, recorded calls, and in some enterprise configurations, access to shared content and directories:</p>
<ul>
  <li>Use a unique, strong password for your video conferencing account — separate from your corporate SSO where possible</li>
  <li>Enable MFA on your Zoom or conferencing account if not enforced by your employer's SSO</li>
  <li>Use waiting rooms for all meetings — this prevents uninvited participants from joining if a meeting link is shared</li>
  <li>Don't post meeting links publicly — especially for recurring meetings with consistent links</li>
  <li>Log out of video conferencing apps when not in use, particularly on devices shared with family members</li>
</ul>

<h2 id="password-manager">Password manager for remote work</h2>
<p>A password manager is the central tool for remote work credential security. The specific remote work benefits:</p>
<ul>
  <li>Unique passwords for every system without memorisation burden — enabling the unique-credential requirement without cognitive overload</li>
  <li>Works across all devices — desktop, laptop, mobile — ensuring you have access to credentials when working from different locations</li>
  <li>Auto-fill reduces the risk of accidentally typing credentials into phishing sites (the password manager recognises the correct domain and won't fill on lookalike sites)</li>
  <li>Encrypted vault — if your device is lost or stolen, credentials are not exposed as plaintext</li>
</ul>
<p>For remote workers: <a href="https://1password.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=remote" style="color:#C8FF00;" target="_blank" rel="noopener">1Password</a> ($2.99/month individual, $4/user for teams) or <a href="https://bitwarden.com/?utm_source=passgeni&utm_medium=guide&utm_campaign=remote" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden</a> (free individual plan) are the standard choices. If your employer provides a password manager, use it — and use a separate personal password manager for personal accounts to maintain separation.</p>

<h2 id="corporate-policy">Meeting your employer's expectations</h2>
<p>Most employers have remote work security policies. Beyond the technical controls, the credential-specific obligations typically are:</p>
<ul>
  <li>Don't share credentials with household members even for "just a minute"</li>
  <li>Report any suspected credential compromise to IT Security immediately — delays allow attackers more time in the network</li>
  <li>Use only employer-approved tools for work communication — personal WhatsApp for sensitive business communication is typically a policy violation</li>
  <li>Don't store work credentials in your personal password manager if your employer has a provided tool — this creates a separation between personal and corporate credential stores that your employer may require</li>
  <li>Complete required security training — remote work expands the attack surface, and most employer training covers the specific risks introduced by home environments</li>
</ul>
`;
