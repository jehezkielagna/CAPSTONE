import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconP } from '../IconP';
import { ambilCuaca } from '../../data/api-petani';
import { jam } from '../../data/format';
import type { CuacaHarian } from '../../data/types-petani';

function tanggalSapaan(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

export function Cuaca() {
  const nav = useNavigate();
  const [c, setC] = useState<CuacaHarian | null>(null);

  useEffect(() => {
    let batal = false;
    ambilCuaca().then((d) => !batal && setC(d));
    return () => {
      batal = true;
    };
  }, []);

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
        <div>
          <div style={{ font: '600 16px/1 Inter, sans-serif', color: '#46524A' }}>
            {c ? tanggalSapaan(c.tanggal) : '…'}
          </div>
          <h1 style={{ font: '800 26px/1.25 Inter, sans-serif', margin: '8px 0 0' }}>Cuaca hari ini</h1>
        </div>

        {!c ? (
          <div className="p-skel" style={{ height: 180, borderRadius: 22 }} />
        ) : (
          <>
            {/* Hero prakiraan */}
            <div style={{ padding: 18, borderRadius: 22, background: '#1F5FA8', color: '#fff', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <IconP name="hujanBesar" size={64} style={{ strokeWidth: 1.6 }} />
                <div>
                  <div style={{ font: '800 26px/1.15 Inter, sans-serif' }}>{c.ringkasan}</div>
                  <div style={{ font: '500 17px/1.35 Inter, sans-serif', opacity: 0.92, marginTop: 4 }}>{c.detail}</div>
                </div>
              </div>
              <div style={{ padding: 14, borderRadius: 16, background: '#fff', color: '#17231A', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ width: 44, height: 44, borderRadius: 14, background: '#DDF1EF', color: '#0E5F5C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <IconP name="semprot" />
                </span>
                <div>
                  <div style={{ font: '800 18px/1.3 Inter, sans-serif' }}>{c.saran.judul}</div>
                  <div style={{ font: '500 16px/1.4 Inter, sans-serif', color: '#46524A', marginTop: 2 }}>{c.saran.teks}</div>
                </div>
              </div>
            </div>

            {/* Angka ukur */}
            <div style={{ display: 'flex', gap: 10 }}>
              <Num ikon="suhuIsi" warna="#C8402F" nilai={`${c.suhu}°`} label="Suhu" />
              <Num ikon="tetes" warna="#1F5FA8" nilai="Lembap" label={`Udara ${c.kelembapan}%`} />
              <Num ikon="gerimis" warna="#0F6E6E" nilai={`${c.curahHujan} mm`} label={c.curahHujan > 0 ? 'Terukur' : 'Belum hujan'} />
            </div>

            {/* Besok */}
            <div style={{ padding: '14px 16px', borderRadius: 18, background: '#fff', border: '2px solid #E1E7DF', display: 'flex', alignItems: 'center', gap: 14 }}>
              <IconP name="matahari" size={40} style={{ color: '#B07A00' }} />
              <div style={{ flex: 1 }}>
                <div style={{ font: '600 15px/1.2 Inter, sans-serif', color: '#46524A' }}>{c.besok.hari}</div>
                <div style={{ font: '800 19px/1.3 Inter, sans-serif', marginTop: 3 }}>{c.besok.ringkasan}</div>
              </div>
              <span style={{ font: '700 17px/1 Inter, sans-serif' }}>
                {c.besok.suhuMin}–{c.besok.suhuMaks}°
              </span>
            </div>

            {c.awsLama && (
              <div className="p-peringatan">
                <IconP name="jam" size={18} style={{ color: '#6E4600' }} />
                <span>Data alat kebun terakhir {jam(c.awsWaktu)} WIB (lebih dari 3 jam lalu). Mungkin bukan kondisi sekarang.</span>
              </div>
            )}

            <p style={{ margin: 0, font: '500 14px/1.45 Inter, sans-serif', color: '#56645A' }}>
              Sumber: alat cuaca kebun / AWS Agrotani (jam {jam(c.awsWaktu)}) dan ramalan BMKG Kec. Lembang. Angka alat kebun diukur di luar greenhouse, bukan kondisi di dalamnya.
            </p>
          </>
        )}
      </div>
    </>
  );
}

function Num({ ikon, warna, nilai, label }: { ikon: 'suhuIsi' | 'tetes' | 'gerimis'; warna: string; nilai: string; label: string }) {
  return (
    <div style={{ flex: 1, padding: '14px 8px', borderRadius: 18, background: '#fff', border: '2px solid #E1E7DF', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <IconP name={ikon} size={28} style={{ color: warna }} />
      <span style={{ font: '800 24px/1 Inter, sans-serif' }}>{nilai}</span>
      <span style={{ font: '600 14px/1.2 Inter, sans-serif', color: '#46524A' }}>{label}</span>
    </div>
  );
}
