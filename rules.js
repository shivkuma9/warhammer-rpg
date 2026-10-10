// rules.js - Warhammer 40k D100 Grimdark Tactical Rules Engine

const WarhammerRules = {
    // Stat Definitions & Labels
    STAT_NAMES: {
        ws: { name: 'Weapon Skill', short: 'WS', desc: 'Melee proficiency and close combat prowess' },
        bs: { name: 'Ballistic Skill', short: 'BS', desc: 'Ranged marksmanship and gunnery' },
        s:  { name: 'Strength', short: 'S', desc: 'Physical power and brute force' },
        t:  { name: 'Toughness', short: 'T', desc: 'Resilience, stamina, and injury resistance' },
        ag: { name: 'Agility', short: 'Ag', desc: 'Reflexes, speed, evasion, and acrobatics' },
        int:{ name: 'Intelligence', short: 'Int', desc: 'Lore, tactical deduction, tech-use, and logic' },
        per:{ name: 'Perception', short: 'Per', desc: 'Sensory awareness, searching, and intuition' },
        wp: { name: 'Willpower', short: 'WP', desc: 'Mental fortitude, resisting fear and warp corruption' },
        fel:{ name: 'Fellowship', short: 'Fel', desc: 'Persuasion, leadership, deception, and command' }
    },

    // Roll a standard die: d(faces)
    rollDie(faces = 100) {
        return Math.floor(Math.random() * faces) + 1;
    },

    // Roll D100
    rollD100() {
        return this.rollDie(100);
    },

    // Roll D10
    rollD10() {
        return this.rollDie(10);
    },

    // Calculate characteristic bonus (e.g. Toughness 42 -> TB 4)
    getBonus(statValue) {
        return Math.floor((statValue || 0) / 10);
    },

    // Standard D100 Characteristic / Skill Test
    // Returns detailed outcome object
    testSkill(statValue, modifier = 0, options = {}) {
        const roll = this.rollD100();
        const target = Math.max(1, Math.min(100, statValue + modifier));
        const isSuccess = roll <= target;

        // Doubles check (11, 22, 33, 44, 55, 66, 77, 88, 99, 100/00)
        const isDoubles = (roll % 11 === 0) || roll === 100;
        const isCritSuccess = roll <= 5 || (isSuccess && isDoubles);
        const isCritFailure = roll >= 96 || (!isSuccess && isDoubles);

        let degrees = 0;
        if (isSuccess) {
            degrees = Math.floor(target / 10) - Math.floor(roll / 10);
            if (degrees < 1) degrees = 1;
        } else {
            degrees = Math.floor(roll / 10) - Math.floor(target / 10);
            if (degrees < 1) degrees = 1;
        }

        return {
            roll,
            target,
            modifier,
            isSuccess,
            degrees,
            isCritSuccess,
            isCritFailure,
            isDoubles,
            summary: isSuccess 
                ? `${isCritSuccess ? '★ CRITICAL SUCCESS ★' : 'SUCCESS'} (${degrees} Degree${degrees > 1 ? 's' : ''})` 
                : `${isCritFailure ? '☠ CRITICAL FAILURE ☠' : 'FAILURE'} (${degrees} Degree${degrees > 1 ? 's' : ''})`
        };
    },

    // Determine Hit Location by reversing attack roll digits
    // e.g. roll 37 -> reversed 73 -> Right Leg
    getHitLocation(roll) {
        let revStr;
        if (roll === 100) {
            revStr = '00';
        } else {
            const str = roll.toString().padStart(2, '0');
            revStr = str[1] + str[0];
        }
        const val = parseInt(revStr, 10);

        if (val >= 1 && val <= 10) return { key: 'head', name: 'Head', multiplier: 1.5, armorSlot: 'head' };
        if (val >= 11 && val <= 20) return { key: 'rArm', name: 'Right Arm', multiplier: 1.0, armorSlot: 'arms' };
        if (val >= 21 && val <= 30) return { key: 'lArm', name: 'Left Arm', multiplier: 1.0, armorSlot: 'arms' };
        if (val >= 31 && val <= 70) return { key: 'body', name: 'Body (Torso)', multiplier: 1.0, armorSlot: 'body' };
        if (val >= 71 && val <= 85) return { key: 'rLeg', name: 'Right Leg', multiplier: 1.0, armorSlot: 'legs' };
        return { key: 'lLeg', name: 'Left Leg', multiplier: 1.0, armorSlot: 'legs' };
    },

    // Calculate Weapon Damage vs Armor & Toughness
    // Damage = WeaponDamage(e.g. 1d10+4) - (Armor + ToughnessBonus - Penetration)
    calculateDamage(weapon, targetStats, attackRoll = 50) {
        // Parse damage expression e.g. "1d10+4", "2d10+2"
        const formula = weapon.damage || "1d10+3";
        const parts = formula.match(/(\d+)d(\d+)(?:\+(\d+))?/i);

        let rawRoll = 0;
        if (parts) {
            const diceCount = parseInt(parts[1], 10);
            const diceSides = parseInt(parts[2], 10);
            const flatBonus = parseInt(parts[3] || '0', 10);
            for (let i = 0; i < diceCount; i++) {
                rawRoll += this.rollDie(diceSides);
            }
            rawRoll += flatBonus;
        } else {
            rawRoll = this.rollDie(10) + 3;
        }

        // Check weapon qualities (e.g. Tearing rolls extra d10 and drops lowest)
        if (weapon.qualities && weapon.qualities.includes('Tearing')) {
            const extra = this.rollDie(10);
            // Add slight tearing bonus
            rawRoll += Math.max(1, Math.floor(extra / 2));
        }

        const hitLocation = this.getHitLocation(attackRoll);
        const toughnessBonus = this.getBonus(targetStats.t || 30);
        const armorAtSlot = (targetStats.armor && targetStats.armor[hitLocation.armorSlot]) || 
                            (targetStats.armorVal || 0);

        const pen = weapon.pen || 0;
        const effectiveArmor = Math.max(0, armorAtSlot - pen);
        const totalSoak = effectiveArmor + toughnessBonus;

        const effectiveDamage = Math.max(0, rawRoll - totalSoak);

        return {
            weaponName: weapon.name,
            rawDamage: rawRoll,
            hitLocation,
            armorAtSlot,
            effectiveArmor,
            toughnessBonus,
            totalSoak,
            effectiveDamage,
            pen
        };
    },

    // Critical Injuries Table (triggered when wounds drop to 0 or negative)
    getCriticalInjury(criticalMagnitude, locationName) {
        const severity = Math.max(1, Math.min(10, criticalMagnitude));
        const injuries = {
            1: `Glancing impact to ${locationName}. Bruised bone, temporary wind knock. -10 to next action.`,
            2: `Flesh furrowed across ${locationName}. Heavy bleeding. Takes 1 fatigue point.`,
            3: `Deep arterial rupture in ${locationName}. Pain spikes through the nervous system. Agility reduced by 10 until treated.`,
            4: `Bone fissure in ${locationName}. Gruesome crunch heard over vox. Must pass Willpower test or fall prone!`,
            5: `Shattered limb / perforated organ in ${locationName}! Massive hemorrhaging. Bloodloss threatens unconsciousness.`,
            6: `Catastrophic trauma to ${locationName}! Tissue severed, armor crumpled into flesh. Instant stun for 1 round.`,
            7: `Limb torn mangled or vital organ pierced in ${locationName}! Character screams Imperial litanies through bloody teeth.`,
            8: `Obliteration of ${locationName}! Only cybernetics or pure miracle of the Emperor can restore this flesh.`,
            9: `Mortal laceration across ${locationName}! Character enters Agony state. Survives only if a Fate Point is burned!`,
            10: `Total bodily rupture at ${locationName}! The soul departs into the Emperor's Light (or the Warp). Utter devastation!`
        };
        return injuries[severity] || injuries[5];
    },

    // Perils of the Warp & Psychic Phenomena
    getPerilOfTheWarp() {
        const roll = this.rollD100();
        if (roll <= 20) {
            return {
                title: "Ghostly Whispers & Frost",
                desc: "Rime frosts your armor. The unholy chattering of daemons echoes in the skulls of everyone present. Gain 1 Insanity.",
                corruption: 0,
                insanity: 1
            };
        } else if (roll <= 45) {
            return {
                title: "Banshee Vox Surge",
                desc: "Communications screech with warp distortion. Lights flicker and cast impossible shadows. All tests suffer -10 for 1 turn.",
                corruption: 1,
                insanity: 1
            };
        } else if (roll <= 70) {
            return {
                title: "Blood Rain & Bleeding Bulkheads",
                desc: "A foul ichor seeps from the ceiling and walls. The boundary of reality weakens. Everyone makes a Willpower test or suffers 1d5 shock damage.",
                corruption: 2,
                insanity: 2
            };
        } else if (roll <= 90) {
            return {
                title: "Daemon Host Manifestation Tremor",
                desc: "A localized gravity collapse lifts debris into the air. A minor warp entity claws at your mind! Suffer 1d10 Willpower damage.",
                corruption: 3,
                insanity: 3
            };
        } else {
            return {
                title: "THE EYE OF TERROR GLANCES UPON YOU",
                desc: "Reality violently shatters! A rift flickers open. Eldritch energies sear through your soul. Only burning a Fate Point prevents full daemonic possession!",
                corruption: 5,
                insanity: 5
            };
        }
    }
};

