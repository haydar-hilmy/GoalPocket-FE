import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import RencanaFormModal from "../../components/modal/RencanaFormModal";
import { EventNoteOutlined } from "@mui/icons-material";
import {
  RencanaCard,
  RencanaCardContainer,
  RencanaCardLoading,
} from "../../components/card/RencanaCard";
import { CONFIG } from "../../config/Config";
import Swal from "sweetalert2";
import { GetAllTargets } from "../../data/Api";

const RencanaPage = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [formMode, setFormMode] = useState("create");
  const [rencanaList, setRencanaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  const fetchTargets = async () => {
    try {
      setLoading(true);
      const localData = localStorage.getItem(CONFIG.TARGETS_DATA);
      if (localData) {
        const parsedData = JSON.parse(localData);
        setRencanaList(parsedData);
        return;
      }
      const targets = await GetAllTargets();
      setRencanaList(targets);
      localStorage.setItem(CONFIG.TARGETS_DATA, JSON.stringify(targets));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengambil Data",
        text: err.message || "Terjadi kesalahan saat mengambil data rencana.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTargets();
  }, []);

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
        onSuccess={fetchTargets}
      />

      {/* RENCANA CARDs */}
      <RencanaCardContainer>
        {isLoading ? (
          <RencanaCardLoading cardTotal={4} />
        ) : (
          rencanaList.map((item, index) => (
            <RencanaCard
              key={index}
              data={item}
              onEdit={() => handleEdit(item)}
            />
          ))
        )}
      </RencanaCardContainer>
    </AppLayout>
  );
};

export default RencanaPage;
