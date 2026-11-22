# Analisis Fitur Sementara dan Panduan Wawancara

Status: **sementara**, disusun 22 Nov 2026 sebelum wawancara petani dan manajemen. Semua keputusan di sini bisa berubah setelah wawancara.

## 1. Ringkasan masukan dosen (18 Nov 2026)

| Masukan | Artinya bagi kita |
|---|---|
| Rumusan masalah masih "PoV tim" dan berbentuk solusi | Rumusan masalah harus menggambarkan masalah Agrotani, bukan fitur yang mau kita buat. |
| Hasil usability test (UT) belum cukup menjustifikasi solusi | UT hanya mengukur kemudahan pakai. Akar masalah perlu digali dengan wawancara/observasi. |
| "Literasi dasar" tidak ada buktinya | Literasi digital petani adalah **asumsi**. Harus divalidasi, atau berhenti diklaim. |
| "Tidak dapat dipercaya" tidak bisa diukur dengan 1 kali UT | Klaim trust/distrust dihapus, atau diganti dengan evaluasi yang tepat (misal wawancara, kuesioner trust, observasi berulang). |
| "Menghambat adopsi" adalah over-claim | Dr. Greenhouse masih di fase prototyping menuju **piloting** (field test ±1 tahun). Pivot itu wajar. Temuan UT = masukan perbaikan prototipe, bukan bukti kegagalan adopsi. |
| Perlu konteks proyek ADGSOM dan tata kelola IT Agrotani | Bab I/II perlu menjelaskan posisi Dr. Greenhouse di proyek ADGSOM, batasannya, dan siapa pemilik sistem/data. |
| Usulan poin 2, 3, 4 masuk akal; poin 1 (arsitektur integrasi) dipertanyakan | Poin 1 belum terjustifikasi oleh UT. Masalah superadmin "bukan masalah major" karena superadmin akan paham seiring waktu. |

## 2. Fitur: mana yang kemungkinan bertahan

Kriteria: (a) ada tugas nyata petani/manajemen di baliknya, (b) ada temuan UT yang mendukung, (c) sesuai fase piloting, (d) tidak bergantung pada klaim yang belum terbukti.

| Fitur | Perkiraan | Alasan | Yang harus dibuktikan di wawancara |
|---|---|---|---|
| **Log Aktivitas (Catat Kerja)** | Bertahan, inti | Pencatatan aktivitas adalah data dasar untuk jadwal, keuangan, dan evaluasi pilot. UT: petani lupa mencatat, form sulit diisi di HP. | Apakah petani memang mencatat hari ini (kertas/ingatan/WA)? Kenapa lupa? Siapa yang butuh datanya? |
| **Keuangan (Catat Belanja + Catat Pemasukan) dan Rekap P&L** | Bertahan, inti | UT: data keuangan antarpetani tercampur, kategori biaya kurang jelas, input banyak pengeluaran lambat. | Siapa yang sebenarnya mencatat uang? Pemasukan panen dicatat Agrotani atau petani? Kategori biaya yang dipakai sehari-hari? |
| **Jadwal Tanam** | Bertahan | UT: jadwal sulit dibaca, tanggal target tidak terlihat. Manajemen perlu memantau keterlambatan. | Siapa yang menyusun jadwal? Bagaimana jadwal sampai ke petani sekarang? Apa akibatnya kalau kegiatan terlambat? |
| **Monitoring Macroclimate (BMKG + AWS)** | Bertahan, tampilan ringkas | Data sudah ada (BMKG, AWS Agrotani). Murah untuk ditampilkan. | Keputusan apa yang diambil dari cuaca (siram, semprot, panen)? Petani lebih percaya AWS atau BMKG? |
| **Dasbor Manajemen** | Bertahan | Merangkum keempat fitur di atas untuk Pak Ferry. Ini yang dibangun lebih dulu. | Angka apa yang Pak Ferry lihat setiap hari/minggu? Laporan apa yang harus dibuat untuk ADGSOM/pengurus? |
| **Panduan awal + pengingat** | Bertahan, kecil | UT: fitur tersembunyi, petani lupa mencatat. | Kapan waktu yang cocok untuk pengingat? Lewat aplikasi atau WA? |
| **Asisten AI (chatbot)** | **Diturunkan prioritasnya** | Dari diskusi terakhir petani tidak membutuhkan. Tidak ada temuan UT yang mendukung. Biaya dan risiko (jawaban salah) tinggi. | Konfirmasi ke Pak Ferry: apakah ada pertanyaan berulang yang memang sulit dijawab dari dasbor? Kalau tidak, dihapus dari lingkup. |
| **Arsitektur integrasi / superadmin (poin 1)** | **Ditinjau ulang** | Dosen mempertanyakan justifikasinya. Superadmin bukan masalah major. | Siapa pemilik data dan sistem di Agrotani? Apakah tim boleh menyentuh integrasi, atau cukup membaca API Dr. Greenhouse? Apa batasan proyek ADGSOM? |

Catatan untuk aplikasi petani: tetap dibuat **sesederhana mungkin** (tombol besar, 2 langkah per catatan), tetapi alasannya ditulis sebagai "temuan UT: form dan navigasi sulit dipakai di HP", bukan "literasi petani rendah", sampai ada bukti.

## 3. Perbaikan arah rumusan masalah (draf)

