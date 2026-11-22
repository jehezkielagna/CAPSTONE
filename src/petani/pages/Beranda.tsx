import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconP } from '../IconP';
import { ambilBeranda } from '../../data/api-petani';
import type { DataBerandaPetani } from '../../data/types-petani';

function tanggalSapaan(iso: string): string {
  // "Selasa, 3 November" (WIB)
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

export function Beranda() {
  const [data, setData] = useState<DataBerandaPetani | null>(null);
  const [galat, setGalat] = useState(false);

  useEffect(() => {
    let batal = false;
    ambilBeranda()
      .then((d) => !batal && setData(d))
      .catch(() => !batal && setGalat(true));
    return () => {
      batal = true;
    };
  }, []);

  if (galat) {
    return (
      <div className="p-isi" style={{ paddingTop: 18 }}>
        <div className="p-alert" role="alert">
          <div className="p-alert-baris">
            <IconP name="wifiOff" size={22} style={{ color: 'var(--p-merah)' }} />
            <div>
              <div className="p-alert-judul">Belum terhubung ke Dr. Greenhouse</div>
              <div style={{ font: '500 14px/1.45 Inter, sans-serif' }}>Periksa koneksi, lalu coba lagi.</div>
            </div>
          </div>
          <button className="p-btn-kecil" onClick={() => location.reload()}>
            <IconP name="ulang" size={18} />
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  if (!data) return <BerandaSkeleton />;

  const { petani, hariIni, sudahMencatatHariIni, jadwal, cuaca } = data;

  return (
    <>
      <header className="p-beranda-head">
        <div style={{ flex: 1 }}>
          <div className="p-halo">Halo, {petani.nama}</div>
          <div className="p-tanggal">{tanggalSapaan(hariIni)}</div>
        </div>
        <Link className="p-help" to="/petani/bantuan">
          <IconP name="bantuan" size={20} />
          Bantuan
        </Link>
      </header>

      <div className="p-isi">
        {!sudahMencatatHariIni && (
          <div className="p-pengingat">
            <IconP name="lonceng" size={28} style={{ color: '#6e4600' }} />
            Hari ini Bapak belum mencatat.
          </div>
        )}

        <Link className="p-act p-act--kerja" to="/petani/catat-kerja">
          <span className="p-act-ikon">
            <IconP name="daun" size={36} />
          </span>
          <span className="p-act-teks">
            <span className="p-act-judul">Catat Kerja</span>
            <span className="p-act-sub">Siram, pupuk, panen…</span>
          </span>
          <IconP name="kanan" size={28} />
        </Link>

        <Link className="p-act p-act--belanja" to="/petani/catat-belanja">
          <span className="p-act-ikon">
            <IconP name="kereta" size={36} />
          </span>
          <span className="p-act-teks">
            <span className="p-act-judul">Catat Belanja</span>
            <span className="p-act-sub">Pupuk, obat, upah…</span>
          </span>
          <IconP name="kanan" size={28} />
        </Link>

        <Link className="p-act p-act--pemasukan" to="/petani/catat-pemasukan">
          <span className="p-act-ikon">
            <IconP name="uang" size={36} />
          </span>
          <span className="p-act-teks">
            <span className="p-act-judul">Catat Pemasukan</span>
            <span className="p-act-sub">Uang hasil panen</span>
          </span>
          <IconP name="kanan" size={28} />
        </Link>

        <div className="p-mini-baris">
          <Link className="p-mini" to="/petani/jadwal">
            <span className="p-mini-judul">
              <IconP name="kalender" />
              Jadwal
            </span>
            <span style={{ font: '800 19px/1.3 Inter, sans-serif' }}>{jadwal.kegiatan}</span>
            {jadwal.status === 'terlambat' && (
              <span className="p-badge p-badge--merah">Lewat {Math.abs(jadwal.selisihHari)} hari</span>
            )}
            {jadwal.tambahan && <span className="p-src">{jadwal.tambahan}</span>}
          </Link>

          <Link className="p-mini" to="/petani/cuaca">
            <span className="p-mini-judul">
              <IconP name="cuaca" />
              Cuaca
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconP name="cuaca" size={34} style={{ color: '#1a4f8c' }} />
              <span style={{ font: '800 26px/1 Inter, sans-serif' }}>{cuaca.suhu}°</span>
            </span>
            <span style={{ font: '700 17px/1.3 Inter, sans-serif' }}>{cuaca.ringkasan}</span>
            <span className="p-src">{cuaca.saran}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function BerandaSkeleton() {
  return (
    <>
      <header className="p-beranda-head">
        <div style={{ flex: 1 }}>
          <div className="p-skel" style={{ height: 28, width: '55%' }} />
          <div className="p-skel" style={{ height: 16, width: '40%', marginTop: 8 }} />
        </div>
      </header>
      <div className="p-isi" aria-busy="true">
        <div className="p-skel" style={{ height: 94, borderRadius: 20 }} />
        <div className="p-skel" style={{ height: 94, borderRadius: 20 }} />
        <div className="p-skel" style={{ height: 94, borderRadius: 20 }} />
        <div className="p-mini-baris">
          <div className="p-skel" style={{ flex: 1, height: 120, borderRadius: 18 }} />
          <div className="p-skel" style={{ flex: 1, height: 120, borderRadius: 18 }} />
        </div>
        <div className="p-src" style={{ textAlign: 'center' }}>Mengambil data dari Dr. Greenhouse…</div>
      </div>
    </>
  );
}
