import { CircularProgress } from "@mui/material";

const Button = ({ text, type, name, isLoading = false, variant, isDisabled = false, onclick, children }) => {
  return (
    <>
      <button
        onClick={onclick}
        type={type}
        name={name}
        id={name}
        disabled={isDisabled}
        className={`${variant} ${isDisabled ? "bg-[#76acdb] hover:bg-primary cursor-wait" : "hover:opacity-[0.8]"} flex justify-center gap-2 items-center bg-primary hover:opacity-[0.8] duration-200 text-white rounded-full py-3 px-4`}
      >
        {isLoading ? "" : children} {isLoading ? <CircularProgress size={23} color="inherit" /> : text}
      </button>
    </>
  );
};

export { Button };
