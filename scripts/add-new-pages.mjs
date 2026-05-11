import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'data/coloring-pages.json');
const pages = JSON.parse(readFileSync(path, 'utf8'));

const newPages = [
  // Animals (2 × age 6-8)
  {
    slug: 'fox-01', title: 'Liška v lese', category: 'animals',
    image: '/coloring-pages/animals/fox-01.png',
    prompt: 'A detailed fox with a bushy tail sitting in an autumn forest, surrounded by fallen leaves, mushrooms and tree roots.',
    description: 'Liška s huňatým ocasem sedí v podzimním lese plném listí a hub.',
    featured: false, ageGroup: '6-8', tags: ['liška', 'les', 'zvířata'],
  },
  {
    slug: 'parrot-01', title: 'Papoušek na větvi', category: 'animals',
    image: '/coloring-pages/animals/parrot-01.png',
    prompt: 'A detailed tropical parrot perched on a branch with large feathers, tropical leaves and a small fruit nearby.',
    description: 'Detailní tropický papoušek na větvi s velkými peřími a tropickými listy.',
    featured: false, ageGroup: '6-8', tags: ['papoušek', 'tropický', 'ptáci'],
  },

  // Cars (2 × age 6-8)
  {
    slug: 'train-01', title: 'Parní lokomotiva', category: 'cars',
    image: '/coloring-pages/cars/train-01.png',
    prompt: 'A detailed steam locomotive with puffing smoke, large wheels with pistons, and two wagons on railway tracks through a countryside landscape.',
    description: 'Detailní parní lokomotiva s kouřem, velkými koly a vagóny na kolejích.',
    featured: false, ageGroup: '6-8', tags: ['vlak', 'lokomotiva', 'doprava'],
  },
  {
    slug: 'ambulance-01', title: 'Sanitka', category: 'cars',
    image: '/coloring-pages/cars/ambulance-01.png',
    prompt: 'A detailed ambulance with a medical cross, emergency lights on the roof, open back doors showing medical equipment inside.',
    description: 'Sanitka s červeným křížem, majáky na střeše a vybavením uvnitř.',
    featured: false, ageGroup: '6-8', tags: ['sanitka', 'záchranáři', 'nemocnice'],
  },

  // Princesses (2 × age 6-8)
  {
    slug: 'enchanted-forest-01', title: 'Začarovaný les', category: 'princesses',
    image: '/coloring-pages/princesses/enchanted-forest-01.png',
    prompt: 'A princess walking through a detailed enchanted forest with glowing fireflies, talking trees with faces, flowers and small woodland animals watching her.',
    description: 'Princezna kráčí začarovaným lesem plným světlušek, stromů s tvářemi a zvířátek.',
    featured: false, ageGroup: '6-8', tags: ['princezna', 'les', 'kouzelný'],
  },
  {
    slug: 'fairy-queen-01', title: 'Královna víl', category: 'princesses',
    image: '/coloring-pages/princesses/fairy-queen-01.png',
    prompt: 'A fairy queen sitting on a detailed throne made of large flowers, with large ornate butterfly wings, a delicate crown and tiny fairies flying around her.',
    description: 'Královna víl na trůnu z květin s motýlími křídly a vílami okolo.',
    featured: false, ageGroup: '6-8', tags: ['víla', 'královna', 'kouzelné'],
  },

  // Flowers (2 × age 6-8)
  {
    slug: 'cherry-blossom-01', title: 'Třešňové květy', category: 'flowers',
    image: '/coloring-pages/flowers/cherry-blossom-01.png',
    prompt: 'A detailed cherry blossom tree in full bloom with many delicate flowers, a small bird sitting on a branch, and petals falling to the ground.',
    description: 'Rozkvetlá třešeň s jemnými kvítky, ptáčkem na větvi a padajícími okvětními lístky.',
    featured: false, ageGroup: '6-8', tags: ['třešeň', 'květy', 'jaro'],
  },
  {
    slug: 'water-lily-01', title: 'Lekníny na rybníku', category: 'flowers',
    image: '/coloring-pages/flowers/water-lily-01.png',
    prompt: 'A detailed garden pond scene with water lily flowers and large pads floating on the water, a dragonfly hovering above, cattails and reeds on the banks.',
    description: 'Zahradní rybník s lekníny, vážkou a rákosím na březích.',
    featured: false, ageGroup: '6-8', tags: ['lekníny', 'rybník', 'příroda'],
  },

  // Space (2 × age 6-8)
  {
    slug: 'galaxy-01', title: 'Galaxie a mlhovina', category: 'space',
    image: '/coloring-pages/space/galaxy-01.png',
    prompt: 'A detailed spiral galaxy with swirling arms, surrounded by nebula clouds, many stars of different sizes and a few distant planets in the background.',
    description: 'Detailní spirální galaxie s mlhovinou, hvězdami a vzdálenými planetami.',
    featured: false, ageGroup: '6-8', tags: ['galaxie', 'vesmír', 'hvězdy'],
  },
  {
    slug: 'space-rover-01', title: 'Mars rover', category: 'space',
    image: '/coloring-pages/space/space-rover-01.png',
    prompt: 'A detailed Mars rover with large wheels, solar panels, a camera arm and antenna, driving across a rocky alien planet landscape with craters and distant mountains.',
    description: 'Detailní Mars rover se solárními panely na kamenitém povrchu planety.',
    featured: false, ageGroup: '6-8', tags: ['rover', 'Mars', 'vesmír'],
  },

  // Dinosaurs (2 × age 6-8)
  {
    slug: 'spinosaurus-01', title: 'Spinosaurus', category: 'dinosaurs',
    image: '/coloring-pages/dinosaurs/spinosaurus-01.png',
    prompt: 'A detailed Spinosaurus standing by a river catching a large fish, with its distinctive tall sail on its back, jungle vegetation in the background.',
    description: 'Detailní Spinosaurus s plachtou na hřbetě loví rybu u řeky.',
    featured: false, ageGroup: '6-8', tags: ['spinosaurus', 'dinosaurus', 'řeka'],
  },
  {
    slug: 'dino-eggs-01', title: 'Dinosauří vajíčka', category: 'dinosaurs',
    image: '/coloring-pages/dinosaurs/dino-eggs-01.png',
    prompt: 'A dinosaur nest with several large eggs, two baby dinosaurs hatching out of cracked eggs, surrounded by jungle plants and ferns.',
    description: 'Dinosauří hnízdo s vejci a malými dinosaury vylézajícími ze skořápek.',
    featured: false, ageGroup: '6-8', tags: ['dinosaurus', 'vejce', 'mláďata'],
  },

  // Ocean (2 × age 6-8)
  {
    slug: 'deep-sea-01', title: 'Hlubiny oceánu', category: 'ocean',
    image: '/coloring-pages/ocean/deep-sea-01.png',
    prompt: 'A deep sea scene with an anglerfish with its glowing lure, bioluminescent jellyfish, strange deep sea creatures and bubbles rising from the dark ocean floor.',
    description: 'Hlubiny oceánu s lucerníčkem, bioluminiscenčními medúzami a záhadnými tvory.',
    featured: false, ageGroup: '6-8', tags: ['hlubiny', 'oceán', 'lucerníček'],
  },
  {
    slug: 'shipwreck-01', title: 'Vrak lodi', category: 'ocean',
    image: '/coloring-pages/ocean/shipwreck-01.png',
    prompt: 'An underwater shipwreck with a sunken old ship covered in coral and seaweed, fish swimming through the portholes, a treasure chest nearby and octopus on the hull.',
    description: 'Potopená loď porostlá korálem s rybami, chobotnicí a truhličkou pokladu.',
    featured: false, ageGroup: '6-8', tags: ['vrak', 'loď', 'poklad'],
  },

  // Fairytales (2 × age 6-8)
  {
    slug: 'magic-forest-01', title: 'Kouzelný les', category: 'fairytales',
    image: '/coloring-pages/fairytales/magic-forest-01.png',
    prompt: 'An enchanted forest with ancient trees that have faces, glowing mushrooms, a stone path covered in moss, fairies dancing and magical orbs of light floating in the air.',
    description: 'Kouzelný les se stromy s tvářemi, svítícími houbami a tančícími vílami.',
    featured: false, ageGroup: '6-8', tags: ['kouzelný les', 'víly', 'pohádka'],
  },
  {
    slug: 'sleeping-beauty-01', title: 'Šípková Růženka', category: 'fairytales',
    image: '/coloring-pages/fairytales/sleeping-beauty-01.png',
    prompt: 'Sleeping Beauty lying asleep in a tall castle tower room, surrounded by rose vines growing through the windows, a spinning wheel nearby and a small candle burning.',
    description: 'Šípková Růženka spí ve věži ovinuté růžemi s kolovratem a svíčkou.',
    featured: false, ageGroup: '6-8', tags: ['Šípková Růženka', 'pohádka', 'princezna'],
  },

  // Food (2 × age 6-8)
  {
    slug: 'sushi-01', title: 'Sushi talíř', category: 'food',
    image: '/coloring-pages/food/sushi-01.png',
    prompt: 'A detailed sushi plate with various types of sushi rolls and nigiri arranged beautifully, chopsticks, a small bowl of soy sauce, ginger slices and wasabi.',
    description: 'Detailní sushi talíř s různými druhy rolek, hůlkami a omáčkou.',
    featured: false, ageGroup: '6-8', tags: ['sushi', 'jídlo', 'japonsko'],
  },
  {
    slug: 'breakfast-01', title: 'Snídaně', category: 'food',
    image: '/coloring-pages/food/breakfast-01.png',
    prompt: 'A detailed breakfast spread on a table: fried eggs, toast with butter, a glass of orange juice, a bowl of fruit, a cup of cocoa and a small vase with a flower.',
    description: 'Snídaňový stůl s vejci, toastem, džusem, ovocem a kakaem.',
    featured: false, ageGroup: '6-8', tags: ['snídaně', 'jídlo', 'ráno'],
  },

  // Sports (2 × age 6-8)
  {
    slug: 'boxing-01', title: 'Box', category: 'sports',
    image: '/coloring-pages/sports/boxing-01.png',
    prompt: 'A child boxer wearing boxing gloves and protective headgear in a boxing ring, in a ready stance with a punching bag hanging nearby.',
    description: 'Dítě v boxerských rukavicích a helmetě v ringu s boxovacím pytlem.',
    featured: false, ageGroup: '6-8', tags: ['box', 'sport', 'bojové sporty'],
  },
  {
    slug: 'archery-01', title: 'Lukostřelba', category: 'sports',
    image: '/coloring-pages/sports/archery-01.png',
    prompt: 'A child archer in focused stance drawing a bow and arrow, aiming at a detailed archery target board in an outdoor setting with trees in the background.',
    description: 'Dítě s lukem a šípem míří na terč na lukostřeleckém hřišti.',
    featured: false, ageGroup: '6-8', tags: ['lukostřelba', 'sport', 'luk'],
  },

  // Buildings (2 × age 6-8)
  {
    slug: 'castle-ruins-01', title: 'Zřícenina hradu', category: 'buildings',
    image: '/coloring-pages/buildings/castle-ruins-01.png',
    prompt: 'Ancient castle ruins on a hilltop with crumbling towers, ivy growing over the stone walls, an arched gateway, and a scenic landscape with trees and clouds behind.',
    description: 'Zřícenina hradu na kopci s rozpadajícími se věžemi a břečťanem na zdech.',
    featured: false, ageGroup: '6-8', tags: ['zřícenina', 'hrad', 'historie'],
  },
  {
    slug: 'pyramid-01', title: 'Egyptské pyramidy', category: 'buildings',
    image: '/coloring-pages/buildings/pyramid-01.png',
    prompt: 'Detailed Egyptian pyramids in a desert landscape with a sphinx in front, a camel with a rider nearby, palm trees, and a bright sun in the sky.',
    description: 'Egyptské pyramidy s sfingou, velbloudem a palmami v poušti.',
    featured: false, ageGroup: '6-8', tags: ['pyramidy', 'Egypt', 'stavba'],
  },

  // Clothes (2 × age 6-8)
  {
    slug: 'wedding-dress-01', title: 'Svatební šaty', category: 'clothes',
    image: '/coloring-pages/clothes/wedding-dress-01.png',
    prompt: 'An elaborate wedding dress displayed on a mannequin with detailed lace patterns, a long flowing skirt, a veil, a bouquet of flowers and decorative shoes.',
    description: 'Detailní svatební šaty s krajkou, závojem, kyticí a ozdobnými botami.',
    featured: false, ageGroup: '6-8', tags: ['svatba', 'šaty', 'oblečení'],
  },
  {
    slug: 'traditional-costume-01', title: 'Lidový kroj', category: 'clothes',
    image: '/coloring-pages/clothes/traditional-costume-01.png',
    prompt: 'A traditional folk costume laid out with an embroidered blouse with floral patterns, a layered skirt with decorative trim, an embroidered vest and a flower crown.',
    description: 'Tradiční lidový kroj s vyšívanou halenkou, zástěrou, vestičkou a věncem.',
    featured: false, ageGroup: '6-8', tags: ['kroj', 'tradice', 'oblečení'],
  },

  // Jobs (2 × age 6-8)
  {
    slug: 'scientist-01', title: 'Vědec', category: 'jobs',
    image: '/coloring-pages/jobs/scientist-01.png',
    prompt: 'A scientist in a lab coat and safety goggles standing at a lab bench with colorful bubbling test tubes, a microscope, beakers and science posters on the wall.',
    description: 'Vědec v plášti a brýlích s barevnými zkumavkami, mikroskopem a pokusným vybavením.',
    featured: false, ageGroup: '6-8', tags: ['vědec', 'laboratoř', 'věda'],
  },
  {
    slug: 'artist-01', title: 'Malíř', category: 'jobs',
    image: '/coloring-pages/jobs/artist-01.png',
    prompt: 'An artist wearing a beret and paint-splattered apron, standing at an easel painting a landscape, holding a palette with paint blobs and brushes of different sizes.',
    description: 'Malíř v baretu a zástěře maluje krajinu na stojanu s paletou a štětci.',
    featured: false, ageGroup: '6-8', tags: ['malíř', 'umění', 'povolání'],
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
