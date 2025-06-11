import React, { useEffect, useState } from "react";
import IncomeHistoryTable, {
  IncomeHistoryTableLoading,
} from "../../components/history/IncomeHistoryTable";
import ExpenseHistoryTable, {
  ExpenseHistoryTableLoading,
} from "../../components/history/ExpenseHistoryTable";
import { GetAllTrackings } from "../../data/Api";
import { CONFIG } from "../../config/Config";
import AppLayout from "../../layouts/AppLayout";

const HistoryPage = () => {
  const [income, setIncomes] = useState([]);
  const [expense, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem(CONFIG.LS_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trackings = await GetAllTrackings(token);
        const incomeData = trackings.filter((t) => t.type === "income");
        const expenseData = trackings.filter((t) => t.type === "expense");

        setIncomes(incomeData);
        setExpenses(expenseData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteIncome = (deletedId) => {
    setIncomes((prevData) => prevData.filter((item) => item.id !== deletedId));
  };
  const handleDeleteExpenses = (deletedId) => {
    setExpenses((prevData) => prevData.filter((item) => item.id !== deletedId));
  };

  return (
    <AppLayout
      title="history"
      page="Riwayat Transaksi"
      subtitle="Riwayat Pemasukan dan Pengeluaran Anda"
    >
      <div className="p-2 max-w-6xl bg-[#F5F5FC] rounded-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Histori Pemasukan & Pengeluaran
        </h1>
        {loading ? (
          <IncomeHistoryTableLoading />
        ) : (
          <IncomeHistoryTable
            data={income}
            onDeleteSuccess={handleDeleteIncome}
          />
        )}
        {loading ? (
          <ExpenseHistoryTableLoading />
        ) : (
          <ExpenseHistoryTable
            data={expense}
            onDeleteSuccess={handleDeleteExpenses}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
