import { dataDasbor } from './mock';
import type { DataDasbor, GreenhouseId } from './types';

// Satu-satunya pintu masuk data untuk halaman. Saat API Dr. Greenhouse,
// BMKG, dan AWS siap, ganti isi fungsi ini tanpa mengubah komponen.
export async function ambilDataDasbor(): Promise<DataDasbor> {
  return dataDasbor;
}

// Saring data dasbor per greenhouse (filter "Semua greenhouse" di topbar).
// Catatan: data keuangan contoh hanya tersedia sebagai total semua greenhouse,
// jadi grafik keuangan tidak ikut tersaring sampai API menyediakan rinciannya.
export function saringPerGreenhouse(data: DataDasbor, gh: GreenhouseId | 'semua'): DataDasbor {
  if (gh === 'semua') return data;
  return {
    ...data,
    aktivitas: data.aktivitas.filter((a) => a.greenhouse === gh),
    jadwal: data.jadwal.filter((j) => j.greenhouse === gh),
    belumMencatat: data.belumMencatat.filter((p) => p.greenhouse === gh),
    aktivitas7Hari: { 'GH-01': 0, 'GH-02': 0, 'GH-03': 0, [gh]: data.aktivitas7Hari[gh] },
  };
}
