import { useEffect, useState } from 'react';
import { IconP, type NamaIkonP } from '../IconP';
import { ambilKeuanganBulan, riwayatBelanja, riwayatKerja, riwayatPemasukan } from '../../data/api-petani';
import { jam, rupiah } from '../../data/format';
import type {
  CatatanBelanja,
  CatatanKerja,
  CatatanPemasukan,
  JenisKerja,
  KategoriBelanja,
  KelompokHari,
  RingkasanKeuanganPetani,
} from '../../data/types-petani';

type Tab = 'kerja' | 'belanja' | 'pemasukan';

const GAYA_KERJA: Record<JenisKerja, { ikon: NamaIkonP; bg: string; fg: string }> = {
  panen: { ikon: 'keranjang', bg: '#FBE9E6', fg: '#9E2A1C' },
  penyemprotan: { ikon: 'semprot', bg: '#DDF1EF', fg: '#0E5F5C' },
  penyiraman: { ikon: 'tetes', bg: '#E7EFFA', fg: '#1A4F8C' },
  pemupukan: { ikon: 'karung', bg: '#FFF1CC', fg: '#6E4600' },
  pemangkasan: { ikon: 'gunting', bg: '#E6F2E7', fg: '#1F5A27' },
  lainnya: { ikon: 'titik', bg: '#EEF1ED', fg: '#46524A' },
};

const GAYA_BELANJA: Record<KategoriBelanja, { ikon: NamaIkonP; bg: string; fg: string; label: string }> = {
  pupuk: { ikon: 'karung', bg: '#FFF1CC', fg: '#6E4600', label: 'Pupuk' },
  obat: { ikon: 'botol', bg: '#DDF1EF', fg: '#0E5F5C', label: 'Obat tanaman' },
  hok: { ikon: 'orang', bg: '#FDEBD8', fg: '#8A4A0F', label: 'Upah kerja' },
  lainnya: { ikon: 'titik', bg: '#EEF1ED', fg: '#46524A', label: 'Lainnya' },
};

export function Riwayat() {
  const [tab, setTab] = useState<Tab>('kerja');
  const [kerja, setKerja] = useState<KelompokHari<CatatanKerja>[] | null>(null);
  const [belanja, setBelanja] = useState<KelompokHari<CatatanBelanja>[] | null>(null);
  const [pemasukan, setPemasukan] = useState<KelompokHari<CatatanPemasukan>[] | null>(null);
  const [keuangan, setKeuangan] = useState<RingkasanKeuanganPetani | null>(null);

  useEffect(() => {
    let batal = false;
    Promise.all([riwayatKerja(), riwayatBelanja(), riwayatPemasukan(), ambilKeuanganBulan()]).then(
      ([k, b, p, u]) => {
        if (batal) return;
        setKerja(k);
        setBelanja(b);
        setPemasukan(p);
        setKeuangan(u);
      },
    );
    return () => {
      batal = true;
    };
  }, []);

  return (
    <div style={{ padding: '28px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h1 style={{ font: '800 26px/1.25 Inter, sans-serif' }}>Riwayat catatan</h1>

      <div className="p-seg-group" role="group" aria-label="Pilih jenis catatan">
        {(['kerja', 'belanja', 'pemasukan'] as Tab[]).map((t) => (
          <button key={t} className={`p-seg${tab === t ? ' on' : ''}`} aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t === 'kerja' ? 'Kerja' : t === 'belanja' ? 'Belanja' : 'Pemasukan'}
          </button>
        ))}
      </div>

      {(tab === 'belanja' || tab === 'pemasukan') && keuangan && (
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, padding: 14, borderRadius: 18, background: '#FDEBD8' }}>
            <div style={{ font: '600 15px/1.25 Inter, sans-serif', color: '#6B3205' }}>Keluar bulan ini</div>
            <div style={{ font: '800 21px/1.2 Inter, sans-serif', marginTop: 6 }}>{rupiah(keuangan.pengeluaran)}</div>
          </div>
          <div style={{ flex: 1, padding: 14, borderRadius: 18, background: '#DDF1EF' }}>
            <div style={{ font: '600 15px/1.25 Inter, sans-serif', color: '#0E5F5C' }}>Masuk bulan ini</div>
            <div style={{ font: '800 21px/1.2 Inter, sans-serif', marginTop: 6 }}>{rupiah(keuangan.pemasukan)}</div>
          </div>
        </div>
      )}

      {tab === 'kerja' && <DaftarKerja data={kerja} />}
      {tab === 'belanja' && <DaftarBelanja data={belanja} />}
      {tab === 'pemasukan' && <DaftarPemasukan data={pemasukan} />}
    </div>
  );
}

