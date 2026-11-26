import React, { useState } from 'react';
import { Bookmark, BookHeart, Menu, User, X } from 'lucide-react';
import { MemberProfile } from '../types/library';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  member: MemberProfile | null;
  onOpenMemberModal: () => void;
}

const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'katalog', label: 'Katalog Koleksi' },
  { id: 'kategori', label: 'Kategori' },
  { id: 'tentang', label: 'Tentang' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  bookmarkCount,
  onOpenBookmarks,
  member,
  onOpenMemberModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rose-200/80 bg-[#FFF9FB]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Title */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] rounded-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BE185D] text-white shadow-sm">
            <BookHeart className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-[#2B1220]">
            Pustaka Rosa
          </span>
        </a>

        {/* Zone 2: Clean Typographic Nav Links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B3B52]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#BE185D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] rounded ${
                  isActive ? 'text-[#9D174D] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#BE185D]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Bookmark + Primary Member Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenBookmarks}
            aria-label={`Daftar Bacaan (${bookmarkCount} buku tersimpan)`}
            className="relative inline-flex h-10 items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 text-sm font-medium text-[#6B3B52] transition-colors duration-150 hover:border-rose-300 hover:bg-rose-50 hover:text-[#9D174D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bookmark
              className={`h-4 w-4 ${bookmarkCount > 0 ? 'fill-[#BE185D] text-[#BE185D]' : ''}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Daftar Bacaan</span>
            <span className="font-mono text-xs font-semibold tabular-nums text-[#9D174D]">
              {bookmarkCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenMemberModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#BE185D] px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#9D174D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <User className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="max-w-[130px] truncate">
              {member ? member.name.split(' ')[0] : 'Masuk / Anggota'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200 bg-white text-[#6B3B52] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/80 bg-[#FFF9FB] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navigasi seluler">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-rose-100/80 text-[#9D174D]'
                    : 'text-[#6B3B52] hover:bg-rose-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
