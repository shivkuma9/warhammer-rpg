// campaign_pokemon.js - Pokémon: Maidens of the League Campaign Module

const PokemonCampaignData = {
    UNIVERSE: 'pokemon',
    NAME: 'Pokémon: Maidens of the League',
    SUBTITLE: 'INDIGO & SINNOH EXPEDITION // D&D POKÉMON LEAGUE',

    // Trainer Archetypes
    TRAINERS: [
        {
            id: 'aura_striker',
            name: 'Kael / Aura Striker',
            order: 'Aura Guardian Guild',
            title: 'Master of Wave Motion & Lucario Bond',
            quote: '"Aura is the divine energy that links all living souls. With my partners, we transcend ordinary limits!"',
            stats: { atk: 70, spatk: 74, def: 62, spdef: 64, spd: 72, affection: 78 },
            woundsMax: 26,
            auraCurrent: 100,
            auraMax: 100,
            inventory: [
                { id: 'pk_w1', name: 'Aura-Infused Guardian Baton', type: 'melee', damage: '2d10+4', pen: 4, qualities: ['Aura Pulse'], desc: 'Polished steel guardian rod channeling focused fighting prana.' },
                { id: 'pk_w2', name: 'Silph Capture Blaster', type: 'ranged', damage: '1d10+6', pen: 3, qualities: ['Paralysis Spark'], desc: 'High-tech launcher firing electric nets and rapid Pokéballs.' },
                { id: 'pk_i1', name: 'Max Potion Flask (x3)', type: 'consumable', count: 3, heals: 12, desc: 'Herbal synthesis spray restoring HP and clearing fatigue.' }
            ],
            abilities: [
                { name: 'Aura Vision', desc: '+15 to Special Attack and bond tests when reading emotions or invisible moves.' },
                { name: 'Endure Resolve', desc: 'Can survive a fatal strike with 1 HP once per combat engagement.' }
            ]
        },
        {
            id: 'ace_tactician',
            name: 'Darian / Ace Tactician',
            order: 'Silph Co. Champion Analyst',
            title: 'Master of Synergy & Maiden Charisma',
            quote: '"Battles are won before the first ball is thrown. And no fortress or maiden\'s heart is truly unbreachable."',
            stats: { atk: 54, spatk: 84, def: 58, spdef: 72, spd: 66, affection: 88 },
            woundsMax: 22,
            auraCurrent: 100,
            auraMax: 100,
            inventory: [
                { id: 'pk_w3', name: 'Tactical Shock Dagger', type: 'melee', damage: '1d10+5', pen: 3, qualities: ['Thunder Strike'], desc: 'Compact defensive blade holding an electric discharge coil.' },
                { id: 'pk_w4', name: 'Silph Scope Laser Pistol', type: 'ranged', damage: '1d10+7', pen: 4, qualities: ['Accurate'], desc: 'Targeting firearm capable of piercing psychic barriers.' },
                { id: 'pk_i2', name: 'Sacred Moomoo Milk (x3)', type: 'consumable', count: 3, heals: 10, desc: 'Pure dairy elixir packed with stamina and health revitalizers.' }
            ],
            abilities: [
                { name: 'Irresistible Charm', desc: '+20 to Affection tests when wooing Gym Leaders and Champions.' },
                { name: 'Analytic Counter', desc: 'Grants +10 Defense against enemy special attacks.' }
            ]
        }
    ],

    // Devoted Gym Leaders & Champion Harem
    DEVOTED_MAIDENS: [
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
            perk: 'Garchomp Dragon Rush: Unleashes catastrophic dragon devastation for +25 damage and renders you immune to fear.'
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
            perk: 'Telepathic Future Sight: Predicts enemy movements, granting +15 to Agility and Evasion tests.'
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
            perk: 'Aromatherapy Healing: Automatically regenerates 4 HP each turn and cures all status afflictions.'
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

    // Campaign Narrative Chapters
    CAMPAIGN: {
        id: 'pokemon_champions_league',
        title: 'POKÉMON: MAIDENS OF THE LEAGUE',
        chapters: [
            // Chapter 1: Saffron City Psychic Challenge
            {
                id: 'poke_ch1_saffron_gym',
                title: 'Act I: The Mind Link of Saffron City',
                act: 'Act I - The Telepathic Trial',
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
                        successNode: 'poke_ch1_aura_victory',
                        failNode: 'poke_ch1_psychic_strain'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ BOND & EMPATHY',
                        label: 'Open your subconscious mind fully to Sabrina, welcoming her telepathic touch without fear (AFFECTION)',
                        stat: 'affection',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Connect your deepest feelings with hers, surprising the aloof psychic with raw affection.',
                        successNode: 'poke_ch1_telepathic_embrace',
                        failNode: 'poke_ch1_psychic_strain'
                    },
                    {
                        approach: 'speed',
                        tag: '⚡ SPEED',
                        label: 'Use Extreme Speed agile evasion to slip between the levitating floor tiles and strike close (SPEED)',
                        stat: 'spd',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Close the distance faster than Alakazam can formulate its kinetic lock.',
                        successNode: 'poke_ch1_speed_strike',
                        failNode: 'poke_ch1_psychic_strain'
                    }
                ]
            },

            // Sabrina Victory Nodes
            {
                id: 'poke_ch1_aura_victory',
                title: 'Act I: Aura Shatters the Mirror',
                act: 'Act I - Psychic Conquest',
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
                        targetNode: 'poke_ch1_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch1_telepathic_embrace',
                title: 'Act I: Two Minds, One Heartbeat',
                act: 'Act I - Soul Resonance',
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
                        targetNode: 'poke_ch1_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch1_speed_strike',
                title: 'Act I: High-Velocity Flank',
                act: 'Act I - Tactical Triumph',
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
                        targetNode: 'poke_ch1_sabrina_intimacy'
                    }
                ]
            },

            {
                id: 'poke_ch1_psychic_strain',
                title: 'Act I: Sabrina\'s Teasing Dominion',
                act: 'Act I - Psionic Rebound',
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
                        targetNode: 'poke_ch1_sabrina_intimacy'
                    }
                ]
            },

            // Penthouse Intimacy with Sabrina
            {
                id: 'poke_ch1_sabrina_intimacy',
                title: 'Act I: Midnight at the Saffron Penthouse',
                act: 'Act I - The Maiden\'s Devotion',
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

You spend an unforgettable, passionate night in Sabrina's tender embrace, cementing her place as the first devoted maiden in your League Harem!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '🌸 JOURNEY ONWARD',
                        label: 'Kiss Sabrina good morning and set out toward Celadon City\'s famous flower gardens',
                        actionType: 'advance',
                        targetNode: 'poke_ch2_celadon_hotsprings'
                    }
                ]
            },

            // Chapter 2: Celadon Hot Springs with Erika
            {
                id: 'poke_ch2_celadon_hotsprings',
                title: 'Act II: The Scented Springs of Celadon',
                act: 'Act II - Erika\'s Botanical Haven',
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
                narrative: `After your triumph in Saffron, your journey leads to the vibrant, flower-strewn streets of Celadon City. Following a scented invitation delivered by a Bellossom, you arrive at Erika's private greenhouse estate.

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
                        successNode: 'poke_ch2_erika_romance',
                        failNode: 'poke_ch2_erika_polite'
                    },
                    {
                        approach: 'training',
                        tag: '🌿 GRASS MASTERY',
                        label: 'Discuss the secret medicinal properties of her rare herbs and Vileplume pollen (DEFENSE)',
                        stat: 'def',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Impress Erika with your knowledge of nature and body fortitude.',
                        successNode: 'poke_ch2_erika_romance',
                        failNode: 'poke_ch2_erika_polite'
                    }
                ]
            },

            {
                id: 'poke_ch2_erika_romance',
                title: 'Act II: Blossom of Passion in the Springs',
                act: 'Act II - Erika\'s Tender Embrace',
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

With both Sabrina and Erika now fiercely devoted to your journey, your path leads north toward the frigid mountain peaks of Sinnoh!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '❄️ TOWARD THE FROZEN PEAKS',
                        label: 'Pack your cold-weather gear and set out for the snowfields of Snowpoint',
                        actionType: 'advance',
                        targetNode: 'poke_ch3_snowpoint_cabin'
                    }
                ]
            },

            {
                id: 'poke_ch2_erika_polite',
                title: 'Act II: The Soothing Rainbow Blessing',
                act: 'Act II - Restful Waters',
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
                        tag: '❄️ TOWARD THE FROZEN PEAKS',
                        label: 'Set out for the mountain peaks of Snowpoint City',
                        actionType: 'advance',
                        targetNode: 'poke_ch3_snowpoint_cabin'
                    }
                ]
            },

            // Chapter 3: Snowpoint Blizzard with Lorelei
            {
                id: 'poke_ch3_snowpoint_cabin',
                title: 'Act III: Blizzard Shelter & Lorelei\'s Fire',
                act: 'Act III - The Frozen Heights',
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
                        successNode: 'poke_ch3_lorelei_romance',
                        failNode: 'poke_ch3_lorelei_companion'
                    },
                    {
                        approach: 'tactics',
                        tag: '❄️ ICE DEFENSE',
                        label: 'Demonstrate your cold-endurance and tactical battle plans for the Indigo League (DEFENSE)',
                        stat: 'def',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Earn Lorelei\'s deep professional respect as a tactical equal.',
                        successNode: 'poke_ch3_lorelei_romance',
                        failNode: 'poke_ch3_lorelei_companion'
                    }
                ]
            },

            {
                id: 'poke_ch3_lorelei_romance',
                title: 'Act III: Melting the Ice Queen\'s Heart',
                act: 'Act III - Blizzard Heat',
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

By morning, the storm has passed. The sky shines brilliant crystalline blue. The grand path to the Indigo Plateau and the ultimate Champion duel awaits!`,
                options: [
                    {
                        approach: 'advance',
                        tag: '👑 ASCEND TO INDIGO PLATEAU',
                        label: 'March to the summit of the Indigo Plateau for the final Champion Duel with Cynthia',
                        actionType: 'advance',
                        targetNode: 'poke_ch4_indigo_championship'
                    }
                ]
            },

            {
                id: 'poke_ch3_lorelei_companion',
                title: 'Act III: Comrades in the Blizzard',
                act: 'Act III - Hearthside Truce',
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
                        tag: '👑 ASCEND TO INDIGO PLATEAU',
                        label: 'Ascend the grand marble stairs of the Indigo Plateau',
                        actionType: 'advance',
                        targetNode: 'poke_ch4_indigo_championship'
                    }
                ]
            },

            // Chapter 4: Indigo Plateau Champion Duel with Cynthia
            {
                id: 'poke_ch4_indigo_championship',
                title: 'Act IV: The Summit of Champions',
                act: 'Act IV - The Dragon & The Sovereign',
                atmosphere: 'Rousing cheers of 50,000 spectators, golden triumphal banners snapping in the wind, Cynthia standing at the center of the celestial arena, Garchomp roaring at her side.',
                illustration: {
                    title: 'Champion Cynthia\'s Arena',
                    badge: 'LEAGUE FINALS',
                    badgeClass: 'threat-fatal',
                    icon: '👑',
                    image: 'assets/cynthia_champion.jpg',
                    quote: '"I have watched your ascension with a racing heart. Now... give me everything you have!"',
                    tags: ['Cynthia', 'Garchomp', 'Indigo Finals', 'Championship']
                },
                narrative: `The colossal stadium of the Indigo Plateau erupts into a deafening roar as you step onto the battlefield! Fireworks streak across the azure heavens, reflecting off the polished marble arena.

At the opposing trainer's box stands Champion Cynthia. 

Her long blonde hair flows like golden silk in the stadium breeze. Her midnight-black overcoat billows dramatically, its gold studs glinting under the arena floodlights. At her side, her colossal Garchomp rears back, unleashing a ground-shaking roar that rattles the stadium foundation!

In the VIP box above, Sabrina, Erika, Lorelei, and Nessa watch with breathless anticipation, their eyes locked proudly upon you.

Cynthia smiles with breathtaking radiance, her silver eyes burning with a passion that transcends mere competition:

"You have conquered the gyms, united the hearts of Kanto and Sinnoh, and arrived at my throne. My Garchomp and I have waited for someone who could push us to our absolute peak. 

No more holding back! Let our souls collide in the greatest battle the world has ever witnessed!"

Garchomp launches into the sky, wrapping itself in a catastrophic vortex of Dragon Rush!`,
                options: [
                    {
                        approach: 'special',
                        tag: '💥 AURA OVERDRIVE',
                        label: 'Channel maximum Aura power into an all-out Dragon-piercing Aura Strike (SP. ATK)',
                        stat: 'spatk',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Unleash your ultimate special technique to meet Garchomp\'s Dragon Rush head-on!',
                        successNode: 'poke_ch4_cynthia_romance',
                        failNode: 'poke_ch4_clash_recovery'
                    },
                    {
                        approach: 'attack',
                        tag: '⚔️ MELEE CLASH',
                        label: 'Intercept Garchomp\'s dragon claw with your weapon and execute a close-quarters counter (ATTACK)',
                        stat: 'atk',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Stand your ground and parry the dragon\'s devastating kinetic charge.',
                        successNode: 'poke_ch4_cynthia_romance',
                        failNode: 'poke_ch4_clash_recovery'
                    },
                    {
                        approach: 'charm',
                        tag: '❤️ SOVEREIGN\'S WILL',
                        label: 'Command the battlefield with irresistible charisma and bond resonance (AFFECTION)',
                        stat: 'affection',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Demonstrate supreme harmony and heart connection that stuns Cynthia.',
                        successNode: 'poke_ch4_cynthia_romance',
                        failNode: 'poke_ch4_clash_recovery'
                    }
                ]
            },

            {
                id: 'poke_ch4_clash_recovery',
                title: 'Act IV: The Second Wind Surge',
                act: 'Act IV - Unyielding Spirit',
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

Hearing the cheers of Sabrina, Erika, Lorelei, and Nessa echoing from the grandstands, your aura erupts into a blinding column of sapphire light!

Cynthia gasps in pure admiration: "What breathtaking spirit!"`,
                options: [
                    {
                        approach: 'special',
                        tag: '👑 SUPREME FINISHER',
                        label: 'Unleash your final transcendent strike to claim victory!',
                        actionType: 'advance',
                        targetNode: 'poke_ch4_cynthia_romance'
                    }
                ]
            },

            // Champion Romance with Cynthia & Harem Coronation
            {
                id: 'poke_ch4_cynthia_romance',
                title: 'Act IV: The Champion\'s Heart Belongs to You',
                act: 'Act IV - Coronation of the Sovereign',
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
                        targetNode: 'poke_ch4_champion_harem_epilogue'
                    }
                ]
            },

            // Grand Epilogue
            {
                id: 'poke_ch4_champion_harem_epilogue',
                title: 'Epilogue: Sovereign of the League & The Maiden Harem',
                act: 'Epilogue - The Sovereign\'s Paradise',
                atmosphere: 'Luxurious private villa overlooking the moonlit Indigo mountains, private heated hot spring lagoon, crystal decanters of Kalos wine, Cynthia, Sabrina, Erika, Lorelei, and Nessa all gathered in celebration.',
                illustration: {
                    title: 'The Grand Champion\'s Harem',
                    badge: 'VICTORY PARADISE',
                    badgeClass: 'threat-low',
                    icon: '❤️',
                    image: 'assets/pokemon_realm_banner.jpg',
                    quote: '"With you as our Champion, our realms will shine forever. Drink with us, our beloved sovereign!"',
                    tags: ['Grand Victory', 'Harem United', 'Omni-Realm Master']
                },
                narrative: `The private Champions' Villa is an opulent palace reserved exclusively for the greatest master in the history of the Pokémon League. 

Outside, a private hot spring lagoon steams under the silver moonlight. Inside, velvet couches surround a roaring fireplace, strewn with silk cushions and overflowing banquet platters of gourmet delicacies.

Around you, your devoted League Maidens have gathered to celebrate your glorious ascension:

• **Champion Cynthia**, stunning in a silken robe, leans against your chest, feeding you sweet berries and gazing into your eyes with boundless pride.
• **Sabrina**, her cold facade entirely gone, rests her head upon your lap, her telepathic whispers sending shivers of delight through your mind.
• **Erika**, wearing a delicate floral kimono, pours warm aromatic sake for you with a tender, adoring blush.
• **Lorelei**, holding a glass of chilled champagne, smiles seductively as she removes her glasses and traces a finger across your jaw.
• **Nessa**, radiant and playful in a swimsuit, splashes playfully in the adjoining warm pool, beckoning you to join her for a midnight swim.

"You conquered every challenge, mastered every battle, and earned the eternal love of the strongest maidens in the world," Cynthia whispers softly, pressing her lips to your neck. "Your name will be carved in golden legend forever."

You have completed the Pokémon: Maidens of the League campaign as the supreme Sovereign and Champion! You may explore new realms, replay with different archetypes, or reign forever over your glorious harem!`,
                options: [
                    {
                        approach: 'restart',
                        tag: '🌌 REIGN / SWITCH REALMS',
                        label: 'Visit the Realm Hub to explore Warhammer, Fate, or One Piece, or replay with new choices',
                        actionType: 'advance',
                        targetNode: 'poke_ch1_saffron_gym'
                    }
                ]
            }
        ]
    }
};

window.PokemonCampaignData = PokemonCampaignData;
