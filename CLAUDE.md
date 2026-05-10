# CLAUDE.md — Tiny Palette (web_omalovanky)

Kids' coloring pages website. "Omalovanky" is Czech for coloring pages. The live site name is **Tiny Palette**.

Children visit the site to browse, download, and print coloring pages filtered by category. All coloring page images are AI-generated on demand using OpenAI. The site has no backend, no database, no auth — content lives in flat JSON files.

## Stack

- **Next.js** (App Router, TypeScript, static export)
- **No database** — content is flat JSON under `data/`
- **No auth, no CMS, no backend**
- Images served directly from `public/`

## Commands

```bash
npm run dev          # local dev server
npm run build        # static build
npm run start        # serve the build
```

## Project layout

```
data/
  categories.json        # 4 categories (slug, title, description, coverImage)
  coloring-pages.json    # all coloring page entries

public/
  category-covers/       # colorful cover images for homepage cards
  coloring-pages/
    cars/
    animals/
    princesses/
    flowers/

generated/
  category-covers/       # staging area — review here before copying to public/

src/
  app/
    page.tsx             # homepage (hero + category cards + featured grid)
    category/[slug]/     # category listing page
    coloring/[slug]/     # individual coloring page detail
    globals.css          # all styles (no CSS framework)
  components/
    CategoryCard         # links to /category/:slug, shows cover image
    ColoringCard         # links to /coloring/:slug, shows preview + actions
    ColoringGrid         # wraps ColoringCard list
    ArtworkActions       # Print + Download + View buttons (client component); print uses window.open+onload on desktop, @media print CSS on mobile
    Hero, SiteHeader     # SiteHeader includes a search button (full-width second row on mobile)
  lib/
    content.ts           # data loaders (getCategories, getFeaturedColoringPages, etc.)
    categories.ts        # categoryThemes — badge label, CSS class names per category
  types/
    coloring.ts          # CategorySlug, Category, ColoringPage types

scripts/
  generate-images.mjs         # coloring page generator (gpt-image-1, A4 portrait)
  generate-category-cover.mjs # category cover generator (gpt-image-1.5, landscape)

docs/
  ai-generation-guide.md      # prompt system, API settings, troubleshooting

.claude/
  commands/
    generate-coloring.md      # /generate-coloring skill — add and generate a new page
```

## Data model

### `data/categories.json`

```json
{
  "slug": "cars",
  "title": "Cars",
  "description": "...",
  "coverImage": "/category-covers/cars.svg"
}
```

### `data/coloring-pages.json`

```json
{
  "slug": "race-car-01",
  "title": "Race Car",
  "category": "cars",
  "image": "/coloring-pages/cars/race-car-01.png",
  "prompt": "A kids coloring book page of ...",
  "featured": true,
  "ageGroup": "4-7",
  "tags": ["cars", "race car", "easy coloring"]
}
```

- `featured: true` → appears on the homepage featured grid
- Pages are sorted alphabetically by title (`getColoringPages()`)
- Image path is relative to `public/` — always `.png`
- Never set `featured: true` without reviewing the image first

## Fixed category list — important

`CategorySlug` is a union type: `"cars" | "animals" | "princesses" | "flowers"`.

**Adding a new category requires changes in three places:**
1. `data/categories.json` — add the entry
2. `src/types/coloring.ts` — extend `CategorySlug`
3. `src/lib/categories.ts` — add theme (badge, cardClassName, accentClassName); category colors apply to both the card body area and the detail page actions area

## Two types of images

### 1. Category covers (`public/category-covers/`)
- Colorful, storybook illustration style
- Landscape: `1536x1024`
- Model: `gpt-image-1.5`, quality `high`
- Workflow: generate to `generated/category-covers/` → review → copy to `public/category-covers/`
- Script: `npm run generate:cover -- <category>`

### 2. Coloring pages (`public/coloring-pages/<category>/`)
- **Black and white line art only** — no color, no shading, no gray
- Portrait A4: `1024x1536`
- Model: `gpt-image-1`, quality `medium`, format `png`
- **Critical rule:** both the subject prompt AND the script suffix must state that every shape interior is white and empty. If a result has too much black, strengthen the prompt and regenerate with `--force`.
- Script: `node scripts/generate-images.mjs`

See `docs/ai-generation-guide.md` for the full prompt template and troubleshooting.

## Image generation — coloring pages

API key: read from `OPENAI_API_KEY` env var, falls back to `C:/Users/Martin/Documents/openai_api_key.txt`.

```bash
node scripts/generate-images.mjs --slug=lion-01      # one page
node scripts/generate-images.mjs                      # all missing pages
node scripts/generate-images.mjs --force              # regenerate everything
node scripts/generate-images.mjs --slug=lion-01 --force  # regenerate one
```

The script updates `data/coloring-pages.json` image paths automatically after saving.

## Custom skill

Use `/generate-coloring` in any Claude Code session to add and generate a new coloring page interactively. It handles prompt writing, JSON entry, and script execution.

## Deployment

- **Hosting:** Vercel (static export, auto-deploy on push to `master`)
- **Domain:** `moje-omalovanky.cz` — registered at Wedos, DNS pointed to Vercel
- **Analytics:** Vercel Analytics (`@vercel/analytics`) imported in `src/app/layout.tsx`
- **Env var:** `NEXT_PUBLIC_SITE_URL=https://moje-omalovanky.cz` — set in Vercel project settings, read by `src/lib/config.ts` for metadata canonical URL and OG tags

## SEO

Site metadata lives in `src/app/layout.tsx` and uses `src/lib/config.ts` for `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`.

- Language: Czech (`lang="cs"`, OG locale `cs_CZ`)
- Czech keywords array covering all category types
- OpenGraph and Twitter card tags
- Canonical URL set via `metadataBase`

## Key conventions

- No comments in code unless the why is non-obvious
- TypeScript strict — no `any`
- All CSS in `globals.css`, BEM-ish flat naming (`.coloring-card`, `.coloring-card-body`)
- `ArtworkActions` is the only client component (`"use client"`) — needs browser APIs for print
- `next.config.ts` has `images.unoptimized: true` — Image component used for layout, not CDN
- All icon buttons (print, download, view) use white background for consistent look
- Page background is light blue; header is white to match the hero section
- Favicon is the flower coloring page icon (`public/favicon.ico` / `public/icon.png`)
- No test suite

## Why this structure works

- No database means no infra to maintain — site is fully static
- JSON files are easy to review, edit, and version-control
- AI images are generated on demand and committed — no runtime API calls on the live site
- Easy to add new categories, pages, or scripts without touching app code

## Future additions (likely)

- **Internationalisation (i18n):** English + Slovak versions alongside Czech; plan is `app/[lang]/` routes with next-intl (static export compatible) and locale-keyed JSON data
- Search across coloring pages
- Difficulty / complexity filters
- Printable PDF downloads
- Richer SEO text per page
- More categories (dinosaurs, space, sports...)
- Admin upload workflow for non-technical editors
