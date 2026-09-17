// app.js - Main Application Controller & Game State Manager
// Supports both 'The Lost II Legion: Daughters of the Eclipse' & 'The Heresy of Sector 44'

class GrimdarkRPGApp {
    constructor() {
        this.character = null;
        this.campaignId = 'lost_primarch'; // default to new Lost Primarch campaign
        this.currentCampaign = WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN;
        this.currentNode = null;
        this.currentCombat = null;
        this.lastRoll = null;
        this.diceHistory = [];
        this.universe = 'warhammer'; // 'warhammer' or 'fate'

        // Primarch Creator State
        this.primarchPointsRemaining = 15;
        this.primarchStats = { ws: 68, bs: 65, s: 62, t: 64, ag: 55, int: 60, per: 58, wp: 68, fel: 72 };
        this.selectedAspectId = 'solar_warmaster';

        this.initElements();
        this.bindEvents();
        this.loadSavedGame();
    }

    initElements() {
        // Character panel
        this.charNameEl = document.getElementById('char-name');
        this.charArchetypeEl = document.getElementById('char-archetype');
        this.charOrderEl = document.getElementById('char-order');
        this.hpCurrentEl = document.getElementById('hp-current');
        this.hpMaxEl = document.getElementById('hp-max');
        this.hpBarFillEl = document.getElementById('hp-bar-fill');
        this.fateCurrentEl = document.getElementById('fate-current');
        this.insanityCurrentEl = document.getElementById('insanity-current');
        this.corruptionCurrentEl = document.getElementById('corruption-current');
        this.statGridEl = document.getElementById('stat-grid');
        this.armorGridEl = document.getElementById('armor-grid');
        this.lieutenantsPanelEl = document.getElementById('lieutenants-panel');
        this.lieutenantsListEl = document.getElementById('lieutenants-list');

        // Central Terminal
        this.headerTitleEl = document.getElementById('header-title');
        this.headerSubtitleEl = document.getElementById('header-subtitle');
        this.chapterTitleEl = document.getElementById('chapter-title');
        this.chapterActEl = document.getElementById('chapter-act');
        this.atmosphereTextEl = document.getElementById('atmosphere-text');
        this.narrativeTextEl = document.getElementById('narrative-text');
        this.combatHudEl = document.getElementById('combat-hud');
        this.enemyNameEl = document.getElementById('enemy-name');
        this.enemyHpFillEl = document.getElementById('enemy-hp-fill');
        this.enemyHpCurrentEl = document.getElementById('enemy-hp-current');
        this.enemyHpMaxEl = document.getElementById('enemy-hp-max');
        this.enemyQuoteEl = document.getElementById('enemy-quote');
        this.optionsContainerEl = document.getElementById('options-container');

        // Freeform input
        this.freeformInputEl = document.getElementById('freeform-input');
        this.executeActionBtnEl = document.getElementById('execute-action-btn');

        // Dice Tray
        this.diceDigitsEl = document.getElementById('dice-digits');
        this.diceLabelEl = document.getElementById('dice-label');
        this.diceFormulaEl = document.getElementById('dice-formula');
        this.hitLocationBadgeEl = document.getElementById('hit-location-badge');
        this.fateRerollBtnEl = document.getElementById('fate-reroll-btn');
        this.diceHistoryEl = document.getElementById('dice-history');

        // Inventory
        this.inventoryListEl = document.getElementById('inventory-list');

        // Modal elements
        this.creatorModalEl = document.getElementById('creator-modal');
        this.tabPrimarchBtnEl = document.getElementById('tab-primarch-btn');
        this.tabAcolyteBtnEl = document.getElementById('tab-acolyte-btn');
        this.tabPrimarchViewEl = document.getElementById('tab-primarch-view');
        this.tabAcolyteViewEl = document.getElementById('tab-acolyte-view');

        // Primarch Creator inputs
        this.primarchNameInputEl = document.getElementById('primarch-name');
        this.primarchTitleInputEl = document.getElementById('primarch-title');
        this.primarchGenderSelectEl = document.getElementById('primarch-gender');
        this.primarchClassContainerEl = document.getElementById('primarch-class-container');
        this.statPointsRemainingEl = document.getElementById('stat-points-remaining');
        this.rollStatsBtnEl = document.getElementById('roll-stats-btn');
        this.statAllocatorGridEl = document.getElementById('stat-allocator-grid');
        this.startPrimarchBtnEl = document.getElementById('start-primarch-btn');

        // Acolyte Creator
        this.archetypeContainerEl = document.getElementById('archetype-container');
        this.startAcolyteBtnEl = document.getElementById('start-acolyte-btn');

        // Security Lock Gate
        this.lockGateBackdropEl = document.getElementById('lock-gate-backdrop');
        this.gatePassInputEl = document.getElementById('gate-pass-input');
        this.gateUnlockBtnEl = document.getElementById('gate-unlock-btn');
        this.lockErrorMsgEl = document.getElementById('lock-error-msg');
        this.lockBtnEl = document.getElementById('lock-btn');
        this.changePassBtnEl = document.getElementById('change-pass-btn');

        // Mobile Nav
        this.mobileNavEl = document.getElementById('mobile-nav-bar');
        this.mainWrapperEl = document.querySelector('.main-wrapper');

        // Header controls
        this.campaignSelectBtnEl = document.getElementById('campaign-select-btn');
        this.audioBtnEl = document.getElementById('audio-btn');
        this.ambientBtnEl = document.getElementById('ambient-btn');
        this.resetBtnEl = document.getElementById('reset-btn');
        this.themeBtnEl = document.getElementById('theme-btn');
    }

