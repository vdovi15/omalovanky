import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const API_KEY = process.env.OPENAI_API_KEY ??
  readFileSync('C:/Users/Martin/Documents/openai_api_key.txt', 'utf8').trim();

const prompt = `A friendly lion sitting and smiling, simple kids coloring book style. Pure white background. Thick bold black outlines only — every shape interior must be completely white and empty, ready for a child to color in. Use thick, heavy strokes for all outlines — similar weight to a marker pen. No thin lines. No filled black areas anywhere. No gray tones, no shading, no cross-hatching, no textures, no solid fills. Outline drawing only. Printable A4 coloring book page for children age 4-7.`;

async function main() {
  const outDir = join(ROOT, 'generated', 'test');
  mkdirSync(outDir, { recursive: true });

  for (const model of ['gpt-image-1-mini']) {
    process.stdout.write(`Generating with ${model}... `);
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        size: '1024x1536',
        quality: 'medium',
        output_format: 'png',
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('API error:', data.error?.message ?? JSON.stringify(data));
      process.exit(1);
    }

    const filename = `lion-${model}-thick.png`;
    writeFileSync(join(outDir, filename), Buffer.from(data.data[0].b64_json, 'base64'));
    console.log(`saved → generated/test/${filename}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
