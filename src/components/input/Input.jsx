import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import PasswordStrengthBar from "../barLevel/passwordStrengthBar";
import { Button } from "../button/Button";

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
  isLevelBar = true,
  name = "Kata Sandi",
  minLen = 1,
  errorMsg = "",
  placeholder = "********",
  text = "Kata Sandi",
  hook_form
}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prev) => !prev);

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="form-control flex flex-col gap-1 w-full">
        <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
          {text}
        </label>
        <FieldInput isError={errorMsg != "" ? true : false}>
          <input
            {...hook_form}
            autoComplete={name}
            minLength={minLen}
            className={`${StyleFieldInput} pl-5`}
            placeholder={placeholder}
            id={name}
            name={name}
            type={visible ? "text" : "password"}
            onChange={handleChange}
          />
          <span
            onClick={toggleVisibility}
            className="cursor-pointer hover:bg-[#f5f5f5] rounded-full duration-100 p-3"
          >
            {visible ? <Visibility /> : <VisibilityOff />}
          </span>
        </FieldInput>

        {isLevelBar ? <PasswordStrengthBar password={password} /> : ""}

        <small className="text-red-500 text-[0.8rem] ml-[20px]">
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
  hook_form,
  oninput,
  onchange
}) => {
  return (
    <>
      <div className="form-control flex flex-col gap-1 w-full">
        <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
          {text}
        </label>
        <FieldInput isError={errorMsg != "" ? true : false}>
          <input
            {...hook_form}
            autoFocus={autofocus}
            type="text"
            minLength={minLen}
            autoComplete={name}
            className={`${StyleFieldInput} px-5`}
            placeholder={placeholder}
            id={name}
            name={name}
            onChange={onchange}
            onInput={oninput}
          />
        </FieldInput>

        <small className="text-red-500 text-[0.8rem] ml-[20px]">
          {errorMsg}
        </small>
      </div>
    </>
  );
};

const InOutComeInput = ({ title, categories = [], onSubmit }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (category && amount) {
      onSubmit({ category, amount });
      setCategory("");
      setAmount("");
    }
  };

  return (
    <form
      onSubmit={handlerSubmit}
      className="bg-bg_base rounded-xl shadow-md p-6 mb-6 w-full"
    >
      <h2 className="font-semibold text-lg border-b pb-2 mb-4">{title}</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Pilih Salah Satu</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          placeholder="Rp _____"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div className="w-full sm:w-auto">
          <Button text="Kirim" type="Submit" variant="px-6 w-full" />
        </div>
      </div>
    </form>
  );
};

export { MainInput, PasswordInput, InOutComeInput };