    bindEvents() {
        this.initSecurityGate();
        this.initMobileNav();

        this.executeActionBtnEl.addEventListener('click', () => this.handleFreeformAction());
        this.freeformInputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleFreeformAction();
        });

        this.fateRerollBtnEl.addEventListener('click', () => this.handleFateReroll());

        this.audioBtnEl.addEventListener('click', () => {
            window.soundEngine.enabled = !window.soundEngine.enabled;
            this.audioBtnEl.innerHTML = window.soundEngine.enabled ? '<span>🔊</span> Sound: ON' : '<span>🔇</span> Sound: OFF';
            if (window.soundEngine.enabled) window.soundEngine.playClick();
        });

        this.ambientBtnEl.addEventListener('click', () => {
            const active = window.soundEngine.toggleAmbient();
            this.ambientBtnEl.innerHTML = active ? '<span>⚡</span> Warp Drone: ACTIVE' : '<span>⚡</span> Warp Drone: OFF';
        });

        this.resetBtnEl.addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showCharacterCreator();
        });

        this.campaignSelectBtnEl.addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showCharacterCreator();
        });

        this.themeBtnEl.addEventListener('click', () => {
            this.toggleUniverse();
        });

        // Tabs in creator modal
        this.tabPrimarchBtnEl.addEventListener('click', () => {
            this.tabPrimarchBtnEl.classList.add('active');
            this.tabAcolyteBtnEl.classList.remove('active');
            this.tabPrimarchViewEl.style.display = 'block';
            this.tabAcolyteViewEl.style.display = 'none';
            window.soundEngine.playClick();
        });

        this.tabAcolyteBtnEl.addEventListener('click', () => {
            this.tabAcolyteBtnEl.classList.add('active');
            this.tabPrimarchBtnEl.classList.remove('active');
            this.tabAcolyteViewEl.style.display = 'block';
            this.tabPrimarchViewEl.style.display = 'none';
            window.soundEngine.playClick();
        });

        // Primarch Creator button
        this.startPrimarchBtnEl.addEventListener('click', () => {
            this.finalizePrimarchCharacter();
        });

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (this.character) {
                    this.creatorModalEl.style.display = 'none';
                    window.soundEngine.playClick();
                }
            });
        }

        this.startAcolyteBtnEl.addEventListener('click', () => {
            this.finalizeAcolyteCharacter();
        });

        this.rollStatsBtnEl.addEventListener('click', () => {
            this.rollRandomPrimarchStats();
        });
    }

    loadSavedGame() {
        const saved = localStorage.getItem('grimdark_rpg_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.character = data.character;
                this.campaignId = data.campaignId || (this.character.isPrimarch ? 'lost_primarch' : 'sector_44');
                this.currentCampaign = this.campaignId === 'lost_primarch' 
                    ? WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN 
                    : WarhammerCampaignData.CAMPAIGN;
                this.currentNode = data.currentNode;
                this.currentCombat = data.currentCombat;
                this.diceHistory = data.diceHistory || [];
                this.updateHeaderTitles();
                this.renderAll();
                return;
            } catch (e) {
                console.error("Failed to load saved state:", e);
            }
        }
        this.showCharacterCreator();
    }

    saveGame() {
        const data = {
            character: this.character,
            campaignId: this.campaignId,
            currentNode: this.currentNode,
            currentCombat: this.currentCombat,
            diceHistory: this.diceHistory
        };
        localStorage.setItem('grimdark_rpg_save', JSON.stringify(data));
    }

    updateHeaderTitles() {
        if (this.campaignId === 'lost_primarch') {
            this.headerTitleEl.textContent = "WARHAMMER 40,000 : THE LOST II LEGION";
            this.headerSubtitleEl.textContent = "DAUGHTERS OF THE ECLIPSE // SANCUS CRUCIBLE";
            this.campaignSelectBtnEl.innerHTML = '<span>👑</span> Campaign: LOST PRIMARCH';
        } else {
            this.headerTitleEl.textContent = "WARHAMMER 40,000 : ORDO HERETICUS";
            this.headerSubtitleEl.textContent = "TACTICAL D100 COGITATOR TERMINAL // SECTOR 44";
            this.campaignSelectBtnEl.innerHTML = '<span>📜</span> Campaign: SECTOR 44';
        }
    }

    showCharacterCreator() {
        this.creatorModalEl.style.display = 'flex';
        this.renderPrimarchAspectCards();
        this.renderStatAllocator();
        this.renderAcolyteCards();
    }

    renderPrimarchAspectCards() {
        this.primarchClassContainerEl.innerHTML = '';
        WarhammerCampaignData.PRIMARCH_CLASSES.forEach((aspect, idx) => {
            const card = document.createElement('div');
            card.className = `archetype-card ${aspect.id === this.selectedAspectId ? 'selected' : ''}`;
            card.dataset.id = aspect.id;

            card.innerHTML = `
                <div class="archetype-header">
                    <div class="archetype-name">${aspect.name}</div>
                    <div class="archetype-order">${aspect.role}</div>
                </div>
                <div class="archetype-quote">${aspect.title}</div>
                <div class="archetype-highlights">
                    <div>${aspect.desc}</div>
                    <div><strong>Base Stats:</strong> WS ${aspect.baseStats.ws} | BS ${aspect.baseStats.bs} | WP ${aspect.baseStats.wp}</div>
                    <div><strong>Relic:</strong> ${aspect.startingGear[0].name}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                document.querySelectorAll('#primarch-class-container .archetype-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedAspectId = aspect.id;
                this.primarchStats = JSON.parse(JSON.stringify(aspect.baseStats));
                this.primarchPointsRemaining = 15;
                this.renderStatAllocator();
                window.soundEngine.playClick();
            });

            this.primarchClassContainerEl.appendChild(card);
        });
    }

    renderStatAllocator() {
        this.statPointsRemainingEl.textContent = this.primarchPointsRemaining;
        this.statAllocatorGridEl.innerHTML = '';

        Object.keys(WarhammerRules.STAT_NAMES).forEach(statKey => {
            const info = WarhammerRules.STAT_NAMES[statKey];
            const val = this.primarchStats[statKey] || 60;

            const cell = document.createElement('div');
            cell.className = 'allocator-cell';
            cell.innerHTML = `
                <div class="allocator-abbr">${info.short} (${info.name})</div>
                <div class="allocator-val" id="alloc-val-${statKey}">${val}</div>
                <div class="allocator-controls">
                    <button type="button" class="allocator-btn minus-btn" data-stat="${statKey}">-</button>
                    <button type="button" class="allocator-btn plus-btn" data-stat="${statKey}">+</button>
                </div>
            `;

            const minusBtn = cell.querySelector('.minus-btn');
            const plusBtn = cell.querySelector('.plus-btn');

            minusBtn.addEventListener('click', () => {
                if (this.primarchStats[statKey] > 30) {
                    this.primarchStats[statKey] -= 1;
                    this.primarchPointsRemaining += 1;
                    this.renderStatAllocator();
                    window.soundEngine.playClick();
                }
            });

            plusBtn.addEventListener('click', () => {
                if (this.primarchPointsRemaining > 0 && this.primarchStats[statKey] < 95) {
                    this.primarchStats[statKey] += 1;
                    this.primarchPointsRemaining -= 1;
                    this.renderStatAllocator();
                    window.soundEngine.playClick();
                }
            });

            this.statAllocatorGridEl.appendChild(cell);
        });
    }

    rollRandomPrimarchStats() {
        window.soundEngine.playDiceRoll();
        Object.keys(WarhammerRules.STAT_NAMES).forEach(statKey => {
            // Roll Primarch-level stat: 50 + 2d10
            const roll = 50 + WarhammerRules.rollD10() + WarhammerRules.rollD10();
            this.primarchStats[statKey] = roll;
        });
        this.primarchPointsRemaining = 0;
        this.renderStatAllocator();
    }

    renderAcolyteCards() {
        this.archetypeContainerEl.innerHTML = '';
        WarhammerCampaignData.ARCHETYPES.forEach((arch, idx) => {
            const card = document.createElement('div');
            card.className = `archetype-card ${idx === 0 ? 'selected' : ''}`;
            card.dataset.id = arch.id;

            card.innerHTML = `
                <div class="archetype-header">
                    <div class="archetype-name">${arch.name}</div>
                    <div class="archetype-order">${arch.order}</div>
                </div>
                <div class="archetype-quote">${arch.quote}</div>
                <div class="archetype-highlights">
                    <div><strong>Stats:</strong> WS ${arch.stats.ws} | BS ${arch.stats.bs} | WP ${arch.stats.wp}</div>
                    <div><strong>Wounds:</strong> ${arch.woundsMax} | <strong>Fate:</strong> ${arch.fatePoints}</div>
                    <div><strong>Gear:</strong> ${arch.inventory.map(i => i.name).slice(0, 2).join(', ')}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                document.querySelectorAll('#archetype-container .archetype-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                window.soundEngine.playClick();
            });

            this.archetypeContainerEl.appendChild(card);
        });
    }

    finalizePrimarchCharacter() {
        const name = this.primarchNameInputEl.value.trim() || 'Aurelia Vespera';
        const title = this.primarchTitleInputEl.value.trim() || 'The Eclipse Sovereign';
        const gender = this.primarchGenderSelectEl.value;

        const aspectTemplate = WarhammerCampaignData.PRIMARCH_CLASSES.find(a => a.id === this.selectedAspectId) 
            || WarhammerCampaignData.PRIMARCH_CLASSES[0];

        this.character = {
            id: 'custom_primarch',
            name: name,
            title: title,
            gender: gender,
            order: 'The II Legion: Daughters of the Eclipse',
            isPrimarch: true,
            stats: JSON.parse(JSON.stringify(this.primarchStats)),
            woundsMax: aspectTemplate.woundsMax,
            woundsCurrent: aspectTemplate.woundsMax,
            fatePoints: aspectTemplate.fatePoints,
            insanity: 0,
            corruption: 0,
            armor: JSON.parse(JSON.stringify(aspectTemplate.armor)),
            inventory: JSON.parse(JSON.stringify(aspectTemplate.startingGear)),
            lieutenants: JSON.parse(JSON.stringify(WarhammerCampaignData.LIEUTENANTS))
        };

        this.campaignId = 'lost_primarch';
        this.currentCampaign = WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN;
        this.currentNode = this.currentCampaign.chapters[0].id;
        this.currentCombat = null;

        window.soundEngine.playConfirm();
        this.creatorModalEl.style.display = 'none';

        this.updateHeaderTitles();
        this.saveGame();
        this.renderAll();
    }

    finalizeAcolyteCharacter() {
        const selected = document.querySelector('#archetype-container .archetype-card.selected');
        const archId = selected ? selected.dataset.id : 'interrogator';
        const template = WarhammerCampaignData.ARCHETYPES.find(a => a.id === archId);

        this.character = JSON.parse(JSON.stringify(template));
        this.character.woundsCurrent = this.character.woundsMax;
        this.character.isPrimarch = false;

        this.campaignId = 'sector_44';
        this.currentCampaign = WarhammerCampaignData.CAMPAIGN;
        this.currentNode = this.currentCampaign.chapters[0].id;
        this.currentCombat = null;

        window.soundEngine.playConfirm();
        this.creatorModalEl.style.display = 'none';

        this.updateHeaderTitles();
        this.saveGame();
        this.renderAll();
    }

    renderAll() {
        this.renderCharacterPanel();
        this.renderStoryNode();
        this.renderInventory();
        this.renderDiceHistory();
    }

    renderCharacterPanel() {
        if (!this.character) return;

        this.charNameEl.textContent = this.character.name;
        this.charArchetypeEl.textContent = this.character.title;
        this.charOrderEl.textContent = this.character.order;

        this.hpCurrentEl.textContent = this.character.woundsCurrent;
        this.hpMaxEl.textContent = this.character.woundsMax;
        const hpPercent = Math.max(0, Math.min(100, (this.character.woundsCurrent / this.character.woundsMax) * 100));
        this.hpBarFillEl.style.width = `${hpPercent}%`;

        this.fateCurrentEl.textContent = this.character.fatePoints;
        this.insanityCurrentEl.textContent = this.character.insanity;
        this.corruptionCurrentEl.textContent = this.character.corruption;

        // Render stats
        this.statGridEl.innerHTML = '';
        Object.keys(WarhammerRules.STAT_NAMES).forEach(statKey => {
            const info = WarhammerRules.STAT_NAMES[statKey];
            const val = this.character.stats[statKey] || 30;
            const bonus = WarhammerRules.getBonus(val);

            const cell = document.createElement('div');
            cell.className = 'stat-cell';
            cell.title = info.desc;
            cell.innerHTML = `
                <div class="stat-abbr">${info.short}</div>
                <div class="stat-val">${val}</div>
                <div class="stat-mod">+${bonus}</div>
            `;
            this.statGridEl.appendChild(cell);
        });

        // Render armor
        this.armorGridEl.innerHTML = `
            <div class="armor-row"><span>Head:</span><strong>${this.character.armor.head}</strong></div>
            <div class="armor-row"><span>Torso:</span><strong>${this.character.armor.body}</strong></div>
            <div class="armor-row"><span>Arms:</span><strong>${this.character.armor.arms}</strong></div>
            <div class="armor-row"><span>Legs:</span><strong>${this.character.armor.legs}</strong></div>
        `;

        // Render Lieutenants (If in Lost Primarch campaign)
        if (this.character.isPrimarch && this.character.lieutenants) {
            this.lieutenantsPanelEl.style.display = 'block';
            this.lieutenantsListEl.innerHTML = '';

            this.character.lieutenants.forEach(lt => {
                const card = document.createElement('div');
                card.className = 'lieutenant-card';
                card.title = `${lt.epithet} - ${lt.personality}`;
                card.innerHTML = `
                    <div class="lt-header">
                        <span class="lt-name">♥ ${lt.name}</span>
                        <span class="lt-devotion-text">${lt.devotion}% Devotion</span>
                    </div>
                    <div class="devotion-bar-outer">
                        <div class="devotion-bar-inner" style="width: ${lt.devotion}%;"></div>
                    </div>
                `;
                this.lieutenantsListEl.appendChild(card);
            });
        } else {
            this.lieutenantsPanelEl.style.display = 'none';
        }
    }

    renderStoryNode() {
        const node = this.findNode(this.currentNode);
        if (!node) return;

        this.chapterTitleEl.textContent = node.title;
        this.chapterActEl.textContent = node.act || 'Tactical Scenario';
        this.atmosphereTextEl.textContent = node.atmosphere || 'Gothic void silence';
        this.narrativeTextEl.textContent = node.narrative;

        // Check for devotion rewards in narrative
        if (this.character.isPrimarch && this.character.lieutenants) {
            if (node.narrative.includes('Devotion with Valerie')) {
                const val = this.character.lieutenants.find(l => l.id === 'valerie');
                if (val) val.devotion = Math.min(100, val.devotion + 15);
            }
            if (node.narrative.includes('Devotion with Morgana')) {
                const mor = this.character.lieutenants.find(l => l.id === 'morgana');
                if (mor) mor.devotion = Math.min(100, mor.devotion + 15);
            }
            if (node.narrative.includes('Devotion with Selene')) {
                const sel = this.character.lieutenants.find(l => l.id === 'selene');
                if (sel) sel.devotion = Math.min(100, sel.devotion + 15);
            }
            if (node.narrative.includes('Devotion to all lieutenants')) {
                this.character.lieutenants.forEach(l => l.devotion = Math.min(100, l.devotion + 20));
            }
            if (node.narrative.includes('Restored to full vigor')) {
                this.character.woundsCurrent = this.character.woundsMax;
            }
        }

        // Handle Loot drop if node gives one
        if (node.loot && !node.lootClaimed) {
            this.character.inventory.push(JSON.parse(JSON.stringify(node.loot.item)));
            node.lootClaimed = true;
            this.renderInventory();
        }

        // Handle Combat HUD
        if (node.combat) {
            this.currentCombat = JSON.parse(JSON.stringify(node.combat));
            this.combatHudEl.style.display = 'block';
            this.renderCombatHud();
            this.renderCombatOptions();
        } else {
            this.combatHudEl.style.display = 'none';
            this.currentCombat = null;
            this.renderStandardOptions(node.options || []);
        }

        this.renderCharacterPanel();
        this.saveGame();
    }

    renderCombatHud() {
        if (!this.currentCombat) return;
        this.enemyNameEl.textContent = this.currentCombat.enemyName;
        this.enemyHpCurrentEl.textContent = Math.max(0, this.currentCombat.enemyHp);
        this.enemyHpMaxEl.textContent = this.currentCombat.enemyMaxHp;
        this.enemyQuoteEl.textContent = this.currentCombat.quote || '';

        const enemyPercent = Math.max(0, Math.min(100, (this.currentCombat.enemyHp / this.currentCombat.enemyMaxHp) * 100));
        this.enemyHpFillEl.style.width = `${enemyPercent}%`;
    }

    renderCombatOptions() {
        this.optionsContainerEl.innerHTML = '';

        // Weapon attack options
        const weapons = this.character.inventory.filter(i => i.type === 'ranged' || i.type === 'melee');
        weapons.forEach(w => {
            const btn = document.createElement('button');
            btn.className = 'tactical-choice-btn';
            const statUsed = w.type === 'ranged' ? 'bs' : 'ws';
            const statVal = this.character.stats[statUsed];

            btn.innerHTML = `
                <span>⚔ Strike with <strong>${w.name}</strong> (${w.damage}, Pen ${w.pen})</span>
                <span class="stat-preview">${statUsed.toUpperCase()} ${statVal}%</span>
            `;

            btn.addEventListener('click', () => {
                this.executePlayerAttack(w);
            });

            this.optionsContainerEl.appendChild(btn);
        });

        // Lieutenant Assist Option if Primarch
        if (this.character.isPrimarch) {
            const ltBtn = document.createElement('button');
            ltBtn.className = 'tactical-choice-btn';
            ltBtn.innerHTML = `
                <span>♥ Command First Captain Valerie to Cleave Enemy Flank</span>
                <span class="stat-preview">DEVOTION STRIKE</span>
            `;
            ltBtn.addEventListener('click', () => {
                this.executeLieutenantAssist();
            });
            this.optionsContainerEl.appendChild(ltBtn);
        }

        // Defensive Evasion option
        const evadeBtn = document.createElement('button');
        evadeBtn.className = 'tactical-choice-btn';
        evadeBtn.innerHTML = `
            <span>🛡 Evasive Maneuver / Demigod Shielding (Agility)</span>
            <span class="stat-preview">AG ${this.character.stats.ag}%</span>
        `;
        evadeBtn.addEventListener('click', () => {
            this.executeEvade();
        });
        this.optionsContainerEl.appendChild(evadeBtn);
    }

    renderStandardOptions(options) {
        this.optionsContainerEl.innerHTML = '';
        if (options.length === 0) {
            // Victory or Terminal state
            const finishBtn = document.createElement('button');
            finishBtn.className = 'tactical-choice-btn';
            finishBtn.innerHTML = `<span>⚔ Start a New Saga / Forge New Character</span>`;
            finishBtn.addEventListener('click', () => {
                localStorage.removeItem('grimdark_rpg_save');
                location.reload();
            });
            this.optionsContainerEl.appendChild(finishBtn);
            return;
        }

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'tactical-choice-btn';

            let previewText = '';
            if (opt.actionType === 'check') {
                const statVal = this.character.stats[opt.stat] + (opt.modifier || 0);
                previewText = `${opt.stat.toUpperCase()} ${statVal}%`;
            } else if (opt.actionType === 'fate_miracle') {
                previewText = 'BURN 1 FATE';
            } else {
                previewText = 'CONTINUE';
            }

            btn.innerHTML = `
                <span>${opt.label}</span>
                <span class="stat-preview">${previewText}</span>
            `;

            btn.addEventListener('click', () => {
                this.handleOptionSelect(opt);
            });

            this.optionsContainerEl.appendChild(btn);
        });
    }

    handleOptionSelect(opt) {
        window.soundEngine.playClick();

        if (opt.actionType === 'advance') {
            this.currentNode = opt.nextNode;
            this.renderStoryNode();
            return;
        }

        if (opt.actionType === 'fate_miracle') {
            if (this.character.fatePoints > 0) {
                this.character.fatePoints -= 1;
                window.soundEngine.playSuccess();
                this.currentNode = opt.nextNode;
                this.renderCharacterPanel();
                this.renderStoryNode();
            } else {
                alert("You have no Fate Points remaining to manifest a miracle!");
            }
            return;
        }

        if (opt.actionType === 'check') {
            const statVal = this.character.stats[opt.stat];
            const mod = opt.modifier || 0;
            const res = WarhammerRules.testSkill(statVal, mod);

            this.displayDiceResult(res, `${WarhammerRules.STAT_NAMES[opt.stat].name} Test`);

            if (res.isSuccess) {
                window.soundEngine.playSuccess();
                this.currentNode = opt.successNode;
            } else {
                window.soundEngine.playFailure();
                this.currentNode = opt.failNode;
            }

            setTimeout(() => {
                this.renderCharacterPanel();
                this.renderStoryNode();
            }, 800);
        }
    }

    executePlayerAttack(weapon) {
        const statUsed = weapon.type === 'ranged' ? 'bs' : 'ws';
        const statVal = this.character.stats[statUsed];
        const res = WarhammerRules.testSkill(statVal, 0);

        if (weapon.type === 'ranged') {
            window.soundEngine.playGunshot();
        } else {
            window.soundEngine.playChainsword();
        }

        this.displayDiceResult(res, `${weapon.name} Attack Roll`);

        if (res.isSuccess) {
            const dmgInfo = WarhammerRules.calculateDamage(weapon, {
                t: this.currentCombat.t,
                armorVal: this.currentCombat.armorVal
            }, res.roll);

            this.currentCombat.enemyHp -= dmgInfo.effectiveDamage;
            this.appendCombatNarrative(
                `Direct hit to ${dmgInfo.hitLocation.name}! Dealt ${dmgInfo.effectiveDamage} wounds (Raw: ${dmgInfo.rawDamage} vs Soak: ${dmgInfo.totalSoak}).`
            );

            if (this.currentCombat.enemyHp <= 0) {
                window.soundEngine.playSuccess();
                this.appendCombatNarrative(`☠ ${this.currentCombat.enemyName} is ANNIHILATED! Your glory reigns supreme.`);
                setTimeout(() => {
                    this.currentNode = this.currentCombat.onDefeatNode;
                    this.currentCombat = null;
                    this.renderStoryNode();
                }, 1400);
                return;
            }
        } else {
            this.appendCombatNarrative(`Your strike with ${weapon.name} misses or glance off heavy armor!`);
        }

        // Enemy Counter Attack
        setTimeout(() => {
            this.executeEnemyRetaliation();
        }, 1000);
    }

    executeLieutenantAssist() {
        window.soundEngine.playChainsword();
        const valerie = this.character.lieutenants ? this.character.lieutenants.find(l => l.id === 'valerie') : null;
        const assistDmg = 12 + WarhammerRules.rollD10();

        this.currentCombat.enemyHp -= assistDmg;
        this.appendCombatNarrative(
            `♥ First Captain Valerie leaps forward with a battle cry: "FOR MY PRIMARCH'S HONOR!" Her dual power-glaives decapitate the enemy vanguard for ${assistDmg} devastating damage!`
        );

        if (this.currentCombat.enemyHp <= 0) {
            window.soundEngine.playSuccess();
            this.appendCombatNarrative(`☠ ${this.currentCombat.enemyName} falls, shredded by Valerie's righteous fury!`);
            setTimeout(() => {
                this.currentNode = this.currentCombat.onDefeatNode;
                this.currentCombat = null;
                this.renderStoryNode();
            }, 1400);
            return;
        }

        setTimeout(() => {
            this.executeEnemyRetaliation();
        }, 1000);
    }

    executeEvade() {
        window.soundEngine.playDiceRoll();
        const res = WarhammerRules.testSkill(this.character.stats.ag, 10);
        this.displayDiceResult(res, "Agility Evasion Test");

        if (res.isSuccess) {
            window.soundEngine.playSuccess();
            this.appendCombatNarrative(`You glide across the field with demigod grace, effortlessly dodging the incoming attack!`);
        } else {
            window.soundEngine.playFailure();
            this.appendCombatNarrative(`Your footing slips slightly on the blood-slick deck!`);
            this.executeEnemyRetaliation();
        }
    }

    executeEnemyRetaliation() {
        if (!this.currentCombat || this.currentCombat.enemyHp <= 0) return;

        const atkRoll = WarhammerRules.rollD100();
        const isHit = atkRoll <= this.currentCombat.attackRoll;

        if (isHit) {
            const enemyWep = this.currentCombat.weapon || { name: 'Vicious Strike', damage: '1d10+3', pen: 1 };
            const dmgInfo = WarhammerRules.calculateDamage(enemyWep, {
                t: this.character.stats.t,
                armor: this.character.armor
            }, atkRoll);

            this.character.woundsCurrent = Math.max(0, this.character.woundsCurrent - dmgInfo.effectiveDamage);
            window.soundEngine.playFailure();

            let injuryDetail = '';
            if (this.character.woundsCurrent === 0) {
                injuryDetail = WarhammerRules.getCriticalInjury(dmgInfo.effectiveDamage, dmgInfo.hitLocation.name);
            }

            this.appendCombatNarrative(
                `⚠ ${this.currentCombat.enemyName} attacks with ${enemyWep.name}! Struck your ${dmgInfo.hitLocation.name} for ${dmgInfo.effectiveDamage} Wounds! ${injuryDetail}`
            );

            this.renderCharacterPanel();
            this.renderCombatHud();

            if (this.character.woundsCurrent === 0) {
                this.handlePlayerCriticalState();
            }
        } else {
            this.appendCombatNarrative(`${this.currentCombat.enemyName}'s counter-attack strikes wide, unable to penetrate your demigod aura!`);
            this.renderCombatHud();
        }
    }

    handlePlayerCriticalState() {
        if (this.character.fatePoints > 0) {
            alert("CRITICAL DAMAGE SUSTAINED! A thread of your divine Fate burned automatically to shield your soul from death!");
            this.character.fatePoints -= 1;
            this.character.woundsCurrent = 5;
            this.renderCharacterPanel();
        } else {
            alert("YOUR WOUNDS ARE FATAL! The grim darkness claims another soul. The galaxy weeps.");
            localStorage.removeItem('grimdark_rpg_save');
            location.reload();
        }
    }

    appendCombatNarrative(text) {
        this.narrativeTextEl.textContent += `\n\n> ${text}`;
        const viewport = document.querySelector('.terminal-viewport');
        viewport.scrollTop = viewport.scrollHeight;
    }

    displayDiceResult(result, label = "D100 Check") {
        this.lastRoll = result;
        const digits = result.roll.toString().padStart(2, '0');
        this.diceDigitsEl.textContent = digits;
        this.diceDigitsEl.className = `dice-digits ${result.isSuccess ? 'success' : 'failure'}`;

        this.diceLabelEl.textContent = label;
        this.diceFormulaEl.textContent = `Rolled ${result.roll} vs Target ${result.target} (${result.summary})`;

        const hitLoc = WarhammerRules.getHitLocation(result.roll);
        this.hitLocationBadgeEl.textContent = `Hit Location: ${hitLoc.name}`;

        if (!result.isSuccess && this.character.fatePoints > 0) {
            this.fateRerollBtnEl.style.display = 'block';
            this.fateRerollBtnEl.textContent = `Spend 1 Fate Point to Reroll (Remaining: ${this.character.fatePoints})`;
        } else {
            this.fateRerollBtnEl.style.display = 'none';
        }

        this.diceHistory.unshift({
            label,
            roll: result.roll,
            target: result.target,
            isSuccess: result.isSuccess
        });
        if (this.diceHistory.length > 20) this.diceHistory.pop();
        this.renderDiceHistory();
    }

    handleFateReroll() {
        if (!this.lastRoll || this.character.fatePoints <= 0) return;
        this.character.fatePoints -= 1;
        window.soundEngine.playDiceRoll();

        const statTarget = this.lastRoll.target;
        const newRes = WarhammerRules.testSkill(statTarget, 0);

        this.appendCombatNarrative(`Divine Fate invoked! Rerolled D100.`);
        this.displayDiceResult(newRes, "Fate Reroll");

        if (newRes.isSuccess) {
            window.soundEngine.playSuccess();
        } else {
            window.soundEngine.playFailure();
        }

        this.renderCharacterPanel();
        this.saveGame();
    }

    renderDiceHistory() {
        this.diceHistoryEl.innerHTML = '';
        this.diceHistory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <span>${item.label}:</span>
                <strong style="color: ${item.isSuccess ? 'var(--terminal-green)' : 'var(--crimson-bright)'}">
                    ${item.roll} / ${item.target}
                </strong>
            `;
            this.diceHistoryEl.appendChild(div);
        });
    }

    renderInventory() {
        if (!this.character || !this.character.inventory) return;
        this.inventoryListEl.innerHTML = '';

        this.character.inventory.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';

            let actionButtons = '';
            if (item.type === 'consumable') {
                actionButtons = `<button class="item-btn use-btn" data-id="${item.id}">Use (Heal)</button>`;
            }

            card.innerHTML = `
                <div class="item-top">
                    <span class="item-name">${item.name}</span>
                    <span class="item-type-badge">${item.type.toUpperCase()}</span>
                </div>
                <div class="item-stats">${item.damage ? `Dmg: ${item.damage} | Pen: ${item.pen}` : item.desc}</div>
                <div class="item-actions">${actionButtons}</div>
            `;

            const useBtn = card.querySelector('.use-btn');
            if (useBtn) {
                useBtn.addEventListener('click', () => {
                    this.useConsumable(item);
                });
            }

            this.inventoryListEl.appendChild(card);
        });
    }

    useConsumable(item) {
        if (item.heals && this.character.woundsCurrent < this.character.woundsMax) {
            this.character.woundsCurrent = Math.min(this.character.woundsMax, this.character.woundsCurrent + item.heals);
            window.soundEngine.playSuccess();
            item.count = (item.count || 1) - 1;
            if (item.count <= 0) {
                this.character.inventory = this.character.inventory.filter(i => i.id !== item.id);
            }
            this.appendCombatNarrative(`Administered ${item.name}. Restored ${item.heals} wounds!`);
            this.renderCharacterPanel();
            this.renderInventory();
            this.saveGame();
        } else {
            alert("Wounds are already at maximum capacity.");
        }
    }

    // Freeform Roleplay Action NLP Parser with Primarch & Lieutenant Support
    handleFreeformAction() {
        const text = this.freeformInputEl.value.trim();
        if (!text) return;
        this.freeformInputEl.value = '';

        window.soundEngine.playClick();

        const lower = text.toLowerCase();
        let statKey = 'wp';
        let actionDesc = 'Custom Action';

        if (lower.match(/shoot|fire|blast|aim|gun|bolt|rifle|laser|snipe|plasma/)) {
            statKey = 'bs';
            actionDesc = 'Ranged Weapon Maneuver';
        } else if (lower.match(/strike|slash|stab|sword|blade|axe|punch|kick|melee|charge|parry|glaive|cleave/)) {
            statKey = 'ws';
            actionDesc = 'Melee Combat Feat';
        } else if (lower.match(/dodge|jump|sprint|climb|dive|roll|evade|leap|vault|tumble/)) {
            statKey = 'ag';
            actionDesc = 'Acrobatic / Evasion Action';
        } else if (lower.match(/hack|terminal|cogitator|scan|tech|analyze|machine|wire|overload|logic/)) {
            statKey = 'int';
            actionDesc = 'Tech-Use / Tactical Logic';
        } else if (lower.match(/spot|look|search|listen|notice|investigate|auspex|inspect/)) {
            statKey = 'per';
            actionDesc = 'Sensory Perception Check';
        } else if (lower.match(/pray|chant|litany|resist|will|faith|emperor|endure|stand|psychic|warp/)) {
            statKey = 'wp';
            actionDesc = 'Willpower / Demigod Conviction';
        } else if (lower.match(/persuade|threaten|interrogate|command|order|talk|deceive|bribe|kiss|embrace|love|caress/)) {
            statKey = 'fel';
            actionDesc = 'Charisma / Command & Intimacy';
        }

        const statVal = this.character.stats[statKey] || 50;
        const res = WarhammerRules.testSkill(statVal, 0);

        this.displayDiceResult(res, `Action: "${actionDesc}"`);

        // Check for lieutenant involvement
        let lieutenantNote = '';
        if (this.character.isPrimarch && this.character.lieutenants) {
            if (lower.includes('valerie')) {
                const val = this.character.lieutenants.find(l => l.id === 'valerie');
                if (val) val.devotion = Math.min(100, val.devotion + 2);
                lieutenantNote = `\n♥ First Captain Valerie fights at your side, her golden eyes glowing with devotion!`;
            } else if (lower.includes('morgana')) {
                const mor = this.character.lieutenants.find(l => l.id === 'morgana');
                if (mor) mor.devotion = Math.min(100, mor.devotion + 2);
                lieutenantNote = `\n🔮 Chief Librarian Morgana's psychic mind touches yours in loving harmony!`;
            } else if (lower.includes('selene')) {
                const sel = this.character.lieutenants.find(l => l.id === 'selene');
                if (sel) sel.devotion = Math.min(100, sel.devotion + 2);
                lieutenantNote = `\n🌿 Chief Apothecary Selene watches over your vessel with tender dedication!`;
            }
        }

        let outcomeText = '';
        if (res.isSuccess) {
            window.soundEngine.playSuccess();
            outcomeText = `[ROLEPLAY EXECUTION - SUCCESS (${res.degrees} DoS)]\n"${text}"\n\nYou execute the action with majestic authority! The battlefield bends to your will.`;
            if (this.currentCombat) {
                const bonusDmg = 8 + res.degrees * 3;
                this.currentCombat.enemyHp -= bonusDmg;
                outcomeText += ` Your sovereign display dealt ${bonusDmg} tactical damage to ${this.currentCombat.enemyName}!`;
                if (this.currentCombat.enemyHp <= 0) {
                    outcomeText += ` The attack destroys the enemy completely!`;
                    setTimeout(() => {
                        this.currentNode = this.currentCombat.onDefeatNode;
                        this.currentCombat = null;
                        this.renderStoryNode();
                    }, 1500);
                }
            }
        } else {
            window.soundEngine.playFailure();
            outcomeText = `[ROLEPLAY EXECUTION - FAILURE (${res.degrees} DoF)]\n"${text}"\n\nHostile resistance momentarily parries your intent!`;
            if (this.currentCombat) {
                outcomeText += ` ${this.currentCombat.enemyName} attempts a desperate counter-assault!`;
                this.executeEnemyRetaliation();
            }
        }

        this.appendCombatNarrative(outcomeText + lieutenantNote);
        this.renderCharacterPanel();
        this.saveGame();
    }

    toggleCampaignModal() {
        if (confirm("Open Character Creation to switch between 'The Lost Primarch' and 'Sector 44'?")) {
            this.showCharacterCreator();
        }
    }

    toggleUniverse() {
        if (this.universe === 'warhammer') {
            if (confirm("Switch to FATE / HOLY GRAIL WAR Mode? (Explore Servants, Command Seals, and Noble Phantasms)")) {
                this.universe = 'fate';
                this.themeBtnEl.innerHTML = '<span>🔮</span> Universe: FATE / GRAIL';
                this.loadFatePreview();
            }
        } else {
            this.universe = 'warhammer';
            this.themeBtnEl.innerHTML = '<span>🦅</span> Universe: WARHAMMER 40K';
            this.loadSavedGame();
        }
    }

    loadFatePreview() {
        this.chapterTitleEl.textContent = "Prologue: Fuyuki City Midnight";
        this.chapterActEl.textContent = "Act 0 - The Summoning Ritual";
        this.atmosphereTextEl.textContent = "Cold winter wind, scent of sulfur, leyline mana humming beneath the basement stones.";
        this.narrativeTextEl.textContent = `[FATE / HOLY GRAIL WAR MODULE LOADED]
        
The three Command Seals burn crimson upon the back of your right hand. 
        
Before you on the stone floor, the summoning circle drawn in melted silver and rooster's blood flares with brilliant azure prana. 
        
The wind howls inside the enclosed magus workshop. From within the blinding vortex of mana, a heroic spirit materializes clad in silver armor, holding an invisible blade.
        
Crimson eyes gaze into your soul:
*"I ask of you: Are you my Master?"*`;

        this.combatHudEl.style.display = 'none';
        this.optionsContainerEl.innerHTML = `
            <button class="tactical-choice-btn" onclick="alert('Command Seal recognized! Servant SABER joins your retinue with Noble Phantasm: Excalibur.')">
                <span>"I am your Master. Stand with me in this Holy Grail War."</span>
                <span class="stat-preview">COMMAND SEALS: 3</span>
            </button>
            <button class="tactical-choice-btn" onclick="alert('Tactical analysis: Servant stats revealed. Noble Phantasm rank A++.')">
                <span>Inspect Servant Parameters with Structural Grasps (Reinforcement Magecraft)</span>
                <span class="stat-preview">PRANA 100%</span>
            </button>
        `;
    }

    initSecurityGate() {
        const savedPass = localStorage.getItem('inquisitorial_passcode') || 'primarch';
        const isUnlocked = localStorage.getItem('inquisitorial_unlocked') === 'true';

        if (isUnlocked) {
            this.lockGateBackdropEl.style.display = 'none';
        } else {
            this.lockGateBackdropEl.style.display = 'flex';
            setTimeout(() => this.gatePassInputEl.focus(), 200);
        }

        const handleAuth = () => {
            const entered = this.gatePassInputEl.value.trim();
            const currentPass = localStorage.getItem('inquisitorial_passcode') || 'primarch';

            if (entered.toLowerCase() === currentPass.toLowerCase()) {
                window.soundEngine.playSuccess();
                localStorage.setItem('inquisitorial_unlocked', 'true');
                this.lockErrorMsgEl.textContent = '';
                this.gatePassInputEl.value = '';
                this.lockGateBackdropEl.style.display = 'none';
            } else {
                window.soundEngine.playFailure();
                this.lockErrorMsgEl.textContent = '☠ ACCESS DENIED // INVALID CLEARANCE CIPHER';
                this.gatePassInputEl.value = '';
                this.gatePassInputEl.focus();
            }
        };

        this.gateUnlockBtnEl.addEventListener('click', handleAuth);
        this.gatePassInputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleAuth();
        });

        // Lock button in header
        this.lockBtnEl.addEventListener('click', () => {
            localStorage.removeItem('inquisitorial_unlocked');
            this.lockGateBackdropEl.style.display = 'flex';
            this.lockErrorMsgEl.textContent = '';
            window.soundEngine.playConfirm();
            setTimeout(() => this.gatePassInputEl.focus(), 200);
        });

        // Set / Change Password in header
        this.changePassBtnEl.addEventListener('click', () => {
            const newPass = prompt("Set New Inquisitorial Security Password (Leave blank to keep current):");
            if (newPass && newPass.trim().length > 0) {
                localStorage.setItem('inquisitorial_passcode', newPass.trim());
                alert(`Security Passcode updated! Your new password is: ${newPass.trim()}`);
            }
        });
    }

    initMobileNav() {
        if (!this.mobileNavEl) return;
        this.mainWrapperEl.classList.add('mobile-tab-mission');

        const tabs = this.mobileNavEl.querySelectorAll('.mobile-tab-btn');
        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const tabName = btn.dataset.tab;
                this.mainWrapperEl.classList.remove('mobile-tab-mission', 'mobile-tab-dossier', 'mobile-tab-dice', 'mobile-tab-gear');
                this.mainWrapperEl.classList.add(`mobile-tab-${tabName}`);

                window.soundEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    findNode(id) {
        return this.currentCampaign.chapters.find(c => c.id === id);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new GrimdarkRPGApp();
});
