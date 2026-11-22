# Panduan impor mockup Dr. Greenhouse ke Figma

Isi paket:
- `Semua-Layar-Kanvas.html` dan `Semua-Layar-Kanvas.png`: semua 26 layar dalam satu kanvas, disusun sama persis seperti di mockup (lebar 5250 px).
- `html/`: satu file HTML untuk setiap layar (26 file).
- `png/`: gambar 2x untuk setiap layar (26 file).

Hasil export sudah dicek per piksel dan hasilnya identik dengan mockup.

## Cara A: layer yang bisa diedit (disarankan)
1. Buka Figma, lalu buat Design file baru.
2. Pasang plugin **html.to.design** lewat menu Plugins, lalu pilih Find more plugins.
3. Jalankan plugin itu, lalu pilih opsi impor dari file atau kode HTML.
4. Untuk mengimpor semua layar sekaligus dalam satu kanvas, pilih `Semua-Layar-Kanvas.html`. Kalau ingin satu frame per layar, pilih file dari folder `html/`.
5. Atur lebar viewport sesuai file yang diimpor:
   - 5250 untuk file kanvas;
   - 390 untuk layar petani (P..) dan M07;
   - 1440 untuk M01–M06 dan K01.
6. Mockup memakai font Inter, yang sudah tersedia di Figma. Kalau teks terlihat bergeser, pastikan font Inter aktif.

## Cara B: gambar persis (tidak bisa diedit)
Seret semua file di folder `png/` ke Figma. Gambar dibuat dengan ukuran 2x, jadi perkecil menjadi 50%: 390×844 untuk layar petani dan lebar 1440 px untuk layar desktop.
