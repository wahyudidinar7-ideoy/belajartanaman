import React from 'react';
import confetti from 'canvas-confetti';
import { PlantMission, StudentProfile } from '../types';
import { CharacterAvatar, GrandTreeIllustration } from './Illustrations';
import { Trophy, Sparkles, X, Printer, RotateCcw } from 'lucide-react';
import { playSunSound, speak } from '../utils/audio';

interface GrandTreeModalProps {
  missions: PlantMission[];
  profile: StudentProfile;
  onPrintCertificate: () => void;
  onClose: () => void;
}

export const GrandTreeModal: React.FC<GrandTreeModalProps> = ({
  missions,
  profile,
  onPrintCertificate,
  onClose,
}) => {
  const isAllComplete = profile.suns >= 10;

  React.useEffect(() => {
    if (isAllComplete) {
      playSunSound();
      try {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#22c55e', '#facc15', '#ec4899', '#38bdf8', '#f97316'],
        });
      } catch (e) {
        console.error(e);
      }
      speak(
        `Selamat ${profile.name}! Kamu berhasil mengumpulkan sepuluh matahari! Pohon besar kebun telah menyala dengan buah dan bunga yang indah!`
      );
    }
  }, [isAllComplete, profile.name]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-amber-50 via-white to-emerald-50 rounded-3xl border-4 border-yellow-400 shadow-2xl p-5 sm:p-7 text-center flex flex-col items-center overflow-hidden">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
        >
          <X size={20} />
        </button>

        {/* Tree Illustration with glowing fruits */}
        <div className="my-2">
          <GrandTreeIllustration isGlowing={isAllComplete} />
        </div>

        {isAllComplete ? (
          <>
            <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-yellow-400 text-amber-950 rounded-full font-black text-sm mb-2 shadow-sm animate-bounce">
              <Trophy size={16} />
              <span>JUARA PETANI CILIK TK PGRI PUTRA HARAPAN</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 leading-tight">
              Pohon Kebun Raya Telah Mekar Sempurna! 🌳✨
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold my-2 max-w-md">
              Hebat sekali <span className="font-extrabold text-emerald-800">{profile.name}</span>!
              Kamu sudah menyelesaikan seluruh 10 misi pembelajaran kebun dan mendapatkan 10 Matahari Emas ☀️.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 my-3">
              <button
                onClick={onPrintCertificate}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black text-sm shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-2"
              >
                <Printer size={18} />
                <span>Cetak Sertifikat Kelulusan 📜</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md active:scale-95 transition"
              >
                Kembali ke Kebun 🌸
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
              Pohon Besar & Rumah Kaca Kebun 🌳
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold my-2 max-w-md">
              Kumpulkan seluruh <span className="font-bold text-amber-600">10 Matahari</span> untuk membuat pohon besar ini bermekaran buah dan bunganya!
            </p>
            <div className="p-3 bg-amber-100 rounded-2xl text-amber-900 font-extrabold text-sm my-2">
              Saat ini kamu sudah punya: {profile.suns} / 10 Matahari ☀️
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 rounded-xl bg-emerald-600 text-white font-black text-sm"
            >
              Lanjutkan Misi!
            </button>
          </>
        )}
      </div>
    </div>
  );
};
