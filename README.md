# PassGeni V2

> AI-powered password generator. Zero storage. Zero knowledge. Free forever for individuals.

**Live:** https://passgeni.ai
**Repo:** https://github.com/Giant-Tech-Solutions-llc/Passgeni-v2

---

## What is PassGeni

PassGeni generates strong, memorable passwords seeded by the user's profession. A doctor gets medical vocabulary patterns. A developer gets tech patterns. Everything runs client-side via `crypto.getRandomValues()` — nothing is ever sent to a server.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.5 |
| UI | React 18 |
| Styling | CSS Variables + globals.css (no Tailwind, no CSS-in-JS library) |
| Database | Supabase (PostgreSQL) |
| Auth | NextAuth v4 — magic link via Resend, JWT sessions |
| AI | Google Gemini (profession-aware seeding) |
| Payments | Paddle |
| Email | Resend |
| Hosting | Vercel |

---

## Repository Structure

```
Passgeni-v2/
├── vercel.json                        ← Vercel rewrite rules (root-level)
└── passgeni-frontend/                 ← Next.js app — THIS is the Vercel root directory
    ├── pages/
    │   ├── _app.js                    ← Global app wrapper (ErrorBoundary, global CSS)
    │   ├── _document.js               ← Custom HTML document (fonts, meta)
    │   ├── index.js                   ← Homepage
    │   ├── api-docs.js                ← /api-docs page
    │   ├── checkout.js                ← /checkout page
    │   ├── contact.js                 ← /contact page
    │   ├── privacy.js                 ← /privacy page
    │   ├── terms.js                   ← /terms page
    │   ├── refund.js                  ← /refund page
    │   ├── robots.txt.js              ← Dynamic robots.txt
    │   ├── sitemap.xml.js             ← Dynamic sitemap
    │   ├── 404.js                     ← Custom 404 page
    │   ├── api/
    │   │   ├── auth/                  ← NextAuth magic link handler
    │   │   ├── dashboard/             ← Dashboard API routes
    │   │   ├── email/                 ← Email sending routes
    │   │   ├── keys/                  ← API key management
    │   │   ├── paddle/                ← Paddle webhook + checkout
    │   │   ├── usage/                 ← Usage tracking
    │   │   ├── v1/                    ← Public REST API v1
    │   │   ├── waitlist.js            ← Waitlist signup
    │   │   └── test-gemini.js         ← Gemini connection test
    │   ├── auth/                      ← Auth pages (signin, error, verify)
    │   ├── blog/
    │   │   ├── index.js               ← Blog listing (card grid, pagination, search)
    │   │   └── [slug].js              ← Blog post (hero image, TOC, FAQs, social share)
    │   ├── dashboard/                 ← User dashboard (auth-gated)
    │   ├── guides/                    ← Compliance & how-to guides
    │   └── tools/                     ← Individual tool pages
    ├── components/
    │   ├── layout/
    │   │   ├── Header.js              ← Site header / navigation
    │   │   ├── Footer.js              ← Site footer
    │   │   └── Ticker.js              ← Scrolling ticker bar
    │   ├── sections/
    │   │   ├── Hero.js                ← Hero section
    │   │   ├── GeneratorSection.js    ← Password generator UI wrapper
    │   │   ├── HowItWorks.js          ← Re-exports from index.js
    │   │   ├── Features.js            ← Re-exports from index.js
    │   │   ├── ToolsPreview.js        ← Re-exports from index.js
    │   │   ├── Pricing.js             ← Re-exports from index.js
    │   │   ├── Testimonials.js        ← Re-exports from index.js
    │   │   ├── FAQ.js                 ← Re-exports from index.js
    │   │   ├── StatsBar.js            ← Re-exports from index.js
    │   │   ├── Waitlist.js            ← Re-exports from index.js
    │   │   └── index.js               ← All section components defined here
    │   ├── generator/
    │   │   ├── GeneratorWidget.js     ← Main generator state + layout
    │   │   ├── PasswordDisplay.js     ← Password output + strength bar
    │   │   ├── DNAScore.js            ← DNA Score panel
    │   │   ├── PasswordHistory.js     ← Session password history
    │   │   ├── BulkGenerator.js       ← Bulk generation panel
    │   │   ├── ComplianceBar.js       ← Compliance preset selector
    │   │   ├── ProfessionSelector.js  ← Profession picker
    │   │   └── PassphraseTab.js       ← Passphrase generation tab
    │   ├── tools/                     ← Tool-specific components
    │   ├── ui/
    │   │   └── index.js               ← Shared UI primitives (CopyBtn, TogglePill, StrengthBar, TrustChip, Headline)
    │   ├── BlogHeroSVG.js             ← Blog hero illustration
    │   ├── CopyBtn.js                 ← Unified copy-to-clipboard button
    │   ├── ErrorBoundary.js           ← Global error boundary
    │   ├── Layout.js                  ← Page layout wrapper (nav, mobile menu)
    │   ├── TestimonialsSection.js     ← Testimonials infinite marquee
    │   └── TrustStrip.js              ← Trust indicators strip
    ├── content/
    │   └── copy.js                    ← ALL website text lives here — edit here only
    ├── data/
    │   ├── blogPosts.js               ← All 53 blog posts (title, slug, hero, FAQs, keywords)
    │   └── compliance.js              ← Compliance preset definitions (HIPAA, SOC2, PCI-DSS etc.)
    ├── lib/
    │   ├── auth/                      ← Supabase NextAuth adapter
    │   ├── db/                        ← Supabase database helpers
    │   ├── email/                     ← Resend email templates
    │   ├── apiKeys.js                 ← API key generation and validation
    │   ├── auth.js                    ← Auth helpers
    │   ├── gemini.js                  ← Gemini AI client
    │   ├── generator.js               ← Client-side password generation (buildPassword, buildPassphrase, deriveSeeds)
    │   ├── paddle.js                  ← Paddle billing client + webhook verification
    │   └── strength.js                ← Password DNA Score (getStrength, getEntropy, getCrackTime, getDNAScore)
    ├── seo/
    │   └── schema.js                  ← JSON-LD schema generators
    ├── styles/
    │   └── globals.css                ← All global styles, CSS variables, animations
    ├── public/                        ← Static assets (favicon, og-image, icons)
    ├── next.config.js                 ← Next.js config (security headers, redirects)
    ├── INTEGRATION.md                 ← Component integration guide
    └── package.json
```

