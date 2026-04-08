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

Key exports: `SITE`, `NAV`, `HERO`, `HOW_IT_WORKS`, `FEATURES`, `TOOLS_PREVIEW`, `PRICING`, `TESTIMONIALS`, `FAQ`, `WAITLIST`, `FOOTER`, `TICKER_ITEMS`, `STATS`, `GENERATOR`

---

## Generator Architecture

- `GeneratorWidget.js` — All state (tab, profession, length, opts, compliance, quantumMode, language, password, history, panels)
- `ComplianceBar.js` — Preset buttons (HIPAA, PCI-DSS, SOC2, ISO27001, DoD, Post-Quantum)
- `lib/generator.js` — `buildPassword`, `buildPassphrase`, `deriveSeeds`, `generateAuditRecord`
- `lib/strength.js` — `getStrength`, `getEntropy`, `getCrackTime`, `getDNAScore`
- `data/compliance.js` — `COMPLIANCE_PRESETS` object

---

## Auth

- Magic link via Resend from `hello@passgeni.ai`
- JWT sessions (stateless)
- Custom Supabase adapter at `lib/auth/`

---

## Database — Supabase

```sql
profiles (
  id UUID, email TEXT, plan_type TEXT, plan_status TEXT,
  paddle_subscription_id TEXT, paddle_price_id TEXT, paddle_customer_id TEXT,
  trial_end TIMESTAMPTZ, next_billing_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ
)
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
- **Framework:** Next.js · **Domain:** `passgeni.ai`
- Auto-deploys on every push to `main`

---

## PLANNED CHANGES FOR CLAUDE CODE

> Implement these in order. One change per commit. Read the target file in full before touching it. Do not implement anything not on this list without explicit approval from the owner.

---

### PHASE 1 — BUG FIXES (do these first, nothing else)

#### Fix 1.1 — Sections below the fold are rendering as a black void
**What is broken:** Everything below the hero section on `passgeni.ai` is completely black — the generator, how it works, features, tools, testimonials, pricing, FAQ, waitlist sections are all invisible.
**File to read first:** `components/sections/index.js`, `pages/index.js`, `styles/globals.css`
**How to diagnose:** Open browser DevTools on passgeni.ai and look for JS errors in the console. Check if section elements exist in the DOM but have zero height, or if they are throwing a render error.
**Fix:** Identify the root cause (likely a CSS variable not defined, a component import error, or a missing export) and fix it without changing any visual design.

#### Fix 1.2 — `/pricing` page returns error
**What is broken:** `passgeni.ai/pricing` shows "This page isn't working".
**File to read first:** `pages/pricing.js` if it exists. If it does not exist, the fix is simply that the page is missing.
**Fix:** Either create a minimal `pages/pricing.js` that renders the existing `<PricingSection />` component, or fix the existing file if it has a syntax/import error.

---

### PHASE 2 — UX FIXES (after Phase 1 is confirmed working)

#### Fix 2.1 — Hero: remove duplicate blinking dot
**File:** `components/sections/Hero.js`
**What is wrong:** There are two blinking dots in the hero — one in the badge pill at the top and one added below it. Only one is allowed.
**Fix:** Keep the blinking dot in the badge pill ("FREE FOREVER · NO ACCOUNT · NO TRACKING"). Remove any other blinking dot added anywhere else in the hero. One dot total.

#### Fix 2.2 — Hero: subheadline → 3 inline trust points
**File:** `components/sections/Hero.js`
**What is wrong:** The current subheadline is a paragraph of text displayed in 3 centred lines. This does not communicate value quickly enough.
**Replace the paragraph with** 3 trust points displayed as a single horizontal row (not stacked vertically, not pill capsules — just inline with a separator):
- 🔒 Built around your profession
- ⚡ Never touches a server
- 🆓 Free — no account needed
Each emoji is `color: #C8FF00`. The text is `color: #888`. Separator between items is `·` in `color: #333`. All on one line. Wraps to multiple lines on mobile only.