// Universe Currency & Store Requisition Catalogues
const UniverseStoreData = {
    warhammer: {
        currencyName: 'Throne Gelt (TG)',
        currencySymbol: '🪙',
        storeTitle: 'INQUISITORIAL ARMORY & FORGE-SHRINE',
        storeDesc: 'Requisition sanctified weaponry, blessed armor, and bionic implants approved by the Ordo Hereticus and Adeptus Mechanicus.',
        merchantQuote: '"The Emperor provides, but the Munitorum counts every bolt round. What do you require, Agent?"',
        merchantName: 'Forge-Adept Scoria',
        items: [
            { id: 'wh_st_1', name: 'Master-Crafted Boltgun', price: 450, type: 'ranged', damage: '1d10+7', pen: 5, qualities: ['Tearing', 'Accurate'], desc: 'Sacred .75 cal Godwyn pattern rifle inscribed with purity seals.' },
            { id: 'wh_st_2', name: 'Sanctified Power Sword', price: 500, type: 'melee', damage: '1d10+8', pen: 6, qualities: ['Power Field'], desc: 'Disruption field blade that vaporizes enemy armor on contact.' },
            { id: 'wh_st_3', name: 'Ignis Purifier Flamer', price: 380, type: 'ranged', damage: '1d10+6', pen: 3, qualities: ['Flame', 'Area Spray'], desc: 'Chemical promethium nozzle to cleanse cultist warrens with holy fire.' },
            { id: 'wh_st_4', name: 'Ignis Power Armor Carapace', price: 650, type: 'armor', armorBonus: 2, desc: 'Heavy adamantine plate reinforcement adding +2 Soak to all locations.' },
            { id: 'wh_st_5', name: 'Combat Medicae Kit (x3)', price: 150, type: 'consumable', count: 3, heals: 8, desc: 'Coagulant stimulants and sterile skin-welder for immediate trauma triage.' },
            { id: 'wh_st_6', name: 'Blessed Rosarius Field', price: 600, type: 'relic', desc: 'Emits an impenetrable force bubble that deflects fatal kinetic and warp strikes.' }
        ]
    },
    fate: {
        currencyName: 'Mana Prana Gems',
        currencySymbol: '💎',
        storeTitle: 'CLOCK TOWER & CHALDEA MYSTIC WORKSHOP',
        storeDesc: 'Purchase enchanted Mystic Codes, Azoth blades, alchemical gems, and homunculus catalysts for the Holy Grail War.',
        merchantQuote: '"Welcome to the workshop. Bring enough jewel catalysts, and even miracles can be transcribed into craft."',
        merchantName: 'Tohsaka Workshop Automaton',
        items: [
            { id: 'ft_st_1', name: 'Ruby Burst Jewel (x3)', price: 300, type: 'consumable', count: 3, heals: 0, desc: 'Stored Gandr blast detonating for 25 unblockable damage upon release.' },
            { id: 'ft_st_2', name: 'Black Keys of the Church (x4)', price: 400, type: 'ranged', damage: '1d10+6', pen: 4, qualities: ['Anti-Demonic'], desc: 'Holy baptismal blades flung in sets to pin enemy shadows and spirits.' },
            { id: 'ft_st_3', name: 'Formalcraft Azoth Blade', price: 550, type: 'melee', damage: '1d10+7', pen: 5, qualities: ['Mana Burst'], desc: 'Masterpiece ritual dagger amplifying offensive spell casting.' },
            { id: 'ft_st_4', name: 'Chaldea Mystic Code Cloak', price: 500, type: 'armor', armorBonus: 2, desc: 'Woven with magical ether threads, conferring spell resistance and +2 defense.' },
            { id: 'ft_st_5', name: 'Ambrosia of the Einzberns (x2)', price: 200, type: 'consumable', count: 2, heals: 10, desc: 'Pure liquid prana that knits ruptured flesh and restarts stopped hearts.' },
            { id: 'ft_st_6', name: 'False Command Spell Seal', price: 700, type: 'relic', desc: 'Single-use artificial Command Seal capable of issuing an absolute Servant order.' }
        ]
    },
    onepiece: {
        currencyName: 'Berries (฿)',
        currencySymbol: '฿',
        storeTitle: 'LOGUETOWN BAZAAR & UNDERWORLD SMUGGLER',
        storeDesc: 'Equip your pirate crew with Meito graded katanas, dial cannons, rumble balls, and Sea-Prism stone weapons.',
        merchantQuote: '"Heh heh heh! Got plenty of gold from the Grand Line, Captain? Take your pick before the Marines arrive!"',
        merchantName: 'Loguetown Weaponsmith Ipponmatsu',
        items: [
            { id: 'op_st_1', name: 'Wazamono Graded Katana: "Kitsunebi"', price: 450, type: 'melee', damage: '2d10+5', pen: 5, qualities: ['Flame Slash'], desc: 'A famed named blade that cuts through flame and steel alike.' },
            { id: 'op_st_2', name: 'Impact Dial Arm-Cannon', price: 400, type: 'ranged', damage: '2d10+6', pen: 4, qualities: ['Kinetic Blast'], desc: 'Skypiea shell dial releasing absorbed shockwaves directly into the target.' },
            { id: 'op_st_3', name: 'Sea-Prism Stone Jitte', price: 550, type: 'melee', damage: '1d10+6', pen: 6, qualities: ['Devil Fruit Nullify'], desc: 'Weapon tip crafted from pure Kairoseki that paralyzes Devil Fruit users.' },
            { id: 'op_st_4', name: 'Armament Hardened Leather Coat', price: 420, type: 'armor', armorBonus: 2, desc: 'Tough sea-beast leather reinforcing your defense by +2 on all hits.' },
            { id: 'op_st_5', name: 'Sanji Special Vitality Feast', price: 180, type: 'consumable', count: 2, heals: 12, desc: 'Gourmet Pirate recipe instantly restoring 12 HP and max stamina.' },
            { id: 'op_st_6', name: 'Log Pose to New World', price: 600, type: 'relic', desc: 'Triple-needle compass that detects hidden magnetic islands and treasure.' }
        ]
    }
};

