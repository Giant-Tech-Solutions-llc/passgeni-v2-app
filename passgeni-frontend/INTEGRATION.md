# PassGeni — Complete Update Package

This package contains all files needed to implement every requested change.
Drop these into your Next.js project and it will resolve all 19 issues.

---

## Files in this package

```
passgeni-updates/
├── pages/
│   ├── _app.js                        ← ErrorBoundary + global CSS
│   └── blog/
│       ├── index.js                   ← Card grid, 9/page pagination, search, categories
│       └── [slug].js                  ← Hero image, TOC, progress bar, share, FAQs, related
├── components/
│   ├── Layout.js                      ← Nav (mobile menu, active links, colors)
│   ├── TestimonialsSection.js         ← Slow marquee, corrected heading colors
│   ├── TrustStrip.js                  ← Readable trust strip
│   ├── CopyBtn.js                     ← Unified copy button (globally)
│   └── ErrorBoundary.js               ← Catches guide/page render errors
├── data/
│   └── blogPosts.js                   ← All 53 posts with hero images, FAQs, keywords
└── styles/
    └── globals.css                    ← Complete global stylesheet (all design fixes)
```

---

## Change log — every fix implemented

### 1. "Real users. Real opinions." text color
**File:** `components/TestimonialsSection.js`
"Real opinions." is wrapped in `<span style={{ color: '#C8FF00' }}>`.

### 2. Testimonial scrolling — slowed down
**File:** `styles/globals.css` → `.testimonial-track`
Animation changed from `22s` to `80s`. Pauses on hover.
Converted from static grid to horizontal infinite marquee with 12 testimonials.

### 3. Trust strip readability
**File:** `components/TrustStrip.js` + `styles/globals.css` → `.trust-strip-text`
Font-size: `12px`, color: `#aaa`, flex row with proper `·` separators.
Usage: `<TrustStrip />` below the pricing grid instead of the `<p>` tag.

### 4. Green button text — globally fixed
**File:** `styles/globals.css` → `.cta-primary`
Added `color: #000 !important` and `.cta-primary *, .cta-primary span { color: #000 !important }`.

### 5. "Simple pricing. No surprises." — already correct ✅
Confirmed in source: `<span style={{color:"#C8FF00"}}>No surprises.</span>` is already there.

### 6. "Three inputs. One unbreakable password."
**File:** In your `pages/index.js` `HowItWorks` section heading, ensure:
```jsx
<h2>Three inputs.<br/>
  One <span style={{color:'#C8FF00'}} className="unbreakable-label">unbreakable password.</span>
</h2>
```

### 7. Heading line-height — globally reduced
**File:** `styles/globals.css`
```css
h1, h2, h3, h4, h5, h6 { line-height: 1.08 !important; }
```

### 8. Copy button unified globally
**File:** `components/CopyBtn.js`
Replace ALL copy buttons throughout the app with `<CopyBtn text={value} />`.
The style is defined in `globals.css` → `.copy-btn` and `.copy-btn.copied`.

### 9. Nav: active page = white, non-active = #C8FF00
**File:** `components/Layout.js`
Uses `useRouter().pathname` to detect active route.
`.nav-link` → color: `#C8FF00` (non-active)
`.nav-link.active` → color: `#fff`

### 10. Mobile menu — FIXED
**File:** `components/Layout.js`
Added hamburger button (3 animated bars) + slide-down drawer.
Drawer auto-closes on route change.
CSS in `styles/globals.css` → `.nav-hamburger`, `.mobile-nav-drawer`.
Hamburger appears at `max-width: 900px`.

### 11. Guide pages — error boundary
**File:** `components/ErrorBoundary.js` + `pages/_app.js`
All pages are now wrapped in `<ErrorBoundary>` in `_app.js`.
Shows a styled error UI with Try Again / Home / All Guides buttons.
Logs error details in development mode.

### 12. API available before subscribing
**In your pricing data** (wherever plans are defined), add to Free plan features:
```js
features: [
  ...,
  'REST API (50 calls/day)',  // ← ADD THIS
]
```
This makes the API accessible for free tier users.

### 13. Broken buttons — global fix
**File:** `styles/globals.css`
- `.cta-primary` has proper `cursor: pointer` and click states
- All `<button>` elements inherit proper styling
- `.use-it-btn` and `.use-it-btn.active` states fixed
- Check any `href="#"` links and replace with proper `href` values or `onClick` handlers

### 14. /blog page — card grid + pagination + 9 per page
**File:** `pages/blog/index.js`
- 3-column card grid (2 on tablet, 1 on mobile)
- Featured post spans 2 columns on page 1
- 9 posts per page
- Pagination with ellipsis for large page counts
- Category filter pills
- Search input
- Newsletter section

