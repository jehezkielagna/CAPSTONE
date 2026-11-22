// Satu pintu masuk data untuk website petani. Saat API Dr. Greenhouse siap,
// ganti isi fungsi ini tanpa mengubah komponen. Untuk sekarang: penyimpanan
// dalam-memori yang diisi dari mock-petani.ts.

import type {
  BarangBelanja,
  CatatanBelanja,
  CatatanKerja,
  CatatanPemasukan,
  CuacaHarian,
  DataBerandaPetani,
  JadwalPetani,
  JenisKerjaOpsi,
  KelompokHari,
  RingkasanKeuanganPetani,
} from './types-petani';
import { tanggalKoma } from './format';
import {
  BARANG,
  BELANJA_AWAL,
  HARI_INI,
  KEGIATAN,
  KERJA_AWAL,
  PEMASUKAN_AWAL,
  PETANI_AKTIF,
} from './mock-petani';

// Penyimpanan dalam-memori (salin dari data awal agar mock tidak termutasi).
const kerja: CatatanKerja[] = [...KERJA_AWAL];
const belanja: CatatanBelanja[] = [...BELANJA_AWAL];
const pemasukan: CatatanPemasukan[] = [...PEMASUKAN_AWAL];

let urut = 1000;
const idBaru = (awalan: string) => `${awalan}-${urut++}`;

// Tanggal "hari ini" mengikuti data contoh (3 Nov 2026) agar demo konsisten.
const tanggalHariIni = HARI_INI.slice(0, 10);

function tanggalDari(iso: string): string {
  return iso.slice(0, 10);
}

// --- Simulasi gagal simpan (untuk memperagakan kondisi P07b / K01). ---
let simulasiGagal = false;
export function setSimulasiGagal(v: boolean): void {
  simulasiGagal = v;
}
export function ambilSimulasiGagal(): boolean {
  return simulasiGagal;
}

function tunda<T>(nilai: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(nilai), ms));
}

// --- Baca ---

export function daftarKegiatan(): JenisKerjaOpsi[] {
  return KEGIATAN;
}

export function daftarBarang(): BarangBelanja[] {
  return BARANG;
}

export function jumlahCatatanHariIni(): number {
  const n = (arr: { waktu?: string; tanggal?: string }[]) =>
    arr.filter((x) => tanggalDari(x.waktu ?? x.tanggal ?? '') === tanggalHariIni).length;
  return n(kerja) + n(belanja) + n(pemasukan);
}

export async function ambilBeranda(): Promise<DataBerandaPetani> {
  const total = jumlahCatatanHariIni();
  return tunda({
    petani: PETANI_AKTIF,
    hariIni: HARI_INI,
    sudahMencatatHariIni: total > 0,
    jumlahCatatanHariIni: total,
    jadwal: {
      kegiatan: 'Semprot obat',
      status: 'terlambat',
      selisihHari: -1,
      tambahan: '+ Panen hari ini',
    },
    cuaca: { suhu: 18, ringkasan: 'Siang hujan', saran: 'Semprot pagi saja' },
  });
}

export async function ambilKeuanganBulan(): Promise<RingkasanKeuanganPetani> {
  const bulan = tanggalHariIni.slice(0, 7); // "2026-11"
  const masuk = pemasukan
    .filter((p) => p.tanggal.slice(0, 7) === bulan)
    .reduce((s, p) => s + p.nominal, 0);
  const keluar = belanja
    .filter((b) => tanggalDari(b.waktu).slice(0, 7) === bulan)
    .reduce((s, b) => s + b.harga, 0);
  return tunda({ pemasukan: masuk, pengeluaran: keluar, selisih: masuk - keluar });
}

// --- Tulis ---

export interface InputKerja {
  jenis: CatatanKerja['jenis'];
  label: string;
  jumlah: number;
  satuan: string;
  waktu: string;
  catatan?: string;
}

export async function simpanKerja(input: InputKerja): Promise<{ totalHariIni: number }> {
  if (simulasiGagal) return gagal();
  kerja.unshift({ id: idBaru('k'), ...input });
  return tunda({ totalHariIni: jumlahCatatanHariIni() });
}

export interface InputBelanja {
  barangId: string;
  nama: string;
  kategori: CatatanBelanja['kategori'];
  harga: number;
  waktu: string;
  catatan?: string;
}

