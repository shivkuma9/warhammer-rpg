// campaign_onepiece.js - One Piece: Grand Line Pirates Campaign Module

const OnePieceCampaignData = {
    UNIVERSE: 'onepiece',
    NAME: 'One Piece: Grand Line - Dawn of the Pirate Sovereign',
    SUBTITLE: 'REVERSE MOUNTAIN TO NEW WORLD // 500,000,000 BOUNTY SAGA',

    // Pirate Captain Archetypes
    CAPTAINS: [
        {
            id: 'pirate_brawler',
            name: 'Rook "Thunder-Fist" D. Eric',
            order: 'Worst Generation Supernova',
            title: 'Captain of the Eclipse Pirates',
            quote: '"If you don\'t take big risks, you can\'t create a future! The Grand Line is mine to conquer!"',
            bounty: 120000000,
            stats: { might: 72, agility: 64, fortitude: 70, busoshoku: 65, kenbunshoku: 58, haoshoku: 75 },
            woundsMax: 30,
            hakiCurrent: 100,
            hakiMax: 100,
            inventory: [
                { id: 'op_w1', name: 'Black Steel Spiked Knuckles', type: 'melee', damage: '2d10+4', pen: 4, qualities: ['Haki Infused'], desc: 'Heavy alloy brawling knuckles forged to shatter ironclad ships.' },
                { id: 'op_w2', name: 'Flintlock Hand Cannon', type: 'ranged', damage: '1d10+6', pen: 3, qualities: ['High Explosive'], desc: 'Custom dual-barrel flintlock loaded with explosive cherry-bombs.' },
                { id: 'op_i1', name: 'Sea-King Meat Ration (x3)', type: 'consumable', count: 3, heals: 10, desc: 'Roast prehistoric sea beast flank that instantly re-ignites stamina and wounds!' }
            ],
            abilities: [
                { name: 'Conqueror\'s Dominance', desc: 'Can release a burst of Haoshoku Haki to instantly stun weak mobs or suppress enemy morale.' },
                { name: 'Gura-Gura Vibration Fist', desc: 'Shatters the air to send earthquake shockwaves through enemy defenses.' }
            ]
        }
    ],

    // Devoted Crew Companions / Romance Options
    CREW_OFFICERS: [
        {
            id: 'navigator_nami_style',
            name: 'First Mate & Navigator "Cat-Burglar" Lyra',
            role: 'Navigator / Sorceress',
            bounty: 66000000,
            stats: { might: 35, agility: 75, fortitude: 40, busoshoku: 30, kenbunshoku: 72, haoshoku: 20 },
            quote: '"Follow my wind, Captain, and we will sail straight to the edge of the world!"',
            desc: 'A gorgeous, quick-witted navigator with flowing tangerine hair, piercing amber eyes, and mastery over weather-manipulating climatacts. Playful, secretly protective, and intensely loyal to her Captain.'
        },
        {
            id: 'swordsman_reina',
            name: 'Swordswoman "Demon-Slayer" Reina',
            role: 'Combatant / Master of 2-Sword Style',
            bounty: 94000000,
            stats: { might: 68, agility: 70, fortitude: 65, busoshoku: 72, kenbunshoku: 60, haoshoku: 35 },
            quote: '"My swords answer only to you. Tell me what to cut, and it will fall."',
            desc: 'A tall, raven-haired swordmaster clad in a sarashi and open haori. Calm and lethal on the battlefield, but adorably flustered and tender when alone with you in the captain\'s cabin.'
        }
    ],

    // Campaign Narrative Chapters
    CAMPAIGN: {
        id: 'onepiece_grand_line',
        title: 'ONE PIECE: THE EMPEROR\'S CONQUEST',
        chapters: [
            // Act I - Setting Sail & Weathering the Storm
            {
                id: 'op_ch1_reverse_mountain',
                title: 'Act I: The Roar of the Grand Line',
                act: 'Act I - Reverse Mountain Descent',
                atmosphere: 'Torrential ocean spray, roaring ocean geysers, salty wind filling the sails, giant twin sea kings circling the hull.',
                illustration: {
                    title: 'The Great Sea Highway',
                    badge: 'GRAND LINE ENTRY',
                    badgeClass: 'threat-moderate',
                    icon: '🏴‍☠️',
                    image: 'assets/onepiece_ship.jpg',
                    quote: '"Ride the upward current! The world is waiting for our name!"',
                    tags: ['Reverse Mountain', 'Grand Line', 'Sea Kings', 'Supernova']
                },
                narrative: `Your pirate galleon, the Crimson Dawn, plunges down the colossal water chutes of Reverse Mountain into the turbulent swells of the Grand Line!

Salt spray drenches your jacket. The Jolly Roger snaps proudly in the gale. 

Beside you at the helm, Navigator Lyra wipes rain from her flushed face, her tight navigator vest soaked through with sea spray. She points toward the horizon with a thrilled grin:

"We made it, Captain! That\'s the Grand Line! Look ahead—an imperial Marine blockade is setting up an iron ambush right outside the channel mouth!"

Three heavy Marine battleships have dropped anchor, their iron cannons rotating straight toward your vessel. Marine Captain "Iron-Vice" Morgan stands on the flagship deck with an oversized megaphone:

"HALT IN THE NAME OF ABSOLUTE JUSTICE, PIRATE SCUM! SURRENDER YOUR SHIP OR BE SENT TO THE BOTTOM OF THE OCEAN!"`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Coat your fist in black Armament Haki and shatter their flagship cannon from afar (MIGHT)',
                        stat: 'might',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Unleash a destructive shockwave to blow open their front line.',
                        successNode: 'op_ch1_haki_shatter',
                        failNode: 'op_ch1_broadside_clash'
                    },
                    {
                        approach: 'finesse',
                        tag: '🗡️ FINESSE',
                        label: 'Order Lyra to catch the whirlpool wind-draft and drift around their blind spot (AGILITY)',
                        stat: 'agility',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Slalom past the cannon arcs using masterclass helmsmanship.',
                        successNode: 'op_ch1_drift_bypass',
                        failNode: 'op_ch1_broadside_clash'
                    },
                    {
                        approach: 'mystery',
                        tag: '✨ MYSTERY',
                        label: 'Unleash an explosion of Conqueror\'s Haki to knock out their gun crews (HAOSHOKU)',
                        stat: 'haoshoku',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Black lightning crackles across the ocean, knocking the Marines unconscious.',
                        successNode: 'op_ch1_conqueror_burst',
                        failNode: 'op_ch1_broadside_clash'
                    },
                    {
                        approach: 'mind',
                        tag: '🧠 MIND',
                        label: 'Calculate their powder magazine location and order a sniper cherry-bomb strike (KENBUNSHOKU)',
                        stat: 'kenbunshoku',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Detonate their ammunition to trigger a chain reaction.',
                        successNode: 'op_ch1_powder_explosion',
                        failNode: 'op_ch1_broadside_clash'
                    }
                ]
            },

            // Conqueror Haki Success
            {
                id: 'op_ch1_conqueror_burst',
                title: 'The King\'s Intimidation',
                act: 'Act I - Conqueror\'s Domain',
                atmosphere: 'Black red lightning arcing across the sky, foaming sea, hundreds of marines collapsing with white eyes.',
                illustration: {
                    title: 'Haoshoku Shockwave',
                    badge: 'SUPREME WILLPOWER',
                    badgeClass: 'threat-extreme',
                    icon: '⚡',
                    quote: '"You think mere cannons can stop someone who will conquer this sea?"',
                    tags: ['Conqueror\'s Haki', 'Black Lightning', 'Total Dominance']
                },
                narrative: `You step onto the bowsprit, glaring at the Marine fleet. 

A pulse of invisible spiritual pressure explodes outward! Thick black lightning fissures through the clouds. Over three hundred Marines roll their eyes back and collapse onto their decks in heaps of frothing unconsciousness. 

Captain Morgan drops to one knee, clutching his chest in sheer terror: "C-Conqueror\'s Haki...?! From a rookie captain?!"

Lyra laughs gleefully, throwing her arms around your neck from behind and hugging you tight: "That was incredible! Look at them drop!" (+15 Affection with Lyra!). Your bounty surges!`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Board the Marine flagship to duel Captain Morgan and loot their treasury',
                        actionType: 'advance',
                        nextNode: 'op_ch2_morgan_duel'
                    }
                ]
            },

            // Drift Bypass Success
            {
                id: 'op_ch1_drift_bypass',
                title: 'Riding the Cyclone Wave',
                act: 'Act I - Grand Line Seamanship',
                atmosphere: 'Roaring wake, ship airborne over a crest, sea foam splashing everywhere.',
                illustration: {
                    title: 'The Great Wave Slalom',
                    badge: 'PERFECT HELM',
                    badgeClass: 'threat-moderate',
                    icon: '🌊',
                    quote: '"Hold on tight, Captain! We\'re surfing right over their heads!"',
                    tags: ['Wave Rider', 'Outmaneuvered']
                },
                narrative: `Lyra spins the ship's wheel with breathtaking precision. The Crimson Dawn catches a sudden updraft wave, leaping cleanly over the Marine torpedo net and landing right behind the flagship!

Swordswoman Reina draws both katanas with a fierce, eager smirk: "Captain, we have their rear exposed. Give the word, and I'll slice their main mast in half!"`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Board the Marine flagship and engage Captain Morgan in close combat',
                        actionType: 'advance',
                        nextNode: 'op_ch2_morgan_duel'
                    }
                ]
            },

            // Haki Shatter Success
            {
                id: 'op_ch1_haki_shatter',
                title: 'The Iron-Cracking Blow',
                act: 'Act I - Raw Power',
                atmosphere: 'Sonic boom, metal warping, iron cannon flying into the sea in smoking pieces.',
                illustration: {
                    title: 'Armament Hardening Strike',
                    badge: 'DEVASTATING BLOW',
                    badgeClass: 'threat-extreme',
                    icon: '👊',
                    quote: '"Steel? In front of my Haki, steel is nothing but paper!"',
                    tags: ['Armament Haki', 'Cannon Destroyed']
                },
                narrative: `You leap from the rigging and slam your fist down across the Marine flagship's primary 200mm siege cannon. 

The reinforced steel implodes like tin foil, the concussive backlash blowing fifty Marines off the forecastle! 

Captain Morgan draws his massive steel broadsword, veins bulging on his forehead: "Damn you, pirate! I\'ll take your head personally!"`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Clash directly against Captain Morgan in a duel for the fleet\'s honor',
                        actionType: 'advance',
                        nextNode: 'op_ch2_morgan_duel'
                    }
                ]
            },

            // Powder Explosion
            {
                id: 'op_ch1_powder_explosion',
                title: 'The Blazing Chain Reaction',
                act: 'Act I - Tactical Marksmanship',
                atmosphere: 'Tower of crimson fire, secondary explosions, cheers of your pirate crew.',
                illustration: {
                    title: 'Magazine Detonation',
                    badge: 'STRATEGIC CRITICAL',
                    badgeClass: 'threat-moderate',
                    icon: '💥',
                    quote: '"Bullseye! That\'s how the Crimson Dawn says hello!"',
                    tags: ['Powder Flash', 'Fleet Shattered']
                },
                narrative: `Your shot strikes through the flagship\'s gun-port straight into their explosive store! A massive fireworks show of fire erupts, scattering the support vessels and leaving Captain Morgan stranded on the smoking flagship deck!`,
                options: [
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Board the smoking deck to finish off Captain Morgan',
                        actionType: 'advance',
                        nextNode: 'op_ch2_morgan_duel'
                    }
                ]
            },

            // Broadside Fallback
            {
                id: 'op_ch1_broadside_clash',
                title: 'Under Iron Fire',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Cannonballs whistling, wood splinters flying, battle sirens blaring.',
                illustration: {
                    title: 'High Seas Cannonade',
                    badge: 'HOSTILE BATTLE',
                    badgeClass: 'threat-extreme',
                    icon: '⚔️',
                    quote: '"Take battle stations! We fight our way through!"',
                    tags: ['High Danger', 'Direct Engagement']
                },
                narrative: `Cannon fire tears through the water around you! The Crimson Dawn pulls alongside the Marine flagship as boarding grapples bite into the wood. Captain Morgan leads the boarding party with blood in his eyes!`,
                combat: {
                    enemyName: 'Marine Captain "Iron-Vice" Morgan',
                    enemyHp: 38,
                    enemyMaxHp: 38,
                    t: 44,
                    armorVal: 6,
                    attackRoll: 48,
                    weapon: { name: 'Great Steel Executioner Sword', damage: '2d10+4', pen: 4 },
                    quote: '"Absolute Justice will never bow to pirates!"',
                    onDefeatNode: 'op_ch3_captain_quarters'
                }
            },

            // Act II: Boss Duel with Morgan
            {
                id: 'op_ch2_morgan_duel',
                title: 'Act II: Duel of the Sea Sovereigns',
                act: 'Act II - Flagship Showdown',
                atmosphere: 'Burning sails overhead, clash of steel ringing across the waves, Marines cheering and gasping in awe.',
                illustration: {
                    title: 'Captain vs Captain Showdown',
                    badge: 'BOSS CLASH',
                    badgeClass: 'threat-extreme',
                    icon: '⚔️',
                    quote: '"Let\'s see if your bounty matches your mouth, rookie!"',
                    tags: ['Boss Duel', 'Haki Clash', 'Marine Flagship']
                },
                narrative: `You stand on the blood-slick quarterdeck facing Marine Captain Morgan. His heavy iron broadsword glints under the moonlight.

"I have executed dozens of pirates like you," Morgan barks. "You won\'t survive five minutes in this ocean!"

Beside you, Swordswoman Reina and Navigator Lyra stand ready to assist at your command!`,
                combat: {
                    enemyName: 'Marine Captain "Iron-Vice" Morgan',
                    enemyHp: 38,
                    enemyMaxHp: 38,
                    t: 44,
                    armorVal: 6,
                    attackRoll: 50,
                    weapon: { name: 'Great Steel Executioner Sword', damage: '2d10+4', pen: 4 },
                    quote: '"I will carve your skull for the Fleet Admiral!"',
                    onDefeatNode: 'op_ch3_captain_quarters'
                }
            },

            // Act III: Victory Celebration & Romance in Captain's Cabin
            {
                id: 'op_ch3_captain_quarters',
                title: 'Act III: The Pirate King\'s Feast & Intimate Cabin',
                act: 'Act III - Victory Celebration & Deep Devotion',
                atmosphere: 'Mellow gold lantern light, aroma of roasted meat, barrels of rum opened, sound of guitar and gentle waves rocking the ship.',
                illustration: {
                    title: 'The Captain\'s Private Quarters',
                    badge: 'CREW DEVOTION',
                    badgeClass: 'threat-sanctum',
                    icon: '💖',
                    quote: '"To the Captain! May his dream conquer every sea in the world!"',
                    tags: ['Bounty Raised', 'Private Quarters', 'Crew Romance', 'New World Ahead']
                },
                narrative: `Captain Morgan is thrown into the brig, his battleships stripped of gold and supply stores! 

News of your astounding victory travels instantaneously by News Coo seagull across the four blues and the Grand Line:
★ YOUR BOUNTY HAS SOARED TO 250,000,000 BERRIES! ★

The crew feigns drunken exhaustion and retreats to the lower decks, intentionally leaving the spacious, cedar-scented Captain\'s Quarters private for you and your two closest officers.

Lyra lounges on your velvet divan, sipping sweet rum wine, her orange hair tumbling over her bare shoulders as her eyes gaze up at you with undisguised adoration. Beside the desk, Reina has unbuckled her dual katanas and loosened her sarashi, her cheeks flushed with both wine and sweet embarrassment:

"Captain..." Reina whispers softly, walking up to you and placing her calloused, warm hand over your chest. "Watching you conquer that Marine fleet... my heart couldn\'t stop pounding. I swore my swords to you, but tonight... I want to give you my heart as well."

Lyra giggles playfully, rising from the divan and stepping behind you, wrapping her slender arms around your neck and pressing her soft cheek against yours:

"Don\'t leave me out, Captain. Every island we visit, every storm we survive... I fall deeper in love with you. Tonight, the sea belongs to us."`,
                options: [
                    {
                        approach: 'mystery',
                        tag: '✨ MYSTERY',
                        label: 'Pull both Lyra and Reina into your arms and celebrate your bond through the starlit night',
                        actionType: 'advance',
                        nextNode: 'op_epilogue_pirate_harem'
                    },
                    {
                        approach: 'force',
                        tag: '⚔️ FORCE',
                        label: 'Raise a glass to the horizon and vow to conquer the Yonko together',
                        actionType: 'advance',
                        nextNode: 'op_epilogue_yonko_conquest'
                    }
                ]
            },

            // Epilogue 1: Intimate / Harem Romance
            {
                id: 'op_epilogue_pirate_harem',
                title: '★ EPILOGUE: THE SOVEREIGN & HIS PIRATE QUEENS ★',
                act: 'Grand Finale - The Sea of Romance',
                atmosphere: 'Soft morning sea breeze, laughter on the balcony, warm sheets, eternal freedom.',
                illustration: {
                    title: 'Dawn of the Pirate Sovereign',
                    badge: 'LEGENDARY CONQUEST',
                    badgeClass: 'threat-sanctum',
                    icon: '👑',
                    quote: '"With you as our Captain, we will never surrender to any power in the world."',
                    tags: ['Pirate Sovereign', '500M Bounty', 'Grand Line Conquerors']
                },
                narrative: `The sun rises in gold and purple hues over the endless ocean of the Grand Line.

You stand at the balcony of your cabin, feeling the gentle sea breeze on your skin. Lyra rests affectionately against your shoulder, while Reina stands at your side, holding your hand with serene, devoted joy.

The Crimson Dawn sails toward the horizon where the legendary islands of the New World await. 

With the fiercest officers by your side and their hearts beating in unison with yours, the entire ocean is yours to conquer. You are the Sovereign of the Grand Line, and your legend will echo across eternity!`
            },

            // Epilogue 2: Yonko Conquest
            {
                id: 'op_epilogue_yonko_conquest',
                title: '★ EPILOGUE: THE EMPERORS OF THE SEAS ★',
                act: 'Grand Finale - Ascending to Emperor',
                atmosphere: 'Fleet of 50 pirate ships sailing under your banner, sky splitting in half from your Haki.',
                illustration: {
                    title: 'The Fifth Emperor Emerges',
                    badge: 'YONKO STATUS',
                    badgeClass: 'threat-extreme',
                    icon: '🏆',
                    quote: '"The era belongs to the Crimson Dawn!"',
                    tags: ['Yonko Sovereign', 'New World Ruler']
                },
                narrative: `Your name strikes terror into the Marines and awe across the underworld. 

From Fishman Island to Wano, island after island hoists the flag of the Crimson Dawn. You forge the greatest armada the seas have ever known, establishing yourself as the fifth supreme Emperor of the Sea.

At the helm of your armada, you gaze toward the final island at the end of the world: Laugh Tale. The throne of the Pirate King awaits!`
            }
        ]
    }
};

window.OnePieceCampaignData = OnePieceCampaignData;
