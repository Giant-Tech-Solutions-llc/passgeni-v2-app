# PassGeni V2 — Next.js Setup Guide

## Quick Start

### 1. Copy files to your local machine
Download and extract to your project folder, replacing the old `passgeni-frontend` folder.

### 2. Install dependencies
```bash
cd passgeni
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:
```
RESEND_API_KEY=your_resend_api_key_here
RESEND_AUDIENCE_ID=your_resend_audience_id_here
TEAM_API_KEYS=key1,key2,key3
```

**Never commit `.env.local` to Git.**

In Vercel dashboard → Settings → Environment Variables, add the same three variables.

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 5. Deploy to Vercel
```bash
npx vercel --prod
```

---

## Project Structure — Where To Find Everything

```
passgeni/
│
├── content/                    ← EDIT TEXT HERE
│   ├── copy.js                 ← Every word on the site
│   └── professions.js          ← Profession seeds and keywords
│
├── data/                       ← Configuration
│   ├── compliance.js           ← HIPAA, PCI, SOC2 presets
│   └── characters.js           ← Character sets, word lists
│
├── lib/                        ← Business logic (no UI)
│   ├── generator.js            ← Password generation
│   └── strength.js             ← Entropy, DNA Score, crack time
│
├── components/                 ← UI building blocks
│   ├── generator/              ← Generator widget components
│   ├── layout/                 ← Header, Footer, Ticker, Logo
│   ├── sections/               ← Homepage sections
│   └── ui/                     ← Buttons, chips, strength bar
│
├── pages/                      ← Next.js pages (URLs)
│   ├── index.js                ← Homepage (passgeni.ai)
│   ├── guides/                 ← Guide pages
│   ├── blog/                   ← Blog pages
│   ├── tools/                  ← Tool pages
│   └── api/                    ← API routes
│       ├── waitlist.js         ← Email capture
│       └── v1/generate.js      ← Password generation API
│
├── styles/
│   └── globals.css             ← All styles + design tokens
│
└── seo/
    └── schema.js               ← Schema.org structured data
```

---

## How To Edit Content Without Technical Knowledge

### Change any text on the site
Open `content/copy.js` — every headline, button label, and body copy is here. Change the text and save. Done.

### Add a new profession
Open `content/professions.js` — add a new entry to `PROFESSION_KEYWORD_MAP`:
```js
yourprofession: ["seedword1", "seedword2"],
```

### Change pricing
Open `content/copy.js` — find the `PRICING` section. Edit plan names, prices, features.

### Add a compliance preset
Open `data/compliance.js` — copy an existing preset and customize it.

### Change colors or fonts
Open `styles/globals.css` — edit the `:root` CSS variables at the top.

---

## Environment Variables Reference

| Variable             | Required | Description                        |
|----------------------|----------|------------------------------------|
| RESEND_API_KEY       | Yes      | From resend.com dashboard          |
| RESEND_AUDIENCE_ID   | No       | Your Resend audience/list ID       |
| TEAM_API_KEYS        | No       | Comma-separated team API keys      |

---

## Deployment Checklist

- [ ] `npm install` completed
- [ ] `.env.local` created with Resend API key
- [ ] Environment variables added to Vercel
- [ ] `npm run build` succeeds locally
- [ ] `npx vercel --prod` deployed
- [ ] Verify waitlist form sends emails
- [ ] Verify password generator works
- [ ] Verify API endpoint responds: `POST /api/v1/generate`
