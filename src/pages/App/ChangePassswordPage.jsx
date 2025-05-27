import { Controller, useForm } from "react-hook-form";
import { PasswordInput } from "../../components/input/Input";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import { Button } from "../../components/button/Button";

const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const newPassword = watch("newpassword");

  const onFormSubmit = (data) => {
    setIsLoading(true);

    alert(`
    Old Password: ${data.oldpassword}
    New Password: ${data.newpassword}
    Confirm Password: ${data.confirmpassword}
    `);
    setIsLoading(false);
  };

  return (
    <AppLayout title="Ganti Password" page="Ganti Password">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          name="oldpassword"
          control={control}
          rules={{
            required: "Kata sandi lama wajib diisi.",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              text="Kata Sandi Lama"
              placeholder="********"
              errorMsg={fieldState.error?.message || ""}
              isLevelBar={false}
            />
          )}
        />

        <Controller
          name="newpassword"
          control={control}
          rules={{
            required: "Kata sandi baru wajib diisi.",
            pattern: {
              value: /^.{8,}$/,
              message: "Kata sandi minimal terdiri dari 8 karakter",
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              text="Kata Sandi Baru"
              placeholder="********"
              errorMsg={fieldState.error?.message || ""}
              isLevelBar={true}
            />
          )}
        />

        <Controller
          name="confirmpassword"
          control={control}
          rules={{
            required: "Konfirmasi kata sandi wajib diisi.",
            validate: (value) =>
              value === newPassword || "Konfirmasi kata sandi belum sama",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              text="Konfirmasi Kata Sandi Baru"
              placeholder="********"
              errorMsg={fieldState.error?.message || ""}
              isLevelBar={false}
            />
          )}
        />

        <Button
          type="submit"
          text="Ganti Password"
          isDisabled={isLoading}
          isLoading={isLoading}
        />
      </form>
    </AppLayout>
  );
};

export default ChangePasswordPage;
