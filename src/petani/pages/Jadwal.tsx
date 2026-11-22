import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconP, type NamaIkonP } from '../IconP';
import { ambilJadwal } from '../../data/api-petani';
import type { JadwalItem, JadwalPetani, JenisKerja } from '../../data/types-petani';

const GAYA: Record<JenisKerja, { ikon: NamaIkonP; bg: string; fg: string }> = {
  panen: { ikon: 'keranjang', bg: '#FBE9E6', fg: '#9E2A1C' },
  penyemprotan: { ikon: 'semprot', bg: '#DDF1EF', fg: '#0E5F5C' },
  penyiraman: { ikon: 'tetes', bg: '#E7EFFA', fg: '#1A4F8C' },
  pemupukan: { ikon: 'karung', bg: '#FFF1CC', fg: '#6E4600' },
  pemangkasan: { ikon: 'gunting', bg: '#E6F2E7', fg: '#1F5A27' },
  lainnya: { ikon: 'titik', bg: '#EEF1ED', fg: '#46524A' },
};

function warnaWaktu(status: JadwalItem['status']): string {
  if (status === 'terlambat') return '#9E2A1C';
  if (status === 'hari-ini') return '#1F5A27';
  return '#46524A';
}
function warnaBatas(status: JadwalItem['status']): string {
  if (status === 'terlambat') return '#F2C9C2';
  if (status === 'hari-ini') return '#B9DABD';
  return '#E1E7DF';
}

export function Jadwal() {
  const nav = useNavigate();
  const [data, setData] = useState<JadwalPetani | null>(null);

  useEffect(() => {
    let batal = false;
    ambilJadwal().then((d) => !batal && setData(d));
    return () => {
      batal = true;
    };
  }, []);

  const persen = data ? Math.round((data.fase.hariKe / data.fase.totalHari) * 100) : 0;

  return (
    <>
      <header className="p-topbar">
        <button className="p-back" onClick={() => nav('/petani')}>
          <IconP name="kiri" size={26} />
          Kembali
        </button>
        <button className="p-help" onClick={() => nav('/petani/bantuan')}>
          <IconP name="bantuan" size={20} />
          Bantuan
        </button>
      </header>

      <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ font: '800 26px/1.25 Inter, sans-serif' }}>Jadwal kerja</h1>

        {!data ? (
          <div className="p-skel" style={{ height: 120, borderRadius: 20 }} />
        ) : (
          <>
            <div style={{ padding: 16, borderRadius: 20, background: '#E6F2E7', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 52, height: 52, borderRadius: 16, background: '#2F7D3A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <IconP name="daun" size={30} />
                </span>
                <div>
                  <div style={{ font: '600 15px/1.2 Inter, sans-serif', color: '#1F5A27' }}>Tomat Bapak sekarang</div>
                  <div style={{ font: '800 22px/1.25 Inter, sans-serif' }}>{data.fase.nama}</div>
                </div>
              </div>
              <div role="img" aria-label={`Sudah ${data.fase.hariKe} dari ${data.fase.totalHari} hari`} style={{ height: 14, borderRadius: 7, background: '#fff', overflow: 'hidden' }}>
                <div style={{ width: `${persen}%`, height: '100%', background: '#2F7D3A', borderRadius: 7 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 15px/1.2 Inter, sans-serif', color: '#1F5A27' }}>
                <span>Hari ke-{data.fase.hariKe}</span>
                <span>Panen sampai {data.fase.sampai}</span>
              </div>
            </div>

            <h2 style={{ font: '800 20px/1.3 Inter, sans-serif', margin: '4px 0 0' }}>Kerja minggu ini</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.items.map((it) => {
                const g = GAYA[it.jenis];
                return (
                  <div
                    key={it.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 18, background: '#fff', border: `2px solid ${warnaBatas(it.status)}` }}
                  >
                    <span style={{ width: 52, height: 52, borderRadius: 16, background: g.bg, color: g.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                      <IconP name={g.ikon} size={30} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ font: '800 18px/1.25 Inter, sans-serif' }}>{it.judul}</div>
                      <div style={{ font: '700 15px/1.3 Inter, sans-serif', color: warnaWaktu(it.status), marginTop: 2 }}>{it.waktuLabel}</div>
                    </div>
                    {it.bolehCatat && (
                      <Link
                        to="/petani/catat-kerja"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48, padding: '0 16px', borderRadius: 14, background: '#2F7D3A', color: '#fff', font: '800 17px/1 Inter, sans-serif', flex: 'none' }}
                      >
                        Catat
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <p style={{ margin: 0, font: '500 15px/1.45 Inter, sans-serif', color: '#46524A' }}>
              Tekan <b>Catat</b> kalau kerjanya sudah Bapak lakukan. Jadwal hanya bisa dilihat; penyusunan jadwal oleh manajemen.
            </p>
          </>
        )}
      </div>
    </>
  );
}
