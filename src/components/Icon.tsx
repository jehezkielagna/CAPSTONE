import type { CSSProperties } from 'react';

// Ikon outline yang sama dengan mockup (stroke 1.8, 24×24).
const PATHS = {
  beranda: 'M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5',
  log: 'M9 4h6v3H9zM9 5.5H6.5A1.5 1.5 0 0 0 5 7v12.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H15M8.5 12h7M8.5 16h5',
  dompet: 'M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V18a2 2 0 0 0 2 2h14V8H6.5A2.5 2.5 0 0 1 4 7.5ZM16 14h1.5',
  kalender: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5ZM4 10h16M8 3v4M16 3v4',
  awan: 'M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.2 9 4.5 4.5 0 0 1 17 18Z',
  bantuan: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01',
  daun: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14ZM5 19l7-7',
  bawah: 'M6 9l6 6 6-6',
  lonceng: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15ZM10 20a2 2 0 0 0 4 0',
  chat: 'M5 18.5 3.5 21V6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 18H5.5ZM8 9.5h8M8 13h5',
  orang: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14c2 .7 3.5 2.8 3.5 6',
  hujan: 'M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.2 6 4.5 4.5 0 0 1 17 15ZM8 18l-1 3M12 18l-1 3M16 18l-1 3',
  termometer: 'M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0ZM12 9v7',
  tetes: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  keranjang: 'M4 10h16l-1.5 9a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3ZM8 10l3-6M16 10l-3-6M9 14v3M15 14v3',
  gunting: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.1 7.9 20 18M8.1 16.1 20 6',
  karung: 'M8 5h8l-1 3c2.5 1.5 4 4 4 7a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5c0-3 1.5-5.5 4-7ZM9.5 8h5',
  semprot: 'M9 8h6v12H9zM12 8V5h4M17 3l2-1M17 5h3M17 7l2 1',
  titik: 'M12 12h.01M7 12h.01M17 12h.01',
  menu: 'M4 7h16M4 12h16M4 17h16',
  tutup: 'M6 6l12 12M18 6 6 18',
} as const;

export type NamaIkon = keyof typeof PATHS;

export function Icon({ name, size, style }: { name: NamaIkon; size?: number; style?: CSSProperties }) {
  return (
    <svg
      className="i"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={size ? { width: size, height: size, ...style } : style}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" role="img" aria-label="Logo Dr. Greenhouse Pendamping">
      <rect width="36" height="36" rx="10" fill="#2F7D3A" />
      <path d="M10 25c0-8 5-13 15-14 0 9-5 14-14 14Zm0 0 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26.5" cy="25.5" r="3.5" fill="#E8604E" />
    </svg>
  );
}
