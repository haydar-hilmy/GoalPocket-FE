import { Link } from "react-router-dom";
import { MainInput } from "../components/input/Input";

import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RecoveryPassword } from "../data/Api";
import Swal from "sweetalert2";

const RecoveryPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");

    if (rememberedEmail) {
      setValue("email", rememberedEmail);
    }
  }, [setValue]);

  const onFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      const emailUser = data.email;
      const response = await RecoveryPassword({ email: emailUser });

      if (!response.user) {
        throw new Error(
          response.message || response.error || "Email tidak ditemukan"
        );
      }

      Swal.fire({
        icon: "success",
        title: "Email Terkirim!",
        text: "Silakan cek email Anda untuk mengatur ulang kata sandi.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Email",
        text: "Terjadi kesalahan saat mengirim email. Coba lagi dalam beberapa saat.",
      });
      console.error("Error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout type="Pemulihan Akun">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">
          Pemulihan Akun
        </h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Untuk memulihkan akun Anda, masukkan email atau nama pengguna Anda
          untuk mencari akun Anda.
        </h4>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email wajib diisi.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
              message: "Masukkan email dengan format yang benar.",
            },
          }}
          render={({ field, fieldState }) => (
            <MainInput
              {...field}
              autofocus={true}
              name="email"
              errorMsg={fieldState.error?.message || ""}
              placeholder="goalpocket@example.com"
              text="Alamat Email"
            />
          )}
        />

        <Button
          isDisabled={isLoading}
          type="submit"
          text="Masuk"
          isLoading={isLoading}
        />
        <span className="text-[0.9rem] text-center">
          <Link className="text-primary hover:text-blue-300" to={"/login"}>
            Kembali
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default RecoveryPage;
