import React, { useState, useEffect } from 'react';
import { LogOut, UserCheck, X } from 'lucide-react';
import { MemberProfile, VisitStats } from '../types/library';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile | null;
  onLogin: (profile: MemberProfile) => void;
  onLogout: () => void;
  activeLoansCount: number;
  bookmarksCount: number;
  visitStats: VisitStats;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onLogin,
  onLogout,
  activeLoansCount,
  bookmarksCount,
  visitStats,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Mohon isi nama lengkap dan alamat email.');
      return;
    }
    setError('');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    onLogin({
      name: name.trim(),
      email: email.trim(),
      memberId: `PR-2026-${randomCode}`,
      joinedAt: new Date().toISOString().slice(0, 10),
    });
    setName('');
    setEmail('');
  };

  const handleDemoLogin = () => {
    onLogin({
      name: 'Indi Kurnia',
      email: 'indi.kurnia@pustakarosa.id',
      memberId: 'PR-2026-0142',
      joinedAt: '2026-03-14',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1220]/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-rose-200 bg-[#FFF9FB] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rose-200/80 bg-white px-6 py-4">
          <h2 id="member-modal-title" className="font-display text-lg font-bold text-[#2B1220]">
            {member ? 'Kartu Anggota Digital' : 'Masuk / Daftar Anggota'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela anggota"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-[#6B3B52] hover:bg-rose-50 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {member ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-[#BE185D] to-[#831843] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-pink-200 uppercase">
                    Pustaka Rosa Member
                  </span>
                  <UserCheck className="h-5 w-5 text-pink-200" aria-hidden="true" />
                </div>
                <p className="font-display mt-4 text-2xl font-bold">{member.name}</p>
                <p className="text-xs text-pink-100/90">{member.email}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-3 font-mono text-xs tabular-nums">
                  <span>ID: {member.memberId}</span>
                  <span>Bergabung: {member.joinedAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-rose-200 rounded-xl border border-rose-200 bg-white py-3 text-center">
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-[#2B1220]">
                    {activeLoansCount}
                  </p>
                  <p className="text-[11px] text-[#7D4B63]">Pinjaman Aktif</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-[#2B1220]">
                    {bookmarksCount}
                  </p>
                  <p className="text-[11px] text-[#7D4B63]">Daftar Bacaan</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-[#2B1220]">
                    {visitStats.sessionCount}
                  </p>
                  <p className="text-[11px] text-[#7D4B63]">Sesi Kunjungan</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white px-4 text-sm font-semibold text-[#9D174D] hover:bg-rose-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Keluar dari Akun Anggota
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#6B3B52]">
                Masuk sebagai anggota untuk mempercepat proses peminjaman buku dan sinkronisasi
                daftar bacaan Anda.
              </p>

              <div>
                <label htmlFor="member-name" className="block text-xs font-semibold text-[#5A2D43]">
                  Nama Lengkap
                </label>
                <input
                  id="member-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Anisa Rahmawati"
                  className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
                />
              </div>

              <div>
                <label htmlFor="member-email" className="block text-xs font-semibold text-[#5A2D43]">
                  Alamat Email
                </label>
                <input
                  id="member-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-[#2B1220] focus:border-[#BE185D] focus:outline-none focus:ring-2 focus:ring-[#BE185D]/20"
                />
              </div>

              {error && (
                <p className="text-xs font-semibold text-rose-700" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#BE185D] px-4 text-sm font-semibold text-white hover:bg-[#9D174D] cursor-pointer"
              >
                Masuk / Buat Kartu Anggota
              </button>

              <div className="border-t border-rose-200/80 pt-3">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-rose-200 bg-white px-4 text-xs font-semibold text-[#6B3B52] hover:bg-rose-50 hover:text-[#9D174D] cursor-pointer"
                >
                  Masuk Cepat sebagai Anggota Demo (Indi Kurnia)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
