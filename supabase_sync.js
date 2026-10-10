// supabase_sync.js - Supabase Online Cloud Database Connector
// Allows players to sync their characters, campaigns, and saves across devices.

class CloudDatabaseManager {
    constructor() {
        this.client = null;
        this.syncEnabled = false;
        this.projectUrl = localStorage.getItem('omni_supabase_url') || '';
        this.anonKey = localStorage.getItem('omni_supabase_key') || '';
        this.playerId = localStorage.getItem('omni_cloud_player_id') || this.generatePlayerId();

        this.initClient();
    }

    generatePlayerId() {
        const id = 'player_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
        localStorage.setItem('omni_cloud_player_id', id);
        return id;
    }

    initClient() {
        if (window.supabase && this.projectUrl && this.anonKey) {
            try {
                this.client = window.supabase.createClient(this.projectUrl, this.anonKey);
                this.syncEnabled = true;
                console.log("[CloudSync] Supabase client initialized successfully.");
            } catch (e) {
                console.error("[CloudSync] Failed to initialize Supabase:", e);
                this.syncEnabled = false;
            }
        } else {
            this.syncEnabled = false;
        }
    }

    setCredentials(url, key) {
        this.projectUrl = (url || '').trim();
        this.anonKey = (key || '').trim();
        localStorage.setItem('omni_supabase_url', this.projectUrl);
        localStorage.setItem('omni_supabase_key', this.anonKey);
        this.initClient();
        return this.syncEnabled;
    }

    // Save state to Supabase table 'game_saves'
    async saveToCloud(universe, saveData) {
        if (!this.syncEnabled || !this.client) {
            return { success: false, reason: 'offline' };
        }

        try {
            const { data, error } = await this.client
                .from('game_saves')
                .upsert({
                    player_id: this.playerId,
                    universe: universe,
                    character_name: saveData.character ? saveData.character.name : 'Unknown Hero',
                    character_data: saveData.character,
                    campaign_id: saveData.campaignId,
                    current_node: saveData.currentNode,
                    save_payload: saveData,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'player_id,universe' });

            if (error) {
                console.error("[CloudSync] Error saving to Supabase:", error);
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (e) {
            console.error("[CloudSync] Unexpected error saving to cloud:", e);
            return { success: false, error: e.message };
        }
    }

    // Load save from Supabase
    async loadFromCloud(universe) {
        if (!this.syncEnabled || !this.client) {
            return { success: false, reason: 'offline' };
        }

        try {
            const { data, error } = await this.client
                .from('game_saves')
                .select('*')
                .eq('player_id', this.playerId)
                .eq('universe', universe)
                .maybeSingle();

            if (error) {
                console.error("[CloudSync] Error loading from Supabase:", error);
                return { success: false, error: error.message };
            }

            if (!data) {
                return { success: false, notFound: true };
            }

            return { success: true, saveData: data.save_payload };
        } catch (e) {
            console.error("[CloudSync] Unexpected error loading from cloud:", e);
            return { success: false, error: e.message };
        }
    }
}

window.CloudDatabaseManager = CloudDatabaseManager;
