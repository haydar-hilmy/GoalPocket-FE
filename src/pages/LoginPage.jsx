import { Link } from "react-router-dom";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const onFormSubmit = (data) => {
    alert(`email: ${data.email}\npassword: ${data.password}\nisRemember: ${data.remember}`);
  };

  return (
    <AuthLayout type="Masuk ke Akun Anda">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">
          Masuk
        </h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Anda dapat masuk dengan menggunakan email terdaftar.
        </h4>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <MainInput
          autofocus={true}
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
          isLevelBar={false}
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
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Toggle hook_form={register('remember')} name="remember" />
            <small className="text-[0.9rem]" style={{ lineHeight: "100%" }}>
              Ingat Saya
            </small>
          </div>
          <Link className="hover:text-primary text-[0.9rem]" to={"/forgot"}>
            Lupa Password?
          </Link>
        </div>

        <Button type="submit" text="Masuk" isLoading={false} />
        <span className="text-[0.9rem] text-center">
          Belum punya akun?{" "}
          <Link className="text-primary hover:text-blue-300" to={"/register"}>
            Daftar sekarang
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
