import {
  InOutComeBox,
  InOutComeBoxLoading,
} from "../../components/box/InOutComeBox";
import AppLayout from "../../layouts/AppLayout";
import IncomeExpenseChart from "../../components/chart/InComeExpenseChart";
import { formatRupiah } from "../../utils/FormatRupiah";
import { CONFIG } from "../../config/Config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  PredictedBalanceBox,
  PredictedBalanceBoxLoading,
} from "../../components/box/PredictBalanceBox";
import { getDailyIncomeExpenses } from "../../utils/GetDailyIncomeExpenses";
import dayjs from "dayjs";
import { FetchPredictAPI } from "../../data/FetchPredict";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictResult, setPredictResult] = useState([]);

  const token = localStorage.getItem(CONFIG.LS_KEY);

  const fetchPredict = async () => {
    setLoading(true);
    let errorMessage = "Gagal mengambil hasil prediksi";
    try {
      // FETCH PERTAMA - SUMMARY
      const responSummary = await fetch(`${CONFIG.BASE_URL}/user/summary`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!responSummary.ok) {
        errorMessage = "Gagal mengambil data ringkasan dashboard";
        throw new Error(errorMessage);
      }

      const resultSummary = await responSummary.json();
      setSummary(resultSummary);

      // FETCH KEDUA - PREDICT
      const resultFetchPredict = await FetchPredictAPI(resultSummary);
      if (!Array.isArray(resultFetchPredict.prediction)) {
        // Jika backend tidak mengembalikan nilai prediksi, handle manual
        setPredictResult([
          "Rp 0",
          "Rp 0",
          "Rp 0",
          "Rp 0",
          "Rp 0",
          "Rp 0",
          "Rp 0",
        ]);
        // errorMessage = "Gagal menampilkan hasil prediksi";
        // throw new Error(errorMessage);
      } else {

         // Jika berhasil
        setPredictResult(resultFetchPredict.prediction);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredict();
  }, []);

  return (
    <AppLayout title="Dashboard App" page="dashboard">
      <div className="w-full px-4 md:px-10 py-6">
        {loading ? (
          <PredictedBalanceBoxLoading />
        ) : (
          <PredictedBalanceBox predictions={predictResult} />
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {loading ? (
            <>
              <InOutComeBoxLoading />
              <InOutComeBoxLoading />
              <InOutComeBoxLoading />
              <InOutComeBoxLoading />
              <InOutComeBoxLoading />
            </>
          ) : (
            <>
              <InOutComeBox
                title="Total Pemasukan"
                number={formatRupiah(summary?.totalIncome ?? 0)}
                type="income"
              />
              <InOutComeBox
                title="Total Pengeluaran"
                number={formatRupiah(summary?.totalExpense ?? 0)}
                type="expense"
              />
              <InOutComeBox
                title="Tabungan Saat Ini"
                number={formatRupiah(summary?.currentSaving ?? 0)}
                type="saving"
              />
              <InOutComeBox
                title="Rata-rata Pemasukan"
                number={formatRupiah(summary?.avgIncome ?? 0)}
                type="avgIncome"
              />
              <InOutComeBox
                title="Rata-rata Pengeluaran"
                number={formatRupiah(summary?.avgExpense ?? 0)}
                type="avgOutcome"
              />
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Ringkasan Keuangan 7 Hari Terakhir
        </h2>
        <div>
          <IncomeExpenseChart token={token} />
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
