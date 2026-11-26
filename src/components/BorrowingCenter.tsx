import React, { useState } from 'react';
import { BookOpenCheck, CalendarClock, CheckCircle2, RotateCcw } from 'lucide-react';
import { Book, LoanRecord, MemberProfile } from '../types/library';

interface BorrowingCenterProps {
  books: Book[];
  loans: LoanRecord[];
  member: MemberProfile | null;
  onBorrowBook: (bookId: string, borrowerName: string, durationDays: number) => void;
  onReturnBook: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
}

export const BorrowingCenter: React.FC<BorrowingCenterProps> = ({
  books,
  loans,
  member,
  onBorrowBook,
  onReturnBook,
  onSelectBook,
}) => {
  const availableBooks = books.filter((b) => b.status === 'Tersedia');
  const activeLoans = loans.filter((l) => l.status === 'Aktif');
  const returnedLoans = loans.filter((l) => l.status === 'Dikembalikan');

  const [selectedBookId, setSelectedBookId] = useState<string>(availableBooks[0]?.id || '');
  const [borrowerName, setBorrowerName] = useState<string>(member?.name || '');
  const [durationDays, setDurationDays] = useState<number>(7);
  const [feedback, setFeedback] = useState<string>('');

  const effectiveBookId =
    availableBooks.some((b) => b.id === selectedBookId)
      ? selectedBookId
      : availableBooks[0]?.id || '';

  const handleQuickBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveBookId) return;
    const finalName = borrowerName.trim() || member?.name || 'Anggota Tamu';
    onBorrowBook(effectiveBookId, finalName, durationDays);
    setFeedback(`Buku berhasil dipinjam atas nama ${finalName} selama ${durationDays} hari.`);
    setTimeout(() => setFeedback(''), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Quick Borrow Form */}
      <div className="rounded-2xl border border-rose-200/90 bg-white p-6">
        <div className="flex flex-col justify-between gap-2 border-b border-rose-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-[#2B1220]">
              Formulir Peminjaman Cepat
            </h3>
            <p className="mt-1 text-sm text-[#6B3B52]">
              Pilih buku yang tersedia untuk langsung mencatat peminjaman baru.
            </p>
          </div>
          <span className="font-mono text-xs tabular-nums text-[#9D174D]">
            {availableBooks.length} judul siap dipinjam
          </span>
        </div>

        <form onSubmit={handleQuickBorrow} className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5">
            <label htmlFor="quick-borrow-book" className="block text-xs font-semibold text-[#5A2D43]">
              Pilih Judul Buku
            </label>
            <select
              id="quick-borrow-book"
              value={effectiveBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              disabled={availableBooks.length === 0}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
            >
              {availableBooks.length === 0 ? (
                <option value="">Semua buku sedang dipinjam</option>
              ) : (
                availableBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    [{book.catalogCode}] {book.title}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="quick-borrow-name" className="block text-xs font-semibold text-[#5A2D43]">
              Nama Peminjam
            </label>
            <input
              id="quick-borrow-name"
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder={member?.name || 'Contoh: Indi Kurnia'}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="quick-borrow-days" className="block text-xs font-semibold text-[#5A2D43]">
              Durasi
            </label>
            <select
              id="quick-borrow-days"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
            >
              <option value={7}>7 Hari</option>
              <option value={14}>14 Hari</option>
            </select>
          </div>

          <div className="flex items-end md:col-span-2">
            <button
              type="submit"
              disabled={availableBooks.length === 0}
              className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#BE185D] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#9D174D] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              <BookOpenCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              Pinjam
            </button>
          </div>
        </form>

        {feedback && (
          <p className="mt-3 text-xs font-semibold text-emerald-800" role="status">
            {feedback}
          </p>
        )}
      </div>

      {/* Active Loans List */}
      <div className="rounded-2xl border border-rose-200/90 bg-white p-6">
        <div className="flex items-center justify-between gap-4 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-2.5">
            <CalendarClock className="h-5 w-5 text-[#BE185D]" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-[#2B1220]">
              Buku Sedang Dipinjam ({activeLoans.length})
            </h3>
          </div>
        </div>

        {activeLoans.length === 0 ? (
          <div className="py-10 text-center text-sm text-[#7D4B63]">
            Tidak ada buku yang sedang dipinjam saat ini. Semua koleksi tersedia di rak katalog.
          </div>
        ) : (
          <div className="divide-y divide-rose-100">
            {activeLoans.map((loan) => {
              const linkedBook = books.find((b) => b.id === loan.bookId);
              return (
                <div
                  key={loan.id}
                  className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#7D4B63]">
                      <span className="font-mono text-[#9D174D]">{loan.catalogCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>Peminjam: {loan.borrowerName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => linkedBook && onSelectBook(linkedBook)}
                      className="mt-1 text-left font-display text-lg font-semibold text-[#2B1220] hover:text-[#BE185D] cursor-pointer"
                    >
                      {loan.bookTitle}
                    </button>
                    <p className="mt-0.5 font-mono text-xs tabular-nums text-[#6B3B52]">
                      Dipinjam: {loan.borrowedAt} · Jatuh Tempo: {loan.dueDate}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onReturnBook(loan.bookId)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#BE185D] bg-rose-50/70 px-4 text-sm font-semibold text-[#9D174D] transition-colors hover:bg-[#BE185D] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Kembalikan Buku
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Circulation History Table */}
      <div className="rounded-2xl border border-rose-200/90 bg-white p-6">
        <h3 className="font-display text-xl font-bold text-[#2B1220]">
          Riwayat Pengembalian ({returnedLoans.length})
        </h3>
        {returnedLoans.length === 0 ? (
          <p className="mt-3 text-sm text-[#7D4B63]">Belum ada riwayat pengembalian buku.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rose-200/80 text-xs font-semibold text-[#7D4B63] uppercase">
                  <th className="py-2.5 pr-4">Kode</th>
                  <th className="py-2.5 pr-4">Judul Buku</th>
                  <th className="py-2.5 pr-4">Peminjam</th>
                  <th className="py-2.5 pr-4">Tgl Pinjam</th>
                  <th className="py-2.5 pr-4">Tgl Kembali</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {returnedLoans.map((loan) => (
                  <tr key={loan.id} className="text-[#3B1B2B]">
                    <td className="py-3 pr-4 font-mono text-xs text-[#9D174D] whitespace-nowrap">
                      {loan.catalogCode}
                    </td>
                    <td className="py-3 pr-4 font-medium text-[#2B1220]">{loan.bookTitle}</td>
                    <td className="py-3 pr-4">{loan.borrowerName}</td>
                    <td className="py-3 pr-4 font-mono text-xs tabular-nums">{loan.borrowedAt}</td>
                    <td className="py-3 pr-4 font-mono text-xs tabular-nums">
                      {loan.returnedAt || '-'}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 whitespace-nowrap">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        Dikembalikan
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
