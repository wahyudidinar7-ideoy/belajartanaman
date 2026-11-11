import React from 'react';
import { PlantMission, StudentProfile } from '../types';
import { CharacterAvatar, GameArt, GrandTreeIllustration } from './Illustrations';
import { Lock, Sparkles, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface GardenMapProps {
  missions: PlantMission[];
  currentMissionId: number;
  profile: StudentProfile;
  onSelectMission: (missionId: number) => void;
  onOpenGrandTree: () => void;
}

export const GardenMap: React.FC<GardenMapProps> = ({
  missions,
  currentMissionId,
  profile,
  onSelectMission,
  onOpenGrandTree,
}) => {
  // 10 Plot coordinates along a charming winding S-curve garden path
  // Coordinate percentages (x, y) on a 100x100 garden canvas
  const plotPositions = [
    { id: 1, x: 20, y: 88 },
    { id: 2, x: 50, y: 86 },
    { id: 3, x: 80, y: 80 },
    { id: 4, x: 74, y: 65 },
    { id: 5, x: 45, y: 64 },
    { id: 6, x: 20, y: 55 },
    { id: 7, x: 28, y: 38 },
    { id: 8, x: 58, y: 40 },
    { id: 9, x: 82, y: 32 },
    { id: 10, x: 50, y: 18 },
  ];

  const activePos = plotPositions.find((p) => p.id === currentMissionId) || plotPositions[0];
  const allCompleted = profile.suns >= 10;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-emerald-100 to-emerald-200 border-4 border-emerald-400 shadow-inner flex flex-col justify-between">
      {/* Sky & Clouds background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft floating clouds */}
        <div className="absolute top-2 left-4 opacity-75 animate-pulse">
          <svg width="70" height="35" viewBox="0 0 100 50" fill="#ffffff">
            <path d="M20 35C15 35 10 30 10 25C10 20 15 16 20 16C22 10 28 6 35 6C42 6 48 10 50 16C54 16 58 20 58 25C58 30 54 35 50 35H20Z" />
          </svg>
        </div>
        <div className="absolute top-6 right-8 opacity-65">
          <svg width="60" height="30" viewBox="0 0 100 50" fill="#ffffff">
            <path d="M20 35C15 35 10 30 10 25C10 20 15 16 20 16C22 10 28 6 35 6C42 6 48 10 50 16C54 16 58 20 58 25C58 30 54 35 50 35H20Z" />
          </svg>
        </div>

        {/* Flying cartoon butterfly */}
        <div className="absolute top-16 right-16 animate-bounce text-pink-400 text-xl">
          🦋
        </div>
        <div className="absolute top-36 left-8 animate-pulse text-amber-400 text-lg">
          🐝
        </div>

        {/* Rolling hills / garden grass texture */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 45 Q 25 35, 50 48 T 100 40 L 100 100 L 0 100 Z"
            fill="#86efac"
          />
          <path
            d="M0 65 Q 35 55, 70 68 T 100 62 L 100 100 L 0 100 Z"
            fill="#4ade80"
          />
        </svg>

        {/* Winding soil garden path (Cobblestones / Tanah liat) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 20 88 Q 35 90, 50 86 T 80 80 Q 82 72, 74 65 T 45 64 Q 28 62, 20 55 T 28 38 Q 45 36, 58 40 T 82 32 Q 70 22, 50 18"
            fill="none"
            stroke="#fde047"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="2 3"
            opacity="0.8"
          />
          <path
            d="M 20 88 Q 35 90, 50 86 T 80 80 Q 82 72, 74 65 T 45 64 Q 28 62, 20 55 T 28 38 Q 45 36, 58 40 T 82 32 Q 70 22, 50 18"
            fill="none"
            stroke="#d97706"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Top of Garden: The Grand Tree / Greenhouse */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        <GrandTreeIllustration
          isGlowing={allCompleted}
          onClick={() => {
            playClickSound();
            onOpenGrandTree();
          }}
        />
      </div>

      {/* 10 Garden Plots / Pots */}
      <div className="absolute inset-0 pointer-events-auto">
        {plotPositions.map((pos) => {
          const mission = missions.find((m) => m.id === pos.id)!;
          const isCompleted = profile.completedMissions.includes(pos.id);
          const isCurrent = pos.id === currentMissionId;
          const isUnlocked = pos.id <= profile.unlockedMission;
          const isHomework = profile.homeworkMissions?.includes(pos.id);

          return (
            <div
              key={pos.id}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 flex flex-col items-center group cursor-pointer"
              onClick={() => {
                playClickSound();
                if (isUnlocked) {
                  onSelectMission(pos.id);
                }
              }}
            >
              {/* Plot Pot Button */}
              <div
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  isCurrent
                    ? 'ring-4 ring-yellow-400 bg-amber-100 scale-125 z-30 animate-pulse shadow-yellow-400/50'
                    : isCompleted
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-600 hover:scale-110'
                    : isUnlocked
                    ? 'bg-white border-2 border-emerald-500 hover:scale-105'
                    : 'bg-slate-200/90 border-2 border-slate-400 opacity-80 cursor-not-allowed'
                }`}
              >
                {/* Visual Icon based on mission state */}
                {isCompleted ? (
                  <div className="relative flex items-center justify-center">
                    <GameArt name={mission.icon} size={28} />
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                      <Sparkles size={10} />
                    </span>
                  </div>
                ) : isUnlocked ? (
                  <div className="flex items-center justify-center">
                    <GameArt name={mission.icon} size={28} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Lock size={16} />
                  </div>
                )}

                {/* Number Badge */}
                <span
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shadow ${
                    isCompleted
                      ? 'bg-amber-600 text-white'
                      : isCurrent
                      ? 'bg-yellow-400 text-amber-950 font-extrabold ring-1 ring-amber-500'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {pos.id}
                </span>

                {/* PR Badge if marked as Homework */}
                {isHomework && (
                  <span
                    title="Tugas PR Guru"
                    className="absolute -top-2 -left-2 bg-purple-600 text-white p-0.5 rounded-full shadow"
                  >
                    <BookmarkCheck size={12} />
                  </span>
                )}
              </div>

              {/* Mission Label Pill */}
              <div
                className={`mt-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-center leading-none whitespace-nowrap shadow-sm backdrop-blur-xs ${
                  isCurrent
                    ? 'bg-amber-500 text-white scale-105'
                    : isCompleted
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-white/90 text-slate-700'
                }`}
              >
                {mission.title}
              </div>
            </div>
          );
        })}

        {/* Dynamic Walking Character Avatar that stands near active plot */}
        <div
          style={{
            left: `${activePos.x + 4}%`,
            top: `${activePos.y - 6}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="absolute z-40 pointer-events-none drop-shadow-md"
        >
          <CharacterAvatar
            character={profile.character}
            size={48}
            isDancing={true}
          />
        </div>
      </div>

      {/* Bottom Right: Friendly Character Duo Showcase */}
      <div className="relative z-10 p-2 flex items-center justify-between bg-white/80 backdrop-blur-sm border-t border-emerald-300 text-xs text-emerald-900">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-emerald-800">Petani Cilik:</span>
          <span className="font-extrabold text-amber-600 capitalize">
            {profile.character === 'bimo' ? '👦 Bimo' : '👧 Ayu'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
          <CheckCircle2 size={13} className="text-emerald-600" />
          <span>{profile.suns} / 10 Selesai</span>
        </div>
      </div>
    </div>
  );
};
