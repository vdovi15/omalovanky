# Generate Coloring Page

Generate a new AI coloring page and register it in the site.

## Steps

1. Ask the user for:
   - **Subject** — what to draw (e.g. "dog", "helicopter", "butterfly")
   - **Category** — must be one of: `cars`, `animals`, `princesses`, `flowers`
   - **Age group** — e.g. `4-7` or `5-8`

2. Build the slug: lowercase subject, spaces replaced with hyphens, append `-01` (or next available number if slug exists). Example: `dog-01`.

3. Check `data/coloring-pages.json` — if the slug already exists, increment the number.

4. Write the prompt using this exact template:
   ```
   A kids coloring book page of [detailed subject description]. Black outline drawing only on a pure white background. Every shape interior is completely white and empty, ready to be colored in by a child. No filled areas, no solid black shapes, no gray, no shading, no cross-hatching. Simple bold outlines only. Suitable for age [X].
   ```

5. Add the new entry to `data/coloring-pages.json`:
   ```json
   {
     "slug": "[slug]",
     "title": "[Title Case subject]",
     "category": "[category]",
     "image": "/coloring-pages/[category]/[slug].png",
     "prompt": "[prompt from step 4]",
     "featured": false,
     "ageGroup": "[age group]",
     "tags": ["[category]", "[subject]", "easy coloring", "kids"]
   }
   ```

6. Run the generation script:
   ```bash
   node scripts/generate-images.mjs --slug=[slug]
   ```

7. Report: confirm the file was saved, show the image path, and ask if the result looks good. If not, offer to regenerate with `--force` after adjusting the prompt.

## Rules

- Never set `featured: true` on new pages — the user decides after reviewing.
- Always use the prompt template exactly — do not shorten or simplify it.
- If generation fails, check that `OPENAI_API_KEY` is set or the key file exists at `C:/Users/Martin/Documents/openai_api_key.txt`.
- See `docs/ai-generation-guide.md` for troubleshooting dark/filled images.
