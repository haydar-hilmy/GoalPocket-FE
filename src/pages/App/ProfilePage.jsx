import { Controller, useForm } from "react-hook-form";
import {
  CountrySearchSelectInput,
  MainInput,
  PhoneNumberInput,
} from "../../components/input/Input";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import Swal from "sweetalert2";
import { CONFIG } from "../../config/Config";
import { jwtDecode } from "jwt-decode";
import { UpdateProfile } from "../../data/Api";
import { BorderColor, DriveFileRenameOutlineOutlined } from "@mui/icons-material";

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem(CONFIG.LS_USERDATA);

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData) {
          reset(parsedData);
        }
      } catch (error) {
        console.error("Gagal parsing user data dari localStorage:", error);
      }
    }
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const cleanedPhone =
      typeof data.phoneNumber === "string"
        ? data.phoneNumber.replace(/\s+/g, "").replace(/^(\+62|62)/, "0")
        : null;

    const cleanedData = {
      ...data,
      phoneNumber: cleanedPhone,
    };

    try {
      const result = await UpdateProfile(cleanedData);

      localStorage.setItem(CONFIG.LS_USERDATA, JSON.stringify(cleanedData));

      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diubah.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.message || "Terjadi kesalahan saat mengubah data.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="Profil" page="Profil Saya">
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <div>
          <img className="w-16" src="/user/default-user.png" alt="" />
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#F5F5FC] p-5 rounded-md flex flex-col gap-5 shadow-md"
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Nama wajib diisi" }}
              render={({ field }) => (
                <MainInput
                  {...field}
                  minLen={1}
                  errorMsg={errors.name?.message}
                  placeholder="misal: John Doe"
                  text="Nama"
                  autofocus={true}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email wajib diisi" }}
              render={({ field }) => (
                <MainInput
                  {...field}
                  minLen={1}
                  isDisabled={true}
                  errorMsg={errors.email?.message}
                  placeholder="goalpocket@example.com"
                  text="Alamat Email"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <PhoneNumberInput
                  {...field}
                  errorMsg={fieldState.error?.message || ""}
                  text="Nomor HP"
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <MainInput
                  {...field}
                  minLen={1}
                  errorMsg={fieldState.error?.message || ""}
                  placeholder="Contoh: Jl. Merdeka No. 123, Bandung"
                  text="Alamat"
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState }) => (
                <CountrySearchSelectInput
                  name="country"
                  hook_form={field}
                  errorMsg={fieldState.error?.message || ""}
                />
              )}
            />
            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              text={"Ubah Profil"}
            ><DriveFileRenameOutlineOutlined /></Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
