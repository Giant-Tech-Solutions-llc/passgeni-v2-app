# PassGeni V2

**Live site:** https://passgeni.ai
**Staging:** https://passgeni-v2-app.vercel.app
**Stack:** Next.js 14.2.5 · React 18 · Supabase · Paddle · Resend · Gemini AI

---

## What PassGeni Is

PassGeni is a free AI-powered password generator. It generates strong, memorable passwords seeded by the user's profession. A doctor gets medical vocabulary patterns. A developer gets tech-adjacent patterns. Generation runs 100% client-side via `crypto.getRandomValues()` — nothing is sent to any server, ever.

**Core promise:** Zero storage. Zero knowledge. Zero account required.

---

## Repository Structure

```
Passgeni-v2/
└── passgeni-frontend/          ← Next.js app (ROOT DIRECTORY for Vercel)
    ├── pages/                  ← Next.js pages (file-based routing)
    │   ├── index.js            ← Homepage
    │   ├── pricing.js          ← /pricing page
    │   ├── creator.js          ← /creator influencer dashboard (auth-gated)
    │   └── api/
    │       ├── auth/[...nextauth].js   ← Magic link auth via Resend
    │       ├── generate.js             ← Password generation API (Gemini)
    │       ├── paddle/
    │       │   ├── webhook.js          ← Paddle billing events handler
    │       │   └── checkout.js         ← Checkout session creator
    │       └── dashboard/
    │           └── creator-stats.js    ← Creator referral stats API
    ├── components/
    │   ├── layout/
    │   │   ├── Header.js       ← Fixed nav with mega menu (Tools + Guides)
    │   │   └── Footer.js       ← Footer with links and trust chips
    │   ├── sections/
    │   │   ├── Hero.js         ← Hero section with typewriter password capsule
    │   │   ├── GeneratorSection.js  ← Main password generator UI
    │   │   ├── HowItWorks.js   ← 3-step explainer
    │   │   ├── Features.js     ← Feature cards grid
    │   │   ├── ToolsPreview.js ← 6 tools preview cards
    │   │   ├── Testimonials.js ← Scrolling testimonials
    │   │   ├── Pricing.js      ← Pricing section (homepage inline)
    │   │   ├── FAQ.js          ← FAQ accordion
    │   │   ├── Waitlist.js     ← Team API CTA section
    │   │   └── index.js        ← Barrel exports for all sections
    │   └── ui/
    │       └── index.js        ← Shared UI primitives (Headline, etc.)
    ├── content/
    │   └── copy.js             ← ⭐ ALL WEBSITE TEXT LIVES HERE
    ├── lib/
    │   ├── paddle.js           ← Paddle billing client + webhook verification
    │   ├── auth/
    │   │   └── adapter.js      ← Supabase NextAuth adapter
    │   ├── db/
    │   │   └── client.js       ← Supabase DB helpers (findCustomerByEmail etc.)
    │   ├── gemini.js           ← Gemini AI client (profession-aware seeding)
    │   ├── generator.js        ← Client-side password generation logic
    │   ├── strength.js         ← Password DNA Score calculator
    │   └── email/              ← Resend email templates
    ├── styles/
    │   └── globals.css         ← CSS variables, animations, base styles
    ├── public/                 ← Static assets (favicon, og-image, brand)
    ├── seo/
    │   └── schema.js           ← JSON-LD schema generators
    └── next.config.js          ← Next.js config (eslint/ts errors ignored in build)
```

---

## The Golden Rule for AI Assistants

**Before editing ANY file, read it in full first.**
**Never rewrite a file. Make surgical changes only.**
**If a file is longer than 50 lines, show a diff before committing.**

---

## Design System

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `--accent` / `--bg-lime` | `#C8FF00` | Primary CTA buttons, highlights, icons |
| `--bg` | `#080808` | Page background |
| `--text` | `#F0F0F0` | Primary text |
| `--muted` | `#888888` | Secondary text |
| `--muted-2` | `#555555` | Tertiary text |

