// Web Audio API Synthesizer & SpeechSynthesis Controller
// 100% self-contained, no external mp3 required for bulletproof deployment on Vercel

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechListeners: Set<(isSpeaking: boolean, text: string) => void> = new Set();
let isCurrentlySpeaking = false;
let currentSpeakingText = '';

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

export function subscribeSpeechStatus(listener: (isSpeaking: boolean, text: string) => void) {
  speechListeners.add(listener);
  return () => {
    speechListeners.delete(listener);
  };
}

function notifySpeechStatus(speaking: boolean, text: string = '') {
  isCurrentlySpeaking = speaking;
  currentSpeakingText = text;
  speechListeners.forEach((listener) => listener(speaking, text));
}

export function setAudioMuted(muted: boolean) {
  isAudioMuted = muted;
  if (muted) {
    stopSpeech();
  }
}

export function getAudioMuted(): boolean {
  return isAudioMuted;
}

// Unlock audio context on first click/interaction
export function unlockAudio(): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play tiny inaudible buffer to unlock iOS Safari & Chrome autoplay restrictions
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.value = 0.001; // nearly silent
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);

      // Pre-warm SpeechSynthesis voices
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
          };
        }
      }
      resolve(true);
    } catch {
      resolve(false);
    }
  });
}

// "ting-ting-ting" - Arpeggio C5 -> E5 -> G5 -> C6 (Joyful Success Sound)
export function playCorrectSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      // Cute bell-like envelope
      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.3);
    });
  } catch (err) {
    console.error('Audio play error', err);
  }
}

// "tung" - Warm and soft, non-punishing encouraging tone
export function playWrongSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, now); // E4
    osc.frequency.linearRampToValueAtTime(261.63, now + 0.25); // C4 gentle drop

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch (err) {
    console.error('Audio play error', err);
  }
}

// "tuk" - Crisp button click / woodblock pop
export function playClickSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch (err) {
    console.error('Audio play error', err);
  }
}

// "taraaa" - Sun fanfare & reward sparkle
export function playSunSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Chords: G4 -> C5 -> E5 -> G5 with shimmer
    const fanfares = [
      { freq: 392.0, time: 0, dur: 0.12 },
      { freq: 523.25, time: 0.12, dur: 0.12 },
      { freq: 659.25, time: 0.24, dur: 0.14 },
      { freq: 783.99, time: 0.38, dur: 0.4 },
      { freq: 1046.5, time: 0.38, dur: 0.45 },
    ];

    fanfares.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0, now + time);
      gain.gain.linearRampToValueAtTime(0.2, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  } catch (err) {
    console.error('Audio play error', err);
  }
}

// Indonesian Text-to-Speech Engine
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  notifySpeechStatus(false, '');
}

export function isSpeaking(): boolean {
  return isCurrentlySpeaking;
}

export function getCurrentlySpeakingText(): string {
  return currentSpeakingText;
}

export function speak(
  text: string,
  onFinish?: () => void,
  onError?: (msg: string) => void
) {
  if (isAudioMuted) {
    onFinish?.();
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('Gunakan Google Chrome ya agar suara bisa aktif!');
    onFinish?.();
    return;
  }

  // Cancel any ongoing speech
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Voice selection: prioritize Indonesian voices
  const voices = window.speechSynthesis.getVoices();
  const indonesianVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('id') ||
      v.lang.toLowerCase().includes('indonesia') ||
      v.name.toLowerCase().includes('indonesia')
  );

  if (indonesianVoice) {
    utterance.voice = indonesianVoice;
  }

  utterance.lang = 'id-ID';
  utterance.rate = 0.88; // Slightly gentle & slower for 4-6 year olds
  utterance.pitch = 1.05; // Cheerful warm pitch
  utterance.volume = 1.0;

  let started = false;
  const timeoutId = setTimeout(() => {
    if (!started && isCurrentlySpeaking) {
      console.warn('SpeechSynthesis timeout notice');
      // Toast reminder if audio took too long or was muted on device
    }
  }, 1200);

  utterance.onstart = () => {
    started = true;
    clearTimeout(timeoutId);
    notifySpeechStatus(true, text);
  };

  utterance.onend = () => {
    clearTimeout(timeoutId);
    notifySpeechStatus(false, '');
    onFinish?.();
  };

  utterance.onerror = (e) => {
    clearTimeout(timeoutId);
    console.error('SpeechSynthesis error:', e);
    notifySpeechStatus(false, '');
    onError?.('Klik lagi ya, pastikan volume perangkat tidak mute!');
    onFinish?.();
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    clearTimeout(timeoutId);
    notifySpeechStatus(false, '');
    onError?.('Pastikan izin suara aktif di browser Chrome.');
    onFinish?.();
  }
}
