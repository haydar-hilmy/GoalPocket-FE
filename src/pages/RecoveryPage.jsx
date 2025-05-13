import { Link } from "react-router-dom";
import { MainInput } from "../components/input/Input";

import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { useForm } from "react-hook-form";

const RecoveryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const onFormSubmit = (data) => {
    alert(`email: ${data.email}`);
  };

  return (
    <AuthLayout type="Pemulihan Akun">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">
          Pemulihan Akun
        </h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Untuk memulihkan akun Anda, masukkan email atau nama pengguna Anda untuk mencari akun Anda.
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

        <Button type="submit" text="Masuk" isLoading={false} />
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
