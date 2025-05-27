import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import PasswordStrengthBar from "../barLevel/passwordStrengthBar";
import { Button } from "../button/Button";
import { useController } from "react-hook-form";
import countries from "i18n-iso-countries";
import Select from "react-select";
import enLocale from "i18n-iso-countries/langs/id.json";

const StyleFieldInput =
  "w-full py-3 placeholder:text-[0.9rem] bg-transparent focus:outline-none";

const FieldInput = ({
  children,
  variant,
  isError = false,
  isDisabled = false,
}) => {
  return (
    <div
      className={`${variant} ${
        isDisabled ? "bg-[#f0f0f0]" : "bg-white"
      } flex flex-row items-center rounded-full w-full outline outline-1 outline-[#D0D5DD] ${
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
  name = "password",
  minLen = 1,
  errorMsg = "",
  placeholder = "********",
  text = "Kata Sandi",
  isDisabled = false,
  value,
  onChange,
  onBlur,
}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div className="form-control flex flex-col gap-1 w-full">
      <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
        {text}
      </label>
      <FieldInput isError={errorMsg !== ""} isDisabled={isDisabled}>
        <input
          id={name}
          name={name}
          autoComplete={name}
          minLength={minLen}
          className={`${StyleFieldInput} pl-5`}
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          disabled={isDisabled}
          value={value} //  use value from RHF
          onChange={onChange} // use onChange from RHF
          onBlur={onBlur} // use onBlur from RHF
        />
        <span
          onClick={toggleVisibility}
          className="cursor-pointer hover:bg-[#f5f5f5] rounded-full duration-100 p-3"
        >
          {visible ? <Visibility /> : <VisibilityOff />}
        </span>
      </FieldInput>

      {isLevelBar ? <PasswordStrengthBar password={value || ""} /> : null}

      <small className="text-red-500 text-[0.8rem] ml-[20px]">{errorMsg}</small>
    </div>
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
  isDisabled = false,
  onBlur,
  onInput,
  onChange,
  value,
}) => {
  return (
    <>
      <div className="form-control flex flex-col gap-1 w-full">
        <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
          {text}
        </label>
        <FieldInput
          isError={errorMsg != "" ? true : false}
          isDisabled={isDisabled}
        >
          <input
            {...hook_form}
            autoFocus={autofocus}
            onBlur={onBlur}
            type="text"
            minLength={minLen}
            autoComplete={name}
            className={`${StyleFieldInput} px-5`}
            placeholder={placeholder}
            id={name}
            name={name}
            onChange={onChange}
            onInput={onInput}
            disabled={isDisabled}
            value={value ?? ""}
          />
        </FieldInput>

        <small className="text-red-500 text-[0.8rem] ml-[20px]">
          {errorMsg}
        </small>
      </div>
    </>
  );
};

// Komponen ini tidak mewajibkan <Controller>
const InOutComeInput = ({ title, categories = [], onSubmit }) => {
  const [category, setCategory] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [amount, setAmount] = useState("");

  const formatCurrency = (value) => {
    if (!value) return "";
    return "Rp " + parseInt(value).toLocaleString("id-ID");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setDisplayAmount(formatCurrency(rawValue));
    setAmount(rawValue);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (category && amount) {
      onSubmit({ category, amount: Number(amount) });
      setCategory("");
      setAmount("");
      setDisplayAmount("");
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
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          placeholder="Rp _____"
          value={displayAmount}
          onChange={handleAmountChange}
          required
        />

        <div className="w-full sm:w-auto">
          <Button text="Kirim" type="Submit" variant="px-6 w-full" />
        </div>
      </div>
    </form>
  );
};

const RupiahInput = ({
  value = "",
  onChange,
  placeholder = "Rp _____",
  required = false,
}) => {
  const [displayValue, setDisplayValue] = useState("");

  const formatCurrency = (val) => {
    if (!val) return "";
    return "Rp " + parseInt(val).toLocaleString("id-ID");
  };

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setDisplayValue(formatCurrency(raw));
    onChange(raw);
  };

  return (
    <input
      type="text"
      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      required={required}
    />
  );
};

const PhoneNumberInput = ({
  name = "phone",
  errorMsg = "",
  placeholder = "+62 822 2333 4566",
  text = "Nomor HP",
  autofocus = false,
  isDisabled = false,
  value = "", // from Controller
  onChange, // from Controller
  onBlur, // optional from Controller
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Update formatted value when controlled value changes (from RHF)
    if (value) {
      setDisplayValue(formatPhoneNumber(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const formatPhoneNumber = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("62")) digits = digits.slice(2);
    if (digits.startsWith("0")) digits = digits.slice(1);

    if (!digits) return "";

    let formatted = "+62 ";
    for (let i = 0; i < digits.length && i < 11; i += 4) {
      formatted += digits.substring(i, i + 4) + " ";
    }
    return formatted.trim();
  };

  const handleInputChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.startsWith("62")) rawValue = rawValue.slice(2);
    if (rawValue.startsWith("0")) rawValue = rawValue.slice(1);

    const finalDigits = rawValue.slice(0, 11);
    const formattedDisplay = formatPhoneNumber("+62" + finalDigits);
    setDisplayValue(formattedDisplay);

    const finalValue = finalDigits ? "+62" + finalDigits : "";

    onChange?.(finalValue);
  };

  return (
    <div className="form-control flex flex-col gap-1 w-full">
      <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
        {text}
      </label>
      <FieldInput isError={errorMsg !== ""} isDisabled={isDisabled}>
        <input
          type="text"
          inputMode="numeric"
          autoFocus={autofocus}
          autoComplete="tel"
          className={`${StyleFieldInput} px-5`}
          placeholder={placeholder}
          id={name}
          name={name}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={isDisabled}
        />
      </FieldInput>
      <small className="text-red-500 text-[0.8rem] ml-[20px]">{errorMsg}</small>
    </div>
  );
};

countries.registerLocale(enLocale);

const CountrySearchSelectInput = ({
  name = "country",
  errorMsg = "",
  text = "Negara",
  hook_form,
  isDisabled = false,
  onchange,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const countryObj = countries.getNames("id", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([code, name]) => ({
      value: name,
      label: `${name} (${code})`,
    }));
    setOptions(countryArr);
  }, []);

  return (
    <div className="form-control flex flex-col gap-1 w-full">
      <label className="font-bold text-[0.9rem] w-fit" htmlFor={name}>
        {text}
      </label>

      <FieldInput isError={errorMsg !== ""} isDisabled={isDisabled}>
        <div className="w-full border-none border-0 outline-none px-5 py-[0.35rem]">
          <Select
            className="border-0"
            id={name}
            name={name}
            options={options}
            value={
              options.find((opt) => opt.value === hook_form?.value) || null
            }
            isDisabled={isDisabled}
            onChange={(selectedOption) => {
              onchange?.({ target: { name, value: selectedOption?.value } });
              if (hook_form?.onChange) {
                hook_form.onChange({
                  target: { value: selectedOption?.value },
                });
              }
            }}
            classNamePrefix="react-select"
            placeholder="Cari negara..."
            isSearchable
          />
        </div>
      </FieldInput>

      <small className="text-red-500 text-[0.8rem] ml-[20px]">{errorMsg}</small>
    </div>
  );
};

export {
  MainInput,
  PasswordInput,
  InOutComeInput,
  PhoneNumberInput,
  CountrySearchSelectInput,
  RupiahInput,
};
