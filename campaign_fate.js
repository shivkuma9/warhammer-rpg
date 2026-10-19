// campaign_fate.js - Fate/stay night: The Fuyuki Holy Grail War Campaign Module

const FateCampaignData = {
    UNIVERSE: 'fate',
    NAME: 'Fate/stay night: Heaven\'s Feel & The Holy Grail War',
    SUBTITLE: 'FUYUKI MUNICIPALITY // 5TH HOLY GRAIL WAR RITUAL',

    // Master Presets & Classes
    MASTERS: [
        {
            id: 'magus_reinforcement',
            name: 'Shirou / Standard Magus',
            order: 'Chaldea / Clock Tower',
            title: 'Master of Reinforcement & Structural Grasp',
            quote: '"I need no grand lineage. Through structural analysis and sharp blades, I will claim the Grail."',
            stats: { str: 45, end: 48, agi: 52, mana: 68, lck: 55, np: 70 },
            woundsMax: 20,
            commandSpells: 3,
            manaCurrent: 100,
            manaMax: 100,
            inventory: [
                { id: 'f_w1', name: 'Reinforced Azoth Dagger', type: 'melee', damage: '1d10+6', pen: 4, qualities: ['Mana Burst'], desc: 'Mystic code dagger infused with concentrated jewels of prana.' },
                { id: 'f_w2', name: 'Alchemical Gandr Pistol', type: 'ranged', damage: '1d10+5', pen: 3, qualities: ['Curse Shot'], desc: 'Scandinavian curse spell fired with firearm-like kinetic impact.' },
                { id: 'f_i1', name: 'Spiritual Elixir of Chaldea (x2)', type: 'consumable', count: 2, heals: 8, desc: 'Restores physical wounds and stabilizes severed magic circuits.' }
            ],
            abilities: [
                { name: 'Structural Grasp', desc: '+15 to Mana tests when analyzing opposing Noble Phantasms or traps.' },
                { name: 'Command Spell Surge', desc: 'Can spend 1 Command Spell to guarantee an instant critical miracle or evade death.' }
            ]
        },
        {
            id: 'shinji_matou',
            name: 'Shinji Matou',
            order: 'Matou Family Heir',
            title: 'Master of the False Command Tome & Rider Thralls',
            quote: '"Look at me! I am the true master here. Medusa and Saber belong to my command!"',
            stats: { str: 32, end: 35, agi: 45, mana: 50, lck: 65, np: 75 },
            woundsMax: 16,
            commandSpells: 3,
            manaCurrent: 85,
            manaMax: 100,
            inventory: [
                { id: 'f_w3', name: 'Book of the False Attendant', type: 'relic', damage: '1d10+4', pen: 2, qualities: ['Command Enslavement'], desc: 'Grimoire crafted from parchment inscribed with stolen command spells, forcing obedience upon Servants.' },
                { id: 'f_w4', name: 'Archery Longbow & Poisoned Arrows', type: 'ranged', damage: '1d10+5', pen: 3, qualities: ['Toxin'], desc: 'Modern composite bow coated in Matou crest-worm venoms.' },
                { id: 'f_i2', name: 'Matou Crest Worm Vial', type: 'consumable', count: 2, heals: 6, desc: 'Parasitic worms that stimulate magic circuits in exchange for agonizing pain.' }
            ],
            abilities: [
                { name: 'Cruel Command', desc: '+20 to Obedience checks when breaking captured enemy Servants and Masters.' },
                { name: 'Arrogant Survival', desc: 'When reduced to 0 wounds, has a 50% chance to flee with 1 HP remaining.' }
            ]
        }
    ],

    // Servants available to summon/partner with
    SERVANTS: [
        {
            id: 'saber_artoria',
            name: 'Artoria Pendragon',
            class: 'Saber',
            title: 'King of Knights',
            npName: 'Excalibur - Sword of Promised Victory',
            npRank: 'A++',
            stats: { str: 75, end: 70, agi: 68, mana: 65, lck: 60, np: 95 },
            quote: '"I ask of you: Are you my Master?"',
            desc: 'The righteous King of Knights, clad in silver-blue plate with an invisible wind-cloaked blade. Fiercely loyal, honorable, with an appetite that blossoms when she relaxes in your presence.'
        },
        {
            id: 'archer_emiya',
            name: 'Wrought-Iron Archer',
            class: 'Archer',
            title: 'Heroic Spirit of Infinite Blades',
            npName: 'Unlimited Blade Works - Infinite Blade Creation',
            npRank: 'A',
            stats: { str: 62, end: 60, agi: 72, mana: 68, lck: 45, np: 88 },
            quote: '"I am the bone of my sword. Steel is my body, and fire is my blood."',
            desc: 'A cynical yet fiercely protective warrior wielding twin Kanshou and Bakuya blades. Exceptional tactical instincts, marksmanship, and domestic culinary prowess.'
        },
        {
            id: 'rider_medusa',
            name: 'Rider of the Gorgon Gaze',
            class: 'Rider',
            title: 'The Mystic Eyed Serpent',
            npName: 'Bellerophon - Bridle of the Pegasus',
            npRank: 'A+',
            stats: { str: 65, end: 62, agi: 82, mana: 58, lck: 50, np: 90 },
            quote: '"If you desire my chain and my eyes, Master... I am entirely yours."',
            desc: 'Tall, enigmatic, and strikingly beautiful with cascading lilac hair and a velvet blindfold sealing her petrifying Mystic Eyes. Gentle, deeply sensual, and passionately protective.'
        }
    ],

    // Story Chapters
    CAMPAIGN: {
        id: 'fate_fuyuki_war',
        title: 'FATE/STAY NIGHT: THE GRAIL CONVERGENCE',
        chapters: [
            // Act I - The Summoning Night
            {
                id: 'fate_ch1_summoning',
                title: 'Act I: The Circle of Blood & Moonlight',
                act: 'Act I - The Rite of Summoning',
                atmosphere: 'Smell of molten mercury, whistling wind through shattered stained glass, moonlight framing the summoning altar.',
                illustration: {
                    title: 'Fuyuki Summoning Sanctum',
                    badge: 'RITUAL ACTIVE',
                    badgeClass: 'threat-sanctum',
                    icon: '🗡️',
                    image: 'assets/saber_portrait.jpg',
                    quote: '"Silver and iron to the origin. Gem and the archduke of contracts to the cornerstone."',
                    tags: ['Magic Circuits', 'Command Seals', 'Holy Grail War', 'Heroic Spirit']
                },
                narrative: `Midnight strikes in Fuyuki City. Rain lashes against the skylight of your ancestral workshop.

On the stone floor, the summoning circle glows with incandescent sapphire luminescence. Your right hand burns with a piercing, searing brand as the Three Command Seals engrave themselves into your flesh—three stylized crimson wings etched upon your back of hand.

"Silver and iron to the origin. Gem and the archduke of contracts to the cornerstone...
Heed my call! Let thy destiny be entwined with my blade!"

You pour your magical energy into the catalyst. The room detonates with a blast of blinding holy light and swirling prana wind! 

As the smoke clears, a figure stands atop the altar, moonlight gleaming off polished armor and flowing robes. Their gaze locks with yours, an undeniable soul-link vibrating through your magic circuits:

"I ask of you: Are you my Master? Together, we shall claim the Holy Grail."`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Grip your Azoth blade and match their aura with steady warrior conviction (STR)',
                        stat: 'str',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Demonstrate fearless resolve to forge an unshakeable warrior bond.',
                        successNode: 'fate_ch1_pact_warrior',
                        failNode: 'fate_ch1_pact_cautious'
                    },
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Step forward smoothly and offer your bare hand in courteous greeting (AGI)',
                        stat: 'agi',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Exhibit the graceful poise of an accomplished battle magus.',
                        successNode: 'fate_ch1_pact_graceful',
                        failNode: 'fate_ch1_pact_cautious'
                    },
                    {
                        approach: 'mind',
                        tag: '🧠 MIND',
                        label: 'Activate Structural Grasp to analyze their Saint Graph and Spirit Origin (MANA)',
                        stat: 'mana',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Probe their parameters, Noble Phantasm affinities, and hidden traits.',
                        successNode: 'fate_ch1_pact_analytical',
                        failNode: 'fate_ch1_pact_cautious'
                    },
                    {
                        approach: 'mystery',
                        tag: '✨ MYSTERY',
                        label: 'Channel prana directly through your Command Seal to deepen the soul-link (COMMAND)',
                        stat: 'lck',
                        modifier: +15,
                        actionType: 'check',
                        desc: 'Open your magic circuits completely, establishing intimate prana circulation.',
                        successNode: 'fate_ch1_pact_intimate',
                        failNode: 'fate_ch1_pact_cautious'
                    },
                    {
                        approach: 'force',
                        tag: '⛓️ SHINJI DOMINANCE',
                        label: '[Shinji Special] Brandish the Book of the False Attendant and demand absolute submission!',
                        stat: 'lck',
                        modifier: +20,
                        actionType: 'check',
                        desc: 'Assert supreme authority over the summoned Servant, forcing immediate obedience or servitude.',
                        successNode: 'fate_ch1_pact_shinji',
                        failNode: 'fate_ch1_pact_cautious'
                    }
                ]
            },

            // Branch 1: Warrior Pact
            {
                id: 'fate_ch1_pact_warrior',
                title: 'The Unyielding Vanguard',
                act: 'Act I - Pact Sealed',
                atmosphere: 'Sparks drifting in the drafty room, warm respect in your Servant\'s eyes.',
                illustration: {
                    title: 'Pact of Blood and Steel',
                    badge: 'BOND FORGED',
                    badgeClass: 'threat-moderate',
                    icon: '⚔️',
                    quote: '"A Master with fire in their eyes. My sword shall never falter."',
                    tags: ['Warrior Respect', 'High Morale', 'Saint Graph Synchronized']
                },
                narrative: `Your Servant’s eyes flare with fierce approval. They lower their weapon and bow slightly with genuine respect.

"A Master who meets a Heroic Spirit eye to eye without trembling... Splendid. Let the rival Masters send their shadows; our steel will carve the path to victory."

Before you can converse further, the perimeter wards around your estate suddenly shriek! An ominous spike of foreign magical energy registers along the Shinto harbor district. A hostile Servant has already made their move.`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Deploy immediately to the harbor to face the intruder in open combat',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'mind',
                        tag: '🧠 MIND',
                        label: 'Scout the rooftops around Fuyuki Bridge first to set up an ambush',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Branch 2: Graceful Pact
            {
                id: 'fate_ch1_pact_graceful',
                title: 'A Bond of Courtesy and Honor',
                act: 'Act I - Pact Sealed',
                atmosphere: 'Gentle golden prana swirling, fingertips touching with quiet warmth.',
                illustration: {
                    title: 'Oath of the Roundtable',
                    badge: 'BOND FORGED',
                    badgeClass: 'threat-sanctum',
                    icon: '✨',
                    quote: '"Your touch is calm. Under your guidance, no sorrow shall befall us."',
                    tags: ['Noble Bond', 'Harmony', 'Fuyuki Night']
                },
                narrative: `You step forward calmly and extend your hand. Your Servant gently clasps your palm; a warm rush of prana surges between your skin, steadying your heartbeat. A soft, tender smile touches their lips.

"It is rare to meet a magus who regards a Servant as an equal companion rather than a mere familiar. I swear upon my honor: I shall be your blade, your shield, and your haven."

Suddenly, a shockwave rattles the windowpanes! Across the bay, columns of pale crimson sorcery erupt into the midnight sky above the shipping container yards.`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Sprint together to the container yards to intercept the enemy Servant',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Cloak yourselves in bounded field concealment and flank the shipping cranes',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Branch 3: Analytical Pact
            {
                id: 'fate_ch1_pact_analytical',
                title: 'Structural Revelation',
                act: 'Act I - Pact Sealed',
                atmosphere: 'Runes flowing behind eyelids, total clarity of parameters.',
                illustration: {
                    title: 'Saint Graph Telemetry',
                    badge: 'ANALYSIS COMPLETE',
                    badgeClass: 'threat-moderate',
                    icon: '📜',
                    quote: '"Parameters aligned. Mana conduits functioning at 100% capacity."',
                    tags: ['Tactical Advantage', 'Saint Graph Insight']
                },
                narrative: `Your structural analysis spell deciphers their spirit origin in seconds: immense physical resilience, exceptional agility, and a catastrophic anti-fortress Noble Phantasm.

Your Servant smirks with appreciation: "Keen insight, Master. Knowing each other\'s parameters is the first step toward flawless teamwork."

At that moment, your familiars transmit frantic mental alarms—an assassin or scout has triggered your boundary line along the Shinto coastal road!`,
                options: [
                    {
                        approach: 'mind',
                        tag: '🧠 MIND',
                        label: 'Triangulate the enemy prana signature and advance toward the harbor docks',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Lure the pursuer into your prepared bounded trap in the courtyard',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Branch 4: Intimate / High Prana Bond
            {
                id: 'fate_ch1_pact_intimate',
                title: 'The Sacred Soul Confluence',
                act: 'Act I - Prana Synchronization',
                atmosphere: 'Heavy breathing, heat radiating through clothes, eyes dilated with profound intimacy.',
                illustration: {
                    title: 'Prana Circuit Harmonization',
                    badge: 'SOUL CONFLUENCE',
                    badgeClass: 'threat-sanctum',
                    icon: '💖',
                    image: 'assets/saber_portrait.jpg',
                    quote: '"Ah... my circuits are singing. Master, our souls fit together so intimately..."',
                    tags: ['Deep Devotion', 'Circuit Resonance', 'Maximum Prana']
                },
                narrative: `You release your magical circuits completely. Crimson and gold currents bridge between your chest and theirs. 

Your Servant gasps softly, a delicate blush spreading across their cheeks as the raw, unfiltered vitality of your spirit infuses them. They take an involuntary step closer, their chest pressing against yours, fingers curling into your coat:

"Such warmth... I have never felt magic circuits intertwine so seamlessly. My Master... my heart races simply standing in your presence." (+25 Servant Affection / Prana maximized!)

Before the embrace can linger, thunderous sonic booms split the night air over Fuyuki Bay. A rival Master has deployed their Servant to draw out challengers!`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Stride hand-in-hand toward the harbor to claim your first decisive victory',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Take to the shadows with heightened synchronization and flank the harbor',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Branch 4: Shinji Subjugation Pact
            {
                id: 'fate_ch1_pact_shinji',
                title: 'The Grimoire of Chains',
                act: 'Act I - Forced Subjugation & Thrall Binding',
                atmosphere: 'Smell of old parchment and wormwood, dark violet glyphs wrapping around the altar, cruel triumphant laughter.',
                illustration: {
                    title: 'Shinji\'s Enslavement Ritual',
                    badge: 'SUBJUGATION COMPLETE',
                    badgeClass: 'threat-extreme',
                    icon: '⛓️',
                    image: 'assets/shinji_thrall_ritual.jpg',
                    quote: '"Look at you, proud Heroic Spirit! Under my False Tome, your pride belongs to Shinji Matou!"',
                    tags: ['Thrall Bound', 'Obedience Surge', 'Matou Bloodline']
                },
                narrative: `You sneer with arrogant relish, thrusting the glowing pages of the Book of the False Attendant into the air! 

Dark Matou runes leap from the parchment like barbed iron chains, lashing tight around your Servant's armored wrists and throat. The spirit recoils with a sharp gasp, their divine authority momentarily shackled by the stolen Command Spells!

"W-What is this foul sorcery?!" they grit their teeth, emerald eyes burning with humiliated defiance as the mystical bindings force them down to one knee before you.

You step forward, lifting their chin with the tip of your bow: "Don't get cocky, Servant! I hold the command seals. In the Matou household, you obey my every whim—whether in battle or in my private chambers!" (+35 Obedience / Subjugated Thrall Status Activated!)

Before you can break their defiance further, a furious seismic tremor shakes the floor. Berserker and his master have launched a brutal assault on the docks!`,
                options: [
                    {
                        approach: 'force',
                        tag: '⛓️ COMPEL',
                        label: 'Use the False Tome to command your thrall Servant to crush the intruders',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'mind',
                        tag: '🧠 AMBUSH',
                        label: 'Force your thrall to act as bait while you snipe the enemy Master from the shadows',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Branch 6: Cautious Pact (Failure outcome for Act I summoning checks)
            {
                id: 'fate_ch1_pact_cautious',
                title: 'A Fragile Pact of Survival',
                act: 'Act I - Pact Sealed',
                atmosphere: 'A cold night breeze through shattered stained glass, watchful silence as your Servant assesses your trembling magic circuits.',
                illustration: {
                    title: 'Wary Alliance in the Moonlight',
                    badge: 'CAUTIOUS PACT',
                    badgeClass: 'threat-moderate',
                    icon: '🛡️',
                    quote: '"Your spirit wavers, Master. Yet the contract is struck. Let us see if your resolve sharpens in battle."',
                    tags: ['Prana Strain', 'Wary Bond', 'Holy Grail War']
                },
                narrative: `Your concentration fractures slightly under the crushing spiritual pressure of the summoned Heroic Spirit. The magical backlash jolts through your magic circuits, and you stumble back against the altar, gasping for breath.

Your Servant steps down from the pedestal, their weapon resting loosely at their side, gaze guarded yet solemn:

"Steady yourself, Master. The summoning is complete, and the Command Seals upon your hand bind my blade to your cause. Though your experience in magecraft is untested, battle will forge what words cannot."

Before you can recover your breath, the perimeter wards around your workshop violently detonate in blue flame! An immense crimson prana shockwave erupts from the direction of Fuyuki harbor. An enemy Servant is already prowling the city!`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Rush directly to Shinto harbor to face the enemy head-on',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'mind',
                        tag: '🧠 MIND',
                        label: 'Take the high ground around Fuyuki Bridge to scout the enemy first',
                        actionType: 'advance',
                        nextNode: 'fate_ch2_bridge_recon'
                    }
                ]
            },

            // Act II: Harbor Skirmish against Berserker / Lancer
            {
                id: 'fate_ch2_harbor_skirmish',
                title: 'Act II: Clash Under the Starlit Bay',
                act: 'Act II - The First Night of Blood',
                atmosphere: 'Smell of brine and burning metal, giant shipping containers sliced cleanly in two, a towering silhouette bathed in crimson lightning.',
                illustration: {
                    title: 'Fuyuki Docks Showdown',
                    badge: 'HOSTILE SERVANT ENGAGED',
                    badgeClass: 'threat-extreme',
                    icon: '⚡',
                    quote: '"RAAAAGH! SHOW ME YOUR FLESH AND BONES!"',
                    tags: ['Hostile Servant', 'Noble Phantasm Standby', 'Container Maze']
                },
                narrative: `You arrive at the harbor. Fog drifts across the water, parted violently by shockwaves.

Standing atop a crushed shipping crate is a monstrous enemy Servant: BERSERKER OF THE SHADOWS. His towering, obsidian-muscled frame crackles with red mad-enhancement lightning. In his hands is a slab of raw granite fashioned into an executioner's club.

Beside him in the shadows, a hooded enemy Master sneers: "Another pathetic magus arrived to be butchered. Tear them apart, Berserker!"

Berserker roars with earth-shattering fury and lunges across the asphalt straight at you!`,
                combat: {
                    enemyName: 'Berserker (Mad Enhancement A)',
                    enemyHp: 48,
                    enemyMaxHp: 48,
                    t: 50,
                    armorVal: 8,
                    attackRoll: 55,
                    weapon: { name: 'Titan Granite Slab', damage: '2d10+6', pen: 6, qualities: ['Tearing'] },
                    quote: '"[BEASTIAL ROAR THAT SHATTERS GLASS BULKHEADS]"',
                    onDefeatNode: 'fate_ch3_grail_sanctum'
                }
            },

            // Alternative Recon Node
            {
                id: 'fate_ch2_bridge_recon',
                title: 'Act II: High-Altitude Sniper Vantage',
                act: 'Act II - Ambush Execution',
                atmosphere: 'Gale wind at the top of the suspension cables, glowing magical tracer lines.',
                illustration: {
                    title: 'Fuyuki Suspension Bridge',
                    badge: 'TACTICAL AMBUSH',
                    badgeClass: 'threat-moderate',
                    icon: '🎯',
                    quote: '"Target acquired. Calculating wind drift and magical barrier deflection."',
                    tags: ['High Ground', 'Sniper Advantage', 'Structural Weakness']
                },
                narrative: `You ascend to the highest steel cables of the Fuyuki Bridge. From here, you have an unobstructed line of sight into the harbor container maze below.

Berserker is thrashing blindly through the crates, unable to locate your position. His enemy Master is standing exposed near a fuel tanker!`,
                options: [
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Unleash a precision snipe or prana arrow at the enemy Master (AGI Check)',
                        stat: 'agi',
                        modifier: +15,
                        actionType: 'check',
                        desc: 'Strike directly at the Master to disable Berserker\'s prana supply.',
                        successNode: 'fate_ch2_snipe_success',
                        failNode: 'fate_ch2_harbor_skirmish'
                    },
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Command your Servant to dive from the bridge in an orbital meteor slam (STR Check)',
                        stat: 'str',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Crash down directly onto Berserker\'s spine with crushing momentum.',
                        successNode: 'fate_ch2_dive_success',
                        failNode: 'fate_ch2_harbor_skirmish'
                    }
                ]
            },

            {
                id: 'fate_ch2_snipe_success',
                title: 'Master Severed!',
                act: 'Act II - Tactical Triumph',
                atmosphere: 'Whistle of mystic projectile, scream of retreating magus.',
                illustration: {
                    title: 'Precision Mana Rupture',
                    badge: 'TACTICAL STRIKE',
                    badgeClass: 'threat-moderate',
                    icon: '🎯',
                    quote: '"Target neutralized! Berserker is burning through his reserve prana!"',
                    tags: ['Master Down', 'Weakened Foe']
                },
                narrative: `Your shot strikes the enemy Master\'s defensive talisman dead center, shattering their ribs and forcing them to flee in sheer panic! Berserker roars in pain as his prana conduit is severed in half!`,
                combat: {
                    enemyName: 'Berserker (Prana Depleted)',
                    enemyHp: 26,
                    enemyMaxHp: 48,
                    t: 38,
                    armorVal: 4,
                    attackRoll: 42,
                    weapon: { name: 'Desperate Flailing Club', damage: '1d10+6', pen: 3 },
                    quote: '"[FADING ROAR OF AGONY]"',
                    onDefeatNode: 'fate_ch3_grail_sanctum'
                }
            },

            {
                id: 'fate_ch2_dive_success',
                title: 'Meteor Impact of Promised Victory',
                act: 'Act II - Aerial Triumph',
                atmosphere: 'Crater 20 meters wide in asphalt, smoke pouring from shattered concrete.',
                illustration: {
                    title: 'Crater of Devastation',
                    badge: 'CRITICAL IMPACT',
                    badgeClass: 'threat-extreme',
                    icon: '💥',
                    quote: '"Strike true! The beast is broken!"',
                    tags: ['Devastating Entry', 'Berserker Stunned']
                },
                narrative: `Your Servant plunges from the bridge like a falling comet! The shockwave crushes the concrete into dust, pinning Berserker to the earth!`,
                combat: {
                    enemyName: 'Berserker (Pinned & Bleeding)',
                    enemyHp: 20,
                    enemyMaxHp: 48,
                    t: 35,
                    armorVal: 3,
                    attackRoll: 40,
                    weapon: { name: 'Cracked Granite Slab', damage: '1d10+4', pen: 2 },
                    quote: '"[STRUGGLING FROM THE CRATER]"',
                    onDefeatNode: 'fate_ch3_grail_sanctum'
                }
            },

            // Act III: Victory & Private Sanctum Intimacy
            {
                id: 'fate_ch3_grail_sanctum',
                title: 'Act III: The Sanctuary of Shared Warmth',
                act: 'Act III - Intimate Communion & The Holy Grail Path',
                atmosphere: 'Quiet workshop hearth, aroma of black tea and sweet honey, clothes drying by the fire, deep quiet after survival.',
                illustration: {
                    title: 'Servant\'s Unwavering Love',
                    badge: 'SANCTUARY OF DEVOTION',
                    badgeClass: 'threat-sanctum',
                    icon: '💖',
                    image: 'assets/saber_portrait.jpg',
                    quote: '"I fought for ideals once. But now, in this quiet room... I fight only for you."',
                    tags: ['Deep Affection', 'Holy Grail In Sight', 'True Companionship']
                },
                narrative: `Berserker dissolves into golden motes of spiritual ether, his core absorbed by the Lesser Grail. The harbor falls completely silent.

Back in your secluded villa workshop, the fire crackles softly. You tend to your Servant’s scuffed armor, wiping away soot with a damp linen cloth. 

As you gently wrap a bandage around their shoulder, they turn to you. Their hand reaches out, fingers gently caressing your jawline, their eyes shimmering with profound, breathless affection:

"You were magnificent tonight, Master. When you stood in front of that beast, my chest tightened with a terror I never felt in ancient wars—the terror of losing you."

They lean in, their forehead resting tenderly against yours, warm breath mingling in the dim firelight:

"The Holy Grail grants any wish. But standing here with you, I realize my wish has already been granted. Stay beside me... let me hold you until the dawn comes."`,
                options: [
                    {
                        approach: 'mystery',
                        tag: '✨ MYSTERY',
                        label: 'Embrace them tightly and seal your devotion with a passionate, lingering kiss',
                        actionType: 'advance',
                        nextNode: 'fate_epilogue_true_lovers'
                    },
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Vow upon your Command Seals to conquer every remaining Master together',
                        actionType: 'advance',
                        nextNode: 'fate_epilogue_conquerors'
                    },
                    {
                        approach: 'mystery',
                        tag: '⛓️ SHINJI HAREM',
                        label: '[Shinji Ending] Claim your vanquished rivals and bind both Saber and Rider into your personal Harem!',
                        actionType: 'advance',
                        nextNode: 'fate_epilogue_shinji_harem'
                    }
                ]
            },

            // Epilogue 1: True Lovers
            {
                id: 'fate_epilogue_true_lovers',
                title: '★ EPILOGUE: THE WISH OF TWO HEARTS ★',
                act: 'Grand Finale - The Forever Covenant',
                atmosphere: 'Golden morning sunlight streaming across the bedroom, twin teacups, peaceful city skyline.',
                illustration: {
                    title: 'The Eternal Holy Grail Covenant',
                    badge: 'TRIUMPH COMPLETE',
                    badgeClass: 'threat-sanctum',
                    icon: '👑',
                    image: 'assets/saber_portrait.jpg',
                    quote: '"No matter which timeline unfolds, my soul belongs to you."',
                    tags: ['Holy Grail Claimed', 'Eternal Covenant', 'Fuyuki Dawn']
                },
                narrative: `The morning sun crests over Mount Enzo.

You and your Servant have triumphed. The corrupted Holy Grail is dismantled, its immense prana channeled instead to anchor their spirit origin permanently into the living world as a human being of flesh and blood.

They stand beside you on the sunlit terrace, wearing simple casual clothes, looking out over the quiet city of Fuyuki. They lace their fingers intimately through yours, leaning their head gently onto your shoulder:

"A lifetime as a hero ends in tragedy. But a lifetime lived by your side... that is the true miracle I sought all along."

Together, hand in hand, you step into the dawn of a peaceful world.`
            },

            // Epilogue 2: Conquerors
            {
                id: 'fate_epilogue_conquerors',
                title: '★ EPILOGUE: THE SOVEREIGNS OF FUYUKI ★',
                act: 'Grand Finale - Champions of the Grail',
                atmosphere: 'Command Seals glowing bright scarlet, invincible aura of victory.',
                illustration: {
                    title: 'Sovereign Grail Champions',
                    badge: 'ABSOLUTE VICTORY',
                    badgeClass: 'threat-extreme',
                    icon: '🏆',
                    quote: '"None can stand against our combined will."',
                    tags: ['Grail Masters', 'Invincible Pair']
                },
                narrative: `With tactical perfection and unmatched synchronization, you and your Servant sweep through the remaining Masters of the Fuyuki Grail War.

The Greater Grail recognizes your supreme authority. You claim the omnipotent wish-granting relic, cementing your legacy as the greatest Master the Clock Tower has ever witnessed.

Your Servant stands proudly at your right hand, sword drawn in salute: "Our victory is absolute, Master. Wherever you lead, my blade shall conquer!"`
            },

            // Epilogue 3: Shinji's Ultimate Harem & Thrall Dominion
            {
                id: 'fate_epilogue_shinji_harem',
                title: '★ EPILOGUE: SHINJI MATOU\'S SUPREME HAREM ★',
                act: 'Grand Finale - Master of Servants & Thralls',
                atmosphere: 'Luxurious Matou manor chambers, scent of expensive wine and burning rosewood, Servants attending your every desire.',
                illustration: {
                    title: 'The Matou Lordship',
                    badge: 'HAREM DOMINION',
                    badgeClass: 'threat-sanctum',
                    icon: '👑',
                    image: 'assets/shinji_harem_palace.jpg',
                    quote: '"Hahaha! The entire Grail War bowed before me! Saber, Rider... pour your Master another goblet!"',
                    tags: ['Shinji Ascendant', 'Harem Master', 'Subjugated Servants', 'Total Victory']
                },
                narrative: `The Fifth Holy Grail War has concluded in a manner none could have foreseen: Shinji Matou stands atop the world as the undisputed Sovereign of Fuyuki!

Within the opulent, dimly lit master chambers of the renovated Matou estate, you recline upon a velvet divan, sipping vintage Bordeaux from a golden chalice.

At your feet kneels Rider Medusa, her petrifying eyes softened with total obedience as she gently rests her head against your knee, her slender fingers tracing the cuffs of your silk tunic: "The war is over, Master Shinji. Your authority is absolute... I exist only to please you."

Across the chamber, Artoria Pendragon—her armor replaced by a flowing indigo silk gown—steps forward, holding a silver tray laden with delicacies. Her proud cheeks flush with warm devotion as she offers you a toast:

"I once fought for chivalry and forgotten kings, Master Shinji. But under your commands, I have discovered a power far sweeter than the throne of Britain. As your sworn consort, my blade and my devotion are yours for all eternity."

With the Greater Grail under your control, rival magi cower at your name, while the most beautiful Heroic Spirits in history attend to your every command day and night. You throw your head back and laugh—you are no longer the forgotten heir, but the supreme Lord of the Holy Grail!`
            }
        ]
    }
};

window.FateCampaignData = FateCampaignData;