window.UniverseStoreData = UniverseStoreData;


// ==========================================
// Fate/stay night Rules Engine (Chaldea/Fuyuki)
// ==========================================
const FateRules = {
    STAT_NAMES: {
        str: { name: 'Strength', short: 'STR', desc: 'Physical power and weapon impact' },
        end: { name: 'Endurance', short: 'END', desc: 'Resilience, defense, and stamina' },
        agi: { name: 'Agility', short: 'AGI', desc: 'Reflexes, evasion, and speed' },
        mana:{ name: 'Mana (Prana)', short: 'MNA', desc: 'Magical capacity and spellcraft power' },
        lck: { name: 'Luck', short: 'LCK', desc: 'Fortune, resisting curses, and miraculous fate' },
        np:  { name: 'Noble Phantasm', short: 'NP', desc: 'Trump card manifestation potency' }
    },

    // Convert D100 roll into Fate/stay night check
    testCheck(statValue, modifier = 0) {
        return WarhammerRules.testSkill(statValue, modifier);
    },

    // Noble Phantasm Damage & Release calculation
    calculateNoblePhantasm(servant, targetDefense = 30) {
        const rankMultipliers = { 'EX': 3.5, 'A++': 2.8, 'A+': 2.4, 'A': 2.0, 'B+': 1.6, 'B': 1.4, 'C': 1.1 };
        const mult = rankMultipliers[servant.npRank || 'A'] || 1.5;
        const base = Math.floor(Math.random() * 30) + 40;
        const rawDamage = Math.floor(base * mult);
        const soak = Math.floor(targetDefense * 0.4);
        const damage = Math.max(25, rawDamage - soak);
        return {
            rawDamage,
            damage,
            crit: Math.random() > 0.75,
            quote: servant.npChant || "TRACE ON... ENUMA ELISH!"
        };
    }
};

