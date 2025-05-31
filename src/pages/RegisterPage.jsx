import { Link, useNavigate } from "react-router-dom";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../data/Api";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors, isValid }
  } = useForm({
    mode: "onSubmit"
  });

  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");

  const navigate = useNavigate();

  const onFormSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });

      Swal.fire({
        icon: "success",
        title: "Pendaftaran berhasil!",
        text: response.message || "Akun berhasil dibuat. Silahkan login",
        confirmButtonColor: "#3805d6",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/login");
      });

      console.log(response.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran gagal",
        text: error.message || "Gagal membuat akun. Silahkan coba lagi",
        confirmButtonColor: "#d33"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout type="Buat Akun">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">
          Daftar
        </h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Buat akun baru dengan detail pribadi Anda.
        </h4>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Nama pengguna wajib diisi"
          }}
          render={({ field, fieldState }) => (
            <MainInput
              {...field}
              autofocus={true}
              errorMsg={fieldState.error?.message || ""}
              placeholder="misal: johndoe"
              text="Nama Pengguna"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email wajib diisi.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
              message: "Masukkan email dengan format yang benar."
            }
          }}
          render={({ field, fieldState }) => (
            <MainInput
              {...field}
              errorMsg={fieldState.error?.message || ""}
              placeholder="goalpocket@example.com"
              text="Alamat Email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Kata sandi wajib diisi.",
            pattern: {
              value: /^.{8,}$/,
              message: "Kata sandi minimal terdiri dari 8 karakter"
            }
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              errorMsg={fieldState.error?.message || ""}
              placeholder="********"
              text="Kata Sandi"
              isLevelBar={true}
            />
          )}
        />
        <Controller
          name="passwordconfirm"
          control={control}
          rules={{
            required: "Konfirmasi kata sandi.",
            validate: (value) =>
              value === password || "Konfirmasi kata sandi belum sama"
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              errorMsg={fieldState.error?.message || ""}
              placeholder="********"
              text="Konfirmasi Kata Sandi"
              isLevelBar={false}
            />
          )}
        />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Toggle
              hook_form={register("isAgree", { required: "Harus setuju" })}
              name="isAgree"
            />
            <small className="text-[0.9rem]" style={{ lineHeight: "150%" }}>
              Saya setuju dengan{" "}
              <Link to="#" className="text-primary hover:text-blue-300">
                Kebijakan privasi
              </Link>{" "}
              dan{" "}
              <Link to="#" className="text-primary hover:text-blue-300">
                Syarat ketentuan
              </Link>
            </small>
          </div>
        </div>
        <Button
          type="submit"
          text="Daftar Akun"
          isDisabled={isLoading}
          isLoading={isLoading}
        />
        <span className="text-[0.9rem] text-center">
          Sudah punya akun?{" "}
          <Link className="text-primary hover:text-blue-300" to={"/login"}>
            Masuk sekarang
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
