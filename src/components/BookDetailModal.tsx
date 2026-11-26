import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
  Star,
  X,
} from 'lucide-react';
import { Book, LoanRecord, MemberProfile } from '../types/library';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  activeLoan: LoanRecord | undefined;
  isBookmarked: boolean;
  member: MemberProfile | null;
  onClose: () => void;
  onToggleBookmark: (bookId: string) => void;
  onBorrowBook: (bookId: string, borrowerName: string, durationDays: number) => void;
  onReturnBook: (bookId: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  activeLoan,
  isBookmarked,
  member,
  onClose,
  onToggleBookmark,
  onBorrowBook,
  onReturnBook,
}) => {
  const [mode, setMode] = useState<'detail' | 'reader'>('detail');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [borrowerName, setBorrowerName] = useState(member?.name || '');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [borrowError, setBorrowError] = useState('');

  useEffect(() => {
    setMode('detail');
    setChapterIndex(0);
    setBorrowError('');
    setBorrowerName(member?.name || '');
  }, [book?.id, member?.name]);

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const isAvailable = book.status === 'Tersedia';
  const currentChapter = book.chapters[chapterIndex] || book.chapters[0];
  const totalChapters = book.chapters.length;

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = borrowerName.trim();
    if (!trimmed) {
      setBorrowError('Silakan masukkan nama peminjam terlebih dahulu.');
      return;
    }
    setBorrowError('');
    onBorrowBook(book.id, trimmed, durationDays);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1220]/55 p-3 backdrop-blur-xs sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-rose-200 bg-[#FFF9FB] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-rose-200/80 bg-white px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            {mode === 'reader' && (
              <button
                type="button"
                onClick={() => setMode('detail')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-[#6B3B52] hover:bg-rose-50 hover:text-[#9D174D] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Kembali ke Detail
              </button>
            )}
            <p className="truncate font-mono text-xs text-[#7D4B63]">
              {book.catalogCode} · {book.category}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela buku"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-[#6B3B52] hover:bg-rose-50 hover:text-[#9D174D] shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Content */}
        {mode === 'detail' ? (
          <div className="overflow-y-auto p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-12">
              {/* Left Cover & Quick Actions */}
              <div className="md:col-span-4">
                <BookCover book={book} size="lg" className="shadow-md" />

                <div className="mt-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMode('reader')}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#BE185D] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9D174D] cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Baca Sekarang (Pratinjau)
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleBookmark(book.id)}
                    className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'border-[#BE185D] bg-rose-100/80 text-[#9D174D]'
                        : 'border-rose-200 bg-white text-[#6B3B52] hover:border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isBookmarked ? 'fill-[#BE185D] text-[#BE185D]' : ''}`}
                      aria-hidden="true"
                    />
                    {isBookmarked ? 'Tersimpan di Daftar Bacaan' : 'Simpan ke Daftar Bacaan'}
                  </button>
                </div>
              </div>

              {/* Right Details & Borrowing System */}
              <div className="flex flex-col md:col-span-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7D4B63]">
                  <span
                    className={`inline-flex items-center gap-1.5 font-semibold ${
                      isAvailable ? 'text-emerald-800' : 'text-[#9D174D]'
                    }`}
                  >
                    {isAvailable ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-[#BE185D]" aria-hidden="true" />
                    )}
                    {book.status}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Bahasa {book.language}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums font-medium text-[#5A2D43]">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
                    {book.rating.toFixed(1)} / 5.0
                  </span>
                </div>

                <h2
                  id="book-modal-title"
                  className="font-display mt-2 text-2xl font-bold leading-tight text-[#2B1220] sm:text-3xl"
                >
                  {book.title}
                </h2>
                <p className="mt-1.5 text-base font-medium text-[#831843]">Oleh {book.author}</p>

                {/* Synopsis */}
                <div className="mt-5">
                  <h3 className="text-xs font-semibold tracking-wider text-[#7D4B63] uppercase">
                    Sinopsis Lengkap
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#432133] sm:text-[15px]">
                    {book.synopsis}
                  </p>
                </div>

                {/* Metadata Definition List */}
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-rose-200/80 py-4 sm:grid-cols-4">
                  <div>
                    <dt className="text-xs text-[#7D4B63]">Penerbit</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[#2B1220]">
                      {book.publisher}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#7D4B63]">Tahun Terbit</dt>
                    <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#2B1220]">
                      {book.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#7D4B63]">Jumlah Halaman</dt>
                    <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#2B1220]">
                      {book.pages} hlm
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#7D4B63]">Kategori</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[#2B1220]">{book.category}</dd>
                  </div>
                </dl>

                {/* Borrowing & Return Panel */}
                <div className="mt-6 rounded-2xl border border-rose-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-[#2B1220]">
                    Sirkulasi Peminjaman & Pengembalian
                  </h3>

                  {isAvailable ? (
                    <form onSubmit={handleBorrowSubmit} className="mt-3 space-y-3.5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="borrower-name-input"
                            className="block text-xs font-medium text-[#6B3B52]"
                          >
                            Nama Peminjam / Anggota
                          </label>
                          <input
                            id="borrower-name-input"
                            type="text"
                            value={borrowerName}
                            onChange={(e) => setBorrowerName(e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            className="mt-1 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="loan-duration-select"
                            className="block text-xs font-medium text-[#6B3B52]"
                          >
                            Durasi Peminjaman
                          </label>
                          <select
                            id="loan-duration-select"
                            value={durationDays}
                            onChange={(e) => setDurationDays(Number(e.target.value))}
                            className="mt-1 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
                          >
                            <option value={7}>7 Hari (Reguler)</option>
                            <option value={14}>14 Hari (Ekstensi Anggota)</option>
                          </select>
                        </div>
                      </div>

                      {borrowError && (
                        <p className="text-xs font-medium text-rose-700" role="alert">
                          {borrowError}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <p className="text-xs text-[#7D4B63]">
                          Gratis untuk seluruh anggota. Pengembalian otomatis tercatat di riwayat.
                        </p>
                        <button
                          type="submit"
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#9D174D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#831843] whitespace-nowrap cursor-pointer"
                        >
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          Pinjam Buku Ini
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <div className="flex flex-col justify-between gap-3 rounded-xl bg-rose-50/70 p-4 sm:flex-row sm:items-center">
                        <div className="text-sm">
                          <p className="font-semibold text-[#2B1220]">
                            Dipinjam oleh:{' '}
                            <span className="text-[#9D174D]">
                              {activeLoan?.borrowerName || 'Anggota Perpustakaan'}
                            </span>
                          </p>
                          {activeLoan && (
                            <p className="mt-0.5 font-mono text-xs tabular-nums text-[#6B3B52]">
                              Tanggal Pinjam: {activeLoan.borrowedAt} · Jatuh Tempo:{' '}
                              {activeLoan.dueDate}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => onReturnBook(book.id)}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#BE185D] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#9D174D] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden="true" />
                          Kembalikan Buku
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Online Reader Mode */
          <div className="flex flex-1 flex-col overflow-hidden bg-[#FFFDFC]">
            {/* Reader Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/70 bg-rose-50/40 px-5 py-3 sm:px-8">
              <div className="min-w-0">
                <p className="truncate font-display text-base font-semibold text-[#2B1220]">
                  {book.title}
                </p>
                <p className="text-xs text-[#7D4B63]">
                  Pratinjau Bab {chapterIndex + 1} dari {totalChapters}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7D4B63] hidden sm:inline">Ukuran teks:</span>
                <div className="inline-flex rounded-lg border border-rose-200 bg-white p-0.5">
                  {(['sm', 'base', 'lg'] as const).map((sizeKey, idx) => (
                    <button
                      key={sizeKey}
                      type="button"
                      onClick={() => setFontSize(sizeKey)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                        fontSize === sizeKey
                          ? 'bg-[#BE185D] text-white'
                          : 'text-[#6B3B52] hover:bg-rose-50'
                      }`}
                    >
                      {idx === 0 ? 'A-' : idx === 1 ? 'A' : 'A+'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-rose-100">
              <div
                className="h-full bg-[#BE185D] transition-all duration-300"
                style={{ width: `${((chapterIndex + 1) / totalChapters) * 100}%` }}
              />
            </div>

            {/* Reading Prose */}
            <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-10">
              <article className="mx-auto max-w-2xl">
                <p className="font-mono text-xs tracking-widest text-[#9D174D] uppercase">
                  {book.author}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-[#2B1220] sm:text-3xl">
                  {currentChapter?.title}
                </h3>
                <div className="my-6 border-b border-rose-200/80" />

                <div
                  className={`space-y-5 leading-[1.85] text-[#3B1B2B] ${
                    fontSize === 'sm'
                      ? 'text-[15px]'
                      : fontSize === 'lg'
                        ? 'text-lg'
                        : 'text-base'
                  }`}
                >
                  {currentChapter?.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className={
                        pIdx === 0
                          ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#9D174D]'
                          : ''
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Chapter Navigation */}
                <div className="mt-10 flex items-center justify-between gap-4 border-t border-rose-200/80 pt-6">
                  <button
                    type="button"
                    disabled={chapterIndex === 0}
                    onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-[#6B3B52] transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Bab Sebelumnya
                  </button>

                  <span className="font-mono text-xs tabular-nums text-[#7D4B63]">
                    {chapterIndex + 1} / {totalChapters}
                  </span>

                  <button
                    type="button"
                    disabled={chapterIndex >= totalChapters - 1}
                    onClick={() => setChapterIndex((i) => Math.min(totalChapters - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#BE185D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9D174D] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    Bab Berikutnya
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
