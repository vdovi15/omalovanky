// Builds lightweight WebP previews of the PNGs in public/ so the site never
// relies on Vercel Image Optimization (its free tier is only 5,000 transformations/month).
// Originals stay untouched — download and print still use the full PNG.
//
//   node scripts/generate-previews.mjs           # only missing previews
//   node scripts/generate-previews.mjs --force   # rebuild all

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const SOURCES = [
  { dir: "coloring-pages", width: 768 },
  { dir: "category-covers", width: 520 },
];
const force = process.argv.includes("--force");

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".png")) yield full;
  }
}

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

let created = 0;
let skipped = 0;

for (const { dir, width } of SOURCES) {
  for await (const src of walk(path.join(PUBLIC, dir))) {
    const rel = path.relative(PUBLIC, src).replace(/\.png$/, ".webp");
    const out = path.join(PUBLIC, "previews", rel);
    if (!force && await exists(out)) { skipped++; continue; }

    await fs.mkdir(path.dirname(out), { recursive: true });
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    created++;
  }
}

console.log(`Previews: ${created} created, ${skipped} already existed.`);
