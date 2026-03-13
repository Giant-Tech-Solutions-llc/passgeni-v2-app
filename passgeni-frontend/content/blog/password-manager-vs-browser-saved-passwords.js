export const contentHtml = `
<h2>The honest answer upfront</h2>
<p>Browser-saved passwords are significantly less secure than a dedicated password manager — but they're dramatically better than reusing passwords or using weak ones. If you're choosing between Chrome's built-in password saving and reusing "Netflix2019!" everywhere, use Chrome's built-in saving. That's not a close call.</p>
<p>But if you're choosing between Chrome and 1Password, Bitwarden, or any reputable dedicated manager, the dedicated manager wins on every security dimension that matters.</p>

<h2>What Chrome and Safari actually do with your passwords</h2>
<p>When you save a password in Chrome, it's encrypted with your OS account credentials and synced to Google's servers encrypted with your Google account key. On macOS, Safari stores passwords in the iCloud Keychain, encrypted with your Apple ID.</p>
<p>This is real encryption. The problem isn't the encryption itself — it's the key management. Your browser passwords are ultimately protected by your Google or Apple account password, which is almost certainly weaker than a dedicated master password, and which you've probably saved in the same browser. It's circular protection.</p>

<h2>The four real security gaps in browser password saving</h2>
<p><strong>No master password by default.</strong> Anyone who sits at your unlocked computer can open Chrome's saved passwords at <code>chrome://settings/passwords</code> and read every password in plaintext — no authentication required on most systems. A dedicated manager requires re-authentication to reveal passwords.</p>
<p><strong>Tied to your browser account.</strong> If your Google account is compromised, your saved passwords are potentially compromised too. With a dedicated manager, the password vault is a separate authentication silo even if your email is breached.</p>
<p><strong>Limited cross-app access.</strong> Browser passwords only auto-fill in the browser. Desktop apps, SSH clients, databases, APIs — your browser manager can't help there. A dedicated manager works system-wide.</p>
<p><strong>No breach monitoring in the free tier.</strong> Chrome will tell you if a saved password appeared in a breach — but this requires an active Google account and the monitoring is opt-in and sometimes delayed. Purpose-built managers do this continuously and surface it prominently.</p>

<h2>What dedicated password managers do better</h2>
<p>The architecture difference is meaningful: dedicated managers use a zero-knowledge model where even the company cannot decrypt your vault. Your master password never leaves your device — only the encrypted vault is synced. If 1Password's servers are breached, the attacker gets an encrypted blob they cannot open without your master password.</p>
<p>Additional advantages: secure notes, credit card storage, SSH key management, team sharing with granular access controls, enforced 2FA on vault access, automatic password health scoring, and cross-platform apps that work outside the browser.</p>

<h2>The specific threat model that tips the decision</h2>
<p>If your threat model is "someone steals my laptop": both solutions protect you roughly equally, assuming your OS is encrypted with FileVault or BitLocker. <br/>If your threat model is "someone accesses my Google account": dedicated manager wins clearly. <br/>If your threat model is "someone sits at my unlocked computer briefly": dedicated manager wins clearly (re-auth to reveal). <br/>If your threat model is "sophisticated targeted attack": dedicated manager wins on every dimension.</p>

<h2>The free option: Bitwarden</h2>
<p>The strongest argument for dedicated managers used to be cost. It's not anymore. <a href="/guides/free-vs-paid-password-generators">Bitwarden's free tier</a> is a full-featured, audited, open-source password manager with apps on every platform. There is no security reason to use browser-saved passwords when Bitwarden exists and is free. The only argument for browser saving at that point is convenience, and Bitwarden's browser extension is equally convenient.</p>

<h2>Bottom line</h2>
<p>Use a dedicated password manager. If cost is a barrier, use Bitwarden for free. If you're not ready to make the switch, browser-saved passwords are still better than the alternative — but make the switch. It takes about 20 minutes to import your existing passwords and you won't notice a difference in day-to-day use.</p>
<p>Whatever you use, generate your passwords with PassGeni's <a href="/#generator">password generator</a> to ensure the credentials being saved are actually strong. A perfect password manager filled with weak passwords is still a problem.</p>
`;
