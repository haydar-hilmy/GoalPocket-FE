import { Controller, useForm } from "react-hook-form";
import { Button } from "../button/Button";
import { Icon } from "../icons/icons";
import { MainInput, RupiahInput } from "../input/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CONFIG } from "../../config/Config";

const RencanaFormModal = ({
  isShow = false,
  onClose,
  onSubmit,
  title = "Modal Title",
}) => {
  const { handleSubmit, control, getValues, reset } = useForm({
    mode: "onSubmit",
  });

  const [isModalShow, setIsModalShow] = useState(isShow);

  useEffect(() => {
    setIsModalShow(isShow);
  }, [isShow]);

  // FETCH DRAFT FORM RENCANA
  useEffect(() => {
    const storedDraftRencana = localStorage.getItem(CONFIG.DRAFT_RENCANA);

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
      localStorage.setItem(CONFIG.DRAFT_RENCANA, JSON.stringify(values));
    } else {
      localStorage.removeItem(CONFIG.DRAFT_RENCANA);
    }

    onClose?.();
  };

  const onFormSubmit = (data) => {
    setIsBtnLoading(true);

    // Fetch API (....) belum ada dokumentasi dari Backend (27 Mei)
    const dataRencana = {
      target: data?.target ?? "",
      harga: data?.harga ?? 0,
      tabungan_awal: data?.tabungan_awal ?? 0,
      pemasukan: data?.pemasukan ?? 0,
      pengeluaran: data?.pengeluaran ?? 0,
    };
    console.log("Sending Rencana: ", dataRencana);
    setIsBtnLoading(false);
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
            name="duration"
            control={control}
            rules={{
              required: "Durasi menabung wajib diisi.",
              validate: (value) =>
                (!isNaN(value) && Number(value) > 0) ||
                "Durasi harus berupa angka dan minimal 1 bulan",
            }}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                autofocus={true}
                errorMsg={fieldState.error?.message || ""}
                placeholder="Contoh: 6 untuk 6 bulan"
                text="Durasi Menabung (dalam bulan)"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(e);
                }}
              />
            )}
          />

          <Controller
            name="tabungan_awal"
            control={control}
            rules={{
              required: "Tabungan awal wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="tabungan_awal"
                  text="Tabungan Awal"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="harga"
            control={control}
            rules={{
              required: "Harga wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="harga"
                  text="Harga"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="pemasukan"
            control={control}
            rules={{
              required: "Pemasukan wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="pemasukan"
                  text="Pemasukan"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="pengeluaran"
            control={control}
            rules={{
              required: "Pengeluaran tetap wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="pengeluaran"
                  text="Pengeluaran Tetap"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Rp 4.000.000"
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
