import React from 'react';
import { Bookmark, CheckCircle2, Clock, Star } from 'lucide-react';
import { Book } from '../types/library';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isBookmarked,
  onToggleBookmark,
  onSelectBook,
}) => {
  const isAvailable = book.status === 'Tersedia';

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-rose-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-[0_14px_34px_-12px_rgba(190,24,93,0.16)]">
      {/* Cover Container with Bookmark Action */}
      <div className="relative">
        <button
          type="button"
          onClick={() => onSelectBook(book)}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] rounded-xl cursor-pointer"
          aria-label={`Lihat detail buku ${book.title}`}
        >
          <BookCover book={book} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(book.id);
          }}
          aria-label={
            isBookmarked
              ? `Hapus ${book.title} dari Daftar Bacaan`
              : `Simpan ${book.title} ke Daftar Bacaan`
          }
          title={isBookmarked ? 'Hapus dari Daftar Bacaan' : 'Simpan ke Daftar Bacaan'}
          className={`absolute top-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] cursor-pointer ${
            isBookmarked
              ? 'border-[#BE185D] bg-[#BE185D] text-white shadow-sm'
              : 'border-rose-200/90 bg-white/95 text-[#6B3B52] hover:border-rose-300 hover:text-[#BE185D]'
          }`}
        >
          <Bookmark
            className={`h-4 w-4 ${isBookmarked ? 'fill-white' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Metadata & Title */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-1.5 text-xs text-[#7D4B63]">
          <span className="truncate font-medium text-[#9D174D]">{book.category}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{book.year}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-0.5 tabular-nums font-medium text-[#5A2D43]">
            <Star className="h-3 w-3 fill-amber-400 text-amber-500" aria-hidden="true" />
            {book.rating.toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelectBook(book)}
          className="mt-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] rounded cursor-pointer"
        >
          <h3 className="font-display line-clamp-2 text-lg font-semibold leading-snug text-[#2B1220] transition-colors group-hover:text-[#BE185D]">
            {book.title}
          </h3>
        </button>

        <p className="mt-1 truncate text-sm text-[#6B3B52]">{book.author}</p>

        {/* Bottom Status & Action Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-rose-100 pt-3.5 mt-4">
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              isAvailable ? 'text-emerald-800' : 'text-[#9D174D]'
            }`}
          >
            {isAvailable ? (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
            ) : (
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#BE185D]" aria-hidden="true" />
            )}
            <span>{book.status}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectBook(book)}
            className="text-xs font-semibold text-[#BE185D] hover:text-[#9D174D] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            Detail & Baca
          </button>
        </div>
      </div>
    </article>
  );
};
