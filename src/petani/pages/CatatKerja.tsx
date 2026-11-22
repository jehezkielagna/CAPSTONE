import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconP, type NamaIkonP } from '../IconP';
import { daftarKegiatan, simpanKerja } from '../../data/api-petani';
import { HARI_INI } from '../../data/mock-petani';
import { jam } from '../../data/format';
import type { JenisKerja, JenisKerjaOpsi } from '../../data/types-petani';

type Langkah = 'pilih' | 'isi' | 'selesai';
type Kapan = 'hari-ini' | 'kemarin';

const GAYA: Record<JenisKerja, { ikon: NamaIkonP; bg: string; fg: string }> = {
  panen: { ikon: 'keranjang', bg: '#FBE9E6', fg: '#9E2A1C' },
  penyemprotan: { ikon: 'semprot', bg: '#DDF1EF', fg: '#0E5F5C' },
  penyiraman: { ikon: 'tetes', bg: '#E7EFFA', fg: '#1A4F8C' },
  pemupukan: { ikon: 'karung', bg: '#FFF1CC', fg: '#6E4600' },
  pemangkasan: { ikon: 'gunting', bg: '#E6F2E7', fg: '#1F5A27' },
  lainnya: { ikon: 'titik', bg: '#EEF1ED', fg: '#46524A' },
};

// Waktu simpan mengikuti "hari ini" data contoh (3 Nov 2026).
function waktuSimpan(kapan: Kapan): string {
  if (kapan === 'hari-ini') return HARI_INI;
  const d = new Date(HARI_INI);
  d.setDate(d.getDate() - 1);
  return d.toISOString();
}

