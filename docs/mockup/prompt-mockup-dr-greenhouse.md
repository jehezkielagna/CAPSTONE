Buat mockup high-fidelity aplikasi web responsif bernama "Dr. Greenhouse Pendamping", yaitu sistem pendamping untuk Dr. Greenhouse yang digunakan Asosiasi Tomat Beef Agrotani, Desa Cibodas, Lembang.

KONTEKS PRODUK
Dr. Greenhouse adalah Decision Support System buatan vendor yang tetap menjadi sistem utama. Aplikasi ini tidak menggantikannya, tetapi menyediakan antarmuka baru yang lebih mudah dipakai dan mengambil data operasional melalui API Dr. Greenhouse, data prakiraan cuaca BMKG, dan data pengamatan AWS (Automatic Weather Station) Agrotani.

Masalah yang harus terjawab oleh desain (dari usability testing 29 September 2026, hanya 53,8% tugas selesai mandiri):
- Form tidak terlihat atau hanya bisa diisi saat layar landscape di HP.
- Fitur tersembunyi di panel geser dan ikon (i) yang tidak dipahami.
- Jadwal tanam sulit dibaca dan tanggal target tidak terlihat.
- Filter dan laporan sulit ditemukan.
- Data keuangan antarpetani tercampur sehingga tidak dipercaya.
- Petani belum terbiasa mencatat aktivitas setiap hari.

Ada dua peran pengguna:
1. Petani (contoh: Pak Jaka). Literasi digital dasar, memakai HP di dalam greenhouse, sering dengan satu tangan. Tugas utama: mencatat aktivitas, mencatat keuangan miliknya, melihat jadwal tanam, membaca cuaca secara ringkas.
2. Manajemen (contoh: Pak Ferry). Memantau seluruh petani, mengelola jadwal tanam, melihat rekap keuangan (profit & loss), membaca tren macroclimate, dan memakai asisten AI.

Gunakan Bahasa Indonesia sederhana untuk seluruh teks antarmuka, hindari istilah teknis, atau sertakan penjelasannya.

ARAH VISUAL
- Gaya modern, bersih, ramah, dan terasa "lapangan", bukan dasbor teknis.
- Latar abu-abu kehijauan sangat terang, kartu putih, warna utama hijau daun, aksen merah tomat untuk tindakan penting, kuning untuk peringatan.
- Tipografi Inter, ukuran teks minimal 16 px di mobile, kontras tinggi agar terbaca di bawah sinar matahari.
- Ikon outline yang konsisten dan selalu disertai label teks; jangan memakai ikon tanpa label.
- Target sentuh minimal 48 px, tombol utama mudah dijangkau ibu jari.
- Status dibedakan melalui teks, ikon, dan warna.
- Seluruh form harus bisa diisi penuh dalam posisi portrait. Jangan memakai panel geser tersembunyi atau menu yang tidak bisa ditutup.
- Format Rupiah, satuan (kg, °C, %, mm), dan tanggal Indonesia, misalnya "Sel, 3 Nov 2026 · 07.30 WIB".
- Ukuran: mobile 390 px sebagai rancangan utama, desktop 1440 px untuk Manajemen.
- Gunakan data contoh realistis dan konsisten di seluruh layar: komoditas tomat beef, greenhouse "GH-01 (Pak Jaka)", "GH-02 (Pak Indra)", "GH-03 (Pak Ari)", lokasi Cibodas, Lembang.

NAVIGASI
Petani (mobile): navigasi bawah berisi Beranda, Aktivitas, Keuangan, Jadwal, Cuaca. Tombol utama "+ Catat" selalu terlihat dan membuka pilihan "Catat Aktivitas" atau "Catat Keuangan".
Manajemen (desktop): sidebar berisi Dasbor, Log Aktivitas, Keuangan, Jadwal Tanam, Macroclimate. Topbar berisi filter greenhouse/petani, pengingat, profil, dan tombol "Tanya Asisten AI". Pada mobile, Manajemen memakai navigasi bawah yang sama polanya dengan Petani.
Setiap halaman memiliki tombol "Bantuan" berlabel yang membuka penjelasan istilah dan ikon di halaman tersebut.

LAYAR 1 — PANDUAN AWAL (ONBOARDING) PETANI
- 3 sampai 4 langkah singkat dengan ilustrasi: cara mencatat aktivitas, mencatat keuangan, membaca jadwal, membaca cuaca.
- Tombol "Lewati" dan "Lanjut", indikator langkah.
- Setelah selesai, tampilkan sorotan (coach mark) pada tombol "+ Catat".
- Panduan bisa dibuka lagi dari menu Bantuan.

LAYAR 2 — BERANDA PETANI (mobile)
- Sapaan dan tanggal hari ini.
- Kartu pengingat pencatatan, misalnya "Hari ini belum ada aktivitas tercatat" dengan tombol "Catat Sekarang".
- Kegiatan jadwal tanam hari ini dan berikutnya, dengan tanggal target yang jelas.
- Cuaca ringkas: prakiraan BMKG dan pengamatan AWS terakhir, masing-masing dengan label sumber dan waktu.
- Ringkasan keuangan milik sendiri bulan ini: pemasukan, pengeluaran, selisih.
- Aktivitas terakhir yang dicatat.

LAYAR 3 — LOG AKTIVITAS
Petani:
- Daftar aktivitas milik sendiri dikelompokkan per tanggal (penyiraman, pemupukan, penyemprotan, pemangkasan, panen, lainnya), dengan ikon dan label.
- Form "Catat Aktivitas" maksimal satu layar: jenis aktivitas (pilihan bergambar), tanggal dan jam (default sekarang), greenhouse (default milik sendiri), jumlah dan satuan bila relevan (misal pupuk 5 kg, panen 42 kg), catatan opsional, foto opsional.
- Petani bisa mengubah catatan miliknya.
Manajemen:
- Tabel semua aktivitas di desktop, kartu di mobile.
- Filter petani/greenhouse, jenis aktivitas, rentang tanggal; pencarian.
- Penanda petani yang belum mencatat selama beberapa hari.

