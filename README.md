# Tiny Palette

Tiny Palette is a simple Next.js website for kids coloring pages.

The live website is made from:
- `src/` for pages and components
- `public/` for images and static assets
- `data/` for category and coloring page metadata

Everything else is support material for development.

## Repo map

```txt
web_omalovanky/
  src/       website pages, components, and helpers
  public/    category covers and coloring page artwork
  data/      category and coloring page metadata
  docs/      internal notes and content-production guides
```

## What gets hosted

These parts become the actual website:
- `src/app/page.tsx`
- `src/app/category/[slug]/page.tsx`
- `src/app/coloring/[slug]/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- everything inside `public/`
- content loaded from `data/`

These parts do not appear on the website:
- `docs/`
- `node_modules/`
- `.next/`
- `package-lock.json`
- `tsconfig.json`
- `next.config.ts`

## Where to edit things

To add or change content:
- edit `data/categories.json` for category cards
- edit `data/coloring-pages.json` for coloring page entries
- add final artwork into `public/coloring-pages/`
- add category cover images into `public/category-covers/`

To change the design:
- edit `src/app/globals.css`
- edit components in `src/components/`

## Local development

Install dependencies:

```powershell
npm.cmd install
```

Start the site locally:

```powershell
npm.cmd run dev
```

Build for production:

```powershell
npm.cmd run build
```

## AI cover generation

Generate a premium category cover candidate with OpenAI `gpt-image-1.5`:

```powershell
npm.cmd run generate:cover -- animals
```

By default, generated files are written to `generated/category-covers/` so you can review them before replacing anything in `public/category-covers/`.

## Documentation

More detailed notes live here:
- `docs/project-structure.md`
- `docs/ai-generation-guide.md`