export async function simpanBelanja(input: InputBelanja): Promise<{ totalHariIni: number }> {
  if (simulasiGagal) return gagal();
  belanja.unshift({ id: idBaru('bl'), ...input });
  return tunda({ totalHariIni: jumlahCatatanHariIni() });
}

export interface InputPemasukan {
  nominal: number;
  tanggal: string;
  keterangan?: string;
}

export async function simpanPemasukan(input: InputPemasukan): Promise<{ totalHariIni: number }> {
  if (simulasiGagal) return gagal();
  pemasukan.unshift({ id: idBaru('pm'), ...input });
  return tunda({ totalHariIni: jumlahCatatanHariIni() });
}

function gagal(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Gagal menyimpan ke Dr. Greenhouse')), 200),
  );
}

// --- Fase B: Jadwal ---

export async function ambilJadwal(): Promise<JadwalPetani> {
  return tunda({
    fase: { nama: 'Masa Panen', hariKe: 106, totalHari: 170, sampai: '31 Des' },
    items: [
      { id: 'j-1', jenis: 'penyemprotan', judul: 'Semprot obat', waktuLabel: 'Kemarin · Lewat 1 hari', status: 'terlambat', bolehCatat: true },
      { id: 'j-2', jenis: 'panen', judul: 'Panen', waktuLabel: 'Hari ini', status: 'hari-ini', bolehCatat: true },
      { id: 'j-3', jenis: 'pemupukan', judul: 'Pupuk KNO₃', waktuLabel: 'Besok, Rabu 4 Nov', status: 'besok', bolehCatat: false },
      { id: 'j-4', jenis: 'pemangkasan', judul: 'Pangkas daun bawah', waktuLabel: 'Jumat, 6 Nov', status: 'mendatang', bolehCatat: false },
    ],
  });
}

// --- Fase B: Cuaca ---

export async function ambilCuaca(): Promise<CuacaHarian> {
  const awsWaktu = '2026-11-03T07:30:00+07:00';
  const selisihJam = (new Date(HARI_INI).getTime() - new Date(awsWaktu).getTime()) / 3_600_000;
  return tunda({
    tanggal: HARI_INI,
    ringkasan: 'Siang nanti hujan',
    detail: 'Hujan ringan, mulai sekitar jam 12',
    saran: {
      judul: 'Semprot obat pagi ini saja',
      teks: 'Selesaikan sebelum jam 11 supaya obat tidak luntur kena hujan.',
    },
    suhu: 18,
    kelembapan: 88,
    curahHujan: 0,
    awsWaktu,
    awsLama: selisihJam > 3,
    besok: { hari: 'Besok, Rabu', ringkasan: 'Cerah, bagus untuk pupuk', suhuMin: 17, suhuMaks: 25 },
  });
}

// --- Fase B: Riwayat (dikelompokkan per hari) ---

function labelHari(tanggal: string): string {
  if (tanggal === tanggalHariIni) return 'Hari ini';
  const kemarin = new Date(HARI_INI);
  kemarin.setDate(kemarin.getDate() - 1);
  if (tanggal === kemarin.toISOString().slice(0, 10)) return 'Kemarin';
  return tanggalKoma(tanggal);
}

function kelompokkan<T extends { waktu?: string; tanggal?: string }>(arr: T[]): KelompokHari<T>[] {
  const peta = new Map<string, T[]>();
  for (const x of arr) {
    const t = tanggalDari(x.waktu ?? x.tanggal ?? '');
    if (!peta.has(t)) peta.set(t, []);
    peta.get(t)!.push(x);
  }
  return [...peta.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1)) // terbaru dulu
    .map(([tanggal, items]) => ({ tanggal, label: labelHari(tanggal), items }));
}

export async function riwayatKerja(): Promise<KelompokHari<CatatanKerja>[]> {
  return tunda(kelompokkan(kerja));
}
export async function riwayatBelanja(): Promise<KelompokHari<CatatanBelanja>[]> {
  return tunda(kelompokkan(belanja));
}
export async function riwayatPemasukan(): Promise<KelompokHari<CatatanPemasukan>[]> {
  return tunda(kelompokkan(pemasukan));
}