// ==========================================
// One Piece Rules Engine (Grand Line Haki)
// ==========================================
const OnePieceRules = {
    STAT_NAMES: {
        might:   { name: 'Brute Might', short: 'MGT', desc: 'Physical force, destructive blows and lifting' },
        agility: { name: 'Agility / Soru', short: 'AGI', desc: 'Speed, high-speed dodging and acrobatic movement' },
        fortitude:{ name: 'Fortitude', short: 'FOR', desc: 'Grit, endurance, withstanding fatal attacks' },
        busoshoku:{ name: 'Armament Haki', short: 'ARM', desc: 'Hardening armor, bypassing Devil Fruit defenses' },
        kenbunshoku:{ name: 'Observation Haki', short: 'OBS', desc: 'Future sight, prescience and dodging incoming hits' },
        haoshoku:{ name: "Conqueror's Haki", short: 'HAOU', desc: 'Willpower dominance, knocking out weak enemies' }
    },

    // Skill test with Haki modifier
    testCheck(statValue, modifier = 0) {
        return WarhammerRules.testSkill(statValue, modifier);
    },

    // Calculate Devil Fruit / Haki Clash
    calculateClash(playerStat, enemyStat, hakiBonus = 0) {
        const playerRoll = WarhammerRules.rollDie(100) + playerStat + (hakiBonus * 10);
        const enemyRoll = WarhammerRules.rollDie(100) + enemyStat;
        const won = playerRoll >= enemyRoll;
        const diff = Math.abs(playerRoll - enemyRoll);
        return {
            won,
            diff,
            blackLightning: (playerStat >= 70 || hakiBonus > 0),
            summary: won ? `CLASH WON! Pushed through with decisive momentum (+${diff})` : `CLASH LOST! Knocked back by enemy force (-${diff})`
        };
    }
};

