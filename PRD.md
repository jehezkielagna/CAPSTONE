# PRD Sementara: Dr. Greenhouse Pendamping

| | |
|---|---|
| Versi | 0.1 (draf sementara) |
| Tanggal | 22 Nov 2026 |
| Status | **Belum divalidasi.** Menunggu wawancara petani dan manajemen. |
| Tim | Capstone 2026, S1 Sistem Informasi (SAG, EDM, EISD) |
| Problem owner | Asosiasi Tomat Beef Agrotani, Desa Cibodas, Lembang |

> Dokumen ini sengaja memisahkan **fakta**, **asumsi**, dan **pertanyaan terbuka**. Bagian yang bertanda *[validasi]* tidak boleh dipakai sebagai klaim di proposal sebelum ada bukti dari wawancara.

## 1. Latar belakang

Dr. Greenhouse adalah Decision Support System buatan vendor yang dipakai Agrotani dalam proyek ADGSOM. Saat ini sistem berada di fase **prototyping menuju piloting**, dengan field test sekitar 1 tahun. Dalam fase ini perubahan dan pivot adalah hal yang wajar.

Tim tidak menggantikan Dr. Greenhouse. Tim mengusulkan antarmuka pendamping yang membaca data dari Dr. Greenhouse (dan BMKG serta AWS Agrotani) agar tugas inti lebih mudah dikerjakan selama pilot.

### Fakta yang sudah ada
- Usability test 29 Sep 2026: 65 tugas, 53,8% selesai mandiri, 35,4% dengan bantuan, 10,8% gagal. Skor kuesioner 3,82/5.
- Temuan UT: form sulit diisi di HP (portrait), fitur tersembunyi di panel geser dan ikon (i), jadwal sulit dibaca, filter dan laporan sulit ditemukan, data keuangan antarpetani tercampur, petani lupa mencatat, kategori belanja kurang jelas.

### Yang **tidak** diklaim (masukan dosen 18 Nov 2026)
- Tidak mengklaim literasi digital petani rendah.
- Tidak mengklaim petani tidak percaya (distrust) terhadap sistem.
- Tidak mengklaim temuan UT menghambat adopsi sistem.

## 2. Pernyataan masalah *[validasi]*

Draf, akan ditulis ulang setelah wawancara. Fokus pada kondisi Agrotani, bukan pada fitur:

> Selama fase piloting Dr. Greenhouse, pencatatan aktivitas, keuangan, dan jadwal tanam oleh petani belum berjalan rutin dan mandiri, sehingga manajemen Agrotani belum mendapatkan informasi yang dibutuhkan untuk memantau dan mengevaluasi pelaksanaan pilot.

Penyebabnya belum diketahui pasti. Kandidat penyebab yang akan diuji: kesulitan antarmuka (didukung UT), kebiasaan mencatat di luar sistem, tidak adanya manfaat langsung bagi petani, dan ketidakjelasan siapa yang bertanggung jawab atas data.

## 3. Tujuan dan ukuran keberhasilan

| Tujuan | Ukuran awal (target diisi setelah wawancara) |
|---|---|
| Petani dapat mencatat aktivitas dan keuangan secara mandiri | % tugas selesai mandiri pada UT ulang (baseline 53,8%) |
| Pencatatan berjalan rutin | Jumlah hari dengan catatan per petani per minggu selama pilot |
| Manajemen dapat memantau pilot tanpa merekap manual | Waktu yang dibutuhkan Pak Ferry untuk menjawab pertanyaan rutin (dibandingkan sebelum) |
| Data keuangan terpisah per pemilik | Tidak ada transaksi tanpa pemilik; petani hanya melihat datanya sendiri |

Ukuran "adopsi" dan "trust" tidak dipakai kecuali Agrotani/ADGSOM sudah punya ukurannya sendiri *[validasi: pertanyaan B13]*.

## 4. Pengguna

| Peran | Contoh | Perangkat | Catatan |
|---|---|---|---|
| Petani | Pak Jaka (GH-01), Pak Indra (GH-02), Pak Ari (GH-03) | HP, sering satu tangan di greenhouse | Kemampuan memakai HP *[validasi: A1]* |
| Manajemen | Pak Ferry | Desktop, kadang HP | Memantau semua petani, mengelola jadwal, membuat laporan |
| Superadmin | belum jelas | | Bukan masalah utama menurut dosen; tidak dirancang dulu |

## 5. Lingkup fitur dan prioritas (sementara)

Prioritas: **P0** wajib untuk pilot, **P1** penting, **P2** ditunda.

| # | Fitur | Peran | Prioritas | Status |
|---|---|---|---|---|
| F1 | Dasbor Manajemen | Manajemen | P0 | **Dibangun** (sesuai mockup M01/M07, data contoh) |
| F2 | Log Aktivitas (Catat Kerja, riwayat, pemantauan) | Petani, Manajemen | P0 | Mockup ada, implementasi menunggu wawancara |
| F3 | Keuangan (Catat Belanja, Catat Pemasukan, Rekap P&L) | Petani, Manajemen | P0 | Mockup ada, kategori dan pemilik pemasukan *[validasi]* |
| F4 | Jadwal Tanam (lihat untuk petani, kelola untuk manajemen) | Petani, Manajemen | P1 | Mockup ada |
| F5 | Monitoring Macroclimate (BMKG vs AWS) | Petani (ringkas), Manajemen | P1 | Mockup ada |
| F6 | Panduan awal dan pengingat mencatat | Petani | P1 | Mockup ada, kanal pengingat *[validasi]* |
| F7 | Asisten AI (chatbot) | Manajemen | **P2, ditunda** | Petani tidak membutuhkan. Tombol di dasbor bisa dimatikan lewat `src/config.ts`. |
| F8 | Arsitektur integrasi / pengelolaan peran (superadmin) | | **Ditinjau ulang** | Justifikasi dipertanyakan dosen |

