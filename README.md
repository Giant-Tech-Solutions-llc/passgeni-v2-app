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

## PLANNED CHANGES

> Implement in order. One change per commit. Read the target file in full before touching it. Do not implement anything not on this list without explicit owner approval.

---

### PHASE 1 — NEW FEATURES

---

#### Feature 1.1 — Post-Quantum: 1 free use per day with upgrade popup

**Files to read first:** `components/generator/GeneratorWidget.js`, `components/generator/ComplianceBar.js`

**Behaviour:**

Free users get exactly 1 Post-Quantum generation per day. After the 1st use, the Post-Quantum button shows a 🔒 lock icon, is disabled, and a small popup appears anchored below it.

**Popup design:**

Small card, `background: #0a0a0c`, `border: 1px solid #1e1e1e`, `border-radius: 10px`, `padding: 16px 18px`, `max-width: 280px`. Appears with a subtle fade-in.

**Popup copy (do not change the tone or structure):**

```
⚛️  That's your Post-Quantum password for today.

Come back tomorrow, or unlock it right now.

[Upgrade to Pro →]
─────────────────────────────
Or keep it free — share PassGeni:
[𝕏 Share on X  +15 passwords]   [in Share on LinkedIn  +15 passwords]
```

- "Upgrade to Pro →" — `font-weight: 700`, `color: #C8FF00`, links to `/pricing#pro`, no button styling — just a bold hyperlink
- "Share on X" and "Share on LinkedIn" — small pill buttons, `background: rgba(200,255,0,0.06)`, `border: 1px solid rgba(200,255,0,0.15)`, `color: #C8FF00`, `font-size: 12px`, `border-radius: 100px`, `padding: 6px 14px`
- The separator line and "Or keep it free" text — `color: #333`, `font-size: 11px`

**Gemini-generated share copy (unique every click):**

Before opening any share URL, call `POST /api/generate-share-copy` with `{ platform: "twitter" | "linkedin" }`. This API route calls Gemini and returns a unique post copy. Then open the share URL with that copy encoded.

Create `pages/api/generate-share-copy.js`:
- Calls `lib/gemini.js` with a prompt
- Returns `{ copy: "..." }`

**Gemini prompt for Twitter/X:**
```
Write a single casual Twitter/X post about using PassGeni (passgeni.ai) to generate a Post-Quantum password.
Rules:
- Sound like a real person, not a brand — conversational, genuine, slightly surprised or impressed
- Mention @PassGeniAI naturally somewhere
- Max 220 characters
- Max 2 hashtags (only use #CyberSecurity or #PasswordSecurity if they fit naturally — do not force them)
- Vary the angle every time: could be technical credibility, NIST mention, "didn't know this existed", daily use, compliance, etc.
- Do not use exclamation marks more than once
- Do not start with "Just"
Output only the post text, nothing else.
```

**Gemini prompt for LinkedIn:**
```
Write a short LinkedIn post about using PassGeni (passgeni.ai) to generate a Post-Quantum password.
Rules:
- 3 short paragraphs max
- First line must stop the scroll — a sharp observation or specific insight, not a generic hook
- Professional but human — no corporate jargon, no "excited to share"
- Mention one specific angle: compliance, DevOps, healthcare, finance, or general security
- End with a genuine question or observation that invites a response
- Include passgeni.ai as a plain URL in the last paragraph
- Vary the profession angle and opening every time
Output only the post text, nothing else.
```

Twitter share URL: `https://twitter.com/intent/tweet?text=ENCODED_COPY`
LinkedIn share URL: `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fpassgeni.ai`

On click: open URL in new tab, then immediately unlock +15 passwords for 24h.

**localStorage keys:**
- `pq_used_date` — `YYYY-MM-DD` of the day the free use was consumed
- `pq_unlocked_until` — UTC timestamp (ms) when the share-unlock expires

**Reset logic:** On each render compare `pq_used_date` to today. If different day, clear both keys. Compare `Date.now()` to `pq_unlocked_until` — if expired, restore the lock.

**Pro and Team users:** No limit, no lock, no popup.

---

