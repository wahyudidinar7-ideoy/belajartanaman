import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PlantMission } from '../types';
import { GameArt } from './Illustrations';
import { Volume2, Sparkles, ArrowRight, Sun, Award } from 'lucide-react';
import { speak, playSunSound } from '../utils/audio';

interface KnowledgeCardModalProps {
  mission: PlantMission;
  isFirstCompletion: boolean;
  onNext: () => void;
  onClose: () => void;
}

export const KnowledgeCardModal: React.FC<KnowledgeCardModalProps> = ({
  mission,
  isFirstCompletion,
  onNext,
  onClose,
}) => {
  const { factCard } = mission;

  useEffect(() => {
    // Fire celebration confetti petals
    try {
      playSunSound();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#facc15', '#ec4899', '#38bdf8', '#f97316'],
      });
    } catch (err) {
      console.error(err);
    }

    // Read the fact aloud automatically so young kids immediately hear it
    const speech = `Hebat! Kamu dapat satu matahari! Fakta tanaman: ${factCard.plantName}. ${factCard.fact}`;
    speak(speech);
  }, [factCard]);

  const handleReadFact = () => {
    speak(`${factCard.plantName}. ${factCard.fact}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 via-white to-emerald-50 rounded-3xl border-4 border-amber-400 shadow-2xl p-6 text-center transform transition-all animate-scale-up overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-300 rounded-full opacity-40 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-300 rounded-full opacity-40 blur-xl"></div>

        {/* Celebration Title */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-yellow-500 animate-spin" size={24} />
          <h3 className="text-2xl sm:text-3xl font-black text-amber-700">
            Hore! Jawabanmu Benar! 🎉
          </h3>
          <Sparkles className="text-yellow-500 animate-spin" size={24} />
        </div>

        {/* Sun reward pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-950 rounded-full font-black text-base shadow-md mb-4 animate-bounce">
          <Sun size={20} className="fill-amber-950 animate-spin" />
          <span>+1 Matahari Bersinar! ☀️</span>
        </div>

        {/* Big Plant / Nature Illustration */}
        <div className="relative mx-auto my-2 w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-tr from-emerald-100 to-amber-100 rounded-full flex items-center justify-center border-4 border-emerald-400 shadow-lg">
          <GameArt name={factCard.icon} size={90} className="drop-shadow-md" />
          <span className="absolute -bottom-2 bg-emerald-600 text-white font-black text-xs px-3 py-0.5 rounded-full shadow">
            {factCard.category}
          </span>
        </div>

        {/* Plant Name */}
        <h4 className="text-2xl sm:text-3xl font-black text-emerald-950 mt-3 mb-1">
          {factCard.plantName}
        </h4>

        {/* Mandatory Fact Sentence: Easy, Clear Indonesian for Kindergarten */}
        <div className="bg-white/90 border-2 border-emerald-200 rounded-2xl p-3 sm:p-4 my-3 shadow-inner">
          <p className="text-xl sm:text-2xl font-black text-emerald-800 leading-snug">
            "{factCard.fact}"
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
            {factCard.description}
          </p>
        </div>

        {/* Audio Listen Button */}
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={handleReadFact}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-extrabold text-sm sm:text-base bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-md transition"
          >
            <Volume2 size={20} />
            <span>🔊 DENGARKAN FAKTA</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 text-sm sm:text-base border border-slate-300"
          >
            Lihat Kebun Saya 🌸
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2.5 rounded-2xl font-extrabold text-white bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 active:scale-95 text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
          >
            <span>Misi Selanjutnya</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
