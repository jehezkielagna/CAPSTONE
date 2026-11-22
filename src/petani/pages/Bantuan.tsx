import { useNavigate } from 'react-router-dom';
import { IconP } from '../IconP';

const ISTILAH: { judul: string; teks: string }[] = [
  { judul: 'HST', teks: 'Hari setelah tanam. Dihitung sejak bibit dipindah ke greenhouse.' },
  { judul: 'Tanggal target', teks: 'Hari kegiatan sebaiknya dikerjakan.' },
  { judul: 'Terlambat', teks: 'Kegiatan sudah lewat dari tanggal target.' },
  { judul: 'AWS Agrotani', teks: 'Alat cuaca di kebun. Angkanya diukur di luar greenhouse, bukan kondisi di dalamnya.' },
  { judul: 'Tanda “—”', teks: 'Belum ada catatan pada periode itu — bukan berarti Rp 0.' },
];

export function Bantuan() {
  const nav = useNavigate();
  return (
    <div style={{ padding: '28px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h1 style={{ font: '800 26px/1.25 Inter, sans-serif' }}>Bantuan</h1>

      <button
        className="p-btn-kecil"
        style={{ minHeight: 60, borderRadius: 16, fontSize: 18, justifyContent: 'flex-start', gap: 12 }}
        onClick={() => nav('/petani/panduan')}
      >
        <span style={{ width: 40, height: 40, borderRadius: 12, background: '#E6F2E7', color: '#1F5A27', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <IconP name="daun" size={22} />
        </span>
        Buka panduan awal lagi
      </button>

      <div className="p-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ font: '800 18px/1.3 Inter, sans-serif' }}>Arti istilah di aplikasi</div>
        {ISTILAH.map((it) => (
          <div key={it.judul} style={{ font: '500 15px/1.5 Inter, sans-serif' }}>
            <strong>{it.judul}</strong> · {it.teks}
          </div>
        ))}
      </div>

      <div className="p-card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ width: 40, height: 40, borderRadius: 12, background: '#E7EFFA', color: '#1A4F8C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <IconP name="orang" size={22} />
        </span>
        <div style={{ font: '500 15px/1.5 Inter, sans-serif', color: '#46524A' }}>
          Masih bingung? Tanyakan ke pendamping lapangan Agrotani atau Pak Ferry (manajemen).
        </div>
      </div>
    </div>
  );
}