LAYAR 4 — MANAJEMEN KEUANGAN
Petani:
- Label kepemilikan yang jelas, misalnya "Data milik: Pak Jaka · GH-01". Petani hanya melihat datanya sendiri.
- Ringkasan per periode (mingguan, bulanan): pemasukan, pengeluaran, selisih.
- Daftar transaksi dengan kategori (penjualan panen, pupuk, pestisida, bibit, tenaga kerja, lainnya).
- Form "Catat Keuangan": jenis (Pemasukan/Pengeluaran sebagai tombol besar), kategori, nominal Rupiah, tanggal, jumlah dan satuan opsional (misal 42 kg × Rp 32.000), catatan. Semua kolom terlihat dalam posisi portrait.
Manajemen:
- Rekap Profit & Loss per periode dan per petani/greenhouse.
- Grafik pemasukan dan pengeluaran per bulan.
- Tabel transaksi dengan kolom pemilik data, dapat difilter dan ditelusuri ke transaksi asal.
- Kondisi tanpa data "Belum ada transaksi pada periode ini". Bedakan data yang belum tersedia dari nilai nol.

LAYAR 5 — JADWAL TANAM
Petani (lihat saja):
- Tampilan daftar/timeline per siklus tanam, bukan grafik rumit: fase (semai, pindah tanam, vegetatif, berbunga, panen), tanggal mulai, tanggal target, dan sisa hari.
- Penanda hari ini dan kegiatan yang terlambat dari tanggal target.
Manajemen:
- Tampilan kalender dan daftar per greenhouse.
- Tambah/ubah jadwal dengan form: greenhouse, varietas, tanggal tanam, fase dan tanggal target.

LAYAR 6 — MONITORING MACROCLIMATE
- Pisahkan dengan jelas "Prakiraan cuaca (BMKG)" dan "Pengamatan lokasi (AWS Agrotani)". Setiap angka menampilkan sumber, satuan, lokasi, dan waktu data.
- Parameter: suhu, kelembapan, curah hujan, kondisi cuaca (sesuaikan dengan data yang tersedia).
- Petani: kartu ringkas dengan bahasa mudah, misalnya "Siang ini panas, 29°C".
- Manajemen: grafik tren harian/mingguan, perbandingan prakiraan BMKG dan pengamatan AWS pada parameter dan periode yang sama.
- Kondisi data belum diperbarui: tampilkan "Data terakhir 3 jam lalu" dengan penanda peringatan agar tidak dianggap kondisi terkini.
- Jangan menyatakan data AWS sebagai kondisi di dalam greenhouse kecuali diberi keterangan lokasi pemasangan.

LAYAR 7 — DASBOR MANAJEMEN (desktop dan mobile)
- Ringkasan: jumlah aktivitas tercatat minggu ini, petani yang belum mencatat, total pemasukan dan pengeluaran bulan ini, kegiatan jadwal yang mendekati tanggal target.
- Grafik keuangan per bulan dengan pilihan periode.
- Ringkasan macroclimate hari ini dengan sumber dan waktu.
- Aktivitas terbaru seluruh petani.
- Tombol "Tanya Asisten AI".

LAYAR 8 — ASISTEN AI (khusus Manajemen)
- Panel chat di sisi kanan desktop, layar penuh di mobile.
- Saran pertanyaan, misalnya "Ringkas kondisi cuaca minggu ini" atau "Bandingkan prakiraan BMKG dengan pengamatan AWS kemarin".
- Jawaban menyebut sumber dan waktu data, membedakan prakiraan dan pengamatan, dan bisa menampilkan grafik kecil.
- Keterangan tetap: "Asisten membantu menjelaskan data. Keputusan tetap di tangan Anda."
- Contoh jawaban ketika data tidak tersedia atau tidak memadai.
- Asisten tidak menjalankan tindakan apa pun di sistem.

KONDISI ANTARMUKA
Sertakan contoh: loading (skeleton), data kosong, validasi isian wajib, penyimpanan berhasil, penyimpanan gagal dengan isian tetap tersimpan dan tombol coba lagi, koneksi lemah atau API Dr. Greenhouse tidak dapat dihubungi, data cuaca belum diperbarui, dan akses ditolak ketika Petani membuka data milik petani lain.

BATASAN DESAIN
- Fokus pada empat alur: Log Aktivitas, Manajemen Keuangan, Jadwal Tanam, dan Monitoring Macroclimate, ditambah panduan adopsi dan Asisten AI untuk Manajemen.
- Hak akses mengikuti matriks: Petani tambah/ubah/lihat data milik sendiri dan hanya melihat jadwal; Manajemen melihat semua, mengelola jadwal, dan memakai Asisten AI. Petani tidak memiliki akses ke Asisten AI.
- Jangan menambahkan halaman Superadmin, manajemen model prediksi, pelatihan model, kontrol perangkat irigasi/IoT, marketplace, payment gateway, atau pengambilan keputusan otomatis.
- Mockup harus memperlihatkan alur yang saling terhubung dan data yang konsisten antarlayar.

HASIL YANG DIHARAPKAN
Buat seluruh layar sebagai satu keluarga desain yang konsisten, termasuk variasi mobile dan desktop. Prioritaskan kejelasan Beranda Petani, form Catat Aktivitas, form Catat Keuangan, Jadwal Tanam, dan Dasbor Manajemen.
