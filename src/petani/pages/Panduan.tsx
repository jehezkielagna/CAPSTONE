import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconP, type NamaIkonP } from '../IconP';

const LANGKAH: { bgKartu: string; bgBulat: string; ikon: NamaIkonP; pil: string; judul: string; teks: string }[] = [
  {
    bgKartu: '#E6F2E7',
    bgBulat: '#2F7D3A',
    ikon: 'daun',
    pil: 'Catat Kerja',
    judul: 'Selesai bekerja? Tekan Catat Kerja',
    teks: 'Pilih gambar kegiatannya, isi jumlah, lalu Simpan. Cukup 3 sentuhan.',
  },
  {
    bgKartu: '#FDEBD8',
    bgBulat: '#9A4A0B',
    ikon: 'kereta',
    pil: 'Belanja & Pemasukan',
    judul: 'Catat uang keluar dan uang masuk',
    teks: 'Beli sesuatu? Tekan Catat Belanja. Terima uang panen? Tekan Catat Pemasukan. Lupa kemarin? Tetap bisa dicatat.',
  },
  {
    bgKartu: '#FFF1CC',
    bgBulat: '#8A5A00',
    ikon: 'lonceng',
    pil: 'Pengingat',
    judul: 'Kami ingatkan setiap sore',
    teks: 'Jika sampai pukul 16.00 belum ada catatan, HP Bapak akan berbunyi sebagai pengingat.',
  },
];

export function Panduan() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const l = LANGKAH[i];
  const terakhir = i === LANGKAH.length - 1;

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - 92px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <span style={{ font: '700 17px/1 Inter, sans-serif', color: '#1F5A27' }}>Langkah {i + 1} dari 3</span>
        <button onClick={() => nav('/petani')} style={{ font: '700 17px/1 Inter, sans-serif', color: '#46524A', background: 'transparent', border: 0, padding: 12, cursor: 'pointer' }}>
          Lewati
        </button>
      </div>

      <div style={{ margin: '4px 16px 0', minHeight: 300, borderRadius: 28, background: l.bgKartu, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '28px 0' }}>
        <div style={{ width: 150, height: 150, borderRadius: 40, background: l.bgBulat, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 12px rgba(255,255,255,0.75)' }}>
          <IconP name={l.ikon} size={84} style={{ strokeWidth: 1.8 }} />
        </div>
        <div style={{ minHeight: 52, padding: '0 22px', borderRadius: 26, background: l.bgBulat, color: '#fff', display: 'flex', alignItems: 'center', font: '800 20px/1 Inter, sans-serif' }}>
          {l.pil}
        </div>
      </div>

      <div style={{ padding: '28px 24px 0', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h1 style={{ font: '800 28px/1.25 Inter, sans-serif', margin: 0 }}>{l.judul}</h1>
        <p style={{ margin: 0, font: '500 19px/1.5 Inter, sans-serif', color: '#33413A' }}>{l.teks}</p>
      </div>

      <div style={{ padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div aria-hidden="true" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {LANGKAH.map((_, k) => (
            <span key={k} style={{ height: 10, borderRadius: 5, width: k === i ? 32 : 10, background: k === i ? '#2F7D3A' : '#C9D3C6' }} />
          ))}
        </div>
        <button
          className="p-big"
          onClick={() => (terakhir ? nav('/petani') : setI((n) => n + 1))}
        >
          {terakhir ? 'Mulai' : 'Lanjut'}
        </button>
      </div>
    </div>
  );
}
