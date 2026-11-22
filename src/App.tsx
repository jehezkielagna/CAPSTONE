import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Layout, type Pengingat } from './components/Layout';
import { Dasbor } from './pages/Dasbor';
import { Stub } from './pages/Stub';
import { PetaniApp } from './petani/PetaniApp';
import { ambilDataDasbor, saringPerGreenhouse } from './data/api';
import { jam, tanggalKoma, tanggalPanjang, tanggalPendek } from './data/format';
import type { DataDasbor, GreenhouseId } from './data/types';

const JUDUL: Record<string, string> = {
  '/': 'Dasbor',
  '/log-aktivitas': 'Log Aktivitas',
  '/keuangan': 'Keuangan',
  '/jadwal-tanam': 'Jadwal Tanam',
  '/macroclimate': 'Macroclimate',
  '/asisten-ai': 'Asisten AI',
  '/bantuan': 'Bantuan',
};

function Isi() {
  const [data, setData] = useState<DataDasbor | null>(null);
  const [galat, setGalat] = useState(false);
  const [gh, setGh] = useState<GreenhouseId | 'semua'>('semua');
  const { pathname } = useLocation();

  useEffect(() => {
    ambilDataDasbor().then(setData).catch(() => setGalat(true));
  }, []);

  const tersaring = useMemo(() => (data ? saringPerGreenhouse(data, gh) : null), [data, gh]);

  const pengingat: Pengingat[] = useMemo(() => {
    if (!tersaring) return [];
    return [
      ...tersaring.belumMencatat.map((p) => ({
        id: `b-${p.petani}`,
        nada: 'merah' as const,
        teks: `${p.petani} (${p.greenhouse}) belum mencatat sejak ${tanggalKoma(p.terakhirMencatat)}.`,
      })),
      ...tersaring.jadwal
        .filter((j) => j.status === 'terlambat')
        .map((j) => ({
          id: `j-${j.id}`,
          nada: 'kuning' as const,
          teks: `${j.kegiatan} di ${j.greenhouse} lewat dari target ${tanggalPendek(j.target)}.`,
        })),
    ];
  }, [tersaring]);

  const subjudul = data ? (
    <>
      <span className="dot-hijau" />
      Data Dr. Greenhouse diperbarui {jam(data.diperbaruiDrGreenhouse)} WIB · {tanggalPanjang(data.diperbaruiDrGreenhouse)}
    </>
  ) : galat ? (
    'Data Dr. Greenhouse tidak dapat dihubungi'
  ) : (
    'Memuat data…'
  );

  return (
    <Layout
      judul={JUDUL[pathname] ?? 'Dr. Greenhouse'}
      subjudul={subjudul}
      greenhouse={gh}
      onGreenhouse={setGh}
      pilihanGreenhouse={data?.greenhouses ?? []}
      pengingat={pengingat}
    >
      {galat && <div className="card panel">Data tidak dapat dimuat. Periksa koneksi lalu muat ulang halaman.</div>}
      {!galat && !tersaring && <div className="card panel skeleton" aria-busy="true">Memuat data…</div>}
      {tersaring && (
        <Routes>
          <Route path="/" element={<Dasbor data={tersaring} greenhouse={gh} />} />
          <Route path="/log-aktivitas" element={<Stub judul="Log Aktivitas semua petani" mockup="M02" catatan="Tabel aktivitas seluruh petani dengan filter petani, jenis, dan tanggal. Kolom dan cara pengisian menunggu hasil wawancara tentang kebiasaan mencatat petani." />} />
          <Route path="/keuangan" element={<Stub judul="Rekap Keuangan (Profit & Loss)" mockup="M03" catatan="Rekap pemasukan dan pengeluaran per periode dan per petani. Kategori biaya dan siapa yang mencatat pemasukan panen perlu dikonfirmasi saat wawancara." />} />
          <Route path="/jadwal-tanam" element={<Stub judul="Kelola Jadwal Tanam" mockup="M04" catatan="Kalender dan daftar fase tanam per greenhouse. Siapa yang menyusun jadwal hari ini dan bagaimana jadwal dikomunikasikan ke petani perlu divalidasi." />} />
          <Route path="/macroclimate" element={<Stub judul="Monitoring Macroclimate" mockup="M05" catatan="Perbandingan prakiraan BMKG dan pengamatan AWS. Keputusan apa yang benar-benar diambil dari data cuaca perlu ditanyakan saat wawancara." />} />
          <Route path="/asisten-ai" element={<Stub judul="Asisten AI (prioritas rendah)" mockup="M06" catatan="Ditunda. Dari diskusi terakhir, petani tidak membutuhkan chatbot. Tombol tetap ada agar dasbor sama dengan mockup, dan bisa disembunyikan lewat src/config.ts." />} />
          <Route path="/bantuan" element={<Stub judul="Bantuan" catatan="Penjelasan istilah dan ikon di setiap halaman." />} />
          <Route path="*" element={<Stub judul="Halaman tidak ditemukan" catatan="Alamat ini tidak ada." />} />
        </Routes>
      )}
    </Layout>
  );
}

// Pemilih tampilan: /petani/* memakai website petani (layout sendiri),
// selain itu memakai dasbor manajemen seperti semula.
function Root() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/petani')) return <PetaniApp />;
  return (
    <>
      <Isi />
      {/* Tautan demo untuk berpindah ke tampilan petani (prototipe). */}
      <Link className="p-demo-masuk" to="/petani" title="Buka tampilan petani">
        Masuk sebagai petani
      </Link>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Root />
    </HashRouter>
  );
}
