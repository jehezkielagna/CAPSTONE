import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconP, type NamaIkonP } from '../IconP';
import { ambilKeuanganBulan, daftarBarang, setSimulasiGagal, simpanBelanja } from '../../data/api-petani';
import { HARI_INI } from '../../data/mock-petani';
import { rupiah } from '../../data/format';
import type { BarangBelanja, KategoriBelanja } from '../../data/types-petani';

type Langkah = 'pilih' | 'isi' | 'selesai';
type Kapan = 'hari-ini' | 'kemarin';

const KATEGORI: {
  key: KategoriBelanja;
  label: string;
  sub: string;
  tanya: string;
  ikon: NamaIkonP;
  bg: string;
  fg: string;
}[] = [
  { key: 'pupuk', label: 'Pupuk', sub: 'NPK, KNO₃, kandang', tanya: 'Pupuk apa?', ikon: 'karung', bg: '#FFF1CC', fg: '#6E4600' },
  { key: 'obat', label: 'Obat tanaman', sub: 'Fungisida, insektisida', tanya: 'Obat apa?', ikon: 'botol', bg: '#DDF1EF', fg: '#0E5F5C' },
  { key: 'hok', label: 'Upah kerja', sub: 'Tenaga harian (HOK)', tanya: 'Jenis upahnya?', ikon: 'orang', bg: '#FDEBD8', fg: '#8A4A0F' },
  { key: 'lainnya', label: 'Lainnya', sub: 'Belanja lain', tanya: 'Belanja apa?', ikon: 'titik', bg: '#EEF1ED', fg: '#46524A' },
];

function waktuSimpan(kapan: Kapan): string {
  if (kapan === 'hari-ini') return HARI_INI;
  const d = new Date(HARI_INI);
  d.setDate(d.getDate() - 1);
  return d.toISOString();
}

const angkaRibuan = (digit: string) => (digit ? Number(digit).toLocaleString('id-ID') : '');

