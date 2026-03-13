export const contentHtml = `
<h2>The unique challenges of education security</h2>
<p>Educational institutions manage student PII under FERPA, often process health data (school nurses, counsellors) under HIPAA, and handle a user population whose ages span from 5 to graduate school. The same authentication policy that works for adult employees creates barriers for primary school students. The same permissive policy appropriate for young students is inadequate for protecting staff admin access.</p>
<p>This tiered reality means education institutions need layered password policies, not a single blanket requirement.</p>

<h2>FERPA and password security</h2>
<p>FERPA (Family Educational Rights and Privacy Act) requires schools to protect student education records from unauthorised disclosure. While FERPA doesn't specify technical controls in detail, the Department of Education expects "reasonable and appropriate" security measures — language similar to GDPR's Article 32. In practice, this means:</p>
<ul>
  <li>Authentication for any system containing student records</li>
  <li>MFA for administrator access to student data systems</li>
  <li>Access controls limiting record access to staff with legitimate educational interest</li>
  <li>Breach notification procedures in place</li>
</ul>

<h2>Password policy by user tier</h2>
<p><strong>Primary school students (ages 5–11):</strong> Short, memorable passphrases work better than complex passwords. 3-word passphrases with simple words. No mandatory symbols. Consider visual password methods for youngest students. Focus on not sharing passwords rather than password complexity.</p>
<p><strong>Secondary school students (ages 12–18):</strong> Standard 10-12 character requirement. Passphrase option. MFA for any accounts with personal data or academic records access. Password manager education as a teachable skill.</p>
<p><strong>Staff with no administrative privileges:</strong> 12-character minimum, NIST 800-63B compliant, MFA on email and any student data systems.</p>
<p><strong>Staff with administrative privileges:</strong> 15-character minimum, hardware key MFA, privileged access management for admin-level operations.</p>

<h2>The forgotten security problem: shared devices</h2>
<p>Shared Chromebooks, computer lab PCs, and library terminals create credential risks unique to education. Students log into personal accounts on shared devices, forget to log out, and leave credentials accessible to the next user. Controls: automatic session timeout, clear "you're on a shared device" prompts, and browser profile isolation.</p>
<p>Generate temporary device passwords with PassGeni for any shared admin accounts — and rotate them at the start of each academic year and immediately when any admin leaves.</p>
`;