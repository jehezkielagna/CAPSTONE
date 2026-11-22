// Tipe data untuk website petani (sisi petani, berbeda dari dasbor manajemen).
// Setiap catatan hanya milik satu petani. Waktu disimpan ISO 8601 (WIB).

import type { GreenhouseId } from './types';

export interface Petani {
  id: string;
  nama: string; // mis. "Pak Jaka"
  greenhouse: GreenhouseId;
}

export type JenisKerja =
  | 'penyiraman'
  | 'pemupukan'
  | 'penyemprotan'
  | 'pemangkasan'
  | 'panen'
  | 'lainnya';

export interface JenisKerjaOpsi {
  jenis: JenisKerja;
  label: string;
  satuan: string; // "kg", "liter", "baris", …
  langkah: number; // besar increment tombol +/−
  pertanyaan: string; // "Berapa kg hasil panennya?"
}

export interface CatatanKerja {
  id: string;
  jenis: JenisKerja;
  label: string;
  jumlah: number;
  satuan: string;
  waktu: string; // ISO 8601
  catatan?: string;
}

export type KategoriBelanja = 'pupuk' | 'obat' | 'hok' | 'lainnya';

export interface BarangBelanja {
  id: string;
  nama: string; // "Pupuk NPK 16-16-16"
  kategori: KategoriBelanja;
  satuan: string; // "karung 25 kg", "botol 1 L", "HOK", …
}

export interface CatatanBelanja {
  id: string;
  barangId: string;
  nama: string;
  kategori: KategoriBelanja;
  harga: number; // Rupiah
  waktu: string; // ISO 8601
  catatan?: string;
}

export interface CatatanPemasukan {
  id: string;
  nominal: number; // Rupiah
  tanggal: string; // ISO date (YYYY-MM-DD)
  keterangan?: string;
}

export interface RingkasanKeuanganPetani {
  pemasukan: number;
  pengeluaran: number;
  selisih: number;
}

/** Ringkasan untuk kartu mini Jadwal di beranda (lihat saja). */
export interface JadwalRingkas {
  kegiatan: string;
  status: 'terlambat' | 'hari-ini' | 'besok' | 'mendatang';
  selisihHari: number; // negatif = terlambat
  tambahan?: string; // mis. "+ Panen hari ini"
}

/** Ringkasan untuk kartu mini Cuaca di beranda. */
export interface CuacaRingkas {
  suhu: number; // °C (prakiraan ringkas)
  ringkasan: string; // "Siang hujan"
  saran: string; // "Semprot pagi saja"
}

/** Semua yang dibutuhkan beranda petani dalam satu muatan. */
export interface DataBerandaPetani {
  petani: Petani;
  hariIni: string; // ISO
  sudahMencatatHariIni: boolean;
  jumlahCatatanHariIni: number;
  jadwal: JadwalRingkas;
  cuaca: CuacaRingkas;
}

// ---- Fase B (P1): Jadwal, Cuaca, Riwayat ----

export interface FaseTanam {
  nama: string; // "Masa Panen"
  hariKe: number;
  totalHari: number;
  sampai: string; // "31 Des"
}

export interface JadwalItem {
  id: string;
  jenis: JenisKerja; // untuk ikon dan tautan Catat
  judul: string;
  waktuLabel: string; // "Kemarin · Lewat 1 hari", "Hari ini", "Besok, Rabu 4 Nov"
  status: 'terlambat' | 'hari-ini' | 'besok' | 'mendatang';
  bolehCatat: boolean; // tombol "Catat" muncul (terlambat / hari ini)
}

export interface JadwalPetani {
  fase: FaseTanam;
  items: JadwalItem[];
}

export interface CuacaHarian {
  tanggal: string; // ISO
  ringkasan: string; // "Siang nanti hujan"
  detail: string; // "Hujan ringan, mulai sekitar jam 12"
  saran: { judul: string; teks: string };
  suhu: number; // °C
  kelembapan: number; // %
  curahHujan: number; // mm
  awsWaktu: string; // ISO — kapan alat kebun mengukur
  awsLama: boolean; // data lebih dari 3 jam
  besok: { hari: string; ringkasan: string; suhuMin: number; suhuMaks: number };
}

export interface KelompokHari<T> {
  tanggal: string; // YYYY-MM-DD
  label: string; // "Hari ini", "Kemarin", "Sab, 1 Nov"
  items: T[];
}
