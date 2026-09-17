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

window.WarhammerRules = WarhammerRules;
