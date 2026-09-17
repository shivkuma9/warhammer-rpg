// campaign_warhammer.js - Campaign Content, Archetypes, and Encounter Data

const WarhammerCampaignData = {
    // Character Archetypes
    ARCHETYPES: [
        {
            id: 'interrogator',
            name: 'Inquisitorial Interrogator',
            order: 'Ordo Hereticus',
            title: 'Purifier of the Unclean',
            quote: '"Innocence proves nothing. Only through fire is truth forged."',
            stats: {
                ws: 42, bs: 45, s: 36, t: 38, ag: 38, int: 44, per: 42, wp: 48, fel: 45
            },
            woundsMax: 14,
            fatePoints: 3,
            insanity: 0,
            corruption: 0,
            armor: { head: 3, body: 4, arms: 3, legs: 3 },
            inventory: [
                { id: 'w1', name: 'Bolt Pistol', type: 'ranged', damage: '1d10+5', pen: 4, ammo: 8, maxAmmo: 8, qualities: ['Tearing'], desc: 'Standard .75 caliber explosive mass-reactive sidearm.' },
                { id: 'w2', name: 'Chainsword', type: 'melee', damage: '1d10+4', pen: 2, qualities: ['Tearing'], desc: 'Serrated monomolecular motorized blade designed to rip through flesh.' },
                { id: 'i1', name: 'Inquisitorial Rosette', type: 'relic', desc: 'Symbol of ultimate Imperial authority. Confers +10 on Fellowship checks with Imperial servants.' },
                { id: 'i2', name: 'Medicae Stimms (x2)', type: 'consumable', count: 2, heals: 6, desc: 'Combat adrenaline and synthetic coagulant syringe.' }
            ],
            abilities: [
                { name: 'Righteous Interrogation', desc: '+10 to WP tests to break enemy morale or extract confessions.' },
                { name: 'Hatred of Heretics', desc: '+5 to WS when fighting human cultists and apostates.' }
            ]
        },
        {
            id: 'skitarii',
            name: 'Skitarii Ranger / Tech-Adept',
            order: 'Adeptus Mechanicus',
            title: 'Instrument of the Omnissiah',
            quote: '"There is no truth in flesh, only betrayal. The Machine God preserves."',
            stats: {
                ws: 35, bs: 50, s: 38, t: 44, ag: 35, int: 50, per: 46, wp: 40, fel: 24
            },
            woundsMax: 16,
            fatePoints: 2,
            insanity: 0,
            corruption: 0,
            armor: { head: 4, body: 5, arms: 4, legs: 4 },
            inventory: [
                { id: 'w3', name: 'Galvanic Rifle', type: 'ranged', damage: '1d10+4', pen: 3, ammo: 10, maxAmmo: 10, qualities: ['Precise'], desc: 'Electrostatically discharged armor-piercing projectile rifle.' },
                { id: 'w4', name: 'Omnissian Axe', type: 'melee', damage: '1d10+5', pen: 3, qualities: ['Power Field'], desc: 'Cresting power axe bearing the sacred cogwheel sigil.' },
                { id: 'i3', name: 'Auspex Scanner', type: 'tool', desc: 'Provides advanced warnings of bio-signatures and radiation through walls (+10 to Perception).' },
                { id: 'i4', name: 'Machine Sacramental Oil', type: 'consumable', count: 2, heals: 5, desc: 'Soothes bionics and seals cybernetic fluid leaks.' }
            ],
            abilities: [
                { name: 'Targeting Canticles', desc: 'Can spend an action to calculate ballistic trajectories, adding +15 to next shot.' },
                { name: 'Flesh is Weak', desc: 'Cybernetic augmentations give +1 Armor to all locations (already reflected).' }
            ]
        },
        {
            id: 'psyker',
            name: 'Sanctioned Psyker',
            order: 'Astra Telepathica',
            title: 'Conduit of the Empyrean',
            quote: '"I feel their thoughts burning through the veil... The Emperor protects my mind, but only barely."',
            stats: {
                ws: 32, bs: 34, s: 30, t: 34, ag: 36, int: 46, per: 48, wp: 54, fel: 30
            },
            woundsMax: 12,
            fatePoints: 3,
            insanity: 3,
            corruption: 2,
            armor: { head: 1, body: 3, arms: 2, legs: 2 },
            inventory: [
                { id: 'w5', name: 'Warp Force Staff', type: 'melee', damage: '1d10+3', pen: 3, qualities: ['Psychic Focus'], desc: 'Attuned conduit for channeling raw willpower into concussive psychic blasts.' },
                { id: 'w6', name: 'Laspistol (Mars Pattern)', type: 'ranged', damage: '1d10+2', pen: 0, ammo: 15, maxAmmo: 15, desc: 'Reliable thermal energy sidearm with high charge capacity.' },
                { id: 'i5', name: 'Sanctioning Purity Wards', type: 'relic', desc: 'Silver woven talismans that allow 1 free reroll if a Warp Peril is rolled.' },
                { id: 'i6', name: 'Spook Neuro-Ampoule (x1)', type: 'consumable', count: 1, heals: 0, desc: 'Boosts Willpower by +20 for one turn at the cost of 2 Insanity.' }
            ],
            abilities: [
                { name: 'Psychic Smite', desc: 'Unleash lightning from the warp. 2d10 damage, ignores armor, but doubles trigger Perils of the Warp!' },
                { name: 'Divination / Warp Sight', desc: 'Peer seconds into the future to predict enemy ambush trajectories.' }
            ]
        },
        {
            id: 'sister',
            name: 'Sister of Battle Novice',
            order: 'Adepta Sororitas',
            title: 'Daughter of the God-Emperor',
            quote: '"By faith alone our armor is hardened! Cleanse the heretic, burn the mutant!"',
            stats: {
                ws: 48, bs: 42, s: 40, t: 42, ag: 36, int: 35, per: 38, wp: 50, fel: 38
            },
            woundsMax: 15,
            fatePoints: 3,
            insanity: 0,
            corruption: 0,
            armor: { head: 4, body: 6, arms: 4, legs: 4 },
            inventory: [
                { id: 'w7', name: 'Godwyn-De’az Bolter', type: 'ranged', damage: '1d10+5', pen: 4, ammo: 12, maxAmmo: 12, qualities: ['Tearing'], desc: 'Sacred heavy assault rifle delivering explosive bolts.' },
                { id: 'w8', name: 'Sanctified Power Blade', type: 'melee', damage: '1d10+4', pen: 4, qualities: ['Holy'], desc: 'Blessed steel humming with molecular disruption.' },
                { id: 'i7', name: 'Icon of Saint Celestine', type: 'relic', desc: 'Radiates divine fervor. Grants immune to supernatural fear checks.' },
                { id: 'i8', name: 'Medicae Ointment (x2)', type: 'consumable', count: 2, heals: 7, desc: 'Holy herbal salve that closes bleeding lacerations.' }
            ],
            abilities: [
                { name: 'Acts of Faith', desc: 'Once per encounter, channel divine zeal to automatically treat a roll as 01 (Holy Critical)!' },
                { name: 'Armor of Contempt', desc: 'Ignore 1 point of Corruption gained from unholy encounters.' }
            ]
        }
    ],

    // Story Scenarios for "The Heresy of Sector 44"
    CAMPAIGN: {
        title: "The Heresy of Sector 44: Descent into the Under-Spire",
        description: "Inquisitorial reports flagged complete radio silence from Spire-Complex 44, a vital manufactorum world. Upon arriving via gunship through toxic chemical smog, you find the colossal gates cracked open and defiled with eight-pointed blasphemous sigils.",
        chapters: [
            {
                id: 'ch1_entrance',
                title: 'Chapter I: The Silent Gatehouse',
                act: 'Act I - The Infiltration',
                atmosphere: 'Gothic gloom, flickering lum-globes, smell of ozone and copper blood.',
                narrative: `The heavy adamantine blast-doors of Spire-Complex 44 hang twisted off their hydraulic tracks, as if pulled inward by inhuman force. 
                
Frost clings to the brass skulls mounted on the cathedral pillars. In the center of the intake lobby, four Imperial Labor Servitors lie decapitated, their mechanical limbs still twitching sporadically in pools of black motor oil and crimson ichor. 

Above, the vox-announcers hiss with faint, discordant chattering—voices speaking in forbidden dialects of the Empyrean. An auspex reading indicates faint warmth behind the collapsed security bunker to your right, and an open elevator shaft plunging into the Under-Spire to your left.`,
                options: [
                    {
                        label: 'Investigate the Security Bunker with Perception (Per)',
                        stat: 'per',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Search for logs or survivors before proceeding.',
                        successNode: 'ch1_bunker_success',
                        failNode: 'ch1_bunker_fail'
                    },
                    {
                        label: 'Rappelling down the elevator shaft with Agility (Ag)',
                        stat: 'ag',
                        modifier: -10,
                        actionType: 'check',
                        desc: 'Move directly into the under-spire avoiding standard corridors.',
                        successNode: 'ch1_shaft_success',
                        failNode: 'ch1_shaft_fail'
                    },
                    {
                        label: 'Commune with the Servitor Cogitator using Tech/Intelligence (Int)',
                        stat: 'int',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Interface with the terminal to extract the surveillance pict-logs.',
                        successNode: 'ch1_cogitator_success',
                        failNode: 'ch1_cogitator_fail'
                    },
                    {
                        label: 'Advance with weapon drawn, chanting Imperial litanies (WP Check)',
                        stat: 'wp',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Defy the warp whispers and stride directly forward into the grand hall.',
                        successNode: 'ch1_advance_success',
                        failNode: 'ch1_advance_fail'
                    }
                ]
            },

            // Nodes for Chapter 1
            {
                id: 'ch1_bunker_success',
                title: 'Ambush Discovered!',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Flashing red emergency klaxons, smell of burning cordite.',
                narrative: `Your sharp eyes catch the faint glint of rusted bayonets behind the sandbag barricade! Three corrupted Cultist Renegades were lying in wait to gut any arriving Inquisitorial retinue from behind.

Because you spotted them first, you seize the tactical initiative and gain a free surprise attack round before they can chamber their autoguns!`,
                combat: {
                    enemyName: 'Cultist Cell (3 Renegades)',
                    enemyHp: 18,
                    enemyMaxHp: 18,
                    t: 30,
                    armorVal: 2,
                    attackRoll: 40,
                    weapon: { name: 'Rust Autogun', damage: '1d10+3', pen: 1 },
                    quote: '"Blood for the Eightfold Path! Death to the Corpse Emperor!"',
                    onDefeatNode: 'ch2_flesh_chambers'
                }
            },
            {
                id: 'ch1_bunker_fail',
                title: 'Surprise Ambush!',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Gunfire flashes, shattered ferrocrete flying everywhere.',
                narrative: `You step forward too carelessly! Suddenly, automatic fire tears through the smoke as corrupted cultists open fire from hidden slit-ports in the bunker!
                
A spray of solid lead ricochets off your armor as you dive behind a fallen bronze cherub pillar.`,
                combat: {
                    enemyName: 'Cultist Cell (3 Renegades)',
                    enemyHp: 18,
                    enemyMaxHp: 18,
                    t: 30,
                    armorVal: 2,
                    attackRoll: 48,
                    weapon: { name: 'Rust Autogun', damage: '1d10+3', pen: 1 },
                    quote: '"Kill the Inquisitor! Carve the runes into their marrow!"',
                    onDefeatNode: 'ch2_flesh_chambers'
                }
            },
            {
                id: 'ch1_cogitator_success',
                title: 'Machine Spirit Pacified',
                act: 'Act I - Tactical Discovery',
                atmosphere: 'Green phosphorescent glow, soothing binharic hum.',
                narrative: `You whisper the sacred catechism of the Omnissiah and plug your interface probe into the smoking servitor port. The machine spirit groans, displaying flickering emerald pict-logs.
                
You witness what happened 6 hours ago: Spire Administrator Vane fell to his knees in the grand cathedral, his flesh bubbling with warp mutations as he opened the deep catacomb vaults to summon **Apostle Malacor**, a dark sorcerer of the Word Bearers.
                
You download a structural layout override key! (Grants +10 to all Agility and Perception checks in the next section, plus an extra Medicae Stimm from the security locker!)`,
                loot: {
                    item: { id: 'loot_stimm', name: 'Emergency Military Stimm', type: 'consumable', count: 1, heals: 8, desc: 'High-grade military coagulant.' }
                },
                options: [
                    {
                        label: 'Take the freight elevator straight to the Flesh Manufactorum',
                        actionType: 'advance',
                        nextNode: 'ch2_flesh_chambers'
                    }
                ]
            },
            {
                id: 'ch1_cogitator_fail',
                title: 'Machine Curse & Shock',
                act: 'Act I - Technical Peril',
                atmosphere: 'Sparks arching, high pitched scream from the data-terminal.',
                narrative: `As your fingers touch the keys, a vile scrapcode virus surges through the copper wires! Unholy daemonic geometry flickers across the screen. 
                
You jerk back as an electrical feedback blast scorches your hand, dealing 3 Shock Damage and ringing your ears. The noise draws the immediate attention of a corrupted Heavy Combat Servitor prowling nearby!`,
                combat: {
                    enemyName: 'Berserk Heretic Servitor',
                    enemyHp: 24,
                    enemyMaxHp: 24,
                    t: 40,
                    armorVal: 4,
                    attackRoll: 42,
                    weapon: { name: 'Heavy Industrial Riveter', damage: '1d10+5', pen: 3 },
                    quote: '"[ERROR: SOUL CORRUPTED // SLAUGHTER PROTOCOL ACTIVE]"',
                    onDefeatNode: 'ch2_flesh_chambers'
                }
            },
            {
                id: 'ch1_shaft_success',
                title: 'Silent Insertion',
                act: 'Act I - Stealth Descent',
                atmosphere: 'Dripping condensation, dark chasms, distant mechanical groaning.',
                narrative: `With flawless discipline, you secure your magnetic pitons and glide down the elevator shaft, bypassing all guard posts. You touch down soundlessly on the steel cat-walks of the lower industrial levels.`,
                options: [
                    {
                        label: 'Infiltrate the bio-chemical Flesh Manufactorum',
                        actionType: 'advance',
                        nextNode: 'ch2_flesh_chambers'
                    }
                ]
            },
            {
                id: 'ch1_shaft_fail',
                title: 'A Perilous Fall',
                act: 'Act I - Physical Strain',
                atmosphere: 'Screeching metal, frantic grabbing for cables.',
                narrative: `A rusted cable snaps with a violent snap! You drop twenty feet through the darkness before crashing onto a heavy iron ventilation grate.
                
Your armor absorbs the worst of the impact, but the violent collision knocks the breath from your lungs (Take 4 impact damage). The thunderous clang reverberates through the entire sector!`,
                options: [
                    {
                        label: 'Pick yourself up and kick open the door into the Flesh Manufactorum',
                        actionType: 'advance',
                        nextNode: 'ch2_flesh_chambers'
                    }
                ]
            },
            {
                id: 'ch1_advance_success',
                title: 'The Emperor’s Light Shines',
                act: 'Act I - Righteous Advance',
                atmosphere: 'Glow of faith, shadows retreating in terror.',
                narrative: `Your bellow of Imperial Scripture echoes like thunder through the desolate halls. The warp whispers shriek in agony and dissipate into thin air. Your soul feels galvanized (+1 Fate Point restored!).
                
Ahead, the massive iron archway leads into the foul bio-chemical manufacturing floor where the heretics have gathered.`,
                options: [
                    {
                        label: 'Storm the Flesh Manufactorum with righteous wrath',
                        actionType: 'advance',
                        nextNode: 'ch2_flesh_chambers'
                    }
                ]
            },
            {
                id: 'ch1_advance_fail',
                title: 'The Shadows Whisper Back',
                act: 'Act I - Psychological Dread',
                atmosphere: 'Cold dread creeping up your spine, phantom claw marks on your visor.',
                narrative: `As you recite the scriptures, mocking laughter cuts through your skull. Visions of burning worlds and your own desecrated corpse flash in your mind.
                
Your hands shake slightly (Gain 2 Insanity points). You grit your teeth and force your boots forward into the central processing sector.`,
                options: [
                    {
                        label: 'Steel your resolve and breach the Flesh Manufactorum',
                        actionType: 'advance',
                        nextNode: 'ch2_flesh_chambers'
                    }
                ]
            },

            // Chapter 2: The Flesh Manufactorum
            {
                id: 'ch2_flesh_chambers',
                title: 'Chapter II: The Flesh Manufactorum',
                act: 'Act II - The Abomination',
                atmosphere: 'Bubbling vats of bio-acid, stench of rotting flesh, glowing occult pentagrams.',
                narrative: `You enter an immense cathedral-scale manufacturing chamber. But instead of standard cog-wheels and tank chassis, the conveyor lines are hung with mutilated human forms hooked to pulsating, biomechanical growth pods.
                
At the center platform stands **Chirurgeon Varn**, a fallen Tech-Priest whose red robes are stained black with ichor. He has replaced his lower body with spider-like mechanical scythe legs. In front of him floats a captive Imperial Astropath strapped to a brass sacrifice table, screaming as warp-sigils are etched into her forehead.
                
Varn turns his six glowing ocular lenses toward you: *"Ah... another piece of fresh clay for the Great Architect. Your organs will fuel our ascension!"*`,
                options: [
                    {
                        label: 'Fire a precise shot at the Astropath’s restraints with Ballistic Skill (BS)',
                        stat: 'bs',
                        modifier: -10,
                        actionType: 'check',
                        desc: 'Sever the sacrifice bonds before the warp rift widens.',
                        successNode: 'ch2_shot_success',
                        failNode: 'ch2_shot_fail'
                    },
                    {
                        label: 'Charge the Chirurgeon in brutal close combat with Weapon Skill (WS)',
                        stat: 'ws',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Close the distance and cleave through his mechanical appendages.',
                        successNode: 'ch2_melee_success',
                        failNode: 'ch2_melee_fail'
                    },
                    {
                        label: 'Overload the chemical promethium pipelines with Tech-Use (Int)',
                        stat: 'int',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Trigger a cascading firestorm to engulf the heretic platform.',
                        successNode: 'ch2_pipeline_success',
                        failNode: 'ch2_pipeline_fail'
                    },
                    {
                        label: 'Invoke an Inquisitorial Litany of Exorcism (WP Check)',
                        stat: 'wp',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Use holy faith to disrupt the foul sorcerous wards protecting the magos.',
                        successNode: 'ch2_exorcism_success',
                        failNode: 'ch2_exorcism_fail'
                    }
                ]
            },

            {
                id: 'ch2_shot_success',
                title: 'Deadeye Shot!',
                act: 'Act II - Climactic Duel',
                atmosphere: 'Ricochet sparks, severed chains, dying scream.',
                narrative: `Your shot flies true! The explosive round strikes the brass restraint clasp dead center, shattering it into fragments. The Astropath falls free from the sacrificial circuit, collapsing the demonic energy beam!
                
Chirurgeon Varn shrieks in mechanical fury, sparks erupting from his ocular mounts: *"Interfering vermin! I will harvest your spine!"*`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn',
                    enemyHp: 32,
                    enemyMaxHp: 32,
                    t: 42,
                    armorVal: 5,
                    attackRoll: 48,
                    weapon: { name: 'Monomolecular Mechatentacles', damage: '1d10+6', pen: 4, qualities: ['Tearing'] },
                    quote: '"Flesh is weak, but Chaos is eternal!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_shot_fail',
                title: 'Deflected by Warp Shields!',
                act: 'Act II - Climactic Duel',
                atmosphere: 'Shimmering purple hex-barrier, ozone crackle.',
                narrative: `Your round strikes a shimmering purple force field and ricochets into the ceiling. Chirurgeon Varn laughs, a grating sound like grinding gears, and unleashes his razor mechatentacles directly at you!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn',
                    enemyHp: 32,
                    enemyMaxHp: 32,
                    t: 42,
                    armorVal: 5,
                    attackRoll: 52,
                    weapon: { name: 'Monomolecular Mechatentacles', damage: '1d10+6', pen: 4, qualities: ['Tearing'] },
                    quote: '"Did you think mere lead could pierce the blessings of the Dark Gods?"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_melee_success',
                title: 'Serrated Carnage',
                act: 'Act II - Climactic Duel',
                atmosphere: 'Roar of motors, severed hydraulic cables spraying oil.',
                narrative: `You charge across the gantry like an avatar of the Emperor’s fury! Before Varn can calibrate his defense protocols, your strike shears cleanly through two of his scythe legs, sending him crashing onto his side!
                
He scrambles upright in a frenzy of wild counter-strikes!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn (Damaged)',
                    enemyHp: 22,
                    enemyMaxHp: 32,
                    t: 38,
                    armorVal: 4,
                    attackRoll: 45,
                    weapon: { name: 'Serrated Scythe Limb', damage: '1d10+5', pen: 3 },
                    quote: '"My holy augmetics! You will pay in agony!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_melee_fail',
                title: 'Counter-Lash!',
                act: 'Act II - Climactic Duel',
                atmosphere: 'Scything metal, sparks striking armor.',
                narrative: `You charge forward, but his mechatentacles lash out with blinding robotic speed, catching your weapon arm and slamming you against a steel support pillar!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn',
                    enemyHp: 32,
                    enemyMaxHp: 32,
                    t: 42,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Monomolecular Mechatentacles', damage: '1d10+6', pen: 4 },
                    quote: '"Predictable meat! Step into the dissecting chair!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_pipeline_success',
                title: 'The Cleansing Flame',
                act: 'Act II - Tactical Mastery',
                atmosphere: 'Pillar of roaring fire, screams of burning heretics.',
                narrative: `You wrench open the emergency purge valves and override the safety locks! Superheated promethium sprays across the central dais and ignites into a roaring inferno.
                
Chirurgeon Varn’s biological grafts catch fire, screaming binary curses as his secondary systems explode in plumes of flame! The Astropath crawls to safety under the smoke cover.`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn (Engulfed)',
                    enemyHp: 18,
                    enemyMaxHp: 32,
                    t: 35,
                    armorVal: 3,
                    attackRoll: 42,
                    weapon: { name: 'Flailing Scorched Scythes', damage: '1d10+4', pen: 2 },
                    quote: '"[ALARM: CHASSIS TEMPERATURE CRITICAL // BURN IN OUR WRATH]"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_pipeline_fail',
                title: 'Backfire Shockwave',
                act: 'Act II - Tactical Mishap',
                atmosphere: 'Backdraft explosion, concussive ringing in ears.',
                narrative: `The rusted valve gives way prematurely! A backdraft fireball knocks you across the catwalk, singeing your hair and equipment (Take 5 burn damage). Varn wheels around and prepares to execute you!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn',
                    enemyHp: 32,
                    enemyMaxHp: 32,
                    t: 42,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Monomolecular Mechatentacles', damage: '1d10+6', pen: 4 },
                    quote: '"Incompetent worm! The fires of your own foolishness shall consume you!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_exorcism_success',
                title: 'Sanctified Retribution',
                act: 'Act II - Divine Feat',
                atmosphere: 'Golden light crackling across the iron floor, runes bursting.',
                narrative: `You hold high your Imperial seal and chant the Litany of Unmaking. Golden energy surges from your sheer conviction, shattering the dark sorcerous glyphs floating around Varn! 
                
The backlash of his own thwarted sorcery burns out his primary power core, leaving him reeling and smoking!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn (Stunned)',
                    enemyHp: 20,
                    enemyMaxHp: 32,
                    t: 35,
                    armorVal: 3,
                    attackRoll: 38,
                    weapon: { name: 'Cracked Power Scythe', damage: '1d10+4', pen: 2 },
                    quote: '"The Emperor is a corpse! Why does your light still burn?!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },
            {
                id: 'ch2_exorcism_fail',
                title: 'The Gaze of the Abyss',
                act: 'Act II - Spiritual Toll',
                atmosphere: 'Bleeding eyes, unholy laughter echoing in the mind.',
                narrative: `You invoke the Emperor, but the sheer density of corruption in this chamber is overwhelming. The warp pushes back into your skull like hot needles (Take 2 Corruption and 2 Insanity). Varn lunges to strike!`,
                combat: {
                    enemyName: 'Heretek Chirurgeon Varn',
                    enemyHp: 32,
                    enemyMaxHp: 32,
                    t: 42,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Monomolecular Mechatentacles', damage: '1d10+6', pen: 4 },
                    quote: '"Your faith is a fragile candle in the storm of chaos!"',
                    onDefeatNode: 'ch3_warp_altar'
                }
            },

            // Chapter 3: The Sanctum of the Warp Tear
            {
                id: 'ch3_warp_altar',
                title: 'Chapter III: The Altar of the Empyrean Tear',
                act: 'Act III - The Final Rite',
                atmosphere: 'Gravity inversions, torn sky, unholy void rift hovering over molten brass.',
                narrative: `With the Heretek destroyed, you kick open the great gilded doors to the Spire Governor's personal sanctum. 
                
The ceiling has completely vanished, replaced by an open, swirling vortex directly into the Warp—a kaleidoscope of burning purples, blood reds, and screaming souls. 
                
Standing at the apex of a stepped black-stone pyramid is **Apostle Malacor**, clad in ancient spiked Terminator plate, holding a weeping Daemonblade. In his other hand is an ignition trigger wired to the geothermal reactor beneath the entire hive city.
                
*"You are too late, dog of the Throne,"* Malacor sneers, his voice vibrating with hundreds of overlapping daemonic tones. *"Either this entire world is consumed as a living sacrifice to birth a Daemon Prince... or you kneel and accept the true Primordial Truth!"*`,
                options: [
                    {
                        label: 'Unleash everything: A desperate headshot at Malacor (BS -15)',
                        stat: 'bs',
                        modifier: -15,
                        actionType: 'check',
                        desc: 'Aim directly for his unarmored mutated eye slit before he can depress the detonator.',
                        successNode: 'victory_deadeye',
                        failNode: 'final_boss_combat'
                    },
                    {
                        label: 'Challenge the Chaos Champion to sacred single combat (WS Check)',
                        stat: 'ws',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Appeal to his martial pride to draw him away from the reactor console.',
                        successNode: 'final_boss_duel',
                        failNode: 'final_boss_combat'
                    },
                    {
                        label: 'Burn a Fate Point to invoke the Emperor’s Direct Wrath (Miracle)',
                        actionType: 'fate_miracle',
                        desc: 'Expend your divine destiny to manifest a pillar of holy fire to purge the rift.',
                        nextNode: 'victory_miracle'
                    },
                    {
                        label: 'Sprint to sever the geothermal detonator cable with Agility (Ag)',
                        stat: 'ag',
                        modifier: -5,
                        actionType: 'check',
                        desc: 'Dive across the molten brass floor to save the hive world from annihilation.',
                        successNode: 'victory_disarm',
                        failNode: 'final_boss_combat'
                    }
                ]
            },

            {
                id: 'final_boss_duel',
                title: 'Duel on the Precipice of the Warp',
                act: 'Act III - Final Boss',
                atmosphere: 'Lightning crackling between blades, thunderous impacts.',
                narrative: `Malacor barks a guttural laugh: *"A duel it is! Let the Blood God watch us!"* He leaps down from the altar, his daemonblade screaming in bloodthirsty hunger!`,
                combat: {
                    enemyName: 'Apostle Malacor (Chaos Champion)',
                    enemyHp: 45,
                    enemyMaxHp: 45,
                    t: 50,
                    armorVal: 6,
                    attackRoll: 55,
                    weapon: { name: 'Weeping Daemonblade', damage: '2d10+4', pen: 5, qualities: ['Tearing', 'Corrupting'] },
                    quote: '"DIE IN THE SIGHT OF THE GODS!"',
                    onDefeatNode: 'victory_combat'
                }
            },

            {
                id: 'final_boss_combat',
                title: 'The Battle for Sector 44',
                act: 'Act III - Final Boss',
                atmosphere: 'Total war in the eye of the vortex, molten metal raining down.',
                narrative: `The detonator sparks, but jams momentarily! Malacor roars in fury, spinning around with his daemonblade while warp-lightning crackles from his horned helm! Kill him before he reactivates the detonator!`,
                combat: {
                    enemyName: 'Apostle Malacor (Chaos Champion)',
                    enemyHp: 50,
                    enemyMaxHp: 50,
                    t: 50,
                    armorVal: 6,
                    attackRoll: 52,
                    weapon: { name: 'Weeping Daemonblade', damage: '2d10+4', pen: 5, qualities: ['Tearing', 'Corrupting'] },
                    quote: '"You cannot stop what has already begun!"',
                    onDefeatNode: 'victory_combat'
                }
            },

            {
                id: 'victory_deadeye',
                title: '★ TRIUMPH OF THE GOD-EMPEROR ★',
                act: 'Epilogue - Imperial Victory',
                atmosphere: 'Blinding muzzle flash, the sound of an explosive round ending heresy.',
                narrative: `Your finger squeezes the trigger with icy precision. The mass-reactive bolt penetrates Malacor's mutated eye-lens and detonates inside his skull in a cataclysmic geyser of black gore and bone shrapnel!
                
His lifeless body collapses backward, his dead fingers releasing the detonator harmlessly onto the brass flagstones. With the ritualist slain, the warp vortex screeches in thwarted fury and snaps shut, leaving the sanctum in profound, holy silence.
                
Sector 44 is saved. The Inquisition will purge the remaining taint, and your name shall be inscribed in the sacred records of the Holy Ordos as an indomitable Hero of the Imperium.`
            },

            {
                id: 'victory_combat',
                title: '★ HERESY PURGED IN BLOOD ★',
                act: 'Epilogue - Grim Victory',
                atmosphere: 'Smoke clears, standing victorious over the fallen champion.',
                narrative: `With one final, desperate, crushing strike, you cleave through Malacor’s neck armor. The foul daemonblade shatters into blackened glass, and the Chaos Champion crashes into the molten runnels of the floor.
                
You smash the geothermal detonator under your boot and seal the blast-doors. Wounded, bleeding, but triumphant, you transmit your victory cipher to the Inquisitorial Cruiser in orbit. 
                
*"Sector 44 secured. The Emperor Protects."*`
            },

            {
                id: 'victory_miracle',
                title: '★ DIVINE INTERVENTION ★',
                act: 'Epilogue - Saintly Ascension',
                atmosphere: 'Golden celestial fire cascading from the heavens.',
                narrative: `You burn a precious thread of your Fate, throwing your arms wide and crying out to the Golden Throne. 
                
Reality tears open—not with warp corruption, but with a searing, golden beam of pure solar wrath! The light vaporizes Malacor into fine ash in a microsecond, purges the warp rift into pristine starlight, and leaves your armor radiating with holy, untouchable heat.
                
The Inquisitorial archives will forever remember this day as the Miracle of Spire 44.`
            },

            {
                id: 'victory_disarm',
                title: '★ PLANETARY SALVATION ★',
                act: 'Epilogue - Tactical Victory',
                atmosphere: 'Sparks from cut wire, breathing heavily under the dead sky.',
                narrative: `You slide across the slick brass floor, slicing through the detonator conduit just as Malacor’s hammer blow crashes where you were standing half a second ago!
                
Deprived of his doomsday leverage and surprised by your audacity, Malacor falters. Imperial Navy drop-pods suddenly crash through the ceiling behind you, disgorging a squad of Tempestus Scions who obliterate the cult leader under a storm of hot-shot las fire!
                
You stand tall among the smoke, an Inquisitorial legend.`
            }
        ]
    },

    // PRIMARCH CUSTOM CLASSES
    PRIMARCH_CLASSES: [
        {
            id: 'solar_warmaster',
            name: 'Solar Warmaster',
            title: 'Sovereign of the Golden Dawn',
            role: 'Supreme Commander & Radiant Paragon',
            baseStats: { ws: 68, bs: 65, s: 62, t: 64, ag: 55, int: 60, per: 58, wp: 68, fel: 72 },
            woundsMax: 28,
            fatePoints: 4,
            armor: { head: 8, body: 10, arms: 8, legs: 8 },
            startingGear: [
                { id: 'pw1', name: 'Sol-Pattern Auric Blade', type: 'melee', damage: '2d10+8', pen: 8, qualities: ['Power Field', 'Mastercrafted'], desc: 'Relic broadsword forged from pure auramite humming with coronal heat.' },
                { id: 'pw2', name: 'Archeotech Plasma Annihilator', type: 'ranged', damage: '2d10+10', pen: 10, ammo: 10, maxAmmo: 10, qualities: ['Vaporizing'], desc: 'Pre-Heresy wrist-mounted plasma weapon that disintegrates tanks.' },
                { id: 'pi1', name: 'Mantle of the Sun Emperor', type: 'relic', desc: 'Demigod presence. Inspires absolute devotion in all Legion daughters.' },
                { id: 'pi2', name: 'Primarch Elixir of Vitality (x3)', type: 'consumable', count: 3, heals: 14, desc: 'Condensed cellular restoration fluid formulated for Primarch biology.' }
            ],
            desc: 'A born ruler whose sheer charisma and tactical genius commands the stars and captivates the hearts of her/his daughters.'
        },
        {
            id: 'void_valkyrie',
            name: 'Void Valkyrie / Juggernaut',
            title: 'Goddess of the Blood-Storm',
            role: 'Unstoppable Close-Combat Hurricane',
            baseStats: { ws: 75, bs: 52, s: 72, t: 70, ag: 62, int: 50, per: 55, wp: 65, fel: 58 },
            woundsMax: 32,
            fatePoints: 4,
            armor: { head: 9, body: 11, arms: 9, legs: 9 },
            startingGear: [
                { id: 'pw3', name: 'Reaper Power-Glaive of the Void', type: 'melee', damage: '2d10+12', pen: 9, qualities: ['Tearing', 'Cleaving'], desc: 'Massive two-handed glaive that cleaves through dreadnought plate.' },
                { id: 'pw4', name: 'Twin Master Bolters', type: 'ranged', damage: '2d10+6', pen: 6, ammo: 24, maxAmmo: 24, qualities: ['Storm'], desc: 'Heavy mass-reactive wrist bolters firing synchronized explosive shells.' },
                { id: 'pi3', name: 'War-Horn of the Valkyrie', type: 'relic', desc: 'Bellowing cry that paralyzes enemy infantry with primal dread.' },
                { id: 'pi4', name: 'Primarch Elixir of Vitality (x3)', type: 'consumable', count: 3, heals: 14, desc: 'Condensed cellular restoration fluid.' }
            ],
            desc: 'A ferocious, towering demigod of slaughter who fights on the frontline, tearing through enemy lines side-by-side with First Captain Valerie.'
        },
        {
            id: 'empyrean_sorcerer',
            name: 'Empyrean Sorcerer-Monarch',
            title: 'Weaver of the Star-Tides',
            role: 'Master of Reality-Bending Psychic Power',
            baseStats: { ws: 58, bs: 55, s: 55, t: 58, ag: 56, int: 72, per: 68, wp: 82, fel: 62 },
            woundsMax: 26,
            fatePoints: 5,
            armor: { head: 7, body: 9, arms: 7, legs: 7 },
            startingGear: [
                { id: 'pw5', name: 'Aether-Crest Force Glaive', type: 'melee', damage: '2d10+7', pen: 7, qualities: ['Psychic Focus', 'Force'], desc: 'Channels raw willpower into devastating psychic shockwaves.' },
                { id: 'pw6', name: 'Warp-Fire Conflagration', type: 'ranged', damage: '3d10+5', pen: 8, ammo: 99, maxAmmo: 99, qualities: ['Psychic Flame'], desc: 'Eldritch silver fire summoned directly from your mind.' },
                { id: 'pi5', name: 'Diadem of the Second Eclipse', type: 'relic', desc: 'Completely shields the Primarch and their daughters from Chaos corruption.' },
                { id: 'pi6', name: 'Primarch Elixir of Vitality (x3)', type: 'consumable', count: 3, heals: 14, desc: 'Condensed restoration fluid.' }
            ],
            desc: 'A master of the warp who commands reality itself. Shares a deep, intimate telepathic communion with Chief Librarian Morgana.'
        },
        {
            id: 'shadow_assassin',
            name: 'Shadow Infiltrator Primarch',
            title: 'Specter of the Outer Dark',
            role: 'Ghostly Executioner & Lethal Duelist',
            baseStats: { ws: 72, bs: 74, s: 58, t: 58, ag: 76, int: 62, per: 70, wp: 64, fel: 56 },
            woundsMax: 26,
            fatePoints: 4,
            armor: { head: 7, body: 9, arms: 7, legs: 7 },
            startingGear: [
                { id: 'pw7', name: 'Twin Monomolecular Ghost-Daggers', type: 'melee', damage: '2d10+9', pen: 10, qualities: ['Hyper-Lethal', 'Precise'], desc: 'Blades vibrating at atomic frequencies, slipping through any armor like smoke.' },
                { id: 'pw8', name: 'Exitus-Pattern Void Sniper', type: 'ranged', damage: '3d10+8', pen: 12, ammo: 6, maxAmmo: 6, qualities: ['Deadeye'], desc: 'Custom long-rifle capable of putting a round through a titan cockpit from miles away.' },
                { id: 'pi7', name: 'Chameleoline Shroud of the II Legion', type: 'relic', desc: 'Bends light and sensor waves, rendering the Primarch completely invisible at will.' },
                { id: 'pi8', name: 'Primarch Elixir of Vitality (x3)', type: 'consumable', count: 3, heals: 14, desc: 'Condensed restoration fluid.' }
            ],
            desc: 'An invisible shadow who eliminates enemy warlords before the battle even begins, striking with breathtaking elegance.'
        }
    ],

    // LIEUTENANTS OF THE ECLIPSE (ALL-FEMALE LEGION)
    LIEUTENANTS: [
        {
            id: 'valerie',
            name: 'First Captain Valerie',
            epithet: 'The Blood Valkyrie',
            appearance: 'Tall, sculpted superhuman physique, flowing auburn hair, fierce golden eyes, cheek adorned with a silver victory scar, form-fitting midnight auramite power armor.',
            personality: 'Fierce, possessive, passionately devoted. She was the first daughter born of your genetic code and views you as her God, her Father/Mother, and her beloved sovereign.',
            devotion: 80,
            weapon: 'Dual Mastercrafted Power-Glaives',
            quote: '"My blade, my blood, my heart, and my very soul belong only to you, my Primarch. Command me, and I shall burn worlds for your smile."'
        },
        {
            id: 'morgana',
            name: 'Chief Librarian Morgana',
            epithet: 'The Void Witch',
            appearance: 'Lithe and graceful, silver-white hair cascading past her shoulders, glowing amethyst eyes that perceive the warp, sheer psychic aura that makes the air shimmer.',
            personality: 'Mysterious, deeply intimate, soft-spoken yet terrifyingly powerful. Her mind is directly linked to your psyche; she feels your desires, thoughts, and emotions before you even speak.',
            devotion: 75,
            weapon: 'Force Staff of the Eclipse',
            quote: '"I hear the rhythm of your heartbeat in the Empyrean... When you sleep, my thoughts lie beside yours in the sea of stars."'
        },
        {
            id: 'selene',
            name: 'Chief Apothecary Selene',
            epithet: 'The Hand of Mercy & Blood',
            appearance: 'Immaculate white and gold armor, raven-black hair tied back, dark intense eyes, gentle yet unyielding hands trained in the sacred mysteries of Primarch biology.',
            personality: 'Caring, intensely attentive, proud. She oversees the genetic perfection of the Legion and obsessively tends to your physical well-being, armor fittings, and private bodily restoration.',
            devotion: 70,
            weapon: 'Narthecium Reductor & Power Scalpel',
            quote: '"Every vein, every muscle of your divine vessel is sacred to me. Rest your head, my Sovereign... let my hands ease the burdens of your immortality."'
        }
    ],

    // THE LOST PRIMARCH CAMPAIGN
    LOST_PRIMARCH_CAMPAIGN: {
        title: "The Lost II Legion: Daughters of the Eclipse",
        description: "You are the Forgotten Primarch of the Lost Second Legion. Erased from Imperial records by the Emperor before the Great Crusade, your stasis crypt has finally been breached by your surviving all-female superhuman daughters.",
        chapters: [
            {
                id: 'lp_ch1_awakening',
                title: 'Act I: Awakening of the Forgotten Demigod',
                act: 'Act I - The Unsealing',
                atmosphere: 'Hissing coolant steam, emerald stasis fluid draining, heavy armored footsteps, scent of sacred myrrh and blood.',
                narrative: `For ten thousand years, you slept in suspended animation within the Adamantine Vault of the Outer Veil. 

With a deafening hydraulic hiss, the heavy reinforced stasis seals disengage. Freezing amniotic gel drains away, and your eyes snap open. Godlike senses flood your mind—the sound of plasma engines, the hum of power fields, and the faint, sweet scent of burning incense.

Standing before the open sarcophagus are three towering, armored figures. Superhuman women in mastercrafted midnight-black and silver auramite plate, their cloaks dyed royal crimson. 

The tallest among them—First Captain Valerie, her sculpted features flushed with raw emotion, her fierce golden eyes glistening with tears—drops to both knees. She removes her war-helm, revealing her striking face and long auburn hair.

"My Primarch... My Sovereign..." Valerie’s voice trembles with overwhelming passion as she reaches out, gently placing her trembling armored gauntlet against your bare chest. "You are awake. After millennia in the dark... our God has returned to us."

Beside her, Chief Librarian Morgana bows her silver head, her amethyst eyes glowing as a soft wave of telepathic warmth embraces your mind: "We kept the faith, Beloved. The galaxy has fallen into ruin, but your daughters are ready to conquer it all in your name."

Suddenly, alarm sirens flare crimson across the stasis vault! An automated vox warning shrieks: A warband of Heretic Void-Marauders and mutant scavengers has tracked the power surge and breached the outer perimeter!`,
                options: [
                    {
                        label: 'Step from the pod and embrace Valerie, commanding the defense with Majesty (Fel)',
                        stat: 'fel',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Reaffirm your eternal bond with your daughters and ignite their battle zeal.',
                        successNode: 'lp_ch1_embrace_success',
                        failNode: 'lp_ch1_embrace_fail'
                    },
                    {
                        label: 'Summon your relic weapon with Godlike Willpower (WP)',
                        stat: 'wp',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Call your weapon into your hands through sheer psychokinetic Primarch authority.',
                        successNode: 'lp_ch1_weapon_success',
                        failNode: 'lp_ch1_weapon_fail'
                    },
                    {
                        label: 'Unleash a Primarch War-Cry to paralyze the intruders with Fear (WS)',
                        stat: 'ws',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Bellow with the fury of an awakening demigod, shattering enemy morale.',
                        successNode: 'lp_ch1_warcry_success',
                        failNode: 'lp_ch1_warcry_fail'
                    }
                ]
            },

            {
                id: 'lp_ch1_embrace_success',
                title: 'A Sovereign’s Touch & Righteous Fury',
                act: 'Act I - Tactical Reunion',
                atmosphere: 'Golden radiance, tears of devotion, weapons igniting with crackling power.',
                narrative: `You step down from the dais. Your bare feet touch the steel floor, and you cup Valerie’s cheek in your hand, pulling her upright. Valerie shivers at your touch, her breath catching as she leans into your warmth.

"Rise, my daughter," your voice echoes with irresistible power. "Your devotion has kept our flame alive. Now let us remind the stars what the Second Legion can do."

Valerie looks at you with adoration bordering on worship (+15 Devotion with Valerie!). She draws her twin power-glaives with a blinding snap: "FOR THE PRIMARCH! SLAUGHTER THEM ALL!"

A horde of mutated void scavengers bursts through the vault doors, armed with heavy autoguns and rusted chainaxes. With your Daughters fighting in seamless harmony beside you, the slaughter begins!`,
                combat: {
                    enemyName: 'Void Marauder Swarm (20 Mutants)',
                    enemyHp: 35,
                    enemyMaxHp: 35,
                    t: 36,
                    armorVal: 3,
                    attackRoll: 38,
                    weapon: { name: 'Scrap Autoguns & Cleavers', damage: '1d10+4', pen: 2 },
                    quote: '"Kill the sleeping god! Take the golden armor!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            {
                id: 'lp_ch1_embrace_fail',
                title: 'Rushed to Battle',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Gunfire ricocheting, Valerie diving to shield your unarmored body.',
                narrative: `Before you can speak, high-caliber solid rounds pepper the stasis pod! Valerie instantly lunges forward, throwing her armored back to shield you from the shrapnel. 
                
"None shall touch my Primarch!" she roars, deflecting bullets with her glaives as Chief Apothecary Selene rushes forward to seal your battle plate around your shoulders!`,
                combat: {
                    enemyName: 'Void Marauder Swarm (20 Mutants)',
                    enemyHp: 35,
                    enemyMaxHp: 35,
                    t: 36,
                    armorVal: 3,
                    attackRoll: 45,
                    weapon: { name: 'Scrap Autoguns & Cleavers', damage: '1d10+4', pen: 2 },
                    quote: '"Take their heads! Flesh for the harvest!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            {
                id: 'lp_ch1_weapon_success',
                title: 'The Relic Awakes',
                act: 'Act I - Display of Godhood',
                atmosphere: 'Thunderclap in the vacuum, golden lightning arcing across the vault.',
                narrative: `You raise your hand and flex your fingers. Across the chamber, the sealed reliquary chest explodes into golden splinters! 
                
Your legendary mastercrafted relic weapon arcs through the air, settling perfectly into your grip as if it were an extension of your soul. The power field shrieks to life, searing the air with ozone!
                
Morgana gasps in awe, her psychic senses overwhelmed by your aura: "The Emperor’s craft was great, but you... you are perfection." (+15 Devotion with Morgana!).
                
The scavengers spill into the chamber and freeze in absolute terror as you step forward to reap their lives!`,
                combat: {
                    enemyName: 'Terrified Marauder Swarm',
                    enemyHp: 28,
                    enemyMaxHp: 35,
                    t: 30,
                    armorVal: 2,
                    attackRoll: 35,
                    weapon: { name: 'Desperate Gunfire', damage: '1d10+3', pen: 1 },
                    quote: '"BY THE GODS, IT’S A LIVING TITAN! RUN—!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            {
                id: 'lp_ch1_weapon_fail',
                title: 'Stasis Slumber Lingers',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Cold cramps in the muscles, weapons clattering.',
                narrative: `Millennia of deep cryo-stasis sluggishly resist your will. You wrench your weapon from its rack by hand just as mutant scavengers breach the iron barricade!`,
                combat: {
                    enemyName: 'Void Marauder Swarm (20 Mutants)',
                    enemyHp: 35,
                    enemyMaxHp: 35,
                    t: 36,
                    armorVal: 3,
                    attackRoll: 42,
                    weapon: { name: 'Scrap Autoguns & Cleavers', damage: '1d10+4', pen: 2 },
                    quote: '"Rip the demigod from the throne!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            {
                id: 'lp_ch1_warcry_success',
                title: 'The Roar of the Primarch',
                act: 'Act I - Morale Annihilation',
                atmosphere: 'Shockwave shattering reinforced glass, enemies falling to their knees clutching bleeding ears.',
                narrative: `You inhale deeply and release a Primarch’s battle roar. The acoustic pressure wave blows the vault doors clean off their hinges! 
                
Half the mutant marauders collapse clutching their ruptured eardrums, vomiting blood in terror. Valerie laughs with savage joy, leaping into the panicked crowd like a whirlwind of silver death!`,
                combat: {
                    enemyName: 'Broken Marauder Swarm',
                    enemyHp: 20,
                    enemyMaxHp: 35,
                    t: 28,
                    armorVal: 1,
                    attackRoll: 30,
                    weapon: { name: 'Scrambling Blades', damage: '1d10+2', pen: 0 },
                    quote: '"MERCY! MERCY FROM THE SLEEPING GOD!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            {
                id: 'lp_ch1_warcry_fail',
                title: 'Savage Melee Enjoined',
                act: 'Act I - Combat Encounter',
                atmosphere: 'Roar echoing, mutants rushing forward blindly.',
                narrative: `The mutants are driven mad by stimms and warp-dust; your roar only sends them into a suicidal frenzy! They surge into the crypt with drawn axes!`,
                combat: {
                    enemyName: 'Frenzied Marauder Swarm',
                    enemyHp: 35,
                    enemyMaxHp: 35,
                    t: 36,
                    armorVal: 3,
                    attackRoll: 45,
                    weapon: { name: 'Whirling Chain-Cleavers', damage: '1d10+5', pen: 2 },
                    quote: '"BLOOD AND SCRAP FOR THE PACK!"',
                    onDefeatNode: 'lp_ch2_flagship_triumph'
                }
            },

            // ACT II: THE FLAGSHIP & PRIVATE QUARTERS (DEEP PASSION & ROMANCE)
            {
                id: 'lp_ch2_flagship_triumph',
                title: 'Act II: The Primarch’s Private Chambers',
                act: 'Act II - Blood-Bond & Intimate Devotion',
                atmosphere: 'Soft amber candlelight, scent of burning sandalwood and sacred body oils, silk pelts over massive iron bed, deep quiet after war.',
                narrative: `The marauders are slaughtered down to the last wretch, their bodies cast into the cold void.
                
You stand aboard the bridge of your flagship, the Starlight Eclipse, an ancient Gloriana-class battleship hidden in the asteroid reef. Ten thousand superhuman female Astartes stand at attention across the tiered brass command decks, crashing their fists against their breastplates as one:
                
"HAIL OUR PRIMARCH! HAIL OUR SOVEREIGN! THE ECLIPSE SHALL CONSUME THE STARS!"
                
After inspecting your legion, you retire to your secluded Imperial Sanctuary at the apex of the vessel. The colossal chamber is warm, lit by soft golden braziers, draped in rich velvet and furs.
                
A quiet chime sounds at your heavy oak doors. Your three inner lieutenants—First Captain Valerie, Chief Librarian Morgana, and Apothecary Selene—stand before you, having washed away the grime of battle. 
                
Valerie has unclasped her heavy armor; she wears a silk battle-tunic that clings to her athletic, scarred warrior physique. Her golden gaze locks onto yours with raw hunger, tenderness, and desperate devotion.
                
"My Primarch," Valerie whispers, closing the heavy doors behind them and stepping forward into the soft light. "For thousands of years, my heart had an empty void that no battle could fill. Now you are here. Let us serve you in private... Let us give you everything we have to offer."`,
                options: [
                    {
                        label: 'Summon First Captain Valerie to your side for an intimate embrace & blood-vow',
                        actionType: 'advance',
                        nextNode: 'lp_ch2_valerie_intimacy'
                    },
                    {
                        label: 'Invite Chief Librarian Morgana to intertwine minds and bodies in psychic communion',
                        actionType: 'advance',
                        nextNode: 'lp_ch2_morgana_intimacy'
                    },
                    {
                        label: 'Allow Chief Apothecary Selene to massage sacred unguents into your skin in private',
                        actionType: 'advance',
                        nextNode: 'lp_ch2_selene_intimacy'
                    },
                    {
                        label: 'Gather all three lieutenants together upon the royal divan for an evening of shared devotion',
                        actionType: 'advance',
                        nextNode: 'lp_ch2_harem_intimacy'
                    }
                ]
            },

            // Valerie Intimate Node
            {
                id: 'lp_ch2_valerie_intimacy',
                title: 'The Blood Valkyrie’s Surrender',
                act: 'Act II - Romantic Devotion (Valerie)',
                atmosphere: 'Crackling hearth, warmth of superhuman skin, whispered vows in the dark, fierce passion.',
                narrative: `You extend your hand and pull Valerie toward you. The fierce, terrifying warlord melts into your embrace with a breathless gasp. 
                
Her strong arms wrap tightly around your waist, burying her face into your neck. You feel the rapid thumping of her twin hearts, racing with fierce, unbridled love.
                
"I dreamed of this every night while you slept in stasis," Valerie whispers, her lips grazing the sensitive skin beneath your jaw. "They told us the Second Legion was forgotten. They wanted us to die. But I swore I would live long enough to feel your arms around me again."
                
She unclasps her silk mantle, letting it slide to the floor, revealing her stunning, muscular warrior form. Gently, reverently, she kneels before you on the soft furs, looking up at you with adoration in her golden eyes:
                
"I am yours, completely and without shame. In battle, I am your shield. In your bed, I am your devoted lover. Claim me as your own, my Primarch."
                
The night is consumed by fierce passion, whispered oaths of eternal loyalty, and deep, breathtaking intimacy. In the morning light, Valerie rests her head upon your chest, tracing your battle runes with a gentle finger (+25 Devotion with Valerie!). Restored to full vigor!`,
                options: [
                    {
                        label: 'Dawn approaches: Prepare the fleet for the Imperial Sanction Armada',
                        actionType: 'advance',
                        nextNode: 'lp_ch3_inquisition_clash'
                    }
                ]
            },

            // Morgana Intimate Node
            {
                id: 'lp_ch2_morgana_intimacy',
                title: 'Empyrean Union with the Void Witch',
                act: 'Act II - Psychic & Sensual Communion (Morgana)',
                atmosphere: 'Silver psychic motes dancing in the air, ecstatic telepathic harmony, shivers of raw pleasure.',
                narrative: `Morgana steps forward, her silver hair shimmering with starlight. She smiles gently as she steps into your personal space, her delicate yet powerful fingers undoing the laces of her robes.
                
She presses her forehead against yours. Instantly, the boundaries between your physical bodies dissolve into pure, transcendent ecstasy. 
                
In the psychic sea, you see her memories—the endless millennia she spent searching the cold void for your resting place, guided only by the lingering warmth of your soul. Her love for you is vast as the galaxy itself.
                
"Feel how deeply I love you, my Sovereign," she breathes aloud, her voice trembling with intense emotion as her hands caress your shoulders and guide you down upon the velvet cushions. "My body and my soul are one with yours. Take everything I am."
                
The physical union that follows is amplified by psychic resonance—every touch, kiss, and shiver multiplied a hundredfold by the warp. She clings to you in breathless bliss as the star-tides of the Empyrean gently wash over the sanctuary (+25 Devotion with Morgana!). Restored to full vigor!`,
                options: [
                    {
                        label: 'Dawn approaches: Prepare the fleet for the Imperial Sanction Armada',
                        actionType: 'advance',
                        nextNode: 'lp_ch3_inquisition_clash'
                    }
                ]
            },

            // Selene Intimate Node
            {
                id: 'lp_ch2_selene_intimacy',
                title: 'The Healer’s Sacred Touch',
                act: 'Act II - Sensual Care & Adoration (Selene)',
                atmosphere: 'Warm oils, flickering candle reflections on smooth skin, rhythmic soothing caresses.',
                narrative: `Apothecary Selene kneels beside your couch, uncorking crystal phials of warm, fragrant lavender and solar lotus oils. 
                
Her dark eyes are warm with reverence as she pours the soothing elixir across your broad shoulders and begins to massage your godlike muscles with firm, expert hands.
                
"You carried the weight of the galaxy before the stasis took you," Selene whispers softly, leaning close so that her dark hair brushes against your back. Her warm breath sends pleasant shivers down your spine. "Let me soothe every ache. You are our creator... but to me, you are the only one who truly matters."
                
As the tension melts away, she gently straddles your lap, looking into your eyes with intoxicating tenderness. She slips free of her tunic and leans in to press her warm, soft lips against yours, kissing you with deep, unhurried passion.
                
The night unfolds in tender devotion, mutual adoration, and blissful physical comfort (+25 Devotion with Selene!). Restored to full vigor!`,
                options: [
                    {
                        label: 'Dawn approaches: Prepare the fleet for the Imperial Sanction Armada',
                        actionType: 'advance',
                        nextNode: 'lp_ch3_inquisition_clash'
                    }
                ]
            },

            // Harem Intimate Node
            {
                id: 'lp_ch2_harem_intimacy',
                title: 'The Sovereign’s Divine Court',
                act: 'Act II - Ultimate Devotion (All Lieutenants)',
                atmosphere: 'Warm golden glow, laughter, shared wine, silk and armor shed together in unconditional love.',
                narrative: `You gesture to the colossal royal divan, welcoming all three of your lieutenants into your arms. 
                
There is no jealousy among the Daughters of the Eclipse—only collective adoration for the Primarch who created them. Valerie lies across your left side, her strong arm draped protectively over your chest; Morgana rests against your right, whispering sweet telepathic melodies into your thoughts; while Selene kneels between your legs, unfastening your clasps with a radiant smile.
                
They share wine from a jeweled chalice, feeding you sweet grapes and fruits harvested from the garden biomes of the ship.
                
"We are your court, your lovers, and your eternal guardians," Valerie murmurs, kissing your neck while Morgana’s fingers trace down your chest and Selene presses sweet kisses to your lips. 
                
The chamber is filled with warmth, passionate caresses, and the celebration of your return. All three women give themselves to you completely, forging a bond of blood, spirit, and love that nothing in the galaxy can ever sever (+20 Devotion to all lieutenants!). Restored to full vigor and +2 Fate Points!`,
                options: [
                    {
                        label: 'Dawn approaches: Prepare the fleet for the Imperial Sanction Armada',
                        actionType: 'advance',
                        nextNode: 'lp_ch3_inquisition_clash'
                    }
                ]
            },

            // ACT III: THE IMPERIAL SANCTION ARMADA
            {
                id: 'lp_ch3_inquisition_clash',
                title: 'Act III: Defying the Throne of Terra',
                act: 'Act III - Void Warfare & Boarding Clash',
                atmosphere: 'Flashing red void-alarms, macro-cannon thunder, void shields flaring azure.',
                narrative: `The augur arrays of the Starlight Eclipse scream: An Imperial Black Ship armada commanded by High Inquisitor Lord Hector and flanked by two strike cruisers of the Red Hunters Space Marine chapter has dropped out of the warp!
                
Over the open vox channel, Lord Hector’s voice snarls with fanatic hatred:
"Identify yourselves, apostate vessel! You bear the forgotten sigil of the expunged Second Legion! By decree of the High Lords of Terra, your existence is an unforgivable blasphemy. Surrender your vessel to be atomized, or face immediate annihilation!"
                
Beside you on the bridge, Valerie stands in full war-plate, her golden eyes flashing with murderous fury: "How dare this mortal insect question our Primarch?! Give the order, my Sovereign! Let us ram their flagship and tear their hearts out!"
                
Your daughters look to you, ready to drown the sector in blood for your honor.`,
                options: [
                    {
                        label: 'Transmit a Primarch’s Command across all fleet frequencies (Fel)',
                        stat: 'fel',
                        modifier: +10,
                        actionType: 'check',
                        desc: 'Demand the Imperial captains renounce their corrupt High Lords and bend the knee to a true Son/Daughter of the Emperor.',
                        successNode: 'lp_ch3_speech_success',
                        failNode: 'lp_ch3_speech_fail'
                    },
                    {
                        label: 'Lead the Valkyrie Boarding Torpedo Assault in person (WS)',
                        stat: 'ws',
                        modifier: 0,
                        actionType: 'check',
                        desc: 'Crash through the Inquisitorial flagship’s bridge and decapitate their command staff.',
                        successNode: 'lp_ch3_boarding_success',
                        failNode: 'lp_ch3_boarding_fail'
                    },
                    {
                        label: 'Combine your psychic might with Morgana to crush their fleet with a Warp Tempest (WP)',
                        stat: 'wp',
                        modifier: +5,
                        actionType: 'check',
                        desc: 'Channel an awe-inspiring psychic vortex to disable their warp drives and weapon batteries.',
                        successNode: 'lp_ch3_psychic_success',
                        failNode: 'lp_ch3_psychic_fail'
                    }
                ]
            },

            {
                id: 'lp_ch3_speech_success',
                title: 'The Voice of a Demigod',
                act: 'Act III - Imperial Submission',
                atmosphere: 'Silence on the comms, weeping naval crew, rebellion against the Inquisition.',
                narrative: `You open the vox channel. Your voice resonates not just through the speaker horns, but directly into the souls of every human on the Imperial vessels. 
                
You speak of the Great Crusade, the true vision of the Imperium, and the cowardice of the High Lords who locked away their demigods.
                
On the Imperial strike cruisers, the crew falls to their knees in tears! Half the Astra Militarum regiments mutiny, executing their political commissars and turning their macro-cannons upon Lord Hector’s Black Ship!
                
Lord Hector shrieks in panicked fury as his own fleet betrays him! He deploys his elite Retinue of Custodian-wannabes and Purge Drones directly onto your ship!`,
                combat: {
                    enemyName: 'Inquisitor Lord Hector & Death Cult Retinue',
                    enemyHp: 48,
                    enemyMaxHp: 48,
                    t: 44,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Inferno Pistol & Master Power Blade', damage: '2d10+4', pen: 6 },
                    quote: '"You are a forgotten ghost! The Inquisition rules this Imperium!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            {
                id: 'lp_ch3_speech_fail',
                title: 'Fanatic Blindness',
                act: 'Act III - Boarding Defense',
                atmosphere: 'Gunfire screaming, boarding claws punching through the hull.',
                narrative: `Lord Hector is too blinded by fanatic dogma to listen. He launches massive boarding pods that slam into your primary hangars! Kill the zealots!`,
                combat: {
                    enemyName: 'Inquisitor Lord Hector & Death Cult Retinue',
                    enemyHp: 48,
                    enemyMaxHp: 48,
                    t: 44,
                    armorVal: 5,
                    attackRoll: 52,
                    weapon: { name: 'Inferno Pistol & Master Power Blade', damage: '2d10+4', pen: 6 },
                    quote: '"Cleanse the abomination! Suffer not the forgotten to live!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            {
                id: 'lp_ch3_boarding_success',
                title: 'Thunder in the Void',
                act: 'Act III - Rampage of the Demigod',
                atmosphere: 'Decompression sirens, shattered bulkheads, absolute massacre.',
                narrative: `You and Valerie lead fifty Valkyries in a swarm of adamantine boarding torpedoes. You pierce directly into the command bridge of the Inquisitorial flagship!
                
When the smoke clears, you stand before Lord Hector like an ancient god of war. With a single casual backhand, you swat his elite bodyguard through a reinforced bulkhead.
                
Hector scrambles backward in terror, drawing his mastercrafted weapons!`,
                combat: {
                    enemyName: 'Terrified Inquisitor Lord Hector',
                    enemyHp: 40,
                    enemyMaxHp: 48,
                    t: 40,
                    armorVal: 4,
                    attackRoll: 42,
                    weapon: { name: 'Desperate Inferno Pistol', damage: '2d10+4', pen: 5 },
                    quote: '"Stay back! The Emperor will strike you down!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            {
                id: 'lp_ch3_boarding_fail',
                title: 'Heavy Crossfire',
                act: 'Act III - Boarding Defense',
                atmosphere: 'Plasma vents bursting, Valerie fighting at your shoulder.',
                narrative: `Heavy automated defense turrets pepper your boarding party, forcing you into brutal close-quarters combat inside the flagship’s cathedral hall!`,
                combat: {
                    enemyName: 'Inquisitor Lord Hector & Purge Guard',
                    enemyHp: 48,
                    enemyMaxHp: 48,
                    t: 44,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Heavy Bolters & Power Halberds', damage: '2d10+4', pen: 5 },
                    quote: '"Hold the line! Purge the Primarch!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            {
                id: 'lp_ch3_psychic_success',
                title: 'Wrath of the Star-Tides',
                act: 'Act III - Psychic Domination',
                atmosphere: 'Blinding silver lightning, enemy engines shutting down in fear.',
                narrative: `You hold out your hands. Morgana joins hers with yours, her silver hair whipping in psychic winds as your minds fuse into a singularity of raw empyrean power.
                
A silver astral tempest tears through the void, surgically frying every sensor array, plasma injector, and weapon capacitor on the enemy fleet without destroying the ships!
                
Lord Hector’s flagship drifts dead in the water as you teleport aboard to claim your prize!`,
                combat: {
                    enemyName: 'Inquisitor Lord Hector (Shields Down)',
                    enemyHp: 38,
                    enemyMaxHp: 48,
                    t: 38,
                    armorVal: 4,
                    attackRoll: 40,
                    weapon: { name: 'Master Power Blade', damage: '2d10+3', pen: 4 },
                    quote: '"Witchcraft! Unholy sorcery!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            {
                id: 'lp_ch3_psychic_fail',
                title: 'Psychic Backlash',
                act: 'Act III - Warp Strain',
                atmosphere: 'Ringing ears, blood running from nose, immediate close combat.',
                narrative: `The enemy vessel activates null-field arrays, causing psychic static that strains your concentration. Hector launches his elite retinue forward to strike!`,
                combat: {
                    enemyName: 'Inquisitor Lord Hector & Death Cult Retinue',
                    enemyHp: 48,
                    enemyMaxHp: 48,
                    t: 44,
                    armorVal: 5,
                    attackRoll: 50,
                    weapon: { name: 'Inferno Pistol & Master Blade', damage: '2d10+4', pen: 6 },
                    quote: '"The Null field holds! Kill the witch-Primarch!"',
                    onDefeatNode: 'lp_ch4_sovereign_epilogue'
                }
            },

            // ACT IV: EPILOGUE & CORONATION
            {
                id: 'lp_ch4_sovereign_epilogue',
                title: '★ ACT IV: SOVEREIGN OF THE ECLIPSE ★',
                act: 'Epilogue - The Empire of the Daughters',
                atmosphere: 'Golden banners waving, thunderous cheers of ten thousand Valkyries, star systems surrendering, loving warmth on the throne.',
                narrative: `Inquisitor Lord Hector collapses at your feet, his shattered blade skittering across the blood-soaked deck. With a wave of your hand, you order the Imperial survivors spared and brought under your banner.
                
Word spreads like wildfire across the sub-sector:
THE FORGOTTEN PRIMARCH HAS RETURNED.
                
Planets, forge-worlds, and naval stations cast off the oppressive yoke of the corrupt Terran bureaucracy, swearing fealty to the Second Legion. You carve out an independent, enlightened realm of stars—the Eclipse Sovereign Commonwealth.
                
In your palace of obsidian and gold, you sit upon the high throne. 
                
At your right side stands First Captain Valerie, radiant and proud, her golden eyes overflowing with passionate adoration. At your left rests Chief Librarian Morgana, her telepathic warmth forever wrapped around your soul. And at your feet sits Chief Apothecary Selene, gently resting her hand upon your knee.
                
"You gave us purpose. You gave us love. And now, you have given us an empire," Valerie whispers, pressing a passionate kiss to your knuckles before the roaring assembly of your Daughters.
                
"Let the High Lords of Terra tremble. Let the Dark Gods despair. The Daughters of the Eclipse shall conquer the stars for our Primarch!"
                
You smile into the warm light. The galaxy is grim, and the future holds eternal war—but you and your devoted Valkyries will conquer it together.`
            }
        ]
    }
};

window.WarhammerCampaignData = WarhammerCampaignData;

