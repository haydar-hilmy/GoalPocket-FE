export function formatRupiah(value) {
  if (isNaN(value)) return "Rp 0";
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}