export function CatatKerja() {
  const nav = useNavigate();
  const kegiatan = daftarKegiatan();

  const [langkah, setLangkah] = useState<Langkah>('pilih');
  const [pilih, setPilih] = useState<JenisKerjaOpsi | null>(null);
  const [jumlah, setJumlah] = useState(0);
  const [kapan, setKapan] = useState<Kapan>('hari-ini');
  const [catatan, setCatatan] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);
  const [waktu, setWaktu] = useState(HARI_INI);

  function mulaiIsi(opsi: JenisKerjaOpsi) {
    setPilih(opsi);
    setJumlah(0);
    setKapan('hari-ini');
    setCatatan(null);
    setGalat(null);
    setLangkah('isi');
  }

  async function simpan() {
    if (!pilih) return;
    if (jumlah <= 0) {
      setGalat('Isi jumlahnya dulu, lebih dari 0.');
      return;
    }
    const w = waktuSimpan(kapan);
    setMenyimpan(true);
    setGalat(null);
    try {
      await simpanKerja({
        jenis: pilih.jenis,
        label: pilih.label,
        jumlah,
        satuan: pilih.satuan,
        waktu: w,
        catatan: catatan ?? undefined,
      });
      setWaktu(w);
      setLangkah('selesai');
    } catch {
      setGalat('Gagal menyimpan. Isian Bapak masih aman, coba lagi.');
    } finally {
      setMenyimpan(false);
    }
  }

  if (langkah === 'selesai' && pilih) {
    return (
      <HasilKerja
        pilih={pilih}
        jumlah={jumlah}
        waktu={waktu}
        kapan={kapan}
        onLagi={() => {
          setPilih(null);
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
            <div className="p-step-head">Catat Kerja · Langkah 1 dari 2</div>
            <h1 style={{ font: '800 26px/1.25 Inter, sans-serif', margin: '8px 0 0' }}>
              Apa yang Bapak kerjakan?
            </h1>
          </div>
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
            {kegiatan.map((k) => {
              const g = GAYA[k.jenis];
              return (
                <button
                  key={k.jenis}
                  onClick={() => mulaiIsi(k)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    minHeight: 132,
                    borderRadius: 20,
                    background: '#fff',
                    border: '2px solid #E1E7DF',
                    font: '800 18px/1.2 Inter, sans-serif',
                    color: '#17231A',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 20,
                      background: g.bg,
                      color: g.fg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconP name={g.ikon} size={36} />
                  </span>
                  {k.label}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        pilih && (
          <>
            <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    background: GAYA[pilih.jenis].bg,
                    color: GAYA[pilih.jenis].fg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconP name={GAYA[pilih.jenis].ikon} size={32} />
                </span>
                <div style={{ flex: 1 }}>
                  <div className="p-step-head">Langkah 2 dari 2</div>
                  <div className="p-step-judul">{pilih.label}</div>
                </div>
                <button className="p-link" style={{ minHeight: 44 }} onClick={() => setLangkah('pilih')}>
                  Ganti
                </button>
              </div>

              <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h2 className="p-q">{pilih.pertanyaan}</h2>
                <div className="p-stepper">
                  <button
                    className="p-step"
                    aria-label={`Kurangi ${pilih.langkah} ${pilih.satuan}`}
                    disabled={jumlah <= 0}
                    onClick={() => setJumlah((n) => Math.max(0, n - pilih.langkah))}
                  >
                    <IconP name="kurang" size={32} style={{ strokeWidth: 2.6 }} />
                  </button>
                  <div className="p-angka" aria-live="polite">
                    <b>{jumlah}</b>
                    <span>{pilih.satuan}</span>
                  </div>
                  <button
                    className="p-step p-step--utama"
                    aria-label={`Tambah ${pilih.langkah} ${pilih.satuan}`}
                    onClick={() => setJumlah((n) => n + pilih.langkah)}
                  >
                    <IconP name="tambah" size={32} style={{ strokeWidth: 2.6 }} />
                  </button>
                </div>
                {pilih.jenis === 'panen' && (
                  <div className="p-hint">Tidak perlu memilah grade. Grade dicatat oleh Agrotani saat penimbangan.</div>
                )}
                {galat && (
                  <div className="p-error">
                    <IconP name="lonceng" size={16} />
                    {galat}
                  </div>
                )}
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h2 className="p-q">Kapan?</h2>
                <div className="p-opsi">
                  <button
                    className={`p-opt${kapan === 'hari-ini' ? ' on' : ''}`}
                    aria-pressed={kapan === 'hari-ini'}
                    onClick={() => setKapan('hari-ini')}
                  >
                    Hari ini
                  </button>
                  <button
                    className={`p-opt${kapan === 'kemarin' ? ' on' : ''}`}
                    aria-pressed={kapan === 'kemarin'}
                    onClick={() => setKapan('kemarin')}
                  >
                    Kemarin
                  </button>
                </div>
              </section>

              {catatan === null ? (
                <button className="p-link" onClick={() => setCatatan('')}>
                  <IconP name="tambah" size={22} />
                  Tambah catatan (boleh dilewati)
                </button>
              ) : (
                <div className="p-field">
                  <label htmlFor="catatan-kerja">Catatan (boleh dikosongkan)</label>
                  <input
                    id="catatan-kerja"
                    className="p-input"
                    value={catatan}
                    placeholder="mis. blok timur"
                    onChange={(e) => setCatatan(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="p-footer">
              <button className="p-big" disabled={menyimpan} onClick={simpan}>
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

function HasilKerja({
  pilih,
  jumlah,
  waktu,
  kapan,
  onLagi,
  onBeranda,
}: {
  pilih: JenisKerjaOpsi;
  jumlah: number;
  waktu: string;
  kapan: Kapan;
  onLagi: () => void;
  onBeranda: () => void;
}) {
  const g = GAYA[pilih.jenis];
  return (
    <div className="p-hasil" role="status">
      <div className="p-hasil-ikon" style={{ width: 120, height: 120, boxShadow: '0 0 0 14px #E6F2E7' }}>
        <IconP name="centang" size={64} style={{ strokeWidth: 2.8 }} />
      </div>
      <div className="p-hasil-judul" style={{ fontSize: 30 }}>Tersimpan!</div>
      <div className="p-hasil-ringkas">Terima kasih, Pak Jaka.</div>

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
            background: g.bg,
            color: g.fg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <IconP name={g.ikon} size={34} />
        </span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ font: '800 22px/1.25 Inter, sans-serif' }}>
            {pilih.label} {jumlah} {pilih.satuan}
          </div>
          <div style={{ font: '500 16px/1.4 Inter, sans-serif', color: '#46524A', marginTop: 2 }}>
            {kapan === 'hari-ini' ? 'Hari ini' : 'Kemarin'}, pukul {jam(waktu)}
          </div>
        </div>
      </div>

      <div className="p-hasil-aksi">
        <button className="p-btn-kecil" style={{ minHeight: 60, borderRadius: 16, fontSize: 18 }} onClick={onLagi}>
          Catat kerja lain
        </button>
        <button className="p-big" onClick={onBeranda}>
          Ke Beranda
        </button>
      </div>
    </div>
  );
}
