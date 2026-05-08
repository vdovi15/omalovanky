import fs from "node:fs/promises";
import path from "node:path";

const validCategories = ["cars", "animals", "princesses", "flowers"];

const sharedPrompt = `Create a premium children's website category cover illustration for a coloring-page site.

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
- no uncanny photorealism`;

const categorySubjects = {
  cars:
    "Subject: a happy red race car with big friendly eyes driving on a sunny playful road, with a few small racing flags and soft clouds in the background. The mood should feel energetic, exciting, and cheerful.",
  animals:
    "Subject: a cute smiling baby lion sitting in a sunny meadow, with a few flowers and soft green trees in the distance. The lion should feel gentle, friendly, and joyful.",
  princesses:
    "Subject: a cheerful young princess in a beautiful pink dress and crown standing in front of a magical fairytale castle. The scene should feel bright, elegant, welcoming, and enchanting.",
  flowers:
    "Subject: a bright cheerful flower garden with large happy flowers in bloom, soft green leaves, warm golden sunlight, and a calm blue sky. The scene should feel fresh, positive, and welcoming."
};

function printHelp() {
  console.log(`Usage:
  npm run generate:cover -- <category>
  npm run generate:cover -- --all

Options:
  --model <id>       Default: gpt-image-1.5
  --size <value>     Default: 1536x1024
  --quality <value>  Default: high
  --format <value>   Default: webp
  --compression <n>  Default: 90
  --out <dir>        Default: generated/category-covers

Examples:
  npm run generate:cover -- animals
  npm run generate:cover -- princesses --out public/category-covers
  npm run generate:cover -- --all --format jpeg

Environment:
  OPENAI_API_KEY must be set before running this script.
`);
}

function parseArgs(argv) {
  const options = {
    categories: [],
    model: "gpt-image-1.5",
    size: "1536x1024",
    quality: "high",
    format: "webp",
    compression: 90,
    outDir: path.join("generated", "category-covers")
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--help" || token === "-h") {
      options.help = true;
      continue;
    }

    if (token === "--all") {
      options.categories = [...validCategories];
      continue;
    }

    if (token === "--model") {
      options.model = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--size") {
      options.size = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--quality") {
      options.quality = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--format") {
      options.format = argv[index + 1];
      index += 1;
      continue;
    }

    if (token === "--compression") {
      options.compression = Number(argv[index + 1]);
      index += 1;
      continue;
    }

    if (token === "--out") {
      options.outDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (!token.startsWith("--")) {
      options.categories.push(token);
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  if (options.categories.length === 0 && !options.help) {
    throw new Error("Please provide a category or use --all.");
  }

  const uniqueCategories = [...new Set(options.categories)];
  const invalidCategories = uniqueCategories.filter(
    (category) => !validCategories.includes(category)
  );

  if (invalidCategories.length > 0) {
    throw new Error(
      `Invalid categories: ${invalidCategories.join(", ")}. Valid categories: ${validCategories.join(", ")}.`
    );
  }

  if (!Number.isFinite(options.compression) || options.compression < 0 || options.compression > 100) {
    throw new Error("Compression must be a number between 0 and 100.");
  }

  return {
    ...options,
    categories: uniqueCategories
  };
}

async function generateImage({ apiKey, prompt, model, size, quality, format, compression }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality,
      output_format: format,
      output_compression: compression
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  const imageBase64 = payload?.data?.[0]?.b64_json;

  if (!imageBase64) {
    throw new Error("The API response did not contain image data.");
  }

  return Buffer.from(imageBase64, "base64");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const outputDirectory = path.resolve(options.outDir);
  await fs.mkdir(outputDirectory, { recursive: true });

  for (const category of options.categories) {
    const prompt = `${sharedPrompt}\n\n${categorySubjects[category]}`;
    const extension = options.format === "jpeg" ? "jpg" : options.format;
    const filePath = path.join(outputDirectory, `${category}.${extension}`);

    console.log(`Generating ${category} cover with ${options.model}...`);
    const imageBuffer = await generateImage({
      apiKey,
      prompt,
      model: options.model,
      size: options.size,
      quality: options.quality,
      format: options.format,
      compression: options.compression
    });

    await fs.writeFile(filePath, imageBuffer);
    console.log(`Saved ${category} cover to ${filePath}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
