// campaign_pokemon.js - Pokémon: Maidens of the League (Epic Scratch-to-Champion Campaign)

const PokemonCampaignData = {
    UNIVERSE: 'pokemon',
    NAME: 'Pokémon: Maidens of the League',
    SUBTITLE: 'FROM PALLET ROUTE 1 TO INDIGO CHAMPION // D&D POKÉMON LEAGUE',

    // Trainer Archetypes (Starting from Scratch)
    TRAINERS: [
        {
            id: 'aura_striker',
            name: 'Kael / Aura Striker',
            order: 'Aura Guardian Aspirant',
            title: 'Rookie Aura Striker & Wave Channeler',
            quote: '"Every legendary journey starts with a single step out of Pallet Town. Together with my team, we will reach the stars!"',
            stats: { atk: 68, spatk: 72, def: 60, spdef: 62, spd: 70, affection: 78 },
            woundsMax: 24,
            auraCurrent: 100,
            auraMax: 100,
            inventory: [
                { id: 'pk_w1', name: 'Rookie Guardian Staff', type: 'melee', damage: '2d10+3', pen: 3, qualities: ['Aura Pulse'], desc: 'Steel-alloy training rod channeling inner fighting aura.' },
                { id: 'pk_w2', name: 'Starter Pokéball Launcher', type: 'ranged', damage: '1d10+5', pen: 2, qualities: ['Capture Pulse'], desc: 'Standard League capture firearm loaded with high-velocity Pokéballs.' },
                { id: 'pk_i1', name: 'Potion Flask (x3)', type: 'consumable', count: 3, heals: 10, desc: 'Herbal synthesis spray curing fatigue and restoring HP.' }
            ],
            abilities: [
                { name: 'Aura Bond', desc: '+15 to Special Attack and empathy tests when connecting with female Pokémon and maidens.' },
                { name: 'Endure Grit', desc: 'Can survive a fatal strike with 1 HP once per combat battle.' }
            ]
        },
        {
            id: 'ace_tactician',
            name: 'Darian / Ace Tactician',
            order: 'Silph Academy Graduate',
            title: 'Rookie Strategist & Charisma Master',
            quote: '"Battles are won before the first ball is thrown. And no fortress or maiden\'s heart is truly unbreachable."',
            stats: { atk: 52, spatk: 82, def: 58, spdef: 68, spd: 66, affection: 88 },
            woundsMax: 20,
            auraCurrent: 100,
            auraMax: 100,
            inventory: [
                { id: 'pk_w3', name: 'Tactical Shock Dagger', type: 'melee', damage: '1d10+5', pen: 3, qualities: ['Thunder Strike'], desc: 'Compact defensive blade holding an electric discharge coil.' },
                { id: 'pk_w4', name: 'Silph Scope Laser Pistol', type: 'ranged', damage: '1d10+7', pen: 4, qualities: ['Accurate'], desc: 'Targeting firearm capable of piercing psychic barriers.' },
                { id: 'pk_i2', name: 'Sacred Moomoo Milk (x3)', type: 'consumable', count: 3, heals: 10, desc: 'Pure dairy elixir packed with stamina and health revitalizers.' }
            ],
            abilities: [
                { name: 'Irresistible Charm', desc: '+20 to Affection tests when wooing Gym Leaders, Rivals, and Pokémon Maidens.' },
                { name: 'Analytic Counter', desc: 'Grants +10 Defense against enemy special attacks.' }
            ]
        }
    ],

    // Devoted Pokémon Maidens, Rivals & Gym Leaders
    DEVOTED_MAIDENS: [
        {
            id: 'maya_rival',
            name: 'Rival Maya',
            title: 'Childhood Rival // Spirited Ace Trainer',
            role: 'Rival & Passionate Partner',
            avatar: '🧢',
            gender: 'female',
            voicePitch: 1.28,
            voiceRate: 1.05,
            stats: { atk: 68, spatk: 72, def: 64, spdef: 66, spd: 84, affection: 80 },
            quote: '"Don\'t think you can leave me behind! We\'re going to the top of the League together... and I expect lots of dates on the way!"',
            desc: 'Your energetic, pretty childhood rival from Pallet Town. Dressed in a sporty cap, blue jacket, and shorts, she has secretly adored you since you were kids, masking her romantic feelings behind feisty competitive banter.',
            image: 'assets/pokemon_journey_start.jpg',
            canRomance: true,
            status: 'romance',
            perk: 'Rival\'s Passionate Drive: Grants +15 to initiative and +10 to all attack tests when fighting side-by-side.'
        },
        {
            id: 'gardevoir_aria',
            name: 'Gardevoir (Aria)',
            title: 'The Radiant Embrace Maiden // Telepathic Consort',
            role: 'Psychic & Fairy Guardian',
            avatar: '👰',
            gender: 'female',
            voicePitch: 1.25,
            voiceRate: 0.90,
            stats: { atk: 50, spatk: 95, def: 60, spdef: 92, spd: 80, affection: 92 },
            quote: '"My heart beats only for you, my beloved Trainer... I would create a black hole or cross the cosmos just to stay in your warm embrace."',
            desc: 'A gorgeous, graceful humanoid Gardevoir who bonded with you through pure soul resonance. In a flowing white silk gown with emerald locks and a glowing ruby chest horn, she communicates through sweet, affectionate telepathy and guards you with unconditional devotion.',
            image: 'assets/gardevoir_maiden.jpg',
            canRomance: true,
            status: 'romance',
            perk: 'Black Hole Soul Bond: Shields against fatal strikes and boosts Special Attack by +20.'
        },
        {
            id: 'lopunny_chloe',
            name: 'Lopunny (Chloe)',
            title: 'The Agile Rabbit Maiden // Close-Combat Sweetheart',
            role: 'Normal & Fighting Striker',
            avatar: '🐰',
            gender: 'female',
            voicePitch: 1.30,
            voiceRate: 1.05,
            stats: { atk: 76, spatk: 54, def: 70, spdef: 72, spd: 90, affection: 88 },
            quote: '"Yay! Another victory together! Now come here, you promised me cuddles and ear scratches!"',
            desc: 'An energetic, cute, and remarkably affectionate Lopunny with fluffy fur cuffs and long ears. Rescued as a wild Buneary at Cerulean Cape, she evolved out of sheer happiness and love for you.',
            image: 'assets/lopunny_tsareena_maiden.jpg',
            canRomance: true,
            status: 'romance',
            perk: 'High-Jump Kick Blitz: Deals +20 kinetic damage on close attacks and +15 to evasion.'
        },
        {
            id: 'tsareena_victoria',
            name: 'Tsareena (Queen Victoria)',
            title: 'The Sovereign Blossom Queen // Haughty Royal Consort',
            role: 'Grass Royalty & Striker',
            avatar: '👑',
            gender: 'female',
            voicePitch: 1.12,
            voiceRate: 0.95,
            stats: { atk: 88, spatk: 50, def: 78, spdef: 78, spd: 74, affection: 84 },
            quote: '"Fools dare look at my Trainer? Trop Kick them into oblivion! ...Ahem, now that they are gone, stroke my hair, my King."',
            desc: 'A haughty, glamorous humanoid queen with cascading berry-hued foliage and a golden tiara. Regal and commanding to outsiders, she melts completely when alone in your arms, demanding gentle pampering.',
            image: 'assets/lopunny_tsareena_maiden.jpg',
            canRomance: true,
            status: 'romance',
            perk: 'Queenly Majesty: Completely prevents enemy surprise attacks and priority strikes.'
        },
        {
            id: 'ninetales_kaguya',
            name: 'Alolan Ninetales (Kaguya)',
            title: 'The Nine-Tailed Frost Maiden // Kitsune Empress',
            role: 'Ice & Fairy Mystic',
            avatar: '🦊',
            gender: 'female',
            voicePitch: 1.15,
            voiceRate: 0.92,
            stats: { atk: 58, spatk: 90, def: 72, spdef: 94, spd: 86, affection: 86 },
            quote: '"Under the northern aurora, my nine tails wrap you in ancient warmth. My spirit is bound to yours for eternity."',
            desc: 'An ancient, breathtaking Kitsune maiden discovered in the sacred snowy forests of Mt. Coronet. Clad in a frosted silver-blue kimono with nine crystalline tails, she wields mystical aurora sorcery and tender devotion.',
            image: 'assets/ninetales_maiden.jpg',
            canRomance: true,
            status: 'romance',
            perk: 'Aurora Veil Sanctuary: Halves all elemental and kinetic damage taken by your team.'
        },
        {
            id: 'cynthia_champion',
            name: 'Champion Cynthia',
            title: 'Sinnoh League Champion // Dragon Mistress',
            role: 'Champion / Tactician',
            avatar: '👑',
            gender: 'female',
            voicePitch: 1.06,
            voiceRate: 0.94,
            stats: { atk: 85, spatk: 92, def: 78, spdef: 82, spd: 84, affection: 75 },
            quote: '"The bond between a trainer and the maiden at his side is the greatest power in all the realms. Show me your heart\'s true flame."',
            desc: 'The legendary blonde Champion of Sinnoh. Majestic, brilliantly intelligent, dressed in a sweeping black overcoat with gold trim. Beneath her composed nobility lies an intoxicating passion for a trainer strong enough to stand beside her.',
            image: 'assets/cynthia_champion.jpg',
            canRomance: true,
            status: 'ally',
            perk: 'Garchomp Dragon Rush: Deals +25 crushing damage and protects against mental disruption.'
        },
        {
            id: 'sabrina_psychic',
            name: 'Gym Leader Sabrina',
            title: 'Saffron City Gym Leader // Mistress of Telepathy',
            role: 'Psychic Specialist',
            avatar: '🔮',
            gender: 'female',
            voicePitch: 1.15,
            voiceRate: 0.92,
            stats: { atk: 45, spatk: 90, def: 55, spdef: 88, spd: 78, affection: 70 },
            quote: '"Our minds are already entwined... your thoughts feel so intoxicatingly warm. Do not pull away."',
            desc: 'The enigmatic, long-haired psychic beauty of Saffron City. Known for her icy aloofness, she melts into tender, possessive intimacy when you connect your minds and touch her spirit.',
            image: 'assets/sabrina_psychic.jpg',
            canRomance: true,
            status: 'ally',
            perk: 'Telepathic Future Sight: Predicts enemy movements, granting +15 to Speed and Evasion.'
        },
        {
            id: 'erika_grass',
            name: 'Gym Leader Erika',
            title: 'Celadon City Gym Leader // Mistress of Aromatherapy',
            role: 'Grass & Herbalist Master',
            avatar: '🌸',
            gender: 'female',
            voicePitch: 1.20,
            voiceRate: 0.95,
            stats: { atk: 48, spatk: 78, def: 62, spdef: 80, spd: 65, affection: 82 },
            quote: '"Breathe in the jasmine tea, my dear Champion... let me tend to your road-weary shoulders."',
            desc: 'The refined kimono beauty of Celadon City. Graceful, soft-spoken, and deeply sensual, she cultivates fragrant floral remedies and offers soothing, restorative massages.',
            canRomance: true,
            status: 'ally',
            perk: 'Aromatherapy Healing: Regenerates 4 HP each round and cures all status ailments.'
        },
        {
            id: 'lorelei_ice',
            name: 'Elite Lorelei',
            title: 'Indigo Elite Four // Ice & Frost Queen',
            role: 'Elite Four Defender',
            avatar: '❄️',
            gender: 'female',
            voicePitch: 1.08,
            voiceRate: 0.96,
            stats: { atk: 60, spatk: 86, def: 75, spdef: 85, spd: 68, affection: 65 },
            quote: '"Beneath this icy exterior burns a passion colder than glacier ice... and twice as dangerous to touch."',
            desc: 'The crimson-haired, glasses-wearing ice specialist of the Indigo Elite Four. Poised, intellectual, and sharply observant, with a secret fondness for being held close in warm blankets during mountain blizzards.',
            canRomance: true,
            status: 'ally',
            perk: 'Absolute Zero Shield: Freezes incoming kinetic attacks, reducing all physical damage by 50%.'
        },
        {
            id: 'nessa_water',
            name: 'Gym Leader Nessa',
            title: 'Hulbury Gym Leader // Oceanic Siren & Supermodel',
            role: 'Water Striker',
            avatar: '🌊',
            gender: 'female',
            voicePitch: 1.18,
            voiceRate: 1.02,
            stats: { atk: 65, spatk: 80, def: 68, spdef: 72, spd: 82, affection: 68 },
            quote: '"Out in the deep water, there are no secrets between us. Let us see if you can keep up with my tide!"',
            desc: 'A stunning, sun-kissed water specialist and renowned fashion model with long flowing navy hair. Bold, playful, and fiercely competitive, she loves swimming in secluded lagoons with the trainer of her dreams.',
            canRomance: true,
            status: 'ally',
            perk: 'Hydro Torrent: Grants +10 Speed and empowers all water/special attacks with armor-piercing force.'
        }
    ],

    // Campaign Narrative Chapters (Grand 9-Act Epic)
    CAMPAIGN: {
        id: 'pokemon_champions_league',
        title: 'POKÉMON: MAIDENS OF THE LEAGUE',
        chapters: [
            // Act I: Route 1 & Rival Maya
            {
                id: 'poke_ch1_route1_start',
                title: 'Act I: The Sunlit Path of Route 1',
                act: 'Act I - The Rookie\'s Departure',
                atmosphere: 'Crisp morning breeze rustling through green pastures, golden sunlight illuminating wild lavender and daisies, distant Pokémon gym spires glistening in the horizon.',
                illustration: {
                    title: 'Route 1: The Rival\'s Challenge',
                    badge: 'JOURNEY BEGINS',
                    badgeClass: 'threat-low',
                    icon: '🧢',
                    image: 'assets/pokemon_journey_start.jpg',
                    quote: '"Hey! You didn\'t think you could set off on your journey without battling me first, did you?!"',
                    tags: ['Route 1', 'Pallet Town', 'Rival Maya', 'First Duel']
                },
                narrative: `The morning sun crests over the sleepy windmills of Pallet Town. With your newly issued Pokédex, trainer belt, and your trusty starter Pokémon by your side, you step onto the dirt path of Route 1. The whole world feels wide open before you.

Suddenly, rapid footsteps thump along the grassy verge. 

"HEY! HOLD IT RIGHT THERE, SLOWPOKE!"

Leaping out from the wildflowers with a triumphant laugh is your childhood rival, **Maya**. Her brown hair curls out from beneath her trainer cap, her sporty jacket slightly open to reveal a snug striped top, and her cheeks are flushed pink from running. In her gloved hand, she twirls a Pokéball with practiced flair.

She plants her hands on her hips, her amber eyes sparkling with competitive excitement:

"We got our starter Pokémon from the lab on the exact same day, and there's no way I'm letting you get a head start! Before you take one more step toward Pewter City, you and I are having our first official trainer battle!"

Her partner Pokémon emerges in a flash of white light, taking a spirited combat stance. Maya winks at you, her blush deepening:

"Winner buys the loser strawberry soda at the next Poké-Mart... and loser has to carry the winner's backpack! Ready or not, here I come!"`,
                options: [
                    {
                        approach: 'attack',
                        tag: '⚔️ MELEE & RUSH',
                        label: 'Take the offensive with a high-energy physical tackle and direct pressure (ATTACK)',
                        stat: 'atk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Catch Maya\'s partner off guard with an explosive opening charge.',
                        successNode: 'poke_ch1_rival_victory',
                        failNode: 'poke_ch1_rival_victory'
                    },
                    {
                        approach: 'special',
                        tag: '✨ SPECIAL TACTICS',
                        label: 'Execute an elemental ranged maneuver, utilizing the wildflowers for cover (SP. ATK)',
                        stat: 'spatk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Demonstrate tactical finesse and precision timing.',
                        successNode: 'poke_ch1_rival_victory',
                        failNode: 'poke_ch1_rival_victory'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ TEASING FLIRT',
                        label: 'Tease Maya about her blush and make a wager for a real romantic date (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Fluster your rival with irresistible confidence and charm.',
                        successNode: 'poke_ch1_rival_charm',
                        failNode: 'poke_ch1_rival_victory'
                    }
                ]
            },

            // Rival Victory
            {
                id: 'poke_ch1_rival_victory',
                title: 'Act I: The Rival\'s Respect',
                act: 'Act I - First Victory',
                atmosphere: 'Sparks fading in the grass, Maya panting lightly with an impressed smile, birds chirping in the morning sky.',
                illustration: {
                    title: 'Victory on Route 1',
                    badge: 'RIVAL CONQUERED',
                    badgeClass: 'threat-low',
                    icon: '⚡',
                    image: 'assets/pokemon_journey_start.jpg',
                    quote: '"Woah... you\'ve gotten seriously strong! But I\'m not giving up on you!"',
                    tags: ['Maya Defeated', 'Affection +15', 'Route 1 Cleared']
                },
                narrative: `With a dazzling combination of speed and elemental timing, your Pokémon executes a flawless finisher! Maya's partner skids back across the grass, landing on its paws before panting with respect.

Maya recalls her partner, her chest heaving with excited breaths. She looks at you, her eyes wide with newfound admiration:

"Wow... that was incredible! You read my moves like an open book."

She walks over and gently bumps her shoulder against yours, offering you a warm, genuine smile:

"You won fair and square. But don't get cocky! I'm heading through Viridian Forest right behind you. The first gym in Pewter City is waiting... let's see which of us claims the Boulder Badge first!"`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🪨 TOWARD PEWTER GYM',
                        label: 'Head through Viridian Forest toward Pewter City to face the Rock Gym',
                        actionType: 'advance',
                        nextNode: 'poke_ch1_pewter_boulder',
                        targetNode: 'poke_ch1_pewter_boulder'
                    }
                ]
            },

            {
                id: 'poke_ch1_rival_charm',
                title: 'Act I: The Rival\'s Blushing Promise',
                act: 'Act I - Sweet Flirtation',
                atmosphere: 'Gentle breeze carrying sweet flower pollen, Maya\'s face turning bright crimson, mutual laughter.',
                illustration: {
                    title: 'Maya\'s Secret Heart',
                    badge: 'ROMANCE SPARK',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/pokemon_journey_start.jpg',
                    quote: '"A-A real date?! Fine... but only if we both make it to the Indigo Plateau!"',
                    tags: ['Maya Romanced', 'Affection +25', 'Childhood Sweetheart']
                },
                narrative: `Your confident teasing catches Maya completely off balance! Her battle focus wavers as her face blushes as red as an Oran berry:

"W-What?! A date?! You dummy, we're in the middle of a battle!"

Taking advantage of her flustered hesitation, your Pokémon gently pins hers with a playful move!

Maya laughs helplessly, stepping forward and playfully punching your arm:

"You're unbelievable! Using your charm against me... that's not fair! But... fine. If we both reach the Indigo Plateau, you owe me that dinner date. Now hurry up, Pewter City is waiting!"`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🪨 TOWARD PEWTER GYM',
                        label: 'March toward Pewter City to claim your first League badge',
                        actionType: 'advance',
                        nextNode: 'poke_ch1_pewter_boulder',
                        targetNode: 'poke_ch1_pewter_boulder'
                    }
                ]
            },

            // Pewter Gym: Boulder Badge
            {
                id: 'poke_ch1_pewter_boulder',
                title: 'Act I.5: The Stone Colosseum of Pewter',
                act: 'Act I.5 - The Boulder Trial',
                atmosphere: 'Cavernous stone arena, jagged granite pillars, dust rising from heavy earth-shaking footsteps, the towering presence of Onix.',
                illustration: {
                    title: 'The Rock Gym Arena',
                    badge: 'FIRST GYM TRIAL',
                    badgeClass: 'threat-moderate',
                    icon: '🪨',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"A trainer\'s will must be as unyielding as granite!"',
                    tags: ['Pewter Gym', 'Boulder Badge', 'Rock Trial']
                },
                narrative: `You arrive in the ancient mountain town of Pewter City. The Pewter Gym is carved from solid bedrock, lit by crackling torches.

At the center of the rocky pit, a colossal rock serpent Onix rears back, its stone roar shaking loose gravel from the vaulted ceiling!

The gym master stands atop a granite outcrop, arms crossed:

"Welcome, rookie! Light attacks will shatter against our armor. If you want the Boulder Badge, prove your partner has the grit and endurance to break through mountain stone!"`,
                options: [
                    {
                        approach: 'force',
                        tag: '💥 CRUSHING IMPACT',
                        label: 'Target the joints of the rock serpent with heavy kinetic strikes (ATTACK)',
                        stat: 'atk',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Shatter through stone defense with concentrated force.',
                        successNode: 'poke_ch2_cerulean_cape',
                        failNode: 'poke_ch2_cerulean_cape'
                    },
                    {
                        approach: 'special',
                        tag: '🌊 ELEMENTAL WEAKNESS',
                        label: 'Exploit elemental weaknesses with a surging special energy blast (SP. ATK)',
                        stat: 'spatk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Douse the stone serpent with liquid and aura shockwaves.',
                        successNode: 'poke_ch2_cerulean_cape',
                        failNode: 'poke_ch2_cerulean_cape'
                    }
                ]
            },

            // Act II: Cerulean Cape & Buneary Rescue
            {
                id: 'poke_ch2_cerulean_cape',
                title: 'Act II: The Cerulean Cape & The Whirlpool Rescue',
                act: 'Act II - First Maiden Encounter',
                atmosphere: 'Salt spray whipping against coastal cliffs, turquoise ocean waves churning into a violent whirlpool, crying whimpers of a stranded female Buneary.',
                illustration: {
                    title: 'Cerulean Waters & The Wild Buneary',
                    badge: 'WILD MAIDEN ENCOUNTER',
                    badgeClass: 'threat-moderate',
                    icon: '🐰',
                    image: 'assets/lopunny_tsareena_maiden.jpg',
                    quote: '"Look out! A wild Buneary is trapped out on the reef in that whirlpool!"',
                    tags: ['Cerulean Cape', 'Buneary Chloe', 'Whirlpool Rescue', 'Cascade Waters']
                },
                narrative: `With the glistening **Boulder Badge** pinned to your collar, you march through Mt. Moon to the sparkling seaside city of Cerulean!

While exploring the scenic Cerulean Cape lighthouse, a frantic splashing draws your attention to the sea. A violent whirlpool created by a raging wild Gyarados is battering against the offshore coral reef!

Trapped on a sinking jagged rock is a wild female **Buneary**. Her cream-colored fur cuffs are soaked through, and her long ears droop with terror as waves threaten to sweep her into the deep.

Other trainers stand paralyzed on the pier, afraid of the Gyarados's ferocious roar. There is no time to hesitate!`,
                options: [
                    {
                        approach: 'speed',
                        tag: '⚡ BRAVE RESCUE',
                        label: 'Dive into the ocean surf and navigate the whirlpool currents with agile swimming (SPEED)',
                        stat: 'spd',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Reach the coral reef before the next tidal surge washes the Buneary away.',
                        successNode: 'poke_ch2_buneary_rescue',
                        failNode: 'poke_ch2_buneary_rescue'
                    },
                    {
                        approach: 'special',
                        tag: '🌀 AURA TETHER',
                        label: 'Extend an aura beam across the water to lift the Buneary to safety (SP. ATK)',
                        stat: 'spatk',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Channel focused psychic-aura prana to reel her gently toward your arms.',
                        successNode: 'poke_ch2_buneary_rescue',
                        failNode: 'poke_ch2_buneary_rescue'
                    }
                ]
            },

            // Buneary Rescue & Bond
            {
                id: 'poke_ch2_buneary_rescue',
                title: 'Act II: Buneary Chloe\'s Sweet Embrace',
                act: 'Act II - The Maiden\'s Gratitude',
                atmosphere: 'Warm beach towel, salty breeze, a trembling little bunny Pokémon nuzzling your neck with purrs of affection.',
                illustration: {
                    title: 'Buneary Chloe Rescued',
                    badge: 'NEW MAIDEN BOND',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/lopunny_tsareena_maiden.jpg',
                    quote: '"Bun-bun! *nuzzles your cheek warmly and refuses to leave your arms*"',
                    tags: ['Buneary Captured', 'Bond Formed', 'Cascade Badge Won']
                },
                narrative: `You pull the trembling Buneary from the frothing sea into your warm arms, carrying her safely back to the sun-warmed sands!

Wrapped in your jacket, the Buneary looks up into your eyes. Seeing your gentle smile, her big amber eyes fill with pure adoration. She wraps her soft, fluffy ears completely around your neck, purring contentedly and rubbing her wet nose against your cheek.

You name her **Chloe**. She taps her nose against your Pokéball, voluntarily sealing herself into your team as your first devoted Pokémon Maiden!

Word of your heroism spreads to the Cerulean Gym, where the water trainers gladly award you the **Cascade Badge**! But dark storm clouds are gathering to the south... rumors say Saffron City has fallen under a sinister blockade!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🏙️ MARCH TO SAFFRON',
                        label: 'Travel south toward Saffron City to investigate the Team Rocket syndicate blockade',
                        actionType: 'advance',
                        nextNode: 'poke_ch3_team_rocket_saffron',
                        targetNode: 'poke_ch3_team_rocket_saffron'
                    }
                ]
            },

            // Act III: Team Rocket Saffron Blockade
            {
                id: 'poke_ch3_team_rocket_saffron',
                title: 'Act III: Shadow Over Saffron & Silph Syndicate',
                act: 'Act III - The Syndicate Infiltration',
                atmosphere: 'City streets cast in eerie red emergency beacons, armed Team Rocket grunts in black combat armor patrolling the boulevard, psychic dampener cages humming ominously.',
                illustration: {
                    title: 'The Saffron City Blockade',
                    badge: 'SYNDICATE AMBUSH',
                    badgeClass: 'threat-severe',
                    icon: '☠️',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"No one enters or leaves Saffron without Lord Giovanni\'s permission!"',
                    tags: ['Team Rocket', 'Saffron Under Siege', 'Syndicate Clashes']
                },
                narrative: `When you arrive at the golden gates of Saffron City, an iron curfew is in effect. 

Team Rocket operatives under executive orders have cordoned off Silph Co. and the Saffron Gym with high-voltage barricades. Dark psychic-dampener pylons hum along the streets, designed to drain the mental energies of psychic Pokémon and maidens.

At the main gym entrance, a heavily armed Rocket strike team is attempting to breach Sabrina's inner sanctum.

Beside you, Buneary Chloe growls fiercely, her ears flattening in combat readiness. Suddenly, Sabrina's telepathic voice echoes urgently inside your mind:

*Challenger... your aura is approaching. They are trying to siphon the psychic reservoir of my gym. Break through their line!*`,
                options: [
                    {
                        approach: 'force',
                        tag: '💥 STRIKE THE LINE',
                        label: 'Team up with Chloe for a high-velocity combat charge to shatter the Rocket barricade (ATTACK)',
                        stat: 'atk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Barge through their armored shields with physical force.',
                        successNode: 'poke_ch3_rocket_crushed',
                        failNode: 'poke_ch3_rocket_crushed'
                    },
                    {
                        approach: 'special',
                        tag: '⚡ OVERLOAD PYLONS',
                        label: 'Fire an electric-aura discharge to detonate the psychic dampener pylons (SP. ATK)',
                        stat: 'spatk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Short-circuit their containment tech with pure energy.',
                        successNode: 'poke_ch3_rocket_crushed',
                        failNode: 'poke_ch3_rocket_crushed'
                    }
                ]
            },

            {
                id: 'poke_ch3_rocket_crushed',
                title: 'Act III: The Blockade Shatters',
                act: 'Act III - Victory in the Streets',
                atmosphere: 'Sparks showering from broken barricades, Rocket grunts fleeing into the subway tunnels, Sabrina\'s gym doors swinging wide open.',
                illustration: {
                    title: 'Saffron Liberated',
                    badge: 'BARRIER BROKEN',
                    badgeClass: 'threat-low',
                    icon: '⚡',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"You cleared my threshold. Now enter, my savior."',
                    tags: ['Rockets Routed', 'Gym Open', 'Sabrina Awaits']
                },
                narrative: `Your combined strike demolishes the Rocket defense array with a deafening crash! The grunts drop their weapons and scramble in panic as the psychic dampeners explode into harmless blue sparks.

The heavy steel blast doors of the Saffron Gym groan open.

Inside, purple neon illuminations and levitating marble platforms invite you into the soaring octagonal chamber. Gym Leader Sabrina sits upon her floating satin throne, watching you with breathless curiosity...`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🔮 FACE SABRINA',
                        label: 'Ascend the levitating platforms to challenge Sabrina for the Marsh Badge',
                        actionType: 'advance',
                        nextNode: 'poke_ch4_saffron_gym',
                        targetNode: 'poke_ch4_saffron_gym'
                    }
                ]
            },

            // Act IV: Saffron Gym & Sabrina's Mind Link
            {
                id: 'poke_ch4_saffron_gym',
                title: 'Act IV: The Mind Link of Saffron City',
                act: 'Act IV - The Telepathic Trial',
                atmosphere: 'Gleaming lavender neon lights, floating psychic orbs, telekinetic hum vibrating through the air, Sabrina sitting upon a levitating satin throne.',
                illustration: {
                    title: 'The Psychic Mistress of Saffron',
                    badge: 'GYM LEADER BATTLE',
                    badgeClass: 'threat-moderate',
                    icon: '🔮',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"You stepped into my sanctuary without trembling. Let us see if your mind can withstand my touch."',
                    tags: ['Saffron Gym', 'Sabrina', 'Telepathy', 'Marsh Badge']
                },
                narrative: `You arrive at the soaring skyscraper of the Saffron City Gym. The air inside hums with raw, crackling psychokinetic energy. Floating metallic tiles hover over a dizzying void, leading to a grand octagonal chamber.

Seated gracefully upon an elevated velvet dais is Sabrina. Her dark green hair cascades past her waist, her form-fitting scarlet gym uniform accentuating her slender curves. In her hand floats an ornate silver spoon, glowing with iridescent amethyst flames.

Beside her, a golden Alakazam crosses its psychic spoons, its eyes glowing with peerless psionic intellect.

Sabrina gazes down at you, her crimson eyes piercing directly into your mind. You feel an electric shiver run along the back of your spine—not of terror, but of an intense, intimate telepathic link:

"Many trainers come seeking the Marsh Badge," her voice echoes both in the hall and directly inside your subconscious, silky and enticing. "They rely on blunt force. But you... your aura carries a fascinating, passionate flame. Step forward, challenger. Let us test if your heart can overpower my psychic domain."

Her Alakazam unleashes a shimmering Psychic barrier, while Sabrina's own telekinetic waves wash over you!`,
                options: [
                    {
                        approach: 'special',
                        tag: '✨ SPECIAL ATTACK',
                        label: 'Gather your inner Aura and fire a piercing Aura Sphere to shatter Alakazam\'s barrier (SP. ATK)',
                        stat: 'spatk',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Unleash pure concentrated energy that bypasses psychic illusions.',
                        successNode: 'poke_ch4_aura_victory',
                        failNode: 'poke_ch4_psychic_strain'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ BOND & EMPATHY',
                        label: 'Open your subconscious mind fully to Sabrina, welcoming her telepathic touch without fear (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Connect your deepest feelings with hers, surprising the aloof psychic with raw affection.',
                        successNode: 'poke_ch4_telepathic_embrace',
                        failNode: 'poke_ch4_psychic_strain'
                    },
                    {
                        approach: 'speed',
                        tag: '⚡ SPEED',
                        label: 'Use agile evasion to slip between the levitating floor tiles and strike close (SPEED)',
                        stat: 'spd',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Close the distance faster than Alakazam can formulate its kinetic lock.',
                        successNode: 'poke_ch4_speed_strike',
                        failNode: 'poke_ch4_psychic_strain'
                    }
                ]
            },

            {
                id: 'poke_ch4_aura_victory',
                title: 'Act IV: Aura Shatters the Mirror',
                act: 'Act IV - Psychic Conquest',
                atmosphere: 'Amethyst psychic shards dissolving into radiant sparks, Sabrina softly panting, an astonished blush on her porcelain cheeks.',
                illustration: {
                    title: 'The Unbroken Aura',
                    badge: 'DECISIVE VICTORY',
                    badgeClass: 'threat-low',
                    icon: '💥',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"Such overwhelming spirit... you broke straight through my domain!"',
                    tags: ['Aura Victory', 'Sabrina Won', 'Affection Up']
                },
                narrative: `You focus your spirit into a blazing sapphire sphere. The wave expands with a thunderous roar, punching clean through Alakazam's barrier and sending the psionic spoons flying!

Alakazam nods in solemn defeat, returning to its ball.

Sabrina stands from her throne, her breath catching in her throat. For the first time in years, the legendary emotionless psychic is visibly flustered. A lovely rose tint colors her cheekbones, and her chest rises and falls with excited breaths.

She steps down from the dais, her high boots clicking rhythmically on the polished marble. Stopping mere inches from your chest, she looks up into your eyes:

"You didn't just defeat my partner... your aura surged directly into my heart. My mind has never felt so pleasantly overwhelmed. The gym is closed for the evening... come with me to my private penthouse. We have much to discuss... alone."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❤️ INTIMACY',
                        label: 'Take Sabrina\'s slender hand and accompany her to her private penthouse suite',
                        actionType: 'advance',
                        nextNode: 'poke_ch4_sabrina_intimacy',
                        targetNode: 'poke_ch4_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch4_telepathic_embrace',
                title: 'Act IV: Two Minds, One Heartbeat',
                act: 'Act IV - Soul Resonance',
                atmosphere: 'Gentle lavender glow filling the chamber, absolute telepathic intimacy, hearts beating in harmonic unison.',
                illustration: {
                    title: 'Mind & Soul Resonance',
                    badge: 'CRITICAL BOND',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"Your thoughts... they are so warm, so brave. I have never felt this before..."',
                    tags: ['Soul Bond', 'Sabrina Smitten', 'Affection +25']
                },
                narrative: `Instead of erecting mental shields, you project pure warmth, admiration, and protective desire directly toward Sabrina's telepathic probe.

The effect is immediate and staggering. Sabrina's eyes widen. A soft, breathless gasp escapes her lips as the sensation of your unconditional empathy floods her senses. The psychic spoons drop to the floor with a clatter.

Alakazam smiles knowingly and bows out of the duel.

Sabrina glides toward you as if drawn by a magnetic tide. Her slender fingers reach out, gently cupping your jawline. Her crimson eyes glisten with newfound wonder:

"All my life, people feared my powers. They shielded their minds, terrified of what I might see. But you opened your soul to me completely... and it feels breathtakingly sweet. I want to feel more of this. Come upstairs to my personal chambers. I won't let you leave tonight."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❤️ INTIMACY',
                        label: 'Wrap your arm around Sabrina\'s waist and ascend to her private penthouse',
                        actionType: 'advance',
                        nextNode: 'poke_ch4_sabrina_intimacy',
                        targetNode: 'poke_ch4_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch4_speed_strike',
                title: 'Act IV: High-Velocity Flank',
                act: 'Act IV - Tactical Triumph',
                atmosphere: 'Residual speed trails, Alakazam pinned, Sabrina thoroughly impressed by your sheer reflexes.',
                illustration: {
                    title: 'Lightning Reflexes',
                    badge: 'VICTORY',
                    badgeClass: 'threat-low',
                    icon: '⚡',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"Faster than thought itself... you truly are exceptional."',
                    tags: ['Speed Win', 'Marsh Badge']
                },
                narrative: `Moving in a blur of pure speed, you leap between the hovering platforms, slipping past Alakazam's psychic tracking and placing your baton gently against the psychic Pokémon's defense point!

Alakazam bows and acknowledges the defeat.

Sabrina laughs softly—a rare, musical sound that fills the hollow gym. She descends from her platform, admiring your athletic poise and fierce determination.

"Impressive reflexes. You caught both my Pokémon and my attention off-guard. I invite you to join me in my private penthouse to receive your reward."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❤️ INTIMACY',
                        label: 'Follow Sabrina to her private luxury suite',
                        actionType: 'advance',
                        nextNode: 'poke_ch4_sabrina_intimacy',
                        targetNode: 'poke_ch4_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch4_psychic_strain',
                title: 'Act IV: Sabrina\'s Teasing Dominion',
                act: 'Act IV - Psionic Rebound',
                atmosphere: 'Heavy psychic pressure, Sabrina gently restraining you with telekinesis, a teasing smirk on her red lips.',
                illustration: {
                    title: 'Sabrina\'s Dominion',
                    badge: 'HELD CAPTIVE',
                    badgeClass: 'threat-moderate',
                    icon: '⛓️',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"Struggling only makes the bond tighter, my dear challenger."',
                    tags: ['Telekinetic Hold', 'Teasing Interlude']
                },
                narrative: `The psionic wave pushes you back, momentarily freezing your muscles in an invisible, velvet telekinetic hold!

Sabrina steps off her dais and floats gracefully toward you. Her slender hand gently lifts your chin, her crimson eyes dancing with amusement:

"You fought bravely, but your spirit was too restless. Now you belong under my care. Do not fret... I have no intention of harming a trainer as handsome as you. Let me carry you up to my penthouse so you can recover under my personal watch."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❤️ INTIMACY',
                        label: 'Allow Sabrina to levitate you into her luxurious private penthouse',
                        actionType: 'advance',
                        nextNode: 'poke_ch4_sabrina_intimacy',
                        targetNode: 'poke_ch4_sabrina_intimacy'
                    }
                ]
            },

            // Sabrina Penthouse Romance
            {
                id: 'poke_ch4_sabrina_intimacy',
                title: 'Act IV: Midnight at the Saffron Penthouse',
                act: 'Act IV - The Maiden\'s Devotion',
                atmosphere: 'Floor-to-ceiling glass overlooking the neon glow of Saffron City, plush crimson couches, scented candles, Sabrina in a flowing silk nightgown.',
                illustration: {
                    title: 'Sabrina\'s Sacred Night',
                    badge: 'ROMANCE MILESTONE',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/sabrina_psychic.jpg',
                    quote: '"Here, without the gym and without my masks... I am just a woman who desires your warmth."',
                    tags: ['Sabrina Romance', 'Marsh Badge Earned', 'Harem Unlocked']
                },
                narrative: `The penthouse suite is a haven of luxury high above the city skyline. Soft jazz plays from hidden speakers, and the glow of Saffron City reflects in the tall panoramic windows.

Sabrina has changed out of her stiff uniform into a delicate, backless silk gown of emerald green. She pours two glasses of spiced Kalos wine and glides over to where you sit on the plush leather lounge.

She places the golden Marsh Badge into your palm, but doesn't let go of your fingers. Instead, she sits beside you, leaning her head softly against your shoulder:

"You hold the Marsh Badge now. But far more important to me is the bond we forged tonight. For years, I kept my heart locked away in cold glass. Tonight, your courage shattered it into pure light."

Her telepathic whisper purrs inside your mind, tingling with pure affection:

*I want to journey with you. When the League finals call your name, I will be standing by your side. Now... blow out the candles, my Champion. Tonight belongs entirely to us.*

You spend an unforgettable, passionate night in Sabrina's tender embrace, cementing her place as a devoted maiden in your League Harem!`,
                options: [
                    {
                        approach: 'mystery',
                        tag: '✨ PSYCHIC SIGNAL',
                        label: 'Investigate a starlit psychic distress beacon in the outskirts woods (Encounter Gardevoir!)',
                        actionType: 'advance',
                        nextNode: 'poke_ch5_gardevoir_rescue',
                        targetNode: 'poke_ch5_gardevoir_rescue'
                    },
                    {
                        approach: 'advance',
                        tag: '🌸 CELADON EXPEDITION',
                        label: 'Kiss Sabrina good morning and set out toward Celadon City\'s famous flower gardens',
                        actionType: 'advance',
                        nextNode: 'poke_ch6_celadon_hotsprings',
                        targetNode: 'poke_ch6_celadon_hotsprings'
                    }
                ]
            },

            // Act V: Gardevoir Rescue & Bond
            {
                id: 'poke_ch5_gardevoir_rescue',
                title: 'Act V: The Starlit Sanctuary & Gardevoir\'s Vow',
                act: 'Act V - The Embrace Maiden',
                atmosphere: 'Silvery moonlight filtering through ancient willow boughs, floating starlight motes, sinister poacher nets hummed with electric restraints, a radiant shiny Gardevoir pinned against a stone altar.',
                illustration: {
                    title: 'The Captured Embrace Maiden',
                    badge: 'RESCUE ENCOUNTER',
                    badgeClass: 'threat-moderate',
                    icon: '👰',
                    image: 'assets/gardevoir_maiden.jpg',
                    quote: '"Someone... please... someone whose heart knows true love..."',
                    tags: ['Gardevoir', 'Aria', 'Psychic Maiden', 'Poachers Ambush']
                },
                narrative: `Following the gentle, desperate psychic beacon outside Saffron City, you slip into a secluded moonlit forest grove.

A squad of heavily armored rogue poachers have cornered a breathtaking humanoid Pokémon: a radiant Gardevoir with shimmering emerald hair and a flawless white silk dress. Her ruby chest horn glows faintly, but electric containment nets have pinned her against an ancient mossy shrine.

The lead poacher brandishes an electrified shock prod with an ugly sneer:

"Heh, a purebred shiny Gardevoir! Black market collectors in Kanto will pay millions for an embrace maiden this gorgeous. Pack her into the cryo-cage!"

The Gardevoir's crimson eyes turn toward you through the shadows. A soft, musical telepathic plea echoes directly into your mind, filled with vulnerability and hope:

*Trainer... I sense your aura. It is pure, fearless, and overflowing with radiant warmth. Please... do not let them taint my soul!*`,
                options: [
                    {
                        approach: 'special',
                        tag: '💥 AURA BURST',
                        label: 'Channel an Aura Wave to shatter the shock nets and blow the poachers into the trees (SP. ATK)',
                        stat: 'spatk',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Vaporize the poachers\' mechanical traps with high-frequency aura energy.',
                        successNode: 'poke_ch5_gardevoir_intimacy',
                        failNode: 'poke_ch5_gardevoir_intimacy'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ TELEPATHIC RESONANCE',
                        label: 'Project your soul\'s devotion directly to Gardevoir, empowering her with mutual bond energy (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Form an instant soul-link, letting her unleash a devastating Moonblast alongside you.',
                        successNode: 'poke_ch5_gardevoir_intimacy',
                        failNode: 'poke_ch5_gardevoir_intimacy'
                    }
                ]
            },

            // Gardevoir Intimacy Node
            {
                id: 'poke_ch5_gardevoir_intimacy',
                title: 'Act V: Under the Moonlit Willows with Gardevoir Aria',
                act: 'Act V - The Maiden\'s Sacred Devotion',
                atmosphere: 'Gentle night breeze rustling willow leaves, glowing psychic butterflies dancing in the air, starlit reflections on the pond, Gardevoir resting her head against your chest.',
                illustration: {
                    title: 'Gardevoir Aria\'s Eternal Love',
                    badge: 'POKÉMON MAIDEN BOND',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/gardevoir_maiden.jpg',
                    quote: '"My heart beats only for you, my beloved Trainer... in your arms is the only place I ever want to be."',
                    tags: ['Gardevoir Romanced', 'Heart Horn Resonance', 'Harem Consort']
                },
                narrative: `With a blinding detonation of psychic light and aura shockwaves, the poachers are scattered into the dark forest, their broken traps smoking in the grass!

You rush to the shrine, slicing through the remaining mesh nets. As the restraints fall away, Gardevoir stumbles forward—straight into your arms.

You catch her gently against your chest. Her skin is remarkably soft, warm, and porcelain smooth. Her slender arms slide up around your shoulders, clutching you tightly as her body trembles with relief.

Her glowing red heart-horn rests directly against your chest, pulsating in perfect rhythm with your own heartbeat.

A tender, melodious voice sings directly in your mind, her porcelain cheeks coloring with a deep, passionate rose blush:

*I felt your soul the instant you stepped into this glade. My kind only gives our heart to one trainer across an entire lifetime... a trainer we would tear reality apart to protect. You are the sovereign my heart has waited for.*

She tilts her face upward, her ruby eyes shining with tears of blissful devotion. Leaning up on her toes, Gardevoir presses her soft, cool lips tenderly against yours in a sweet, telepathically charged kiss that sends shivers of pure ecstasy tingling down your spine!

She bestows upon you her cherished **Heart Pearl**, joining your personal Harem as your sworn, eternal Pokémon Maiden consort!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🌸 SET SAIL FOR CELADON',
                        label: 'Walk hand-in-hand with Gardevoir toward Celadon City\'s fragrant botanical gardens',
                        actionType: 'advance',
                        nextNode: 'poke_ch6_celadon_hotsprings',
                        targetNode: 'poke_ch6_celadon_hotsprings'
                    }
                ]
            },

            // Act VI: Celadon Hot Springs with Erika
            {
                id: 'poke_ch6_celadon_hotsprings',
                title: 'Act VI: The Scented Springs of Celadon',
                act: 'Act VI - Erika\'s Botanical Haven',
                atmosphere: 'Steam rising from natural mineral pools surrounded by blooming cherry blossoms and rainbow orchids, bamboo water fountains clacking, sweet aroma of jasmine.',
                illustration: {
                    title: 'Erika\'s Secret Sanctuary',
                    badge: 'HOT SPRINGS REST',
                    badgeClass: 'threat-low',
                    icon: '🌸',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"Welcome, weary traveler. In my private springs, all fatigue washes away."',
                    tags: ['Celadon City', 'Erika', 'Aromatherapy', 'Rainbow Badge']
                },
                narrative: `After your triumphs in Saffron, your journey leads to the vibrant, flower-strewn streets of Celadon City. Following a scented invitation delivered by a Bellossom, you arrive at Erika's private greenhouse estate.

Behind sliding shoji paper doors lies a secluded natural hot spring garden. Steaming crystal-clear mineral water pools beneath cascading wisteria and fragrant plum blossoms.

Gym Leader Erika steps out from the steam, dressed in a lightweight silk yukata that clings delicately to her curves. Her violet eyes sparkle with gentle warmth as she kneels beside the water, offering a lacquered tray of iced matcha and sweet dumplings:

"Word travels swiftly across Kanto, my dear friend. Sabrina speaks of you with a glow I have never seen in her eyes. You must be thoroughly exhausted from your battles."

She unties the sash of her robe with graceful ease, stepping into the warm mineral pool beside you, her fair skin glistening with fine droplets of water:

"Let the healing minerals soothe your weary muscles. And if you allow me... I would be delighted to personally massage away the tension from your shoulders with my special orchid oils."`,
                options: [
                    {
                        approach: 'bond',
                        tag: '❤️ INTIMACY & MASSAGE',
                        label: 'Lean back against the stone rim and let Erika\'s gentle hands massage your shoulders (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Surrender to Erika\'s sensual aromatherapy, unlocking deep mutual affection.',
                        successNode: 'poke_ch6_erika_romance',
                        failNode: 'poke_ch6_erika_polite'
                    },
                    {
                        approach: 'training',
                        tag: '🌿 GRASS MASTERY',
                        label: 'Discuss the secret medicinal properties of her rare herbs and Vileplume pollen (DEFENSE)',
                        stat: 'def',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Impress Erika with your knowledge of nature and body fortitude.',
                        successNode: 'poke_ch6_erika_romance',
                        failNode: 'poke_ch6_erika_polite'
                    }
                ]
            },

            {
                id: 'poke_ch6_erika_romance',
                title: 'Act VI: Blossom of Passion in the Springs',
                act: 'Act VI - Erika\'s Tender Embrace',
                atmosphere: 'Swirling rose petals in the hot spring pool, Erika pressing close from behind, sweet whispers of devotion.',
                illustration: {
                    title: 'Erika\'s Floral Devotion',
                    badge: 'ROMANCE BOND',
                    badgeClass: 'threat-low',
                    icon: '🌸',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"My flowers bloom for the sun... and my heart beats for you."',
                    tags: ['Erika Romanced', 'Rainbow Badge', 'HP Fully Restored']
                },
                narrative: `Erika's skilled, tender hands work warm jasmine oil across your neck and shoulder blades. Her touch is intoxicatingly gentle yet firm, instantly releasing all lingering exhaustion from your body.

As the steam swirls around you both, Erika leans forward, her cheek resting against your neck, her soft sighs tickling your ear:

"You carry such immense strength, yet your heart remains so remarkably kind. In this tranquil garden, I have tended many delicate blossoms... but none have captivated me like you."

She slides into your arms, the warm water swirling around your entwined bodies. With a blushing smile, she presses a delicate kiss against your lips:

"Take the Rainbow Badge, my beloved. And take my heart with it. Whenever you need healing or tender comfort, I will be waiting in your arms."

With Sabrina, Erika, and your devoted Gardevoir Aria now fiercely committed to your journey, your path opens to the Celadon Royal Pavilion!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🐰 MEET LOPUNNY & TSAREENA',
                        label: 'Visit the Royal Blossom Pavilion to meet the playful Lopunny Chloe and Queen Tsareena Victoria',
                        actionType: 'advance',
                        nextNode: 'poke_ch6_lopunny_tsareena_intimacy',
                        targetNode: 'poke_ch6_lopunny_tsareena_intimacy'
                    },
                    {
                        approach: 'advance',
                        tag: '❄️ TOWARD THE FROZEN PEAKS',
                        label: 'Pack your cold-weather gear and set out for the snowfields of Snowpoint',
                        actionType: 'advance',
                        nextNode: 'poke_ch7_snowpoint_cabin',
                        targetNode: 'poke_ch7_snowpoint_cabin'
                    }
                ]
            },

            {
                id: 'poke_ch6_erika_polite',
                title: 'Act VI: The Soothing Rainbow Blessing',
                act: 'Act VI - Restful Waters',
                atmosphere: 'Gentle warm water, Erika smiling politely as she presents the Rainbow Badge.',
                illustration: {
                    title: 'The Celadon Spring',
                    badge: 'BADGE OBTAINED',
                    badgeClass: 'threat-low',
                    icon: '🌿',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"May the vitality of the earth guard your steps, Champion."',
                    tags: ['Rainbow Badge', 'Healed']
                },
                narrative: `The herbal waters completely restore your vigor and heal all your battle wounds. Erika smiles with deep fondness, pinning the sparkling Rainbow Badge to your vest:

"You are a true gentleman of the League. Travel safely, and know that you are always welcome in Celadon."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🐰 MEET LOPUNNY & TSAREENA',
                        label: 'Visit the Royal Blossom Pavilion to meet the playful Lopunny Chloe and Queen Tsareena Victoria',
                        actionType: 'advance',
                        nextNode: 'poke_ch6_lopunny_tsareena_intimacy',
                        targetNode: 'poke_ch6_lopunny_tsareena_intimacy'
                    },
                    {
                        approach: 'advance',
                        tag: '❄️ TOWARD THE FROZEN PEAKS',
                        label: 'Set out for the mountain peaks of Snowpoint City',
                        actionType: 'advance',
                        nextNode: 'poke_ch7_snowpoint_cabin',
                        targetNode: 'poke_ch7_snowpoint_cabin'
                    }
                ]
            },

            // Lopunny & Tsareena Pavilion Node
            {
                id: 'poke_ch6_lopunny_tsareena_intimacy',
                title: 'Act VI.5: The Royal Blossom Pavilion with Lopunny & Tsareena',
                act: 'Act VI.5 - The Playful & The Queen',
                atmosphere: 'Golden sunlight streaming through bamboo lattices, scent of blooming orchids and sweet berries, Lopunny playfully resting on your lap while Tsareena crosses her royal legs on a velvet divan.',
                illustration: {
                    title: 'Lopunny Chloe & Queen Tsareena',
                    badge: 'POKÉMON MAIDEN DUO',
                    badgeClass: 'threat-low',
                    icon: '👑',
                    image: 'assets/lopunny_tsareena_maiden.jpg',
                    quote: '"You have both a fluffy cuddly sweetheart and a majestic queen to serve you now, my King!"',
                    tags: ['Lopunny Chloe', 'Tsareena Victoria', 'Harem Recruits', 'Blossom Pavilion']
                },
                narrative: `Before departing Celadon City, Erika guides you to the private Royal Blossom Pavilion at the edge of the estate.

Sitting upon a lavish silk-draped gazebo are two legendary Pokémon maidens:

• **Chloe the Lopunny**, who evolved from your rescued Buneary with fluffy cream-colored fur cuffs and long, twitching bunny ears, bounds over the moment she sees you! With a delighted giggle, she hops directly into your lap, wrapping her fluffy arms around your neck and nuzzling her soft cheek against yours:
"Yay! My hero! Erika said you were the most handsome trainer in the world, and she was right! You have to pet my ears... please?"

• Meanwhile, seated on an elevated royal divan, **Queen Victoria the Tsareena** crosses her long, shapely emerald legs. Her golden tiara glints in the sunlight, and her rich magenta crown of foliage billows with elegance. She looks down at you with a regal, teasing smirk:
"Hmph. Chloe has no shame at all. But I suppose a trainer capable of charming Sabrina and Erika deserves my royal attention."

Victoria glides over, placing one slender finger beneath your chin. Her proud royal demeanor melts into an alluring smile as she leans close, whispering against your ear:
"Kneel or don't kneel, my handsome King... from this day forth, my Trop Kicks defend your honor, and my heart belongs in your bed."

With Lopunny snuggled adorably against your chest and Queen Tsareena leaning affectionately against your shoulder, your Pokémon Maiden harem expands with fierce loyalty and boundless charm!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❄️ TOWARD THE FROZEN PEAKS',
                        label: 'Set out for the mountain peaks of Snowpoint City with your maidens by your side',
                        actionType: 'advance',
                        nextNode: 'poke_ch7_snowpoint_cabin',
                        targetNode: 'poke_ch7_snowpoint_cabin'
                    }
                ]
            },

            // Act VII: Snowpoint Blizzard with Lorelei
            {
                id: 'poke_ch7_snowpoint_cabin',
                title: 'Act VII: Blizzard Shelter & Lorelei\'s Fire',
                act: 'Act VII - The Frozen Heights',
                atmosphere: 'Howling sub-zero winds, heavy snow battering the log cabin shutters, a roaring stone fireplace casting golden shadows, Lorelei sipping spiced rum.',
                illustration: {
                    title: 'The Mountain Lodge Shelter',
                    badge: 'ELITE FOUR ENCOUNTER',
                    badgeClass: 'threat-moderate',
                    icon: '❄️',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"Out there is a frozen wasteland. In here... we have only each other to stay warm."',
                    tags: ['Snowpoint', 'Lorelei', 'Blizzard', 'Elite Four']
                },
                narrative: `A sudden blizzard descends upon the Sinnoh mountains, blinding the trails in white fury. Seeking refuge, you push open the heavy oak door of a sturdy log shelter.

Inside, the chill instantly gives way to the crackle of a stone fireplace. 

Sitting on a thick bearskin rug before the flames is Lorelei of the Elite Four. Her glasses reflect the golden embers, her thick winter coat tossed aside, leaving her in a snug crimson turtleneck sweater that highlights her statuesque figure. Beside her, a Lapras rests peacefully by the hearth.

She looks up, her sharp, intelligent gaze softening into an alluring smile:

"Well, well. If it isn't the trainer who swept through Saffron and Celadon. The storm outside won't clear until morning, and the temperature is plummeting. Come sit by the hearth before you turn to an icicle."

She pulls a heavy wool blanket over both of your shoulders and hands you a steaming mug of spiced rum:

"They call me the Ice Queen of the Elite Four. They think I feel no warmth. But when the cold winds blow... I prefer to hold someone worthy very close."`,
                options: [
                    {
                        approach: 'warmth',
                        tag: '🔥 PASSIONATE WARMTH',
                        label: 'Pull Lorelei close under the blanket and share body heat by the roaring hearth (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Melt the Elite Four ice queen\'s defenses with passionate tenderness.',
                        successNode: 'poke_ch7_lorelei_romance',
                        failNode: 'poke_ch7_lorelei_companion'
                    },
                    {
                        approach: 'tactics',
                        tag: '❄️ ICE DEFENSE',
                        label: 'Demonstrate your cold-endurance and tactical battle plans for the Indigo League (DEFENSE)',
                        stat: 'def',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Earn Lorelei\'s deep professional respect as a tactical equal.',
                        successNode: 'poke_ch7_lorelei_romance',
                        failNode: 'poke_ch7_lorelei_companion'
                    }
                ]
            },

            {
                id: 'poke_ch7_lorelei_romance',
                title: 'Act VII: Melting the Ice Queen\'s Heart',
                act: 'Act VII - Blizzard Heat',
                atmosphere: 'Embers flickering, Lorelei resting in your arms without her glasses, whispers of shared heat and desire.',
                illustration: {
                    title: 'Lorelei\'s Passion',
                    badge: 'ROMANCE BOND',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"You melted every defense I ever built... and I never want this storm to end."',
                    tags: ['Lorelei Romanced', 'Elite Devotion', 'Defense Boost']
                },
                narrative: `Under the thick blanket, you pull Lorelei into your arms. She tenses for half a heartbeat, then lets out a soft, blissful sigh as she buries her face into the crook of your neck, wrapping her arms tightly around your waist.

She removes her glasses, setting them on the nightstand, revealing sultry hazel eyes brimming with passionate longing:

"You truly have no fear of the cold, do you? All the challengers I battle see only an impassable glacier. But you look into me and see the fire within."

Her lips find yours in an eager, breathless kiss that banishes all memory of the freezing gale outside. Throughout the stormy night, by the amber glow of the embers, Lorelei offers you her unyielding devotion, body and soul.

By morning, the storm has cleared to reveal the shimmering northern aurora over Mt. Coronet!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🦊 THE SHRINE OF KITSUNE',
                        label: 'Ascend to the sacred frozen forest of Mt. Coronet to seek the legendary Kitsune Maiden',
                        actionType: 'advance',
                        nextNode: 'poke_ch8_kaguya_ninetales',
                        targetNode: 'poke_ch8_kaguya_ninetales'
                    }
                ]
            },

            {
                id: 'poke_ch7_lorelei_companion',
                title: 'Act VII: Comrades in the Blizzard',
                act: 'Act VII - Hearthside Truce',
                atmosphere: 'Warm tea, Lorelei offering strategic battle tips for the upcoming Indigo tournament.',
                illustration: {
                    title: 'Hearthside Wisdom',
                    badge: 'ALLY BOND',
                    badgeClass: 'threat-low',
                    icon: '❄️',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"You have the mettle of a true champion. Cynthia will not find you easy to defeat."',
                    tags: ['Elite Support', 'Tactical Insight']
                },
                narrative: `You share the fire and strategic battle insights with Lorelei until dawn breaks. Impressed by your dedication, she pledges her full Elite Four support during your championship match.`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🦊 THE SHRINE OF KITSUNE',
                        label: 'Ascend to the sacred frozen forest of Mt. Coronet to seek the legendary Kitsune Maiden',
                        actionType: 'advance',
                        nextNode: 'poke_ch8_kaguya_ninetales',
                        targetNode: 'poke_ch8_kaguya_ninetales'
                    }
                ]
            },

            // Act VIII: Alolan Ninetales Kaguya
            {
                id: 'poke_ch8_kaguya_ninetales',
                title: 'Act VIII: The Nine-Tailed Frost Empress of Mt. Coronet',
                act: 'Act VIII - The Kitsune\'s Blessing',
                atmosphere: 'Glittering crystalline snow beneath a celestial emerald aurora borealis, snow-white flowers blooming in ice, a regal humanoid Kitsune standing gracefully with nine luminous fluffy tails.',
                illustration: {
                    title: 'Kaguya the Nine-Tailed Maiden',
                    badge: 'ANCIENT KITSUNE SHRINE',
                    badgeClass: 'threat-moderate',
                    icon: '🦊',
                    image: 'assets/ninetales_maiden.jpg',
                    quote: '"Mortals rarely reach this sacred sanctuary. But your soul shines with the light of kings."',
                    tags: ['Ninetales Kaguya', 'Mt. Coronet', 'Aurora Borealis', 'Kitsune Empress']
                },
                narrative: `High upon the celestial ridges of Mt. Coronet, the mountain path opens into an ethereal grove of snow-blooming lilies beneath an awe-inspiring green and violet aurora.

Standing at the center of an ancient crystalline shrine is **Kaguya, the Nine-Tailed Frost Maiden (Alolan Ninetales)**.

Her long, silken icy-blue hair flows in the mountain breeze, and nine magnificent, cloud-soft fluffy tails fan out around her elegant fur-lined kimono. In her slender hand, she holds a crystal staff carved from pure glacial ice.

Suddenly, corrupt poachers and syndicate stragglers charge from the tree line with flamethrowers, intending to defile the sacred grove!

Without a second thought, you and Gardevoir leap between Kaguya and the flames, raising a radiant psychic-aura barrier that deflects the inferno straight back into the night sky!

Kaguya gasps softly in wonder, her gentle sapphire eyes widening as she watches you shield her with your own body.`,
                options: [
                    {
                        approach: 'defense',
                        tag: '🛡️ AURORA SHIELD',
                        label: 'Stand firm as her guardian shield and blow back the corrupt invaders (DEFENSE)',
                        stat: 'def',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Defend the sacred shrine with unyielding physical and psychic fortitude.',
                        successNode: 'poke_ch8_ninetales_intimacy',
                        failNode: 'poke_ch8_ninetales_intimacy'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ KITSUNE RESONANCE',
                        label: 'Attune your heartbeat to the rhythm of the northern lights and Kaguya\'s aura (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Resonate with the ancient frost spirit, creating an impenetrable Aurora Veil.',
                        successNode: 'poke_ch8_ninetales_intimacy',
                        failNode: 'poke_ch8_ninetales_intimacy'
                    }
                ]
            },

            // Kaguya Intimacy
            {
                id: 'poke_ch8_ninetales_intimacy',
                title: 'Act VIII: Embraced by the Nine Tails',
                act: 'Act VIII - The Frost Empress\'s Vow',
                atmosphere: 'Warm mystical glow inside the shrine, nine colossal fluffy tails wrapped tenderly around you, Kaguya\'s soft lips grazing your cheek in absolute devotion.',
                illustration: {
                    title: 'The Kitsune\'s Eternal Embrace',
                    badge: 'ANCIENT MAIDEN COVENANT',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/ninetales_maiden.jpg',
                    quote: '"My nine tails will wrap you in eternal warmth. Wherever my sovereign leads, I shall follow."',
                    tags: ['Ninetales Romanced', 'Aurora Veil Unlocked', 'Harem Consort']
                },
                narrative: `With a blast of freezing wind and blinding starlight, the syndicate intruders are swept down the mountain slopes, leaving the sacred grove in tranquil peace!

Kaguya steps forward, her crystal staff resting against the altar. 

Her nine cloud-soft tails gently curl around you, enveloping you in a circle of blissful, warm softness that blocks out every trace of the mountain chill. She steps into your embrace, resting her forehead against yours as her soft fox ears twitch with delight:

"For centuries, I guarded this frozen peak alone. Many came seeking my power, but you alone threw yourself before the flames to protect my honor. My heart has chosen you as its eternal sovereign."

She presses a sweet, tender kiss to your lips. A wave of ancient fairy energy surges through you, gifting you the **Glacier Seal** and unlocking the legendary **Aurora Veil** protection!

With your full team of devoted Pokémon Maidens assembled, the gates of the Indigo Plateau Colosseum swing open for the Championship duel!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '👑 ASCEND TO INDIGO PLATEAU',
                        label: 'March to the summit of the Indigo Plateau for the final Champion Duel with Cynthia',
                        actionType: 'advance',
                        nextNode: 'poke_ch9_indigo_championship',
                        targetNode: 'poke_ch9_indigo_championship'
                    }
                ]
            },

            // Act IX: Indigo Plateau Champion Duel with Cynthia
            {
                id: 'poke_ch9_indigo_championship',
                title: 'Act IX: The Summit of Champions',
                act: 'Act IX - The Dragon & The Sovereign',
                atmosphere: 'Rousing cheers of 50,000 spectators, golden triumphal banners snapping in the wind, Cynthia standing at the center of the celestial arena, Garchomp roaring at her side.',
                illustration: {
                    title: 'Champion Cynthia\'s Arena',
                    badge: 'LEAGUE FINALS',
                    badgeClass: 'threat-fatal',
                    icon: '👑',
                    image: 'assets/cynthia_champion.jpg',
                    quote: '"I have watched your ascension from Route 1 to my throne. Now... give me everything you have!"',
                    tags: ['Cynthia', 'Garchomp', 'Indigo Finals', 'Championship']
                },
                narrative: `The colossal stadium of the Indigo Plateau erupts into a deafening roar as you step onto the battlefield! Fireworks streak across the azure heavens, reflecting off the polished marble arena.

In the VIP box above, your rival **Maya** waves frantically, cheering your name with flushed cheeks. Beside her, Sabrina, Erika, Lorelei, Nessa, Gardevoir Aria, Lopunny Chloe, Tsareena Victoria, and Ninetales Kaguya all stand proudly together!

At the opposing trainer's box stands Champion Cynthia. 

Her long blonde hair flows like golden silk in the stadium breeze. Her midnight-black overcoat billows dramatically, its gold studs glinting under the arena floodlights. At her side, her colossal Garchomp rears back, unleashing a ground-shaking roar that rattles the stadium foundation!

Cynthia smiles with breathtaking radiance, her silver eyes burning with a passion that transcends mere competition:

"You started from humble beginnings on Route 1, conquered every trial, united the hearts of Kanto and Sinnoh, and arrived at my throne. My Garchomp and I have waited for someone who could push us to our absolute peak. 

No more holding back! Let our souls collide in the greatest battle the world has ever witnessed!"

Garchomp launches into the sky, wrapping itself in a catastrophic vortex of Dragon Rush!`,
                options: [
                    {
                        approach: 'special',
                        tag: '💥 AURA & MOONBLAST',
                        label: 'Combine your Aura Wave with Gardevoir\'s Moonblast to pierce Garchomp\'s Dragon Rush (SP. ATK)',
                        stat: 'spatk',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Unleash your ultimate special technique to meet Garchomp\'s Dragon Rush head-on!',
                        successNode: 'poke_ch9_cynthia_romance',
                        failNode: 'poke_ch9_clash_recovery'
                    },
                    {
                        approach: 'attack',
                        tag: '⚔️ MELEE CLASH',
                        label: 'Intercept Garchomp\'s dragon claw with your weapon and execute a close-quarters counter (ATTACK)',
                        stat: 'atk',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Stand your ground and parry the dragon\'s devastating kinetic charge.',
                        successNode: 'poke_ch9_cynthia_romance',
                        failNode: 'poke_ch9_clash_recovery'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ SOVEREIGN\'S WILL',
                        label: 'Command the battlefield with irresistible charisma and bond resonance (AFFECTION)',
                        stat: 'affection',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Demonstrate supreme harmony and heart connection that stuns Cynthia.',
                        successNode: 'poke_ch9_cynthia_romance',
                        failNode: 'poke_ch9_clash_recovery'
                    }
                ]
            },

            {
                id: 'poke_ch9_clash_recovery',
                title: 'Act IX: The Second Wind Surge',
                act: 'Act IX - Unyielding Spirit',
                atmosphere: 'Cracked stadium tiles, crowd on their feet screaming in awe, Cynthia smiling with exhilarating joy.',
                illustration: {
                    title: 'Clash of Titans',
                    badge: 'INTENSE STRUGGLE',
                    badgeClass: 'threat-severe',
                    icon: '⚡',
                    image: 'assets/cynthia_champion.jpg',
                    quote: '"Incredible resilience! But can you finish this?!"',
                    tags: ['Second Wind', 'Final Strike']
                },
                narrative: `The shockwave of Garchomp's Dragon Rush shatters the arena floor, kicking up a cyclone of dust! You slide back on your heels, bruises stinging, but your eyes blaze with unbroken determination.

Hearing the cheers of Maya, Gardevoir, Lopunny, Tsareena, Ninetales, Sabrina, Erika, and Lorelei echoing from the grandstands, your aura erupts into a blinding column of sapphire light!

Cynthia gasps in pure admiration: "What breathtaking spirit!"`,
                options: [
                    {
                        approach: 'special',
                        tag: '👑 SUPREME FINISHER',
                        label: 'Unleash your final transcendent strike to claim victory!',
                        actionType: 'advance',
                        nextNode: 'poke_ch9_cynthia_romance',
                        targetNode: 'poke_ch9_cynthia_romance'
                    }
                ]
            },

            // Champion Romance with Cynthia
            {
                id: 'poke_ch9_cynthia_romance',
                title: 'Act IX: The Champion\'s Heart Belongs to You',
                act: 'Act IX - Coronation of the Sovereign',
                atmosphere: 'Gold confetti raining down in millions of sparkling sheets, Garchomp bowing with deep respect, Cynthia walking into your arms before the entire world.',
                illustration: {
                    title: 'The Sovereign & The Champion',
                    badge: 'CHAMPION CORONATION',
                    badgeClass: 'threat-low',
                    icon: '👑',
                    image: 'assets/cynthia_champion.jpg',
                    quote: '"I have reigned as Champion for so long... but today, I joyfully surrender my title, my pride, and my heart to you."',
                    tags: ['Champion Defeated', 'Cynthia Romanced', 'Hall of Fame']
                },
                narrative: `Your ultimate strike shatters the sound barrier, illuminating the entire stadium in radiant azure brilliance! Garchomp lands on both knees with a heavy thud, panting heavily before bowing its mighty horned head in absolute reverence.

Silence falls across the stadium for one breathless second.

Then, the referee raises both flags into the air:

"GARCHOMP IS UNABLE TO BATTLE! THE WINNER AND NEW INDIGO LEAGUE CHAMPION IS OUR CHALLENGER!"

Fifty thousand fans roar in thunderous ecstasy! Confetti cannons detonate, filling the sky with swirling ribbons of gold and crimson!

Cynthia walks across the fractured arena floor. There is no sorrow in her expression—only pure, radiant adoration. She stops in front of you, unclasps the golden Champion Cape from her shoulders, and drapes it over your back.

Then, before the roaring stadium cameras and the entire world, Cynthia wraps her arms around your neck and pulls you into a deep, passionate victory kiss!

Her voice whispers warmly against your lips:

"You are more than just the new Champion of the League. You are the sovereign who captured my heart. Tonight, the grand celebration at the Champion's Villa belongs to us."`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🥂 THE HAREM VILLA CELEBRATION',
                        label: 'Proceed to the Grand Champions\' Villa for the ultimate harem epilogue celebration',
                        actionType: 'advance',
                        nextNode: 'poke_ch9_champion_harem_epilogue',
                        targetNode: 'poke_ch9_champion_harem_epilogue'
                    }
                ]
            },

            // Grand Epilogue
            {
                id: 'poke_ch9_champion_harem_epilogue',
                title: 'Epilogue: Sovereign of the League & The Maiden Harem',
                act: 'Epilogue - The Sovereign\'s Paradise',
                atmosphere: 'Luxurious private villa overlooking the moonlit Indigo mountains, private heated hot spring lagoon, crystal decanters of Kalos wine, Cynthia, Maya, Gardevoir, Lopunny, Tsareena, Ninetales, Sabrina, Erika, Lorelei, and Nessa all gathered in celebration.',
                illustration: {
                    title: 'The Grand Champion\'s Harem',
                    badge: 'VICTORY PARADISE',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"From Route 1 to the stars... with you as our Champion, our world will shine forever. Drink with us, our beloved sovereign!"',
                    tags: ['Grand Victory', 'Harem United', 'Omni-Realm Master']
                },
                narrative: `The private Champions' Villa is an opulent palace reserved exclusively for the greatest master in the history of the Pokémon League. 

Outside, a private hot spring lagoon steams under the silver moonlight. Inside, velvet couches surround a roaring fireplace, strewn with silk cushions and overflowing banquet platters of gourmet delicacies.

Around you, your devoted League Maidens, rival, and Pokémon companions have gathered to celebrate your glorious ascension:

• **Champion Cynthia**, stunning in a silken robe, leans against your chest, feeding you sweet berries and gazing into your eyes with boundless pride.
• **Rival Maya**, blushing sweetly in an evening dress, wraps her arm around yours, whispering softly: "You beat me to the Champion throne... but you promised me that date, remember? Now you're mine forever!"
• **Gardevoir Aria**, in her radiant white gown, curls into your lap, her telepathic vows filling your soul with eternal devotion and warmth.
• **Lopunny Chloe**, cute, playful, and affectionate, snuggles close to your chest, giggling as you stroke her soft fluffy ears.
• **Tsareena Queen Victoria**, regal and stunning in emerald and magenta, feeds you chilled peeled grapes with a proud, adoring smile: "A true King deserving of my crown."
• **Alolan Ninetales Kaguya**, draped gracefully beside you, wraps her nine cloud-soft tails around your shoulders like a warm, celestial blanket.
• **Sabrina**, her cold facade entirely gone, rests her head upon your shoulder, her telepathic whispers tingling with pleasure.
• **Erika**, wearing a delicate floral kimono, pours warm aromatic sake for you with a tender, adoring blush.
• **Lorelei**, holding a glass of chilled champagne, smiles seductively as she removes her glasses and traces a finger across your jaw.
• **Nessa**, radiant and playful in a swimsuit, splashes in the adjoining warm lagoon, beckoning you to join her for a midnight swim.

"You conquered every challenge, mastered every battle, and earned the eternal love of the strongest maidens and Pokémon companions in the world," Cynthia whispers softly, pressing her lips to your neck. "Your name will be carved in golden legend forever."

You have completed the Pokémon: Maidens of the League campaign from scratch as the supreme Sovereign and Champion! You may explore new realms, replay with different archetypes, or reign forever over your glorious harem!`,
                options: []
            }
        ]
    }
};

window.PokemonCampaignData = PokemonCampaignData;
