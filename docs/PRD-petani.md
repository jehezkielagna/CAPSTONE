# PRD Sementara: Website Petani Dr. Greenhouse Pendamping

| | |
|---|---|
| Versi | 0.1 (draf sementara) |
| Tanggal | 22 Nov 2026 |
| Status | **Belum divalidasi.** Menunggu wawancara petani (23 Nov 2026). |
| Pengguna | Petani yang menanam langsung di greenhouse (contoh: Pak Jaka GH-01, Pak Indra GH-02, Pak Ari GH-03) |
| Pendamping | [PRD manajemen](PRD.md) (dasbor manajemen dipegang Pak Ferry) |

> Dokumen ini hanya untuk sisi petani. Dasbor manajemen, rekap P&L untuk seluruh petani, dan pengelolaan jadwal ada di PRD.md. Bagian bertanda *[validasi]* belum boleh dipakai sebagai klaim di proposal.

## 1. Tujuan

Membantu petani mencatat pekerjaan, belanja, dan pemasukan miliknya sendiri dengan cepat, serta melihat jadwal dan cuaca ringkas tanpa harus membuka banyak menu.

Yang **tidak** diklaim sebelum wawancara: bahwa petani kesulitan karena literasi digital rendah, bahwa petani tidak percaya sistem, dan bahwa temuan UT menghambat adopsi. Alasan desain yang dipakai sekarang adalah temuan UT 29 Sep 2026 (form sulit diisi di HP, fitur tersembunyi, petani lupa mencatat), dan itu pun masih perlu dikonfirmasi lewat wawancara.

## 2. Pengguna dan konteks

- Bekerja di greenhouse, sering memakai HP dengan satu tangan dan kadang di luar ruangan dengan sinar matahari terang.
- Mencatat kegiatan kerja, belanja (pupuk, obat, tenaga kerja/HOK), dan pemasukan dari panen.
- Data keuangan dan aktivitas hanya terlihat oleh petani itu sendiri.

Asumsi yang belum divalidasi: kemampuan memakai HP (A1), alasan petani lupa mencatat (A2), dan siapa yang mencatat pemasukan panen (A3). Lihat bagian 8.

## 3. Lingkup layar (sesuai mockup P01–P13)

Prioritas: **P0** wajib, **P1** penting, **P2** ditunda.

| # | Layar | Mockup | Prioritas | Catatan |
|---|---|---|---|---|
| L1 | Panduan awal (3 langkah) | P01a–c | P1 | Bisa dilewati dan dibuka lagi dari Bantuan. Efektivitasnya belum terbukti. |
| L2 | Beranda | P02 | P0 | Tiga tombol besar: Catat Kerja, Catat Belanja, Catat Pemasukan. Pengingat jika belum mencatat hari ini. |
| L3 | Catat Kerja (2 langkah) | P03–P05 | P0 | Pilih kegiatan (ikon), lalu isi jumlah. Pilihan "Hari ini" dan "Kemarin". |
| L4 | Catat Belanja (2 langkah) | P06–P08 | P0 | Pilih barang per kategori (pupuk, obat, HOK, lainnya), lalu isi harga. Ada validasi dan kondisi gagal simpan. |
| L5 | Catat Pemasukan | P12–P13 | P0 | Isi nominal, tanggal, dan keterangan. Tampilkan sisa bulan ini. Asal pemasukan perlu dikonfirmasi (A3). |
| L6 | Jadwal | P09 | P1 | Hanya melihat. Fase, tanggal target, dan sisa hari. Penanda terlambat. |
| L7 | Cuaca ringkas | P10 | P1 | Prakiraan BMKG dan pengamatan AWS, masing-masing berlabel sumber dan waktu. Bahasa sederhana. |
| L8 | Riwayat | P11a–c | P1 | Tab Kerja, Belanja, Pemasukan. Dikelompokkan per hari, tanpa filter. |
| L9 | Bantuan | P01 | P1 | Penjelasan istilah dan ikon. Bisa membuka panduan awal lagi. |
| L10 | Kondisi antarmuka | K01 | P0 | Loading, kosong, gagal simpan, data cuaca lama, dan akses ditolak. |

Di luar lingkup petani: asisten AI (P2, petani tidak membutuhkan), penilaian grade (diisi Agrotani saat penimbangan), dan pengelolaan jadwal.

## 4. Kebutuhan fungsional

### Pencatatan
- F1. Setiap catatan selesai dalam dua langkah atau kurang.
- F2. Tanggal default hari ini. Pilihan "Kemarin" tersedia untuk catatan yang terlewat, dan tidak ada tanggal bebas di langkah pertama.
- F3. Setelah tersimpan, tampilkan konfirmasi dan ringkasan singkat (contoh: "Tersimpan. Hari ini 2 catatan.").
- F4. Jika penyimpanan gagal, isian tetap ada dan tombol "Coba lagi" tersedia. Catatan tidak hilang saat koneksi lemah.
- F5. Validasi: jumlah dan harga wajib diisi dan harus angka positif, dengan pesan yang jelas di bawah kolom.
- F6. Petani bisa mengubah catatan miliknya sendiri dalam 24 jam setelah tersimpan *[validasi: batas waktu]*.

