import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const API_KEY = process.env.OPENAI_API_KEY ??
  readFileSync('C:/Users/Martin/Documents/openai_api_key.txt', 'utf8').trim();
const FORCE = process.argv.includes('--force');
const SLUG  = process.argv.find(a => a.startsWith('--slug='))?.split('=')[1];

const pages = JSON.parse(readFileSync(join(ROOT, 'data/coloring-pages.json'), 'utf8'));

async function generate(prompt, outputPath) {
  const full = `${prompt} Pure white background. Black outlines only — every shape interior must be completely white and empty, ready for a child to color in. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable A4 coloring book page for children age 4-7.`;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
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
  const targets = SLUG ? pages.filter(p => p.slug === SLUG) : pages;

  if (!targets.length) {
    console.error(`No pages found${SLUG ? ` for slug "${SLUG}"` : ''}.`);
    process.exit(1);
  }

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
      await generate(page.prompt, outPath);
      console.log('done');
      const idx = updated.findIndex(p => p.slug === page.slug);
      updated[idx] = { ...page, image: pngRel };
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }

    // wait between calls to avoid rate limits
    if (targets.indexOf(page) < targets.length - 1) {
      await new Promise(r => setTimeout(r, 14000));
    }
  }

  writeFileSync(join(ROOT, 'data/coloring-pages.json'), JSON.stringify(updated, null, 2));
  console.log('\ncoloring-pages.json updated.');
}

main().catch(err => { console.error(err); process.exit(1); });
