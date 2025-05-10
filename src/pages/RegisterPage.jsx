import { Link } from "react-router-dom";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const onFormSubmit = (data) => {
    alert(`username: ${data.username}\nemail: ${data.email}\npassword: ${data.password}`);
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
        <MainInput
          autofocus={true}
          name="username"
          errorMsg={errors.username ? errors.username.message : ""}
          placeholder="misal: johndoe"
          text="Nama Pengguna"
          hook_form={register("username", {
            required: "Nama pengguna wajib diisi",
          })}
        />
        <MainInput
          name="email"
          errorMsg={errors.email ? errors.email.message : ""}
          placeholder="goalpocket@example.com"
          text="Alamat Email"
          hook_form={register("email", {
            required: "Email wajib diisi.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
              message: "Masukkan email dengan format yang benar.",
            },
          })}
        />
        <PasswordInput
          name="password"
          errorMsg={errors.password ? errors.password.message : ""}
          placeholder="********"
          text="Kata Sandi"
          hook_form={register("password", {
            required: "Kata sandi wajib diisi.",
            pattern: {
              value: /^.{8,}$/,
              message: "Kata sandi minimal terdiri dari 8 karakter",
            },
          })}
        />
        <PasswordInput
          name="passwordconfirm"
          errorMsg={
            errors.passwordconfirm ? errors.passwordconfirm.message : ""
          }
          placeholder="********"
          text="Konfirmasi Kata Sandi"
          hook_form={register("passwordconfirm", {
            required: "Konfirmasi kata sandi.",
            validate: (value) => value === password || "Konfirmasi kata sandi belum sama",
          })}
        />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Toggle
              hook_form={register("isAgree", { required: "Harus setuju" })}
              name="isAgree"
            />
            <small className="text-[0.9rem]" style={{ lineHeight: "100%" }}>
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

        <Button type="submit" text="Daftar Akun" isLoading={false} />
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
