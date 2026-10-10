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

        // Cloud Database Sync (Supabase)
        this.cloudDb = window.CloudDatabaseManager ? new window.CloudDatabaseManager() : null;

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

        // Vox Narration and Scene Frame
        this.voxBarEl = document.getElementById('vox-bar');
        this.voxReadBtnEl = document.getElementById('vox-read-btn');
        this.voxPauseBtnEl = document.getElementById('vox-pause-btn');
        this.voxStopBtnEl = document.getElementById('vox-stop-btn');
        this.voxVoiceSelectEl = document.getElementById('vox-voice-select');
        this.voxGenderBtnEl = document.getElementById('vox-gender-btn');
        this.voxAutoToggleEl = document.getElementById('vox-auto-toggle');
        this.voxEqualizerEl = document.getElementById('vox-equalizer');
        this.tacticalSceneFrameEl = document.getElementById('tactical-scene-frame');

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
        this.realmHubBtnEl = document.getElementById('realm-hub-btn');
        this.companionsModalBtnEl = document.getElementById('companions-modal-btn');
        this.companionCountBadgeEl = document.getElementById('companion-count-badge');
        this.campaignSelectBtnEl = document.getElementById('campaign-select-btn');
        this.audioBtnEl = document.getElementById('audio-btn');
        this.ambientBtnEl = document.getElementById('ambient-btn');
        this.resetBtnEl = document.getElementById('reset-btn');
        this.saveBtnEl = document.getElementById('save-btn');

        // Dynamic Panel Titles & Lore Labels across realms
        this.dossierIconEl = document.getElementById('dossier-icon');
        this.dossierPanelTitleEl = document.getElementById('dossier-panel-title');
        this.vitalHpLabelEl = document.getElementById('vital-hp-label');
        this.vitalFateLabelEl = document.getElementById('vital-fate-label');
        this.vitalInsanityLabelEl = document.getElementById('vital-insanity-label');
        this.vitalCorruptionLabelEl = document.getElementById('vital-corruption-label');
        this.statMatrixHeadingEl = document.getElementById('stat-matrix-heading');
        this.armorMatrixHeadingEl = document.getElementById('armor-matrix-heading');
        this.terminalScreenIconEl = document.getElementById('terminal-screen-icon');
        this.terminalScreenTitleEl = document.getElementById('terminal-screen-title');
        this.voxIconEl = document.getElementById('vox-icon');
        this.voxLabelEl = document.getElementById('vox-label');
        this.dicePanelIconEl = document.getElementById('dice-panel-icon');
        this.dicePanelTitleEl = document.getElementById('dice-panel-title');
        this.recentCogitationsLabelEl = document.getElementById('recent-cogitations-label');
        this.gearPanelIconEl = document.getElementById('gear-panel-icon');
        this.gearPanelTitleEl = document.getElementById('gear-panel-title');

        // Realm Hub Start Menu Modal
        this.universeMenuBackdropEl = document.getElementById('universe-menu-backdrop');

        // Companions Modal
        this.companionsModalEl = document.getElementById('companions-modal');
        this.companionsCloseBtnEl = document.getElementById('companions-close-btn');
        this.companionsGridEl = document.getElementById('companions-grid');
        this.countAllEl = document.getElementById('count-all');
        this.countAlliesEl = document.getElementById('count-allies');
        this.countThrallsEl = document.getElementById('count-thralls');
        this.countCaptivesEl = document.getElementById('count-captives');
        this.inventoryListEl = document.getElementById('inventory-list');

        // Store Modal Elements
        this.storeModalBtnEl = document.getElementById('store-modal-btn');
        this.storeBtnLabelEl = document.getElementById('store-btn-label');
        this.storeModalEl = document.getElementById('store-modal');
        this.storeCloseBtnEl = document.getElementById('store-close-btn');
        this.storeModalTitleEl = document.getElementById('store-modal-title');
        this.storeModalDescEl = document.getElementById('store-modal-desc');
        this.storeMerchantBoxEl = document.getElementById('store-merchant-box');
        this.storePlayerFundsEl = document.getElementById('store-player-funds');
        this.storeCurrencySymbolEl = document.getElementById('store-currency-symbol');
        this.storeItemsGridEl = document.getElementById('store-items-grid');

        // Cloud Database Sync Modal Elements
        this.cloudModalBtnEl = document.getElementById('cloud-modal-btn');
        this.cloudModalEl = document.getElementById('cloud-modal');
        this.cloudCloseBtnEl = document.getElementById('cloud-close-btn');
        this.cloudStatusBadgeEl = document.getElementById('cloud-status-badge');
        this.cloudPlayerIdDisplayEl = document.getElementById('cloud-player-id-display');
        this.supabaseUrlInputEl = document.getElementById('supabase-url-input');
        this.supabaseKeyInputEl = document.getElementById('supabase-key-input');
        this.cloudConnectBtnEl = document.getElementById('cloud-connect-btn');
        this.cloudDisconnectBtnEl = document.getElementById('cloud-disconnect-btn');
        this.cloudUploadBtnEl = document.getElementById('cloud-upload-btn');
        this.cloudDownloadBtnEl = document.getElementById('cloud-download-btn');
        this.cloudFeedbackMsgEl = document.getElementById('cloud-feedback-msg');

        // Dynamic Creator Elements
        this.creatorModalTitleEl = document.getElementById('creator-modal-title');
        this.creatorModalSubEl = document.getElementById('creator-modal-sub');
        this.creatorModeTabsEl = document.getElementById('creator-mode-tabs');
    }

    bindEvents() {
        this.initSecurityGate();
        this.initMobileNav();
        this.initVoxNarrator();

        if (this.saveBtnEl) {
            this.saveBtnEl.addEventListener('click', () => {
                this.saveGame();
                window.soundEngine.playSuccess();
                const orig = this.saveBtnEl.innerHTML;
                this.saveBtnEl.innerHTML = '<span>✔</span> SAVED!';
                this.saveBtnEl.style.color = '#4ade80';
                this.saveBtnEl.style.borderColor = '#22c55e';
                setTimeout(() => {
                    this.saveBtnEl.innerHTML = orig;
                    this.saveBtnEl.style.color = '';
                    this.saveBtnEl.style.borderColor = '';
                }, 1500);
            });
        }

        if (this.executeActionBtnEl) {
            this.executeActionBtnEl.addEventListener('click', () => this.handleFreeformAction());
        }
        if (this.freeformInputEl) {
            this.freeformInputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.handleFreeformAction();
            });
        }

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

        // Realm Hub and Companions Modal
        if (this.realmHubBtnEl) {
            this.realmHubBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.showRealmHub();
            });
        }

        if (this.companionsModalBtnEl) {
            this.companionsModalBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.showCompanionsModal();
            });
        }

        if (this.companionsCloseBtnEl) {
            this.companionsCloseBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.companionsModalEl.style.display = 'none';
            });
        }

        // Realm Store Modal events
        if (this.storeModalBtnEl) {
            this.storeModalBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.showStoreModal();
            });
        }

        if (this.storeCloseBtnEl) {
            this.storeCloseBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.storeModalEl.style.display = 'none';
            });
        }

        // Cloud Database Sync Modal events
        if (this.cloudModalBtnEl) {
            this.cloudModalBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.showCloudModal();
            });
        }

        if (this.cloudCloseBtnEl) {
            this.cloudCloseBtnEl.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.cloudModalEl.style.display = 'none';
            });
        }

        if (this.cloudConnectBtnEl) {
            this.cloudConnectBtnEl.addEventListener('click', () => {
                const url = this.supabaseUrlInputEl.value.trim();
                const key = this.supabaseKeyInputEl.value.trim();
                if (!url || !key) {
                    alert("Please enter both your Supabase Project URL and Anon API Key.");
                    return;
                }
                const success = this.cloudDb.setCredentials(url, key);
                this.updateCloudUI();
                if (success) {
                    window.soundEngine.playSuccess();
                    this.cloudFeedbackMsgEl.textContent = "✔ Supabase connected successfully!";
                    this.cloudFeedbackMsgEl.style.color = "#4ade80";
                } else {
                    window.soundEngine.playFailure();
                    this.cloudFeedbackMsgEl.textContent = "✖ Connection failed. Check your Supabase credentials.";
                    this.cloudFeedbackMsgEl.style.color = "#f87171";
                }
            });
        }

        if (this.cloudDisconnectBtnEl) {
            this.cloudDisconnectBtnEl.addEventListener('click', () => {
                this.cloudDb.setCredentials('', '');
                this.updateCloudUI();
                window.soundEngine.playClick();
                this.cloudFeedbackMsgEl.textContent = "Disconnected from cloud. Using local storage.";
                this.cloudFeedbackMsgEl.style.color = "var(--text-muted)";
            });
        }

        if (this.cloudUploadBtnEl) {
            this.cloudUploadBtnEl.addEventListener('click', async () => {
                const uniKey = this.universe || 'warhammer';
                const currentData = {
                    universe: uniKey,
                    character: this.character,
                    campaignId: this.campaignId,
                    currentNode: this.currentNode,
                    currentCombat: this.currentCombat,
                    diceHistory: this.diceHistory
                };
                this.cloudFeedbackMsgEl.textContent = "Uploading save to Supabase...";
                this.cloudFeedbackMsgEl.style.color = "var(--amber-vox)";
                const res = await this.cloudDb.saveToCloud(uniKey, currentData);
                if (res.success) {
                    window.soundEngine.playSuccess();
                    this.cloudFeedbackMsgEl.textContent = `✔ Successfully backed up ${uniKey.toUpperCase()} save to Supabase!`;
                    this.cloudFeedbackMsgEl.style.color = "#4ade80";
                } else {
                    window.soundEngine.playFailure();
                    this.cloudFeedbackMsgEl.textContent = `✖ Upload failed: ${res.error || res.reason}`;
                    this.cloudFeedbackMsgEl.style.color = "#f87171";
                }
            });
        }

        if (this.cloudDownloadBtnEl) {
            this.cloudDownloadBtnEl.addEventListener('click', async () => {
                const uniKey = this.universe || 'warhammer';
                this.cloudFeedbackMsgEl.textContent = "Fetching save from Supabase...";
                this.cloudFeedbackMsgEl.style.color = "var(--amber-vox)";
                const res = await this.cloudDb.loadFromCloud(uniKey);
                if (res.success && res.saveData) {
                    window.soundEngine.playSuccess();
                    this.character = res.saveData.character;
                    this.campaignId = res.saveData.campaignId;
                    this.currentNode = res.saveData.currentNode;
                    this.currentCombat = res.saveData.currentCombat;
                    this.diceHistory = res.saveData.diceHistory || [];
                    this.renderAll();
                    this.saveGame();
                    this.cloudFeedbackMsgEl.textContent = `✔ Successfully synced ${uniKey.toUpperCase()} progress from Cloud!`;
                    this.cloudFeedbackMsgEl.style.color = "#4ade80";
                } else {
                    window.soundEngine.playFailure();
                    this.cloudFeedbackMsgEl.textContent = res.notFound ? `No cloud save found for ${uniKey.toUpperCase()}.` : `✖ Download failed: ${res.error || res.reason}`;
                    this.cloudFeedbackMsgEl.style.color = "#f87171";
                }
            });
        }

        // Realm Hub Select buttons
        document.querySelectorAll('.select-realm-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const realm = e.currentTarget.dataset.realm || 'warhammer';
                this.switchUniverse(realm);
                if (this.universeMenuBackdropEl) this.universeMenuBackdropEl.style.display = 'none';
            });
        });

        // Companion Filter Tabs
        [
            { btn: this.filterAllBtnEl, filter: 'all' },
            { btn: this.filterAlliesBtnEl, filter: 'allies' },
            { btn: this.filterThrallsBtnEl, filter: 'thralls' },
            { btn: this.filterCaptivesBtnEl, filter: 'captives' }
        ].forEach(({ btn, filter }) => {
            if (btn) {
                btn.addEventListener('click', () => {
                    [this.filterAllBtnEl, this.filterAlliesBtnEl, this.filterThrallsBtnEl, this.filterCaptivesBtnEl].forEach(b => b && b.classList.remove('active'));
                    btn.classList.add('active');
                    this.renderCompanionsList(filter);
                    window.soundEngine.playClick();
                });
            }
        });

        this.rollStatsBtnEl.addEventListener('click', () => {
            this.rollRandomPrimarchStats();
        });
    }

    loadSavedGame() {
        const uniKey = this.universe || 'warhammer';
        const saved = localStorage.getItem(`rpg_save_${uniKey}`) || (uniKey === 'warhammer' ? localStorage.getItem('grimdark_rpg_save') : null);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.character = data.character;
                this.universe = data.universe || uniKey;
                this.campaignId = data.campaignId;
                
                if (this.universe === 'fate') {
                    this.currentCampaign = FateCampaignData.CAMPAIGN;
                    if (!this.campaignId) this.campaignId = 'fate_fuyuki_war';
                } else if (this.universe === 'onepiece') {
                    this.currentCampaign = OnePieceCampaignData.CAMPAIGN;
                    if (!this.campaignId) this.campaignId = 'onepiece_grand_line';
                } else {
                    if (!this.campaignId) this.campaignId = this.character && this.character.isPrimarch ? 'lost_primarch' : 'sector_44';
                    this.currentCampaign = this.campaignId === 'lost_primarch' 
                        ? WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN 
                        : WarhammerCampaignData.CAMPAIGN;
                }

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
        const uniKey = this.universe || 'warhammer';
        const data = {
            universe: uniKey,
            character: this.character,
            campaignId: this.campaignId,
            currentNode: this.currentNode,
            currentCombat: this.currentCombat,
            diceHistory: this.diceHistory
        };
        localStorage.setItem(`rpg_save_${uniKey}`, JSON.stringify(data));
        // Keep grimdark_rpg_save as fallback if in warhammer
        if (uniKey === 'warhammer') {
            localStorage.setItem('grimdark_rpg_save', JSON.stringify(data));
        }
    }

    updateHeaderTitles() {
        if (this.universe === 'fate') {
            this.headerTitleEl.textContent = "FATE/STAY NIGHT : 5TH HOLY GRAIL WAR";
            this.headerSubtitleEl.textContent = "FUYUKI MUNICIPALITY // CHALDEA COMMAND SYSTEM";
            if (this.campaignSelectBtnEl) this.campaignSelectBtnEl.innerHTML = '<span>🗡️</span> Campaign: FUYUKI GRAIL WAR';
            if (this.themeBtnEl) this.themeBtnEl.innerHTML = '<span>🔮</span> Universe: FATE / STAY NIGHT';
            if (this.storeBtnLabelEl) this.storeBtnLabelEl.textContent = "Mystic Workshop";
            
            // Adapt Panel Titles & Icons for Fate
            if (this.dossierIconEl) this.dossierIconEl.textContent = "✨";
            if (this.dossierPanelTitleEl) this.dossierPanelTitleEl.textContent = "MASTER & SERVANT RECORD";
            if (this.terminalScreenIconEl) this.terminalScreenIconEl.textContent = "🔮";
            if (this.terminalScreenTitleEl) this.terminalScreenTitleEl.textContent = "FUYUKI GRAIL WAR SITUATION";
            if (this.voxIconEl) this.voxIconEl.textContent = "🎙️";
            if (this.voxLabelEl) this.voxLabelEl.textContent = "CHALDEA GRAIL NARRATOR";
            if (this.dicePanelIconEl) this.dicePanelIconEl.textContent = "🎲";
            if (this.dicePanelTitleEl) this.dicePanelTitleEl.textContent = "CIRCUIT D100 CHECK";
            if (this.recentCogitationsLabelEl) this.recentCogitationsLabelEl.textContent = "Recent Magic Circuit Rolls:";
            if (this.gearPanelIconEl) this.gearPanelIconEl.textContent = "💎";
            if (this.gearPanelTitleEl) this.gearPanelTitleEl.textContent = "MYSTIC CODES & GEMS";
            if (this.statMatrixHeadingEl) this.statMatrixHeadingEl.textContent = "Servant Parameters (D100)";
            if (this.armorMatrixHeadingEl) this.armorMatrixHeadingEl.textContent = "Magic Resistance & Armor";

            const aquila = document.querySelector('.aquila-badge');
            if (aquila) aquila.textContent = "⚔️";
        } else if (this.universe === 'onepiece') {
            this.headerTitleEl.textContent = "ONE PIECE : GRAND LINE SOVEREIGN";
            this.headerSubtitleEl.textContent = "REVERSE MOUNTAIN TO NEW WORLD // 250,000,000 BOUNTY";
            if (this.campaignSelectBtnEl) this.campaignSelectBtnEl.innerHTML = '<span>🌊</span> Campaign: GRAND LINE SAGA';
            if (this.themeBtnEl) this.themeBtnEl.innerHTML = '<span>🏴‍☠️</span> Universe: ONE PIECE';
            if (this.storeBtnLabelEl) this.storeBtnLabelEl.textContent = "Pirate Bazaar";

            // Adapt Panel Titles & Icons for One Piece
            if (this.dossierIconEl) this.dossierIconEl.textContent = "🏴‍☠️";
            if (this.dossierPanelTitleEl) this.dossierPanelTitleEl.textContent = "PIRATE CAPTAIN LOG";
            if (this.terminalScreenIconEl) this.terminalScreenIconEl.textContent = "🧭";
            if (this.terminalScreenTitleEl) this.terminalScreenTitleEl.textContent = "GRAND LINE LOG POSE TELEMETRY";
            if (this.voxIconEl) this.voxIconEl.textContent = "🎙️";
            if (this.voxLabelEl) this.voxLabelEl.textContent = "TRANSPONDER SNAIL NARRATOR";
            if (this.dicePanelIconEl) this.dicePanelIconEl.textContent = "🎲";
            if (this.dicePanelTitleEl) this.dicePanelTitleEl.textContent = "HAKI CLASH D100";
            if (this.recentCogitationsLabelEl) this.recentCogitationsLabelEl.textContent = "Recent Haki & Clash Rolls:";
            if (this.gearPanelIconEl) this.gearPanelIconEl.textContent = "🗡️";
            if (this.gearPanelTitleEl) this.gearPanelTitleEl.textContent = "TREASURE & MEITO BLADES";
            if (this.statMatrixHeadingEl) this.statMatrixHeadingEl.textContent = "Pirate Capabilities & Haki";
            if (this.armorMatrixHeadingEl) this.armorMatrixHeadingEl.textContent = "Armament Haki Defense";

            const aquila = document.querySelector('.aquila-badge');
            if (aquila) aquila.textContent = "☠";
        } else {
            // Warhammer 40,000
            if (this.campaignId === 'lost_primarch') {
                this.headerTitleEl.textContent = "WARHAMMER 40,000 : THE LOST II LEGION";
                this.headerSubtitleEl.textContent = "DAUGHTERS OF THE ECLIPSE // SANCUS CRUCIBLE";
                if (this.campaignSelectBtnEl) this.campaignSelectBtnEl.innerHTML = '<span>👑</span> Campaign: LOST PRIMARCH';
            } else {
                this.headerTitleEl.textContent = "WARHAMMER 40,000 : ORDO HERETICUS";
                this.headerSubtitleEl.textContent = "TACTICAL D100 COGITATOR TERMINAL // SECTOR 44";
                if (this.campaignSelectBtnEl) this.campaignSelectBtnEl.innerHTML = '<span>📜</span> Campaign: SECTOR 44';
            }
            if (this.themeBtnEl) this.themeBtnEl.innerHTML = '<span>🦅</span> Universe: WARHAMMER 40K';
            if (this.storeBtnLabelEl) this.storeBtnLabelEl.textContent = "Armory Store";

            // Adapt Panel Titles & Icons for Warhammer 40k
            if (this.dossierIconEl) this.dossierIconEl.textContent = "📜";
            if (this.dossierPanelTitleEl) this.dossierPanelTitleEl.textContent = "CHARACTER DOSSIER";
            if (this.terminalScreenIconEl) this.terminalScreenIconEl.textContent = "📡";
            if (this.terminalScreenTitleEl) this.terminalScreenTitleEl.textContent = "TACTICAL SITUATION DISPLAY";
            if (this.voxIconEl) this.voxIconEl.textContent = "🎙️";
            if (this.voxLabelEl) this.voxLabelEl.textContent = "INQUISITORIAL VOX-NARRATOR";
            if (this.dicePanelIconEl) this.dicePanelIconEl.textContent = "🎲";
            if (this.dicePanelTitleEl) this.dicePanelTitleEl.textContent = "D100 COGITATOR";
            if (this.recentCogitationsLabelEl) this.recentCogitationsLabelEl.textContent = "Recent Cogitations:";
            if (this.gearPanelIconEl) this.gearPanelIconEl.textContent = "🎒";
            if (this.gearPanelTitleEl) this.gearPanelTitleEl.textContent = "GEAR & RELICS";
            if (this.statMatrixHeadingEl) this.statMatrixHeadingEl.textContent = "Characteristics (D100)";
            if (this.armorMatrixHeadingEl) this.armorMatrixHeadingEl.textContent = "Armor Soak by Location";

            const aquila = document.querySelector('.aquila-badge');
            if (aquila) aquila.textContent = "🦅";
        }
    }

    showCharacterCreator() {
        this.creatorModalEl.style.display = 'flex';
        const uni = this.universe || 'warhammer';

        if (uni === 'fate') {
            if (this.creatorModalTitleEl) this.creatorModalTitleEl.textContent = "🔮 FATE / STAY NIGHT : MASTER SELECTION 🔮";
            if (this.creatorModalSubEl) this.creatorModalSubEl.textContent = "Select your Master of the 5th Holy Grail War ritual in Fuyuki City.";
            if (this.creatorModeTabsEl) this.creatorModeTabsEl.style.display = 'none';
            if (this.tabPrimarchViewEl) this.tabPrimarchViewEl.style.display = 'none';
            if (this.tabAcolyteViewEl) this.tabAcolyteViewEl.style.display = 'block';
            this.renderFateMasterCards();
        } else if (uni === 'onepiece') {
            if (this.creatorModalTitleEl) this.creatorModalTitleEl.textContent = "🏴‍☠️ ONE PIECE : PIRATE CAPTAIN CREATION 🏴‍☠️";
            if (this.creatorModalSubEl) this.creatorModalSubEl.textContent = "Choose your Supernova Captain to set sail from Reverse Mountain across the Grand Line.";
            if (this.creatorModeTabsEl) this.creatorModeTabsEl.style.display = 'none';
            if (this.tabPrimarchViewEl) this.tabPrimarchViewEl.style.display = 'none';
            if (this.tabAcolyteViewEl) this.tabAcolyteViewEl.style.display = 'block';
            this.renderOnePieceCaptainCards();
        } else {
            // Warhammer 40K
            if (this.creatorModalTitleEl) this.creatorModalTitleEl.textContent = "⚔ WARHAMMER 40,000 : CHARACTER CREATION ⚔";
            if (this.creatorModalSubEl) this.creatorModalSubEl.textContent = "Forge your Acolyte or Awaken as the Lost Primarch of the II Legion.";
            if (this.creatorModeTabsEl) this.creatorModeTabsEl.style.display = 'flex';
            if (this.tabPrimarchBtnEl.classList.contains('active')) {
                this.tabPrimarchViewEl.style.display = 'block';
                this.tabAcolyteViewEl.style.display = 'none';
            } else {
                this.tabPrimarchViewEl.style.display = 'none';
                this.tabAcolyteViewEl.style.display = 'block';
            }
            this.renderPrimarchAspectCards();
            this.renderStatAllocator();
            this.renderAcolyteCards();
        }
    }

    renderFateMasterCards() {
        this.archetypeContainerEl.innerHTML = '';
        FateCampaignData.MASTERS.forEach((master, idx) => {
            const card = document.createElement('div');
            card.className = `archetype-card ${idx === 0 ? 'selected' : ''}`;
            card.dataset.id = master.id;

            card.innerHTML = `
                <div class="archetype-header">
                    <div class="archetype-name">${master.name}</div>
                    <div class="archetype-order">${master.order}</div>
                </div>
                <div class="archetype-quote">${master.quote}</div>
                <div class="archetype-highlights">
                    <div><strong>Title:</strong> ${master.title}</div>
                    <div><strong>Stats:</strong> STR ${master.stats.str} | END ${master.stats.end} | MANA ${master.stats.mana} | NP ${master.stats.np}</div>
                    <div><strong>HP:</strong> ${master.woundsMax} | <strong>Seals:</strong> ${master.commandSpells}</div>
                    <div><strong>Starting Mystic Code:</strong> ${master.inventory.map(i => i.name).slice(0, 2).join(', ')}</div>
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

    renderOnePieceCaptainCards() {
        this.archetypeContainerEl.innerHTML = '';
        OnePieceCampaignData.CAPTAINS.forEach((cap, idx) => {
            const card = document.createElement('div');
            card.className = `archetype-card ${idx === 0 ? 'selected' : ''}`;
            card.dataset.id = cap.id;

            card.innerHTML = `
                <div class="archetype-header">
                    <div class="archetype-name">${cap.name}</div>
                    <div class="archetype-order">${cap.order}</div>
                </div>
                <div class="archetype-quote">${cap.quote}</div>
                <div class="archetype-highlights">
                    <div><strong>Title:</strong> ${cap.title}</div>
                    <div><strong>Bounty:</strong> ฿${cap.bounty.toLocaleString()}</div>
                    <div><strong>Stats:</strong> Might ${cap.stats.might} | Agi ${cap.stats.agility} | Haki ${cap.stats.haoshoku}</div>
                    <div><strong>Gear:</strong> ${cap.inventory.map(i => i.name).slice(0, 2).join(', ')}</div>
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

        this.universe = 'warhammer';
        this.character = {
            id: 'custom_primarch',
            name: name,
            title: title,
            gender: gender,
            order: 'The II Legion: Daughters of the Eclipse',
            isPrimarch: true,
            funds: 1200,
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
        const selectedId = selected ? selected.dataset.id : null;
        const uni = this.universe || 'warhammer';

        if (uni === 'fate') {
            const template = FateCampaignData.MASTERS.find(m => m.id === selectedId) || FateCampaignData.MASTERS[0];
            this.character = JSON.parse(JSON.stringify(template));
            this.character.isFate = true;
            this.character.woundsCurrent = this.character.woundsMax;
            this.character.funds = 800;
            this.character.servant = FateCampaignData.SERVANTS[0];
            this.campaignId = 'fate_fuyuki_war';
            this.currentCampaign = FateCampaignData.CAMPAIGN;
            this.currentNode = 'fate_ch1_summoning';
        } else if (uni === 'onepiece') {
            const template = OnePieceCampaignData.CAPTAINS.find(c => c.id === selectedId) || OnePieceCampaignData.CAPTAINS[0];
            this.character = JSON.parse(JSON.stringify(template));
            this.character.isOnePiece = true;
            this.character.woundsCurrent = this.character.woundsMax;
            this.character.funds = 1500;
            this.character.crew = OnePieceCampaignData.CREW_OFFICERS;
            this.campaignId = 'onepiece_grand_line';
            this.currentCampaign = OnePieceCampaignData.CAMPAIGN;
            this.currentNode = 'op_ch1_reverse_mountain';
        } else {
            // Warhammer Acolyte
            const template = WarhammerCampaignData.ARCHETYPES.find(a => a.id === (selectedId || 'interrogator')) || WarhammerCampaignData.ARCHETYPES[0];
            this.character = JSON.parse(JSON.stringify(template));
            this.character.woundsCurrent = this.character.woundsMax;
            this.character.isPrimarch = false;
            this.character.funds = 600;
            this.campaignId = 'sector_44';
            this.currentCampaign = WarhammerCampaignData.CAMPAIGN;
            this.currentNode = this.currentCampaign.chapters[0].id;
        }

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
        this.charOrderEl.textContent = this.character.order || (this.character.isFate ? 'Holy Grail Master' : 'Grand Line Supernova');

        this.hpCurrentEl.textContent = this.character.woundsCurrent || this.character.woundsMax;
        this.hpMaxEl.textContent = this.character.woundsMax;
        const curHp = this.character.woundsCurrent || this.character.woundsMax;
        const hpPercent = Math.max(0, Math.min(100, (curHp / this.character.woundsMax) * 100));
        this.hpBarFillEl.style.width = `${hpPercent}%`;

        if (this.character.isFate) {
            this.fateCurrentEl.textContent = this.character.commandSpells !== undefined ? this.character.commandSpells : 3;
            this.insanityCurrentEl.textContent = `${this.character.manaCurrent || 100}%`;
            this.corruptionCurrentEl.textContent = this.character.servant ? this.character.servant.class : 'Saber';
            const fateBoxLabel = this.fateCurrentEl.previousElementSibling;
            if (fateBoxLabel) fateBoxLabel.textContent = "Command Seals";
            const insanityLabel = this.insanityCurrentEl.previousElementSibling;
            if (insanityLabel) insanityLabel.textContent = "Prana Pool";
            const corruptionLabel = this.corruptionCurrentEl.previousElementSibling;
            if (corruptionLabel) corruptionLabel.textContent = "Servant Class";
        } else if (this.character.isOnePiece) {
            this.fateCurrentEl.textContent = `${Math.floor((this.character.bounty || 120000000) / 1000000)}M`;
            this.insanityCurrentEl.textContent = `${this.character.hakiCurrent || 100}%`;
            this.corruptionCurrentEl.textContent = 'Supernova';
            const fateBoxLabel = this.fateCurrentEl.previousElementSibling;
            if (fateBoxLabel) fateBoxLabel.textContent = "Bounty (฿)";
            const insanityLabel = this.insanityCurrentEl.previousElementSibling;
            if (insanityLabel) insanityLabel.textContent = "Haki Gauge";
            const corruptionLabel = this.corruptionCurrentEl.previousElementSibling;
            if (corruptionLabel) corruptionLabel.textContent = "Pirate Rank";
        } else {
            this.fateCurrentEl.textContent = this.character.fatePoints !== undefined ? this.character.fatePoints : 3;
            this.insanityCurrentEl.textContent = this.character.insanity || 0;
            this.corruptionCurrentEl.textContent = this.character.corruption || 0;
            const fateBoxLabel = this.fateCurrentEl.previousElementSibling;
            if (fateBoxLabel) fateBoxLabel.textContent = "Fate Points";
            const insanityLabel = this.insanityCurrentEl.previousElementSibling;
            if (insanityLabel) insanityLabel.textContent = "Insanity";
            const corruptionLabel = this.corruptionCurrentEl.previousElementSibling;
            if (corruptionLabel) corruptionLabel.textContent = "Corruption";
        }

        // Render stats dynamically based on universe rules
        this.statGridEl.innerHTML = '';
        const rulesEngine = this.character.isFate ? FateRules : (this.character.isOnePiece ? OnePieceRules : WarhammerRules);
        const statDefinitions = rulesEngine.STAT_NAMES;

        Object.keys(statDefinitions).forEach(statKey => {
            const info = statDefinitions[statKey];
            const val = this.character.stats ? (this.character.stats[statKey] || 50) : 50;
            const bonus = Math.floor(val / 10);

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

        // Render armor / defense
        const armor = this.character.armor || { head: 3, body: 4, arms: 3, legs: 3 };
        this.armorGridEl.innerHTML = `
            <div class="armor-row"><span>Head:</span><strong>${armor.head || 3}</strong></div>
            <div class="armor-row"><span>Torso:</span><strong>${armor.body || 4}</strong></div>
            <div class="armor-row"><span>Arms:</span><strong>${armor.arms || 3}</strong></div>
            <div class="armor-row"><span>Legs:</span><strong>${armor.legs || 3}</strong></div>
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

        // Render Tactical Scene Frame
        this.renderTacticalSceneFrame(node);

        // Auto-Vox Voice Narration if enabled
        if (this.autoVox) {
            setTimeout(() => this.speakCurrentNarrative(), 150);
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
            finishBtn.className = 'tactical-choice-btn approach-force';
            finishBtn.innerHTML = `
                <div class="choice-content">
                    <span class="approach-tag">⚔ SAGA COMPLETE</span>
                    <strong class="choice-label">Awaken Anew // Start a New Journey</strong>
                    <span class="choice-desc">Begin a fresh campaign in Warhammer, Fate/stay night, or One Piece</span>
                </div>
                <span class="stat-preview">NEW SAGA</span>
            `;
            finishBtn.addEventListener('click', () => {
                localStorage.removeItem('grimdark_rpg_save');
                location.reload();
            });
            this.optionsContainerEl.appendChild(finishBtn);
            return;
        }

        options.forEach(opt => {
            const btn = document.createElement('button');
            const approach = opt.approach || (opt.stat === 'ws' || opt.stat === 's' || opt.stat === 'might' || opt.stat === 'str' ? 'force' :
                             opt.stat === 'ag' || opt.stat === 'agility' || opt.stat === 'agi' ? 'finesse' :
                             opt.stat === 'int' || opt.stat === 'per' ? 'mind' : 'mystery');
            
            btn.className = `tactical-choice-btn approach-${approach}`;

            let previewText = '';
            if (opt.actionType === 'check') {
                const statVal = (this.character.stats ? (this.character.stats[opt.stat] || 50) : 50) + (opt.modifier || 0);
                previewText = `${(opt.stat || 'CHECK').toUpperCase()} ${Math.max(1, Math.min(99, statVal))}%`;
            } else if (opt.actionType === 'fate_miracle' || opt.actionType === 'command_spell') {
                previewText = opt.actionType === 'command_spell' ? '1 COMMAND SEAL' : '1 FATE POINT';
            } else {
                previewText = 'PROCEED';
            }

            const approachIcons = {
                force: '⚔️ FORCE',
                finesse: '🗡️ FINESSE',
                mind: '🧠 MIND',
                mystery: '✨ MYSTERY'
            };

            const tagText = opt.tag || approachIcons[approach] || 'TACTICAL CHOICE';

            btn.innerHTML = `
                <div class="choice-content">
                    <span class="approach-tag">${tagText}</span>
                    <strong class="choice-label">${opt.label}</strong>
                    ${opt.desc ? `<span class="choice-desc">${opt.desc}</span>` : ''}
                </div>
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
        this.stopVox();

        if (opt.actionType === 'advance') {
            this.currentNode = opt.nextNode;
            this.renderStoryNode();
            return;
        }

        if (opt.actionType === 'fate_miracle' || opt.actionType === 'command_spell') {
            const hasResource = opt.actionType === 'command_spell' ? (this.character.commandSpells > 0) : (this.character.fatePoints > 0);
            if (hasResource) {
                if (opt.actionType === 'command_spell') {
                    this.character.commandSpells -= 1;
                } else {
                    this.character.fatePoints -= 1;
                }
                window.soundEngine.playSuccess();
                this.currentNode = opt.nextNode;
                this.renderCharacterPanel();
                this.renderStoryNode();
            } else {
                alert(opt.actionType === 'command_spell' 
                    ? "You have expended all 3 Command Seals!" 
                    : "You have no Fate Points remaining to manifest a miracle!");
            }
            return;
        }

        if (opt.actionType === 'check') {
            const statVal = (this.character.stats ? (this.character.stats[opt.stat] || 50) : 50);
            const mod = opt.modifier || 0;
            const res = WarhammerRules.testSkill(statVal, mod);

            const rulesEngine = this.character.isFate ? FateRules : (this.character.isOnePiece ? OnePieceRules : WarhammerRules);
            const statName = (rulesEngine.STAT_NAMES[opt.stat] && rulesEngine.STAT_NAMES[opt.stat].name) || opt.stat.toUpperCase();

            this.displayDiceResult(res, `${statName} Check`);

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
        const universes = ['warhammer', 'fate', 'onepiece'];
        const currentIdx = universes.indexOf(this.universe || 'warhammer');
        const nextUniverse = universes[(currentIdx + 1) % universes.length];
        this.switchUniverse(nextUniverse);
    }

    switchUniverse(uni) {
        this.universe = uni;
        window.soundEngine.playSuccess();

        // Update body theme classes
        document.body.classList.remove('theme-fate', 'theme-onepiece');
        if (uni === 'fate') {
            document.body.classList.add('theme-fate');
        } else if (uni === 'onepiece') {
            document.body.classList.add('theme-onepiece');
        }

        // Check if there is an existing save slot for this realm
        const saved = localStorage.getItem(`rpg_save_${uni}`) || (uni === 'warhammer' ? localStorage.getItem('grimdark_rpg_save') : null);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.character = data.character;
                this.campaignId = data.campaignId;
                if (uni === 'fate') {
                    this.currentCampaign = FateCampaignData.CAMPAIGN;
                } else if (uni === 'onepiece') {
                    this.currentCampaign = OnePieceCampaignData.CAMPAIGN;
                } else {
                    this.currentCampaign = this.campaignId === 'lost_primarch' 
                        ? WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN 
                        : WarhammerCampaignData.CAMPAIGN;
                }
                this.currentNode = data.currentNode;
                this.currentCombat = data.currentCombat;
                this.diceHistory = data.diceHistory || [];
            } catch (e) {
                console.error("Failed to parse realm save:", e);
                this.character = null;
            }
        } else {
            this.character = null;
        }

        // If no save exists for this realm, initialize clean default character
        if (!this.character) {
            if (uni === 'fate') {
                this.campaignId = 'fate_fuyuki_war';
                this.currentCampaign = FateCampaignData.CAMPAIGN;
                this.character = JSON.parse(JSON.stringify(FateCampaignData.MASTERS[0]));
                this.character.isFate = true;
                this.character.funds = 800;
                this.character.servant = FateCampaignData.SERVANTS[0];
                this.currentNode = 'fate_ch1_summoning';
            } else if (uni === 'onepiece') {
                this.campaignId = 'onepiece_grand_line';
                this.currentCampaign = OnePieceCampaignData.CAMPAIGN;
                this.character = JSON.parse(JSON.stringify(OnePieceCampaignData.CAPTAINS[0]));
                this.character.isOnePiece = true;
                this.character.funds = 1500;
                this.character.crew = OnePieceCampaignData.CREW_OFFICERS;
                this.currentNode = 'op_ch1_reverse_mountain';
            } else {
                this.campaignId = 'lost_primarch';
                this.currentCampaign = WarhammerCampaignData.LOST_PRIMARCH_CAMPAIGN;
                this.character = this.createDefaultPrimarch();
                this.currentNode = 'lp_ch1_awakening';
            }
            this.currentCombat = null;
            this.diceHistory = [];
        }

        // Ensure character's funds is defined
        if (this.character && this.character.funds === undefined) {
            this.character.funds = (uni === 'fate') ? 800 : (uni === 'onepiece' ? 1500 : 1000);
        }

        this.updateHeaderTitles();
        this.renderAll();
        this.saveGame();
    }

    async sha256(str) {
        const buf = new TextEncoder().encode(str);
        const hashBuf = await crypto.subtle.digest('SHA-256', buf);
        return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    initSecurityGate() {
        const MASTER_HASH = '31a79bb331fac359221c292b76428f08ad29f55a2257e4e88dc996e84c016203'; // shiva123
        const isUnlocked = localStorage.getItem('inquisitorial_unlocked') === 'true';

        if (isUnlocked) {
            this.lockGateBackdropEl.style.display = 'none';
        } else {
            this.lockGateBackdropEl.style.display = 'flex';
            setTimeout(() => this.gatePassInputEl.focus(), 200);
        }

        const handleAuth = async () => {
            const entered = this.gatePassInputEl.value.trim();
            if (!entered) return;

            const enteredHash = await this.sha256(entered);
            const customPass = localStorage.getItem('inquisitorial_passcode');

            if (enteredHash === MASTER_HASH || entered === 'shiva123' || (customPass && (entered === customPass || entered.toLowerCase() === customPass.toLowerCase()))) {
                window.soundEngine.playSuccess();
                localStorage.setItem('inquisitorial_unlocked', 'true');
                this.lockErrorMsgEl.textContent = '';
                this.gatePassInputEl.value = '';
                this.lockGateBackdropEl.style.display = 'none';
                // Show Realm Hub Start Menu on unlock so player can choose their realm!
                this.showRealmHub();
            } else {
                window.soundEngine.playFailure();
                this.lockErrorMsgEl.textContent = '☠ ACCESS DENIED // INVALID CLEARANCE CIPHER';
                this.gatePassInputEl.value = '';
                this.gatePassInputEl.focus();
            }
        };

        const hubCloseBtn = document.getElementById('realm-hub-close-btn');
        if (hubCloseBtn) {
            hubCloseBtn.addEventListener('click', () => {
                if (this.universeMenuBackdropEl) this.universeMenuBackdropEl.style.display = 'none';
            });
        }

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
                const tabName = btn.dataset.tab;
                if (tabName === 'companions') {
                    this.showCompanionsModal();
                    return;
                }

                tabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.mainWrapperEl.classList.remove('mobile-tab-mission', 'mobile-tab-dossier', 'mobile-tab-dice', 'mobile-tab-gear');
                this.mainWrapperEl.classList.add(`mobile-tab-${tabName}`);

                window.soundEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    initVoxNarrator() {
        this.isVoxSpeaking = false;
        this.isVoxPaused = false;
        this.autoVox = localStorage.getItem('warhammer_auto_vox') === 'true';
        this.voxGender = localStorage.getItem('warhammer_vox_gender') || 'female';
        this.selectedVoiceName = localStorage.getItem('warhammer_chosen_voice') || '';

        // Populate and listen for voice list updates from the browser
        if ('speechSynthesis' in window) {
            this.populateVoiceDropdown();
            window.speechSynthesis.onvoiceschanged = () => this.populateVoiceDropdown();
        }

        if (this.voxVoiceSelectEl) {
            this.voxVoiceSelectEl.addEventListener('change', () => {
                this.selectedVoiceName = this.voxVoiceSelectEl.value;
                localStorage.setItem('warhammer_chosen_voice', this.selectedVoiceName);
                window.soundEngine.playClick();
                if (this.isVoxSpeaking) {
                    this.speakCurrentNarrative();
                }
            });
        }

        if (this.voxGenderBtnEl) {
            this.updateVoxGenderUI();
            this.voxGenderBtnEl.addEventListener('click', () => {
                this.voxGender = (this.voxGender === 'female') ? 'male' : 'female';
                localStorage.setItem('warhammer_vox_gender', this.voxGender);
                this.updateVoxGenderUI();
                this.populateVoiceDropdown();
                window.soundEngine.playClick();
                if (this.isVoxSpeaking) {
                    this.speakCurrentNarrative();
                }
            });
        }

        if (this.voxAutoToggleEl) {
            if (this.autoVox) {
                this.voxAutoToggleEl.classList.add('active');
                this.voxAutoToggleEl.textContent = 'Auto-Vox: ON';
            } else {
                this.voxAutoToggleEl.classList.remove('active');
                this.voxAutoToggleEl.textContent = 'Auto-Vox: OFF';
            }

            this.voxAutoToggleEl.addEventListener('click', () => {
                this.autoVox = !this.autoVox;
                localStorage.setItem('warhammer_auto_vox', this.autoVox ? 'true' : 'false');
                this.voxAutoToggleEl.classList.toggle('active', this.autoVox);
                this.voxAutoToggleEl.textContent = this.autoVox ? 'Auto-Vox: ON' : 'Auto-Vox: OFF';
                window.soundEngine.playClick();
                if (this.autoVox && !this.isVoxSpeaking) {
                    this.speakCurrentNarrative();
                } else if (!this.autoVox) {
                    this.stopVox();
                }
            });
        }

        if (this.voxReadBtnEl) {
            this.voxReadBtnEl.addEventListener('click', () => {
                if (this.isVoxPaused) {
                    window.speechSynthesis.resume();
                    this.isVoxPaused = false;
                    this.updateVoxUI(true);
                } else if (this.isVoxSpeaking) {
                    this.stopVox();
                } else {
                    this.speakCurrentNarrative();
                }
            });
        }

        if (this.voxPauseBtnEl) {
            this.voxPauseBtnEl.addEventListener('click', () => {
                if ('speechSynthesis' in window && window.speechSynthesis.speaking && !this.isVoxPaused) {
                    window.speechSynthesis.pause();
                    this.isVoxPaused = true;
                    this.updateVoxUI(false, true);
                }
            });
        }

        if (this.voxStopBtnEl) {
            this.voxStopBtnEl.addEventListener('click', () => {
                this.stopVox();
            });
        }
    }

    populateVoiceDropdown() {
        if (!('speechSynthesis' in window) || !this.voxVoiceSelectEl) return;
        const allVoices = window.speechSynthesis.getVoices();
        if (!allVoices || allVoices.length === 0) return;

        // Filter for English or best available
        const enVoices = allVoices.filter(v => v.lang.startsWith('en') || v.lang.startsWith('en-'));
        const voices = enVoices.length > 0 ? enVoices : allVoices;

        // Helper to check if a voice is female
        const isFemale = (name) => {
            const n = name.toLowerCase();
            return n.includes('female') || n.includes('zira') || n.includes('samantha') || 
                   n.includes('victoria') || n.includes('karen') || n.includes('jenny') || 
                   n.includes('aria') || n.includes('sonia') || n.includes('libby') || 
                   n.includes('maisie') || n.includes('hazel') || n.includes('susan') || 
                   n.includes('catherine') || n.includes('fiona') || n.includes('moira') || 
                   n.includes('tessa') || n.includes('eva') || (n.includes('natural') && (n.includes('uk') || n.includes('us')));
        };

        const isNatural = (name) => {
            const n = name.toLowerCase();
            return n.includes('natural') || n.includes('neural') || n.includes('online') || n.includes('enhanced') || n.includes('premium') || n.includes('google');
        };

        // Sort: Natural voices first, matching current gender choice
        const sorted = [...voices].sort((a, b) => {
            const aNat = isNatural(a.name) ? 2 : 0;
            const bNat = isNatural(b.name) ? 2 : 0;
            const aGender = (this.voxGender === 'female' && isFemale(a.name)) || (this.voxGender === 'male' && !isFemale(a.name)) ? 1 : 0;
            const bGender = (this.voxGender === 'female' && isFemale(b.name)) || (this.voxGender === 'male' && !isFemale(b.name)) ? 1 : 0;
            return (bNat + bGender) - (aNat + aGender);
        });

        this.voxVoiceSelectEl.innerHTML = '';
        let foundChosen = false;

        sorted.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.name;
            const femaleTag = isFemale(v.name) ? '♀' : '♂';
            const natTag = isNatural(v.name) ? '⭐ ' : '';
            opt.textContent = `${natTag}${v.name} (${femaleTag} ${v.lang})`;
            if (this.selectedVoiceName && v.name === this.selectedVoiceName) {
                opt.selected = true;
                foundChosen = true;
            }
            this.voxVoiceSelectEl.appendChild(opt);
        });

        // If no user choice or previous choice not present, default to the top-ranked Natural voice
        if (!foundChosen && sorted.length > 0) {
            this.selectedVoiceName = sorted[0].name;
            this.voxVoiceSelectEl.value = this.selectedVoiceName;
        }
    }

    updateVoxGenderUI() {
        if (!this.voxGenderBtnEl) return;
        if (this.voxGender === 'female') {
            this.voxGenderBtnEl.innerHTML = '<span>♀</span> Female';
            this.voxGenderBtnEl.classList.add('active');
        } else {
            this.voxGenderBtnEl.innerHTML = '<span>♂</span> Male';
            this.voxGenderBtnEl.classList.remove('active');
        }
    }

    stopVox() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this.isVoxSpeaking = false;
        this.isVoxPaused = false;
        this.updateVoxUI(false);
    }

    updateVoxUI(speaking, paused = false) {
        if (!this.voxReadBtnEl) return;
        if (speaking) {
            this.voxReadBtnEl.classList.add('active');
            this.voxReadBtnEl.innerHTML = '<span>🔊</span> Vox Active';
            if (this.voxPauseBtnEl) this.voxPauseBtnEl.style.display = 'inline-flex';
            if (this.voxStopBtnEl) this.voxStopBtnEl.style.display = 'inline-flex';
            if (this.voxEqualizerEl) this.voxEqualizerEl.style.display = 'inline-flex';
        } else if (paused) {
            this.voxReadBtnEl.classList.remove('active');
            this.voxReadBtnEl.innerHTML = '<span>▶</span> Resume';
            if (this.voxEqualizerEl) this.voxEqualizerEl.style.display = 'none';
        } else {
            this.voxReadBtnEl.classList.remove('active');
            this.voxReadBtnEl.innerHTML = '<span>▶</span> Read Vox';
            if (this.voxPauseBtnEl) this.voxPauseBtnEl.style.display = 'none';
            if (this.voxStopBtnEl) this.voxStopBtnEl.style.display = 'none';
            if (this.voxEqualizerEl) this.voxEqualizerEl.style.display = 'none';
        }
    }

    cleanTextForSpeech(text) {
        if (!text) return '';
        return text
            .replace(/\(\+?[0-9]+\s+[A-Za-z\s]+!?\)/g, '')
            .replace(/\([A-Za-z0-9\+\-\s\.]+\)/g, '')
            .replace(/[*_#`~]/g, '')
            .replace(/["""]/g, '')
            .replace(/\n\s*\n/g, '. ')
            .replace(/\n/g, ' ')
            .trim();
    }

    speakCurrentNarrative() {
        if (!('speechSynthesis' in window)) return;
        this.stopVox();

        const node = this.findNode(this.currentNode);
        if (!node) return;

        const speechText = `${node.title}. ${this.cleanTextForSpeech(node.narrative)}`;
        const utterance = new SpeechSynthesisUtterance(speechText);

        const voices = window.speechSynthesis.getVoices();
        let preferred = null;

        // 1. Check if user picked a specific voice from the dropdown
        if (this.selectedVoiceName && voices && voices.length > 0) {
            preferred = voices.find(v => v.name === this.selectedVoiceName);
        }

        // 2. Fallback: Find highest-rated natural voice for selected gender
        if (!preferred && voices && voices.length > 0) {
            if (this.voxGender === 'female') {
                preferred = voices.find(v => {
                    const n = v.name.toLowerCase();
                    return (n.includes('natural') || n.includes('neural') || n.includes('online') || n.includes('enhanced')) &&
                           (n.includes('female') || n.includes('sonia') || n.includes('jenny') || n.includes('libby') || n.includes('aria') || n.includes('samantha'));
                }) || voices.find(v => {
                    const n = v.name.toLowerCase();
                    return n.includes('female') || n.includes('zira') || n.includes('samantha') || n.includes('karen') || n.includes('victoria');
                });
            } else {
                preferred = voices.find(v => {
                    const n = v.name.toLowerCase();
                    return (n.includes('natural') || n.includes('neural') || n.includes('online')) &&
                           (n.includes('male') || n.includes('ryan') || n.includes('guy') || n.includes('david'));
                }) || voices.find(v => {
                    const n = v.name.toLowerCase();
                    return n.includes('male') || n.includes('david') || n.includes('george') || n.includes('daniel');
                });
            }

            if (!preferred) {
                preferred = voices.find(v => v.lang.startsWith('en')) || voices[0];
            }
        }

        if (preferred) {
            utterance.voice = preferred;
            const isNat = preferred.name.toLowerCase().includes('natural') || preferred.name.toLowerCase().includes('neural') || preferred.name.toLowerCase().includes('online');
            // Natural voices already have built-in realistic pitch; older desktop voices need slight boost
            if (this.voxGender === 'female') {
                utterance.pitch = isNat ? 1.0 : 1.10;
                utterance.rate = isNat ? 0.98 : 0.94;
            } else {
                utterance.pitch = isNat ? 1.0 : 0.88;
                utterance.rate = isNat ? 0.96 : 0.92;
            }
        } else {
            utterance.pitch = this.voxGender === 'female' ? 1.10 : 0.88;
            utterance.rate = 0.94;
        }

        utterance.onstart = () => {
            this.isVoxSpeaking = true;
            this.isVoxPaused = false;
            this.updateVoxUI(true);
        };

        utterance.onend = () => {
            this.isVoxSpeaking = false;
            this.isVoxPaused = false;
            this.updateVoxUI(false);
        };

        utterance.onerror = () => {
            this.isVoxSpeaking = false;
            this.isVoxPaused = false;
            this.updateVoxUI(false);
        };

        window.speechSynthesis.speak(utterance);
    }

    renderTacticalSceneFrame(node) {
        if (!this.tacticalSceneFrameEl) return;

        let illustration = node.illustration;
        if (!illustration) {
            let badge = 'TACTICAL TELEMETRY';
            let badgeClass = 'threat-moderate';
            let icon = '📡';
            let quote = node.atmosphere || 'Gothic void silence';
            let tags = ['Astra Telepathica', 'Tactical Cogitator'];

            if (node.combat) {
                badge = 'HOSTILE ENGAGEMENT';
                badgeClass = 'threat-extreme';
                icon = '⚔️';
                quote = node.combat.quote || 'Hostiles engaging!';
                tags = ['Hostile Engagement', 'Purge Protocol'];
            } else if (node.title.includes('Devotion') || node.title.includes('Intimacy') || node.title.includes('Chambers') || node.title.includes('Surrender') || node.title.includes('Union') || node.title.includes('Court') || node.title.includes('Touch') || node.title.includes('Sovereign')) {
                badge = 'IMPERIAL SANCTUM';
                badgeClass = 'threat-sanctum';
                icon = '👑';
                quote = 'Within the sacred sanctum of the Eclipse, devotion transcends duty.';
                tags = ['Private Sanctum', 'Valkyrie Devotion', 'Second Legion'];
            } else if (node.title.includes('Wrath') || node.title.includes('Cruel') || node.title.includes('Execution') || node.title.includes('Roar') || node.title.includes('Terror') || node.title.includes('Blood')) {
                badge = 'PRIMARCH WRATH';
                badgeClass = 'threat-extreme';
                icon = '☠️';
                quote = 'The Second Legion shows no mercy to those who defy the Sovereign.';
                tags = ['Ruthless Retribution', 'Terror Protocol'];
            }

            illustration = {
                title: node.title,
                badge: badge,
                badgeClass: badgeClass,
                icon: icon,
                quote: quote,
                tags: tags
            };
        }

        const tagsHtml = (illustration.tags || []).map(t => `<span class="scene-tag">${t}</span>`).join('');

        const imageBannerHtml = illustration.image ? `
            <div class="scene-image-container">
                <img src="${illustration.image}" alt="${illustration.title || node.title}" class="scene-visual-art" onerror="this.style.display='none'">
            </div>
        ` : '';

        this.tacticalSceneFrameEl.innerHTML = `
            <div class="scene-illustration">
                <div class="scene-illustration-header">
                    <div class="scene-location-title">
                        <span>⚔</span> <span>${illustration.title || node.title}</span>
                    </div>
                    <div class="scene-threat-badge ${illustration.badgeClass || 'threat-moderate'}">
                        ${illustration.badge || 'TELEMETRY FEED'}
                    </div>
                </div>
                ${imageBannerHtml}
                <div class="scene-art-banner">
                    <div class="scene-art-content">
                        <div class="scene-avatar-wrap">
                            <div class="scene-avatar-icon">${illustration.icon || '☠'}</div>
                        </div>
                        <div class="scene-description-block">
                            <div class="scene-card-heading">${node.act || 'Tactical Situation'}</div>
                            <div class="scene-card-quote">${illustration.quote || node.atmosphere || ''}</div>
                            <div class="scene-dynamic-tags">${tagsHtml}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showRealmHub() {
        if (this.universeMenuBackdropEl) {
            this.universeMenuBackdropEl.style.display = 'flex';
        }
    }

    showCompanionsModal() {
        if (!this.companionsModalEl) return;
        this.companionsModalEl.style.display = 'flex';
        this.renderCompanionsList('all');
    }

    getCompanionsRoster() {
        if (!this.character) return [];
        
        // Strict segregation: Ensure companions match active realm
        const currentUniverse = this.character.isFate ? 'fate' : (this.character.isOnePiece ? 'onepiece' : 'warhammer');
        if (!this.character.companions || this.character.companionsUniverse !== currentUniverse) {
            this.character.companionsUniverse = currentUniverse;
            if (currentUniverse === 'fate') {
                this.character.companions = [
                    {
                        id: 'saber_artoria',
                        name: 'Artoria Pendragon',
                        title: 'Saber // King of Knights',
                        avatar: '⚔️',
                        status: 'ally',
                        affection: 65,
                        obedience: 30,
                        gender: 'female',
                        voicePitch: 1.15,
                        voiceRate: 0.98,
                        canRomance: true,
                        perk: 'Excalibur Support: +15 Damage to Noble Phantasms and high magic resistance.',
                        quote: '"I ask of you, are you my Master? My sword is yours."'
                    },
                    {
                        id: 'rin_tohsaka',
                        name: 'Rin Tohsaka',
                        title: 'Jewel Mage // Master of Archer',
                        avatar: '💎',
                        status: 'ally',
                        affection: 50,
                        obedience: 20,
                        gender: 'female',
                        voicePitch: 1.20,
                        voiceRate: 1.02,
                        canRomance: true,
                        perk: 'Gandb Gemcraft: Deals 20 magical piercing damage in combat turns.',
                        quote: '"Don\'t get the wrong idea! We\'re only cooperating until the Grail is secured."'
                    },
                    {
                        id: 'medusa_rider',
                        name: 'Medusa',
                        title: 'Rider // Gorgon of the Blood Fort',
                        avatar: '🐍',
                        status: 'captive',
                        affection: 20,
                        obedience: 55,
                        gender: 'female',
                        voicePitch: 0.95,
                        voiceRate: 0.92,
                        canRomance: true,
                        perk: 'Breaker Gorgon: Paralyzes target foes through mystic eyes of petrification.',
                        quote: '"Do what you must. But be wary of gazing into my unveiled eyes."'
                    }
                ];
            } else if (currentUniverse === 'onepiece') {
                this.character.companions = [
                    {
                        id: 'nami_navigator',
                        name: 'Nami',
                        title: 'Cat Burglar // Navigator of the Sea',
                        avatar: '🍊',
                        status: 'ally',
                        affection: 70,
                        obedience: 25,
                        gender: 'female',
                        voicePitch: 1.22,
                        voiceRate: 1.05,
                        canRomance: true,
                        perk: 'Clima-Tact Tempo: Summons thunderbolts for +12 tactical damage and evades storm hazards.',
                        quote: '"Set our sails toward the treasure! Anyone who gets in our way gets zapped!"'
                    },
                    {
                        id: 'nico_robin',
                        name: 'Nico Robin',
                        title: 'Devil Child // Archaeologist',
                        avatar: '🌸',
                        status: 'ally',
                        affection: 60,
                        obedience: 40,
                        gender: 'female',
                        voicePitch: 1.05,
                        voiceRate: 0.92,
                        canRomance: true,
                        perk: 'Hana Hana Clutch: Restrains hostile leaders, canceling 1 enemy counter-attack.',
                        quote: '"Fascinating. May we proceed together into the darkness of forgotten history?"'
                    },
                    {
                        id: 'tashigi_marine',
                        name: 'Tashigi',
                        title: 'Marine Captain // Swordswoman',
                        avatar: '👓',
                        status: 'captive',
                        affection: 15,
                        obedience: 60,
                        gender: 'female',
                        voicePitch: 1.12,
                        voiceRate: 0.96,
                        canRomance: true,
                        perk: 'Marine Cipher Intel: Reveals naval blockade patrol routes and weapon caches.',
                        quote: '"I am a soldier of Justice! I will never acknowledge a pirate pirate... so stop staring!"'
                    }
                ];
            } else {
                // Warhammer 40,000 Universe
                this.character.companions = [
                    {
                        id: 'vaelith_sororitas',
                        name: 'Sister Superior Vaelith',
                        title: 'Order of the Sacred Rose // Canoness Aspirant',
                        avatar: '⚜️',
                        status: 'ally',
                        affection: 65,
                        obedience: 35,
                        gender: 'female',
                        voicePitch: 1.10,
                        voiceRate: 0.95,
                        canRomance: true,
                        perk: 'Act of Faith: Purges warp taint and provides +15 Ballistic Skill on holy strikes.',
                        quote: '"By the sacred blood of the God-Emperor, our duty is our redemption."'
                    },
                    {
                        id: 'selene_valkyrie',
                        name: 'First Captain Selene',
                        title: 'Eclipse Valkyrie Commander // Second Legion',
                        avatar: '👑',
                        status: 'romance',
                        affection: 90,
                        obedience: 85,
                        gender: 'female',
                        voicePitch: 1.08,
                        voiceRate: 0.94,
                        canRomance: true,
                        perk: 'Sovereign Devotion: Absorbs 1 fatal wound for the Primarch and delivers dual power sword cleave.',
                        quote: '"My soul, my blade, and my body belong wholly to you, my Sovereign."'
                    },
                    {
                        id: 'cultist_morrigan',
                        name: 'Morrigan Veil',
                        title: 'Subjugated Heretic Psyker // Slaneesh Thrall',
                        avatar: '⛓️',
                        status: 'thrall',
                        affection: 45,
                        obedience: 80,
                        gender: 'female',
                        voicePitch: 1.18,
                        voiceRate: 0.92,
                        canRomance: true,
                        perk: 'Warp Tether: Drains hostile mental willpower and reveals occult pathways.',
                        quote: '"Your chains feel colder than the void, Master... command my flesh as you see fit."'
                    }
                ];
            }
        }
        return this.character.companions;
    }

    renderCompanionsList(filter = 'all') {
        if (!this.companionsGridEl) return;
        const roster = this.getCompanionsRoster();

        // Update counts
        const allCount = roster.length;
        const alliesCount = roster.filter(c => c.status === 'ally' || c.status === 'romance').length;
        const thrallsCount = roster.filter(c => c.status === 'thrall').length;
        const captivesCount = roster.filter(c => c.status === 'captive' || c.status === 'rival').length;

        if (this.countAllEl) this.countAllEl.textContent = allCount;
        if (this.countAlliesEl) this.countAlliesEl.textContent = alliesCount;
        if (this.countThrallsEl) this.countThrallsEl.textContent = thrallsCount;
        if (this.countCaptivesEl) this.countCaptivesEl.textContent = captivesCount;
        if (this.companionCountBadgeEl) this.companionCountBadgeEl.textContent = allCount;

        const filtered = roster.filter(c => {
            if (filter === 'allies') return c.status === 'ally' || c.status === 'romance';
            if (filter === 'thralls') return c.status === 'thrall';
            if (filter === 'captives') return c.status === 'captive' || c.status === 'rival';
            return true;
        });

        this.companionsGridEl.innerHTML = '';
        if (filtered.length === 0) {
            this.companionsGridEl.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No characters currently under this status. Explore more story encounters to recruit or capture them!</div>`;
            return;
        }

        filtered.forEach(c => {
            const card = document.createElement('div');
            card.className = 'companion-card';

            const statusClass = `status-${c.status || 'ally'}`;
            const statusLabel = (CompanionRules.STATUSES[(c.status || 'ally').toUpperCase()] || {}).label || c.status;

            card.innerHTML = `
                <div class="companion-header">
                    <div class="companion-avatar">${c.avatar || '👤'}</div>
                    <div class="companion-meta">
                        <h4>${c.name}</h4>
                        <div class="companion-title">${c.title}</div>
                        <div class="companion-status-badge ${statusClass}">
                            <span>${(CompanionRules.STATUSES[(c.status || 'ally').toUpperCase()] || {}).icon || '⚔️'}</span>
                            <span>${statusLabel}</span>
                        </div>
                    </div>
                </div>

                <div class="companion-bar-wrap">
                    <div class="companion-bar-label">
                        <span>Affection / Bond:</span>
                        <strong>${c.affection || 0}%</strong>
                    </div>
                    <div class="companion-meter-outer">
                        <div class="companion-meter-inner affection" style="width: ${c.affection || 0}%;"></div>
                    </div>
                </div>

                <div class="companion-bar-wrap">
                    <div class="companion-bar-label">
                        <span>Obedience / Submission:</span>
                        <strong>${c.obedience || 0}%</strong>
                    </div>
                    <div class="companion-meter-outer">
                        <div class="companion-meter-inner obedience" style="width: ${c.obedience || 0}%;"></div>
                    </div>
                </div>

                <div class="companion-perk">
                    <strong>Perk:</strong> ${c.perk || 'Loyal combat assistance'}
                </div>

                <div style="font-style: italic; font-size: 0.78rem; color: var(--amber-vox);">
                    ${c.quote || ''}
                </div>

                <div class="companion-actions">
                    <button class="companion-act-btn talk-btn">🗣️ Speak</button>
                    <button class="companion-act-btn bond-btn">${c.status === 'captive' ? '⛓️ Subjugate' : '❤️ Intimacy'}</button>
                </div>
            `;

            // Button actions
            card.querySelector('.talk-btn').addEventListener('click', () => {
                this.speakNpcDialogue(c);
            });

            card.querySelector('.bond-btn').addEventListener('click', () => {
                if (c.status === 'captive') {
                    c.obedience = Math.min(100, (c.obedience || 30) + 15);
                    if (c.obedience >= 75) {
                        c.status = 'thrall';
                        alert(`${c.name} has been fully broken and bound into your service as a Subjugated Thrall!`);
                    } else {
                        alert(`You interrogate and subjugate ${c.name}. Obedience increased to ${c.obedience}%.`);
                    }
                } else {
                    c.affection = Math.min(100, (c.affection || 50) + 12);
                    if (c.affection >= 80 && c.canRomance && c.status === 'ally') {
                        c.status = 'romance';
                        alert(`Passionate intimacy sparks! ${c.name} has entered your personal Harem with unwavering romance!`);
                    } else {
                        alert(`You spend quiet, intimate moments with ${c.name}. Bond increased to ${c.affection}%.`);
                    }
                }
                this.renderCompanionsList(filter);
                this.saveGame();
            });

            this.companionsGridEl.appendChild(card);
        });
    }

    speakNpcDialogue(companion) {
        if (!('speechSynthesis' in window)) return;
        this.stopVox();

        const quote = companion.quote ? companion.quote.replace(/["']/g, '') : `Hello my sovereign, I am ${companion.name}.`;
        const utterance = new SpeechSynthesisUtterance(quote);

        const voices = window.speechSynthesis.getVoices();
        // Look for best female voice if companion is female
        let pickedVoice = null;
        if (companion.gender === 'female' && voices) {
            pickedVoice = voices.find(v => {
                const n = v.name.toLowerCase();
                return (n.includes('natural') || n.includes('neural') || n.includes('online')) &&
                       (n.includes('female') || n.includes('sonia') || n.includes('jenny') || n.includes('libby') || n.includes('aria') || n.includes('samantha'));
            }) || voices.find(v => {
                const n = v.name.toLowerCase();
                return n.includes('female') || n.includes('zira') || n.includes('samantha') || n.includes('karen') || n.includes('victoria');
            });
        }

        if (pickedVoice) utterance.voice = pickedVoice;
        utterance.pitch = companion.voicePitch || 1.15;
        utterance.rate = companion.voiceRate || 0.96;

        utterance.onstart = () => this.updateVoxUI(true);
        utterance.onend = () => this.updateVoxUI(false);
        utterance.onerror = () => this.updateVoxUI(false);

        window.speechSynthesis.speak(utterance);
    }

    renderInventory() {
        if (!this.inventoryListEl || !this.character) return;
        this.inventoryListEl.innerHTML = '';

        const inv = this.character.inventory || [];
        if (inv.length === 0) {
            this.inventoryListEl.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-terminal);">No items equipped in inventory.</div>`;
            return;
        }

        inv.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'inventory-item-card';
            card.style.cssText = 'background: rgba(0,0,0,0.4); border: 1px solid var(--border-iron); border-radius: 4px; padding: 0.5rem 0.75rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;';

            let icon = '📦';
            if (item.type === 'melee') icon = '🗡️';
            if (item.type === 'ranged') icon = '🔫';
            if (item.type === 'armor') icon = '🛡️';
            if (item.type === 'relic') icon = '✨';

            card.innerHTML = `
                <div>
                    <div style="font-weight: 700; color: var(--gold-imperial); font-size: 0.85rem;">${icon} ${item.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-terminal);">
                        ${item.damage ? `Dmg: ${item.damage}` : ''} ${item.pen ? `| Pen: ${item.pen}` : ''} ${item.special || item.desc || ''}
                    </div>
                </div>
                <div style="font-family: var(--font-terminal); font-size: 0.7rem; color: var(--amber-vox); text-transform: uppercase;">
                    ${item.type || 'GEAR'}
                </div>
            `;
            this.inventoryListEl.appendChild(card);
        });
    }

    showStoreModal() {
        if (!this.storeModalEl || !this.character) return;
        this.storeModalEl.style.display = 'flex';

        const uni = this.universe || 'warhammer';
        const storeInfo = (window.UniverseStoreData && window.UniverseStoreData[uni]) || {
            currencyName: 'Gold / Gelt',
            currencySymbol: '🪙',
            storeTitle: 'REALM REQUISITION STORE',
            storeDesc: 'Purchase gear suited to your world.',
            merchantName: 'Quartermaster',
            merchantQuote: '"Welcome, traveler. What do you seek?"',
            items: []
        };

        if (this.character.funds === undefined) {
            this.character.funds = (uni === 'fate') ? 800 : (uni === 'onepiece' ? 1500 : 1000);
        }

        if (this.storeModalTitleEl) this.storeModalTitleEl.textContent = storeInfo.storeTitle;
        if (this.storeModalDescEl) this.storeModalDescEl.textContent = storeInfo.storeDesc;
        if (this.storePlayerFundsEl) this.storePlayerFundsEl.textContent = this.character.funds.toLocaleString();
        if (this.storeCurrencySymbolEl) this.storeCurrencySymbolEl.textContent = storeInfo.currencySymbol;

        if (this.storeMerchantBoxEl) {
            this.storeMerchantBoxEl.innerHTML = `
                <div style="font-weight: bold; color: var(--gold-imperial); margin-bottom: 0.25rem;">${storeInfo.merchantName}:</div>
                <div>${storeInfo.merchantQuote}</div>
            `;
        }

        // Render store items
        if (this.storeItemsGridEl) {
            this.storeItemsGridEl.innerHTML = '';
            storeInfo.items.forEach(item => {
                const canAfford = this.character.funds >= item.price;
                const card = document.createElement('div');
                card.style.cssText = 'background: rgba(0,0,0,0.5); border: 1px solid var(--border-iron); border-radius: 6px; padding: 0.75rem; display: flex; flex-direction: column; justify-content: space-between;';

                let icon = '📦';
                if (item.type === 'melee') icon = '🗡️';
                if (item.type === 'ranged') icon = '🔫';
                if (item.type === 'armor') icon = '🛡️';
                if (item.type === 'relic') icon = '✨';
                if (item.type === 'consumable') icon = '🧪';

                card.innerHTML = `
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
                            <span style="font-weight: bold; color: var(--gold-imperial); font-size: 0.88rem;">${icon} ${item.name}</span>
                            <span style="font-family: var(--font-terminal); color: ${canAfford ? '#4ade80' : '#f87171'}; font-weight: bold; font-size: 0.85rem;">
                                ${item.price} ${storeInfo.currencySymbol}
                            </span>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3; margin-bottom: 0.5rem;">
                            ${item.desc || ''}
                            ${item.damage ? `<div style="color: var(--amber-vox); font-family: var(--font-terminal); margin-top: 0.2rem;">Damage: ${item.damage} | Pen: ${item.pen || 0}</div>` : ''}
                            ${item.heals ? `<div style="color: #4ade80; font-family: var(--font-terminal); margin-top: 0.2rem;">Restores: ${item.heals} HP</div>` : ''}
                        </div>
                    </div>
                    <button class="buy-item-btn" style="background: ${canAfford ? 'linear-gradient(180deg, rgba(202,138,4,0.3) 0%, rgba(133,77,14,0.5) 100%)' : 'rgba(50,50,50,0.3)'}; border: 1px solid ${canAfford ? 'var(--gold-imperial)' : 'var(--border-iron)'}; color: ${canAfford ? '#fff' : 'var(--text-muted)'}; padding: 0.35rem 0.6rem; border-radius: 4px; font-family: var(--font-terminal); font-size: 0.78rem; cursor: ${canAfford ? 'pointer' : 'not-allowed'};" ${canAfford ? '' : 'disabled'}>
                        ${canAfford ? 'REQUISITION ITEM' : 'INSUFFICIENT FUNDS'}
                    </button>
                `;

                if (canAfford) {
                    card.querySelector('.buy-item-btn').addEventListener('click', () => {
                        this.buyStoreItem(item, storeInfo);
                    });
                }

                this.storeItemsGridEl.appendChild(card);
            });
        }
    }

    buyStoreItem(item, storeInfo) {
        if (!this.character || this.character.funds < item.price) return;
        this.character.funds -= item.price;
        if (!this.character.inventory) this.character.inventory = [];

        // Check if consumable exists already to increment count
        if (item.type === 'consumable') {
            const existing = this.character.inventory.find(i => i.id === item.id);
            if (existing) {
                existing.count = (existing.count || 1) + (item.count || 1);
            } else {
                this.character.inventory.push(JSON.parse(JSON.stringify(item)));
            }
        } else {
            this.character.inventory.push(JSON.parse(JSON.stringify(item)));
        }

        window.soundEngine.playSuccess();
        this.renderInventory();
        this.saveGame();
        this.showStoreModal(); // refresh UI
    }

    showCloudModal() {
        if (!this.cloudModalEl) return;
        this.cloudModalEl.style.display = 'flex';
        this.updateCloudUI();
    }

    updateCloudUI() {
        if (!this.cloudDb) return;
        if (this.cloudPlayerIdDisplayEl) {
            this.cloudPlayerIdDisplayEl.textContent = this.cloudDb.playerId || '-';
        }
        if (this.supabaseUrlInputEl && !this.supabaseUrlInputEl.value) {
            this.supabaseUrlInputEl.value = this.cloudDb.projectUrl || '';
        }
        if (this.supabaseKeyInputEl && !this.supabaseKeyInputEl.value) {
            this.supabaseKeyInputEl.value = this.cloudDb.anonKey || '';
        }

        if (this.cloudStatusBadgeEl) {
            if (this.cloudDb.syncEnabled) {
                this.cloudStatusBadgeEl.textContent = "CONNECTED // REAL-TIME SYNC ACTIVE";
                this.cloudStatusBadgeEl.style.background = "rgba(34, 197, 94, 0.2)";
                this.cloudStatusBadgeEl.style.borderColor = "#22c55e";
                this.cloudStatusBadgeEl.style.color = "#4ade80";
            } else {
                this.cloudStatusBadgeEl.textContent = "OFFLINE // LOCAL STORAGE ONLY";
                this.cloudStatusBadgeEl.style.background = "rgba(239, 68, 68, 0.2)";
                this.cloudStatusBadgeEl.style.borderColor = "#ef4444";
                this.cloudStatusBadgeEl.style.color = "#f87171";
            }
        }
    }

    findNode(id) {
        return this.currentCampaign.chapters.find(c => c.id === id);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new GrimdarkRPGApp();
});
