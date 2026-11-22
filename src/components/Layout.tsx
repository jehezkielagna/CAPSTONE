import { useState, type ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon, Logo, type NamaIkon } from './Icon';
import { FITUR } from '../config';
import type { GreenhouseId } from '../data/types';

const MENU: { to: string; label: string; labelMobile: string; icon: NamaIkon }[] = [
  { to: '/', label: 'Dasbor', labelMobile: 'Dasbor', icon: 'beranda' },
  { to: '/log-aktivitas', label: 'Log Aktivitas', labelMobile: 'Aktivitas', icon: 'log' },
  { to: '/keuangan', label: 'Keuangan', labelMobile: 'Keuangan', icon: 'dompet' },
  { to: '/jadwal-tanam', label: 'Jadwal Tanam', labelMobile: 'Jadwal', icon: 'kalender' },
  { to: '/macroclimate', label: 'Macroclimate', labelMobile: 'Cuaca', icon: 'awan' },
];

export interface Pengingat {
  id: string;
  teks: string;
  nada: 'merah' | 'kuning';
}

interface Props {
  judul: string;
  subjudul: ReactNode;
  greenhouse: GreenhouseId | 'semua';
  onGreenhouse: (gh: GreenhouseId | 'semua') => void;
  pilihanGreenhouse: { id: GreenhouseId; petani: string }[];
  pengingat: Pengingat[];
  children: ReactNode;
}

export function Layout({ judul, subjudul, greenhouse, onGreenhouse, pilihanGreenhouse, pengingat, children }: Props) {
  const [bukaPengingat, setBukaPengingat] = useState(false);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <Logo />
          <div>
            <div className="brand-nama">Dr. Greenhouse</div>
            <div className="src">Pendamping · Agrotani</div>
          </div>
        </div>
        {MENU.map((m) => (
          <NavLink key={m.to} to={m.to} end={m.to === '/'} className={({ isActive }) => `snav${isActive ? ' on' : ''}`}>
            <Icon name={m.icon} />
            {m.label}
          </NavLink>
        ))}
        <div style={{ flex: 1 }} />
        <NavLink to="/bantuan" className={({ isActive }) => `snav${isActive ? ' on' : ''}`}>
          <Icon name="bantuan" />
          Bantuan
        </NavLink>
        <div className="profil">
          <div className="avatar">PF</div>
          <div>
            <div className="profil-nama">Pak Ferry</div>
            <div className="src">Manajemen</div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <Link to="/" className="topbar-logo" aria-label="Ke Dasbor">
            <Logo size={44} />
          </Link>
          <div className="topbar-judul">
            <h1>{judul}</h1>
            <div className="src topbar-sub topbar-sub-desktop">{subjudul}</div>
            <div className="src topbar-sub-mobile">Pak Ferry · Manajemen</div>
          </div>

          <label className="sel">
            <Icon name="daun" />
            <span className="visually-hidden">Pilih greenhouse</span>
            <select value={greenhouse} onChange={(e) => onGreenhouse(e.target.value as GreenhouseId | 'semua')}>
              <option value="semua">Semua greenhouse</option>
              {pilihanGreenhouse.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id} ({g.petani})
                </option>
              ))}
            </select>
            <Icon name="bawah" size={16} />
          </label>

          <div className="pengingat-wrap">
            <button
              className="iconbtn"
              aria-label={`Pengingat, ${pengingat.length} baru`}
              aria-expanded={bukaPengingat}
              onClick={() => setBukaPengingat((v) => !v)}
            >
              <Icon name="lonceng" />
              {pengingat.length > 0 && <span className="dot" />}
            </button>
            {bukaPengingat && (
              <div className="popover card" role="dialog" aria-label="Pengingat">
                <div className="popover-head">
                  <strong>Pengingat</strong>
                  <button className="link-btn" onClick={() => setBukaPengingat(false)}>Tutup</button>
                </div>
                {pengingat.length === 0 && <p className="muted" style={{ margin: 0 }}>Tidak ada pengingat.</p>}
                {pengingat.map((p) => (
                  <div key={p.id} className={`pengingat-item ${p.nada}`}>{p.teks}</div>
                ))}
              </div>
            )}
          </div>

          {FITUR.asistenAI && (
            <Link className="btn btn-p btn-ai-top" to="/asisten-ai">
              <Icon name="chat" />
              Tanya Asisten AI
            </Link>
          )}

          <Link className="btn btn-s btn-bantuan-mobile" to="/bantuan">
            <Icon name="bantuan" />
            Bantuan
          </Link>
        </header>

        <div className="konten">{children}</div>

        {FITUR.asistenAI && (
          <Link className="btn btn-p fab-ai" to="/asisten-ai">
            <Icon name="chat" />
            Tanya AI
          </Link>
        )}
      </main>

      <nav className="bottomnav" aria-label="Navigasi utama">
        {MENU.map((m) => (
          <NavLink key={m.to} to={m.to} end={m.to === '/'} className={({ isActive }) => `bnav${isActive ? ' on' : ''}`}>
            <span className="bnav-ikon"><Icon name={m.icon} /></span>
            {m.labelMobile}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
