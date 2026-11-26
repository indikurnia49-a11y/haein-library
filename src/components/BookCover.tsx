import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Book, CoverPalette } from '../types/library';

interface BookCoverProps {
  book: Pick<Book, 'title' | 'author' | 'category' | 'catalogCode' | 'coverUrl' | 'coverPalette' | 'publisher'>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PALETTE_STYLES: Record<
  CoverPalette,
  { bg: string; border: string; accent: string; text: string; subtext: string; pattern: string }
> = {
  'rose-ivory': {
    bg: 'bg-gradient-to-br from-[#FFF5F8] via-[#FCE7F3] to-[#FBCFE8]',
    border: 'border-rose-200',
    accent: 'text-[#9D174D]',
    text: 'text-[#3B0D22]',
    subtext: 'text-[#831843]/75',
    pattern: 'border-[#F472B6]/35',
  },
  'plum-linen': {
    bg: 'bg-gradient-to-br from-[#4A1934] via-[#6B1D45] to-[#831843]',
    border: 'border-[#831843]',
    accent: 'text-pink-200',
    text: 'text-[#FFF8FA]',
    subtext: 'text-pink-100/80',
    pattern: 'border-pink-300/25',
  },
  'blush-noir': {
    bg: 'bg-gradient-to-br from-[#2B1220] via-[#3F162B] to-[#581C3B]',
    border: 'border-[#581C3B]',
    accent: 'text-rose-300',
    text: 'text-[#FFF5F8]',
    subtext: 'text-rose-200/75',
    pattern: 'border-rose-300/25',
  },
  'mauve-sage': {
    bg: 'bg-gradient-to-br from-[#FDF2F8] via-[#F5D0FE]/40 to-[#FBCFE8]/70',
    border: 'border-pink-200',
    accent: 'text-[#BE185D]',
    text: 'text-[#2B1220]',
    subtext: 'text-[#6B2147]/80',
    pattern: 'border-[#DB2777]/25',
  },
  'terracotta-cream': {
    bg: 'bg-gradient-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
    border: 'border-rose-200',
    accent: 'text-[#9F1239]',
    text: 'text-[#31101C]',
    subtext: 'text-[#881337]/75',
    pattern: 'border-[#FB7185]/35',
  },
  'berry-vellum': {
    bg: 'bg-gradient-to-br from-[#9D174D] via-[#BE185D] to-[#DB2777]',
    border: 'border-[#9D174D]',
    accent: 'text-pink-100',
    text: 'text-white',
    subtext: 'text-pink-100/85',
    pattern: 'border-white/25',
  },
};

export const BookCover: React.FC<BookCoverProps> = ({ book, className = '', size = 'md' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [book.coverUrl]);

  const palette = PALETTE_STYLES[book.coverPalette] || PALETTE_STYLES['rose-ivory'];
  const showImage = Boolean(book.coverUrl && !imgFailed);

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl border ${palette.border} ${palette.bg} select-none ${className}`}
    >
      {showImage ? (
        <>
          <img
            src={book.coverUrl}
            alt={`Sampul buku ${book.title} karya ${book.author}`}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B1220]/85 via-[#2B1220]/45 to-transparent p-3.5 pt-10">
            <p className="font-mono text-[10px] tracking-wider text-pink-100/90 uppercase">
              {book.catalogCode}
            </p>
            <p
              className={`font-display line-clamp-2 font-semibold leading-snug text-white ${
                size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs' : 'text-sm'
              }`}
            >
              {book.title}
            </p>
          </div>
        </>
      ) : (
        <div className="relative flex h-full w-full flex-col justify-between p-4">
          {/* Subtle spine crease */}
          <div className="pointer-events-none absolute inset-y-0 left-2.5 w-px bg-current opacity-15" />

          {/* Inner editorial frame */}
          <div
            className={`flex h-full flex-col justify-between rounded-lg border ${palette.pattern} p-3.5 pl-4`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-[10px] tracking-wider uppercase ${palette.accent}`}>
                {book.catalogCode}
              </span>
              <BookOpen className={`h-3.5 w-3.5 shrink-0 ${palette.accent}`} aria-hidden="true" />
            </div>

            <div className="my-auto py-2">
              <p className={`text-[10px] font-medium tracking-wide uppercase ${palette.subtext}`}>
                {book.category}
              </p>
              <h4
                className={`font-display mt-1.5 line-clamp-4 font-semibold leading-tight ${palette.text} ${
                  size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-xs' : 'text-base'
                }`}
              >
                {book.title}
              </h4>
            </div>

            <div className="border-t border-current/15 pt-2.5">
              <p className={`truncate text-xs font-medium ${palette.text}`}>{book.author}</p>
              <p className={`mt-0.5 truncate text-[10px] ${palette.subtext}`}>{book.publisher}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
