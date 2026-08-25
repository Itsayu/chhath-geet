/**
 * Web Audio API Synthesizer for Authentic Chhath Ghat Soundscapes
 * Resonant Temple Bell, Sacred Shankh (Conch), Water Ripple, and Ghat Ambiance
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Rings a resonant authentic brass temple bell (घंटी की गूँज)
 */
export function playTempleBell(volume = 0.6) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Fundamental frequencies for brass bell harmonics
    const freqs = [587.33, 1174.66, 1760.0, 2349.32, 3520.0];
    const gains = [0.5, 0.35, 0.2, 0.15, 0.08];
    const decayTimes = [3.5, 2.8, 2.2, 1.6, 1.2];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.connect(ctx.destination);

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 4 - 2), now);

      // Strike transient
      gain.gain.setValueAtTime(gains[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTimes[idx]);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decayTimes[idx]);
    });
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
}

/**
 * Resonates a deep, sacred conch blow (शंखनाद)
 */
export function playShankh(volume = 0.5) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 2.8;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    // Smooth swell up then steady release
    masterGain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.5);
    masterGain.gain.setValueAtTime(volume * 0.7, now + duration - 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    masterGain.connect(ctx.destination);

    // Warm filter for organic horn acoustics
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(440, now);
    filter.Q.setValueAtTime(3.5, now);
    filter.connect(masterGain);

    const fundamental = 220; // A3
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(fundamental, now);
    osc1.frequency.linearRampToValueAtTime(fundamental * 1.03, now + duration * 0.6);
    osc1.frequency.linearRampToValueAtTime(fundamental * 0.98, now + duration);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(fundamental * 2.01, now);

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(fundamental * 3, now);

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const gain3 = ctx.createGain();

    gain1.gain.value = 0.45;
    gain2.gain.value = 0.35;
    gain3.gain.value = 0.2;

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  } catch (err) {
    console.warn('Shankh audio failed:', err);
  }
}

/**
 * Simulates gentle river water ripple and diya offering chime (दीप दान)
 */
export function playWaterRipple(volume = 0.4) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Chime notes (Pentatonic sacred)
    const notes = [659.25, 783.99, 987.77, 1318.51];
    const pitch = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.05, now + 0.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  } catch (err) {
    console.warn('Water audio failed:', err);
  }
}

/**
 * Ambient Ghat Generator (River water waves & soft morning wind)
 */
let ambientGainNode: GainNode | null = null;
let isAmbientRunning = false;

export function toggleAmbientRiver(enable: boolean, targetVolume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (enable) {
      if (isAmbientRunning && ambientGainNode) {
        ambientGainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 1);
        return;
      }

      // Generate pink/brown noise for river waves
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Modulate filter for wave surges
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.18; // Slow wave cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 160;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      ambientGainNode = ctx.createGain();
      ambientGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      ambientGainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 2);

      whiteNoise.connect(filter);
      filter.connect(ambientGainNode);
      ambientGainNode.connect(ctx.destination);

      whiteNoise.start();
      lfo.start();
      isAmbientRunning = true;
    } else {
      if (ambientGainNode) {
        ambientGainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
        setTimeout(() => {
          isAmbientRunning = false;
        }, 1200);
      }
    }
  } catch (err) {
    console.warn('Ambient failed:', err);
  }
}
