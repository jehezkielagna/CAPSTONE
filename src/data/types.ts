// Tipe data yang dipakai dasbor. Nanti diisi dari API Dr. Greenhouse,
// BMKG, dan AWS Agrotani. Untuk sekarang diisi data contoh (mock.ts).

export type GreenhouseId = 'GH-01' | 'GH-02' | 'GH-03';

export interface Greenhouse {
  id: GreenhouseId;
  petani: string;
}

export type JenisAktivitas =
  | 'penyiraman'
  | 'panen'
  | 'pemangkasan'
  | 'pemupukan'
  | 'penyemprotan'
  | 'lainnya';

export interface Aktivitas {
  id: string;
  waktu: string; // ISO 8601, zona WIB
  greenhouse: GreenhouseId;
  petani: string;
  jenis: JenisAktivitas;
  label: string;
  jumlah: string;
}

export interface KeuanganBulanan {
  bulan: string; // label singkat, mis. "Jun"
  catatan?: string; // mis. "1–3 Nov" untuk bulan berjalan
  pemasukan: number; // Rupiah
  pengeluaran: number; // Rupiah
}

export type StatusJadwal = 'terlambat' | 'hari-ini' | 'besok' | 'mendatang';

export interface KegiatanJadwal {
  id: string;
  kegiatan: string;
  greenhouse: GreenhouseId;
  petani: string;
  target: string; // ISO date
  status: StatusJadwal;
  selisihHari: number; // negatif = terlambat
}

export interface PrakiraanBMKG {
  ringkasan: string;
  suhuMin: number;
  suhuMaks: number;
  wilayah: string;
  terbit: string; // ISO
}

export interface PengamatanAWS {
  suhu: number;
  kelembapan: number;
  curahHujan: number;
  lokasi: string;
  waktu: string; // ISO
}

export interface PetaniBelumMencatat {
  petani: string;
  greenhouse: GreenhouseId;
  terakhirMencatat: string; // ISO date
}

export interface DataDasbor {
  hariIni: string; // ISO
  diperbaruiDrGreenhouse: string; // ISO
  greenhouses: Greenhouse[];
  aktivitas: Aktivitas[];
  keuangan: KeuanganBulanan[];
  jadwal: KegiatanJadwal[];
  bmkg: PrakiraanBMKG;
  aws: PengamatanAWS;
  belumMencatat: PetaniBelumMencatat[];
  aktivitas7Hari: Record<GreenhouseId, number>;
}