#### Feature 1.2 — Pricing: dedicated `/pricing` page

**File to create:** `pages/pricing.js`

**Do NOT add any pricing section or pricing teaser anywhere on the homepage.**

**The `/pricing` page must contain:**

**1. Billing toggle** — pill switcher Monthly / Annual. Annual saves 17% on Pro, 28% on Team. State in `useState`. CSS transition on the active pill background.

**2. 4 plan cards:**

| Plan | Monthly | Annual | Trial |
|---|---|---|---|
| Free | $0 | $0 | None |
| Pro | $9 | $89/yr | None |
| Team ⭐ Most Popular | $29 | $249/yr | 14 days free — no card |
| Enterprise | Custom | Custom | None |

Free: 15 passwords/day, all profession seeds (5/day limit), passphrase mode, basic strength meter, DNA Score 1/day, Post-Quantum 1/day, zero data retention, Secure Password Sharing only.

Pro adds: 150/day, all seeds + custom AI, unlimited DNA Score, password history (last 20), bulk 25, Breach Checker, Strength Checker, unlimited Secure Sharing.

Team adds: unlimited generation, all 8 seeds + custom vocabulary, all compliance presets (HIPAA · PCI-DSS · SOC 2 · ISO 27001 · NIST · DoD · Post-Quantum), bulk 500, REST API 5,000/day, CSV export, 5 seats, all 6 tools, rotation reminders, priority support.

Enterprise: everything in Team + unlimited API, unlimited seats, SSO/SAML, on-prem, dedicated Slack, custom SLA, Paddle invoice.

**3. Paddle checkout links (env vars):**
```
PADDLE_PRODUCT_PRO_MONTHLY   → pri_01kneap9by4pxq4s8x0hymq70g
PADDLE_PRODUCT_PRO_ANNUAL    → pri_01kneb3qqefd5gxkbcsya31j6g
PADDLE_PRODUCT_TEAM_MONTHLY  → pri_01kneb9db50m6aac1fnm2qz03r
PADDLE_PRODUCT_TEAM_ANNUAL   → pri_01knebcwb2bpwp8aya2gbj8anm
```
Link format: `/auth/signin?callbackUrl=/checkout?plan=pro&billing=monthly`

**4. Full feature comparison table** — rows = features, columns = Free / Pro / Team. ✓ in `#C8FF00` for included, — for not included.

**5. 8 FAQ accordion items:**
- Can I cancel anytime?
- Is the 14-day Team trial really free?
- What payment methods do you accept?
- Can I upgrade from Pro to Team later?
- Is there an annual discount?
- Do you store passwords on the server?
- What compliance presets does Team include?
- What is the Password DNA Score?

**6. Bottom CTA** — "Generate Now — Free →" → `/#generator`. "Start Team Trial" → `/auth/signin?callbackUrl=/checkout?plan=team`.

---

#### Feature 1.3 — Homepage: replace Waitlist section with 2-card CTA section

**File:** `components/sections/index.js` (WaitlistSection) and `pages/index.js`

Replace the Waitlist section with two side-by-side cards. No pricing content in this section.

**Card 1 — Weekly Security Digest**
- Eyebrow label: `STAY SHARP` — `color: #C8FF00`, `font-size: 10px`, `letter-spacing: 0.14em`
- Heading: "One security insight. Every week."
- Body: "Breach alerts, compliance shifts, and one thing you can act on. That's it. No noise."
- Email input + "Subscribe →" button
- On submit: `POST /api/waitlist` with `{ email, type: "digest" }`
- Success state: ✓ icon + "You're in. See you next week." in `#C8FF00`
- Below form: "No spam. No selling your email. Unsubscribe in one click." — `color: #444`, `font-size: 11px`, PassGeni font stack

**Card 2 — Free Compliance Cheat Sheet PDF**
- Eyebrow label: `FREE DOWNLOAD` — same style as above
- Heading: "HIPAA + PCI-DSS in two minutes."
- Body: "The exact password requirements for both standards on one page. Used by compliance teams as a desk reference during audits."
- Button: "Download free PDF →" — opens `/downloads/passgeni-hipaa-pcidss-cheatsheet.pdf` in new tab. No email, no signup.
- Below button: "Instant download. No signup. No email." — same small style

