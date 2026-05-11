import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'data/coloring-pages.json');
const pages = JSON.parse(readFileSync(path, 'utf8'));

const newPages = [
  // Animals
  { slug:'dog-01', title:'Pes', category:'animals', image:'/coloring-pages/animals/dog-01.png',
    prompt:'A friendly dog sitting with a wagging tail, floppy ears, a collar with a tag, and a happy expression.',
    description:'Přátelský pes s ocasem, visatýma ušima a obojkem sedí a usměvuje se.', featured:false, ageGroup:'4-7', tags:['pes','zvířata','mazlíček'] },
  { slug:'butterfly-01', title:'Motýl', category:'animals', image:'/coloring-pages/animals/butterfly-01.png',
    prompt:'A beautiful butterfly with large detailed symmetrical wings covered in patterns, perched on a flower with leaves around it.',
    description:'Krásný motýl s velkými symetrickými křídly sedí na květině.', featured:false, ageGroup:'4-7', tags:['motýl','zvířata','příroda'] },
  { slug:'hedgehog-01', title:'Ježek', category:'animals', image:'/coloring-pages/animals/hedgehog-01.png',
    prompt:'A cute hedgehog with detailed spines walking through an autumn forest, carrying a mushroom on its back, with fallen leaves around it.',
    description:'Roztomilý ježek s houbou na hřbetě kráčí podzimním lesem plným listí.', featured:false, ageGroup:'4-7', tags:['ježek','zvířata','les'] },

  // Cars
  { slug:'motorbike-01', title:'Motorka', category:'cars', image:'/coloring-pages/cars/motorbike-01.png',
    prompt:'A cool motorbike with detailed wheels, exhaust pipes, handlebars, a seat, and a headlight. Side view on a road.',
    description:'Stylová motorka s detailními koly, výfuky a světlometem v pohledu zboku.', featured:false, ageGroup:'5-8', tags:['motorka','doprava','vozidla'] },
  { slug:'truck-01', title:'Náklaďák', category:'cars', image:'/coloring-pages/cars/truck-01.png',
    prompt:'A big friendly delivery truck with a large cargo box, big wheels, a cab with windows, and a cheerful face on the front.',
    description:'Velký přátelský náklaďák s kabinou, velkými koly a nákladovým prostorem.', featured:false, ageGroup:'4-7', tags:['náklaďák','doprava','kamion'] },
  { slug:'vintage-car-01', title:'Staré auto', category:'cars', image:'/coloring-pages/cars/vintage-car-01.png',
    prompt:'A classic vintage car from the 1920s with large round headlights, running boards, a long hood, spoke wheels and a folded convertible roof.',
    description:'Klasické staré auto z 20. let s kulatými světlomety, paprskovanými koly a dlouhou kapotou.', featured:false, ageGroup:'5-8', tags:['staré auto','retro','vozidla'] },

  // Princesses
  { slug:'snow-queen-01', title:'Sněhová královna', category:'princesses', image:'/coloring-pages/princesses/snow-queen-01.png',
    prompt:'An ice queen standing with flowing robes covered in snowflake patterns, a tall icy crown, long hair, snowflakes swirling around her and an icy palace in the background.',
    description:'Ledová královna v šatech se sněhovými vločkami a ledovou korunou před svým palácem.', featured:false, ageGroup:'5-8', tags:['sněhová královna','princezna','zima'] },
  { slug:'princess-tower-01', title:'Princezna ve věži', category:'princesses', image:'/coloring-pages/princesses/princess-tower-01.png',
    prompt:'A princess with very long flowing hair leaning out of a tall stone tower window, surrounded by climbing roses and vines, birds flying nearby.',
    description:'Princezna s dlouhými vlasy vyklání se z okna kamenné věže ovinuté růžemi.', featured:false, ageGroup:'5-8', tags:['princezna','věž','pohádka'] },
  { slug:'dragon-princess-01', title:'Princezna s drakem', category:'princesses', image:'/coloring-pages/princesses/dragon-princess-01.png',
    prompt:'A brave princess in armor riding a friendly smiling dragon in the sky, with clouds below them and a castle visible in the distance.',
    description:'Odvážná princezna v brnění jede na přátelském drakovi nad oblaky.', featured:false, ageGroup:'6-8', tags:['princezna','drak','dobrodružství'] },

  // Flowers
  { slug:'lotus-01', title:'Lotos', category:'flowers', image:'/coloring-pages/flowers/lotus-01.png',
    prompt:'A beautiful lotus flower blooming on a calm pond with large petals, floating lily pads, a small frog on one of the pads, and ripples in the water.',
    description:'Krásný lotos kvetoucí na klidném rybníku s lekníny a žabičkou na listu.', featured:false, ageGroup:'5-8', tags:['lotos','květ','rybník'] },
  { slug:'poppy-01', title:'Vlčí máky', category:'flowers', image:'/coloring-pages/flowers/poppy-01.png',
    prompt:'A field of poppy flowers with round petals, long stems and leaves, with a butterfly and a bee visiting the flowers, and rolling hills in the background.',
    description:'Pole vlčích máků s motýlem a včelou, v pozadí zvlněné kopce.', featured:false, ageGroup:'4-7', tags:['vlčí mák','pole','příroda'] },
  { slug:'greenhouse-01', title:'Skleník s rostlinami', category:'flowers', image:'/coloring-pages/flowers/greenhouse-01.png',
    prompt:'Inside a greenhouse with large glass panels, filled with tropical plants, hanging vines, potted flowers on shelves, a watering can and gardening tools.',
    description:'Skleník se skleněnými stěnami plný tropických rostlin, květin a zahradního nářadí.', featured:false, ageGroup:'5-8', tags:['skleník','rostliny','zahrada'] },

  // Space
  { slug:'ufo-01', title:'UFO', category:'space', image:'/coloring-pages/space/ufo-01.png',
    prompt:'A classic flying saucer UFO hovering above a grassy field at night, with a beam of light coming down, stars in the sky and a small curious cow looking up at it.',
    description:'Klasické UFO nad polem s paprskem světla, hvězdami a zvídavou krávou dole.', featured:false, ageGroup:'4-7', tags:['UFO','vesmír','létající talíř'] },
  { slug:'space-shuttle-01', title:'Raketoplán', category:'space', image:'/coloring-pages/space/space-shuttle-01.png',
    prompt:'A space shuttle launching from a launch pad with large rocket boosters firing, clouds of smoke billowing out, and the Earth visible in the background.',
    description:'Raketoplán startuje z odpalovací rampy s výfuky plnými kouře a Zemí v pozadí.', featured:false, ageGroup:'5-8', tags:['raketoplán','start','vesmír'] },
  { slug:'nebula-01', title:'Barevná mlhovina', category:'space', image:'/coloring-pages/space/nebula-01.png',
    prompt:'A beautiful cosmic nebula scene with swirling gas clouds in various shapes, bright stars of different sizes scattered throughout, and distant galaxies visible.',
    description:'Krásná kosmická mlhovina s vířícími mraky plynu, jasnými hvězdami a vzdálenými galaxiemi.', featured:false, ageGroup:'6-8', tags:['mlhovina','vesmír','hvězdy'] },

  // Dinosaurs
  { slug:'parasaurolophus-01', title:'Parasaurolophus', category:'dinosaurs', image:'/coloring-pages/dinosaurs/parasaurolophus-01.png',
    prompt:'A Parasaurolophus dinosaur standing upright showing its distinctive long curved crest on its head, walking through a prehistoric swamp with ferns and palm trees.',
    description:'Parasaurolophus s charakteristickým zahnutým hřebenem kráčí pravěkými mokřinami.', featured:false, ageGroup:'5-8', tags:['parasaurolophus','dinosaurus','pravěk'] },
  { slug:'carnotaurus-01', title:'Carnotaurus', category:'dinosaurs', image:'/coloring-pages/dinosaurs/carnotaurus-01.png',
    prompt:'A Carnotaurus dinosaur with its distinctive bull-like horns above the eyes, short arms, powerful legs, in a running pose through an open prehistoric landscape.',
    description:'Carnotaurus s rohy nad očima v dynamickém běžícím postoji v pravěké krajině.', featured:false, ageGroup:'5-8', tags:['carnotaurus','dinosaurus','rohy'] },
  { slug:'dino-volcano-01', title:'Dinosauři u sopky', category:'dinosaurs', image:'/coloring-pages/dinosaurs/dino-volcano-01.png',
    prompt:'A dramatic scene with a large erupting volcano in the background with lava and smoke, several different dinosaurs in the foreground running through a prehistoric jungle.',
    description:'Dramatická scéna s erupcí sopky a dinosaury prchajícími pravěkou džunglí.', featured:false, ageGroup:'6-8', tags:['dinosaurus','sopka','pravěk'] },

  // Ocean
  { slug:'narwhal-01', title:'Narval', category:'ocean', image:'/coloring-pages/ocean/narwhal-01.png',
    prompt:'A cute narwhal swimming underwater with its distinctive long spiral tusk, surrounded by bubbles, small fish, and glowing bioluminescent sea plants.',
    description:'Roztomilý narval s dlouhým spirálovitým clonem plave pod vodou mezi rybkami.', featured:false, ageGroup:'4-7', tags:['narval','moře','jednorožec moře'] },
  { slug:'manta-ray-01', title:'Rejnok manta', category:'ocean', image:'/coloring-pages/ocean/manta-ray-01.png',
    prompt:'A majestic manta ray gliding gracefully through clear ocean water, with detailed wing-like fins, small fish swimming alongside it and coral reef below.',
    description:'Majestátní rejnok manta klouže oceánem se svými křídlovitými ploutvemi nad korálovým útesem.', featured:false, ageGroup:'5-8', tags:['rejnok','oceán','manta'] },
  { slug:'pirate-ship-01', title:'Pirátská loď', category:'ocean', image:'/coloring-pages/ocean/pirate-ship-01.png',
    prompt:'A detailed pirate ship with full sails including a skull and crossbones flag, cannons along the side, ropes and rigging, sailing on rough ocean waves.',
    description:'Detailní pirátská loď s plachtami, vlajkou s lebkou, kanóny a lany na rozbouřeném moři.', featured:false, ageGroup:'6-8', tags:['pirát','loď','moře'] },

  // Fairytales
  { slug:'gingerbread-house-01', title:'Perníková chaloupka', category:'fairytales', image:'/coloring-pages/fairytales/gingerbread-house-01.png',
    prompt:'A detailed gingerbread house decorated with candy canes, lollipops, frosting on the roof like snow, gumdrop windows, a pretzel door and a path of cookies leading to it.',
    description:'Detailní perníková chaloupka s lízátky, cukrovím, oplatkovými okny a cestičkou ze sušenek.', featured:false, ageGroup:'4-7', tags:['perník','chaloupka','pohádka'] },
  { slug:'three-pigs-01', title:'Tři prasátka', category:'fairytales', image:'/coloring-pages/fairytales/three-pigs-01.png',
    prompt:'Three little pigs standing in front of their three houses: a straw house, a wooden house, and a brick house. A friendly wolf watching from behind a bush.',
    description:'Tři prasátka stojí před svými domečky ze slámy, dřeva a cihel, vlk se dívá z keře.', featured:false, ageGroup:'4-7', tags:['prasátka','pohádka','tři'] },
  { slug:'jack-beanstalk-01', title:'Jack a fazolový keř', category:'fairytales', image:'/coloring-pages/fairytales/jack-beanstalk-01.png',
    prompt:'Jack climbing an enormous beanstalk that spirals up through clouds into the sky, with a tiny village visible far below and a giant castle in the clouds above.',
    description:'Jack šplhá po obrovském fazolíčku spirálujícím přes mraky, dole vesnice a nahoře obrův hrad.', featured:false, ageGroup:'5-8', tags:['Jack','fazolový keř','pohádka'] },

  // Food
  { slug:'ramen-01', title:'Miska ramen', category:'food', image:'/coloring-pages/food/ramen-01.png',
    prompt:'A steaming bowl of ramen noodles with sliced egg, vegetables, mushrooms, chopsticks resting on the bowl, and a Japanese style table setting.',
    description:'Kouřící miska ramen s nudlemi, vejcem, zeleninou a hůlkami v japonském stylu.', featured:false, ageGroup:'5-8', tags:['ramen','jídlo','japonsko'] },
  { slug:'taco-01', title:'Tacos', category:'food', image:'/coloring-pages/food/taco-01.png',
    prompt:'Three tacos in a taco stand holder, filled with meat, lettuce, tomato, cheese and salsa, with a lime wedge, surrounded by decorative peppers and cilantro.',
    description:'Tři tacos plné masa, salátu, rajčat a sýra v stojánku s limetkou a papričkami.', featured:false, ageGroup:'4-7', tags:['taco','jídlo','mexiko'] },
  { slug:'smoothie-01', title:'Ovocné smoothie', category:'food', image:'/coloring-pages/food/smoothie-01.png',
    prompt:'A tall glass of fruit smoothie with a colorful paper straw, surrounded by the fresh fruits used to make it: strawberries, banana, blueberries and mango slices.',
    description:'Vysoká sklenička ovocného smoothie se slámkou, obklopená jahodami, banánem a mangem.', featured:false, ageGroup:'4-7', tags:['smoothie','ovoce','nápoj'] },

  // Sports
  { slug:'yoga-01', title:'Jóga', category:'sports', image:'/coloring-pages/sports/yoga-01.png',
    prompt:'A child doing a yoga tree pose, standing on one leg with hands pressed together above head, on a yoga mat, with simple nature scenery around them.',
    description:'Dítě v jógové pozici stromu stojí na jedné noze na podložce s přírodou v pozadí.', featured:false, ageGroup:'5-8', tags:['jóga','sport','rovnováha'] },
  { slug:'ice-skating-01', title:'Bruslení', category:'sports', image:'/coloring-pages/sports/ice-skating-01.png',
    prompt:'A child ice skating on a frozen pond with a scarf and hat, making figure eight tracks in the ice, pine trees covered in snow around the edge of the pond.',
    description:'Dítě s šálou a čepicí bruslí na zamrzlém rybníku se zasněženými stromy kolem.', featured:false, ageGroup:'4-7', tags:['bruslení','sport','zima'] },
  { slug:'rowing-01', title:'Veslování', category:'sports', image:'/coloring-pages/sports/rowing-01.png',
    prompt:'A child rowing a small wooden boat on a calm lake, holding two oars, with ducks swimming nearby, water lilies and reeds along the shore.',
    description:'Dítě veslem pohání loďku na klidném jezeře, kolem plavou kachničky a lekníny.', featured:false, ageGroup:'5-8', tags:['veslování','sport','loďka'] },

  // Buildings
  { slug:'eiffel-tower-01', title:'Eiffelova věž', category:'buildings', image:'/coloring-pages/buildings/eiffel-tower-01.png',
    prompt:'The iconic Eiffel Tower with detailed lattice ironwork, set against a background with the River Seine, a small boat, trees lining the boulevard and a few clouds.',
    description:'Ikonická Eiffelova věž s mřížkovou konstrukcí, řekou Seinou a stromy v aleji.', featured:false, ageGroup:'5-8', tags:['Eiffelova věž','Paříž','stavba'] },
  { slug:'colosseum-01', title:'Koloseum', category:'buildings', image:'/coloring-pages/buildings/colosseum-01.png',
    prompt:'The ancient Roman Colosseum with its distinctive arched tiers, detailed stonework, a crowd of tiny figures around the outside and a blue sky with clouds above.',
    description:'Starověké římské Koloseum s obloukovými arkádami a kamennou architekturou.', featured:false, ageGroup:'6-8', tags:['Koloseum','Řím','architektura'] },
  { slug:'igloo-01', title:'Iglú', category:'buildings', image:'/coloring-pages/buildings/igloo-01.png',
    prompt:'A traditional igloo built from ice blocks in an Arctic landscape, with a small entrance tunnel, the Northern Lights glowing in the sky above and a polar bear nearby.',
    description:'Tradiční iglú z ledových bloků v arktické krajině se severní září a ledním medvědem.', featured:false, ageGroup:'4-7', tags:['iglú','arktida','stavba'] },

  // Clothes
  { slug:'superhero-costume-01', title:'Superhrdina', category:'clothes', image:'/coloring-pages/clothes/superhero-costume-01.png',
    prompt:'A superhero costume displayed with a flowing cape, a mask, boots with lightning bolt symbols, a utility belt and a chest emblem, on a mannequin.',
    description:'Kostým superhrdiny s pláštěm, maskou, botami s blesky a pásem nářadí.', featured:false, ageGroup:'4-7', tags:['superhrdina','kostým','oblečení'] },
  { slug:'witch-halloween-01', title:'Čarodějnický kostým', category:'clothes', image:'/coloring-pages/clothes/witch-halloween-01.png',
    prompt:'A Halloween witch costume with a tall pointy black hat, a flowing dark cape, a striped dress, witch boots, and a broomstick with a bow propped against it.',
    description:'Halloween čarodějnický kostým s vysokým kloboučkem, pláštěm, proužkovaným šatem a koštětem.', featured:false, ageGroup:'4-7', tags:['čarodějnice','halloween','kostým'] },
  { slug:'fairy-costume-01', title:'Vílí kostým', category:'clothes', image:'/coloring-pages/clothes/fairy-costume-01.png',
    prompt:'A fairy costume laid out with a sparkly tutu skirt, a decorated top, delicate transparent butterfly wings, a flower crown, a wand with a star and glittery shoes.',
    description:'Vílí kostým s třpytivou sukní, průsvitnými křídly, věncem z květin a hůlkou s hvězdou.', featured:false, ageGroup:'4-7', tags:['víla','kostým','oblečení'] },

  // Jobs
  { slug:'judge-01', title:'Soudce', category:'jobs', image:'/coloring-pages/jobs/judge-01.png',
    prompt:'A judge sitting at a large bench in a courtroom, wearing robes and a traditional wig, holding a wooden gavel, with bookshelves full of law books behind.',
    description:'Soudce v taláru a paruce sedí v soudní síni s paličkou a policemi plnými knih.', featured:false, ageGroup:'5-8', tags:['soudce','právo','povolání'] },
  { slug:'musician-01', title:'Hudebník', category:'jobs', image:'/coloring-pages/jobs/musician-01.png',
    prompt:'A musician sitting on a stool playing an acoustic guitar with their eyes closed, musical notes floating around them, spotlights shining from above on a small stage.',
    description:'Hudebník sedí na stoličce s kytarou a zavřenýma očima, kolem létají noty a svítí reflektory.', featured:false, ageGroup:'5-8', tags:['hudebník','kytara','povolání'] },
  { slug:'sailor-01', title:'Námořník', category:'jobs', image:'/coloring-pages/jobs/sailor-01.png',
    prompt:'A friendly sailor in a navy uniform with a sailor hat, standing on the deck of a ship, looking through a telescope, with ocean waves and seagulls around.',
    description:'Přátelský námořník v uniformě na palubě lodi hledí dalekohledem na moře s racky.', featured:false, ageGroup:'4-7', tags:['námořník','loď','povolání'] },
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
