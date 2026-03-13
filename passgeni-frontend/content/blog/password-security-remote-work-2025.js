export const contentHtml = `
<h2>How the threat landscape changed after 2020</h2>
<p>The mass shift to remote work in 2020 created a security transformation that many organisations still haven't fully addressed. Pre-2020, the perimeter model worked reasonably well: employee devices were on a managed corporate network, VPN was an edge case, and most authentication happened inside the firewall. Post-2020, everything is a remote access scenario.</p>
<p>The credential threat surface expanded dramatically: home networks with consumer routers, personal devices with work accounts, VPN fatigue leading to workarounds, shadow IT proliferating because corporate tools were too slow for remote work.</p>

<h2>The home network problem</h2>
<p>Home routers run old firmware with known vulnerabilities. Home networks have untrusted devices — smart TVs, IoT devices, family member phones — that can intercept or expose traffic. The employee working from home has essentially no network security compared to a managed corporate environment.</p>
<p>Controls that address this: VPN for all corporate access (with MFA, not just a certificate), endpoint detection on managed devices, and zero-trust network access (ZTNA) architecture for organisations ready to invest in it.</p>

<h2>Personal device credential hygiene</h2>
<p>When employees use personal devices for work — even just checking email — those devices should have the same credential security as corporate devices. In practice, this means:</p>
<ul>
  <li>Password manager installed on personal devices used for work</li>
  <li>Work credentials stored in a separate, work-specific vault</li>
  <li>MFA on all work accounts, with separate TOTP accounts from personal ones where possible</li>
  <li>No sharing of work credentials with family members or between devices without proper sharing mechanisms</li>
</ul>

<h2>The VPN fatigue problem</h2>
<p>Mandatory VPN for all remote access creates friction. Employees work around friction. Shadow IT grows when corporate tools are too slow. The security answer isn't to make VPN mandatory for everything — it's to use conditional access policies that require stronger authentication for sensitive systems, not a blanket VPN gate for all access.</p>

<h2>Password policy for distributed teams</h2>
<p>Remote teams need explicit written policy covering: which systems require VPN, MFA requirements by system type, approved tools for credential sharing (not Slack), and incident response steps if a credential is compromised. Use PassGeni's <a href="/tools/policy-generator">Policy Generator</a> to create a documented policy that covers remote work scenarios.</p>
`;