# TODO — moje-omalovanky.cz

## Done ✅
- Frontend (Czech language, search, filters, age/category dropdowns, multi-select download/print)
- 13 categories, 100+ AI-generated coloring pages
- SEO (sitemap, robots.txt, OG tags, JSON-LD, keywords, canonical URLs, hreflang)
- Git repository (github.com/vdovi15/omalovanky)
- Deployed on Vercel (omalovanky-mu.vercel.app)
- Custom domain registered: moje-omalovanky.cz
- Image optimization via Vercel (WebP/AVIF, responsive sizes)
- Vercel Analytics added
- i18n — Czech, English, Slovak, German (all 107 page titles + UI translated)
- Middleware for domain-based locale routing (domain placeholders in place)

## Immediate next steps

### 🌍 New domains — wire up when purchased
- [ ] Buy English domain (e.g. `tiny-palette.com`)
- [ ] Buy German domain (e.g. `malvorlagen-kids.de`)
- [ ] Replace `ENGLISH_DOMAIN_PLACEHOLDER` in two files:
  - `src/middleware.ts` (two entries: www + non-www)
  - `src/lib/config.ts` (`LOCALE_DOMAINS.en`)
- [ ] Replace `GERMAN_DOMAIN_PLACEHOLDER` in same two files
- [ ] Add both domains in Vercel → Project → Domains
- [ ] Redeploy

### 🔍 SEO
- [ ] Google Search Console — register moje-omalovanky.cz, submit sitemap: https://moje-omalovanky.cz/sitemap.xml
- [ ] Once English/German domains are live — register those in Search Console too

### 🇵🇱 Polish (pl) — next language
- [ ] Buy Polish domain (e.g. `kolorowanki-dzieci.pl`)
- [ ] Add `pl` to `src/lib/i18n.ts` locales
- [ ] Create `src/i18n/pl.json` (UI strings + all 107 page titles + descriptions)
- [ ] Add `pl` domain to `src/middleware.ts` and `src/lib/config.ts`
- [ ] Add locale path entries: `browseAll: "wszystkie"`, `search: "szukaj"`
- [ ] Add Polish domain to Vercel → Domains

### 📄 Content
- [ ] Add more coloring pages for Buildings, Clothes, Jobs (only 4 each so far)

---

## Backlog

### 📊 Analytics & Tracking
- [ ] Google Analytics (GA4) — track page views, popular categories, download events
- [ ] Vercel Analytics — already available in Vercel dashboard (free), enable with one line of code
- [ ] Track key events: coloring page downloaded, printed, multi-select used, search performed
- [ ] Google Search Console — monitor which keywords bring traffic, fix crawl errors

### 💬 User Engagement — Suggestion Feature
- [ ] "Navrhni obrázek" (Suggest an image) section on homepage
- [ ] Simple form: textarea for idea + submit button
- [ ] Store submissions in Airtable (free, nice dashboard to review ideas)
  - Create Airtable base with columns: Idea, Date, Status
  - Add Airtable API key to Vercel env vars
  - Small API route /api/suggestions (~20 lines)
- [ ] Review suggestions weekly, generate most popular ones
- [ ] Alternative: Formspree (even simpler, submissions sent to email)

### 🌍 Internationalisation (i18n)
- [x] Czech, English, Slovak, German — UI + all 107 page titles translated
- [x] Domain-based middleware routing (placeholders — see Immediate next steps)
- [x] hreflang tags on all locale pages
- [ ] Polish (pl) — large market (40M people), keyword: "kolorowanki"
  - Add `pl` to `src/lib/i18n.ts` locales
  - Add `src/i18n/pl.json` (translate UI + page titles)
  - Add domain to `src/middleware.ts` and `src/lib/config.ts`
  - Add locale path entries (browseAll: "wszystkie", search: "szukaj")

### 🎨 Content
- [ ] Fill out Buildings, Clothes, Jobs to 8–10 pages each
- [ ] Seasonal content (Christmas, Easter, Halloween)
- [ ] More age 6-8 detailed pages across all categories

### 💰 Monetisation (future)
- [ ] Google AdSense — display ads between coloring cards
- [ ] Premium PDF packs (e.g. "10 Christmas coloring pages — 49 CZK")
- [ ] Affiliate links to coloring supplies
