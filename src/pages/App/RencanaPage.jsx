import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import RencanaFormModal from "../../components/modal/RencanaFormModal";
import { EventNoteOutlined } from "@mui/icons-material";
import { RencanaCard } from "../../components/card/RencanaCard";

const RencanaPage = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);

  const rencanaList = [
    {
      name: "Ikut Seminar di Konoha",
      targetAmount: 8000000,
      duration: "6 bulan",
      initialSaving: 2000000,
      incomeFrequency: "monthly",
      fixedIncome: 500000,
    },
    {
      name: "Liburan ke Jepang",
      targetAmount: 15000000,
      duration: "12 bulan",
      initialSaving: 1000000,
      incomeFrequency: "monthly",
      fixedIncome: 1000000,
    },
    {
      name: "Beli Laptop Baru",
      targetAmount: 10000000,
      duration: "4 bulan",
      initialSaving: 2500000,
      incomeFrequency: "monthly",
      fixedIncome: 750000,
    },
    {
      name: "Beli Laptop Baru",
      targetAmount: 10000000,
      duration: "4 bulan",
      initialSaving: 2500000,
      incomeFrequency: "monthly",
      fixedIncome: 750000,
    },
    {
      name: "Beli Laptop Baru",
      targetAmount: 10000000,
      duration: "4 bulan",
      initialSaving: 2500000,
      incomeFrequency: "monthly",
      fixedIncome: 750000,
    },
  ];

  return (
    <AppLayout
      page="Rencana Penabungan"
      subtitle="Investment Plan"
      title="Rencana Penabungan"
    >
      <div className="w-full flex flex-col items-end">
        <Button
          onclick={() => setIsOpenFormModal(true)}
          variant={"py-1.5"}
          text={"Buat Rencana"}
        >
          <EventNoteOutlined />
        </Button>
      </div>
      <RencanaFormModal
        title="Buat Rencana"
        isShow={isOpenFormModal}
        onClose={() => setIsOpenFormModal(false)}
      />

      {/* RENCANA CARDs */}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {rencanaList.map((item, index) => (
          <RencanaCard key={index} data={item} />
        ))}
      </div>
    </AppLayout>
  );
};

export default RencanaPage;
