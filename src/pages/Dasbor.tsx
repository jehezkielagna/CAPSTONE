import { Link } from 'react-router-dom';
import { Icon, type NamaIkon } from '../components/Icon';
import { FinanceChart, Legenda } from '../components/FinanceChart';
import { FITUR } from '../config';
import type { DataDasbor, JenisAktivitas, StatusJadwal } from '../data/types';
import { desimal, jam, rupiah, rupiahBertanda, tanggalKoma, tanggalPendek } from '../data/format';

const GAYA_AKTIVITAS: Record<JenisAktivitas, { icon: NamaIkon; bg: string; fg: string }> = {
  penyiraman: { icon: 'tetes', bg: '#E7EFFA', fg: '#1A4F8C' },
  panen: { icon: 'keranjang', bg: '#FBE9E6', fg: '#9E2A1C' },
  pemangkasan: { icon: 'gunting', bg: '#E6F2E7', fg: '#1F5A27' },
  pemupukan: { icon: 'karung', bg: '#FFF1CC', fg: '#6E4600' },
  penyemprotan: { icon: 'semprot', bg: '#DDF1EF', fg: '#0E5F5C' },
  lainnya: { icon: 'titik', bg: '#EEF1ED', fg: '#46524A' },
};

function badgeJadwal(status: StatusJadwal, selisih: number): { kelas: string; teks: string } {
  switch (status) {
    case 'terlambat':
      return { kelas: 'b-red', teks: `Terlambat ${Math.abs(selisih)} hari` };
    case 'hari-ini':
      return { kelas: 'b-green', teks: 'Hari ini' };
    case 'besok':
      return { kelas: 'b-amber', teks: 'Besok' };
    default:
      return { kelas: 'b-gray', teks: `${selisih} hari lagi` };
  }
}

