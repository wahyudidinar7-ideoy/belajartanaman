import React, { useState } from 'react';
import { PlantMission, StudentProfile } from '../types';
import {
  GraduationCap,
  Lock,
  RotateCcw,
  Printer,
  BookmarkCheck,
  Check,
  AlertTriangle,
  X,
  UserCheck,
} from 'lucide-react';
import { playClickSound, speak } from '../utils/audio';

interface TeacherModeModalProps {
  missions: PlantMission[];
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onResetProgress: () => void;
  onPrintReport: () => void;
  onClose: () => void;
}

export const TeacherModeModal: React.FC<TeacherModeModalProps> = ({
  missions,
  profile,
  onUpdateProfile,
  onResetProgress,
  onPrintReport,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [studentName, setStudentName] = useState(profile.name);
  const [studentGrade, setStudentGrade] = useState<'TK A' | 'TK B'>(profile.grade);
  const [selectedHw, setSelectedHw] = useState<number[]>(profile.homeworkMissions || [1, 2, 3, 4, 5]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'guru123') {
      setIsAuthenticated(true);
      setPasswordError(false);
      speak('Selamat datang di Menu Pengaturan Guru TK PGRI Putra Harapan.');
    } else {
      setPasswordError(true);
    }
  };

  const handleToggleHomework = (missionId: number) => {
    playClickSound();
    let updated: number[];
    if (selectedHw.includes(missionId)) {
      updated = selectedHw.filter((id) => id !== missionId);
    } else {
      if (selectedHw.length >= 5) {
        alert('Maksimal 5 misi untuk PR harian.');
        return;
      }
      updated = [...selectedHw, missionId];
    }
    setSelectedHw(updated);
  };

  const handleSaveSettings = () => {
    playClickSound();
    onUpdateProfile({
      name: studentName.trim() || 'Anak Hebat',
      grade: studentGrade,
      homeworkMissions: selectedHw,
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleReset = () => {
    playClickSound();
    onResetProgress();
    setConfirmReset(false);
    alert('Progres kebun anak telah berhasil di-reset!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-indigo-400 shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={28} className="text-yellow-300" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                👩‍🏫 Ruang Guru & Wali Kelas
              </h3>
              <p className="text-xs text-indigo-100 font-semibold">
                TK PGRI Putra Harapan • Pengaturan & Cetak Evaluasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-indigo-700 hover:bg-indigo-800 text-white transition active:scale-95"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          // Password Gateway (password: guru123)
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 mb-3">
              <Lock size={32} />
            </div>
            <h4 className="text-xl font-black text-slate-800 mb-1">
              Masukkan Kata Sandi Guru
            </h4>
            <p className="text-xs text-slate-500 mb-4 max-w-xs">
              Area khusus guru untuk mengatur PR berkebun, evaluasi anak, dan cetak sertifikat.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                placeholder="Kata sandi (guru123)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:outline-none text-center font-bold text-base"
                autoFocus
              />
              {passwordError && (
                <div className="text-xs font-bold text-rose-500 flex items-center justify-center gap-1">
                  <AlertTriangle size={14} />
                  <span>Sandi salah! Petunjuk: ketik guru123</span>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md active:scale-95 transition"
              >
                Masuk Mode Guru
              </button>
            </form>
          </div>
        ) : (
          // Authenticated Teacher Dashboard
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
            {saveToast && (
              <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center gap-2">
                <Check size={16} />
                <span>Pengaturan berhasil disimpan!</span>
              </div>
            )}

            {/* Section 1: Edit Profile Anak */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                <UserCheck size={18} className="text-indigo-600" />
                <span>1. Data Anak / Peserta Didik</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Nama Anak:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Kelompok / Tingkat:
                  </label>
                  <div className="flex gap-2">
                    {(['TK A', 'TK B'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setStudentGrade(g)}
                        className={`flex-1 py-1.5 rounded-xl font-bold text-xs border ${
                          studentGrade === g
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Pilih 5 Misi untuk PR (Homework) */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-extrabold text-sm text-purple-900 flex items-center gap-2">
                  <BookmarkCheck size={18} className="text-purple-600" />
                  <span>2. Pilih 5 Misi untuk PR Anak di Rumah</span>
                </h5>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">
                  {selectedHw.length} / 5 Terpilih
                </span>
              </div>
              <p className="text-xs text-purple-700 font-medium">
                Centang 5 misi yang ditugaskan untuk dipelajari bersama orang tua di rumah:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {missions.map((m) => {
                  const isChecked = selectedHw.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleToggleHomework(m.id)}
                      className={`flex items-center justify-between p-2 rounded-xl text-left border text-xs font-bold transition ${
                        isChecked
                          ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                          : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      <span className="truncate">
                        {m.id}. {m.title}
                      </span>
                      {isChecked && <Check size={14} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar for Saving */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition"
              >
                Simpan Perubahan Data
              </button>
            </div>

            {/* Section 3: Print Kartu Hasil / Sertifikat Kelulusan */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h5 className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
                  <Printer size={18} className="text-amber-600" />
                  <span>3. Cetak Kartu Hasil / Sertifikat Berkebun</span>
                </h5>
                <p className="text-xs text-amber-800 mt-0.5">
                  Cetak lembar laporan fisik dengan nama anak, jumlah matahari, dan tanaman yang dikuasai.
                </p>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  onPrintReport();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 shrink-0 active:scale-95 transition"
              >
                <Printer size={16} />
                <span>Cetak Kartu Hasil (Print)</span>
              </button>
            </div>

            {/* Section 4: Reset Progress */}
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
                    <RotateCcw size={18} className="text-rose-600" />
                    <span>4. Reset Progres Pembelajaran</span>
                  </h5>
                  <p className="text-xs text-rose-700 mt-0.5">
                    Gunakan saat berganti anak atau saat ingin memulai latihan dari misi pertama lagi.
                  </p>
                </div>
                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm shrink-0"
                  >
                    Reset Progres
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 bg-rose-700 text-white font-black text-xs rounded-lg animate-pulse"
                    >
                      Ya, Hapus!
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>Password default: guru123</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
