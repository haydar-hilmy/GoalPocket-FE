export function formatRupiah(value) {
  if (isNaN(value)) return "Rp 0";
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

export const beautifyRupiah = (value) => {
  if (!value) return "Rp0";
  const clean = value.replace(/[^\d-]/g, "");
  const number = parseInt(clean, 10);
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.abs(number));
  return number < 0 ? `- ${formatted}` : formatted;
};