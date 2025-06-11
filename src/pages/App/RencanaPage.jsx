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
import { GetAllTargets, GetUserProfile } from "../../data/Api";
import RencanaCardEmptyState from "../../components/alertBox/RencanaCardEmpty";
import { toast } from "react-toastify";

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

  const handleComplete = async (item) => {
    const confirmation = await Swal.fire({
      title: `Selesaikan Target?`,
      html: `Apakah kamu yakin ingin menandai <strong>"${item.name}"</strong> sebagai selesai?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const token = localStorage.getItem(CONFIG.LS_KEY);
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      const response = await fetch(
        `${CONFIG.BASE_URL}/targets/${item.id}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Gagal menyelesaikan target.");
      }

      toast.success(`🎉 Target "${item.name}" telah diselesaikan!`);
      localStorage.removeItem(CONFIG.TARGETS_DATA);
      fetchTargets();
    } catch (error) {
      console.error("Error saat menyelesaikan target:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyelesaikan Target",
        text: error.message || "Terjadi kesalahan saat menyelesaikan target.",
        confirmButtonText: "OK",
      });
    }
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

  const checkTargetIsComplete = async () => {
    try {
      const summary = await GetUserProfile();
      const currentSaving = summary?.currentSaving ?? 0;

      // Filter target yang sudah tercapai
      const completedTargets = rencanaList.filter(
        (r) => !r.isCompleted && currentSaving >= r.targetAmount
      );

      if (completedTargets.length > 0) {
        const title =
          completedTargets.length === 1
            ? `🎯 Target "${
                completedTargets[0].title || completedTargets[0].name
              }" bisa diselesaikan!`
            : `🎯 ${completedTargets.length} target bisa diselesaikan!`;

        const body = completedTargets
          .slice(0, 3)
          .map((r) => `• ${r.title || r.name || r.nama}`)
          .join("\n");

        toast.success(`${title}\n${body}`, {
          duration: 7000,
        });
      }
    } catch (error) {
      console.error("Error while [Check Target Is Complete]: ", error);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  useEffect(() => {
    if (rencanaList.length > 0) {
      checkTargetIsComplete();
    }
  }, [rencanaList]);

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
      {isLoading ? (
        <RencanaCardContainer>
          <RencanaCardLoading cardTotal={4} />
        </RencanaCardContainer>
      ) : rencanaList.length === 0 ? (
        <div className="py-10">
          <RencanaCardEmptyState />
        </div>
      ) : (
        <RencanaCardContainer>
          {rencanaList.map((item, index) => (
            <RencanaCard
              key={index}
              data={item}
              onEdit={() => handleEdit(item)}
              onComplete={() => handleComplete(item)}
            />
          ))}
        </RencanaCardContainer>
      )}
    </AppLayout>
  );
};

export default RencanaPage;
