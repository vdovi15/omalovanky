import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createInterface } from 'readline';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const API_KEY = process.env.OPENAI_API_KEY ??
  readFileSync('C:/Users/Martin/Documents/openai_api_key.txt', 'utf8').trim();
const FORCE = process.argv.includes('--force');
const SLUG  = process.argv.find(a => a.startsWith('--slug='))?.split('=')[1];

// Model can be forced via flag: --model=mini or --model=full
const MODEL_FLAG = process.argv.find(a => a.startsWith('--model='))?.split('=')[1];

const MODELS = {
  mini: {
    id: 'gpt-image-1-mini',
    label: 'gpt-image-1-mini  (cheaper, faster — default)',
    // Mini needs explicit thick-line instruction to match gpt-image-1 quality
    promptSuffix: 'Pure white background. Thick bold black outlines only — every shape interior must be completely white and empty, ready for a child to color in. Use thick, heavy strokes for all outlines, similar weight to a marker pen. No thin lines. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable A4 coloring book page for children age 4-7.',
  },
  full: {
    id: 'gpt-image-1',
    label: 'gpt-image-1       (higher quality, more expensive)',
    promptSuffix: 'Pure white background. Black outlines only — every shape interior must be completely white and empty, ready for a child to color in. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable A4 coloring book page for children age 4-7.',
  },
};

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

async function pickModel() {
  if (MODEL_FLAG === 'mini') return MODELS.mini;
  if (MODEL_FLAG === 'full') return MODELS.full;

  console.log('\nWhich model do you want to use?\n');
  console.log('  1. ' + MODELS.mini.label);
  console.log('  2. ' + MODELS.full.label);
  const ans = await ask('\nEnter 1 or 2 (default 1): ');
  return ans === '2' ? MODELS.full : MODELS.mini;
}

async function generate(prompt, outputPath, model) {
  const full = `${prompt} ${model.promptSuffix}`;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.id,
      prompt: full,
      size: '1024x1536',
      quality: 'medium',
      output_format: 'png',
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? JSON.stringify(data));

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, Buffer.from(data.data[0].b64_json, 'base64'));
}

async function main() {
  const pages = JSON.parse(readFileSync(join(ROOT, 'data/coloring-pages.json'), 'utf8'));
  const targets = SLUG ? pages.filter(p => p.slug === SLUG) : pages;

  if (!targets.length) {
    console.error(`No pages found${SLUG ? ` for slug "${SLUG}"` : ''}.`);
    process.exit(1);
  }

  const model = await pickModel();
  console.log(`\nUsing: ${model.id}\n`);

  const updated = [...pages];

  for (const page of targets) {
    const pngRel = page.image.replace(/\.(svg|png)$/, '.png');
    const outPath = join(ROOT, 'public', pngRel);

    if (!FORCE && existsSync(outPath)) {
      console.log(`skip  ${page.title} (already exists, use --force to regenerate)`);
      const idx = updated.findIndex(p => p.slug === page.slug);
      updated[idx] = { ...page, image: pngRel };
      continue;
    }

    process.stdout.write(`gen   ${page.title} ... `);
    try {
      await generate(page.prompt, outPath, model);
      console.log('done');
      const idx = updated.findIndex(p => p.slug === page.slug);
      updated[idx] = { ...page, image: pngRel };
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }

    if (targets.indexOf(page) < targets.length - 1) {
      await new Promise(r => setTimeout(r, 14000));
    }
  }

  writeFileSync(join(ROOT, 'data/coloring-pages.json'), JSON.stringify(updated, null, 2));
  console.log('\ncoloring-pages.json updated.');
}

main().catch(err => { console.error(err); process.exit(1); });
