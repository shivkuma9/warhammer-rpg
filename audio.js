// audio.js - Atmospheric Procedural Audio Engine for Warhammer Grimdark RPG
// Uses Web Audio API without needing external sound files

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.ambientGain = null;
        this.ambientOsc = null;
        this.ambientActive = false;
        this.enabled = true;
    }

    init() {
        if (this.ctx) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.6;
            this.masterGain.connect(this.ctx.destination);
        } catch (e) {
            console.warn('Web Audio API not supported or blocked:', e);
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Mechanical cogitator keyboard click / terminal tick
    playClick() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    // Heavy mechanical lever / Cogitator Confirm
    playConfirm() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Dice rolling / clattering sound
    playDiceRoll() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const count = 7;
        for (let i = 0; i < count; i++) {
            const timeOffset = now + i * 0.045 + (Math.random() * 0.02);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(400 + Math.random() * 500, timeOffset);
            osc.frequency.exponentialRampToValueAtTime(150 + Math.random() * 200, timeOffset + 0.035);

            gain.gain.setValueAtTime(0.2, timeOffset);
            gain.gain.exponentialRampToValueAtTime(0.001, timeOffset + 0.035);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(timeOffset);
            osc.stop(timeOffset + 0.04);
        }
    }

    // Success chime / Imperial Blessing
    playSuccess() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [330, 440, 554.37, 659.25]; // E major chord
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.06);

            gain.gain.setValueAtTime(0.25, now + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now + idx * 0.06);
            osc.stop(now + idx * 0.06 + 0.42);
        });
    }

    // Failure / Dread warning klaxon
    playFailure() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [220, 207.65, 196]; // Ominous descending tritone
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);

            gain.gain.setValueAtTime(0.3, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.38);
        });
    }

    // Boltgun / Weapon discharge
    playGunshot() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // White noise buffer for explosion crack
        const bufferSize = this.ctx.sampleRate * 0.3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.28);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        // Low frequency thud
        const thud = this.ctx.createOscillator();
        const thudGain = this.ctx.createGain();
        thud.type = 'sine';
        thud.frequency.setValueAtTime(140, now);
        thud.frequency.exponentialRampToValueAtTime(30, now + 0.25);

        thudGain.gain.setValueAtTime(0.7, now);
        thudGain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

        thud.connect(thudGain);
        thudGain.connect(this.masterGain);

        noise.start(now);
        thud.start(now);
        noise.stop(now + 0.32);
        thud.stop(now + 0.32);
    }

    // Chainsword revving / Melee strike
    playChainsword() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(280, now + 0.1);
        osc.frequency.linearRampToValueAtTime(90, now + 0.3);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    // Warp / Psychic Surge
    playWarpSurge() {
        if (!this.enabled) return;
        this.init();
        this.resume();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sawtooth';

        osc1.frequency.setValueAtTime(60, now);
        osc1.frequency.linearRampToValueAtTime(240, now + 0.3);
        osc1.frequency.exponentialRampToValueAtTime(40, now + 0.6);

        osc2.frequency.setValueAtTime(63, now); // slight detune for sinister beating
        osc2.frequency.linearRampToValueAtTime(246, now + 0.3);
        osc2.frequency.exponentialRampToValueAtTime(42, now + 0.6);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
    }

    // Toggle background ambient void hum
    toggleAmbient() {
        this.init();
        this.resume();
        if (!this.ctx) return false;

        if (this.ambientActive) {
            if (this.ambientGain) {
                this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
                this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
            }
            setTimeout(() => {
                if (this.ambientOsc) {
                    try { this.ambientOsc.stop(); } catch (e) {}
                    this.ambientOsc = null;
                }
            }, 1100);
            this.ambientActive = false;
            return false;
        } else {
            const now = this.ctx.currentTime;
            this.ambientOsc = this.ctx.createOscillator();
            this.ambientGain = this.ctx.createGain();

            this.ambientOsc.type = 'triangle';
            this.ambientOsc.frequency.setValueAtTime(55, now); // Low A hum

            this.ambientGain.gain.setValueAtTime(0.0001, now);
            this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 2.0);

            this.ambientOsc.connect(this.ambientGain);
            this.ambientGain.connect(this.masterGain);

            this.ambientOsc.start(now);
            this.ambientActive = true;
            return true;
        }
    }
}

window.soundEngine = new SoundEngine();