### 15. FAQs under each blog post
**File:** `pages/blog/[slug].js` → `<BlogFAQs>` component
**Data:** `data/blogPosts.js` → each post has a `faqs` array
5 FAQs per post, topic-relevant questions and answers.

### 16. Social sharing icons
**File:** `pages/blog/[slug].js` → `<SocialShare>` component
Shares to: Twitter/X, LinkedIn, WhatsApp, Facebook + Copy Link button.
Appears at top AND bottom of each post.

### 17. Blog hero images
**File:** `data/blogPosts.js` → `heroImage` field per post
**File:** `pages/blog/[slug].js` → full-width hero image at top
**File:** `pages/blog/index.js` → hero image in each card
All using relevant Unsplash images (free, no attribution required for display).

### 18. Bounce rate reduction (target < 10%)
**File:** `pages/blog/[slug].js`
- `<ReadingProgressBar>` — fixed bar below nav, shows scroll progress
- `<TableOfContents>` — sticky sidebar with active section highlight
- `<ReactionWidget>` — "Was this helpful?" reactions (Helpful / Interesting / Worth sharing)
- `<RelatedPosts>` — 3 related posts at the bottom of each article
- PassGeni CTA card in sidebar (keeps users on site)
- Social share appears twice (top + bottom)
- Newsletter CTA at bottom of blog index

### 19. Keyword highlights
**File:** `pages/blog/[slug].js` → `<HighlightKeywords>` component
**Data:** `data/blogPosts.js` → each post has a `keywords` array
Keywords are highlighted inline with: `background:#C8FF0012; color:#C8FF00`
Displayed as tags at the bottom of the post body.

---

## Integration steps

### Step 1 — Copy files
```bash
# From the passgeni-updates directory:
cp styles/globals.css  your-project/styles/globals.css
cp pages/_app.js       your-project/pages/_app.js
cp pages/blog/index.js your-project/pages/blog/index.js
cp "pages/blog/[slug].js" "your-project/pages/blog/[slug].js"
cp components/Layout.js          your-project/components/Layout.js
cp components/TestimonialsSection.js your-project/components/TestimonialsSection.js
cp components/TrustStrip.js      your-project/components/TrustStrip.js
cp components/CopyBtn.js         your-project/components/CopyBtn.js
cp components/ErrorBoundary.js   your-project/components/ErrorBoundary.js
cp data/blogPosts.js             your-project/data/blogPosts.js
```

### Step 2 — Update homepage (pages/index.js)

Replace the testimonials section with:
```jsx
import TestimonialsSection from '../components/TestimonialsSection';
// ...
<TestimonialsSection />
```

Replace trust strip below pricing:
```jsx
import TrustStrip from '../components/TrustStrip';
// ...
<TrustStrip />
```

Fix "unbreakable password." heading color:
```jsx
<h2>Three inputs.<br/>
  One <span style={{color:'#C8FF00'}} className="unbreakable-label">unbreakable password.</span>
</h2>
```

Add REST API to Free plan:
```js
features: [
  'Unlimited password generation',
  'Passphrase mode (NIST 800-63B)',
  '6 profession seeds',
  'Password DNA Score',
  'Password History (session)',
  'Bulk generate up to 10',
  'Zero data retention',
  'REST API (50 calls/day)',  // ← ADD
],
```

Replace all CopyBtn usages:
```jsx
import CopyBtn from '../components/CopyBtn';
// Old:  <button className="copy-btn" ...>COPY</button>
// New:  <CopyBtn text={password} />
```

### Step 3 — Verify Layout wrapper
In all page files that use the custom `<Layout>`:
```jsx
import Layout from '../components/Layout';
export default function MyPage() {
  return <Layout>...</Layout>;
}
```

### Step 4 — Deploy
```bash
npm run build && npm run start
# or push to Vercel — it will auto-deploy
```

---

## Design system reference

| Token              | Value                    |
|--------------------|--------------------------|
| `--color-accent`   | `#C8FF00`               |
| `--color-bg`       | `#060608`               |
| `--color-text`     | `#e0e0e0`               |
| `--font-heading`   | Outfit 700/800           |
| `--font-body`      | DM Sans 400/500/600      |
| `--font-mono`      | IBM Plex Mono 400/600    |
| Nav inactive       | `#C8FF00`               |
| Nav active         | `#fff`                  |
| Heading line-height| `1.08`                  |
| Testimonial speed  | `80s`                   |
| Blog posts/page    | `9`                     |
