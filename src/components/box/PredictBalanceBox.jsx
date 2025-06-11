import { beautifyRupiah } from "../../utils/FormatRupiah";

export const PredictedBalanceBox = ({ predictions = [] }) => {
  // Get today's date
  const today = new Date();

  // Generate date labels for next 7 days
  const predictionWithDates = predictions.map((value, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index + 1);
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    return {
      date: formattedDate,
      value,
    };
  });

  return (
    <div className="bg-white shadow rounded-lg p-6 mx-0 md:mx-4 mb-10">
      <p className="text-gray-700 text-base mb-4 font-medium">
        Prediksi Saldo 7 Hari ke Depan
      </p>

      <div className="divide-y divide-gray-200">
        {predictionWithDates.map((item, idx) => {
          const clean = item.value.replace(/[^\d-]/g, "");
          const numeric = parseInt(clean, 10);

          const valueColor =
            numeric < 0 ? "text-red-600" : "text-green-600";

          return (
            <div
              key={idx}
              className="flex justify-between py-2 text-sm text-gray-700"
            >
              <span className="font-medium">{item.date}</span>
              <span className={`font-semibold ${valueColor}`}>
                {beautifyRupiah(item.value)}
              </span>
            </div>
          );
        })}
      </div>

      <ul className="text-sm text-gray-600 list-disc list-inside mt-4 space-y-1">
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
      <div className="w-48 h-4 bg-gray-200 rounded mb-5" />

      <div className="divide-y divide-gray-100 space-y-4 mb-4">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div className="w-20 h-3 bg-gray-200 rounded" />
            <div className="w-28 h-4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-2 mt-4">
        <div className="w-64 h-3 bg-gray-200 rounded" />
        <div className="w-60 h-3 bg-gray-200 rounded" />
        <div className="w-56 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
};
