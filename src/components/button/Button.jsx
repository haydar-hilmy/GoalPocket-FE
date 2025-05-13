import { CircularProgress } from "@mui/material";

const Button = ({ text, type, name, isLoading = false, variant, isDisabled = false }) => {
  return (
    <>
      <button
        type={type}
        name={name}
        id={name}
        disabled={isDisabled}
        className={`${variant} ${isDisabled ? "opacity-40 hover:opacity-30 cursor-wait" : "hover:opacity-[0.8]"} flex justify-center items-center bg-primary hover:opacity-[0.8] duration-200 text-white rounded-full py-3`}
      >
        {isLoading ? <CircularProgress size={23} color="inherit" /> : text}
      </button>
    </>
  );
};

export { Button };
