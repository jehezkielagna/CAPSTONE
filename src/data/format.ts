const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// Semua waktu ditampilkan dalam WIB (UTC+7), apa pun zona waktu peramban.
function keWIB(iso: string): Date {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00+07:00` : iso);
  return new Date(d.getTime() + 7 * 3600_000);
}

const dua = (n: number) => String(n).padStart(2, '0');

/** "07.52" */
export function jam(iso: string): string {
  const d = keWIB(iso);
  return `${dua(d.getUTCHours())}.${dua(d.getUTCMinutes())}`;
}

/** "Sel 3 Nov" */
export function tanggalPendek(iso: string): string {
  const d = keWIB(iso);
  return `${HARI[d.getUTCDay()]} ${d.getUTCDate()} ${BULAN[d.getUTCMonth()]}`;
}

/** "Sel, 3 Nov 2026" */
export function tanggalPanjang(iso: string): string {
  const d = keWIB(iso);
  return `${HARI[d.getUTCDay()]}, ${d.getUTCDate()} ${BULAN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "Jum, 30 Okt" */
export function tanggalKoma(iso: string): string {
  const d = keWIB(iso);
  return `${HARI[d.getUTCDay()]}, ${d.getUTCDate()} ${BULAN[d.getUTCMonth()]}`;
}

/** "Rp 1.441.000" */
export function rupiah(n: number): string {
  return `Rp ${Math.abs(n).toLocaleString('id-ID')}`;
}

/** "+Rp 1.441.000" / "−Rp 200.000" */
export function rupiahBertanda(n: number): string {
  return `${n >= 0 ? '+' : '−'}${rupiah(n)}`;
}

/** "Rp 6,2 jt" */
export function jutaan(n: number): string {
  return `Rp ${(n / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 3 })} jt`;
}

/** "18,4" */
export function desimal(n: number, digit = 1): string {
  return n.toLocaleString('id-ID', { minimumFractionDigits: digit, maximumFractionDigits: digit });
}
