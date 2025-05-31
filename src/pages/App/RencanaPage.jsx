import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import RencanaFormModal from "../../components/modal/RencanaFormModal";
import { EventNoteOutlined } from "@mui/icons-material";
import { RencanaCard } from "../../components/card/RencanaCard";
import { CONFIG } from "../../config/Config";

const RencanaPage = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [formMode, setFormMode] = useState("create");

  const handleCreate = () => {
    sessionStorage.removeItem(CONFIG.EDIT_RENCANA);
    const storedDraft = sessionStorage.getItem(CONFIG.DRAFT_RENCANA);
    const parsedDraft = storedDraft ? JSON.parse(storedDraft) : {};

    setFormData(parsedDraft);
    setFormMode("create");
    setIsOpenFormModal(true);
  };

  const handleEdit = (item) => {
    sessionStorage.setItem(CONFIG.EDIT_RENCANA, JSON.stringify(item));
    setFormData(item);
    setFormMode("edit");
    setIsOpenFormModal(true);
  };

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
        <Button onclick={handleCreate} variant={"py-1.5"} text={"Buat Rencana"}>
          <EventNoteOutlined />
        </Button>
      </div>
      <RencanaFormModal
        title={formMode === "edit" ? "Ubah Rencana" : "Buat Rencana"}
        isShow={isOpenFormModal}
        initialData={formData}
        mode={formMode}
        onClose={() => setIsOpenFormModal(false)}
      />

      {/* RENCANA CARDs */}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {rencanaList.map((item, index) => (
          <RencanaCard
            key={index}
            data={item}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default RencanaPage;
