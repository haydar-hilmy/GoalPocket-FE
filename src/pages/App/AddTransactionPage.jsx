import AppLayout from "../../layouts/AppLayout";
import { InOutComeInput } from "../../components/input/Input";

const AddTranscationPage = () => {
  const incomeCategories = ["Pesangon", "Gaji", "Korupsi", "Angpao"];
  const expenseCategories = [
    "Transportasi",
    "Makanan&Minuman",
    "Healing",
    "Self Reward",
    "Bisnis",
    "Other ..."
  ];

  const handleIncomeSubmit = (data) => {
    console.log("Pemasukan:", data);
    //tambahkan fungsi API disini
  };

  const handleExpenseSubmit = (data) => {
    console.log("Pengeluaran:", data);
    //tambahkan fungsi API disini
  };

  return (
    <AppLayout
      title="Add"
      page="Menambahkan"
      subtitle="Tambah Pemasukan dan Pengeluaran Anda"
    >
      <div className="flex flex-col items-center gap-6 px-4">
        <InOutComeInput
          title="Tambah Pemasukan"
          categories={incomeCategories}
          onSubmit={handleIncomeSubmit}
        />
        <InOutComeInput
          title="Tambah Pengeluaran"
          categories={expenseCategories}
          onSubmit={handleExpenseSubmit}
        />
      </div>
    </AppLayout>
  );
};

export default AddTranscationPage;
