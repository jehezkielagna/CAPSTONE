// Data contoh sisi petani (hari ini: Sel, 3 Nov 2026, sama dengan mockup).
// Catatan baru disimpan di penyimpanan dalam-memori pada api-petani.ts.

import type {
  BarangBelanja,
  CatatanBelanja,
  CatatanKerja,
  CatatanPemasukan,
  JenisKerjaOpsi,
  Petani,
} from './types-petani';

export const HARI_INI = '2026-11-03T08:10:00+07:00';

// Petani yang sedang masuk (prototipe). Petani hanya melihat datanya sendiri.
export const PETANI_AKTIF: Petani = { id: 'P-01', nama: 'Pak Jaka', greenhouse: 'GH-01' };

// Pilihan kegiatan untuk Catat Kerja (P03), dengan satuan dan pertanyaan.
export const KEGIATAN: JenisKerjaOpsi[] = [
  { jenis: 'penyiraman', label: 'Penyiraman', satuan: 'liter', langkah: 50, pertanyaan: 'Berapa liter airnya?' },
  { jenis: 'pemupukan', label: 'Pemupukan', satuan: 'kg', langkah: 1, pertanyaan: 'Berapa kg pupuknya?' },
  { jenis: 'penyemprotan', label: 'Penyemprotan', satuan: 'liter', langkah: 1, pertanyaan: 'Berapa liter larutannya?' },
  { jenis: 'pemangkasan', label: 'Pemangkasan', satuan: 'baris', langkah: 1, pertanyaan: 'Berapa baris dipangkas?' },
  { jenis: 'panen', label: 'Panen', satuan: 'kg', langkah: 1, pertanyaan: 'Berapa kg hasil panennya?' },
  { jenis: 'lainnya', label: 'Lainnya', satuan: 'kali', langkah: 1, pertanyaan: 'Berapa banyak?' },
];

// Daftar barang untuk Catat Belanja (P06), dikelompokkan per kategori.
export const BARANG: BarangBelanja[] = [
  { id: 'b-npk', nama: 'Pupuk NPK 16-16-16', kategori: 'pupuk', satuan: 'karung 25 kg' },
  { id: 'b-kno3', nama: 'Pupuk KNO₃', kategori: 'pupuk', satuan: 'karung 25 kg' },
  { id: 'b-kandang', nama: 'Pupuk kandang', kategori: 'pupuk', satuan: 'karung' },
  { id: 'b-fungisida', nama: 'Fungisida', kategori: 'obat', satuan: 'botol 250 ml' },
  { id: 'b-insektisida', nama: 'Insektisida', kategori: 'obat', satuan: 'botol 250 ml' },
  { id: 'b-perekat', nama: 'Perekat', kategori: 'obat', satuan: 'botol 100 ml' },
  { id: 'b-hok-harian', nama: 'Tenaga kerja harian (HOK)', kategori: 'hok', satuan: 'orang/hari' },
  { id: 'b-hok-borongan', nama: 'Tenaga kerja borongan', kategori: 'hok', satuan: 'borongan' },
  { id: 'b-tali', nama: 'Tali ajir', kategori: 'lainnya', satuan: 'roll' },
  { id: 'b-lainnya', nama: 'Lainnya', kategori: 'lainnya', satuan: 'satuan' },
];

// Riwayat awal (data contoh milik Pak Jaka). Catatan hari ini sengaja kosong
// supaya kartu pengingat "belum mencatat" tampil di beranda.
export const KERJA_AWAL: CatatanKerja[] = [
  { id: 'k-2', jenis: 'pemangkasan', label: 'Pemangkasan', jumlah: 1, satuan: 'baris', waktu: '2026-11-02T09:40:00+07:00' },
  { id: 'k-1', jenis: 'penyiraman', label: 'Penyiraman', jumlah: 400, satuan: 'liter', waktu: '2026-11-02T07:15:00+07:00' },
  { id: 'k-0', jenis: 'pemupukan', label: 'Pemupukan', jumlah: 5, satuan: 'kg', waktu: '2026-11-01T08:00:00+07:00', catatan: 'NPK' },
];

export const BELANJA_AWAL: CatatanBelanja[] = [
  { id: 'bl-1', barangId: 'b-npk', nama: 'Pupuk NPK 16-16-16', kategori: 'pupuk', harga: 335_000, waktu: '2026-11-01T10:00:00+07:00' },
  { id: 'bl-0', barangId: 'b-hok-harian', nama: 'Tenaga kerja harian (HOK)', kategori: 'hok', harga: 100_000, waktu: '2026-10-31T16:00:00+07:00' },
];

export const PEMASUKAN_AWAL: CatatanPemasukan[] = [
  { id: 'pm-0', nominal: 2_176_000, tanggal: '2026-11-01', keterangan: 'Panen tomat beef 136 kg' },
];
