# AI Generation Guide

This file is for content production only. It does not affect the hosted website directly.

## Two asset types

Category covers and coloring pages use the **same visual style**: black and white line art, clean outlines, white interiors, printable. Only the subject differs.

1. `category covers` (`public/category-covers/`)
   - black and white line art — same style as coloring pages, NOT colorful
   - generated at `1024x1536`, then resized down to `520x780` (the size `CategoryCard` displays them at)
   - a "hero" scene: 2-3 friendly characters/objects representing the category

2. `coloring pages` (`public/coloring-pages/<category>/`)
   - black and white, clean line art, printable
   - simple enough for kids to color
   - portrait A4 (`1024x1536`)

Both use the prompt formula and suffix described under "Coloring pages" below.

## Category covers

Generate with the same model/settings as coloring pages (see "Recommended API settings" below) — `gpt-image-1` is recommended since a cover scene has more elements than a typical single-subject coloring page.

### Resize step

`CategoryCard` displays covers at `520x780`. After generating at `1024x1536`, resize down before saving to `public/category-covers/<slug>.png` (no image library in deps, so use .NET via PowerShell):

```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("generated/category-covers/<slug>.png")
$resized = New-Object System.Drawing.Bitmap(520, 780)
$g = [System.Drawing.Graphics]::FromImage($resized)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 520, 780)
$g.Dispose(); $img.Dispose()
$resized.Save("public/category-covers/<slug>.png", [System.Drawing.Imaging.ImageFormat]::Png)
$resized.Dispose()
```

### Cover selection rubric

Score each generated cover like this:

- `3 points`: instantly readable at small size (520x780)
- `3 points`: clearly positive and child-friendly
- `2 points`: clearly fits the category
- `1 point`: simple, uncluttered composition (2-3 elements max)
- `1 point`: matches the B&W line-art style of the other covers — no color, no gray fills

Anything under `8/10` is not homepage quality.

### Cover refinement loop

If a result is too busy, append:

```txt
Make the composition simpler, with fewer elements and a stronger central subject.
```

If interiors are filled with black or gray, apply the same fix as the "too much black" pitfall below.

## Coloring pages

For printable coloring pages the single most important rule: **every shape interior must be completely white**. DALL-E defaults to shading and filling dark areas — you must override this explicitly or you get an unusable result.

What a good coloring page has:
- black outlines only
- all interiors white and empty (the child fills them in)
- no shading, no gray, no cross-hatching, no textures
- no solid black fills anywhere
- simple shapes, not too detailed

### Recommended API settings

These settings are confirmed to produce good coloring page results:

- `model`: `gpt-image-1` (better prompt following than dall-e-3)
- `size`: `1024x1536` (A4 portrait ratio)
- `quality`: `medium` (sufficient for line art)
- `output_format`: `png` (lossless, correct for B&W line art)

### Prompt formula

The script in `coloring-pages.json` stores the subject prompt. The script appends this suffix automatically before sending to the API:

```txt
Pure white background. Black outlines only — every shape interior must be completely white and empty, ready for a child to color in. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable coloring book page for children age 4-7.
```

The subject prompt itself should also reinforce this. Full example sent to the API:

```txt
A kids coloring book page of a large cheerful sunflower. Black outline drawing only on a pure white background. Every shape interior is completely white and empty, ready to be colored in by a child. No filled areas, no solid black shapes, no gray, no shading, no cross-hatching. Simple bold outlines only. Suitable for age 5. Pure white background. Black outlines only — every shape interior must be completely white and empty, ready for a child to color in. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable coloring book page for children age 4-7.
```

### Common pitfall — too much black

If a result has large filled black areas (e.g. dark flower centers, black shadows, filled silhouettes), the subject prompt is not explicit enough. Fix it by:

1. Updating the `prompt` field in `data/coloring-pages.json` for that slug
2. Using language like: *"Black outline drawing only. Every shape interior is completely white and empty."*
3. Regenerating with `--force`

Do not just rely on the suffix — DALL-E needs the instruction in the subject prompt too.

### Generation script

```bash
# Generate one image (always test one first)
node scripts/generate-images.mjs --slug=lion-01

# Regenerate one even if file already exists
node scripts/generate-images.mjs --slug=sunflower-01 --force

# Generate all images (skips existing)
node scripts/generate-images.mjs

# Regenerate everything
node scripts/generate-images.mjs --force
```

The script reads prompts from `data/coloring-pages.json`, saves PNGs to `public/coloring-pages/<category>/`, and updates the JSON image paths automatically.

Requirements:
- API key stored at `C:/Users/Martin/Documents/openai_api_key.txt`
- Rate limit: 14s wait between images (DALL-E 3 allows ~5 req/min)

### Base coloring prompt template

```txt
A kids coloring book page of [subject]. Black outline drawing only on a pure white background. Every shape interior is completely white and empty, ready to be colored in by a child. No filled areas, no solid black shapes, no gray, no shading, no cross-hatching. Simple bold outlines only. Suitable for age [X].
```

### Category prompt starters

#### Cars

- `A kids coloring book page of a smiling race car. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a monster truck with big wheels. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a fire truck with a ladder. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`

#### Animals

- `A kids coloring book page of a happy smiling lion. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a cute baby elephant. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a bunny with big ears. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`

#### Princesses

- `A kids coloring book page of a princess wearing a crown and a long dress. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 5.`
- `A kids coloring book page of a princess standing in front of a fairytale castle. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 5.`
- `A kids coloring book page of a princess holding a magic wand with stars. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 5.`

#### Flowers

- `A kids coloring book page of a large cheerful sunflower. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a bouquet of tulips in a vase. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`
- `A kids coloring book page of a simple daisy flower with leaves. Black outline drawing only, pure white background, all interiors white and empty. No shading, no fills. Simple bold outlines suitable for age 4.`

## Suggested workflow

1. Write the subject prompt using the template above — include the white-interior instruction in the prompt itself, not just in the suffix.
2. Add the entry to `data/coloring-pages.json` with `featured: false` initially.
3. Generate with `--slug=<slug>` and review the result.
4. If interiors are filled/dark: strengthen the prompt and regenerate with `--force`.
5. Once satisfied, move the file to `public/coloring-pages/<category>/` if not already there.
6. Flip `featured: true` only for the best results shown on the homepage.
