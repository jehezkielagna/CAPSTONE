import { Navigate, Route, Routes } from 'react-router-dom';
import { LayoutPetani } from './LayoutPetani';
import { Beranda } from './pages/Beranda';
import { CatatKerja } from './pages/CatatKerja';
import { CatatBelanja } from './pages/CatatBelanja';
import { CatatPemasukan } from './pages/CatatPemasukan';
import { Jadwal } from './pages/Jadwal';
import { Cuaca } from './pages/Cuaca';
import { Riwayat } from './pages/Riwayat';
import { Panduan } from './pages/Panduan';
import { Bantuan } from './pages/Bantuan';

// Website petani. Dipasang di App.tsx pada rute /petani/* dengan layout
// sendiri, terpisah dari dasbor manajemen.
export function PetaniApp() {
  return (
    <LayoutPetani>
      <Routes>
        <Route path="/petani" element={<Beranda />} />
        <Route path="/petani/catat-kerja" element={<CatatKerja />} />
        <Route path="/petani/catat-belanja" element={<CatatBelanja />} />
        <Route path="/petani/catat-pemasukan" element={<CatatPemasukan />} />
        <Route path="/petani/riwayat" element={<Riwayat />} />
        <Route path="/petani/jadwal" element={<Jadwal />} />
        <Route path="/petani/cuaca" element={<Cuaca />} />
        <Route path="/petani/panduan" element={<Panduan />} />
        <Route path="/petani/bantuan" element={<Bantuan />} />
        <Route path="*" element={<Navigate to="/petani" replace />} />
      </Routes>
    </LayoutPetani>
  );
}