Bentuk yang disarankan: *kondisi saat ini → dampak bagi Agrotani → kenapa penting di fase piloting*. Hindari menyebut fitur.

Contoh arah (harus disesuaikan dengan hasil wawancara):
1. Bagaimana kondisi pencatatan aktivitas, keuangan, dan jadwal tanam petani Agrotani saat ini selama fase piloting Dr. Greenhouse, dan informasi apa yang belum dapat diperoleh manajemen dari pencatatan tersebut?
2. Faktor apa saja yang membuat petani belum mencatat secara rutin dan mandiri melalui Dr. Greenhouse?
3. Kebutuhan informasi apa yang dimiliki manajemen untuk memantau dan mengevaluasi pelaksanaan pilot, dan bagaimana kebutuhan itu dapat dipenuhi sesuai tata kelola sistem dan data di Agrotani serta batasan proyek ADGSOM?

## 4. Panduan wawancara besok

Tips: tanyakan **cerita kejadian nyata** ("terakhir kali…"), bukan pendapat ("apakah Bapak suka fitur…"). Jangan tunjukkan mockup dulu sampai bagian akhir. Rekam (dengan izin) dan catat kutipan langsung.

### A. Petani (misal Pak Jaka)

**Rutinitas dan pencatatan**
1. Ceritakan kegiatan Bapak dari pagi sampai sore kemarin di greenhouse.
2. Apa saja yang Bapak catat? Di mana (buku, HP, WA, ingatan)? Kapan biasanya mencatat?
3. Terakhir kali Bapak lupa mencatat, apa yang terjadi? Apa akibatnya?
4. Siapa yang meminta atau memakai catatan itu? Untuk apa?

**Keuangan**
5. Bagaimana Bapak mengetahui untung atau rugi satu musim tanam?
6. Belanja apa saja yang paling sering? (pupuk, obat, HOK, bibit…) Biasanya dibeli sekaligus banyak atau satu-satu?
7. Uang hasil panen diterima dari siapa dan dicatat oleh siapa?
8. Apakah Bapak keberatan data keuangan Bapak dilihat manajemen atau petani lain? Kenapa?

**Jadwal dan cuaca**
9. Dari mana Bapak tahu kapan harus memupuk, menyemprot, atau panen?
10. Pernah terlambat dari jadwal? Kenapa, dan apa akibatnya?
11. Apakah Bapak melihat cuaca sebelum bekerja? Dari mana? Keputusan apa yang berubah karena cuaca?

**Pemakaian HP dan Dr. Greenhouse** (untuk menguji asumsi literasi, tanpa menghakimi)
12. Aplikasi apa saja yang Bapak pakai setiap hari di HP? (WA, YouTube, m-banking, dll.)
13. Bagian Dr. Greenhouse mana yang paling sering dibuka? Mana yang tidak pernah dibuka, dan kenapa?
14. Kalau bingung memakai aplikasi, Bapak biasanya bertanya ke siapa?
15. Apakah Bapak pernah butuh bertanya sesuatu ke aplikasi (seperti chatbot)? Pertanyaan apa? *(untuk konfirmasi bahwa chatbot memang tidak dibutuhkan)*

### B. Manajemen (Pak Ferry)

**Konteks proyek dan tata kelola**
1. Bagaimana posisi Dr. Greenhouse dalam proyek ADGSOM? Siapa pemilik sistem, siapa vendor, sampai kapan masa pilot?
2. Apa saja batasan proyek (anggaran, akses API, perubahan yang boleh dilakukan pihak luar)?
3. Siapa yang mengelola akun, hak akses, dan data di Agrotani sekarang? Pernah ada masalah dengan itu?
4. Sistem lain apa yang dipakai (AWS, BMKG, spreadsheet, WA grup)? Bagaimana data berpindah antar sistem?

**Kebutuhan informasi**
5. Ceritakan terakhir kali Bapak harus membuat laporan atau mengambil keputusan soal petani. Data apa yang dipakai, dan dari mana?
6. Informasi apa yang paling sulit atau paling lama didapat sekarang?
7. Angka apa yang ingin Bapak lihat setiap pagi atau setiap minggu? *(validasi isi KPI dasbor)*
8. Bagaimana Bapak tahu petani belum mencatat atau terlambat dari jadwal? Apa yang dilakukan setelah tahu?
9. Untuk keuangan: rekap per petani, per greenhouse, atau per siklus tanam yang paling berguna?
10. Bagaimana data cuaca BMKG dan AWS dipakai dalam keputusan?

**Validasi solusi (di akhir, sambil menunjukkan dasbor)**
11. Dari dasbor ini, mana yang langsung berguna, mana yang tidak perlu, mana yang kurang?
12. Apakah ada pertanyaan berulang yang tidak bisa dijawab dasbor, sehingga asisten AI masih perlu? Contohnya apa?
13. Bagaimana keberhasilan pilot akan diukur oleh Agrotani/ADGSOM? *(menjadi ukuran evaluasi yang tepat untuk Bab VI, bukan klaim adopsi)*

### C. Setelah wawancara
- Isi tabel di bagian 2 kolom "Perkiraan" dengan keputusan final dan kutipan pendukung.
- Perbarui `PRD.md` bagian Asumsi (A1–A8) menjadi *terbukti / terbantah / belum jelas*.
- Revisi rumusan masalah Bab I berdasarkan jawaban, bukan berdasarkan fitur.
