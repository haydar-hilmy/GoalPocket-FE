import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const StyleFieldInput =
  "w-full py-3 placeholder:text-[0.9rem] bg-transparent focus:outline-none";

const FieldInput = ({ children, variant, isError = false }) => {
  return (
    <div
      className={`${variant} flex flex-row items-center rounded-full w-full bg-white outline outline-1 outline-[#D0D5DD] ${
        isError
          ? "focus-within:outline-[#ff0c0c] focus-within:shadow-[0_0_0_7px_rgba(255,0,0,0.15)]"
          : "focus-within:outline-[#0087FF] focus-within:shadow-[0_0_0_7px_rgba(74,157,236,0.15)]"
      } transition-all`}
    >
      {children}
    </div>
  );
};

const PasswordInput = ({
  name = "Kata Sandi",
  minLen = 1,
  errorMsg = "",
  placeholder = "********",
  text = "Kata Sandi",
}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <>
      <div className="form-control flex flex-col gap-1 w-full">
        <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
          {text}
        </label>
        <FieldInput isError={errorMsg != "" ? true : false}>
          <input
            autoComplete={name}
            minLength={minLen}
            className={`${StyleFieldInput} pl-5`}
            placeholder={placeholder}
            id={name}
            name={name}
            type={visible ? "text" : "password"}
          />
          <span
            onClick={toggleVisibility}
            className="cursor-pointer hover:bg-[#f5f5f5] rounded-full duration-100 p-3"
          >
            {visible ? <Visibility /> : <VisibilityOff />}
          </span>
        </FieldInput>
        <small className="text-red-500 text-[0.9rem] ml-[20px]">
          {errorMsg}
        </small>
      </div>
    </>
  );
};

const MainInput = ({
  name = "Input",
  minLen = 1,
  errorMsg = "",
  placeholder = "",
  text = "Input",
  autofocus = false,
}) => {
  return (
    <>
      <div className="form-control flex flex-col gap-1 w-full">
        <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
          {text}
        </label>
        <FieldInput isError={errorMsg != "" ? true : false}>
          <input
            autoFocus={autofocus}
            type="text"
            minLength={minLen}
            autoComplete={name}
            className={`${StyleFieldInput} px-5`}
            placeholder={placeholder}
            id={name}
            name={name}
          />
        </FieldInput>
        <small className="text-red-500 text-[0.9rem] ml-[20px]">
          {errorMsg}
        </small>
      </div>
    </>
  );
};

export { MainInput, PasswordInput };
