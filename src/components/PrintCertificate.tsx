import React from 'react';
import { PlantMission, StudentProfile } from '../types';
import { CharacterAvatar } from './Illustrations';

interface PrintCertificateProps {
  missions: PlantMission[];
  profile: StudentProfile;
  onClose?: () => void;
}

export const PrintCertificate: React.FC<PrintCertificateProps> = ({
  missions,
  profile,
  onClose,
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="print-certificate-container hidden print:block bg-white text-slate-900 p-8 max-w-4xl mx-auto">
      {/* Outer Border with decorative frame */}
      <div className="border-8 border-double border-emerald-600 p-6 rounded-2xl relative">
        {/* Header Kop Surat TK PGRI Putra Harapan */}
        <div className="text-center border-b-4 border-emerald-500 pb-4 mb-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-3xl">🌱</span>
            <h1 className="text-2xl font-black tracking-wide text-emerald-800 uppercase">
              TK PGRI PUTRA HARAPAN
            </h1>
            <span className="text-3xl">🌻</span>
          </div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
            Pendidikan Anak Usia Dini • Kelompok Bermain & Taman Kanak-Kanak
          </p>
          <p className="text-[11px] text-slate-500">
            Modul Pembelajaran Lingkungan Hidup: "Petualangan Taman Putra Harapan"
          </p>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-4">
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider border border-amber-300">
            Sertifikat & Kartu Hasil Belajar
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2">
            PENGHARGAAN PETANI CILIK HEBAT
          </h2>
          <p className="text-xs text-slate-600 italic">
            Diberikan sebagai bukti keberhasilan mengenal alam dan cara merawat tanaman dengan penuh cinta.
          </p>
        </div>

        {/* Student Biodata Box */}
        <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-xl p-4 my-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500">Nama Peserta Didik:</div>
            <div className="text-2xl font-black text-emerald-950 capitalize">
              {profile.name || 'Anak Hebat'}
            </div>
            <div className="text-xs font-bold text-emerald-700">
              Kelompok: <span className="font-extrabold">{profile.grade}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CharacterAvatar character={profile.character} size={64} />
            <div className="text-right">
              <div className="text-xs font-bold text-slate-500">Matahari Diperoleh:</div>
              <div className="text-3xl font-black text-amber-600">
                {profile.suns} / 10 ☀️
              </div>
              <div className="text-[10px] font-extrabold text-emerald-800 uppercase">
                {profile.suns === 10 ? '⭐⭐⭐ Sangat Memuaskan' : '⭐⭐ Berkembang Baik'}
              </div>
            </div>
          </div>
        </div>

        {/* Mastered Plants Grid */}
        <div className="my-4">
          <h3 className="text-sm font-black text-slate-800 mb-2 border-l-4 border-emerald-600 pl-2">
            Daftar Tanaman & Fakta yang Sudah Dikuasai:
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {missions.map((m) => {
              const isCompleted = profile.completedMissions.includes(m.id);
              return (
                <div
                  key={m.id}
                  className={`p-2 rounded-lg border ${
                    isCompleted
                      ? 'bg-white border-emerald-400 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>
                      {m.id}. {m.factCard.plantName}
                    </span>
                    <span>{isCompleted ? '✅ Lulus' : '⏳ Belum'}</span>
                  </div>
                  <div className="text-[10px] italic mt-0.5 text-slate-600">
                    "{m.factCard.fact}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Teacher Notes & Signatures */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-2 text-center text-xs">
          <div>
            <p className="text-slate-500 mb-12">
              Mengetahui,<br />
              <strong className="text-slate-800">Guru Wali Kelas</strong>
            </p>
            <p className="font-bold underline text-slate-800">( ............................................ )</p>
            <p className="text-[10px] text-slate-500">NIP / NUPTK</p>
          </div>
          <div>
            <p className="text-slate-500 mb-12">
              Diterbitkan pada {currentDate},<br />
              <strong className="text-slate-800">Kepala TK PGRI Putra Harapan</strong>
            </p>
            <p className="font-bold underline text-slate-800">( ............................................ )</p>
            <p className="text-[10px] text-slate-500">NIP / NUPTK</p>
          </div>
        </div>
      </div>
    </div>
  );
};
