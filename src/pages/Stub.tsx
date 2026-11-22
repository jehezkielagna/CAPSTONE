import { Link } from 'react-router-dom';

// Halaman sementara. Isinya menunggu hasil wawancara (lihat PRD.md).
export function Stub({ judul, catatan, mockup }: { judul: string; catatan: string; mockup?: string }) {
  return (
    <section className="card panel stub">
      <span className="badge b-amber">Menunggu validasi wawancara</span>
      <h2 className="h2" style={{ fontSize: 20 }}>{judul}</h2>
      <p className="muted" style={{ margin: 0, lineHeight: 1.5 }}>{catatan}</p>
      {mockup && <p className="src" style={{ margin: 0 }}>Rujukan rancangan: layar {mockup} pada mockup.</p>}
      <div><Link to="/" className="btn btn-s">Kembali ke Dasbor</Link></div>
    </section>
  );
}
