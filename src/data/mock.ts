import type { DataDasbor } from './types';

// Data contoh, sama persis dengan mockup M01 (hari ini: Sel, 3 Nov 2026).
// Ganti sumbernya di src/data/api.ts ketika API sudah tersedia.
export const dataDasbor: DataDasbor = {
  hariIni: '2026-11-03T07:52:00+07:00',
  diperbaruiDrGreenhouse: '2026-11-03T07:52:00+07:00',
  greenhouses: [
    { id: 'GH-01', petani: 'Pak Jaka' },
    { id: 'GH-02', petani: 'Pak Indra' },
    { id: 'GH-03', petani: 'Pak Ari' },
  ],
  aktivitas7Hari: { 'GH-01': 9, 'GH-02': 10, 'GH-03': 4 },
  belumMencatat: [
    { petani: 'Pak Ari', greenhouse: 'GH-03', terakhirMencatat: '2026-10-30' },
  ],
  keuangan: [
    { bulan: 'Jun', pemasukan: 6_200_000, pengeluaran: 3_400_000 },
    { bulan: 'Jul', pemasukan: 4_100_000, pengeluaran: 3_900_000 },
    { bulan: 'Agu', pemasukan: 1_800_000, pengeluaran: 4_200_000 },
    { bulan: 'Sep', pemasukan: 900_000, pengeluaran: 3_600_000 },
    { bulan: 'Okt', pemasukan: 5_300_000, pengeluaran: 3_100_000 },
    { bulan: 'Nov', catatan: '1–3 Nov', pemasukan: 2_176_000, pengeluaran: 735_000 },
  ],
  bmkg: {
    ringkasan: 'Hujan ringan siang',
    suhuMin: 16,
    suhuMaks: 23,
    wilayah: 'Kec. Lembang',
    terbit: '2026-11-03T05:00:00+07:00',
  },
  aws: {
    suhu: 18.4,
    kelembapan: 88,
    curahHujan: 0,
    lokasi: 'Luar GH-01',
    waktu: '2026-11-03T07:30:00+07:00',
  },
  aktivitas: [
    { id: 'a5', waktu: '2026-11-03T07:50:00+07:00', greenhouse: 'GH-02', petani: 'Pak Indra', jenis: 'penyiraman', label: 'Penyiraman', jumlah: '350 liter' },
    { id: 'a4', waktu: '2026-11-03T07:10:00+07:00', greenhouse: 'GH-02', petani: 'Pak Indra', jenis: 'panen', label: 'Panen', jumlah: '30 kg' },
    { id: 'a3', waktu: '2026-11-02T09:40:00+07:00', greenhouse: 'GH-01', petani: 'Pak Jaka', jenis: 'pemangkasan', label: 'Pemangkasan tunas air', jumlah: '1 baris' },
    { id: 'a2', waktu: '2026-11-02T07:15:00+07:00', greenhouse: 'GH-01', petani: 'Pak Jaka', jenis: 'penyiraman', label: 'Penyiraman', jumlah: '400 liter' },
    { id: 'a1', waktu: '2026-11-01T08:00:00+07:00', greenhouse: 'GH-01', petani: 'Pak Jaka', jenis: 'pemupukan', label: 'Pemupukan NPK', jumlah: '5 kg' },
  ],
  jadwal: [
    { id: 'j1', kegiatan: 'Penyemprotan fungisida', greenhouse: 'GH-01', petani: 'Pak Jaka', target: '2026-11-02', status: 'terlambat', selisihHari: -1 },
    { id: 'j2', kegiatan: 'Panen rutin', greenhouse: 'GH-01', petani: 'Pak Jaka', target: '2026-11-03', status: 'hari-ini', selisihHari: 0 },
    { id: 'j3', kegiatan: 'Pemupukan susulan (KNO₃)', greenhouse: 'GH-01', petani: 'Pak Jaka', target: '2026-11-04', status: 'besok', selisihHari: 1 },
    { id: 'j4', kegiatan: 'Pemasangan ajir', greenhouse: 'GH-03', petani: 'Pak Ari', target: '2026-11-04', status: 'besok', selisihHari: 1 },
  ],
};
