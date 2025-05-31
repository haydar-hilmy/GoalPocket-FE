import { Controller, useForm, useWatch } from "react-hook-form";
import { Button } from "../button/Button";
import { Icon } from "../icons/icons";
import { DropDownInput, MainInput, RupiahInput } from "../input/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONFIG } from "../../config/Config";
import { DeleteTargetById, PostTarget } from "../../data/Api";
import Swal from "sweetalert2";

const RencanaFormModal = ({
  isShow = false,
  onClose,
  onSubmit,
  title = "Modal Title",
  initialData = {},
  mode = "create",
  onSuccess,
}) => {
  const { handleSubmit, control, getValues, reset, setFocus } = useForm({
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const selectedFreq = useWatch({ control, name: "incomeFrequency" });
  const freqLabelMap = {
    daily: "hari",
    weekly: "minggu",
    monthly: "bulan",
    yearly: "tahun",
  };

  const [isModalShow, setIsModalShow] = useState(isShow);

  useEffect(() => {
    setIsModalShow(isShow);
  }, [isShow]);

  // FETCH FORM
  useEffect(() => {
    reset(initialData); // update form data when modal opened
  }, [initialData, reset]);

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isBtnDeleteLoading, setIsBtnDeleteLoading] = useState(false);

  const handleClose = () => {
    const values = getValues();
    const isAnyFieldFilled = Object.values(values).some(
      (val) => val !== undefined && val !== null && val !== ""
    );

    setIsModalShow(false);

    if (mode === "create" && isAnyFieldFilled) {
      toast.info("Data tersimpan sementara. Anda bisa lanjut nanti!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      sessionStorage.setItem(CONFIG.DRAFT_RENCANA, JSON.stringify(values));
    }

    if (mode === "create" && !isAnyFieldFilled) {
      sessionStorage.removeItem(CONFIG.DRAFT_RENCANA);
    }

    initialData = {};
    reset(initialData);

    onClose?.();
  };

  const onFormSubmit = async (data) => {
    setFocus("target");
    setIsBtnLoading(true);

    const dataTarget = {
      name: data?.name ?? "",
      duration: `${data?.duration ?? 0} ${
        freqLabelMap[data?.incomeFrequency] ?? ""
      }`,
      initialSaving: Number(data?.initialSaving ?? 0),
      incomeFrequency: data?.incomeFrequency ?? "monthly",
      fixedIncome: Number(data?.fixedIncome ?? 0),
      isCompleted: false,
      targetAmount: Number(data?.targetAmount ?? 0),
    };

    try {
      const result = await PostTarget(dataTarget);

      Swal.fire({
        icon: "success",
        title: "Rencana Tersimpan",
        text: "Rencana menabung berhasil ditambahkan.",
        confirmButtonText: "OK",
        allowEscapeKey: true,
      });

      reset();
      sessionStorage.removeItem(CONFIG.DRAFT_RENCANA);
      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      const errorMsg =
        error.message || "Terjadi kesalahan saat menyimpan rencana.";

      const lowerMsg = errorMsg.toLowerCase();
      if (
        lowerMsg.includes("name") ||
        lowerMsg.includes("nama") ||
        lowerMsg.includes("target")
      ) {
        setFocus("target");
      }

      Swal.fire({
        title: "Gagal Menyimpan Rencana",
        text: errorMsg,
        icon: "error",
      });
    } finally {
      setIsBtnLoading(false);
    }
  };

  const handleDelete = async () => {
    const targetId = initialData?.id;

    if (!targetId) {
      Swal.fire("Gagal", "ID target tidak ditemukan.", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data tidak bisa dikembalikan setelah dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      setIsBtnDeleteLoading(true);

      await DeleteTargetById(targetId);

      Swal.fire({
        icon: "success",
        title: "Rencana Dihapus",
        text: "Rencana berhasil dihapus.",
        confirmButtonText: "OK",
      });

      sessionStorage.removeItem(CONFIG.EDIT_RENCANA);
      if (onSuccess) onSuccess();
      reset();
      handleClose();
    } catch (error) {
      Swal.fire("Gagal Menghapus", error.message, "error");
    } finally {
      setIsBtnDeleteLoading(false);
    }
  };

  return (
    <div
      className={`${isModalShow ? "block" : "hidden"}
    fixed
    top-0
    left-0
    w-screen
    h-screen
    overflow-y-auto
    flex
    flex-col
    justify-start
    py-16
    items-center
    z-[200]
    bg-[rgba(0,0,0,0.3)]
    duration-200
    `}
      onClick={() => handleClose()}
    >
      <div
        className="bg-white p-8 w-11/12 rounded-md sm:w-4/6 md:w-1/2 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center">
          <div className="flex-1 flex justify-start sm:justify-center">
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div>
            <div
              title="Tutup"
              onClick={() => handleClose()}
              className="p-2.5 cursor-pointer rounded-sm bg-white w-fit h-fit duration-75 hover:bg-gray-100"
            >
              <Icon.Cross />
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Nama target wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                autofocus={true}
                errorMsg={fieldState.error?.message || ""}
                placeholder="Contoh: Liburan ke Raja Ampat"
                text="Nama Rencana"
              />
            )}
          />

          <Controller
            name="incomeFrequency"
            control={control}
            rules={{ required: "Wajib memilih salah satu opsi frekuensi." }}
            render={({ field, fieldState }) => (
              <DropDownInput
                {...field}
                hook_form={field}
                text="Frekuensi Pemasukan"
                placeholder="Pilih frekuensi pemasukan"
                errorMsg={fieldState.error?.message || ""}
                options={[
                  { value: "monthly", label: "Bulanan" },
                  { value: "weekly", label: "Mingguan" },
                  { value: "daily", label: "Harian" },
                ]}
              />
            )}
          />

          <Controller
            name="duration"
            control={control}
            rules={{
              required: "Durasi menabung wajib diisi.",
              validate: (value) =>
                (!isNaN(value) && Number(value) > 0) ||
                `Durasi harus berupa angka dan minimal 1 ${
                  freqLabelMap[selectedFreq] || "frekuensi"
                }`,
            }}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                autofocus={true}
                errorMsg={fieldState.error?.message || ""}
                placeholder={`Misal: 6 untuk 6 ${
                  freqLabelMap[selectedFreq] || "frekuensi"
                }`}
                text={`Durasi Menabung (dalam ${
                  freqLabelMap[selectedFreq] || "frekuensi"
                })`}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(e);
                }}
              />
            )}
          />

          <Controller
            name="initialSaving"
            control={control}
            rules={{
              required: "Tabungan awal wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="initialSaving"
                  text="Tabungan Awal"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Misal: Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="fixedIncome"
            control={control}
            rules={{
              required: "Pemasukan tetap wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="fixedIncome"
                  text={`Pemasukan Tetap (per ${
                    freqLabelMap[selectedFreq] || "frekuensi"
                  })`}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Misal: Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="targetAmount"
            control={control}
            rules={{
              required: "Jumlah target wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="targetAmount"
                  text="Jumlah Target Tercapai"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Misal: Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Button
            isDisabled={isBtnLoading}
            isLoading={isBtnLoading}
            text={`${mode == "create" ? "Buat" : "Ubah Rencana"}`}
          />
          {mode == "edit" ? (
            <Button
              type={"button"}
              isDisabled={isBtnDeleteLoading}
              isLoading={isBtnDeleteLoading}
              variant={"bg-warning"}
              text={`Hapus Rencana`}
              onclick={handleDelete}
            />
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default RencanaFormModal;
