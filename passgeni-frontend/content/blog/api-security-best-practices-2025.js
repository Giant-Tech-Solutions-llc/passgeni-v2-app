export const contentHtml = `
<h2>The API key leakage problem</h2>
<p>GitHub's secret scanning service detected over 1 million exposed secrets in public repositories in 2024. AWS, Stripe, GitHub, Twilio API keys — all committed accidentally and discovered within minutes by automated scanners that monitor public repositories in real time. The average time from commit to first malicious use: under 5 minutes.</p>
<p>This isn't a theoretical risk. Teams have received bills for tens of thousands of dollars in AWS charges within hours of accidentally committing credentials. Stripe has processed fraudulent charges on exposed payment API keys. The consequences are immediate and expensive.</p>

<h2>Secret storage: the right hierarchy</h2>
<ul>
  <li><strong>Secrets manager (HashiCorp Vault, AWS Secrets Manager, Doppler):</strong> The correct place for production credentials. Provides rotation, access policies, audit logs, and versioning. Applications fetch secrets at runtime — credentials never touch the codebase or environment files.</li>
  <li><strong>.env files (local development only):</strong> Never committed. Add to .gitignore on day one. Use .env.example with placeholder values for documentation.</li>
  <li><strong>CI/CD environment variables:</strong> Acceptable for CI/CD secrets. Set as masked variables. Never print to logs.</li>
  <li><strong>Hardcoded in code:</strong> Never, under any circumstances.</li>
</ul>

<h2>API key design best practices</h2>
<p>When generating API keys for your own platform:</p>
<ul>
  <li>Generate with maximum entropy — PassGeni's API generates 40-character keys by default (same pattern as the Team API key format)</li>
  <li>Store only the SHA-256 hash server-side — never the raw key</li>
  <li>Show the key exactly once (at generation) with clear instruction to copy it immediately</li>
  <li>Build key rotation into your UI from day one — retrofitting it is painful</li>
  <li>Set default expiry on all API keys — 90 or 180 days forces regular rotation</li>
  <li>Scope keys to minimum necessary permissions</li>
</ul>

<h2>Scanning and detection</h2>
<p>Set up secret scanning before you have an incident:</p>
<ul>
  <li><strong>GitHub Advanced Security / GitLab Secret Detection:</strong> Scans pushes and existing history for known secret patterns</li>
  <li><strong>TruffleHog:</strong> Open source, scans git history with entropy analysis</li>
  <li><strong>detect-secrets (Yelp):</strong> Pre-commit hook that blocks commits containing high-entropy strings</li>
  <li><strong>GitGuardian:</strong> Real-time monitoring with incident response integration</li>
</ul>
<p>Also: rotate any secret that might have been exposed, even if you can't confirm it was. The cost of rotation is low; the cost of a compromised credential is not.</p>
`;