---

## Design System

All styles live in `styles/globals.css`. No Tailwind. No CSS-in-JS.

### CSS Variables

| Variable | Value | Usage |
|---|---|---|
| `--color-accent` | `#C8FF00` | Brand color — buttons, highlights, icons |
| `--color-bg` | `#060608` | Page background |
| `--color-text` | `#e0e0e0` | Primary text |
| `--font-heading` | Outfit 700/800 | All headings |
| `--font-body` | DM Sans 400/500/600 | Body copy, labels, nav |
| `--font-mono` | IBM Plex Mono | Code, password display |

### Key CSS Classes

| Class | Purpose |
|---|---|
| `.cta-primary` | Lime (#C8FF00) CTA button, black text |
| `.gen-capsule` | Live password display pill |
| `.nav-link` | Nav link — lime when inactive, white when active |
| `.nav-link.active` | Active nav link — white |
| `.testimonial-track` | Infinite marquee (80s speed, pauses on hover) |
| `.copy-btn` / `.copy-btn.copied` | Unified copy button states |
| `.nav-hamburger` | Mobile menu toggle (visible below 900px) |
| `.mobile-nav-drawer` | Mobile nav slide-down drawer |
| `.trust-strip-text` | Trust strip — 12px, #aaa, flex row |

---

## Content System

**All website text is in one file: `content/copy.js`**

Never hardcode text in components. Edit `copy.js` only.

Key exports:

| Export | Contents |
|---|---|
| `SITE` | Name, domain, email, description |
| `NAV` | Nav links, CTA button label |
| `HERO` | Badge, headline, subheadline, trust points, CTA labels |
| `HOW_IT_WORKS` | 3 steps |
| `FEATURES` | 8 feature cards |
| `TOOLS_PREVIEW` | 6 tool cards |
| `PRICING` | Plan names, prices, features (Free / Team / Enterprise) |
| `TESTIMONIALS` | 50+ testimonials |
| `FAQ` | 8 Q&A items |
| `WAITLIST` | Team API CTA section |
| `FOOTER` | Links, copyright, trust chips |
| `TICKER_ITEMS` | Scrolling ticker labels |
| `STATS` | Stats bar numbers |
| `GENERATOR` | Generator section headline and subheadline |

---

## Generator Architecture

The generator is split across `components/generator/`:

- `GeneratorWidget.js` — All state lives here (tab, profession, length, opts, compliance, quantumMode, language, password, history, panels). Imports sub-components and assembles layout.
- `ComplianceBar.js` — Preset buttons (HIPAA, PCI-DSS, SOC2, ISO27001, DoD, Post-Quantum, None). Applies preset settings to GeneratorWidget state.
- `ProfessionSelector.js` — Profession picker. Reads from `content/professions.js`.
- `PasswordDisplay.js` — Renders password output, strength bar, entropy, crack time.
- `DNAScore.js` — 7-point DNA Score panel (toggle via TogglePill).
- `BulkGenerator.js` — Bulk generation panel (toggle via TogglePill).
- `PasswordHistory.js` — Session-only history list (cleared on tab close).
- `PassphraseTab.js` — Passphrase tab with NIST 800-63B wordlist generation.

Generation logic is in `lib/generator.js` — functions: `buildPassword`, `buildPassphrase`, `deriveSeeds`, `generateAuditRecord`.

Strength scoring is in `lib/strength.js` — functions: `getStrength`, `getEntropy`, `getCrackTime`, `getDNAScore`.

Compliance presets are defined in `data/compliance.js` as `COMPLIANCE_PRESETS`.

---

## Auth

- **Method:** Magic link (email only — no passwords)
- **Sender:** Resend from `hello@passgeni.ai`
- **Sessions:** JWT (stateless)
- **Adapter:** `lib/auth/` — custom Supabase adapter

---

## Database — Supabase

```sql
profiles (
  id                      UUID   -- FK to auth.users
  email                   TEXT
  plan_type               TEXT   -- 'free' | 'team' | 'enterprise'
  plan_status             TEXT   -- 'active' | 'trialing' | 'past_due' | 'canceled'
  paddle_subscription_id  TEXT
  paddle_price_id         TEXT
  paddle_customer_id      TEXT
  trial_end               TIMESTAMPTZ
  next_billing_at         TIMESTAMPTZ
  created_at              TIMESTAMPTZ
  updated_at              TIMESTAMPTZ
)
```

---

## Payments — Paddle

Webhook: `POST /api/paddle/webhook`

Events handled: `subscription.created`, `subscription.activated`, `subscription.trialing`, `subscription.updated`, `subscription.canceled`, `subscription.past_due`, `transaction.completed`, `transaction.payment_failed`

---

## Local Development

```bash
git clone https://github.com/Giant-Tech-Solutions-llc/Passgeni-v2.git
cd Passgeni-v2/passgeni-frontend
npm install
cp .env.template .env.local
# Fill in env vars
npm run dev
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
RESEND_API_KEY=
GEMINI_API_KEY=
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
PADDLE_PRODUCT_PRO_MONTHLY=
PADDLE_PRODUCT_PRO_ANNUAL=
PADDLE_PRODUCT_TEAM_MONTHLY=
PADDLE_PRODUCT_TEAM_ANNUAL=
```

---

## Vercel Deployment

- **Project ID:** `prj_VEAZ4S4AlUXPSxRSWPxu0tjuqtCU`
- **Root directory:** `passgeni-frontend` — must always stay set
- **Framework:** Next.js
- **Production domain:** `passgeni.ai`
- Auto-deploys on every push to `main`

---

## Planned Changes (Not Yet Built)

The following changes were agreed and are waiting to be implemented in Claude Code. Do not implement anything not on this list without explicit approval.

### 1. Hero Section — Fix subheadline display
**File:** `components/sections/Hero.js`

The subheadline is currently one paragraph. Replace with 3 inline trust points on a single line:

- 🔒 Built around your profession — easier to remember
- ⚡ Generated in your browser — never touches a server  
- 🆓 Free to start — no account, no card

Each point: emoji + text, displayed inline horizontally (not stacked vertically, not pill capsules). Brand color `#C8FF00` for emojis only.

Only one blinking dot allowed — the one already in the badge at the top. Remove any second blinking dot added anywhere in the hero.

### 2. Hero Section — Single CTA only
**File:** `components/sections/Hero.js`

Remove the "View pricing" secondary CTA. Keep only "Generate my password ↓". No other CTA buttons in the hero.

### 3. Generator Section — Remove company logos strip
**File:** `components/sections/GeneratorSection.js`

The `<LogosStrip />` component is imported and rendered below the generator widget. Remove it entirely. Do not replace it with anything.

### 4. Generator Section — Remove stats bar
The stats bar ("25,847 passwords generated this week" or similar) should not appear below or above the generator. Remove it if present.

### 5. Free Tier — Post-Quantum limit enforcement
**File:** `components/generator/GeneratorWidget.js` + `components/generator/ComplianceBar.js`

Post-Quantum mode is currently unlimited for all users. It must be limited to 1 use per day for free users. After the 1st use:
- Lock the Post-Quantum button with a visual lock icon
- Show a small inline message: "You've used your free Post-Quantum password today. Upgrade to Pro for unlimited access — or share PassGeni to unlock +15 passwords."
- Two options shown: "Share on X →" and "Share on LinkedIn →" (trust-based, honour system — no OAuth verification)
- Clicking either share button opens the respective share URL and unlocks +15 passwords for 24 hours, stored in localStorage
- Limit resets at midnight (localStorage timestamp check)

### 6. Pricing Page — /pricing route
**File:** Create `pages/pricing.js`

The homepage currently includes the `<PricingSection />` inline. The plan is:
- Remove `<PricingSection />` from `pages/index.js`
- Replace with a 2-line teaser + "See full pricing →" link pointing to `/pricing`
- Create `pages/pricing.js` as a dedicated pricing page with:
  - Monthly / Annual billing toggle
  - 4 plan cards: Free, Pro ($9/mo or $89/yr), Team ($29/mo or $249/yr), Enterprise (custom)
  - Full feature comparison table
  - FAQ section (pricing-specific questions)
  - Checkout links wired to Paddle price IDs already in env vars

### 7. Navigation — Mega menu for Tools and Guides
**File:** `components/layout/Header.js`

Add hover mega menus to the "Tools" and "Guides" nav links. Tools mega menu shows 4 columns (Security, Analysis, Business, Utility). Guides mega menu shows 3 columns (Compliance, By Profession, Fundamentals). Mega menus open on hover, close on mouse-out with 200ms delay, close on Escape key. Mobile: expand as accordion, not mega menu.

### 8. Testimonials — Show 3 featured cards (static, not marquee) on homepage
**File:** `components/sections/index.js` (TestimonialsSection)

The homepage currently shows a full scrolling marquee of 50+ testimonials. Replace the homepage testimonials section with 3 static featured cards laid out 2-per-row (2 on top, 1 centred below). Keep the full marquee for any dedicated testimonials page. The 3 cards to feature:
- James K. — IT Security Manager — Policy Generator story
- Pia R. — Backend Engineer — FIPS entropy story  
- Sarah M. — Registered Nurse — HIPAA mode story

### 9. FAQ — Expand to 9 questions
**File:** `content/copy.js` (FAQ export)

Add these 3 questions to the existing 8 (do not remove any):
- "Can I use PassGeni on my phone?" — Yes, fully responsive, no app needed.
- "What happens if I forget my password?" — We don't store it. Use a password manager like Bitwarden or 1Password.
- "Is PassGeni really free? What is the catch?" — 15/day free, no ads, no tracking. We make money from Pro and Team plans.

### 10. CTA Section — Replace Waitlist section
**File:** `components/sections/index.js` (WaitlistSection) + `pages/index.js`

Replace the current Waitlist/Team API CTA with a 2-card section:
- Card 1: Weekly Security Digest email subscribe (email input + subscribe button). No email stored beyond Resend.
- Card 2: Free Compliance Cheat Sheet PDF download (HIPAA + PCI-DSS requirements). Direct download, no email required.
Below both cards: pricing teaser — "Free forever for individuals. Pro from $9/month. Team from $29/month." + "See full pricing →" button.

---

## Rules for Working on This Codebase

1. **Read the file fully before editing it** — never edit blind
2. **Only implement changes from the Planned Changes list above** — nothing else without approval
3. **Text changes go in `content/copy.js` only** — never hardcode text in components
4. **Style changes go in `styles/globals.css`** — use CSS variables, not inline styles
5. **Never rewrite a working component** — make targeted edits only
6. **Never change the logo or favicon** — these are brand assets, do not touch them
7. **Run `npm run build` locally before pushing** — catch errors before Vercel does
8. **The brand color is `#C8FF00`** — use `var(--color-accent)` in components
9. **Check the live site before and after every change** — passgeni.ai is the source of truth
10. **One change per commit** — do not bundle multiple planned changes into one commit