### Typography
| Variable | Font | Usage |
|---|---|---|
| `--font-heading` | Space Grotesk | Headlines, card titles |
| `--font-body` | DM Sans | Body copy, labels, nav |

### Key CSS Classes
- `.btn-primary` — Lime background, black text CTA button
- `.btn-ghost` — Outlined button with lime border
- `.bc` — Base card style (dark bg, lime border)
- `.bc-a` — Animated card (hover lift)
- `.bc-feat` — Featured card (brighter border)
- `.gen-capsule` — The live password display pill
- `.hero-section` — Full-height hero with grid background
- `.section-header` — Centered section title block
- `.grid-cards` — Responsive 3-column card grid
- `.eyebrow` — Small uppercase label above headlines

### Logo
The PassGeni logo is an SVG lock icon with lime fill. It exists in:
- `public/favicon.ico` and `public/icon.svg` — browser tab icon
- Rendered inline in `Header.js` as an SVG — **do not change this SVG**
- The wordmark is "Pass**G**eni" where the G is `color: var(--accent)`

---

## Content / Copy System

**All website text is in one file: `content/copy.js`**

Edit text there and it updates everywhere automatically. No need to touch component files for copy changes.

Key exports:
- `HERO` — Badge, headline, subheadline, trust points, CTA labels
- `HOW_IT_WORKS` — 3 steps
- `FEATURES` — 8 feature cards
- `TOOLS_PREVIEW` — 6 tool cards
- `PRICING` — Plan names, prices, features (Free / Team / Enterprise)
- `TESTIMONIALS` — 50+ testimonials with name, role, stars, text
- `FAQ` — 8 Q&A items
- `WAITLIST` — Team API CTA section
- `FOOTER` — Links, copyright, trust chips

---

## Pricing & Free Tier Logic

### Free Tier Limits (enforced client-side + IP-rate-limited)
| Feature | Free limit |
|---|---|
| Passwords per day | 15 (IP-restricted, 24h reset) |
| Profession seeds | All — but max 5/day |
| Password DNA Score | 1 per day |
| Post-Quantum mode | **1 per day** — then locked with upgrade prompt or social share unlock |
| Passphrase mode | 3 per day |

### Social Share Unlock (trust-based, no OAuth)
When free limit hit, user sees:
- Share on X → +15 passwords / 24h
- Share on LinkedIn → +15 passwords / 24h  
- Both → +35 passwords / 48h

This is an honour system ("I shared it" button) — no API verification needed at this stage.

### Paid Plans
| Plan | Price | Key unlocks |
|---|---|---|
| Pro | $9/month · $89/year | 150/day, full DNA Score, Breach Checker, Bulk 25 |
| Team | $29/month · $249/year | Unlimited, all compliance presets, REST API 5k/day, 5 seats, all tools |
| Enterprise | Custom | Unlimited API, SSO, on-prem, Paddle invoice |

### Paddle Price IDs (already in Vercel env vars)
```
PADDLE_PRODUCT_PRO_MONTHLY   = pri_01kneap9by4pxq4s8x0hymq70g
PADDLE_PRODUCT_PRO_ANNUAL    = pri_01kneb3qqefd5gxkbcsya31j6g
PADDLE_PRODUCT_TEAM_MONTHLY  = pri_01kneb9db50m6aac1fnm2qz03r
PADDLE_PRODUCT_TEAM_ANNUAL   = pri_01knebcwb2bpwp8aya2gbj8anm
```

---

## AI Model

- Primary model: `gemini-2.5-flash` (standard generation)
- Fallback/lite: `gemini-2.5-flash-lite` (profession seed lookups)
- Hybrid routing: lite for standard generation, full model for compliance presets + custom profession

---

## Auth

