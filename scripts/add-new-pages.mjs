import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'data/coloring-pages.json');
const pages = JSON.parse(readFileSync(path, 'utf8'));

const newPages = [
  // Animals
  { slug:'hamster-01', title:'Křeček', category:'animals', image:'/coloring-pages/animals/hamster-01.png',
    prompt:'A cute hamster with very chubby cheeks full of food, sitting up on its hind legs next to a food bowl, with bedding material around.',
    description:'Roztomilý křeček s nafouklými tváříčkami sedí u misky s jídlem.', featured:false, ageGroup:'4-7', tags:['křeček','zvířata','mazlíček'] },
  { slug:'chick-01', title:'Kuřátko', category:'animals', image:'/coloring-pages/animals/chick-01.png',
    prompt:'A fluffy baby chick that has just hatched, standing next to its cracked eggshell, with downy feathers, big round eyes and a tiny beak.',
    description:'Nadýchané kuřátko právě vylíhnuté stojí u rozpraskané skořápky s velkýma očima.', featured:false, ageGroup:'4-7', tags:['kuřátko','zvířata','vejce'] },
  { slug:'wolf-01', title:'Vlk vyjící na měsíc', category:'animals', image:'/coloring-pages/animals/wolf-01.png',
    prompt:'A detailed wolf standing on a rocky hilltop howling at a large full moon, with pine trees silhouetted in the background and stars in the night sky.',
    description:'Detailní vlk stojí na skále a vyje na úplněk, v pozadí siluety borovic.', featured:false, ageGroup:'6-8', tags:['vlk','měsíc','příroda'] },
  { slug:'kangaroo-01', title:'Klokan s mládětem', category:'animals', image:'/coloring-pages/animals/kangaroo-01.png',
    prompt:'A detailed kangaroo with a tiny joey peeking out from its pouch, in an Australian outback landscape with red rock formations and eucalyptus trees.',
    description:'Detailní klokan s malým mládětem v váčku v australské krajině s červenými skalami.', featured:false, ageGroup:'6-8', tags:['klokan','Austrálie','zvířata'] },

  // Cars
  { slug:'go-kart-01', title:'Motokára', category:'cars', image:'/coloring-pages/cars/go-kart-01.png',
    prompt:'A child wearing a helmet and racing suit driving a go-kart on a race track, leaning into a corner, with track barriers and chequered flags.',
    description:'Dítě v přilbě a závodní kombinéze řídí motokáru na závodní dráze.', featured:false, ageGroup:'4-7', tags:['motokára','závod','sport'] },
  { slug:'jeep-01', title:'Jeep', category:'cars', image:'/coloring-pages/cars/jeep-01.png',
    prompt:'A rugged off-road jeep with large tyres driving over rocky terrain through mud, with a spare tyre on the back, a roof rack and a jungle background.',
    description:'Terénní jeep s velkými koly jede přes kamenitý terén s džunglí v pozadí.', featured:false, ageGroup:'4-7', tags:['jeep','terén','dobrodružství'] },
  { slug:'hot-air-balloon-01', title:'Horkovzdušný balon', category:'cars', image:'/coloring-pages/cars/hot-air-balloon-01.png',
    prompt:'A colourful hot air balloon with a decorated envelope floating high above a patchwork of fields, rivers and forests, with birds flying alongside.',
    description:'Barevný horkovzdušný balon letí vysoko nad polemi, řekami a lesy.', featured:false, ageGroup:'6-8', tags:['balon','létání','výhled'] },
  { slug:'racing-truck-01', title:'Závodní truck', category:'cars', image:'/coloring-pages/cars/racing-truck-01.png',
    prompt:'A detailed racing truck with sponsor decals, a large spoiler, custom exhaust pipes and big racing wheels, parked on a race track with pit crew equipment around.',
    description:'Detailní závodní truck s reklamami, spoilerem a závodními koly na trati.', featured:false, ageGroup:'6-8', tags:['truck','závod','doprava'] },

  // Princesses
  { slug:'princess-reading-01', title:'Princezna s knihou', category:'princesses', image:'/coloring-pages/princesses/princess-reading-01.png',
    prompt:'A princess in a beautiful dress sitting cosily in a large armchair reading a big fairy tale book, with a cat on her lap, bookshelves behind and a candle on a table.',
    description:'Princezna v krásném šatu sedí v křesle a čte pohádkovou knihu s kočičkou.', featured:false, ageGroup:'4-7', tags:['princezna','čtení','pohádka'] },
  { slug:'little-witch-01', title:'Malá čarodějka', category:'princesses', image:'/coloring-pages/princesses/little-witch-01.png',
    prompt:'A small cute little witch with a big pointed hat, a tiny broomstick, a small cauldron with a tiny puff of smoke, and a black cat, casting a friendly spell.',
    description:'Malá roztomilá čarodějka s kloboučkem, koštětem, kotlíkem a černou kočičkou.', featured:false, ageGroup:'4-7', tags:['čarodějka','magie','pohádka'] },
  { slug:'fairy-tale-wedding-01', title:'Pohádková svatba', category:'princesses', image:'/coloring-pages/princesses/fairy-tale-wedding-01.png',
    prompt:'A fairy tale wedding ceremony with a princess in an elaborate gown and a prince, standing under a floral arch, with fairy lights, guests, flowers and a wedding cake.',
    description:'Pohádková svatba s princeznou a princem pod kvetoucím obloukem s hosty a dortem.', featured:false, ageGroup:'6-8', tags:['svatba','princezna','pohádka'] },
  { slug:'mermaid-treasure-01', title:'Mořská panna s pokladem', category:'princesses', image:'/coloring-pages/princesses/mermaid-treasure-01.png',
    prompt:'A mermaid discovering a glowing open treasure chest on the ocean floor, surrounded by gold coins, gems, sea plants, curious fish and a sunken anchor.',
    description:'Mořská panna objevuje žhnoucí truhlu pokladu na mořském dně obklopenou zlatem.', featured:false, ageGroup:'6-8', tags:['mořská panna','poklad','moře'] },

  // Flowers
  { slug:'iris-01', title:'Kosatce', category:'flowers', image:'/coloring-pages/flowers/iris-01.png',
    prompt:'A beautiful cluster of iris flowers with their distinctive ruffled petals, long flat leaves and tall stems, growing in a garden border.',
    description:'Krásné kosatce s typickými zvlněnými okvětními lístky a plochými listy v zahradě.', featured:false, ageGroup:'4-7', tags:['kosatec','květ','zahrada'] },
  { slug:'daffodil-01', title:'Narcisy', category:'flowers', image:'/coloring-pages/flowers/daffodil-01.png',
    prompt:'A cheerful bunch of daffodils with their distinctive trumpet-shaped centres and petals, growing in a spring garden with a butterfly nearby.',
    description:'Veselé narcisy s trumpetovitými středy kvetou v jarní zahradě s motýlem.', featured:false, ageGroup:'4-7', tags:['narcis','jaro','květ'] },
  { slug:'rose-garden-01', title:'Růžová zahrada', category:'flowers', image:'/coloring-pages/flowers/rose-garden-01.png',
    prompt:'A detailed rose garden with arching rose bushes in full bloom, a winding stone path, a wooden garden bench, a trellis covered in climbing roses and a garden fountain.',
    description:'Detailní růžová zahrada s kvetoucími keři, cestou, lavičkou a fontánou.', featured:false, ageGroup:'6-8', tags:['růže','zahrada','romantika'] },
  { slug:'flower-market-01', title:'Květinový trh', category:'flowers', image:'/coloring-pages/flowers/flower-market-01.png',
    prompt:'A detailed outdoor flower market with colourful buckets and vases full of various flowers, a vendor arranging bouquets, shoppers, hanging flower baskets and market stalls.',
    description:'Detailní venkovní květinový trh s kyblíky plnými květin, prodavačem a nakupujícími.', featured:false, ageGroup:'6-8', tags:['trh','květiny','obchod'] },

  // Space
  { slug:'planet-earth-01', title:'Planeta Země', category:'space', image:'/coloring-pages/space/planet-earth-01.png',
    prompt:'Planet Earth seen from space with continents, swirling cloud formations over the oceans, with the Moon visible in the background and stars around.',
    description:'Planeta Země z vesmíru s kontinenty, mraky nad oceány a Měsícem v pozadí.', featured:false, ageGroup:'4-7', tags:['Země','planeta','vesmír'] },
  { slug:'meteor-shower-01', title:'Meteorický déšť', category:'space', image:'/coloring-pages/space/meteor-shower-01.png',
    prompt:'A beautiful meteor shower with dozens of bright streaking meteors lighting up the night sky over a dark hilly landscape with a person watching from below.',
    description:'Krásný meteorický déšť s desítkami meteoritů osvětlujících noční oblohu nad krajinou.', featured:false, ageGroup:'4-7', tags:['meteor','hvězdy','noc'] },
  { slug:'wormhole-01', title:'Červí díra', category:'space', image:'/coloring-pages/space/wormhole-01.png',
    prompt:'A dramatic space wormhole depicted as a glowing tunnel with swirling energy rings, stars being pulled towards it, a spaceship entering it and a distant galaxy visible.',
    description:'Dramatická červí díra jako žhnoucí tunel s vířivými prstenci a vesmírnou lodí.', featured:false, ageGroup:'6-8', tags:['červí díra','vesmír','sci-fi'] },
  { slug:'space-city-01', title:'Vesmírné město', category:'space', image:'/coloring-pages/space/space-city-01.png',
    prompt:'A detailed futuristic city on a large space platform, with tall towers, connecting bridges, landing pads with spaceships, domes, and a planet and stars visible around.',
    description:'Detailní futuristické město na vesmírné platformě s věžemi, mosty a kosmickými loděmi.', featured:false, ageGroup:'6-8', tags:['vesmírné město','budoucnost','sci-fi'] },

  // Dinosaurs
  { slug:'dino-family-01', title:'Dinosauří rodina', category:'dinosaurs', image:'/coloring-pages/dinosaurs/dino-family-01.png',
    prompt:'A dinosaur family of three — a large mum, a large dad and a small baby dinosaur — walking together through a prehistoric landscape with ferns and trees.',
    description:'Dinosauří rodina — velká máma, táta a malé mládě — kráčí pravěkou krajinou.', featured:false, ageGroup:'4-7', tags:['dinosaurus','rodina','pravěk'] },
  { slug:'baby-rex-01', title:'Malý T-Rex', category:'dinosaurs', image:'/coloring-pages/dinosaurs/baby-rex-01.png',
    prompt:'A cute chubby baby T-Rex with tiny arms, a big round head, big eyes and a friendly smile, sitting down with its short tail curled around it.',
    description:'Roztomilý tučný malý T-Rex s maličkými ručičkami, velkými očima a přátelským úsměvem.', featured:false, ageGroup:'4-7', tags:['T-Rex','mládě','dinosaurus'] },
  { slug:'mammoth-01', title:'Mamut', category:'dinosaurs', image:'/coloring-pages/dinosaurs/mammoth-01.png',
    prompt:'A detailed woolly mammoth with long curved tusks, shaggy thick fur and a raised trunk, standing in a snowy Ice Age landscape with pine trees and mountains.',
    description:'Detailní mamut s dlouhými zahnutými kly a hustou srstí v zasněžené krajině doby ledové.', featured:false, ageGroup:'6-8', tags:['mamut','doba ledová','pravěk'] },
  { slug:'ice-age-scene-01', title:'Doba ledová', category:'dinosaurs', image:'/coloring-pages/dinosaurs/ice-age-scene-01.png',
    prompt:'A detailed Ice Age scene with a woolly mammoth, a sabre-tooth tiger crouching on a rock, a giant ground sloth and cave people around a fire in a snowy valley.',
    description:'Detailní scéna doby ledové s mamutem, šavlozubým tygrem a pravěkými lidmi u ohně.', featured:false, ageGroup:'6-8', tags:['doba ledová','mamut','pravěk'] },

  // Ocean
  { slug:'seal-01', title:'Tuleň', category:'ocean', image:'/coloring-pages/ocean/seal-01.png',
    prompt:'A cute seal resting on an ice floe with a happy face and big dark eyes, with arctic ocean water around, a few seagulls above and ice formations in the background.',
    description:'Roztomilý tuleň odpočívá na kře s šťastnou tváří a tmavýma očima v arktickém moři.', featured:false, ageGroup:'4-7', tags:['tuleň','arktida','moře'] },
  { slug:'lobster-01', title:'Humr', category:'ocean', image:'/coloring-pages/ocean/lobster-01.png',
    prompt:'A friendly lobster on the sandy sea floor with large claws held up, long antennae, walking legs, surrounded by seaweed, shells and small colourful fish.',
    description:'Přátelský humr na písčitém mořském dně s velkými klepety, chapadly a rybkami.', featured:false, ageGroup:'4-7', tags:['humr','oceán','dno'] },
  { slug:'underwater-city-01', title:'Podmořské město', category:'ocean', image:'/coloring-pages/ocean/underwater-city-01.png',
    prompt:'A detailed underwater city with dome-shaped buildings, streets with fish swimming along them, submarines as transport, glowing windows, coral gardens and a large central tower.',
    description:'Detailní podmořské město s kupolovitými budovami, ulicemi s rybami a ponorkami.', featured:false, ageGroup:'6-8', tags:['podmořské město','oceán','sci-fi'] },
  { slug:'ocean-explorer-01', title:'Podmořský průzkumník', category:'ocean', image:'/coloring-pages/ocean/ocean-explorer-01.png',
    prompt:'A scuba diver in full diving gear with a torch and underwater camera exploring a vibrant coral reef, with tropical fish, a sea turtle, a manta ray and coral all around.',
    description:'Potápěč s baterkou a kamerou prozkoumává korálový útes s rybami a mořskou želvou.', featured:false, ageGroup:'6-8', tags:['potápěč','korál','průzkum'] },

  // Fairytales
  { slug:'little-red-01', title:'Červená karkulka', category:'fairytales', image:'/coloring-pages/fairytales/little-red-01.png',
    prompt:'Little Red Riding Hood in her red cloak with a basket of goodies, walking along a forest path with tall trees, flowers, a bird singing and sunlight filtering through.',
    description:'Červená karkulka v červeném plášti s košíkem kráčí lesní stezkou s ptáčkem.', featured:false, ageGroup:'4-7', tags:['Červená karkulka','pohádka','les'] },
  { slug:'puss-in-boots-01', title:'Kocour v botách', category:'fairytales', image:'/coloring-pages/fairytales/puss-in-boots-01.png',
    prompt:'Puss in Boots standing confidently with a plumed hat, leather boots, a small sword at his side and a bag over his shoulder, with a mischievous grin.',
    description:'Kocour v botách s péřovým kloboukem, koženými botami a mečem v sebejistém postoji.', featured:false, ageGroup:'4-7', tags:['Kocour v botách','pohádka','kocour'] },
  { slug:'cinderella-01', title:'Popelka', category:'fairytales', image:'/coloring-pages/fairytales/cinderella-01.png',
    prompt:'Cinderella in a sparkling ball gown stepping into a magical pumpkin carriage, with her fairy godmother nearby, magical sparkles all around and a moonlit castle in the distance.',
    description:'Popelka v třpytivém plášti nastupuje do dýňového kočáru s kmotrnou a magickým třpytem.', featured:false, ageGroup:'6-8', tags:['Popelka','pohádka','kočár'] },
  { slug:'seven-dwarfs-01', title:'Sněhurka a trpaslíci', category:'fairytales', image:'/coloring-pages/fairytales/seven-dwarfs-01.png',
    prompt:'Snow White standing with all seven dwarfs in front of their cosy cottage in the woods, each dwarf with a different expression, with a garden and apple tree nearby.',
    description:'Sněhurka se sedmi trpaslíky před jejich chaloupkou v lese s každým trpaslíkem jiným výrazem.', featured:false, ageGroup:'6-8', tags:['Sněhurka','trpaslíci','pohádka'] },

  // Food
  { slug:'lollipop-01', title:'Lízátka', category:'food', image:'/coloring-pages/food/lollipop-01.png',
    prompt:'A cheerful collection of colourful round lollipops on sticks with different swirl and stripe patterns, some in a jar and some held by a child\'s hand.',
    description:'Veselá sbírka barevných lízátek s různými vzory — v dóze i v dětské ruce.', featured:false, ageGroup:'4-7', tags:['lízátko','cukroví','jídlo'] },
  { slug:'pancakes-01', title:'Palačinky', category:'food', image:'/coloring-pages/food/pancakes-01.png',
    prompt:'A tall stack of fluffy pancakes on a plate with a pat of melting butter on top, maple syrup drizzling down, fresh strawberries and blueberries around.',
    description:'Vysoká vrstva nadýchaných palačinek s máslem, javorovým sirupem a čerstvým ovocem.', featured:false, ageGroup:'4-7', tags:['palačinky','snídaně','jídlo'] },
  { slug:'cooking-scene-01', title:'Vaření v kuchyni', category:'food', image:'/coloring-pages/food/cooking-scene-01.png',
    prompt:'A detailed cosy kitchen scene with pots bubbling on a stove, vegetables being chopped, herbs hanging to dry, a cookbook open on the counter and a happy cook stirring.',
    description:'Detailní útulná kuchyně s bublajícími hrnci, zeleninou, bylinkami a kuchařem.', featured:false, ageGroup:'6-8', tags:['vaření','kuchyně','jídlo'] },
  { slug:'chocolate-factory-01', title:'Čokoládová továrna', category:'food', image:'/coloring-pages/food/chocolate-factory-01.png',
    prompt:'A fantastical chocolate factory interior with chocolate rivers, conveyor belts of sweets, giant mixing machines, waterfalls of cocoa, and Oompa Loompa-style workers.',
    description:'Fantastická čokoládová továrna s čokoládovými řekami, pásy bonbonů a vodopády kakaa.', featured:false, ageGroup:'6-8', tags:['čokoláda','továrna','fantazie'] },

  // Sports
  { slug:'horse-riding-01', title:'Jízda na koni', category:'sports', image:'/coloring-pages/sports/horse-riding-01.png',
    prompt:'A child wearing a riding helmet and jodhpurs on horseback, trotting in an arena with show jumps visible, a trainer watching from the fence.',
    description:'Dítě s přilbou v sedle koně kluše na jezdeckém kolbišti se skákacími překážkami.', featured:false, ageGroup:'4-7', tags:['jízda na koni','kůň','sport'] },
  { slug:'dancing-01', title:'Tanec', category:'sports', image:'/coloring-pages/sports/dancing-01.png',
    prompt:'A child in a ballet tutu and pointe shoes dancing gracefully on a stage with a spotlight shining down, arms raised elegantly and a ballet barre visible in the background.',
    description:'Dítě v baletním kostýmu tančí elegantně na jevišti pod reflektorem s baletem v pozadí.', featured:false, ageGroup:'4-7', tags:['tanec','balet','umění'] },
  { slug:'fencing-01', title:'Šerm', category:'sports', image:'/coloring-pages/sports/fencing-01.png',
    prompt:'Two fencers in full protective gear including masks, jackets and gloves, in an attacking and defending stance with their swords crossed, on a fencing piste.',
    description:'Dva šermíři v ochranné výstroji s maskami a křísícími se kordy na šermíři dráze.', featured:false, ageGroup:'6-8', tags:['šerm','mečíky','sport'] },
  { slug:'skateboarding-01', title:'Skateboarding', category:'sports', image:'/coloring-pages/sports/skateboarding-01.png',
    prompt:'A skateboarder in a helmet and knee pads performing a kickflip trick in the air at a skate park, with ramps, rails and graffiti-decorated walls in the background.',
    description:'Skater v přilbě provádí trik ve vzduchu na skateparku s rampami a graffiti.', featured:false, ageGroup:'6-8', tags:['skateboard','trik','sport'] },

  // Buildings
  { slug:'church-01', title:'Kostel', category:'buildings', image:'/coloring-pages/buildings/church-01.png',
    prompt:'A charming village church with a bell tower, stained glass windows, a wooden front door with an arch, a small cemetery with stone crosses and a path lined with flowers.',
    description:'Útulný vesnický kostel se zvonicí, vitráží, dřevěnými dveřmi a hřbitovem s křížky.', featured:false, ageGroup:'4-7', tags:['kostel','vesnice','budova'] },
  { slug:'watermill-01', title:'Vodní mlýn', category:'buildings', image:'/coloring-pages/buildings/watermill-01.png',
    prompt:'A picturesque old watermill with a large turning wooden water wheel, a half-timbered mill building, a stream running underneath, ducks on the water and willow trees.',
    description:'Malebný starý vodní mlýn s velkým kolem, hrázděnou budovou, potokem a vrbami.', featured:false, ageGroup:'4-7', tags:['vodní mlýn','potok','vesnická stavba'] },
  { slug:'cathedral-01', title:'Katedrála', category:'buildings', image:'/coloring-pages/buildings/cathedral-01.png',
    prompt:'A grand Gothic cathedral with pointed spires reaching the sky, flying buttresses, large ornate rose windows, detailed stone carvings on the facade and a grand entrance portal.',
    description:'Velkolepá gotická katedrála se špičatými věžemi, opěrnými oblouky a ornamentálními okny.', featured:false, ageGroup:'6-8', tags:['katedrála','gotika','architektura'] },
  { slug:'opera-house-01', title:'Operní dům', category:'buildings', image:'/coloring-pages/buildings/opera-house-01.png',
    prompt:'A dramatic modern opera house with distinctive curved shell-shaped roof structures sitting on a harbour waterfront, with boats in the water and a city skyline behind.',
    description:'Dramatický moderní operní dům s charakteristickými střechami ve tvaru mušlí u přístavu.', featured:false, ageGroup:'6-8', tags:['opera','architektura','přístav'] },

  // Clothes
  { slug:'hat-collection-01', title:'Kolekce klobouků', category:'clothes', image:'/coloring-pages/clothes/hat-collection-01.png',
    prompt:'A fun display of various hats on hat stands: a top hat, a cowboy hat, a beret, a party hat with stars, a sun hat with flowers and a crown, each with different details.',
    description:'Veselá kolekce klobouků na stojanech — cylindr, kovbojský, baret, party klobouk a koruna.', featured:false, ageGroup:'4-7', tags:['klobouky','kolekce','oblečení'] },
  { slug:'scarf-set-01', title:'Zimní souprava', category:'clothes', image:'/coloring-pages/clothes/scarf-set-01.png',
    prompt:'A cosy winter set laid out with a knitted scarf with fringe, matching pompom hat, patterned mittens, ear muffs and thick woolly socks, all with similar patterns.',
    description:'Útulná zimní souprava s pleteným šálou, čepicí s bambulí, palčáky a ponožkami.', featured:false, ageGroup:'4-7', tags:['šála','čepice','zima'] },
  { slug:'pirate-costume-01', title:'Pirátský kostým', category:'clothes', image:'/coloring-pages/clothes/pirate-costume-01.png',
    prompt:'A detailed pirate costume displayed: a tricorn hat with skull and crossbones, a red coat with gold buttons, striped trousers, leather boots, an eye patch, a hook hand and a parrot perched on top.',
    description:'Detailní pirátský kostým s třírohým kloboukem, červeným kabátem, hákem a papouškem.', featured:false, ageGroup:'6-8', tags:['pirát','kostým','dobrodružství'] },
  { slug:'royal-robe-01', title:'Královský plášť', category:'clothes', image:'/coloring-pages/clothes/royal-robe-01.png',
    prompt:'An elaborate royal robe on a mannequin with rich ermine-trimmed edges, a golden crown on a cushion beside it, a royal sceptre, an orb and a ceremonial chain.',
    description:'Velkolepý královský plášť na figuríně s hermelínovým lemem, korunou, žezlem a řádem.', featured:false, ageGroup:'6-8', tags:['královský','plášť','koruna'] },

  // Jobs
  { slug:'baker-01', title:'Pekař', category:'jobs', image:'/coloring-pages/jobs/baker-01.png',
    prompt:'A friendly baker in a white apron and tall chef\'s hat holding a fresh golden loaf of bread, surrounded by trays of bread, croissants and pastries in a bakery.',
    description:'Přátelský pekař v bílé zástěře a čepici drží čerstvý bochník chleba v pekárně.', featured:false, ageGroup:'4-7', tags:['pekař','pekárna','povolání'] },
  { slug:'librarian-01', title:'Knihovník', category:'jobs', image:'/coloring-pages/jobs/librarian-01.png',
    prompt:'A friendly librarian at a library desk stamping a book for a child, with tall bookshelves behind filled with books, a reading area with comfortable chairs and a globe.',
    description:'Přátelský knihovník razítkuje knihu dítěti u pultu v knihovně s policemi knih.', featured:false, ageGroup:'4-7', tags:['knihovník','knihovna','povolání'] },
  { slug:'photographer-01', title:'Fotograf', category:'jobs', image:'/coloring-pages/jobs/photographer-01.png',
    prompt:'A photographer with a professional camera on a tripod outdoors, adjusting the lens, with a camera bag, extra lenses, and a laptop showing photos, in a park setting.',
    description:'Fotograf s profesionálním fotoaparátem na stativu venku s objektivy a notebookem.', featured:false, ageGroup:'6-8', tags:['fotograf','fotografie','povolání'] },
  { slug:'surgeon-01', title:'Chirurg', category:'jobs', image:'/coloring-pages/jobs/surgeon-01.png',
    prompt:'A surgeon in green surgical scrubs, cap and mask standing in a bright operating theatre with surgical lights above, medical equipment on a tray and monitors in the background.',
    description:'Chirurg v operačním sále s chirurgickými světly, nástroji na tácu a monitory.', featured:false, ageGroup:'6-8', tags:['chirurg','operace','povolání'] },
];

const existing = new Set(pages.map(p => p.slug));
const toAdd = newPages.filter(p => {
  if (existing.has(p.slug)) { console.log(`skip (exists): ${p.slug}`); return false; }
  return true;
});
const updated = [...pages, ...toAdd];
writeFileSync(path, JSON.stringify(updated, null, 2));
console.log(`Added ${toAdd.length} new pages. Total: ${updated.length}`);