#### Fix 2.3 — Hero: remove "View pricing" secondary CTA
**File:** `components/sections/Hero.js`
**Fix:** Remove the "View pricing" ghost button. Keep only the primary "GENERATE MY PASSWORD ↓" button. Nothing else.

#### Fix 2.4 — Generator: remove company logos strip
**File:** `components/sections/GeneratorSection.js`
**Fix:** Remove the `<LogosStrip />` import and usage. Do not replace it with anything.

#### Fix 2.5 — Generator: remove stats bar
**File:** `components/sections/GeneratorSection.js` or `pages/index.js`
**Fix:** Remove any "X passwords generated this week" or similar stats counter. Do not replace it with anything.

#### Fix 2.6 — Navigation: update links to match current pages
**File:** `components/layout/Header.js` and `content/copy.js` (NAV export)
**Current nav:** Features, Tools, Guides, Pricing, API, Blog
**Required nav:** Generator, Tools, Guides, Pricing, Blog
Remove "Features" (no dedicated features page) and "API" (not a primary nav item). "Generator" links to `/#generator`. Keep Sign In and TRY FREE buttons.

---

### PHASE 3 — NEW FEATURES (after Phase 2 is confirmed working)

#### Feature 3.1 — Post-Quantum: enforce 1 free use per day
**Files:** `components/generator/GeneratorWidget.js`, `components/generator/ComplianceBar.js`
**Behaviour:**
- Free users get exactly 1 Post-Quantum generation per day
- After the 1st use: the Post-Quantum toggle/button shows a lock icon 🔒 and is disabled
- Inline message appears below: "You've used your free Post-Quantum password today."
- Two unlock options shown as small text links:
  - "Share on X for +15 passwords →" — opens `https://twitter.com/intent/tweet?text=...`
  - "Share on LinkedIn for +15 passwords →" — opens LinkedIn share URL
- Clicking either link: opens share URL in new tab AND unlocks +15 passwords stored in `localStorage` with a 24h timestamp
- Limit resets at midnight — check `localStorage` timestamp on each render
- Pro and Team users: no limit, no lock, no message
- `localStorage` key: `pq_used_date` (store date as ISO string `YYYY-MM-DD`)

#### Feature 3.2 — Testimonials: 3 featured static cards on homepage
**File:** `components/sections/index.js` (TestimonialsSection) and `components/sections/Testimonials.js`
**Replace** the current scrolling marquee on the homepage with 3 static featured cards in a 2-column layout: 2 cards on the first row, 1 card centred on the second row.
**The 3 cards (exact text from copy.js TESTIMONIALS.items):**
1. James K. — IT Security Manager — "ISO 27001 preset in PassGeni saved my team..."
2. Pia R. — Dentist, private practice — "I generate all my practice management software..."
3. Mei L. — Nurse practitioner — "HIPAA preset gave me exactly the right password..."
Each card: dark background `#0a0a0c`, border `1px solid #1e1e1e`, rounded 12px, padding 24px. Stars in `#C8FF00`. Name bold white. Role muted grey. Quote in `#aaa`.

#### Feature 3.3 — FAQ: add 3 new questions
**File:** `content/copy.js` (FAQ.items array)
**Add** these 3 to the end of the existing 8 items. Do not remove any existing items:
1. Q: "Can I use PassGeni on my phone?" A: "Yes. PassGeni is fully responsive and works in any mobile browser. No app download required."
2. Q: "What happens if I forget my password?" A: "PassGeni does not store your passwords — which means we cannot recover them. Use a password manager like Bitwarden or 1Password to store the passwords PassGeni generates."
3. Q: "Is PassGeni really free? What is the catch?" A: "The free tier is genuinely free — 15 passwords per day, no account required, no ads, no tracking. We make money from Pro ($9/month) and Team ($29/month) plans."

