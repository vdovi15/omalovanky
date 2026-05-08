# TODO — moje-omalovanky.cz

## Done ✅
- Frontend (Czech language, search, filters, age/category dropdowns, multi-select download/print)
- 13 categories, 100+ AI-generated coloring pages
- SEO (sitemap, robots.txt, OG tags, JSON-LD, keywords, canonical URLs)
- Git repository (github.com/vdovi15/omalovanky)
- Deployed on Vercel (omalovanky-mu.vercel.app)
- Custom domain registered: moje-omalovanky.cz (DNS propagating)
- Image optimization via Vercel (WebP/AVIF, responsive sizes)

## In Progress 🔄
- DNS propagation for moje-omalovanky.cz (waiting)
- Set NEXT_PUBLIC_SITE_URL env var on Vercel once domain is live

## Immediate next steps
- [ ] Verify moje-omalovanky.cz is live (click Refresh in Vercel → Domains)
- [ ] Set NEXT_PUBLIC_SITE_URL=https://moje-omalovanky.cz in Vercel → Environment Variables → Redeploy
- [ ] Google Search Console — register site, submit sitemap: https://moje-omalovanky.cz/sitemap.xml
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
- [ ] Phase 1 — Slovak (sk) — easiest, ~90% same language as Czech
  - Buy moje-omalovanky.sk (~$5/year)
  - Add middleware.ts — domain-based locale detection
  - Create messages/cs.json + messages/sk.json (translate ~30 strings)
  - Localise data/sk/categories.json + data/sk/coloring-pages.json
  - Add hreflang tags for SEO
  - Add moje-omalovanky.sk to Vercel → Domains
- [ ] Phase 2 — Polish (pl) — large market (40M people), keyword: "kolorowanki"
- [ ] Phase 3 — German (de) — highest revenue potential, keyword: "ausmalbilder"
- [ ] Files to change for each new language:
  - middleware.ts (domain → locale mapping)
  - messages/[locale].json (UI strings)
  - data/[locale]/categories.json
  - data/[locale]/coloring-pages.json
  - src/app/layout.tsx (hreflang tags)
  - src/lib/config.ts (SITE_URL per locale)

### 🎨 Content
- [ ] Fill out Buildings, Clothes, Jobs to 8–10 pages each
- [ ] Seasonal content (Christmas, Easter, Halloween)
- [ ] More age 6-8 detailed pages across all categories

### 💰 Monetisation (future)
- [ ] Google AdSense — display ads between coloring cards
- [ ] Premium PDF packs (e.g. "10 Christmas coloring pages — 49 CZK")
- [ ] Affiliate links to coloring supplies
