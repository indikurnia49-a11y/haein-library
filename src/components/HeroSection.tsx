import React from 'react';
import { ArrowRight, BookOpenCheck, Eye, Search, X } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/initialBooks';
import { VisitStats } from '../types/library';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  visitStats: VisitStats;
  onOpenLoansTab: () => void;
}

const QUICK_SEARCH_TERMS = ['Sastra', 'Arsitektur', 'Teknologi', 'Mindfulness', 'Jurnal'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalBooks,
  availableBooks,
  borrowedBooks,
  visitStats,
  onOpenLoansTab,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section
      id="beranda"
      className="relative overflow-hidden border-b border-rose-200/80 bg-gradient-to-br from-[#FFF5F8] via-[#FCE7F3]/55 to-[#FFF9FB]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Editorial Headline + Central Search */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-widest text-[#9D174D] uppercase">
              Koleksi Terkurasi · Akses Daring 24 Jam
            </p>
            <h1 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight text-[#2B1220] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] [text-wrap:balance]">
              Temukan Jendela Pengetahuan dalam Ruang Baca yang Tenang
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B3B52]">
              Jelajahi koleksi sastra pilihan, jurnal akademik, serta referensi teknologi terkini.
              Pinjam secara instan, simpan ke daftar bacaan pribadi, atau baca langsung di layar.
            </p>

            {/* Large Search Bar */}
            <form onSubmit={handleSubmit} className="mt-7 max-w-2xl">
              <label htmlFor="library-search" className="sr-only">
                Cari buku berdasarkan judul, penulis, atau kata kunci
              </label>
              <div className="flex flex-col gap-2.5 rounded-2xl border border-rose-200 bg-white p-2 shadow-[0_10px_30px_-10px_rgba(190,24,93,0.14)] sm:flex-row sm:items-center">
                <div className="relative flex flex-1 items-center">
                  <Search
                    className="pointer-events-none ml-3 h-5 w-5 shrink-0 text-[#BE185D]"
                    aria-hidden="true"
                  />
                  <input
                    id="library-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari judul buku, penulis, atau kata kunci..."
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-[#2B1220] placeholder:text-[#9D6B82] focus:outline-none sm:text-base"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      aria-label="Hapus kata kunci pencarian"
                      className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#831843]/70 hover:bg-rose-50 hover:text-[#9D174D] cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#BE185D] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#9D174D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Cari Koleksi</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Quick Keyword Suggestions */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#7D4B63]">
              <span className="font-medium text-[#5A2D43]">Pencarian populer:</span>
              {QUICK_SEARCH_TERMS.map((term, index) => (
                <React.Fragment key={term}>
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange(term);
                      onSearchSubmit();
                    }}
                    className="font-medium text-[#9D174D] underline-offset-4 hover:underline cursor-pointer"
                  >
                    {term}
                  </button>
                  {index < QUICK_SEARCH_TERMS.length - 1 && (
                    <span aria-hidden="true" className="text-rose-300">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Library Lounge Image */}
          <div className="lg:col-span-5">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-rose-200/90 bg-rose-100 shadow-[0_14px_36px_-12px_rgba(190,24,93,0.16)] sm:h-80 lg:h-full lg:min-h-[340px]">
              <img
                src={HERO_IMAGE_URL}
                alt="Ruang baca utama Pustaka Rosa dengan cahaya alami dan rak buku minimalis"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B1220]/75 via-[#2B1220]/25 to-transparent p-5">
                <p className="text-xs font-medium text-pink-100">
                  Ruang Baca Utama · Terbuka untuk seluruh anggota terdaftar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Operational Metrics & Live Visit Counter Strip */}
        <div className="mt-8 grid grid-cols-2 divide-y divide-rose-200/70 rounded-2xl border border-rose-200/90 bg-white/90 shadow-xs sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[#7D4B63]">Total Kunjungan</p>
              <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#2B1220]">
                {visitStats.totalVisits.toLocaleString('id-ID')}
              </p>
            </div>
            <Eye className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[#7D4B63]">Kunjungan Hari Ini</p>
              <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#2B1220]">
                {visitStats.todayVisits.toLocaleString('id-ID')}
              </p>
            </div>
            <span className="text-xs font-medium text-[#9D174D]">
              Sesi #{visitStats.sessionCount}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[#7D4B63]">Koleksi Tersedia</p>
              <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#2B1220]">
                {availableBooks}{' '}
                <span className="text-xs font-normal text-[#7D4B63]">/ {totalBooks}</span>
              </p>
            </div>
            <BookOpenCheck className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-xs font-medium text-[#7D4B63]">Sedang Dipinjam</p>
              <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#2B1220]">
                {borrowedBooks}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenLoansTab}
              className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] hover:underline whitespace-nowrap cursor-pointer"
            >
              Kelola Pinjaman
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