#### Feature 3.4 — Pricing: dedicated /pricing page
**Create:** `pages/pricing.js`
**Also edit:** `pages/index.js` — remove `<PricingSection />` import and usage, replace with a 2-line pricing teaser:
```
Simple, honest pricing. Free forever · Pro from $9/month · Team from $29/month
[See full pricing →]  links to /pricing
```
**The /pricing page must include:**
- Monthly / Annual billing toggle (animated, pill style)
- 4 plan cards: Free, Pro, Team (featured/highlighted), Enterprise
- Full feature comparison table (rows = features, columns = Free / Pro / Team)
- 8 pricing FAQ questions (can I cancel, is trial really free, what payment methods, etc.)
- Bottom CTA: "Start free — no card needed" + "Start Team Trial"
**Paddle price IDs** are already set as Vercel env vars — use them in checkout links:
```
PADDLE_PRODUCT_PRO_MONTHLY   → pri_01kneap9by4pxq4s8x0hymq70g
PADDLE_PRODUCT_PRO_ANNUAL    → pri_01kneb3qqefd5gxkbcsya31j6g
PADDLE_PRODUCT_TEAM_MONTHLY  → pri_01kneb9db50m6aac1fnm2qz03r
PADDLE_PRODUCT_TEAM_ANNUAL   → pri_01knebcwb2bpwp8aya2gbj8anm
```

#### Feature 3.5 — Waitlist: replace with CTA section
**File:** `components/sections/index.js` (WaitlistSection) and `pages/index.js`
**Replace** the Waitlist section with a 2-card CTA section:
- Card 1 — Weekly Security Digest: email input + "Subscribe →" button. On submit POST to `/api/waitlist` with `{ email, type: "digest" }`. Show success state.
- Card 2 — Free Compliance Cheat Sheet PDF: button "Download free PDF →" that opens `/downloads/passgeni-hipaa-pcidss-cheatsheet.pdf` in a new tab. No email required.
Below both cards: pricing teaser text + "See full pricing →" link to /pricing.
**The PDF file** must be created at `public/downloads/passgeni-hipaa-pcidss-cheatsheet.pdf`. Content: one-page HIPAA + PCI-DSS password requirements reference card. PassGeni logo top-left. Brand colors. Two columns — HIPAA left, PCI-DSS right. Each column: a table of requirements with the PassGeni setting that satisfies them. Footer: passgeni.ai URL.

#### Feature 3.6 — Navigation: mega menu for Tools and Guides
**File:** `components/layout/Header.js`
**Tools mega menu** (opens on hover, 4 columns):
- Security: Breach Checker, Secure Password Sharing
- Analysis: Password Strength Checker, Password Audit Tool (🏢 Team)
- Business: Password Policy Generator (🏢 Team)
- Utility: WiFi QR Generator (🏢 Team)
**Guides mega menu** (3 columns):
- Compliance: HIPAA, PCI-DSS v4.0, SOC 2, ISO 27001, NIST 800-63B, DoD
- By Profession: Healthcare, Developers, Finance & Legal, Educators
- Fundamentals: Password Entropy, Passphrase vs Password, Zero-Knowledge, Post-Quantum
**Behaviour:** Opens on `mouseenter`, closes 200ms after `mouseleave` (so user can move cursor into the dropdown without it closing). Closes on `Escape` key. On mobile: mega menus become accordion items inside the hamburger drawer, not hover dropdowns.

---

### PHASE 4 — ANIMATIONS & PREMIUM FEEL

> Install `framer-motion` before starting this phase: `npm install framer-motion`
> Use `motion` components from framer-motion. Do not use CSS `animation` or `transition` for anything in this phase — use framer-motion only.
> All animations must respect `prefers-reduced-motion`. Wrap all motion components with `AnimatePresence` where needed.

