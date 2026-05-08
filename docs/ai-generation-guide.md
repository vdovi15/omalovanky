# AI Generation Guide

This file is for content production only. It does not affect the hosted website directly.

## Two asset types

This project needs two different visual systems:

1. `category covers`
   - colorful
   - polished
   - emotional
   - premium-looking
   - used on the homepage and category cards

2. `coloring pages`
   - black and white
   - clean line art
   - printable
   - simple enough for kids to color

Do not try to make one prompt do both jobs.

## Category covers

For covers, the script uses `gpt-image-1.5` (colorful, storybook style, landscape).

### Master prompt system

Use this shared base so all 4 categories feel like one brand:

```txt
Create a premium children's website category cover illustration for a coloring-page site.

Art direction:
- joyful, positive, warm, child-friendly
- polished animated storybook look
- soft cinematic lighting
- clean readable shapes
- simple uncluttered background
- one clear main subject
- easy to understand at small thumbnail size
- high-end, premium, modern, visually rich
- expressive friendly face or welcoming mood
- tasteful vibrant colors, not neon overload

Composition:
- landscape composition for a website category card
- strong central subject
- a few supporting background elements only
- lots of clarity and visual hierarchy

Constraints:
- no text
- no logo
- no watermark
- no horror
- no darkness
- no sad mood
- no deformed anatomy
- no clutter
- no cropped main subject
- no uncanny photorealism
```

### Category subjects

#### Cars

```txt
Subject: a happy red race car with big friendly eyes driving on a sunny playful road, with a few small racing flags and soft clouds in the background. The mood should feel energetic, exciting, and cheerful.
```

#### Animals

```txt
Subject: a cute smiling baby lion sitting in a sunny meadow, with a few flowers and soft green trees in the distance. The lion should feel gentle, friendly, and joyful.
```

#### Princesses

```txt
Subject: a cheerful young princess in a beautiful pink dress and crown standing in front of a magical fairytale castle. The scene should feel bright, elegant, welcoming, and enchanting.
```

#### Flowers

```txt
Subject: a bright cheerful flower garden with large happy flowers in bloom, soft green leaves, warm golden sunlight, and a calm blue sky. The scene should feel fresh, positive, and welcoming.
```

### Recommended image settings

- `model`: `gpt-image-1.5`
- `size`: `1536x1024`
- `quality`: `high`
- `output_format`: `webp` or `jpeg`
- `output_compression`: `90`

### Cover generation script

This repo includes a small helper script:

```powershell
npm.cmd run generate:cover -- animals
```

Generate all 4 categories:

```powershell
npm.cmd run generate:cover -- --all
```

Write directly into the live site assets only after review:

```powershell
npm.cmd run generate:cover -- flowers --out public/category-covers
```

Extra options:

```powershell
npm.cmd run generate:cover -- animals --format jpeg --quality high --size 1536x1024
```

Requirements:
- set `OPENAI_API_KEY` first
- outputs go to `generated/category-covers/` by default
- manually review before replacing files in `public/category-covers/`

### Cover selection rubric

Score each generated cover like this:

- `3 points`: instantly readable at small size
- `3 points`: clearly positive and child-friendly
- `2 points`: clearly fits the category
- `1 point`: simple enough background
- `1 point`: feels premium, not generic

Anything under `8/10` is not homepage quality.

### Cover refinement loop

If a result is too busy, append:

```txt
Make the composition simpler, with fewer background details and a stronger central subject.
```

If it feels generic, append:

```txt
Increase charm, warmth, and personality while keeping the composition simple and premium.
```

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
