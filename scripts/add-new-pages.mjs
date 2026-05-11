import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'data/coloring-pages.json');
const pages = JSON.parse(readFileSync(path, 'utf8'));

const newPages = [
  // Buildings (6)
  {
    slug: 'school-01', title: 'Škola', category: 'buildings',
    image: '/coloring-pages/buildings/school-01.png',
    prompt: 'A two-story school building with large windows, a main entrance door with steps, and a playground with a slide and swing next to it.',
    description: 'Dvoupatrová škola s velkými okny a hřištěm vedle.',
    featured: false, ageGroup: '5-8', tags: ['škola', 'budova', 'dětské hřiště'],
  },
  {
    slug: 'hospital-01', title: 'Nemocnice', category: 'buildings',
    image: '/coloring-pages/buildings/hospital-01.png',
    prompt: 'A hospital building with a large red cross sign on the front, automatic sliding doors, and ambulances parked outside.',
    description: 'Nemocnice s červeným křížem a sanitkami před vchodem.',
    featured: false, ageGroup: '5-8', tags: ['nemocnice', 'budova', 'zdraví'],
  },
  {
    slug: 'library-01', title: 'Knihovna', category: 'buildings',
    image: '/coloring-pages/buildings/library-01.png',
    prompt: 'A cozy library building with arched windows showing bookshelves full of books inside, steps leading to the entrance, and flower boxes on the windowsills.',
    description: 'Útulná knihovna s obloukovými okny a regály plnými knih.',
    featured: false, ageGroup: '5-8', tags: ['knihovna', 'budova', 'knihy'],
  },
  {
    slug: 'fire-station-01', title: 'Hasičská stanice', category: 'buildings',
    image: '/coloring-pages/buildings/fire-station-01.png',
    prompt: 'A fire station with large open garage doors showing a fire truck inside, a fire pole, a flag on the roof, and a dalmatian dog sitting outside.',
    description: 'Hasičská stanice s otevřenými vraty, hasičským autem a hasičskou tyčí.',
    featured: false, ageGroup: '5-8', tags: ['hasičská stanice', 'budova', 'hasiči'],
  },
  {
    slug: 'windmill-01', title: 'Větrný mlýn', category: 'buildings',
    image: '/coloring-pages/buildings/windmill-01.png',
    prompt: 'A classic windmill with four large sails, a round stone base, a small wooden door, windows, and rolling hills in the background.',
    description: 'Klasický větrný mlýn se čtyřmi lopatami a kamennou základnou.',
    featured: false, ageGroup: '4-7', tags: ['větrný mlýn', 'budova', 'venkov'],
  },
  {
    slug: 'bridge-01', title: 'Kamenný most', category: 'buildings',
    image: '/coloring-pages/buildings/bridge-01.png',
    prompt: 'A stone arch bridge over a calm river with decorative lamp posts on the sides, a small boat passing underneath, and trees on the riverbanks.',
    description: 'Kamenný obloukový most přes řeku s lampami a lodičkou.',
    featured: false, ageGroup: '5-8', tags: ['most', 'budova', 'řeka'],
  },

  // Clothes (6)
  {
    slug: 'summer-outfit-01', title: 'Letní oblečení', category: 'clothes',
    image: '/coloring-pages/clothes/summer-outfit-01.png',
    prompt: 'A summer outfit laid out flat: a colorful t-shirt with a sun pattern, shorts with a waistband, and a pair of sandals.',
    description: 'Letní tričko se sluncem, šortky a sandály.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'léto', 'tričko'],
  },
  {
    slug: 'raincoat-01', title: 'Pláštěnka a holínky', category: 'clothes',
    image: '/coloring-pages/clothes/raincoat-01.png',
    prompt: 'A cheerful raincoat with large buttons and a hood, matching rain boots, and an umbrella with polka dots, arranged together.',
    description: 'Veselá pláštěnka s knoflíky, holínky a deštník s puntíky.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'pláštěnka', 'déšť'],
  },
  {
    slug: 'pajamas-01', title: 'Pyžamo s hvězdičkami', category: 'clothes',
    image: '/coloring-pages/clothes/pajamas-01.png',
    prompt: 'A cozy set of pajamas: a long-sleeved top and matching trousers with a pattern of stars, moons, and small clouds all over them.',
    description: 'Útulné pyžamo potisknuté hvězdami, měsíci a oblaky.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'pyžamo', 'hvězdy'],
  },
  {
    slug: 'swimsuit-01', title: 'Plavky a plavecké brýle', category: 'clothes',
    image: '/coloring-pages/clothes/swimsuit-01.png',
    prompt: 'A swimsuit with a fun striped pattern, swimming goggles, a swim cap, and a rolled-up beach towel with a starfish on it.',
    description: 'Plavky se vzorem, plavecké brýle, čepice a ručník.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'plavky', 'plavání'],
  },
  {
    slug: 'carnival-costume-01', title: 'Karnevalový kostým', category: 'clothes',
    image: '/coloring-pages/clothes/carnival-costume-01.png',
    prompt: 'A colorful carnival costume laid out: a flowing cape, a decorative mask, a tall hat with feathers, and a sparkly wand.',
    description: 'Barevný karnevalový kostým s pláštěm, maskou, kloboukem a hůlkou.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'karneval', 'kostým'],
  },
  {
    slug: 'backpack-01', title: 'Školní batoh', category: 'clothes',
    image: '/coloring-pages/clothes/backpack-01.png',
    prompt: 'A school backpack with multiple pockets, fun keychains hanging off it, surrounded by school supplies: colored pencils, a ruler, and an open notebook.',
    description: 'Školní batoh s kapsičkami obklopený tužkami, pravítkem a sešitem.',
    featured: false, ageGroup: '4-7', tags: ['oblečení', 'batoh', 'škola'],
  },

  // Jobs (6)
  {
    slug: 'teacher-01', title: 'Učitelka', category: 'jobs',
    image: '/coloring-pages/jobs/teacher-01.png',
    prompt: 'A friendly female teacher standing at a blackboard writing letters and numbers, with a desk full of books, an apple, and a globe nearby.',
    description: 'Přátelská učitelka u tabule s knihami a zeměkoulí na stole.',
    featured: false, ageGroup: '5-8', tags: ['povolání', 'učitelka', 'škola'],
  },
  {
    slug: 'police-officer-01', title: 'Policista', category: 'jobs',
    image: '/coloring-pages/jobs/police-officer-01.png',
    prompt: 'A police officer in full uniform standing confidently, holding their cap, with a badge on the chest and a police car visible behind them.',
    description: 'Policista v uniformě s odznakem a policejním autem za ním.',
    featured: false, ageGroup: '5-8', tags: ['povolání', 'policista', 'bezpečnost'],
  },
  {
    slug: 'farmer-01', title: 'Zemědělec', category: 'jobs',
    image: '/coloring-pages/jobs/farmer-01.png',
    prompt: 'A friendly farmer in overalls and a straw hat, holding a pitchfork, standing in a field with a red barn and a cow in the background.',
    description: 'Přátelský zemědělec v kombinéze a slaměném klobouku před stodolou.',
    featured: false, ageGroup: '4-7', tags: ['povolání', 'zemědělec', 'farma'],
  },
  {
    slug: 'builder-01', title: 'Stavař', category: 'jobs',
    image: '/coloring-pages/jobs/builder-01.png',
    prompt: 'A construction worker wearing a hard hat and a tool belt, holding a rolled-up blueprint, standing next to a pile of bricks and wooden scaffolding.',
    description: 'Stavař v přilbě a pracovním pásu drží plán a stojí u lešení.',
    featured: false, ageGroup: '5-8', tags: ['povolání', 'stavař', 'stavba'],
  },
  {
    slug: 'nurse-01', title: 'Zdravotní sestra', category: 'jobs',
    image: '/coloring-pages/jobs/nurse-01.png',
    prompt: 'A kind nurse in scrubs with a stethoscope around her neck, holding a clipboard, standing next to a hospital bed with a small teddy bear patient.',
    description: 'Zdravotní sestra se stetoskopem ošetřuje plyšového medvídka.',
    featured: false, ageGroup: '5-8', tags: ['povolání', 'zdravotní sestra', 'nemocnice'],
  },
  {
    slug: 'vet-01', title: 'Veterinář', category: 'jobs',
    image: '/coloring-pages/jobs/vet-01.png',
    prompt: 'A friendly veterinarian in a white coat gently examining a happy dog on an examination table, with a cat sitting in a carrier nearby and animal posters on the wall.',
    description: 'Přátelský veterinář v bílém plášti vyšetřuje psa, vedle čeká kočka.',
    featured: false, ageGroup: '4-7', tags: ['povolání', 'veterinář', 'zvířata'],
  },
];

// Check for duplicates
const existing = new Set(pages.map(p => p.slug));
const toAdd = newPages.filter(p => {
  if (existing.has(p.slug)) { console.log(`skip (exists): ${p.slug}`); return false; }
  return true;
});

const updated = [...pages, ...toAdd];
writeFileSync(path, JSON.stringify(updated, null, 2));
console.log(`Added ${toAdd.length} new pages. Total: ${updated.length}`);