#### Animation 4.1 — Page load: staggered hero entrance
**File:** `components/sections/Hero.js`
**On page load**, the hero elements animate in with a staggered `fadeInUp` sequence:
1. Badge pill: `opacity 0→1`, `y 20→0`, duration 0.5s, delay 0s
2. H1 headline: `opacity 0→1`, `y 24→0`, duration 0.6s, delay 0.15s
3. Password capsule: `opacity 0→1`, `y 20→0`, duration 0.5s, delay 0.3s
4. Trust points row: `opacity 0→1`, `y 16→0`, duration 0.4s, delay 0.45s
5. CTA button: `opacity 0→1`, `scale 0.95→1`, duration 0.4s, delay 0.55s
6. Trust chips: `opacity 0→1`, duration 0.3s, delay 0.65s
Easing: `easeOut` for all. Use `initial`, `animate`, `transition` props. Do not use `variants` unless it simplifies the code.

#### Animation 4.2 — Scroll reveal for all sections
**Files:** `components/sections/index.js`, `components/sections/HowItWorks.js`, `components/sections/Features.js`, `components/sections/ToolsPreview.js`
**Every section** that is not in the viewport on load should animate in when scrolled into view:
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Section headings: `opacity 0→1`, `y 30→0`, duration 0.6s, easing `easeOut`
- Cards in a grid: staggered `opacity 0→1`, `y 20→0`, each card 0.1s after the previous
- Do not animate the hero (already handled in 4.1) or the generator widget

#### Animation 4.3 — Generator widget: password reveal animation
**File:** `components/generator/PasswordDisplay.js`
When a new password is generated:
- The previous password fades out (`opacity 1→0`, duration 0.15s)
- The new password fades in (`opacity 0→1`, `y -4→0`, duration 0.25s) after the fade-out completes
- Use `AnimatePresence` with the password value as the `key` so framer-motion detects the change
- The strength bar animates its width from 0 to the current value over 0.4s with `easeOut`
- The entropy number counts up from 0 to its value over 0.5s (use framer-motion `useMotionValue` + `animate`)

#### Animation 4.4 — CTA button: hover and press micro-interactions
**File:** `styles/globals.css` and any component using `.cta-primary`
Replace existing CSS hover states on the primary CTA button with framer-motion `whileHover` and `whileTap`:
- `whileHover`: `scale: 1.03`, `boxShadow: "0 0 24px rgba(200,255,0,0.35)"`, transition duration 0.2s
- `whileTap`: `scale: 0.97`, transition duration 0.1s
Apply the same pattern to all `.btn-ghost` ghost buttons but with `scale: 1.02` on hover only.

#### Animation 4.5 — Navigation: header scroll transition
**File:** `components/layout/Header.js`
When the user scrolls past 20px:
- Header background animates from `transparent` to `rgba(6,6,8,0.92)` with `backdrop-filter: blur(20px)`
- Header border-bottom animates from `transparent` to `rgba(200,255,0,0.08)`
- Use framer-motion `useScroll` + `useTransform` to drive this smoothly (not a CSS class toggle)
Add a thin scroll progress bar at the very top of the viewport:
- Full-width `2px` bar, `position: fixed`, `top: 0`, `z-index: 9999`
- Color: `#C8FF00` with a subtle glow `box-shadow: 0 0 6px rgba(200,255,0,0.5)`
- Width driven by `useScroll` scroll progress (0% to 100%)

#### Animation 4.6 — Testimonials: hover lift on cards
**File:** `components/TestimonialsSection.js`
Wrap each testimonial card in a `motion.div`:
- `whileHover`: `y: -4`, `borderColor: "rgba(200,255,0,0.25)"`, transition duration 0.2s
- Default border: `rgba(255,255,255,0.06)`
The infinite marquee animation must remain CSS (not framer-motion) — only the card hover is framer-motion.

#### Animation 4.7 — FAQ: accordion open/close animation
**File:** `components/sections/index.js` or `components/sections/FAQ.js`
Wrap the answer content in `AnimatePresence`:
- On open: `height: 0→auto`, `opacity: 0→1`, duration 0.3s, easing `easeOut`
- On close: `height: auto→0`, `opacity: 1→0`, duration 0.25s
- The `+` icon rotates `0→45deg` on open, `45→0deg` on close, duration 0.2s
Use framer-motion `motion.div` with `initial`, `animate`, `exit` — not CSS transitions.