function Kosong({ teks }: { teks: string }) {
  return (
    <div className="p-kosong" style={{ padding: '24px 16px' }}>
      <div className="p-kosong-ikon">
        <IconP name="riwayat" size={28} />
      </div>
      <div style={{ font: '700 17px/1.35 Inter, sans-serif' }}>{teks}</div>
    </div>
  );
}

function Memuat() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} aria-busy="true">
      <div className="p-skel" style={{ height: 68, borderRadius: 16 }} />
      <div className="p-skel" style={{ height: 68, borderRadius: 16 }} />
    </div>
  );
}

function DaftarKerja({ data }: { data: KelompokHari<CatatanKerja>[] | null }) {
  if (!data) return <Memuat />;
  if (data.length === 0) return <Kosong teks="Belum ada catatan kerja." />;
  return (
    <>
      {data.map((grup) => (
        <div key={grup.tanggal} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="p-day">{grup.label}</h2>
          {grup.items.map((a) => {
            const g = GAYA_KERJA[a.jenis];
            return (
              <div key={a.id} className="p-rowr">
                <span className="p-rowr-ikon" style={{ background: g.bg, color: g.fg }}>
                  <IconP name={g.ikon} size={28} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '800 18px/1.25 Inter, sans-serif' }}>{a.label}</div>
                  <div style={{ font: '500 15px/1.3 Inter, sans-serif', color: '#46524A' }}>
                    Pukul {jam(a.waktu)}
                    {a.catatan ? ` · ${a.catatan}` : ''}
                  </div>
                </div>
                <span style={{ font: '800 18px/1 Inter, sans-serif', whiteSpace: 'nowrap' }}>
                  {a.jumlah} {a.satuan}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

function DaftarBelanja({ data }: { data: KelompokHari<CatatanBelanja>[] | null }) {
  if (!data) return <Memuat />;
  if (data.length === 0) return <Kosong teks="Belum ada catatan belanja." />;
  return (
    <>
      {data.map((grup) => (
        <div key={grup.tanggal} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="p-day">{grup.label}</h2>
          {grup.items.map((b) => {
            const g = GAYA_BELANJA[b.kategori];
            return (
              <div key={b.id} className="p-rowr">
                <span className="p-rowr-ikon" style={{ background: g.bg, color: g.fg }}>
                  <IconP name={g.ikon} size={28} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '800 18px/1.25 Inter, sans-serif' }}>{b.nama}</div>
                  <div style={{ font: '500 15px/1.3 Inter, sans-serif', color: '#46524A' }}>{g.label}</div>
                </div>
                <span style={{ font: '800 18px/1 Inter, sans-serif', color: 'var(--p-cokelat)', whiteSpace: 'nowrap' }}>
                  {rupiah(b.harga)}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

function DaftarPemasukan({ data }: { data: KelompokHari<CatatanPemasukan>[] | null }) {
  if (!data) return <Memuat />;
  if (data.length === 0) return <Kosong teks="Belum ada catatan pemasukan." />;
  return (
    <>
      {data.map((grup) => (
        <div key={grup.tanggal} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="p-day">{grup.label}</h2>
          {grup.items.map((p) => {
            const [sumber, ...sisa] = (p.keterangan ?? 'Pemasukan').split(' · ');
            return (
              <div key={p.id} className="p-rowr">
                <span className="p-rowr-ikon" style={{ background: '#DDF1EF', color: '#0E5F5C' }}>
                  <IconP name="uang" size={28} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '800 18px/1.25 Inter, sans-serif' }}>{sumber}</div>
                  {sisa.length > 0 && (
                    <div style={{ font: '500 15px/1.3 Inter, sans-serif', color: '#46524A' }}>{sisa.join(' · ')}</div>
                  )}
                </div>
                <span style={{ font: '800 18px/1 Inter, sans-serif', color: '#0E5F5C', whiteSpace: 'nowrap' }}>
                  {rupiah(p.nominal)}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
