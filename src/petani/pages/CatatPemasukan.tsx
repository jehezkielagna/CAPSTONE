import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconP } from '../IconP';
import { ambilKeuanganBulan, setSimulasiGagal, simpanPemasukan } from '../../data/api-petani';
import { HARI_INI } from '../../data/mock-petani';
import { rupiah, rupiahBertanda } from '../../data/format';

type Kapan = 'hari-ini' | 'kemarin';

const SUMBER = [
  { key: 'agrotani', label: 'Bayaran panen Agrotani' },
  { key: 'sendiri', label: 'Jual sendiri' },
  { key: 'lainnya', label: 'Lainnya' },
] as const;

type SumberKey = (typeof SUMBER)[number]['key'];

function tanggalKapan(kapan: Kapan): string {
  const d = new Date(HARI_INI);
  if (kapan === 'kemarin') d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const angkaRibuan = (digit: string) => (digit ? Number(digit).toLocaleString('id-ID') : '');

export function CatatPemasukan() {
  const nav = useNavigate();

  const [sumber, setSumber] = useState<SumberKey>('agrotani');
  const [nominalDigit, setNominalDigit] = useState('');
  const [kapan, setKapan] = useState<Kapan>('hari-ini');
  const [catatan, setCatatan] = useState('');
  const [errNominal, setErrNominal] = useState<string | null>(null);
  const [gagal, setGagal] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [simGagal, setSimGagal] = useState(false);
  const [hasil, setHasil] = useState<{
    sumberLabel: string;
    nominal: number;
    kapan: Kapan;
    catatan: string;
    masuk: number;
    keluar: number;
    sisa: number;
  } | null>(null);

  async function simpan() {
    const nominal = Number(nominalDigit);
    if (!nominalDigit || nominal <= 0) {
      setErrNominal('Isi jumlah uangnya dulu, ya.');
      return;
    }
    setErrNominal(null);
    setGagal(false);
    setMenyimpan(true);
    setSimulasiGagal(simGagal);
    const sumberLabel = SUMBER.find((s) => s.key === sumber)!.label;
    const keterangan = [sumberLabel, catatan.trim()].filter(Boolean).join(' · ');
    try {
      await simpanPemasukan({ nominal, tanggal: tanggalKapan(kapan), keterangan });
      const k = await ambilKeuanganBulan();
      setHasil({
        sumberLabel,
        nominal,
        kapan,
        catatan: catatan.trim(),
        masuk: k.pemasukan,
        keluar: k.pengeluaran,
        sisa: k.selisih,
      });
    } catch {
      setGagal(true);
    } finally {
      setMenyimpan(false);
      setSimulasiGagal(false);
    }
  }

  if (hasil) {
    return (
      <div className="p-hasil" role="status">
        <div className="p-hasil-ikon" style={{ width: 112, height: 112, background: 'var(--p-teal)', color: '#fff', boxShadow: '0 0 0 14px #DDF1EF' }}>
          <IconP name="centang" size={64} style={{ strokeWidth: 2.8 }} />
        </div>
        <div className="p-hasil-judul" style={{ fontSize: 30 }}>Tersimpan!</div>

        <div style={{ marginTop: 8, width: '100%', padding: '16px 18px', borderRadius: 20, background: '#F3F6F2', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 60, height: 60, borderRadius: 18, background: '#DDF1EF', color: '#0E5F5C', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <IconP name="uang" size={34} />
          </span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ font: '800 20px/1.25 Inter, sans-serif' }}>{hasil.sumberLabel}</div>
            <div style={{ font: '800 20px/1.3 Inter, sans-serif', color: '#0E5F5C' }}>{rupiah(hasil.nominal)}</div>
            <div style={{ font: '500 15px/1.4 Inter, sans-serif', color: '#46524A' }}>
              {hasil.kapan === 'hari-ini' ? 'Hari ini' : 'Kemarin'}
              {hasil.catatan ? ` · “${hasil.catatan}”` : ''}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 2, width: '100%', padding: '16px 18px', borderRadius: 18, border: '2px solid #E1E7DF', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ font: '700 16px/1 Inter, sans-serif', color: '#46524A' }}>Uang Bapak bulan November</div>
          <div className="p-ln">
            <span>Uang masuk</span>
            <span style={{ fontWeight: 800, color: '#0E5F5C' }}>{rupiah(hasil.masuk)}</span>
          </div>
          <div className="p-ln">
            <span>Uang keluar (belanja)</span>
            <span style={{ fontWeight: 800, color: 'var(--p-cokelat)' }}>{rupiah(hasil.keluar)}</span>
          </div>
          <div style={{ height: 2, background: '#E1E7DF' }} />
          <div className="p-ln">
            <span style={{ fontWeight: 800 }}>Sisa</span>
            <span style={{ font: '800 22px/1 Inter, sans-serif', color: hasil.sisa >= 0 ? '#1F5A27' : '#9E2A1C' }}>
              {rupiahBertanda(hasil.sisa)}
            </span>
          </div>
        </div>

        <div className="p-hasil-aksi">
          <button className="p-btn-kecil" style={{ minHeight: 60, borderRadius: 16, fontSize: 18 }} onClick={() => nav('/petani/riwayat')}>
            Lihat riwayat uang
          </button>
          <button className="p-big" onClick={() => nav('/petani')}>
            Ke Beranda
          </button>
        </div>
      </div>
    );
  }

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

      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {gagal && (
          <div className="p-alert" role="alert">
            <div className="p-alert-baris">
              <IconP name="wifiOff" size={28} style={{ color: 'var(--p-merah)' }} />
              <div>
                <div className="p-alert-judul" style={{ fontSize: 17 }}>Belum terkirim, sinyal lemah</div>
                <div style={{ font: '500 15px/1.45 Inter, sans-serif' }}>Isian Bapak aman, tidak hilang.</div>
              </div>
            </div>
            <button className="p-big p-big--merah" style={{ minHeight: 56 }} disabled={menyimpan} onClick={simpan}>
              Coba Lagi
            </button>
          </div>
        )}

        <div>
          <div className="p-step-head" style={{ color: 'var(--p-teal-teks)' }}>Catat Pemasukan</div>
          <h1 style={{ font: '800 26px/1.25 Inter, sans-serif', margin: '8px 0 0' }}>Bapak terima uang dari mana?</h1>
        </div>

        <div role="radiogroup" aria-label="Sumber uang" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SUMBER.map((s) => (
            <button
              key={s.key}
              className={`p-source${sumber === s.key ? ' on' : ''}`}
              role="radio"
              aria-checked={sumber === s.key}
              onClick={() => setSumber(s.key)}
            >
              <span className="p-dot">
                <IconP name="centang" size={16} style={{ strokeWidth: 3 }} />
              </span>
              <span style={{ flex: 1 }}>{s.label}</span>
            </button>
          ))}
        </div>
        {sumber !== 'agrotani' && (
          <div className="p-hint" style={{ marginTop: -8 }}>
            Catatan: asal pemasukan panen masih perlu dikonfirmasi saat wawancara (asumsi A3).
          </div>
        )}

        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="p-q" htmlFor="nominal">Berapa uangnya?</label>
          <div className={`p-harga${errNominal ? ' p-input--salah' : ''}`}>
            <span className="rp">Rp</span>
            <input
              id="nominal"
              inputMode="numeric"
              placeholder="0"
              aria-invalid={!!errNominal}
              value={angkaRibuan(nominalDigit)}
              onChange={(e) => {
                setNominalDigit(e.target.value.replace(/\D/g, ''));
                if (errNominal) setErrNominal(null);
              }}
            />
          </div>
          {errNominal && (
            <div className="p-error" style={{ fontSize: 16 }}>
              <IconP name="lonceng" size={22} />
              {errNominal}
            </div>
          )}
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="p-q">Kapan diterima?</h2>
          <div className="p-opsi">
            <button className={`p-opt p-opt--teal${kapan === 'hari-ini' ? ' on' : ''}`} aria-pressed={kapan === 'hari-ini'} onClick={() => setKapan('hari-ini')}>
              Hari ini
            </button>
            <button className={`p-opt p-opt--teal${kapan === 'kemarin' ? ' on' : ''}`} aria-pressed={kapan === 'kemarin'} onClick={() => setKapan('kemarin')}>
              Kemarin
            </button>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="p-q" htmlFor="catatan-pemasukan">
            Catatan <span style={{ font: '500 16px/1 Inter, sans-serif', color: '#56645A' }}>(boleh dikosongkan)</span>
          </label>
          <textarea
            id="catatan-pemasukan"
            className="p-textarea"
            rows={2}
            placeholder="mis. bayaran panen 20 Okt – 2 Nov"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
        </section>

        {/* Kontrol demo (prototipe): memperagakan kondisi gagal simpan. */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1.4 Inter, sans-serif', color: '#8a8f88' }}>
          <input type="checkbox" checked={simGagal} onChange={(e) => setSimGagal(e.target.checked)} />
          Demo: simulasikan gagal simpan
        </label>
      </div>

      <div className="p-footer">
        <button className="p-big p-big--teal" disabled={menyimpan} onClick={simpan}>
          <IconP name="centang" size={28} style={{ strokeWidth: 2.6 }} />
          {menyimpan ? 'Menyimpan…' : 'Simpan'}
        </button>
      </div>
    </>
  );
}
