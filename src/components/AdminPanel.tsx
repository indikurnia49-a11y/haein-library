import React, { useState } from 'react';
import { BookPlus, Check, Trash2 } from 'lucide-react';
import { COVER_PRESETS } from '../data/initialBooks';
import { Book, BookCategory, CoverPalette } from '../types/library';
import { BookCover } from './BookCover';

interface AdminPanelProps {
  books: Book[];
  onAddBook: (book: Omit<Book, 'id' | 'catalogCode' | 'status' | 'rating' | 'chapters'>) => void;
  onDeleteCustomBook: (bookId: string) => void;
}

const CATEGORIES: BookCategory[] = [
  'Fiksi',
  'Non-Fiksi',
  'Akademik/Jurnal',
  'Teknologi',
  'Pengembangan Diri',
];

const PALETTES: { value: CoverPalette; label: string }[] = [
  { value: 'rose-ivory', label: 'Rose Ivory' },
  { value: 'plum-linen', label: 'Plum Linen' },
  { value: 'blush-noir', label: 'Blush Noir' },
  { value: 'mauve-sage', label: 'Mauve Pastel' },
  { value: 'berry-vellum', label: 'Berry Magenta' },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  books,
  onAddBook,
  onDeleteCustomBook,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<BookCategory>('Fiksi');
  const [language, setLanguage] = useState<'Indonesia' | 'English'>('Indonesia');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState<number>(2026);
  const [pages, setPages] = useState<number>(240);
  const [synopsis, setSynopsis] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverPalette, setCoverPalette] = useState<CoverPalette>('rose-ivory');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const customBooks = books.filter((b) => b.isCustom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !synopsis.trim()) {
      setErrorMsg('Judul, penulis, dan sinopsis wajib diisi.');
      return;
    }

    setErrorMsg('');
    onAddBook({
      title: title.trim(),
      author: author.trim(),
      category,
      language,
      publisher: publisher.trim() || 'Pustaka Rosa Press',
      year: Number(year) || 2026,
      pages: Number(pages) || 200,
      synopsis: synopsis.trim(),
      coverUrl: coverUrl.trim() || undefined,
      coverPalette,
      keywords: [category.toLowerCase(), author.toLowerCase()],
      isCustom: true,
    });

    setTitle('');
    setAuthor('');
    setPublisher('');
    setSynopsis('');
    setCoverUrl('');
    setSuccessMsg('Koleksi buku baru berhasil ditambahkan ke katalog!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Form Column */}
      <div className="rounded-2xl border border-rose-200/90 bg-white p-6 lg:col-span-8">
        <div className="border-b border-rose-100 pb-4">
          <h3 className="font-display text-xl font-bold text-[#2B1220]">
            Tambah Koleksi Buku Baru
          </h3>
          <p className="mt-1 text-sm text-[#6B3B52]">
            Tambahkan judul baru langsung ke katalog perpustakaan (tersimpan otomatis di browser).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="admin-title" className="block text-xs font-semibold text-[#5A2D43]">
                Judul Buku *
              </label>
              <input
                id="admin-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Di Balik Layar Senja"
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              />
            </div>

            <div>
              <label htmlFor="admin-author" className="block text-xs font-semibold text-[#5A2D43]">
                Nama Penulis *
              </label>
              <input
                id="admin-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Ratna Pertiwi"
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="admin-category"
                className="block text-xs font-semibold text-[#5A2D43]"
              >
                Kategori
              </label>
              <select
                id="admin-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as BookCategory)}
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="admin-year" className="block text-xs font-semibold text-[#5A2D43]">
                Tahun Terbit
              </label>
              <input
                id="admin-year"
                type="number"
                min={1900}
                max={2030}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 font-mono text-sm tabular-nums text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              />
            </div>

            <div>
              <label htmlFor="admin-pages" className="block text-xs font-semibold text-[#5A2D43]">
                Halaman
              </label>
              <input
                id="admin-pages"
                type="number"
                min={10}
                max={3000}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 font-mono text-sm tabular-nums text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="admin-publisher"
                className="block text-xs font-semibold text-[#5A2D43]"
              >
                Penerbit
              </label>
              <input
                id="admin-publisher"
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Pustaka Rosa Press"
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              />
            </div>

            <div>
              <label
                htmlFor="admin-language"
                className="block text-xs font-semibold text-[#5A2D43]"
              >
                Bahasa
              </label>
              <select
                id="admin-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'Indonesia' | 'English')}
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              >
                <option value="Indonesia">Indonesia</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label htmlFor="admin-palette" className="block text-xs font-semibold text-[#5A2D43]">
                Gaya Sampul Bawaan
              </label>
              <select
                id="admin-palette"
                value={coverPalette}
                onChange={(e) => setCoverPalette(e.target.value as CoverPalette)}
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
              >
                {PALETTES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="admin-cover" className="block text-xs font-semibold text-[#5A2D43]">
              Link Gambar Sampul (Opsional)
            </label>
            <input
              id="admin-cover"
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://... atau pilih preset di bawah"
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#7D4B63]">Preset ilustrasi:</span>
              {COVER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setCoverUrl(preset.url)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    coverUrl === preset.url
                      ? 'border-[#BE185D] bg-rose-100 text-[#9D174D]'
                      : 'border-rose-200 bg-[#FFF9FB] text-[#6B3B52] hover:bg-rose-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              {coverUrl && (
                <button
                  type="button"
                  onClick={() => setCoverUrl('')}
                  className="text-xs font-medium text-[#9D174D] hover:underline cursor-pointer"
                >
                  Gunakan sampul tipografi
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="admin-synopsis" className="block text-xs font-semibold text-[#5A2D43]">
              Sinopsis Buku *
            </label>
            <textarea
              id="admin-synopsis"
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Tuliskan ringkasan isi buku secara singkat dan menarik..."
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-[#FFF9FB] px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-rose-700" role="alert">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800" role="status">
              <Check className="h-4 w-4" aria-hidden="true" />
              {successMsg}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#BE185D] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9D174D] cursor-pointer"
            >
              <BookPlus className="h-4 w-4" aria-hidden="true" />
              Tambahkan ke Katalog
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview & Custom Books List */}
      <div className="space-y-6 lg:col-span-4">
        <div className="rounded-2xl border border-rose-200/90 bg-white p-6">
          <p className="text-xs font-semibold tracking-wider text-[#7D4B63] uppercase">
            Pratinjau Kartu Sampul
          </p>
          <div className="mx-auto mt-4 max-w-[200px]">
            <BookCover
              book={{
                title: title || 'Judul Buku Baru',
                author: author || 'Nama Penulis',
                category,
                catalogCode: 'PR-NEW',
                coverUrl: coverUrl || undefined,
                coverPalette,
                publisher: publisher || 'Pustaka Rosa Press',
              }}
            />
          </div>
        </div>

        {customBooks.length > 0 && (
          <div className="rounded-2xl border border-rose-200/90 bg-white p-6">
            <h4 className="font-display text-base font-bold text-[#2B1220]">
              Koleksi Tambahan Anda ({customBooks.length})
            </h4>
            <ul className="mt-3 divide-y divide-rose-100">
              {customBooks.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#2B1220]">{item.title}</p>
                    <p className="truncate text-xs text-[#7D4B63]">{item.author}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteCustomBook(item.id)}
                    aria-label={`Hapus ${item.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#9D174D] hover:bg-rose-50 shrink-0 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
