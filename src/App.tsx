import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, BookPlus, CalendarClock, CheckCircle2, SearchX } from 'lucide-react';
import { INITIAL_BOOKS, INITIAL_LOANS } from './data/initialBooks';
import {
  BOOK_CATEGORIES,
  Book,
  BookCategory,
  LoanRecord,
  MemberProfile,
  VisitStats,
} from './types/library';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { BorrowingCenter } from './components/BorrowingCenter';
import { AdminPanel } from './components/AdminPanel';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { MemberModal } from './components/MemberModal';
import { AboutSection } from './components/AboutSection';

const STORAGE_KEYS = {
  books: 'pustaka_rosa_books_v1',
  loans: 'pustaka_rosa_loans_v1',
  bookmarks: 'pustaka_rosa_bookmarks_v1',
  member: 'pustaka_rosa_member_v1',
  visits: 'pustaka_rosa_visits_v1',
  sessionCounted: 'pustaka_rosa_session_counted_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysToDateStr(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function App() {
  const [books, setBooks] = useState<Book[]>(() =>
    readStorage<Book[]>(STORAGE_KEYS.books, INITIAL_BOOKS)
  );
  const [loans, setLoans] = useState<LoanRecord[]>(() =>
    readStorage<LoanRecord[]>(STORAGE_KEYS.loans, INITIAL_LOANS)
  );
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.bookmarks, ['book-01'])
  );
  const [member, setMember] = useState<MemberProfile | null>(() =>
    readStorage<MemberProfile | null>(STORAGE_KEYS.member, null)
  );
  const [visitStats, setVisitStats] = useState<VisitStats>(() => {
    const today = getTodayStr();
    const stored = readStorage<VisitStats>(STORAGE_KEYS.visits, {
      totalVisits: 1428,
      todayVisits: 37,
      lastVisitDate: today,
      sessionCount: 0,
    });
    return stored;
  });

  // UI states
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [workspaceTab, setWorkspaceTab] = useState<'katalog' | 'pinjaman' | 'admin'>('katalog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | BookCategory>('Semua');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Tersedia' | 'Dipinjam'>('Semua');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [memberModalOpen, setMemberModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Increment visit counter once per browser session
  useEffect(() => {
    const today = getTodayStr();
    const alreadyCounted = sessionStorage.getItem(STORAGE_KEYS.sessionCounted);
    if (!alreadyCounted) {
      setVisitStats((prev) => {
        const isSameDay = prev.lastVisitDate === today;
        const next: VisitStats = {
          totalVisits: prev.totalVisits + 1,
          todayVisits: isSameDay ? prev.todayVisits + 1 : 1,
          lastVisitDate: today,
          sessionCount: prev.sessionCount + 1,
        };
        try {
          localStorage.setItem(STORAGE_KEYS.visits, JSON.stringify(next));
          sessionStorage.setItem(STORAGE_KEYS.sessionCounted, '1');
        } catch {
          // Ignore storage quota errors
        }
        return next;
      });
    }
  }, []);

  // Persist states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
    } catch {
      // ignore
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.loans, JSON.stringify(loans));
    } catch {
      // ignore
    }
  }, [loans]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      if (member) {
        localStorage.setItem(STORAGE_KEYS.member, JSON.stringify(member));
      } else {
        localStorage.removeItem(STORAGE_KEYS.member);
      }
    } catch {
      // ignore
    }
  }, [member]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 3500);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'katalog' || sectionId === 'kategori') {
      setWorkspaceTab('katalog');
    }
    const targetId = sectionId === 'kategori' ? 'kategori-filter' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleBookmark = (bookId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(bookId);
      const next = exists ? prev.filter((id) => id !== bookId) : [...prev, bookId];
      const bookTitle = books.find((b) => b.id === bookId)?.title || 'Buku';
      showToast(
        exists
          ? `"${bookTitle}" dihapus dari Daftar Bacaan.`
          : `"${bookTitle}" disimpan ke Daftar Bacaan.`
      );
      return next;
    });
  };

  const handleBorrowBook = (bookId: string, borrowerName: string, durationDays: number) => {
    const target = books.find((b) => b.id === bookId);
    if (!target || target.status === 'Dipinjam') return;

    const today = getTodayStr();
    const dueDate = addDaysToDateStr(today, durationDays);

    const newLoan: LoanRecord = {
      id: `loan-${Date.now()}`,
      bookId: target.id,
      bookTitle: target.title,
      bookAuthor: target.author,
      catalogCode: target.catalogCode,
      borrowerName,
      memberId: member?.memberId || 'TAMU',
      borrowedAt: today,
      dueDate,
      status: 'Aktif',
    };

    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status: 'Dipinjam' } : b))
    );
    setLoans((prev) => [newLoan, ...prev]);
    showToast(`Berhasil meminjam "${target.title}" hingga ${dueDate}.`);
  };

  const handleReturnBook = (bookId: string) => {
    const target = books.find((b) => b.id === bookId);
    if (!target) return;

    const today = getTodayStr();
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status: 'Tersedia' } : b))
    );
    setLoans((prev) =>
      prev.map((loan) =>
        loan.bookId === bookId && loan.status === 'Aktif'
          ? { ...loan, status: 'Dikembalikan', returnedAt: today }
          : loan
      )
    );
    showToast(`"${target.title}" telah dikembalikan dan tersedia kembali.`);
  };

  const handleAddBook = (
    newBookInput: Omit<Book, 'id' | 'catalogCode' | 'status' | 'rating' | 'chapters'>
  ) => {
    const prefixMap: Record<BookCategory, string> = {
      Fiksi: 'FIK',
      'Non-Fiksi': 'NON',
      'Akademik/Jurnal': 'AKA',
      Teknologi: 'TEK',
      'Pengembangan Diri': 'PGD',
    };
    const nextNum = 600 + books.length + 1;
    const catalogCode = `PR-${prefixMap[newBookInput.category]}-${nextNum}`;

    const newBook: Book = {
      ...newBookInput,
      id: `book-custom-${Date.now()}`,
      catalogCode,
      status: 'Tersedia',
      rating: 4.8,
      chapters: [
        {
          title: 'Bab I — Pengantar Koleksi',
          content: [
            newBookInput.synopsis,
            `Koleksi ini diterbitkan oleh ${newBookInput.publisher} pada tahun ${newBookInput.year} dan ditulis oleh ${newBookInput.author}. Selamat membaca pratinjau digital di Pustaka Rosa.`,
          ],
        },
      ],
    };

    setBooks((prev) => [newBook, ...prev]);
    showToast(`"${newBook.title}" ditambahkan ke katalog Pustaka Rosa.`);
  };

  const handleDeleteCustomBook = (bookId: string) => {
    const target = books.find((b) => b.id === bookId);
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setBookmarks((prev) => prev.filter((id) => id !== bookId));
    if (selectedBookId === bookId) setSelectedBookId(null);
    if (target) showToast(`"${target.title}" dihapus dari katalog.`);
  };

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory =
        selectedCategory === 'Semua' || book.category === selectedCategory;
      const matchesStatus = statusFilter === 'Semua' || book.status === statusFilter;
      if (!matchesCategory || !matchesStatus) return false;
      if (!q) return true;

      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.synopsis.toLowerCase().includes(q) ||
        book.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [books, searchQuery, selectedCategory, statusFilter]);

  const availableCount = useMemo(
    () => books.filter((b) => b.status === 'Tersedia').length,
    [books]
  );
  const borrowedCount = books.length - availableCount;

  const bookmarkedBooks = useMemo(
    () => books.filter((b) => bookmarks.includes(b.id)),
    [books, bookmarks]
  );

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const selectedBookActiveLoan = useMemo(
    () => loans.find((l) => l.bookId === selectedBookId && l.status === 'Aktif'),
    [loans, selectedBookId]
  );

  const activeLoansCount = useMemo(
    () => loans.filter((l) => l.status === 'Aktif').length,
    [loans]
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9FB] text-[#2B1220]">
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        member={member}
        onOpenMemberModal={() => setMemberModalOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => handleNavigate('katalog')}
          totalBooks={books.length}
          availableBooks={availableCount}
          borrowedBooks={borrowedCount}
          visitStats={visitStats}
          onOpenLoansTab={() => {
            setWorkspaceTab('pinjaman');
            const el = document.getElementById('katalog');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        {/* Workspace Section: Catalog, Borrowing/Returns & Admin Panel */}
        <section id="katalog" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Workspace Header & Mode Tabs */}
          <div className="flex flex-col justify-between gap-4 border-b border-rose-200/80 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#9D174D] uppercase">
                Koleksi & Sirkulasi Digital
              </p>
              <h2 className="font-display mt-1.5 text-2xl font-bold text-[#2B1220] sm:text-3xl">
                {workspaceTab === 'katalog'
                  ? 'Katalog Koleksi Buku'
                  : workspaceTab === 'pinjaman'
                    ? 'Peminjaman & Pengembalian Buku'
                    : 'Panel Admin Tambah Koleksi'}
              </h2>
            </div>

            {/* Segmented Workspace Switcher */}
            <div
              role="tablist"
              aria-label="Menu ruang kerja perpustakaan"
              className="inline-flex w-full overflow-x-auto rounded-xl border border-rose-200 bg-rose-50/70 p-1 sm:w-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={workspaceTab === 'katalog'}
                onClick={() => setWorkspaceTab('katalog')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  workspaceTab === 'katalog'
                    ? 'bg-white text-[#9D174D] shadow-xs'
                    : 'text-[#6B3B52] hover:text-[#2B1220]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Katalog Koleksi
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={workspaceTab === 'pinjaman'}
                onClick={() => setWorkspaceTab('pinjaman')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  workspaceTab === 'pinjaman'
                    ? 'bg-white text-[#9D174D] shadow-xs'
                    : 'text-[#6B3B52] hover:text-[#2B1220]'
                }`}
              >
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                Pinjaman & Pengembalian ({activeLoansCount})
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={workspaceTab === 'admin'}
                onClick={() => setWorkspaceTab('admin')}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  workspaceTab === 'admin'
                    ? 'bg-white text-[#9D174D] shadow-xs'
                    : 'text-[#6B3B52] hover:text-[#2B1220]'
                }`}
              >
                <BookPlus className="h-3.5 w-3.5" aria-hidden="true" />
                Panel Admin
              </button>
            </div>
          </div>

          {workspaceTab === 'katalog' && (
            <div className="mt-7 space-y-7">
              {/* Category Filter & Status Filter Toolbar */}
              <div
                id="kategori-filter"
                className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"
              >
                {/* Interactive Category Tabs */}
                <div
                  className="flex flex-wrap items-center gap-2"
                  role="group"
                  aria-label="Filter kategori buku"
                >
                  {BOOK_CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#BE185D] text-white shadow-xs'
                            : 'border border-rose-200 bg-white text-[#6B3B52] hover:border-rose-300 hover:bg-rose-50 hover:text-[#9D174D]'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                {/* Status Filter & Result Count */}
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="font-mono text-xs tabular-nums text-[#7D4B63]">
                    Menampilkan {filteredBooks.length} buku
                  </span>

                  <label htmlFor="status-filter" className="sr-only">
                    Filter ketersediaan buku
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as 'Semua' | 'Tersedia' | 'Dipinjam')
                    }
                    className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-[#5A2D43] focus:border-[#BE185D] focus:outline-none"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Tersedia">Hanya Tersedia</option>
                    <option value="Dipinjam">Sedang Dipinjam</option>
                  </select>
                </div>
              </div>

              {/* Book Grid */}
              {filteredBooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200/80 bg-white px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-[#BE185D]">
                    <SearchX className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold text-[#2B1220]">
                    Buku Tidak Ditemukan
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm text-[#6B3B52]">
                    Tidak ada koleksi yang cocok dengan pencarian atau filter kategori Anda saat
                    ini.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                      setStatusFilter('Semua');
                    }}
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[#BE185D] px-5 text-sm font-semibold text-white hover:bg-[#9D174D] cursor-pointer"
                  >
                    Reset Pencarian & Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      isBookmarked={bookmarks.includes(book.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelectBook={(b) => setSelectedBookId(b.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {workspaceTab === 'pinjaman' && (
            <div className="mt-7">
              <BorrowingCenter
                books={books}
                loans={loans}
                member={member}
                onBorrowBook={handleBorrowBook}
                onReturnBook={handleReturnBook}
                onSelectBook={(b) => setSelectedBookId(b.id)}
              />
            </div>
          )}

          {workspaceTab === 'admin' && (
            <div className="mt-7">
              <AdminPanel
                books={books}
                onAddBook={handleAddBook}
                onDeleteCustomBook={handleDeleteCustomBook}
              />
            </div>
          )}
        </section>

        <AboutSection visitStats={visitStats} onNavigate={handleNavigate} />
      </main>

      {/* Modals & Drawers */}
      <BookDetailModal
        book={selectedBook}
        activeLoan={selectedBookActiveLoan}
        isBookmarked={selectedBook ? bookmarks.includes(selectedBook.id) : false}
        member={member}
        onClose={() => setSelectedBookId(null)}
        onToggleBookmark={handleToggleBookmark}
        onBorrowBook={handleBorrowBook}
        onReturnBook={handleReturnBook}
      />

      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedBooks={bookmarkedBooks}
        onSelectBook={(b) => setSelectedBookId(b.id)}
        onRemoveBookmark={handleToggleBookmark}
      />

      <MemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        member={member}
        onLogin={(profile) => {
          setMember(profile);
          showToast(`Selamat datang kembali, ${profile.name}!`);
        }}
        onLogout={() => {
          setMember(null);
          showToast('Anda telah keluar dari akun anggota.');
        }}
        activeLoansCount={activeLoansCount}
        bookmarksCount={bookmarks.length}
        visitStats={visitStats}
      />

      {/* Non-intrusive Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-4 z-50 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-[#2B1220] px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-pink-300" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
