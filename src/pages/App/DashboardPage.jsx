import { InOutComeBox } from "../../components/box/InOutComeBox";
import AppLayout from "../../layouts/AppLayout";
import IncomeExpenseChart from "../../components/chart/InComeExpenseChart";

const DashboardPage = () => {
  return (
    <AppLayout title="Dashboard App" page="dashboard">
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
        <InOutComeBox title="Total Pemasukan" number="Rp 500.000" />
        <InOutComeBox title="Total Pengeluaran" number="Rp 100.000" />
      </div>

      <IncomeExpenseChart />
    </AppLayout>
  );
};

export default DashboardPage;
