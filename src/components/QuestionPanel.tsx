import React, { useState } from 'react';
import { PlantMission, MissionChoice } from '../types';
import { GameArt } from './Illustrations';
import { Volume2, Square, Sparkles, AlertCircle, HeartHandshake } from 'lucide-react';
import {
  speak,
  stopSpeech,
  playCorrectSound,
  playWrongSound,
  playClickSound,
} from '../utils/audio';

interface QuestionPanelProps {
  mission: PlantMission;
  isSpeaking: boolean;
  onCorrectAnswer: () => void;
  onPrevMission?: () => void;
  onNextMission?: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  mission,
  isSpeaking,
  onCorrectAnswer,
  onPrevMission,
  onNextMission,
  canGoPrev,
  canGoNext,
}) => {
  const [selectedWrongChoiceId, setSelectedWrongChoiceId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [shakingChoiceId, setShakingChoiceId] = useState<string | null>(null);

  const handleReadQuestion = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speak(mission.questionSpeech);
    }
  };

  const handleChoiceClick = (choice: MissionChoice) => {
    playClickSound();

    if (choice.isCorrect) {
      setSelectedWrongChoiceId(null);
      setFeedbackMessage(null);
      playCorrectSound();
      speak('Yeay! Hebat sekali! Jawabanmu benar!', () => {
        onCorrectAnswer();
      });
    } else {
      playWrongSound();
      setSelectedWrongChoiceId(choice.id);
      setShakingChoiceId(choice.id);
      setFeedbackMessage('Tidak apa-apa, coba lagi ya! 🌱');
      speak('Tidak apa-apa, coba pilih lagi ya sayang.');

      setTimeout(() => {
        setShakingChoiceId(null);
      }, 700);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl border-4 border-emerald-400 shadow-xl overflow-hidden">
      {/* Top Header of Question: Mission Badge + Step Navigator */}
      <div className="flex items-center justify-between gap-2 border-b-2 border-emerald-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-sm sm:text-base rounded-full shadow-sm flex items-center gap-1.5">
            <Sparkles size={14} className="text-yellow-300" />
            {mission.badge}
          </span>
          <span className="hidden sm:inline font-bold text-emerald-800 text-base">
            {mission.title}
          </span>
        </div>

        {/* Listen to Question Audio Button */}
        <button
          onClick={handleReadQuestion}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
            isSpeaking
              ? 'bg-amber-500 text-white animate-pulse ring-2 ring-amber-300'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300'
          }`}
          title="Dengarkan Soal Bersuara"
        >
          {isSpeaking ? (
            <>
              <Square size={16} className="fill-white" />
              <span>⏸️ BERHENTI</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>🔊 DENGARKAN SOAL</span>
            </>
          )}
        </button>
      </div>

      {/* Main Question Area (Fits 1 screen, responsive font) */}
      <div className="my-auto py-2 text-center flex flex-col items-center justify-center">
        {/* Visual Topic Icon */}
        <div className="mb-2 p-1 bg-emerald-50 rounded-2xl border-2 border-emerald-200 shadow-sm max-w-[90px] sm:max-w-[110px]">
          <GameArt name={mission.icon} size="100%" className="max-h-[70px] sm:max-h-[90px]" />
        </div>

        {/* Big Kid-Friendly Question Text: 28-38px on desktop, 18-22px on mobile */}
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-emerald-950 tracking-tight leading-snug max-w-2xl px-2">
          {mission.question}
        </h2>

        {/* Soft Feedback Toast if child clicked a distractor */}
        {feedbackMessage && (
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 border-2 border-amber-400 text-amber-900 rounded-full font-bold text-sm animate-bounce shadow-md">
            <HeartHandshake size={18} className="text-amber-600" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {isSpeaking && (
          <div className="mt-1 flex items-center gap-2 text-xs font-bold text-emerald-700 animate-pulse">
            <span className="flex gap-1">
              <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-bounce"></span>
            </span>
            <span>Sedang membacakan soal...</span>
          </div>
        )}
      </div>

      {/* 3 Large Choices with Big Visual Illustration + Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
        {mission.choices.map((choice, index) => {
          const isWrong = selectedWrongChoiceId === choice.id;
          const isShaking = shakingChoiceId === choice.id;

          const letterBadge = ['A', 'B', 'C'][index];

          return (
            <button
              key={choice.id}
              onClick={() => handleChoiceClick(choice)}
              className={`relative flex flex-row md:flex-col items-center justify-start md:justify-center p-2.5 sm:p-4 rounded-2xl border-3 transition-all duration-200 cursor-pointer text-left md:text-center active:scale-95 group shadow-md ${
                isWrong
                  ? 'bg-rose-50 border-rose-400 text-rose-900 opacity-90'
                  : 'bg-gradient-to-b from-white to-emerald-50/60 border-emerald-300 hover:border-amber-400 hover:shadow-lg hover:bg-amber-50/30 text-slate-800'
              } ${isShaking ? 'animate-shake' : ''}`}
            >
              {/* Choice Letter (A, B, C) */}
              <span
                className={`absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-xs ${
                  isWrong
                    ? 'bg-rose-400 text-white'
                    : 'bg-emerald-600 text-white group-hover:bg-amber-500'
                }`}
              >
                {letterBadge}
              </span>

              {/* Big Illustrated Art (Cartoony & Colorful) */}
              <div className="shrink-0 mr-3 md:mr-0 md:mb-2 ml-7 md:ml-0">
                <GameArt
                  name={choice.iconName}
                  size={52}
                  className="transition-transform group-hover:scale-110"
                />
              </div>

              {/* Choice Labels: 22-28px desktop, 16-18px mobile */}
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-900 group-hover:text-amber-800 leading-tight">
                  {choice.label}
                </span>
                {choice.subLabel && (
                  <span className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                    {choice.subLabel}
                  </span>
                )}
              </div>

              {/* Speaker icon hint to read option */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  speak(choice.speechText);
                }}
                className="ml-auto md:ml-0 md:mt-2 text-emerald-600 hover:text-emerald-800 p-1 rounded-full hover:bg-emerald-100"
                title="Dengar pilihan ini"
              >
                <Volume2 size={16} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-emerald-100 text-xs font-bold text-slate-500">
        <button
          onClick={onPrevMission}
          disabled={!canGoPrev}
          className={`px-3 py-1 rounded-lg border flex items-center gap-1 transition ${
            canGoPrev
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              : 'opacity-40 cursor-not-allowed text-slate-400'
          }`}
        >
          ⬅️ Misi Sebelumnya
        </button>

        <div className="flex items-center gap-1 text-emerald-800 font-extrabold text-xs sm:text-sm">
          <span>Petualangan Kebun TK PGRI Putra Harapan</span>
        </div>

        <button
          onClick={onNextMission}
          disabled={!canGoNext}
          className={`px-3 py-1 rounded-lg border flex items-center gap-1 transition ${
            canGoNext
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
              : 'opacity-40 cursor-not-allowed text-slate-400'
          }`}
        >
          Misi Berikutnya ➡️
        </button>
      </div>
    </div>
  );
};
