import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconP, type NamaIkonP } from './IconP';

const NAV: { to: string; label: string; ikon: NamaIkonP }[] = [
  { to: '/petani', label: 'Beranda', ikon: 'beranda' },
  { to: '/petani/riwayat', label: 'Riwayat', ikon: 'riwayat' },
  { to: '/petani/bantuan', label: 'Bantuan', ikon: 'bantuan' },
];

// Nav bawah hanya tampil di halaman tingkat atas. Alur pencatatan (catat-*)
// memakai bilah atas + tombol Simpan sendiri, jadi nav disembunyikan.
const TANPA_NAV = ['/petani/catat-kerja', '/petani/catat-belanja', '/petani/catat-pemasukan', '/petani/panduan'];

export function LayoutPetani({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const tampilNav = !TANPA_NAV.some((p) => pathname.startsWith(p));

  return (
    <div className="petani">
      {children}
      {tampilNav && (
        <nav className="p-bottomnav" aria-label="Navigasi petani">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/petani'}
              className={({ isActive }) => `p-nav${isActive ? ' on' : ''}`}
            >
              <span className="p-pill">
                <IconP name={n.ikon} />
              </span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
