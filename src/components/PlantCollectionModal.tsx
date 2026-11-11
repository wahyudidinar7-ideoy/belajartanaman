import React from 'react';
import { PlantMission, StudentProfile } from '../types';
import { GameArt } from './Illustrations';
import { Volume2, Lock, X, Flower2, Award } from 'lucide-react';
import { speak, playClickSound } from '../utils/audio';

interface PlantCollectionModalProps {
  missions: PlantMission[];
  profile: StudentProfile;
  onClose: () => void;
}

export const PlantCollectionModal: React.FC<PlantCollectionModalProps> = ({
  missions,
  profile,
  onClose,
}) => {
  const handleHearFact = (mission: PlantMission) => {
    playClickSound();
    speak(`${mission.factCard.plantName}. ${mission.factCard.fact}`);
  };

  const unlockedCount = profile.completedMissions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-emerald-50 via-white to-amber-50 rounded-3xl border-4 border-emerald-400 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-emerald-600 text-white border-b-2 border-emerald-700">
          <div className="flex items-center gap-2">
            <Flower2 size={26} className="text-yellow-300" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                🌸 Koleksi Tanaman & Kebun
              </h3>
              <p className="text-xs text-emerald-100 font-semibold">
                Koleksi yang berhasil kamu rawat: {unlockedCount} dari 10 Tanaman
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Plant Pots Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {missions.map((mission) => {
            const isUnlocked = profile.completedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition-all ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-md hover:border-emerald-500 hover:shadow-lg'
                    : 'bg-slate-100 border-slate-300 opacity-70'
                }`}
              >
                {/* Number Badge */}
                <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow">
                  {mission.id}
                </span>

                {/* Plant Art or Lock */}
                <div className="my-2 flex items-center justify-center">
                  {isUnlocked ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      <GameArt name={mission.factCard.icon} size="100%" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                      <Lock size={28} />
                      <span className="text-[10px] font-bold mt-1">Terkunci</span>
                    </div>
                  )}
                </div>

                {/* Name & Fact */}
                <div className="text-center w-full mt-1">
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                    {isUnlocked ? mission.factCard.plantName : `Misi ${mission.id}`}
                  </h5>

                  {isUnlocked ? (
                    <p className="text-[11px] text-emerald-700 font-bold line-clamp-2 my-1 leading-tight">
                      "{mission.factCard.fact}"
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 font-semibold my-1">
                      Selesaikan misi untuk membuka tanaman ini!
                    </p>
                  )}
                </div>

                {/* Audio Button */}
                {isUnlocked ? (
                  <button
                    onClick={() => handleHearFact(mission)}
                    className="w-full mt-2 py-1 px-2 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-xs transition"
                  >
                    <Volume2 size={14} />
                    <span>🔊 Dengar</span>
                  </button>
                ) : (
                  <div className="w-full mt-2 py-1 text-center text-[10px] font-bold text-slate-400">
                    🔒 Belum Terbuka
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800">
          <div className="flex items-center gap-1.5">
            <Award size={18} className="text-amber-500" />
            <span>Koleksi Kebun TK PGRI Putra Harapan</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