function selisihHari(dariIso: string, keIso: string): number {
  const a = new Date(`${dariIso.slice(0, 10)}T00:00:00+07:00`).getTime();
  const b = new Date(`${keIso.slice(0, 10)}T00:00:00+07:00`).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function Dasbor({ data, greenhouse }: { data: DataDasbor; greenhouse: string }) {
  const bulanIni = data.keuangan[data.keuangan.length - 1];
  const selisih = bulanIni ? bulanIni.pemasukan - bulanIni.pengeluaran : 0;
  const totalAktivitas = Object.values(data.aktivitas7Hari).reduce((a, b) => a + b, 0);
  const rincianAktivitas =
    greenhouse === 'semua'
      ? data.greenhouses.map((g) => `${g.id}: ${data.aktivitas7Hari[g.id]}`).join(' · ')
      : `${greenhouse}: ${data.aktivitas7Hari[greenhouse as keyof typeof data.aktivitas7Hari]}`;
  const terlambat = data.jadwal.filter((j) => j.status === 'terlambat').length;
  const belum = data.belumMencatat;

  return (
    <div className="dasbor">
      <div className="src update-mobile">
        <span className="dot-hijau" />Data Dr. Greenhouse diperbarui {jam(data.diperbaruiDrGreenhouse)} WIB · {tanggalPendek(data.diperbaruiDrGreenhouse).replace(' ', ', ')}
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="card kpi">
          <div className="kl"><Icon name="log" style={{ color: '#1F5A27' }} /><span className="kl-desktop">Aktivitas tercatat · 7 hari</span><span className="kl-mobile">Aktivitas · 7 hari</span></div>
          <div className="kv">{totalAktivitas}</div>
          <div className="src ks"><span className="kl-desktop">{rincianAktivitas}</span><span className="kl-mobile">dari {greenhouse === 'semua' ? data.greenhouses.length : 1} greenhouse</span></div>
        </div>

        <div className={`card kpi${belum.length ? ' kpi-alert' : ''}`}>
          <div className="kl"><Icon name="orang" style={{ color: '#9E2A1C' }} /><span className="kl-desktop">Petani belum mencatat</span><span className="kl-mobile">Belum mencatat</span></div>
          <div className="kv" style={{ color: belum.length ? '#9E2A1C' : undefined }}>{belum.length} petani</div>
          <div className="src ks">
            {belum.length === 0 && 'Semua petani sudah mencatat'}
            {belum.length > 0 && (
              <>
                <span className="kl-desktop">{belum.map((p) => `${p.petani} (${p.greenhouse}) · terakhir ${tanggalKoma(p.terakhirMencatat)}`).join('; ')}</span>
                <span className="kl-mobile">{belum.map((p) => `${p.petani} · ${selisihHari(p.terakhirMencatat, data.hariIni)} hari`).join('; ')}</span>
              </>
            )}
          </div>
        </div>

        <div className="card kpi kpi-uang">
          <div className="kl"><Icon name="dompet" style={{ color: '#1F5A27' }} /><span className="kl-desktop">Selisih November (berjalan)</span><span className="kl-mobile">Selisih November</span></div>
          <div className="kv">{rupiahBertanda(selisih)}</div>
          <div className="src ks">
            <span className="kl-desktop">Masuk {rupiah(bulanIni?.pemasukan ?? 0)} · Keluar {rupiah(bulanIni?.pengeluaran ?? 0)}</span>
            <span className="kl-mobile">{bulanIni?.catatan} (berjalan)</span>
          </div>
        </div>

        <div className="card kpi">
          <div className="kl"><Icon name="kalender" style={{ color: '#6E4600' }} /><span className="kl-desktop">Jadwal mendekati target</span><span className="kl-mobile">Jadwal dekat target</span></div>
          <div className="kv">{data.jadwal.length}<span className="kl-desktop"> kegiatan</span></div>
          <div className="src ks" style={{ color: terlambat ? '#9E2A1C' : undefined, fontWeight: 600 }}>
            {terlambat ? <>{terlambat} terlambat<span className="kl-desktop"> dari tanggal target</span></> : 'Tidak ada yang terlambat'}
          </div>
        </div>
      </div>

      {/* Grafik + Macroclimate */}
      <div className="grid12">
        <section className="card panel col-8 area-keuangan">
          <div className="panel-head">
            <h2 className="h2" style={{ flex: 1 }}>
              <span className="kl-desktop">Pemasukan dan pengeluaran per bulan</span>
              <span className="kl-mobile">Keuangan per bulan</span>
            </h2>
            <span className="legenda-desktop"><Legenda /></span>
            <Link to="/keuangan" className="tautan" style={{ marginLeft: 8 }}>Rekap P&amp;L</Link>
          </div>
          <FinanceChart data={data.keuangan} />
          <div className="legenda-mobile"><Legenda catatan={bulanIni?.catatan} /></div>
        </section>

        <section className="card panel col-4 area-cuaca">
          <div className="panel-head">
            <h2 className="h2" style={{ flex: 1 }}><span className="kl-desktop">Macroclimate hari ini</span><span className="kl-mobile">Macroclimate</span></h2>
            <Link to="/macroclimate" className="tautan">Detail</Link>
          </div>
          <div className="cuaca-grid">
            <div className="cuaca bmkg">
              <Icon name="hujan" size={34} style={{ color: '#1A4F8C' }} />
              <div style={{ flex: 1 }}>
                <span className="badge b-blue badge-putih"><span className="kl-desktop">Prakiraan BMKG</span><span className="kl-mobile">BMKG</span></span>
                <div className="cuaca-nilai">
                  {data.bmkg.ringkasan}<span className="kl-desktop"> · {data.bmkg.suhuMin}–{data.bmkg.suhuMaks}°C</span>
                </div>
                <div className="src">
                  <span className="kl-desktop">{data.bmkg.wilayah} · terbit {jam(data.bmkg.terbit)} WIB</span>
                  <span className="kl-mobile">{data.bmkg.suhuMin}–{data.bmkg.suhuMaks}°C · terbit {jam(data.bmkg.terbit)}</span>
                </div>
              </div>
            </div>
            <div className="cuaca aws">
              <Icon name="termometer" size={34} style={{ color: '#0E5F5C' }} />
              <div style={{ flex: 1 }}>
                <span className="badge b-teal badge-putih"><span className="kl-desktop">Pengamatan AWS</span><span className="kl-mobile">AWS</span></span>
                <div className="cuaca-nilai">
                  {desimal(data.aws.suhu)}°C · RH {data.aws.kelembapan}%<span className="kl-desktop"> · hujan {desimal(data.aws.curahHujan)} mm</span>
                </div>
                <div className="src">{data.aws.lokasi} · {jam(data.aws.waktu)}<span className="kl-desktop"> WIB</span></div>
              </div>
            </div>
          </div>
          {FITUR.asistenAI && (
            <Link className="btn btn-s ringkas-ai" to="/asisten-ai" style={{ width: '100%' }}>
              <Icon name="chat" />
              Minta ringkasan ke Asisten AI
            </Link>
          )}
        </section>
      </div>

      {/* Aktivitas terbaru + Jadwal */}
      <div className="grid12">
        <section className="card panel col-7 area-aktivitas" style={{ paddingBottom: 8 }}>
          <div className="panel-head" style={{ marginBottom: -6 }}>
            <h2 className="h2" style={{ flex: 1 }}>Aktivitas terbaru</h2>
            <Link to="/log-aktivitas" className="tautan">Lihat semua</Link>
          </div>
          {data.aktivitas.length === 0 ? (
            <div className="kosong">Belum ada aktivitas tercatat.</div>
          ) : (
            <table className="tabel">
              <thead>
                <tr><th>Waktu</th><th>Petani</th><th>Aktivitas</th><th>Jumlah</th></tr>
              </thead>
              <tbody>
                {data.aktivitas.map((a) => {
                  const g = GAYA_AKTIVITAS[a.jenis];
                  return (
                    <tr key={a.id}>
                      <td className="waktu">{tanggalPendek(a.waktu)} · {jam(a.waktu)}</td>
                      <td style={{ fontWeight: 600 }}>{a.petani}</td>
                      <td>
                        <span className="akt">
                          <span className="akt-ikon" style={{ background: g.bg, color: g.fg }}><Icon name={g.icon} size={16} /></span>
                          {a.label}
                        </span>
                      </td>
                      <td>{a.jumlah}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        <section className="card panel col-5 area-jadwal" style={{ gap: 10 }}>
          <div className="panel-head">
            <h2 className="h2" style={{ flex: 1 }}><span className="kl-desktop">Jadwal mendekati target</span><span className="kl-mobile">Jadwal dekat target</span></h2>
            <Link to="/jadwal-tanam" className="tautan"><span className="kl-desktop">Kelola jadwal</span><span className="kl-mobile">Kelola</span></Link>
          </div>
          {data.jadwal.length === 0 && <div className="kosong">Tidak ada kegiatan yang mendekati target.</div>}
          {data.jadwal.map((j) => {
            const b = badgeJadwal(j.status, j.selisihHari);
            return (
              <div key={j.id} className={`jadwal-item${j.status === 'terlambat' ? ' terlambat' : ''}`}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="jadwal-judul">{j.kegiatan}</div>
                  <div className="src" style={{ fontSize: 13 }}>
                    {j.greenhouse} · {j.petani} · <span className="kl-desktop">Target </span>{tanggalPendek(j.target)}
                  </div>
                </div>
                <span className={`badge ${b.kelas}`}>{b.teks}</span>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
