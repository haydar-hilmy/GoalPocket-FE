import { Controller, useForm, useWatch } from "react-hook-form";
import { Button } from "../button/Button";
import { Icon } from "../icons/icons";
import { DropDownInput, MainInput, RupiahInput } from "../input/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONFIG } from "../../config/Config";
import { PostTarget } from "../../data/Api";
import Swal from "sweetalert2";

const RencanaFormModal = ({
  isShow = false,
  onClose,
  onSubmit,
  title = "Modal Title",
}) => {
  const { handleSubmit, control, getValues, reset, watch } = useForm({
    mode: "onSubmit",
  });

  const selectedFreq = useWatch({ control, name: "incomeFrequency" });
  const [isModalShow, setIsModalShow] = useState(isShow);

  useEffect(() => {
    setIsModalShow(isShow);
  }, [isShow]);

  // FETCH DRAFT FORM RENCANA
  useEffect(() => {
    const storedDraftRencana = sessionStorage.getItem(CONFIG.DRAFT_RENCANA);

    if (storedDraftRencana) {
      try {
        const parsedData = JSON.parse(storedDraftRencana);
        if (parsedData) {
          reset(parsedData);
        }
      } catch (error) {
        console.error("Gagal parsing user data dari localStorage:", error);
      }
    }
  }, [reset]);

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleClose = () => {
    const values = getValues();
    const isAnyFieldFilled = Object.values(values).some(
      (val) => val !== undefined && val !== null && val !== ""
    );

    setIsModalShow(false);

    if (isAnyFieldFilled) {
      toast.info("Data tersimpan sementara. Anda bisa lanjut nanti!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      sessionStorage.setItem(CONFIG.DRAFT_RENCANA, JSON.stringify(values));
    } else {
      sessionStorage.removeItem(CONFIG.DRAFT_RENCANA);
    }

    onClose?.();
  };

  const onFormSubmit = async (data) => {
    setIsBtnLoading(true);

    const dataTarget = {
      name: data?.target ?? "",
      duration: `${data?.duration ?? 0} ${
        data?.incomeFrequency === "yearly" ? "tahun" : "bulan"
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
    } catch (error) {
      Swal.fire({
        title: "Gagal Menyimpan Rencana",
        text: "Terjadi kesalahan saat menyimpan rencana. Silakan coba lagi.",
        icon: "error",
      });
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <div
      className={`${isModalShow ? "block" : "hidden"}
    absolute
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
            name="target"
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
                text="Target"
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
                  { value: "yearly", label: "Tahunan" },
                  { value: "monthly", label: "Bulanan" },
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
                  selectedFreq === "yearly" ? "tahun" : "bulan"
                }`,
            }}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                autofocus={true}
                errorMsg={fieldState.error?.message || ""}
                placeholder={`Misal: 6 untuk 6 ${
                  selectedFreq === "yearly" ? "tahun" : "bulan"
                }`}
                text={`Durasi Menabung (dalam ${
                  selectedFreq === "yearly" ? "tahun" : "bulan"
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
                  name="initialSavibf"
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
                    selectedFreq == "yearly" ? "tahun" : "bulan"
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
                  text="Jumlah Target"
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
            text={"Buat"}
          />
        </form>
      </div>
    </div>
  );
};

export default RencanaFormModal;
