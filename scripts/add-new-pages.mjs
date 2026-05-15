import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'data/coloring-pages.json');
const pages = JSON.parse(readFileSync(path, 'utf8'));

const newPages = [
  // Animals — 2×4-7, 2×6-8
  { slug:'squirrel-01', title:'Veverka', category:'animals', image:'/coloring-pages/animals/squirrel-01.png',
    prompt:'A cute squirrel sitting on a tree branch holding an acorn, with a big fluffy tail, big eyes and leaves around it.',
    description:'Roztomilá veverka s velkým ocasem sedí na větvi a drží žalud.', featured:false, ageGroup:'4-7', tags:['veverka','zvířata','les'] },
  { slug:'duck-01', title:'Kachna s kachňaty', category:'animals', image:'/coloring-pages/animals/duck-01.png',
    prompt:'A mama duck walking with three cute ducklings following behind her, heading towards a small pond with reeds and water lilies.',
    description:'Kachna se třemi kachňaty kráčí k rybníčku s rákosím a lekníny.', featured:false, ageGroup:'4-7', tags:['kachna','kachňata','zvířata'] },
  { slug:'bear-01', title:'Medvěd u řeky', category:'animals', image:'/coloring-pages/animals/bear-01.png',
    prompt:'A detailed brown bear standing in a river catching a large salmon fish, with trees and rocks on the riverbank and mountains in the background.',
    description:'Detailní medvěd stojí v řece a chytá lososa, v pozadí stromy a hory.', featured:false, ageGroup:'6-8', tags:['medvěd','řeka','zvířata'] },
  { slug:'tiger-01', title:'Tygr v džungli', category:'animals', image:'/coloring-pages/animals/tiger-01.png',
    prompt:'A detailed tiger with visible stripes walking through tall jungle grass, with tropical plants, trees and dappled light filtering through the canopy.',
    description:'Detailní tygr s pruhy prochází vysokou trávou tropické džungle.', featured:false, ageGroup:'6-8', tags:['tygr','džungle','zvířata'] },

  // Cars — 2×4-7, 2×6-8
  { slug:'ice-cream-truck-01', title:'Auto se zmrzlinou', category:'cars', image:'/coloring-pages/cars/ice-cream-truck-01.png',
    prompt:'A cheerful ice cream truck with a big ice cream cone decoration on top, a serving window, colorful flags and children queuing beside it.',
    description:'Veselé auto se zmrzlinou s obří zmrzlinou nahoře, okénkem a dětmi ve frontě.', featured:false, ageGroup:'4-7', tags:['zmrzlina','auto','léto'] },
  { slug:'tow-truck-01', title:'Odtahové auto', category:'cars', image:'/coloring-pages/cars/tow-truck-01.png',
    prompt:'A friendly tow truck with a crane arm and hook towing a small broken-down car, with a driver waving from the cab.',
    description:'Přátelské odtahové auto s jeřábem a hákem odtahuje malé auto s poruchou.', featured:false, ageGroup:'4-7', tags:['odtahové auto','doprava','pomoc'] },
  { slug:'airplane-01', title:'Letadlo', category:'cars', image:'/coloring-pages/cars/airplane-01.png',
    prompt:'A detailed passenger airplane flying through fluffy clouds with visible engines under the wings, windows with passengers, and a contrail behind it.',
    description:'Detailní osobní letadlo letí přes mraky s motory, okny a kondenzačním pruhem.', featured:false, ageGroup:'6-8', tags:['letadlo','létání','doprava'] },
  { slug:'cruise-ship-01', title:'Výletní loď', category:'cars', image:'/coloring-pages/cars/cruise-ship-01.png',
    prompt:'A large detailed cruise ship with multiple decks, portholes, lifeboats, a funnel with smoke, sailing on calm ocean with a sunset sky.',
    description:'Velká výletní loď s mnoha palubami, záchranými čluny a komínem pluje klidným mořem.', featured:false, ageGroup:'6-8', tags:['loď','plavba','doprava'] },

  // Princesses — 2×4-7, 2×6-8
  { slug:'princess-birthday-01', title:'Narozeninová princezna', category:'princesses', image:'/coloring-pages/princesses/princess-birthday-01.png',
    prompt:'A princess in a pretty dress celebrating her birthday, standing next to a big tiered birthday cake with candles, colorful balloons floating around her.',
    description:'Princezna slaví narozeniny u velkého dortu se svíčkami a barevnými balónky.', featured:false, ageGroup:'4-7', tags:['princezna','narozeniny','dort'] },
  { slug:'baby-fairy-01', title:'Malá víla', category:'princesses', image:'/coloring-pages/princesses/baby-fairy-01.png',
    prompt:'A tiny cute baby fairy sitting inside a large open flower, with tiny wings, a flower petal dress, holding a small star, with dewdrops around.',
    description:'Malá roztomilá víla sedí v kvetoucí květině s křídly a hvězdičkou.', featured:false, ageGroup:'4-7', tags:['víla','malá','kouzelné'] },
  { slug:'mermaid-kingdom-01', title:'Mořské království', category:'princesses', image:'/coloring-pages/princesses/mermaid-kingdom-01.png',
    prompt:'An underwater mermaid kingdom with a grand coral palace, mermaids swimming between pillars, colorful fish, sea plants and glowing bioluminescent creatures.',
    description:'Podmořské mořské království s korálových palácem, mořskými pannami a barevnými rybami.', featured:false, ageGroup:'6-8', tags:['mořská panna','království','podmoří'] },
  { slug:'witch-potion-01', title:'Čarodějnice s lektvarem', category:'princesses', image:'/coloring-pages/princesses/witch-potion-01.png',
    prompt:'A friendly witch stirring a large bubbling cauldron with a wooden spoon, magical smoke and sparkles rising, potion bottles and spell books on shelves behind her.',
    description:'Přátelská čarodějnice míchá velký bublající kotel s kouzelným kouřem a lektváry.', featured:false, ageGroup:'6-8', tags:['čarodějnice','lektvar','magie'] },

  // Flowers — 2×4-7, 2×6-8
  { slug:'dandelion-01', title:'Pampeliška', category:'flowers', image:'/coloring-pages/flowers/dandelion-01.png',
    prompt:'A dandelion in two stages: one with yellow petals and one as a white seed head with seeds floating away in the wind, a ladybug on a leaf.',
    description:'Pampeliška ve dvou fázích — žlutý květ a bílý chmýří — se semenky ve větru.', featured:false, ageGroup:'4-7', tags:['pampeliška','chmýří','příroda'] },
  { slug:'carnation-01', title:'Karafiáty', category:'flowers', image:'/coloring-pages/flowers/carnation-01.png',
    prompt:'A small bouquet of carnation flowers with ruffled petals, long stems and narrow leaves, tied with a simple ribbon bow.',
    description:'Kytice karafiátů s zvlněnými okvětními lístky, dlouhými stonky a stužkou.', featured:false, ageGroup:'4-7', tags:['karafiát','kytice','květiny'] },
  { slug:'botanical-garden-01', title:'Botanická zahrada', category:'flowers', image:'/coloring-pages/flowers/botanical-garden-01.png',
    prompt:'A detailed botanical garden scene with exotic tropical plants, large palm leaves, hanging orchids, a pond with lily pads, stone pathways and a greenhouse in the back.',
    description:'Detailní botanická zahrada s tropickými rostlinami, orchidejemi, rybníčkem a skleníkem.', featured:false, ageGroup:'6-8', tags:['botanická zahrada','tropické','rostliny'] },
  { slug:'flower-crown-01', title:'Věnec z květin', category:'flowers', image:'/coloring-pages/flowers/flower-crown-01.png',
    prompt:'A detailed flower crown laid flat showing various flowers — daisies, roses, lavender and leaves — woven together intricately, with trailing ribbons.',
    description:'Detailní věnec z různých květin — sedmikrásek, růží, levandule — propletených se stužkami.', featured:false, ageGroup:'6-8', tags:['věnec','květiny','koruna'] },

  // Space — 2×4-7, 2×6-8
  { slug:'shooting-star-01', title:'Padající hvězda', category:'space', image:'/coloring-pages/space/shooting-star-01.png',
    prompt:'A shooting star streaking brightly across a night sky full of stars, with a small child sitting on a hilltop making a wish, the moon visible nearby.',
    description:'Padající hvězda svítí noční oblohou, dole dítě na kopci si přeje a svítí měsíc.', featured:false, ageGroup:'4-7', tags:['hvězda','přání','noc'] },
  { slug:'jupiter-01', title:'Jupiter', category:'space', image:'/coloring-pages/space/jupiter-01.png',
    prompt:'Planet Jupiter with its distinctive swirling cloud bands and the famous Great Red Spot storm, with four of its large moons visible nearby.',
    description:'Planeta Jupiter s vírovými mraky, Velkým červeným skvrncem a čtyřmi měsíci.', featured:false, ageGroup:'4-7', tags:['Jupiter','planeta','vesmír'] },
  { slug:'black-hole-01', title:'Černá díra', category:'space', image:'/coloring-pages/space/black-hole-01.png',
    prompt:'A dramatic cosmic black hole with a glowing accretion disk of swirling bright matter surrounding the dark center, stars being distorted around it and a galaxy in the background.',
    description:'Dramatická černá díra se žhnoucím akretním diskem, hvězdami a galaxií v pozadí.', featured:false, ageGroup:'6-8', tags:['černá díra','kosmos','vesmír'] },
  { slug:'space-colony-01', title:'Vesmírná kolonie', category:'space', image:'/coloring-pages/space/space-colony-01.png',
    prompt:'A detailed space colony on a moon surface with transparent dome structures, small vehicles, astronauts working outside, rockets on a landing pad and a planet visible in the sky.',
    description:'Detailní vesmírná kolonie na povrchu měsíce s kupole, vozidly a astronauty.', featured:false, ageGroup:'6-8', tags:['kolonie','vesmír','budoucnost'] },

  // Dinosaurs — 2×4-7, 2×6-8
  { slug:'baby-dino-01', title:'Dinosauří mládě', category:'dinosaurs', image:'/coloring-pages/dinosaurs/baby-dino-01.png',
    prompt:'A cute baby dinosaur that has just hatched, sitting next to its cracked eggshell, looking around with big curious eyes, with a few other eggs nearby.',
    description:'Roztomilé dinosauří mládě sedí u rozpraskané skořápky s velkýma zvídavýma očima.', featured:false, ageGroup:'4-7', tags:['mládě','dinosaurus','vejce'] },
  { slug:'plesiosaurus-01', title:'Plesiosaurus', category:'dinosaurs', image:'/coloring-pages/dinosaurs/plesiosaurus-01.png',
    prompt:'A friendly Plesiosaurus swimming in a prehistoric ocean, with its very long neck stretched up above the water, small head, large flippers and a long body.',
    description:'Přátelský Plesiosaurus s velmi dlouhým krkem plave v pravěkém oceánu.', featured:false, ageGroup:'4-7', tags:['plesiosaurus','dinosaurus','oceán'] },
  { slug:'dino-fight-01', title:'Souboj dinosaurů', category:'dinosaurs', image:'/coloring-pages/dinosaurs/dino-fight-01.png',
    prompt:'A dramatic face-off between a T-Rex and a Triceratops in a prehistoric clearing, both in fierce poses, with jungle vegetation, ferns and a dramatic sky behind them.',
    description:'Dramatický souboj T-Rexe a Triceratopse v pravěké mýtině s dramatickou oblohou.', featured:false, ageGroup:'6-8', tags:['souboj','T-Rex','Triceratops'] },
  { slug:'prehistoric-scene-01', title:'Pravěká krajina', category:'dinosaurs', image:'/coloring-pages/dinosaurs/prehistoric-scene-01.png',
    prompt:'A detailed prehistoric landscape panorama with a Brachiosaurus eating from tall trees, a group of Triceratops grazing, a Pterodactyl flying above and a volcano in the distance.',
    description:'Detailní pravěká krajina s Brachiosaurem, Triceratopsy, Pterodaktylem a sopkou.', featured:false, ageGroup:'6-8', tags:['krajina','pravěk','dinosauři'] },

  // Ocean — 2×4-7, 2×6-8
  { slug:'clownfish-01', title:'Klaun ryba', category:'ocean', image:'/coloring-pages/ocean/clownfish-01.png',
    prompt:'A cute clownfish with stripes peeking out from a sea anemone, with small bubbles floating up, colourful coral and other tiny fish nearby.',
    description:'Roztomilá klaun ryba s pruhy vykukuje z sasanky s bublinkami a korálem kolem.', featured:false, ageGroup:'4-7', tags:['klaun ryba','oceán','korál'] },
  { slug:'starfish-01', title:'Hvězdice', category:'ocean', image:'/coloring-pages/ocean/starfish-01.png',
    prompt:'A friendly starfish with a smiling face on a sandy ocean floor, surrounded by pretty seashells of different shapes, small pebbles and a few tiny crabs.',
    description:'Přátelská hvězdice s usměvavou tváří na písčitém dně s mušlemi a malými kraby.', featured:false, ageGroup:'4-7', tags:['hvězdice','mořské dno','mušle'] },
  { slug:'submarine-01', title:'Ponorka', category:'ocean', image:'/coloring-pages/ocean/submarine-01.png',
    prompt:'A detailed yellow submarine underwater with portholes showing crew inside, a periscope, propellers and fins, with curious fish swimming alongside it and a coral reef below.',
    description:'Detailní žlutá ponorka pod vodou s iluminátoři, periskopem a rybami kolem.', featured:false, ageGroup:'6-8', tags:['ponorka','oceán','podmořský'] },
  { slug:'ocean-storm-01', title:'Bouře na moři', category:'ocean', image:'/coloring-pages/ocean/ocean-storm-01.png',
    prompt:'A dramatic ocean storm scene with large crashing waves, a lighthouse beam cutting through the dark sky, storm clouds, lightning in the distance and a small boat battling the waves.',
    description:'Dramatická bouře na moři s příbojovými vlnami, majákem, bouřkovými mraky a bouří.', featured:false, ageGroup:'6-8', tags:['bouře','moře','maják'] },

  // Fairytales — 2×4-7, 2×6-8
  { slug:'magic-lamp-01', title:'Kouzelná lampa', category:'fairytales', image:'/coloring-pages/fairytales/magic-lamp-01.png',
    prompt:'A magic oil lamp with a friendly genie emerging from a swirl of smoke, wearing a turban and vest, with magical sparkles and stars floating around.',
    description:'Kouzelná lampa s přátelským džinem vycházejícím z kouře, s turbanem a kouzelným třpytem.', featured:false, ageGroup:'4-7', tags:['džin','lampa','kouzelné'] },
  { slug:'flying-carpet-01', title:'Kouzelný koberec', category:'fairytales', image:'/coloring-pages/fairytales/flying-carpet-01.png',
    prompt:'A magic carpet flying through a starry Arabian night sky with a boy and girl riding it, decorated with ornate patterns, with a crescent moon and minarets below.',
    description:'Kouzelný koberec letí noční arabskou oblohou s chlapcem a dívkou a minarety dole.', featured:false, ageGroup:'4-7', tags:['koberec','pohádka','noc'] },
  { slug:'giant-01', title:'Obr v pohádce', category:'fairytales', image:'/coloring-pages/fairytales/giant-01.png',
    prompt:'A friendly giant in a fairy tale landscape, so tall his head is above the clouds, looking down at a tiny village below with a big smile, holding a huge tree like a walking stick.',
    description:'Přátelský obr s hlavou nad mraky se usměvavě dívá na maličkou vesnici dole.', featured:false, ageGroup:'6-8', tags:['obr','pohádka','vesnice'] },
  { slug:'enchanted-castle-01', title:'Začarovaný zámek', category:'fairytales', image:'/coloring-pages/fairytales/enchanted-castle-01.png',
    prompt:'A dramatic enchanted castle covered in magical vines and glowing flowers, with turrets, a drawbridge over a moat, magical orbs of light floating around and a dramatic starry sky.',
    description:'Dramatický začarovaný zámek porostlý magickými popínavkami a světly nad příkopem.', featured:false, ageGroup:'6-8', tags:['zámek','kouzelný','pohádka'] },

  // Food — 2×4-7, 2×6-8
  { slug:'sandwich-01', title:'Sendvič', category:'food', image:'/coloring-pages/food/sandwich-01.png',
    prompt:'A tall stacked club sandwich with multiple layers of bread, lettuce, tomato, cheese and fillings, with a toothpick and olive on top, and crisps on the side.',
    description:'Vysoký vrstvený sendvič s chlebem, salátem, rajčetem a sýrem, vedle hranolky.', featured:false, ageGroup:'4-7', tags:['sendvič','jídlo','svačina'] },
  { slug:'popcorn-01', title:'Popcorn', category:'food', image:'/coloring-pages/food/popcorn-01.png',
    prompt:'A big striped cinema popcorn bucket overflowing with large fluffy popcorn pieces, a few pieces flying out, with a cinema ticket and 3D glasses beside it.',
    description:'Velký pruhovaný kbelík popcornu s létajícími kousky, lístkem a 3D brýlemi vedle.', featured:false, ageGroup:'4-7', tags:['popcorn','kino','jídlo'] },
  { slug:'feast-table-01', title:'Slavnostní stůl', category:'food', image:'/coloring-pages/food/feast-table-01.png',
    prompt:'A grand feast table covered with a tablecloth and set with many dishes: a roast, pies, salads, fruits, bread, candles, flowers and fancy tableware.',
    description:'Slavnostní stůl s ubrusem plný jídel — pečeně, koláče, saláty, ovoce a svíčky.', featured:false, ageGroup:'6-8', tags:['slavnost','stůl','hostina'] },
  { slug:'candy-store-01', title:'Cukrárna', category:'food', image:'/coloring-pages/food/candy-store-01.png',
    prompt:'A detailed candy store interior with floor-to-ceiling jars of colorful sweets, a counter with a shopkeeper, lollipop trees, candy cane decorations and a child choosing sweets.',
    description:'Detailní cukrárna s regály plnými bonbonů, cukrářem u pultu a výběrem sladkostí.', featured:false, ageGroup:'6-8', tags:['cukrárna','bonbony','obchod'] },

  // Sports — 2×4-7, 2×6-8
  { slug:'running-01', title:'Běh', category:'sports', image:'/coloring-pages/sports/running-01.png',
    prompt:'A child running a race on a track, arms pumping, approaching a finish line with a ribbon, number on their vest, with cheering spectators on the side.',
    description:'Dítě běží závod na dráze k cílovému pásku s číslem na dresu a diváky.', featured:false, ageGroup:'4-7', tags:['běh','závod','sport'] },
  { slug:'long-jump-01', title:'Skok do dálky', category:'sports', image:'/coloring-pages/sports/long-jump-01.png',
    prompt:'A child doing a long jump, leaping through the air from a take-off board towards a sand pit, arms stretched out, with a crowd watching in the background.',
    description:'Dítě skáče do dálky z odrazového prkna do pískoviště s diváky v pozadí.', featured:false, ageGroup:'4-7', tags:['skok','atletika','sport'] },
  { slug:'climbing-01', title:'Horolezectví', category:'sports', image:'/coloring-pages/sports/climbing-01.png',
    prompt:'A detailed rock climber scaling a dramatic cliff face, wearing a helmet and harness with ropes, reaching for a hold, with a mountainous landscape visible below.',
    description:'Detailní horolezec šplhá po skalní stěně s helmou, lanem a horskou krajinou dole.', featured:false, ageGroup:'6-8', tags:['horolezectví','skála','sport'] },
  { slug:'surfing-01', title:'Surfování', category:'sports', image:'/coloring-pages/sports/surfing-01.png',
    prompt:'A surfer riding a large ocean wave on a surfboard, balanced with arms outstretched, the wave curling around them, with ocean spray and a sunny beach in the background.',
    description:'Surfař jede na velké vlně na prkně s roztaženými pažemi a mořskou sprejí.', featured:false, ageGroup:'6-8', tags:['surfování','vlny','sport'] },

  // Buildings — 2×4-7, 2×6-8
  { slug:'barn-01', title:'Stodola', category:'buildings', image:'/coloring-pages/buildings/barn-01.png',
    prompt:'A classic red barn with large wooden doors, a weather vane rooster on top, a hay bale outside, a tractor nearby and farm animals peeking out — a cow, pig and rooster.',
    description:'Klasická červená stodola s kohoutem na větrné korouhvi, senem, traktorem a zvířaty.', featured:false, ageGroup:'4-7', tags:['stodola','farma','venkov'] },
  { slug:'cottage-01', title:'Pohádková chaloupka', category:'buildings', image:'/coloring-pages/buildings/cottage-01.png',
    prompt:'A cosy fairy tale cottage with a thatched roof, a crooked chimney with smoke, flower boxes in the windows, a winding stone path, a well and a garden with vegetables.',
    description:'Útulná pohádková chaloupka se slaměnou střechou, komínem, truhlíky a studnou.', featured:false, ageGroup:'4-7', tags:['chaloupka','pohádka','venkov'] },
  { slug:'skyscraper-01', title:'Mrakodrap', category:'buildings', image:'/coloring-pages/buildings/skyscraper-01.png',
    prompt:'A very tall glass skyscraper with many floors of windows reflecting the sky, a revolving door entrance, smaller buildings around it and people walking on the street below.',
    description:'Velmi vysoký skleněný mrakodrap s mnoha podlažími okolo s ulicemi a lidmi dole.', featured:false, ageGroup:'6-8', tags:['mrakodrap','město','architektura'] },
  { slug:'pagoda-01', title:'Pagoda', category:'buildings', image:'/coloring-pages/buildings/pagoda-01.png',
    prompt:'A detailed Asian pagoda temple with multiple curved tiered roofs, decorative lanterns hanging from the eaves, stone steps leading up, cherry blossom trees and a koi pond in the garden.',
    description:'Detailní asijská pagoda s vrstvenými střechami, lucernami, třešní a rybníkem s kapry.', featured:false, ageGroup:'6-8', tags:['pagoda','Asie','architektura'] },

  // Clothes — 2×4-7, 2×6-8
  { slug:'party-dress-01', title:'Šaty na párty', category:'clothes', image:'/coloring-pages/clothes/party-dress-01.png',
    prompt:'A colourful party dress with a puffy skirt, bow on the waist, frills and polka dots, displayed on a mannequin with a party hat, streamers and confetti around.',
    description:'Barevné šaty na párty s nabíranou sukní, mašlí, volánky a puntíky na figuríně.', featured:false, ageGroup:'4-7', tags:['šaty','párty','oblečení'] },
  { slug:'boots-collection-01', title:'Kolekce bot', category:'clothes', image:'/coloring-pages/clothes/boots-collection-01.png',
    prompt:'A fun collection of different boots arranged together: cowboy boots, rain boots, winter snow boots, ankle boots and ballet flats, each with different patterns.',
    description:'Kolekce různých bot — kovbojské, holínky, sněhule, kotníkové a balerínky.', featured:false, ageGroup:'4-7', tags:['boty','kolekce','oblečení'] },
  { slug:'knight-armor-01', title:'Rytířská zbroj', category:'clothes', image:'/coloring-pages/clothes/knight-armor-01.png',
    prompt:'A detailed medieval knight armour displayed on an armour stand with a full helmet with visor, chest plate with crest, gauntlets, leg armour, a sword leaning against it and a shield with a coat of arms.',
    description:'Detailní středověká rytířská zbroj na stojanu s přilbou, mečem a erbovním štítem.', featured:false, ageGroup:'6-8', tags:['zbroj','rytíř','středověk'] },
  { slug:'viking-costume-01', title:'Vikingský kostým', category:'clothes', image:'/coloring-pages/clothes/viking-costume-01.png',
    prompt:'A detailed Viking warrior costume laid out: a horned helmet, chainmail tunic, leather belt with pouches, fur-trimmed cloak, round shield with Norse patterns and a battle axe.',
    description:'Detailní vikingský kostým s rohatou přilbou, kroužkovou košilí, štítem a sekerou.', featured:false, ageGroup:'6-8', tags:['vikingský','kostým','sever'] },

  // Jobs — 2×4-7, 2×6-8
  { slug:'postman-01', title:'Poštovní doručovatel', category:'jobs', image:'/coloring-pages/jobs/postman-01.png',
    prompt:'A friendly postman in uniform with a cap, carrying a large mail bag over his shoulder, delivering a letter at a front door, with a red bicycle parked nearby.',
    description:'Přátelský poštovní doručovatel s taškou doručuje dopis u dveří s červeným kolem.', featured:false, ageGroup:'4-7', tags:['poštovní doručovatel','dopisy','povolání'] },
  { slug:'gardener-01', title:'Zahradník', category:'jobs', image:'/coloring-pages/jobs/gardener-01.png',
    prompt:'A cheerful gardener wearing a sun hat and apron, kneeling in a garden tending to flowers, with a watering can, trowel, plant pots and a wheelbarrow nearby.',
    description:'Veselý zahradník s kloboukem a zástěrou pečuje o zahradu s konví a kolečkem.', featured:false, ageGroup:'4-7', tags:['zahradník','zahrada','povolání'] },
  { slug:'architect-01', title:'Architekt', category:'jobs', image:'/coloring-pages/jobs/architect-01.png',
    prompt:'An architect at a large drafting table with detailed blueprints spread out, holding a pencil and ruler, with a scale model of a building nearby, books and drafting tools around.',
    description:'Architekt u rýsovacího stolu s plány, tužkou, pravítkem a modelem budovy vedle.', featured:false, ageGroup:'6-8', tags:['architekt','plány','povolání'] },
  { slug:'astronomer-01', title:'Astronom', category:'jobs', image:'/coloring-pages/jobs/astronomer-01.png',
    prompt:'An astronomer at a large telescope in an observatory dome at night, looking through the eyepiece, with star charts on the desk, a laptop showing a galaxy and the night sky visible through the open dome.',
    description:'Astronom u velkého dalekohledu v observatoři v noci s hvězdnými mapami a notebookem.', featured:false, ageGroup:'6-8', tags:['astronom','hvězdy','povolání'] },
];

const existing = new Set(pages.map(p => p.slug));
const toAdd = newPages.filter(p => {
  if (existing.has(p.slug)) { console.log(`skip (exists): ${p.slug}`); return false; }
  return true;
});

const updated = [...pages, ...toAdd];
writeFileSync(path, JSON.stringify(updated, null, 2));
console.log(`Added ${toAdd.length} new pages. Total: ${updated.length}`);