- Provider: NextAuth v4 with magic link (email only, no passwords)
- Email sender: Resend (`hello@passgeni.ai`)
- Session: JWT (stateless)
- DB adapter: Custom Supabase adapter at `lib/auth/adapter.js`
- User data stored in Supabase `profiles` table

### Supabase `profiles` table schema
```sql
id                      UUID (FK to auth.users)
email                   TEXT
plan_type               TEXT  -- 'free' | 'pro' | 'team' | 'enterprise'
plan_status             TEXT  -- 'active' | 'trialing' | 'past_due' | 'canceled'
paddle_subscription_id  TEXT
paddle_price_id         TEXT
paddle_customer_id      TEXT
trial_end               TIMESTAMPTZ
next_billing_at         TIMESTAMPTZ
is_creator              BOOLEAN DEFAULT false
creator_ref_code        TEXT
creator_access_expiry   TIMESTAMPTZ
created_at              TIMESTAMPTZ
updated_at              TIMESTAMPTZ
```

---

## Vercel Deployment

- **Project:** `passgeni-v2-app` (ID: `prj_VEAZ4S4AlUXPSxRSWPxu0tjuqtCU`)
- **Repo:** `Giant-Tech-Solutions-llc/Passgeni-v2`
- **Root directory:** `passgeni-frontend` ← critical, must stay set
- **Framework:** Next.js (auto-detected)
- **Production domain:** `passgeni.ai`
- Auto-deploys on every push to `main`

### Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_URL
NEXTAUTH_SECRET
RESEND_API_KEY
GEMINI_API_KEY
PADDLE_API_KEY
PADDLE_WEBHOOK_SECRET
PADDLE_PRODUCT_PRO_MONTHLY
PADDLE_PRODUCT_PRO_ANNUAL
PADDLE_PRODUCT_TEAM_MONTHLY
PADDLE_PRODUCT_TEAM_ANNUAL
```

---

## Homepage Section Order

1. Hero (typewriter capsule, single CTA, trust chips)
2. Generator (profession selector, compliance presets, DNA Score)
3. How It Works (3 steps)
4. Features (8 cards)
5. Tools Preview (6 tools, Free/Team badges)
6. Testimonials (scrolling marquee, 50+ cards)
7. Blog (3 latest posts)
8. FAQ (accordion)
9. Waitlist / Team API CTA (email subscribe + pricing teaser)

**PricingSection is NOT on the homepage.** Pricing lives at `/pricing` only. Homepage has a 2-line teaser with "See full pricing →" link.

---

## Creator / Influencer System

- Dashboard at `/creator` (requires `is_creator: true` in Supabase profiles)
- Give creator access via SQL:
```sql
UPDATE profiles SET
  is_creator = true,
  creator_ref_code = 'NAME',
  creator_access_expiry = NOW() + INTERVAL '60 days',
  plan_type = 'team'
WHERE email = 'influencer@email.com';
```
- Referral tracking in `referral_stats` table (ref_code, clicks, signups, paid_conversions)
- Creator coupon codes in Paddle: 100% off Team Monthly, 90 days, one per influencer

---

## Rules for AI Assistants Working on This Codebase

1. **Read before writing.** Read the full file before changing anything.
2. **Never replace a working component.** Add to it, don't rewrite it.
3. **Copy changes go in `content/copy.js` only.** Don't hardcode text in components.
4. **Design changes need a screenshot first.** Look at the live site before deciding what to change.
5. **The logo is untouchable.** Never change the PassGeni SVG logo or favicon.
6. **One file per task.** Don't change multiple files when one will do.
7. **Always check the build before moving on.** A deployed site that is broken is worse than no change at all.
8. **The brand color is `#C8FF00`.** Use CSS variable `var(--accent)` in components.
9. **Do not add extra blinking dots, extra capsules, or extra UI elements** unless explicitly asked.
10. **Free tier Post-Quantum limit = 1 per day.** After that, show a lock with upgrade CTA or social share option.