### Keuangan milik petani
- F7. Label kepemilikan selalu terlihat, contoh: "Data milik: Pak Jaka · GH-01".
- F8. Ringkasan bulan berjalan: pemasukan, pengeluaran, dan selisih dalam Rupiah.
- F9. Daftar transaksi dikelompokkan per hari dan dibedakan per kategori.

### Jadwal dan cuaca
- F10. Jadwal menampilkan fase, tanggal target, dan sisa hari. Kegiatan lewat target diberi tanda.
- F11. Cuaca menampilkan dua sumber terpisah. Jika data lebih dari 3 jam lama, tampilkan peringatan "Data terakhir 3 jam lalu".
- F12. Jangan menyebut data AWS sebagai kondisi di dalam greenhouse. Tulis lokasi pemasangan.

### Pengingat
- F13. Jika belum ada catatan hari ini, tampilkan kartu pengingat di beranda. Kanal pengingat (aplikasi atau WA) belum diputuskan *[validasi]*.

## 5. Kebutuhan antarmuka (ponsel)
- Lebar rancangan 390 px. Tidak ada scroll horizontal.
- Navigasi bawah: Beranda, Riwayat, Bantuan. Jadwal dan Cuaca diakses dari beranda *[validasi: apakah menu lima item lebih mudah]*.
- Target sentuh minimal 48 px. Teks minimal 16 px.
- Ikon selalu disertai label teks.
- Form bisa diisi penuh dalam posisi portrait. Tidak ada panel geser atau menu yang tidak bisa ditutup.
- Status dibedakan lewat teks, ikon, dan warna sekaligus.
- Format Rupiah, satuan (kg, liter, °C, %, mm), dan tanggal Indonesia dalam WIB.
- Bahasa Indonesia sederhana. Istilah teknis dihindari atau dijelaskan.

## 6. Hak akses
- Petani hanya bisa menambah, mengubah (sesuai F6), dan melihat data miliknya.
- Petani tidak bisa melihat data petani lain. Jika mencoba membuka data itu, tampilkan halaman "Akses ditolak" (K01).
- Petani hanya bisa melihat jadwal, tidak mengubahnya.

## 7. Data dan integrasi *[validasi]*
- Catatan petani disimpan melalui API Dr. Greenhouse *[validasi: apakah API mendukung tulis dari aplikasi pendamping]*.
- Cuaca dari API BMKG (prakiraan kecamatan) dan data AWS Agrotani *[validasi: akses dan frekuensi data]*.
- Saat ini semua data masih contoh di `src/data/mock.ts`. Pintu masuk data ada di `src/data/api.ts`.

## 8. Asumsi yang harus divalidasi

| ID | Asumsi | Cara validasi | Status |
|---|---|---|---|
| A1 | Petani bisa memakai HP untuk mencatat jika formnya sederhana (2 langkah, tombol besar). Dasarnya temuan UT, bukan literasi rendah. | Wawancara: rutinitas HP dan aplikasi yang sering dipakai | Belum |
| A2 | Petani lupa mencatat karena alur sulit dan tidak ada pengingat, bukan karena tidak melihat manfaatnya. | Wawancara: "terakhir kali lupa mencatat" | Belum |
| A3 | Pemasukan panen dicatat oleh Agrotani dan petani hanya mengonfirmasi. | Wawancara: siapa menerima dan mencatat uang panen | Belum |
| A4 | Petani mau melihat keuangannya sendiri, tetapi tidak mau dilihat petani lain. | Wawancara: keberatan data dilihat orang lain | Belum |
| A5 | Jadwal cukup dilihat petani. Penyusunan jadwal dilakukan manajemen. | Wawancara: dari mana jadwal diketahui sekarang | Belum |
| A6 | Cuaca dipakai untuk keputusan kerja harian (siram, semprot, panen). | Wawancara: keputusan apa yang berubah karena cuaca | Belum |
| A7 | Asisten AI tidak dibutuhkan petani. | Wawancara: pernah butuh bertanya ke aplikasi? | Sebagian |

## 9. Pertanyaan terbuka
1. Apakah petani mencatat di buku, WA, atau HP sekarang? Apa yang sebenarnya perlu dicatat setiap hari?
2. Kanal pengingat: aplikasi, WA, atau keduanya?
3. Apakah API Dr. Greenhouse mendukung catatan dari aplikasi ini, atau hanya membaca data?
4. Apakah petani perlu mengedit catatan lama? Berapa lama batasnya?
5. Apakah ada petani yang menggunakan pembayaran selain tunai atau transfer?

## 10. Rencana
1. Wawancara petani (23 Nov 2026), dengan panduan di `docs/analisis-fitur-dan-wawancara.md`.
2. Perbarui asumsi A1–A7 dan lingkup layar L1–L10.
3. Validasi ulang prototipe P01–P13 dengan 2–3 petani lewat observasi langsung.
4. Implementasi layar P0 dulu (L2–L5, L10), baru P1.
