import { useForm } from "react-hook-form";
import { CountrySearchSelectInput, MainInput, PhoneNumberInput } from "../../components/input/Input";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Sending Data", data);
  };

  return (
    <AppLayout title="Profil" page="Profil Saya">
      <div className="flex flex-row w-full gap-5">
        <div>
          <img className="w-16" src="/user/default-user.png" alt="" />
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#F5F5FC] p-5 rounded-md"
          >
            <MainInput
              name="nama"
              minLen={1}
              errorMsg=""
              placeholder={"misal: John Doe"}
              text={"Nama"}
              autofocus={true}
            />
            <MainInput
              name="email"
              minLen={1}
              errorMsg=""
              placeholder={"goalpocket@example.com"}
              text={"Alamat Email"}
            />
            <PhoneNumberInput
              name="phone"
              text="Nomor HP"
              errorMsg={errors.phone?.message}
              hook_form={register("phone", {
                required: "Nomor HP wajib diisi",
              })}
              onChange={(e) => setValue("phone", e.target.value)}
            />
            <MainInput
              name="alamat"
              minLen={1}
              errorMsg=""
              placeholder={"Contoh: Jl. Merdeka No. 123, Bandung"}
              text={"Alamat"}
            />
            <CountrySearchSelectInput />
            <button type="submit">Kirim</button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