**PDF file** must be placed at `public/downloads/passgeni-hipaa-pcidss-cheatsheet.pdf`

**PDF contents and design:**
- Dark background `#060608`
- PassGeni logo top-left in full colour
- PassGeni wordmark watermark centred behind content at `opacity: 0.04` (low opacity, brand only)
- Title: "HIPAA + PCI-DSS Password Requirements" — Outfit 800, white
- Subtitle: "Quick reference for compliance teams · passgeni.ai" — `#888`
- Two columns (HIPAA left, PCI-DSS right), separated by a `#1a1a1a` vertical rule
- Each column: table with 3 cols — Requirement / Rule / PassGeni Setting
- HIPAA rows: Min length (12 chars / Slider → 12+), Complexity (Upper+lower+num+symbol / All ON), History (Last 6 / History panel), Max age (90 days / Rotation reminder), No dictionary words (Enforced / AI seeding auto)
- PCI-DSS v4.0 rows: Min length (12 chars / Slider → 12+), Complexity (Upper+lower+num+symbol / All ON), History (Last 4 / History panel), Max age (90 days / Rotation reminder), No dictionary words (Enforced / AI seeding auto)
- Each column footer note: "PassGeni [HIPAA/PCI-DSS] preset auto-configures all of the above." in `#C8FF00`, 10px
- Bottom strip: `background: #0a0a0c`, "Generated with passgeni.ai · Free compliance tools for security teams" — centred, `#555`, 10px

---

#### Feature 1.4 — Navigation: mega menu for Tools and Guides

**File:** `components/layout/Header.js`

Add hover mega menus to "Tools" and "Guides" nav items only.

**Tools mega menu — 4 columns:**

| Security | Analysis | Business | Utility |
|---|---|---|---|
| Breach Checker | Password Strength Checker | Password Policy Generator 🏢 | WiFi QR Generator 🏢 |
| Secure Password Sharing | Password Audit Tool 🏢 | | |

Each item: label white 13px bold, description `#555` 11px. Hover: `background: rgba(200,255,0,0.05)`, `border-radius: 8px`. 🏢 badge: `background: rgba(255,255,255,0.06)`, `color: #666`, `font-size: 9px`, `border-radius: 100px`, `padding: 2px 7px`.

Footer: "New to PassGeni? Start with the generator →" → `/#generator`.

**Guides mega menu — 3 columns:**

| Compliance | By Profession | Fundamentals |
|---|---|---|
| HIPAA Password Requirements | Doctors & Healthcare | What is Password Entropy |
| PCI-DSS v4.0 Guide | Developers & DevOps | Passphrase vs Password |
| SOC 2 Requirements | Finance & Legal | Zero-Knowledge Security |
| ISO 27001 Controls | Educators & HR | Post-Quantum Passwords |
| NIST 800-63B Plain English | | |
| DoD / Gov Requirements | | |

Footer: "Browse all guides →" → `/guides`.

**Dropdown style:** `background: rgba(8,8,10,0.98)`, `border: 1px solid rgba(200,255,0,0.1)`, `border-radius: 12px`, `backdrop-filter: blur(20px)`, `box-shadow: 0 24px 64px rgba(0,0,0,0.6)`.

**Interaction:** Opens on `mouseenter`. Stays open when cursor moves into dropdown. Closes 200ms after `mouseleave` of entire dropdown area. Closes on `Escape`. Mobile (below 900px): accordion inside hamburger drawer, not hover.

---

#### Feature 1.5 — Navigation: remove "Try Free", add conditional "Dashboard" button

**File:** `components/layout/Header.js`

**Remove:** The "TRY FREE" button from the navbar entirely.

**Replace with conditional rendering using `useSession()` from `next-auth/react`:**
- **Logged out:** Show only "Sign In" link. No second button.
- **Logged in:** Show "Dashboard →" button. Links to `/dashboard`. Same visual style as the removed "TRY FREE" button (`#C8FF00` background, black text, same padding).
- **Loading:** Show nothing (no flash of wrong state).

