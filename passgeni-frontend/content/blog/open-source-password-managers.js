export const contentHtml = `
<h2>Why open source matters for password managers</h2>
<p>A password manager is one of the few security tools where the open source argument is genuinely compelling, not just ideological. Your password manager holds credentials for every account you own. You are trusting its security model completely. With a closed-source tool, you're trusting the vendor's claims. With an open-source tool, you — or anyone — can verify them.</p>
<p>The argument isn't that closed-source tools are dishonest. It's that auditability provides a different kind of assurance. When Bitwarden says it uses AES-256-CBC encryption with PBKDF2-SHA256 key derivation, you can verify that claim by reading the code and the independent audits.</p>

<h2>Bitwarden</h2>
<p>The practical recommendation for most users and teams. Bitwarden is fully open source (both client and server), has undergone multiple independent security audits, supports all platforms, and has a genuinely complete free tier.</p>
<p><strong>Architecture:</strong> End-to-end encrypted vault. Master password never transmitted. Zero-knowledge server. PBKDF2-SHA256 (600,000 iterations default) for key derivation.</p>
<p><strong>Self-hosting:</strong> Official Docker-based self-hosted deployment available. Suitable for organisations with data residency requirements.</p>
<p><strong>Price:</strong> Free personal, $10/year premium, $40/year families, $3/user/month teams.</p>
<p><strong>Verdict:</strong> Default recommendation for individuals and teams. Open source + audited + affordable is a rare combination.</p>

<h2>Vaultwarden</h2>
<p>An unofficial, community-maintained Bitwarden-compatible server implementation written in Rust. Dramatically lighter than the official Bitwarden server (runs on a Raspberry Pi), with the full Bitwarden client experience. Ideal for self-hosters who want lower resource usage.</p>
<p><strong>Caveats:</strong> Not officially supported by Bitwarden. Community maintained — security depends on the maintainers' diligence. Use official Bitwarden self-hosted if in a regulated environment.</p>

<h2>KeePass / KeePassXC</h2>
<p>The original open-source password manager. Local-only by default — your encrypted vault is a file on your device, not a cloud service. KeePassXC is the modern, cross-platform fork with a better UI.</p>
<p><strong>Strengths:</strong> No cloud dependency, maximum control, extremely long audit history, no subscription.</p>
<p><strong>Weaknesses:</strong> Sync between devices requires manual setup (Dropbox, Syncthing, etc.), less convenient browser integration than cloud-based options, requires more technical comfort to set up correctly.</p>
<p><strong>Verdict:</strong> Best for technical users who want full control and no cloud dependency. Not recommended as a first password manager for non-technical users.</p>

<h2>The bottom line</h2>
<p>If open source is important to you: Bitwarden for most users, Vaultwarden for self-hosting enthusiasts, KeePassXC for maximum local control. All three are viable. All three have been audited or have sufficient open-source visibility to provide meaningful assurance.</p>
`;