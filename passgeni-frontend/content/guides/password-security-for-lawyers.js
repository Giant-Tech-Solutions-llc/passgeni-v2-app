// =============================================================
// PASSGENI — GUIDE CONTENT: password-security-for-lawyers
// =============================================================

export const toc = [
  { id: "aba-obligations",    title: "ABA Model Rule 1.6 and cybersecurity"    },
  { id: "state-bar-rules",    title: "State bar cybersecurity requirements"     },
  { id: "what-at-risk",       title: "What's actually at risk"                  },
  { id: "password-standards", title: "Password standards for law firms"         },
  { id: "password-manager",   title: "Password managers for attorneys"          },
  { id: "client-portals",     title: "Client portal and cloud security"         },
  { id: "mfa-for-lawyers",    title: "MFA implementation for legal"             },
  { id: "remote-work",        title: "Secure remote and travel access"          },
  { id: "due-diligence",      title: "Third-party vendor due diligence"         },
];

export const contentHtml = `
<h2 id="aba-obligations">ABA Model Rule 1.6 and cybersecurity</h2>
<p>ABA Model Rule 1.6(c) requires lawyers to "make reasonable efforts to prevent the inadvertent or unauthorized disclosure of, or unauthorized access to, information relating to the representation of a client." This is not a suggested best practice — it is a professional obligation with disciplinary consequences.</p>
<p>ABA Formal Opinion 477R (2017) specifically addressed cybersecurity in the context of Rule 1.6, stating that lawyers must "take competent and reasonable measures to safeguard information relating to clients." The opinion explicitly mentions that the duty applies to password protection and access controls for devices, systems, and communications used in the representation.</p>
<p>In practical terms: if your credentials are compromised and client confidential information is exposed as a result, you have a potential Rule 1.6 violation and must notify the affected client. The standard for "reasonable efforts" rises with the sensitivity of the matter and the capability of available technology. Using weak passwords or no MFA when both are easily available is increasingly difficult to characterise as reasonable.</p>

<h2 id="state-bar-rules">State bar cybersecurity requirements</h2>
<p>Several states have gone beyond the ABA model rules to create explicit cybersecurity obligations for attorneys:</p>
<ul>
  <li><strong>California:</strong> The State Bar's cybersecurity guidance references NIST standards and explicitly recommends MFA, strong passwords, and password managers as components of a reasonable security program</li>
  <li><strong>New York:</strong> Ethics opinions have stated that attorneys storing client data in cloud services must implement safeguards including strong authentication</li>
  <li><strong>Florida:</strong> The Florida Bar's ethics guidance references password security and encryption for client communications</li>
  <li><strong>Texas:</strong> The State Bar's cybersecurity guidance for attorneys includes specific password recommendations aligned with NIST 800-63B</li>
</ul>
<p>Check your state bar's ethics opinions and cybersecurity guidance — the landscape has evolved quickly and state-specific requirements may exceed the ABA baseline.</p>

<div class="callout warning">
  <strong>Cyber insurance note:</strong> Most law firm cyber insurance policies now require MFA as a policy condition. Failure to have MFA enabled may void coverage in the event of a breach. Review your policy's technical requirements annually.
</div>

<h2 id="what-at-risk">What's actually at risk</h2>
<p>A compromised law firm credential is uniquely valuable to attackers because of the breadth of sensitive information involved:</p>
<ul>
  <li><strong>Business email compromise:</strong> Law firms routinely handle large trust account transfers, real estate transactions, and corporate deals. A compromised email account can redirect wire transfers. The FBI reports that law firms are among the top BEC targets precisely because of high-value transactions.</li>
  <li><strong>Client confidential information:</strong> Litigation strategy, M&A negotiations, pending intellectual property filings, personal injury settlements — information that opposing parties, competitors, or adversaries would pay to obtain.</li>
  <li><strong>Privilege:</strong> Exposure of privileged communications can have consequences beyond the immediate security incident — potential waiver of attorney-client privilege in the matter.</li>
  <li><strong>Ransomware:</strong> Law firms have been disproportionately targeted by ransomware operators who combine encryption with exfiltration threats. The threat of publishing confidential client information creates payment pressure beyond the immediate access loss.</li>
</ul>

<h2 id="password-standards">Password standards for law firms</h2>
<p>Based on ABA guidance, NIST 800-63B, and common state bar ethics opinions, the following represent reasonable and defensible password standards for legal practice:</p>

<div class="req-row"><span class="req-label">All firm systems (email, DMS, billing)</span><span class="req-value">≥ 14 characters</span></div>
<div class="req-row"><span class="req-label">Client portal and external-facing access</span><span class="req-value">≥ 16 characters</span></div>
<div class="req-row"><span class="req-label">Firm banking and financial systems</span><span class="req-value">≥ 20 characters</span></div>
<div class="req-row"><span class="req-label">IOLTA and trust accounts</span><span class="req-value">≥ 20 characters + hardware MFA</span></div>
<div class="req-row"><span class="req-label">Character set</span><span class="req-value">Full: upper + lower + numbers + symbols</span></div>
<div class="req-row"><span class="req-label">Password reuse</span><span class="req-value">No reuse across any systems</span></div>

<h2 id="password-manager">Password managers for attorneys</h2>
<p>A password manager satisfies multiple obligations simultaneously: it enables unique strong passwords for every system (Rule 1.6 reasonable safeguards), provides audit logs of credential access (relevant to ethics investigations), and handles the key management challenge of attorney-client privilege in stored credentials.</p>
<p>For law firms specifically, consider:</p>
<ul>
  <li><strong>1Password Business:</strong> The most common choice for law firms. Shared vaults allow matter-specific or practice-group credential sharing. Admin policies can enforce password strength requirements. Audit logs satisfy ethics investigation requirements. US-based data storage available. <a href="https://1password.com/teams?utm_source=passgeni&utm_medium=guide&utm_campaign=legal" style="color:#C8FF00;" target="_blank" rel="noopener">1Password Business →</a></li>
  <li><strong>Bitwarden Teams:</strong> Open-source, self-hosted option. Suitable for firms with IT capacity to run on-premises infrastructure who want maximum data control. <a href="https://bitwarden.com/products/business/?utm_source=passgeni&utm_medium=guide&utm_campaign=legal" style="color:#C8FF00;" target="_blank" rel="noopener">Bitwarden Teams →</a></li>
</ul>
<p>Solo practitioners and small firms with limited budget: Bitwarden's free individual tier is a significant improvement over no password manager. The paid tiers add features useful for firm-level management but the core functionality of generating and storing unique passwords is available at no cost.</p>

<h2 id="client-portals">Client portal and cloud security</h2>
<p>The shift to cloud-based practice management — Clio, MyCase, PracticePanther, NetDocuments, iManage — has made credential security central to legal cybersecurity obligations. These platforms hold client communications, documents, and billing information in cloud storage. The security of that data depends on the strength of the credentials protecting access.</p>
<ul>
  <li>Every attorney and staff member should have individually provisioned credentials — no shared logins even on client portal platforms</li>
  <li>Verify that your practice management platforms support MFA and enable it — this should be a firm-wide requirement, not opt-in</li>
  <li>Review the data handling agreements with your cloud platforms — ABA Formal Opinion 477R requires that attorneys "take reasonable care to avoid disclosure of confidential information" when using cloud providers, which includes verifying the provider's security practices</li>
  <li>Ensure client-facing portal credentials (where clients log in to view documents) are not shared by multiple clients — each client should have individual credentials</li>
</ul>

<h2 id="mfa-for-lawyers">MFA implementation for legal</h2>
<p>MFA is the most effective single control against business email compromise — the leading cause of financial loss in law firm security incidents. Implementation priorities:</p>
<ol>
  <li><strong>Firm email — highest priority:</strong> Enable mandatory MFA on Microsoft 365 or Google Workspace at the tenant level. Use Conditional Access policies to require MFA for all users, including partners.</li>
  <li><strong>Trust and IOLTA accounts:</strong> Contact your bank about MFA options for online banking access. If your bank does not offer hardware token MFA for business banking, consider whether your banking relationship meets the standard of reasonable security.</li>
  <li><strong>Practice management software:</strong> Enable MFA in all matter management and document management platforms.</li>
  <li><strong>Remote access (VPN, RDP):</strong> Any remote access to firm systems requires MFA without exception.</li>
</ol>
<p>For MFA method selection: TOTP authenticator apps (Authy, Google Authenticator) are the minimum. For trust accounts, banking, and managing partner access, hardware keys (YubiKey) provide phishing-resistant authentication that eliminates the push fatigue and SIM swap risks of other methods.</p>

<h2 id="remote-work">Secure remote and travel access</h2>
<p>Attorneys frequently work from courts, client offices, airports, and home. Each environment introduces credential risks that office-based work does not:</p>
<ul>
  <li><strong>Public WiFi:</strong> Never access client systems on public WiFi without a VPN. Even with a VPN, be aware of shoulder surfing when entering credentials in public spaces.</li>
  <li><strong>Hotel WiFi:</strong> Treat hotel networks as hostile. Use cellular data or a personal hotspot for sensitive work.</li>
  <li><strong>Client office networks:</strong> Visiting a client's office does not mean their network is secure. Use VPN regardless.</li>
  <li><strong>Shared or firm-provided devices at court:</strong> If using a device not under your personal control, sign out of all accounts and clear session data before returning the device.</li>
  <li><strong>Travel abroad:</strong> Some jurisdictions actively monitor network traffic. For travel to high-risk destinations, consider whether sensitive client matters should be accessed at all on that trip.</li>
</ul>

<h2 id="due-diligence">Third-party vendor due diligence</h2>
<p>ABA Formal Opinion 477R notes that attorneys may have obligations regarding the security practices of vendors who handle client information. For credential-related due diligence:</p>
<ul>
  <li>Ask vendors about their authentication requirements for staff who access your client data</li>
  <li>Verify that vendor portals you use to share client documents require MFA</li>
  <li>Include security requirements in vendor contracts — minimum password standards, MFA requirements, breach notification timelines</li>
  <li>Review vendor SOC 2 Type II reports or equivalent security certifications annually</li>
</ul>
`;
