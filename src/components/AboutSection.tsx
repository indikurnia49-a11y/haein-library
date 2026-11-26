import React from 'react';
import { BookHeart, Clock, ShieldCheck } from 'lucide-react';
import { VisitStats } from '../types/library';

interface AboutSectionProps {
  visitStats: VisitStats;
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ visitStats, onNavigate }) => {
  return (
    <>
      <section id="tentang" className="border-t border-rose-200/80 bg-[#FFF4F7] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-widest text-[#9D174D] uppercase">
                Tentang Perpustakaan
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold text-[#2B1220] sm:text-3xl [text-wrap:balance]">
                Ruang Literasi Digital yang Ramah, Terbuka, dan Terkurasi
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5A2D43] sm:text-base">
                Pustaka Rosa hadir untuk mempertemukan pembaca dengan buku-buku sastra pilihan,
                jurnal ilmiah, dan literatur teknologi dalam suasana antarmuka yang tenang serta
                bebas gangguan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">
              <div className="rounded-2xl border border-rose-200/80 bg-white p-5">
                <Clock className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
                <h3 className="font-display mt-3 text-base font-bold text-[#2B1220]">
                  Durasi Pinjam Fleksibel
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B3B52]">
                  Anggota dapat memilih masa peminjaman 7 atau 14 hari serta mengembalikan buku
                  kapan saja dalam satu klik.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-200/80 bg-white p-5">
                <BookHeart className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
                <h3 className="font-display mt-3 text-base font-bold text-[#2B1220]">
                  Pratinjau Baca Daring
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B3B52]">
                  Baca bab pembuka setiap koleksi secara langsung melalui mode pembaca dengan ukuran
                  teks yang dapat disesuaikan.
                </p>
              </div>

              <div className="rounded-2xl border border-rose-200/80 bg-white p-5">
                <ShieldCheck className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
                <h3 className="font-display mt-3 text-base font-bold text-[#2B1220]">
                  Daftar Bacaan Pribadi
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B3B52]">
                  Simpan buku favorit ke Daftar Bacaan dan pantau riwayat sirkulasi peminjaman Anda
                  secara otomatis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-rose-200/80 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B3B52]">
            <span className="font-display text-sm font-bold text-[#2B1220]">Pustaka Rosa</span>
            <span aria-hidden="true">·</span>
            <span>Perpustakaan Digital Modern</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#9D174D]">
              Total Kunjungan: {visitStats.totalVisits.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium text-[#6B3B52]">
            <button
              type="button"
              onClick={() => onNavigate('beranda')}
              className="hover:text-[#BE185D] cursor-pointer"
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => onNavigate('katalog')}
              className="hover:text-[#BE185D] cursor-pointer"
            >
              Katalog
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tentang')}
              className="hover:text-[#BE185D] cursor-pointer"
            >
              Tentang
            </button>
            <span className="text-[#9D6B82]">© 2026 Pustaka Rosa</span>
          </div>
        </div>
      </footer>
    </>
  );
};
