import type { KeuanganBulanan } from '../data/types';
import { jutaan } from '../data/format';

const LANGKAH = 2_000_000;

// Grafik batang pemasukan dan pengeluaran per bulan (HTML/CSS, tanpa pustaka).
export function FinanceChart({ data }: { data: KeuanganBulanan[] }) {
  if (data.length === 0) {
    return <div className="kosong">Belum ada transaksi pada periode ini.</div>;
  }
  const tertinggi = Math.max(...data.flatMap((d) => [d.pemasukan, d.pengeluaran]));
  const batas = Math.max(LANGKAH, Math.ceil(tertinggi / LANGKAH) * LANGKAH);
  const jumlahGaris = batas / LANGKAH;
  const label = Array.from({ length: jumlahGaris + 1 }, (_, i) => batas - i * LANGKAH);
  const kolom = { gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` };
  const tinggi = (n: number) => `${(n / batas) * 100}%`;

  return (
    <div className="chart">
      <div className="chart-area">
        <div className="chart-sumbu-y" aria-hidden="true">
          {label.map((v) => (
            <span key={v}>{v === 0 ? '0' : `${v / 1_000_000} jt`}</span>
          ))}
        </div>
        <div
          className="chart-batang"
          style={{ ...kolom, backgroundSize: `100% ${100 / jumlahGaris}%` }}
          role="img"
          aria-label={data
            .map((d) => `${d.bulan}: pemasukan ${jutaan(d.pemasukan)}, pengeluaran ${jutaan(d.pengeluaran)}`)
            .join('; ')}
        >
          {data.map((d) => (
            <div key={d.bulan} className="chart-kelompok">
              <div className="bar bar-masuk" title={`Pemasukan ${jutaan(d.pemasukan)}`} style={{ height: tinggi(d.pemasukan) }} />
              <div className="bar bar-keluar" title={`Pengeluaran ${jutaan(d.pengeluaran)}`} style={{ height: tinggi(d.pengeluaran) }} />
            </div>
          ))}
        </div>
      </div>
      <div className="chart-area">
        <div className="chart-sumbu-y-spacer" />
        <div className="chart-label-x" style={kolom}>
          {data.map((d) => (
            <span key={d.bulan}>
              <span className="bulan-desktop">{d.bulan}</span>
              <span className="bulan-mobile">{d.bulan}{d.catatan ? '*' : ''}</span>
              {d.catatan && (
                <>
                  <br />
                  <span className="src bulan-desktop">{d.catatan}</span>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Legenda({ catatan }: { catatan?: string }) {
  return (
    <>
      <span className="legenda"><span className="kotak bar-masuk" />Pemasukan</span>
      <span className="legenda"><span className="kotak bar-keluar" />Pengeluaran</span>
      {catatan && <span className="src legenda-catatan">*{catatan}</span>}
    </>
  );
}