### Di luar lingkup
Kontrol irigasi/IoT, model prediksi, marketplace, payment gateway, keputusan otomatis, penggantian Dr. Greenhouse.

## 6. Kebutuhan fungsional

### F1 Dasbor Manajemen (sudah dibangun)
- F1.1 Empat ringkasan: aktivitas tercatat 7 hari (per greenhouse), petani yang belum mencatat (dengan tanggal terakhir), selisih keuangan bulan berjalan (masuk dan keluar), kegiatan jadwal yang mendekati target (jumlah terlambat).
- F1.2 Grafik pemasukan dan pengeluaran per bulan, 6 bulan terakhir, bulan berjalan diberi keterangan rentang tanggal.
- F1.3 Macroclimate hari ini: prakiraan BMKG dan pengamatan AWS dipisah, masing-masing dengan sumber, lokasi, dan waktu data.
- F1.4 Lima aktivitas terbaru seluruh petani.
- F1.5 Daftar kegiatan jadwal yang terlambat, hari ini, dan besok.
- F1.6 Filter greenhouse di topbar dan daftar pengingat.
- F1.7 Di ponsel: navigasi bawah, urutan ringkasan → keuangan → jadwal → cuaca.

### F2–F6 (garis besar, rinci setelah wawancara)
- Petani hanya menambah, mengubah, dan melihat data miliknya sendiri; jadwal hanya bisa dilihat.
- Manajemen melihat semua data dan mengelola jadwal.
- Setiap pencatatan petani selesai dalam 2 langkah (pilih kegiatan/barang, isi jumlah/harga) dengan pilihan "Hari ini" dan "Kemarin".
- Form bisa diisi penuh dalam posisi portrait; tidak ada panel geser tersembunyi.
- Data yang belum tersedia dibedakan dari nilai nol. Data cuaca lama diberi peringatan.

## 7. Kebutuhan non-fungsional
- Bahasa Indonesia sederhana, ikon selalu berlabel, target sentuh minimal 44–48 px, teks minimal 16 px di HP petani.
- Format Rupiah, satuan, dan tanggal Indonesia dalam WIB.
- Tetap bisa dipakai saat koneksi lemah (penyimpanan gagal tidak menghapus isian).
- Hak akses berbasis peran; data keuangan per pemilik.

## 8. Data dan integrasi *[validasi]*

| Sumber | Data | Cara akses | Pemilik |
|---|---|---|---|
| Dr. Greenhouse | aktivitas, keuangan, jadwal, greenhouse, petani | API vendor *[validasi: akses dan batasan]* | Vendor / Agrotani *[validasi]* |
| BMKG | prakiraan cuaca Kec. Lembang | API publik BMKG | BMKG |
| AWS Agrotani | suhu, kelembapan, curah hujan, lokasi pemasangan | *[validasi]* | Agrotani |

Di repositori ini semua data masih data contoh (`src/data/mock.ts`). Satu pintu masuk data ada di `src/data/api.ts` agar mudah diganti.

## 9. Asumsi yang harus divalidasi

| ID | Asumsi | Cara validasi | Status |
|---|---|---|---|
| A1 | Petani lebih mudah memakai antarmuka sederhana (tombol besar, 2 langkah). Alasannya temuan UT, bukan literasi rendah. | Wawancara A12–A14, UT ulang | Belum |
| A2 | Petani belum mencatat rutin karena lupa dan form sulit, bukan karena tidak ada manfaat bagi mereka. | Wawancara A1–A4 | Belum |
| A3 | Pemasukan panen dibayarkan dan dicatat oleh Agrotani, sehingga petani hanya mengonfirmasi. | Wawancara A7, B9 | Belum |
| A4 | Manajemen membutuhkan ringkasan di dasbor (4 KPI yang dibangun). | Wawancara B5–B8, B11 | Belum |
| A5 | Asisten AI tidak dibutuhkan, baik oleh petani maupun manajemen. | Wawancara A15, B12 | Sebagian (petani) |
| A6 | Tim cukup membaca API Dr. Greenhouse dan tidak perlu mengubah arsitektur integrasi. | Wawancara B1–B4 | Belum |
| A7 | Data cuaca dipakai dalam keputusan harian (siram, semprot, panen). | Wawancara A11, B10 | Belum |
| A8 | Petani mau data keuangannya dilihat manajemen. | Wawancara A8 | Belum |

## 10. Pertanyaan terbuka
1. Apa konteks dan batasan proyek ADGSOM? Siapa pemilik sistem dan data?
2. Bagaimana tata kelola sistem IT di Agrotani (akun, hak akses, data)?
3. Bagaimana keberhasilan pilot diukur oleh Agrotani/ADGSOM?
4. Apakah poin 1 (arsitektur integrasi) tetap masuk lingkup? Kalau ya, apa justifikasinya selain UT?
5. Artefak SAG dan EDM apa yang diharapkan (arsitektur, model data, tata kelola data) sesuai lingkup yang baru?

## 11. Rencana
1. Wawancara petani dan manajemen (23 Nov 2026), panduan di `docs/analisis-fitur-dan-wawancara.md`.
2. Perbarui asumsi A1–A8 dan prioritas fitur.
3. Revisi rumusan masalah Bab I.
4. Lanjut implementasi F2–F6 sesuai hasil.
5. Validasi prototipe dengan petani dan Pak Ferry (Bab VI.1).
