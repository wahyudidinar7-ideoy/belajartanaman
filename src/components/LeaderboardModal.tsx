import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, StudentProfile } from '../types';
import { CharacterAvatar } from './Illustrations';
import { Trophy, Star, Sun, X, PlusCircle, Medal } from 'lucide-react';
import { playClickSound, speak } from '../utils/audio';

interface LeaderboardModalProps {
  currentProfile: StudentProfile;
  onClose: () => void;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', name: 'Nabila', grade: 'TK B', character: 'ayu', suns: 10, date: 'Hari ini' },
  { id: '2', name: 'Kenzi', grade: 'TK B', character: 'bimo', suns: 9, date: 'Hari ini' },
  { id: '3', name: 'Alif', grade: 'TK A', character: 'bimo', suns: 8, date: 'Kemarin' },
  { id: '4', name: 'Aisyah', grade: 'TK A', character: 'ayu', suns: 7, date: 'Kemarin' },
  { id: '5', name: 'Bagas', grade: 'TK B', character: 'bimo', suns: 6, date: 'Minggu ini' },
];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  currentProfile,
  onClose,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem('taman_putra_harapan_bintang');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_LEADERBOARD;
  });

  const [hasRecordedCurrent, setHasRecordedCurrent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('taman_putra_harapan_bintang', JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  }, [entries]);

  const handleRecordMyScore = () => {
    playClickSound();
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: currentProfile.name || 'Anak Hebat',
      grade: currentProfile.grade,
      character: currentProfile.character,
      suns: currentProfile.suns,
      date: 'Baru saja',
    };

    const updated = [...entries, newEntry]
      .sort((a, b) => b.suns - a.suns)
      .slice(0, 5);

    setEntries(updated);
    setHasRecordedCurrent(true);
    speak(`Bintang kelas! ${currentProfile.name} hebat, punya ${currentProfile.suns} matahari!`);
  };

  const getRankBadge = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-400 text-amber-950 rounded-full font-black text-xs shadow-sm">
            <Trophy size={14} className="fill-amber-900" />
            <span>Juara 1</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-200 text-slate-800 rounded-full font-black text-xs shadow-sm">
            <Medal size={14} />
            <span>Juara 2</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-600 text-white rounded-full font-black text-xs shadow-sm">
            <Medal size={14} />
            <span>Juara 3</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-black text-xs">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            <span>Hebat {idx + 1}</span>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 via-white to-emerald-50 rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 flex items-center justify-between border-b-2 border-amber-600">
          <div className="flex items-center gap-2">
            <Trophy size={28} className="fill-amber-900 text-amber-900" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                ⭐ Bintang Kelas Rajin
              </h3>
              <p className="text-xs font-bold text-amber-900">
                Top 5 Petani Cilik TK PGRI Putra Harapan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition active:scale-95"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {entries.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${
                idx === 0
                  ? 'bg-yellow-50 border-yellow-400 shadow-md ring-2 ring-yellow-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-black text-base sm:text-lg text-slate-400 w-5 text-center">
                  #{idx + 1}
                </span>

                <CharacterAvatar
                  character={item.character}
                  size={42}
                  className="rounded-full border border-emerald-300 shadow-xs"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-black text-base sm:text-lg text-slate-900">
                      {item.name}
                    </h5>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {item.grade}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                {getRankBadge(idx)}
                <div className="flex items-center gap-1 font-black text-base sm:text-lg text-amber-600">
                  <Sun size={18} className="fill-amber-500 text-amber-600" />
                  <span>{item.suns} ☀️</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Student Action */}
        <div className="p-4 bg-emerald-50 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-slate-500">Mataharimu saat ini:</span>
            <div className="font-black text-emerald-900 text-base flex items-center justify-center sm:justify-start gap-1">
              <span>{currentProfile.name}</span>
              <span className="text-amber-600">({currentProfile.suns} ☀️)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!hasRecordedCurrent ? (
              <button
                onClick={handleRecordMyScore}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-amber-950 font-black text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition flex items-center gap-1.5"
              >
                <PlusCircle size={16} />
                <span>Simpan Nilai Saya</span>
              </button>
            ) : (
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                ✅ Nilai Tersimpan
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
