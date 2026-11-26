export type BookCategory =
  | 'Fiksi'
  | 'Non-Fiksi'
  | 'Akademik/Jurnal'
  | 'Teknologi'
  | 'Pengembangan Diri';

export const BOOK_CATEGORIES: Array<'Semua' | BookCategory> = [
  'Semua',
  'Fiksi',
  'Non-Fiksi',
  'Akademik/Jurnal',
  'Teknologi',
  'Pengembangan Diri',
];

export type BookStatus = 'Tersedia' | 'Dipinjam';

export type CoverPalette =
  | 'rose-ivory'
  | 'plum-linen'
  | 'blush-noir'
  | 'mauve-sage'
  | 'terracotta-cream'
  | 'berry-vellum';

export interface BookChapter {
  title: string;
  content: string[];
}

export interface Book {
  id: string;
  catalogCode: string;
  title: string;
  author: string;
  category: BookCategory;
  language: 'Indonesia' | 'English';
  publisher: string;
  year: number;
  pages: number;
  rating: number;
  status: BookStatus;
  coverUrl?: string;
  coverPalette: CoverPalette;
  synopsis: string;
  keywords: string[];
  chapters: BookChapter[];
  isCustom?: boolean;
}

export interface LoanRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  catalogCode: string;
  borrowerName: string;
  memberId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: 'Aktif' | 'Dikembalikan';
}

export interface MemberProfile {
  name: string;
  email: string;
  memberId: string;
  joinedAt: string;
}

export interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  lastVisitDate: string;
  sessionCount: number;
}
