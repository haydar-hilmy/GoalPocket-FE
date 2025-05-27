import { Controller, useForm } from "react-hook-form";
import { Button } from "../button/Button";
import { Icon } from "../icons/icons";
import { MainInput, RupiahInput } from "../input/Input";
import { useState } from "react";

const RencanaFormModal = ({
  isShow = true,
  onClose,
  onSubmit,
  title = "Modal Title",
}) => {
  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
  });

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const onFormSubmit = (data) => {
    setIsBtnLoading(true);
    console.log("Sending Rencana: ", data.target);
    setIsBtnLoading(false);
  };

  return (
    <div
      className={`${isShow ? "block" : "hidden"}
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
    >
      <div className="bg-white p-8 w-11/12 rounded-md sm:w-4/6 md:w-1/2">
        <div className="flex flex-row items-center">
          <div className="flex-1 flex justify-start sm:justify-center">
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div>
            <div className="p-2.5 cursor-pointer rounded-sm bg-white w-fit h-fit duration-75 hover:bg-gray-100">
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
              required: "Target wajib diisi.",
            }}
            render={({ field, fieldState }) => (
              <MainInput
                {...field}
                autofocus={true}
                errorMsg={fieldState.error?.message || ""}
                placeholder="Contoh: Laptop"
                text="Target"
              />
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
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Rp 4.000.000"
                  required
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
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