---

#### Feature 1.6 — Testimonials: 3 featured static cards on homepage

**File:** `components/sections/Testimonials.js` or `components/sections/index.js` (TestimonialsSection)

Replace the scrolling marquee on the homepage with 3 static featured cards.

**Layout:** 2 cards top row, 1 card centred bottom row. Max width 860px, centred.

**The 3 cards — exact text from `content/copy.js` TESTIMONIALS.items:**
1. James K. — Sys admin — "ISO 27001 preset in PassGeni saved my team..."
2. Pia R. — Dentist, private practice — "I generate all my practice management software passwords with PassGeni on HIPAA mode..."
3. Mei L. — Nurse practitioner — "HIPAA preset gave me exactly the right password policy without reading a 40-page document..."

**Card style:** `background: #0a0a0c`, `border: 1px solid #1e1e1e`, `border-radius: 14px`, `padding: 28px`. Stars ★★★★★ in `#C8FF00` 13px. Name bold white 15px. Role `#555` 12px. Quote `#aaa` 14px italic, `line-height: 1.8`. Hover: border `rgba(200,255,0,0.18)`, `translateY(-3px)`, transition 0.2s.

---

#### Feature 1.7 — FAQ: add 3 new questions

**File:** `content/copy.js` — FAQ.items array only. Append to end. Do not remove or edit existing items.

```js
{
  question: "Can I use PassGeni on my phone?",
  answer: "Yes. PassGeni is fully responsive and works in any modern mobile browser. No app download required. Open passgeni.ai and start generating."
},
{
  question: "What happens if I forget my password?",
  answer: "PassGeni does not store your passwords — which means we cannot recover them. That is by design. We recommend storing the passwords PassGeni generates in a password manager like Bitwarden or 1Password."
},
{
  question: "Is PassGeni really free? What is the catch?",
  answer: "Genuinely free — 15 passwords per day, no account required, no ads, no tracking. We make money from Pro ($9/month) and Team ($29/month) plans for users who need higher limits, compliance presets, and API access. No catch."
}
```

---

### PHASE 2 — ANIMATIONS & PREMIUM FEEL

> Install framer-motion before starting: `npm install framer-motion`
> Use `motion` components only — not CSS `animation` or `transition` for anything in this phase.
> All animations must respect `prefers-reduced-motion`.
> Do not animate anything not listed here.

---

#### Animation 2.1 — Hero: staggered entrance on page load

**File:** `components/sections/Hero.js`

| Element | Delay | Animation |
|---|---|---|
| Badge pill | 0s | opacity 0→1, y 20→0 |
| H1 headline | 0.15s | opacity 0→1, y 24→0 |
| Password capsule | 0.3s | opacity 0→1, y 20→0 |
| Trust points row | 0.45s | opacity 0→1, y 16→0 |
| CTA button | 0.55s | opacity 0→1, scale 0.95→1 |
| Trust chips row | 0.65s | opacity 0→1 |

All: `duration: 0.5`, `ease: "easeOut"`.

---

#### Animation 2.2 — Scroll reveal for all sections

**Files:** `components/sections/index.js` — HowItWorks, FeaturesSection, ToolsPreview, TestimonialsSection, FAQSection

Section headings: `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 30 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.6, ease: "easeOut" }}`.

