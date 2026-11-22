import type { CSSProperties } from 'react';

// Ikon outline khusus layar petani (stroke 2, 24×24), sesuai mockup P01–P13.
// Terpisah dari components/Icon.tsx agar gaya manajemen tidak terpengaruh.
const PATHS = {
  beranda: 'M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5',
  riwayat: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  bantuan: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01',
  lonceng: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15ZM10 20a2 2 0 0 0 4 0',
  kanan: 'M9 6l6 6-6 6',
  kiri: 'M15 5l-7 7 7 7',
  tambah: 'M12 5v14M5 12h14',
  kurang: 'M5 12h14',
  centang: 'M5 12.5 10 17.5 19 7',
  jam: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  // kegiatan kerja
  daun: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14ZM5 19l7-7',
  tetes: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z',
  karung: 'M8 5h8l-1 3c2.5 1.5 4 4 4 7a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5c0-3 1.5-5.5 4-7ZM9.5 8h5',
  semprot: 'M9 8h6v12H9zM12 8V5h4M17 3l2-1M17 5h3M17 7l2 1',
  gunting: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.1 7.9 20 18M8.1 16.1 20 6',
  keranjang: 'M4 10h16l-1.5 9a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3ZM8 10l3-6M16 10l-3-6M9 14v3M15 14v3',
  titik: 'M12 12h.01M7 12h.01M17 12h.01',
  // belanja & uang
  kereta: 'M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2M10 20.5h.01M17 20.5h.01',
  botol: 'M9 8h6v11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM10 8V5h4v3M10 12h4',
  orang: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0',
  uang: 'M3 7h18v10H3ZM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM6.5 10v4M17.5 10v4',
  // jadwal, cuaca, kondisi
  kalender: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5ZM4 10h16M8 3v4M16 3v4',
  cuaca: 'M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.2 6 4.5 4.5 0 0 1 17 15ZM8 18l-1 3M12 18l-1 3M16 18l-1 3',
  hujanBesar: 'M7 16a4.5 4.5 0 1 1 1-8.9A5.5 5.5 0 0 1 18.5 9 3.5 3.5 0 0 1 18 16ZM8 19l-1 2M12 19l-1 2M16 19l-1 2',
  gerimis: 'M7 15a4 4 0 1 1 1-7.9A5 5 0 0 1 17.5 9 3 3 0 0 1 17 15ZM9 18v2M13 18v2',
  matahari: 'M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  suhuIsi: 'M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0Z',
  termometer: 'M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0ZM12 9v7',
  kotak: 'M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V18a2 2 0 0 0 2 2h14V8H6.5A2.5 2.5 0 0 1 4 7.5ZM16 14h1.5',
  kunci: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  wifiOff: 'M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M14.5 10.4A10 10 0 0 1 19 13M2 9.5a14.5 14.5 0 0 1 4.6-2.8M10.8 5.6A14.5 14.5 0 0 1 22 9.5M12 20h.01',
  ulang: 'M20 11a8 8 0 0 0-14.6-4.5M4 4v3.5h3.5M4 13a8 8 0 0 0 14.6 4.5M20 20v-3.5h-3.5',
} as const;

export type NamaIkonP = keyof typeof PATHS;

export function IconP({ name, size, style }: { name: NamaIkonP; size?: number; style?: CSSProperties }) {
  return (
    <svg
      className="p-i"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={size ? { width: size, height: size, ...style } : style}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
