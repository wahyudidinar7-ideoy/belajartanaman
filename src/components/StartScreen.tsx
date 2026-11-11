import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { CharacterAvatar } from './Illustrations';
import { Play, Volume2, Sparkles, Check, Heart } from 'lucide-react';
import { unlockAudio, playCorrectSound, speak } from '../utils/audio';

interface StartScreenProps {
  initialProfile: StudentProfile;
  onStart: (profile: StudentProfile) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  initialProfile,
  onStart,
}) => {
  const [name, setName] = useState(initialProfile.name || 'Anak Hebat');
  const [grade, setGrade] = useState<'TK A' | 'TK B'>(initialProfile.grade || 'TK B');
  const [character, setCharacter] = useState<'bimo' | 'ayu'>(initialProfile.character || 'bimo');
  const [isActivating, setIsActivating] = useState(false);

  const handleStartGame = async () => {
    setIsActivating(true);
    // Mandatory unlockAudio for web audio & speechSynthesis
    await unlockAudio();
    playCorrectSound();

    const chosenName = name.trim() || 'Anak Hebat';
    const updatedProfile: StudentProfile = {
      ...initialProfile,
      name: chosenName,
      grade,
      character,
    };

    speak(
      `Halo ${chosenName}! Selamat datang di Petualangan Taman Putra Harapan! Ayo kita belajar berkebun bersama!`,
      () => {
        onStart(updatedProfile);
      }
    );

    // Proceed to app
    setTimeout(() => {
      onStart(updatedProfile);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gradient-to-br from-emerald-400 via-sky-300 to-amber-200 overflow-y-auto">
      {/* Decorative backdrop elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce pointer-events-none opacity-80">
        🌱
      </div>
      <div className="absolute top-12 right-12 text-6xl animate-pulse pointer-events-none opacity-80">
        ☀️
      </div>
      <div className="absolute bottom-10 left-12 text-6xl animate-bounce pointer-events-none opacity-80">
        🌻
      </div>
      <div className="absolute bottom-8 right-10 text-6xl animate-pulse pointer-events-none opacity-80">
        🦋
      </div>

      {/* Main Welcoming Card */}
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl border-4 border-yellow-400 shadow-2xl p-5 sm:p-8 text-center flex flex-col items-center">
        {/* School & App Brand */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs sm:text-sm mb-2 border border-emerald-300">
          <Sparkles size={14} className="text-amber-500" />
          <span>TK PGRI Putra Harapan • Belajar Sambil Berkebun</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-emerald-900 tracking-tight leading-tight">
          🌱 PETUALANGAN TAMAN PUTRA HARAPAN
        </h1>
        <p className="text-sm sm:text-base text-amber-700 font-extrabold mt-1">
          Game Edukasi Anak TK A & TK B (Usia 4 - 6 Tahun)
        </p>

        {/* Input Nama Anak */}
        <div className="w-full mt-4 text-left">
          <label className="block text-xs sm:text-sm font-black text-slate-700 mb-1">
            Siapa Nama Petani Cilik?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ketik nama anak..."
            maxLength={20}
            className="w-full px-4 py-2.5 rounded-2xl border-2 border-emerald-300 focus:border-amber-400 focus:outline-none text-base sm:text-lg font-extrabold text-emerald-950 bg-emerald-50/50 shadow-inner"
          />
        </div>

        {/* Grade Selector (TK A vs TK B) */}
        <div className="w-full mt-3 flex items-center justify-between gap-3 text-left">
          <span className="text-xs sm:text-sm font-black text-slate-700">
            Kelompok Belajar:
          </span>
          <div className="flex gap-2">
            {(['TK A', 'TK B'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className={`px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition ${
                  grade === g
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Character Selector */}
        <div className="w-full mt-4">
          <span className="block text-xs sm:text-sm font-black text-slate-700 mb-2 text-left">
            Pilih Karakter Sahabat Berkebun:
          </span>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Character Bimo */}
            <div
              onClick={() => setCharacter('bimo')}
              className={`p-3 rounded-2xl border-3 cursor-pointer transition-all flex flex-col items-center ${
                character === 'bimo'
                  ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <CharacterAvatar character="bimo" size={70} />
              <span className="font-black text-sm sm:text-base text-slate-900 mt-1">
                👦 Bimo
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                Topi Petani Cilik
              </span>
              {character === 'bimo' && (
                <span className="mt-1 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center gap-1">
                  <Check size={10} /> Dipilih
                </span>
              )}
            </div>

            {/* Character Ayu */}
            <div
              onClick={() => setCharacter('ayu')}
              className={`p-3 rounded-2xl border-3 cursor-pointer transition-all flex flex-col items-center ${
                character === 'ayu'
                  ? 'border-pink-500 bg-pink-50 shadow-md ring-2 ring-pink-300 scale-102'
                  : 'border-slate-200 bg-white hover:border-pink-300'
              }`}
            >
              <CharacterAvatar character="ayu" size={70} />
              <span className="font-black text-sm sm:text-base text-slate-900 mt-1">
                👧 Ayu
              </span>
              <span className="text-[11px] font-bold text-pink-700">
                Pita Bunga Cantik
              </span>
              {character === 'ayu' && (
                <span className="mt-1 px-2 py-0.5 bg-pink-600 text-white text-[10px] font-black rounded-full flex items-center gap-1">
                  <Check size={10} /> Dipilih
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Big Mandatory Audio Activation Button */}
        <button
          onClick={handleStartGame}
          disabled={isActivating}
          className="w-full mt-6 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-400 hover:from-emerald-600 hover:via-amber-500 hover:to-yellow-500 active:scale-95 text-amber-950 font-black text-lg sm:text-2xl shadow-xl border-3 border-amber-300 flex items-center justify-center gap-3 transition-transform cursor-pointer animate-pulse"
        >
          <Play size={28} className="fill-amber-950" />
          <span>▶️ MULAI + AKTIFKAN SUARA</span>
        </button>

        {/* Audio notice for Chrome */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
          <Volume2 size={14} className="text-emerald-600" />
          <span>
            Audio interaktif & narasi berbahasa Indonesia dioptimalkan untuk Google Chrome.
          </span>
        </div>

        {/* Loving footer badge */}
        <div className="mt-3 text-[11px] text-emerald-800 font-bold flex items-center gap-1">
          <span>Dibuat dengan</span>
          <Heart size={12} className="fill-rose-500 text-rose-500" />
          <span>untuk anak-anak TK PGRI Putra Harapan</span>
        </div>
      </div>
    </div>
  );
};