// ==========================================
// Companions, Bonds, Thralls & Affiliation Rules Engine
// ==========================================
const CompanionRules = {
    STATUSES: {
        ALLY: { id: 'ally', label: 'Sworn Ally', icon: '⚔️', desc: 'Fights alongside you with devotion and grants combat assists.' },
        ROMANCE: { id: 'romance', label: 'Romance / Harem', icon: '❤️', desc: 'Deep emotional and passionate bond, unlocks special moments and supreme resolve.' },
        THRALL: { id: 'thrall', label: 'Subjugated Thrall', icon: '⛓️', desc: 'Broken to your command through fear or sorcery, obeys without question.' },
        RIVAL: { id: 'rival', label: 'Rival / Nemesis', icon: '⚡', desc: 'Antagonist who constantly stalks you and seeks vengeance.' },
        CAPTIVE: { id: 'captive', label: 'Captive Prisoner', icon: '🔒', desc: 'Interrogatable prisoner of war. Can be broken, recruited, or ransomed.' }
    },

    // Calculate combat assist bonus from active companion
    calculateAssistBonus(companion) {
        if (!companion) return 0;
        let bonus = 0;
        if (companion.status === 'ally') bonus += Math.floor((companion.affection || 50) / 10);
        if (companion.status === 'romance') bonus += Math.floor((companion.affection || 70) / 7);
        if (companion.status === 'thrall') bonus += Math.floor((companion.obedience || 50) / 10);
        return Math.min(25, bonus);
    },

    // Process affection / obedience change
    modifyBond(companion, delta, type = 'affection') {
        if (!companion) return;
        if (type === 'affection') {
            companion.affection = Math.max(0, Math.min(100, (companion.affection || 0) + delta));
            if (companion.affection >= 80 && companion.status === 'ally' && companion.canRomance) {
                companion.status = 'romance';
            }
        } else if (type === 'obedience') {
            companion.obedience = Math.max(0, Math.min(100, (companion.obedience || 0) + delta));
            if (companion.obedience >= 75 && companion.status === 'captive') {
                companion.status = 'thrall';
            }
        }
    }
};

window.WarhammerRules = WarhammerRules;
window.FateRules = FateRules;
window.OnePieceRules = OnePieceRules;
window.CompanionRules = CompanionRules;
