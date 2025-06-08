import { formatRupiah } from "../../utils/FormatRupiah";

export const PredictedBalanceBox = ({ balance = 0 }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mx-6 mb-10">
      <p className="text-gray-700 text-base mb-4 font-medium">
        Prediksi Saldo Akhir Bulan
      </p>
      <p className="text-2xl font-bold text-black mb-2">{formatRupiah(balance)}</p>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
        <li>Perkiraan jika pengeluaran & pemasukan tetap stabil</li>
        <li>Tanpa pengeluaran besar mendadak</li>
        <li>Bisa berubah kapan saja</li>
      </ul>
    </div>
  );
};


export const PredictedBalanceBoxLoading = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mx-6 mb-10 animate-pulse">
      <div className="w-40 h-4 bg-gray-200 rounded mb-4" />
      <div className="w-32 h-6 bg-gray-300 rounded mb-3" />
      <div className="space-y-2">
        <div className="w-72 h-3 bg-gray-200 rounded" />
        <div className="w-64 h-3 bg-gray-200 rounded" />
        <div className="w-60 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
};