Grid cards: each card `delay: index * 0.1`, `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `transition={{ duration: 0.4, ease: "easeOut" }}`.

Do not animate the hero or the generator widget.

---

#### Animation 2.3 — Generator: password reveal on generation

**File:** `components/generator/PasswordDisplay.js`

`AnimatePresence` with password value as `key`:
- Exit: `opacity: 1→0`, `y: 0→-4`, duration 0.15s
- Enter: `opacity: 0→1`, `y: 4→0`, duration 0.25s

Strength bar: animate width 0→current, duration 0.4s `easeOut`.
Entropy number: count up 0→value using `useMotionValue` + framer-motion `animate()`, duration 0.5s.

---

#### Animation 2.4 — Buttons: hover and press micro-interactions

Applies to all `.cta-primary` and ghost buttons sitewide. Use `motion.a` or `motion.button`:
- Primary: `whileHover: { scale: 1.03, boxShadow: "0 0 24px rgba(200,255,0,0.35)" }`, `whileTap: { scale: 0.97 }`, `transition: { duration: 0.2 }`
- Ghost: `whileHover: { scale: 1.02 }`, `whileTap: { scale: 0.98 }`, `transition: { duration: 0.2 }`

---

#### Animation 2.5 — Header: scroll-driven background + progress bar

**File:** `components/layout/Header.js`

Use `useScroll()` + `useTransform()`:
- Header `backgroundColor`: `rgba(6,6,8,0)` → `rgba(6,6,8,0.95)` as `scrollY` 0→80
- Header `backdropFilter`: `blur(0px)` → `blur(20px)` same range

Scroll progress bar: `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `height: 2px`, `zIndex: 9999`. `motion.div` with `scaleX: scrollYProgress`, `transformOrigin: "0%"`. Color `#C8FF00`, `boxShadow: 0 0 6px rgba(200,255,0,0.5)`.

---

#### Animation 2.6 — FAQ: animated accordion

**File:** FAQ component

Answer in `AnimatePresence`:
- Enter: `initial={{ height: 0, opacity: 0 }}`, `animate={{ height: "auto", opacity: 1 }}`, `transition={{ duration: 0.3, ease: "easeOut" }}`
- Exit: `exit={{ height: 0, opacity: 0 }}`, `transition={{ duration: 0.25 }}`

`+` icon: `motion.span` with `animate={{ rotate: isOpen ? 45 : 0 }}`, `transition={{ duration: 0.2 }}`.

---

#### Animation 2.7 — Compliance preset: selection feedback

**File:** `components/generator/ComplianceBar.js`

Each button: `motion.button`, `whileTap={{ scale: 0.96 }}`. Active: `animate={{ boxShadow: "0 0 12px rgba(200,255,0,0.3)" }}`. Inactive: `animate={{ boxShadow: "0 0 0px rgba(200,255,0,0)" }}`. Duration 0.3s.

---

#### Animation 2.8 — Page transitions

**File:** `pages/_app.js`

`AnimatePresence mode="wait"` wrapping `<Component />`. `motion.div` with `router.pathname` as `key`:
- Enter: `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.35, ease: "easeOut" }}`
- Exit: `exit={{ opacity: 0, y: -8 }}`, `transition={{ duration: 0.2 }}`

---

#### Animation 2.9 — Mobile menu: slide-down with staggered links

**File:** `components/layout/Header.js`

`AnimatePresence` on drawer:
- Enter: `initial={{ opacity: 0, y: -16 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.3, ease: "easeOut" }}`
- Exit: `exit={{ opacity: 0, y: -10 }}`, `transition={{ duration: 0.2 }}`

Each link: `motion.a`, `initial={{ opacity: 0, x: -10 }}`, `animate={{ opacity: 1, x: 0 }}`, `transition={{ delay: index * 0.05 }}`.

Hamburger bars: `motion.span` lines animate `rotate` + `y` to form an X when open.

---

#### Animation 2.10 — Testimonial cards: hover lift

**File:** `components/TestimonialsSection.js`

Each card: `motion.article`, `whileHover: { y: -4, borderColor: "rgba(200,255,0,0.25)" }`, `transition: { duration: 0.2 }`. Default border stays CSS. Marquee stays CSS.

---

## Rules for Working on This Codebase

1. **Read the file fully before editing it** — never edit blind
2. **Do phases in order** — do not start Phase 2 until Phase 1 is verified working on passgeni.ai
3. **One change per commit** — never bundle multiple changes into one commit
4. **Text changes go in `content/copy.js` only** — never hardcode text in components
5. **Never rewrite a working component** — make targeted edits only
6. **Never change the logo or favicon** — brand assets, do not touch
7. **Run `npm run build` locally before pushing** — catch errors before Vercel does
8. **Check passgeni.ai after every commit** — confirm nothing broke
9. **Brand color is `#C8FF00`** — use `var(--color-accent)` in components
10. **One change per commit** — no bundling
