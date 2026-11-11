import React, { useState, useEffect } from 'react';
import { PLANT_MISSIONS } from './data/missions';
import { StudentProfile } from './types';
import { GardenMap } from './components/GardenMap';
import { QuestionPanel } from './components/QuestionPanel';
import { KnowledgeCardModal } from './components/KnowledgeCardModal';
import { PlantCollectionModal } from './components/PlantCollectionModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { TeacherModeModal } from './components/TeacherModeModal';
import { StartScreen } from './components/StartScreen';
import { GrandTreeModal } from './components/GrandTreeModal';
import { PrintCertificate } from './components/PrintCertificate';
import { CharacterAvatar } from './components/Illustrations';
import {
  Sun,
  Volume2,
  VolumeX,
  Flower2,
  Trophy,
  GraduationCap,
  Map,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  setAudioMuted,
  getAudioMuted,
  stopSpeech,
  subscribeSpeechStatus,
  playClickSound,
} from './utils/audio';

const STORAGE_KEY = 'taman_putra_harapan_profile';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Anak Hebat',
  grade: 'TK B',
  character: 'bimo',
  suns: 0,
  unlockedMission: 1,
  completedMissions: [],
  homeworkMissions: [1, 2, 3, 4, 5],
};

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [currentMissionId, setCurrentMissionId] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Modals state
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showGrandTreeModal, setShowGrandTreeModal] = useState(false);

  // Mobile tab switcher: 'question' or 'map'
  const [mobileTab, setMobileTab] = useState<'question' | 'map'>('question');

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Subscribe to speech status
  useEffect(() => {
    const unsubscribe = subscribeSpeechStatus((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  const currentMission =
    PLANT_MISSIONS.find((m) => m.id === currentMissionId) || PLANT_MISSIONS[0];

  const toggleMute = () => {
    playClickSound();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setAudioMuted(nextMuted);
  };

  const handleStartGame = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    setHasStarted(true);
  };

  const handleCorrectAnswer = () => {
    const isFirstTime = !profile.completedMissions.includes(currentMissionId);

    if (isFirstTime) {
      const newCompleted = [...profile.completedMissions, currentMissionId];
      const newSuns = Math.min(10, profile.suns + 1);
      const nextUnlocked = Math.min(10, Math.max(profile.unlockedMission, currentMissionId + 1));

      setProfile((prev) => ({
        ...prev,
        completedMissions: newCompleted,
        suns: newSuns,
        unlockedMission: nextUnlocked,
      }));
    }

    setShowKnowledgeModal(true);
  };

  const handleNextMissionAfterFact = () => {
    setShowKnowledgeModal(false);
    if (currentMissionId < 10) {
      setCurrentMissionId((prev) => prev + 1);
    } else {
      setShowGrandTreeModal(true);
    }
  };

  const handleResetProgress = () => {
    const freshProfile: StudentProfile = {
      ...profile,
      suns: 0,
      unlockedMission: 1,
      completedMissions: [],
    };
    setProfile(freshProfile);
    setCurrentMissionId(1);
  };

  const handlePrintCertificate = () => {
    stopSpeech();
    window.print();
  };

  const progressPercent = Math.round((profile.suns / 10) * 100);

  return (
    <>
      {/* Printable Certificate Layer for physical printout */}
      <PrintCertificate missions={PLANT_MISSIONS} profile={profile} />

      {/* Screen Welcome Gateway (Starts audio context and prompts child name) */}
      {!hasStarted && (
        <StartScreen initialProfile={profile} onStart={handleStartGame} />
      )}

      {/* Main Single-Screen App Container: 100dvh & overflow: hidden */}
      <div className="print:hidden w-screen h-[100dvh] overflow-hidden flex flex-col justify-between bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 select-none font-['Baloo_2',sans-serif]">
        {/* ===================== TOP HEADER & STATUS BAR ===================== */}
        <header className="shrink-0 bg-white/95 backdrop-blur-md border-b-3 border-emerald-400 px-3 sm:px-5 py-1.5 shadow-sm z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Left: School & App Brand */}
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl animate-bounce">🌱</span>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-black text-emerald-800 tracking-tight leading-none flex items-center gap-1.5">
                  <span>PETUALANGAN TAMAN PUTRA HARAPAN</span>
                </h1>
                <span className="text-[11px] sm:text-xs font-black text-amber-600 block leading-tight">
                  TK PGRI Putra Harapan • Belajar Sambil Berkebun
                </span>
              </div>
            </div>

            {/* Center: Student Info, Total Suns, Progress Bar */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Student Name & Avatar */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-300">
                <CharacterAvatar character={profile.character} size={28} />
                <span className="font-extrabold text-xs sm:text-sm text-emerald-950">
                  {profile.name}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded-full border border-emerald-200">
                  {profile.grade}
                </span>
              </div>

              {/* Total Suns ☀️ (0-10) */}
              <div
                onClick={() => setShowGrandTreeModal(true)}
                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-300 to-amber-400 text-amber-950 rounded-full font-black text-sm sm:text-base shadow-sm border border-amber-500 cursor-pointer hover:scale-105 active:scale-95 transition"
                title="Total Matahari Kebun (0 - 10)"
              >
                <Sun size={20} className="fill-amber-950 text-amber-950 animate-spin" />
                <span>{profile.suns} / 10 ☀️</span>
              </div>

              {/* Progress Taman (Flower Bar 0-100%) */}
              <div className="hidden md:flex flex-col items-start w-32 lg:w-40">
                <div className="flex justify-between w-full text-[10px] font-black text-emerald-800">
                  <span>Taman Mekar</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-emerald-200 rounded-full overflow-hidden p-0.5 border border-emerald-400">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Right: Audio Toggle & Quick Nav Modals */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Sound ON/OFF Toggle */}
              <button
                onClick={toggleMute}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl font-bold text-xs shadow-xs transition active:scale-95 ${
                  isMuted
                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                }`}
                title="Aktifkan / Matikan Suara"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span className="hidden sm:inline">
                  {isMuted ? 'SUARA: OFF' : 'SUARA: ON'}
                </span>
              </button>

              {/* Koleksi Tanaman */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowCollectionModal(true);
                }}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-300 font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition"
                title="Koleksi Tanaman"
              >
                <Flower2 size={16} className="text-pink-600" />
                <span className="hidden lg:inline">Koleksi</span>
              </button>

              {/* Bintang Kelas */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowLeaderboardModal(true);
                }}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition"
                title="Bintang Kelas Rajin"
              >
                <Trophy size={16} className="text-amber-600" />
                <span className="hidden lg:inline">Bintang</span>
              </button>

              {/* Mode Guru */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowTeacherModal(true);
                }}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition"
                title="Mode Guru (Password: guru123)"
              >
                <GraduationCap size={16} className="text-indigo-600" />
                <span className="hidden lg:inline">Guru</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile View Tab Switcher (Visible only on phone screens <768px) */}
        <div className="flex md:hidden bg-emerald-100 p-1 border-b border-emerald-300 justify-around text-xs font-black">
          <button
            onClick={() => setMobileTab('question')}
            className={`flex-1 py-1 rounded-xl flex items-center justify-center gap-1 transition ${
              mobileTab === 'question'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-800'
            }`}
          >
            <HelpCircle size={14} />
            <span>Misi Soal #{currentMissionId}</span>
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-1 rounded-xl flex items-center justify-center gap-1 transition ${
              mobileTab === 'map'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-800'
            }`}
          >
            <Map size={14} />
            <span>Peta Kebun ({profile.suns}/10 ☀️)</span>
          </button>
        </div>

        {/* ===================== MAIN GAME BODY (100dvh fits 1 screen) ===================== */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 min-h-0 overflow-hidden">
          {/* LAPTOP / TABLET LANDSCAPE LAYOUT (>1024px and md:flex):
              Kiri (35%) Peta Kebun, Kanan (65%) Soal + Jawaban */}
          <div className="w-full h-full hidden md:grid md:grid-cols-12 gap-3 lg:gap-4 overflow-hidden">
            {/* Left 35% (approx 4-5 cols of 12) -> Peta Kebun */}
            <div className="md:col-span-5 lg:col-span-4 h-full min-h-0 overflow-hidden">
              <GardenMap
                missions={PLANT_MISSIONS}
                currentMissionId={currentMissionId}
                profile={profile}
                onSelectMission={(id) => setCurrentMissionId(id)}
                onOpenGrandTree={() => setShowGrandTreeModal(true)}
              />
            </div>

            {/* Right 65% (approx 7-8 cols of 12) -> Soal + Jawaban */}
            <div className="md:col-span-7 lg:col-span-8 h-full min-h-0 overflow-hidden">
              <QuestionPanel
                mission={currentMission}
                isSpeaking={isSpeaking}
                onCorrectAnswer={handleCorrectAnswer}
                canGoPrev={currentMissionId > 1}
                canGoNext={
                  currentMissionId < 10 &&
                  profile.completedMissions.includes(currentMissionId)
                }
                onPrevMission={() => setCurrentMissionId((id) => Math.max(1, id - 1))}
                onNextMission={() => setCurrentMissionId((id) => Math.min(10, id + 1))}
              />
            </div>
          </div>

          {/* MOBILE PORTRAIT LAYOUT (<768px):
              Full height 1 column. Toggles between Question and Garden Map without losing state */}
          <div className="w-full h-full md:hidden flex flex-col min-h-0 overflow-hidden">
            {mobileTab === 'question' ? (
              <div className="w-full h-full min-h-0 overflow-hidden">
                <QuestionPanel
                  mission={currentMission}
                  isSpeaking={isSpeaking}
                  onCorrectAnswer={handleCorrectAnswer}
                  canGoPrev={currentMissionId > 1}
                  canGoNext={
                    currentMissionId < 10 &&
                    profile.completedMissions.includes(currentMissionId)
                  }
                  onPrevMission={() => setCurrentMissionId((id) => Math.max(1, id - 1))}
                  onNextMission={() => setCurrentMissionId((id) => Math.min(10, id + 1))}
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-0 overflow-hidden">
                <GardenMap
                  missions={PLANT_MISSIONS}
                  currentMissionId={currentMissionId}
                  profile={profile}
                  onSelectMission={(id) => {
                    setCurrentMissionId(id);
                    setMobileTab('question');
                  }}
                  onOpenGrandTree={() => setShowGrandTreeModal(true)}
                />
              </div>
            )}
          </div>
        </main>

        {/* ===================== FOOTER ===================== */}
        <footer className="shrink-0 bg-emerald-800 text-emerald-100 text-center py-1 px-3 text-[11px] sm:text-xs font-bold border-t border-emerald-900 flex items-center justify-between">
          <span className="flex items-center gap-1">
            🌱 <span>Taman Belajar TK A & TK B</span>
          </span>
          <span className="tracking-wide">
            created by TK PGRI Putra Harapan
          </span>
          <span className="hidden sm:inline">
            Modul Merawat Lingkungan Hidup
          </span>
        </footer>
      </div>

      {/* ===================== MODALS ===================== */}
      {/* 1. Knowledge Card Modal (upon answering correctly) */}
      {showKnowledgeModal && (
        <KnowledgeCardModal
          mission={currentMission}
          isFirstCompletion={true}
          onNext={handleNextMissionAfterFact}
          onClose={() => setShowKnowledgeModal(false)}
        />
      )}

      {/* 2. Koleksi Tanaman Modal */}
      {showCollectionModal && (
        <PlantCollectionModal
          missions={PLANT_MISSIONS}
          profile={profile}
          onClose={() => setShowCollectionModal(false)}
        />
      )}

      {/* 3. Bintang Kelas Leaderboard Modal */}
      {showLeaderboardModal && (
        <LeaderboardModal
          currentProfile={profile}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}

      {/* 4. Mode Guru Modal (Password protected: guru123) */}
      {showTeacherModal && (
        <TeacherModeModal
          missions={PLANT_MISSIONS}
          profile={profile}
          onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
          onResetProgress={handleResetProgress}
          onPrintReport={handlePrintCertificate}
          onClose={() => setShowTeacherModal(false)}
        />
      )}

      {/* 5. Grand Tree / Greenhouse Finale Modal */}
      {showGrandTreeModal && (
        <GrandTreeModal
          missions={PLANT_MISSIONS}
          profile={profile}
          onPrintCertificate={handlePrintCertificate}
          onClose={() => setShowGrandTreeModal(false)}
        />
      )}
    </>
  );
}
