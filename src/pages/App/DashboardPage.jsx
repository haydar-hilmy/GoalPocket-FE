import {
  InOutComeBox,
  InOutComeBoxLoading
} from "../../components/box/InOutComeBox";
import AppLayout from "../../layouts/AppLayout";
import IncomeExpenseChart from "../../components/chart/InComeExpenseChart";
import { formatRupiah } from "../../utils/FormatRupiah";
import { CONFIG } from "../../config/Config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem(CONFIG.LS_KEY);

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${CONFIG.BASE_URL}/user/summary`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard summary");

      const result = await res.json();
      setSummary(result);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal mengambil data summary"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <AppLayout title="Dashboard App" page="dashboard">
      <div className="w-full px-4 md:px-10 py-6">
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
                number={formatRupiah(summary.totalIncome)}
                type="income"
              />
              <InOutComeBox
                title="Total Pengeluaran"
                number={formatRupiah(summary.totalExpense)}
                type="expense"
              />
              <InOutComeBox
                title="Tabungan Saat Ini"
                number={formatRupiah(summary.currentSaving)}
                type="saving"
              />
              <InOutComeBox
                title="Rata-rata Pemasukan"
                number={formatRupiah(summary.avgIncome)}
                type="avgIncome"
              />
              <InOutComeBox
                title="Rata-rata Pengeluaran"
                number={formatRupiah(summary.avgExpense)}
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
        <IncomeExpenseChart token={token} />
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