export function CatatBelanja() {
  const nav = useNavigate();
  const semuaBarang = daftarBarang();

  const [langkah, setLangkah] = useState<Langkah>('pilih');
  const [kat, setKat] = useState<(typeof KATEGORI)[number] | null>(null);
  const [barang, setBarang] = useState<BarangBelanja | null>(null);
  const [hargaDigit, setHargaDigit] = useState('');
  const [kapan, setKapan] = useState<Kapan>('hari-ini');
  const [errHarga, setErrHarga] = useState<string | null>(null);
  const [gagal, setGagal] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [simGagal, setSimGagal] = useState(false);
  const [ringkas, setRingkas] = useState<{ nama: string; harga: number; kapan: Kapan; totalBulan: number } | null>(null);

  function mulaiIsi(k: (typeof KATEGORI)[number]) {
    const daftar = semuaBarang.filter((b) => b.kategori === k.key);
    setKat(k);
    setBarang(daftar[0] ?? null);
    setHargaDigit('');
    setKapan('hari-ini');
    setErrHarga(null);
    setGagal(false);
    setLangkah('isi');
  }

  async function simpan() {
    if (!kat || !barang) return;
    const harga = Number(hargaDigit);
    if (!hargaDigit || harga <= 0) {
      setErrHarga('Isi harganya dulu, ya.');
      return;
    }
    setErrHarga(null);
    setGagal(false);
    setMenyimpan(true);
    setSimulasiGagal(simGagal); // demo kondisi gagal (P07b)
    const w = waktuSimpan(kapan);
    try {
      await simpanBelanja({
        barangId: barang.id,
        nama: barang.nama,
        kategori: kat.key,
        harga,
        waktu: w,
      });
      const k = await ambilKeuanganBulan();
      setRingkas({ nama: barang.nama, harga, kapan, totalBulan: k.pengeluaran });
      setLangkah('selesai');
    } catch {
      setGagal(true);
    } finally {
      setMenyimpan(false);
      setSimulasiGagal(false);
    }
  }

  if (langkah === 'selesai' && kat && ringkas) {
    return (
      <HasilBelanja
        kat={kat}
        ringkas={ringkas}
        onLagi={() => {
          setKat(null);
          setBarang(null);
          setLangkah('pilih');
        }}
        onBeranda={() => nav('/petani')}
      />
    );
  }

  return (
    <>
      <header className="p-topbar">
        <button
          className="p-back"
          onClick={() => (langkah === 'isi' ? setLangkah('pilih') : nav('/petani'))}
        >
          <IconP name="kiri" size={26} />
          Kembali
        </button>
        <button className="p-help" onClick={() => nav('/petani/bantuan')}>
          <IconP name="bantuan" size={20} />
          Bantuan
        </button>
      </header>

      {langkah === 'pilih' ? (
        <>
          <div style={{ padding: '18px 16px 0' }}>
            <div className="p-step-head" style={{ color: 'var(--p-cokelat)' }}>Catat Belanja · Langkah 1 dari 2</div>
            <h1 style={{ font: '800 26px/1.25 Inter, sans-serif', margin: '8px 0 0' }}>Bapak beli apa?</h1>
          </div>
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
            {KATEGORI.map((k) => (
              <button
                key={k.key}
                onClick={() => mulaiIsi(k)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  minHeight: 132,
                  borderRadius: 20,
                  background: '#fff',
                  border: '2px solid #E1E7DF',
                  color: '#17231A',
                  cursor: 'pointer',
                  padding: '0 6px',
                }}
              >
                <span
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    background: k.bg,
                    color: k.fg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2,
                  }}
                >
                  <IconP name={k.ikon} size={34} />
                </span>
                <span style={{ font: '800 18px/1.2 Inter, sans-serif' }}>{k.label}</span>
                <span style={{ font: '500 14px/1.25 Inter, sans-serif', color: '#46524A' }}>{k.sub}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        kat && (
          <>
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: kat.bg,
                    color: kat.fg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconP name={kat.ikon} size={30} />
                </span>
                <div style={{ flex: 1 }}>
                  <div className="p-step-head" style={{ color: 'var(--p-cokelat)' }}>Langkah 2 dari 2</div>
                  <div className="p-step-judul">{kat.label}</div>
                </div>
                <button className="p-link" style={{ minHeight: 44 }} onClick={() => setLangkah('pilih')}>
                  Ganti
                </button>
              </div>

              <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h2 className="p-q">{kat.tanya}</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {semuaBarang
                    .filter((b) => b.kategori === kat.key)
                    .map((b) => (
                      <button
                        key={b.id}
                        className={`p-chip${barang?.id === b.id ? ' on' : ''}`}
                        aria-pressed={barang?.id === b.id}
                        onClick={() => setBarang(b)}
                      >
                        {b.nama}
                      </button>
                    ))}
                </div>
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label className="p-q" htmlFor="harga">Berapa harganya?</label>
                <div className={`p-harga${errHarga ? ' p-input--salah' : ''}`}>
                  <span className="rp">Rp</span>
                  <input
                    id="harga"
                    inputMode="numeric"
                    placeholder="0"
                    aria-invalid={!!errHarga}
                    value={angkaRibuan(hargaDigit)}
                    onChange={(e) => {
                      setHargaDigit(e.target.value.replace(/\D/g, ''));
                      if (errHarga) setErrHarga(null);
                    }}
                  />
                </div>
                {errHarga && (
                  <div className="p-error" style={{ fontSize: 16 }}>
                    <IconP name="lonceng" size={22} />
                    {errHarga}
                  </div>
                )}
                {barang && <div className="p-hint">Satuan: {barang.satuan}</div>}
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h2 className="p-q">Kapan belinya?</h2>
                <div className="p-opsi">
                  <button className={`p-opt p-opt--coklat${kapan === 'hari-ini' ? ' on' : ''}`} aria-pressed={kapan === 'hari-ini'} onClick={() => setKapan('hari-ini')}>
                    Hari ini
                  </button>
                  <button className={`p-opt p-opt--coklat${kapan === 'kemarin' ? ' on' : ''}`} aria-pressed={kapan === 'kemarin'} onClick={() => setKapan('kemarin')}>
                    Kemarin
                  </button>
                </div>
              </section>

              {/* Kontrol demo (prototipe): memperagakan kondisi gagal simpan P07b. */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1.4 Inter, sans-serif', color: '#8a8f88' }}>
                <input type="checkbox" checked={simGagal} onChange={(e) => setSimGagal(e.target.checked)} />
                Demo: simulasikan gagal simpan
              </label>
            </div>

            <div className="p-footer">
              <button className="p-big p-big--coklat" disabled={menyimpan} onClick={simpan}>
                <IconP name="centang" size={28} style={{ strokeWidth: 2.6 }} />
                {menyimpan ? 'Menyimpan…' : 'Simpan'}
              </button>
            </div>
          </>
        )
      )}
    </>
  );
}

function HasilBelanja({
  kat,
  ringkas,
  onLagi,
  onBeranda,
}: {
  kat: (typeof KATEGORI)[number];
  ringkas: { nama: string; harga: number; kapan: Kapan; totalBulan: number };
  onLagi: () => void;
  onBeranda: () => void;
}) {
  return (
    <div className="p-hasil" role="status">
      <div className="p-hasil-ikon" style={{ width: 120, height: 120, boxShadow: '0 0 0 14px #E6F2E7' }}>
        <IconP name="centang" size={64} style={{ strokeWidth: 2.8 }} />
      </div>
      <div className="p-hasil-judul" style={{ fontSize: 30 }}>Tersimpan!</div>

      <div
        style={{
          marginTop: 8,
          width: '100%',
          padding: 18,
          borderRadius: 20,
          background: '#F3F6F2',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            background: kat.bg,
            color: kat.fg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <IconP name={kat.ikon} size={34} />
        </span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ font: '800 22px/1.25 Inter, sans-serif' }}>{ringkas.nama}</div>
          <div style={{ font: '800 20px/1.3 Inter, sans-serif', color: 'var(--p-cokelat)' }}>{rupiah(ringkas.harga)}</div>
          <div style={{ font: '500 16px/1.4 Inter, sans-serif', color: '#46524A' }}>
            {ringkas.kapan === 'hari-ini' ? 'Hari ini' : 'Kemarin'}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 2,
          width: '100%',
          padding: '16px 18px',
          borderRadius: 18,
          border: '2px solid #E1E7DF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ font: '600 17px/1.35 Inter, sans-serif' }}>Belanja bulan November</span>
        <span style={{ font: '800 20px/1 Inter, sans-serif' }}>{rupiah(ringkas.totalBulan)}</span>
      </div>

      <div className="p-hasil-aksi">
        <button className="p-btn-kecil" style={{ minHeight: 60, borderRadius: 16, fontSize: 18 }} onClick={onLagi}>
          <IconP name="tambah" size={22} />
          Catat belanja lain
        </button>
        <button className="p-big" onClick={onBeranda}>
          Ke Beranda
        </button>
      </div>
    </div>
  );
}
