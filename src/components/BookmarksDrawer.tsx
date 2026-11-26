import React, { useEffect } from 'react';
import { Bookmark, BookOpen, Trash2, X } from 'lucide-react';
import { Book } from '../types/library';
import { BookCover } from './BookCover';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedBooks: Book[];
  onSelectBook: (book: Book) => void;
  onRemoveBookmark: (bookId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedBooks,
  onSelectBook,
  onRemoveBookmark,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2B1220]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmarks-drawer-title"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-rose-200 bg-[#FFF9FB] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rose-200/80 bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Bookmark className="h-5 w-5 fill-[#BE185D] text-[#BE185D]" aria-hidden="true" />
            <h2 id="bookmarks-drawer-title" className="font-display text-lg font-bold text-[#2B1220]">
              Daftar Bacaan ({bookmarkedBooks.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar bacaan"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-[#6B3B52] hover:bg-rose-50 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {bookmarkedBooks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-[#BE185D]">
                <Bookmark className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-[#2B1220]">
                Daftar Bacaan Masih Kosong
              </h3>
              <p className="mt-1.5 max-w-xs text-sm text-[#6B3B52]">
                Klik ikon penanda pada kartu buku atau di halaman detail untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            <ul className="space-y-3.5">
              {bookmarkedBooks.map((book) => (
                <li
                  key={book.id}
                  className="flex gap-3.5 rounded-2xl border border-rose-200/80 bg-white p-3.5 shadow-xs"
                >
                  <div className="w-20 shrink-0">
                    <BookCover book={book} size="sm" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-[#9D174D]">{book.category}</p>
                      <h3 className="font-display line-clamp-2 text-sm font-bold text-[#2B1220]">
                        {book.title}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-[#6B3B52]">{book.author}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectBook(book);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#BE185D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#9D174D] cursor-pointer"
                      >
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        Baca / Pinjam
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveBookmark(book.id)}
                        aria-label={`Hapus ${book.title} dari daftar bacaan`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#7D4B63] hover:bg-rose-50 hover:text-[#9D174D] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