#### Animation 4.8 — Compliance preset buttons: selection animation
**File:** `components/generator/ComplianceBar.js`
When a compliance preset is selected:
- The selected button: `scale 1→1.04` pulse on click (`whileTap`), then settles with a lime glow `box-shadow: 0 0 12px rgba(200,255,0,0.3)`
- The previously selected button: glow fades out over 0.3s
- Background of selected button animates from transparent to `rgba(200,255,0,0.1)`
Use `AnimatePresence` on the selected indicator so it fades between selections.

#### Animation 4.9 — Page transitions between routes
**File:** `pages/_app.js`
Wrap the page component with `AnimatePresence` and `motion.div`:
- On route enter: `opacity 0→1`, `y 12→0`, duration 0.35s, easing `easeOut`
- On route exit: `opacity 1→0`, `y 0→-8`, duration 0.2s
Use `router.pathname` as the `key` for `AnimatePresence` so it detects route changes.
This must not affect the initial page load (hero handles its own entrance in 4.1).

#### Animation 4.10 — Mobile menu: slide-down drawer
**File:** `components/layout/Header.js` or `components/Layout.js`
Replace the existing CSS show/hide on the mobile nav drawer with framer-motion:
- On open: drawer slides down from `y: -20`, `opacity: 0→1`, duration 0.3s, easing `easeOut`
- On close: `y: 0→-10`, `opacity: 1→0`, duration 0.2s
- Each nav link inside staggers in: delay 0.05s × index
- Hamburger icon: the 3 bars animate into an X using `motion.line` or `motion.span` with `rotate` transforms

---

## COMPLIANCE CHEAT SHEET PDF — CONTENTS

The PDF at `public/downloads/passgeni-hipaa-pcidss-cheatsheet.pdf` must contain:

**Layout:** One page. Dark background (#060608). Two columns. PassGeni logo top-left. Title: "HIPAA + PCI-DSS Password Requirements" in white. Subtitle: "Quick reference for compliance teams" in #888.

**Left column — HIPAA:**
| Requirement | Rule | PassGeni |
| Min length | 8 chars (12 recommended) | Slider → 12+ |
| Complexity | Upper + lower + number + symbol | All options ON |
| History | Last 6 passwords | History panel |
| Max age | 90 days | Rotation reminder |
| No dictionary words | Enforced by AI seeding | Auto |
PassGeni HIPAA preset auto-configures all of the above.

**Right column — PCI-DSS v4.0:**
| Requirement | Rule | PassGeni |
| Min length | 12 characters | Slider → 12+ |
| Complexity | Upper + lower + number + symbol | All options ON |
| History | Last 4 passwords | History panel |
| Max age | 90 days | Rotation reminder |
| No dictionary words | Enforced by AI seeding | Auto |
PassGeni PCI-DSS preset auto-configures all of the above.

**Footer strip:** "Generated with passgeni.ai — Free compliance tools for security teams" + QR code linking to passgeni.ai

---

## Rules for Working on This Codebase

1. **Read the file fully before editing it** — never edit blind
2. **Do phases in order** — do not start Phase 2 until Phase 1 is verified working on passgeni.ai
3. **One change per commit** — never bundle multiple changes into one commit
4. **Text changes go in `content/copy.js` only** — never hardcode text in components
5. **Style changes go in `styles/globals.css`** — for Phase 4 use framer-motion, not CSS
6. **Never rewrite a working component** — make targeted edits only
7. **Never change the logo or favicon** — brand assets, do not touch
8. **Run `npm run build` locally before pushing** — catch errors before Vercel does
9. **Check passgeni.ai after every commit** — confirm nothing broke
10. **Brand color is `#C8FF00`** — use `var(--color-accent)` in components, not the hex directly
