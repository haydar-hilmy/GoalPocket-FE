import AppLayout from "../../layouts/AppLayout";
import {
  DropDownInput,
  InOutComeInput,
  MainInput,
  RupiahInput,
} from "../../components/input/Input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/button/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GetAllTargets, PostTracking } from "../../data/Api";
import { CONFIG } from "../../config/Config";

const AddTranscationPage = () => {
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    setFocus,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: "onSubmit",
  });

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [targetName, setTargetName] = useState([]);

  const incomeCategories = [
    { value: "Pesangon", label: "Pesangon" },
    { value: "Gaji", label: "Gaji" },
    { value: "Angpao", label: "Angpao" },
    { value: "Other", label: "Other" },
  ];

  const expenseCategories = [
    { value: "Transportasi", label: "Transportasi" },
    { value: "Makanan&Minuman", label: "Makanan & Minuman" },
    { value: "Healing", label: "Healing" },
    { value: "Self Reward", label: "Self Reward" },
    { value: "Bisnis", label: "Bisnis" },
    { value: "Other", label: "Other" },
  ];

  const transactionType = watch("transactionType");

  const categoryOptions =
    transactionType === "income"
      ? incomeCategories
      : transactionType === "expense"
      ? expenseCategories
      : [];

  const fetchTracking = async () => {
    try {
      const localData = localStorage.getItem(CONFIG.TARGETS_DATA);

      if (localData) {
        const parsedData = JSON.parse(localData);
        const nameOptions = parsedData.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        setTargetName(nameOptions);
        return;
      }

      const targets = await GetAllTargets();

      localStorage.setItem(CONFIG.TARGETS_DATA, JSON.stringify(targets));

      const nameOptions = targets.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setTargetName(nameOptions);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengambil Data",
        text: err.message || "Terjadi kesalahan saat mengambil data rencana.",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchTracking();
  }, []);

  useEffect(() => {
    if (targetName && targetName.length === 0) {
      setError("targetName", {
        type: "manual",
        message: "Silakan buat rencana terlebih dahulu.",
      });
    } else {
      clearErrors("targetName");
    }
  }, [targetName, setError, clearErrors]);

  const onFormSubmit = async (data) => {
    try {
      setIsBtnLoading(false);

      const dataTracking = {
        targetName: data?.targetName ?? "",
        type: data?.transactionType ?? "",
        category: data?.category ?? "",
        amount: Number(data?.amount ?? 0),
        notes: data?.notes ?? "",
      };

      let result = await PostTracking(dataTracking);

      Swal.fire({
        icon: "success",
        title: "Transaksi Tersimpan",
        text: "Transaksi berhasil ditambahkan.",
        confirmButtonText: "OK",
        allowEscapeKey: true,
      });
      reset();
    } catch (error) {
      const errorMsg =
        error.message || "Terjadi kesalahan saat menyimpan transaksi.";

      Swal.fire({
        title: "Gagal Menyimpan Transaksi",
        text: errorMsg,
        icon: "error",
      });
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <AppLayout
      title="Add"
      page="Catat Transaksi"
      subtitle="Tambah Pemasukan dan Pengeluaran Anda"
    >
      <div className="w-full rounded-md p-5 bg-[#F5F5FC] shadow-md">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Controller
            name="targetName"
            control={control}
            rules={{
              required: "Wajib memilih target",
            }}
            render={({ field, fieldState }) => (
              <DropDownInput
                {...field}
                hook_form={field}
                isDisabled={targetName && targetName.length === 0 ? true : false}
                text="Nama Target"
                placeholder="Pilih target"
                errorMsg={fieldState.error?.message || ""}
                options={targetName}
              />
            )}
          />

          <Controller
            name="transactionType"
            control={control}
            rules={{
              required: "Wajib memilih salah satu opsi tipe transaksi.",
            }}
            render={({ field, fieldState }) => (
              <DropDownInput
                {...field}
                hook_form={field}
                text="Tipe Transaksi"
                placeholder="Pilih tipe"
                errorMsg={fieldState.error?.message || ""}
                options={[
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Outcome" },
                ]}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{
              required: "Wajib memilih salah satu kategori.",
            }}
            render={({ field, fieldState }) => (
              <DropDownInput
                {...field}
                isDisabled={!transactionType}
                hook_form={field}
                text="Kategori"
                placeholder="Pilih kategori"
                errorMsg={fieldState.error?.message || ""}
                options={categoryOptions}
              />
            )}
          />

          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Jumlah transaksi wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <>
                <RupiahInput
                  name="amount"
                  text="Jumlah Transaksi"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Misal: Rp 4.000.000"
                  errorMsg={fieldState.error?.message || ""}
                />
              </>
            )}
          />

          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                errorMsg={fieldState.error?.message || ""}
                placeholder="Contoh: THR Bulanan"
                text="Catatan Transaksi"
              />
            )}
          />

          <Button
            isDisabled={isBtnLoading || targetName && targetName.length === 0 ? true : false}
            isLoading={isBtnLoading}
            text="Tambah Transaksi"
          />
        </form>
      </div>
    </AppLayout>
  );
};

export default AddTranscationPage;
