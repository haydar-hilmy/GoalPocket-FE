import { CircularProgress } from "@mui/material";

export const ActionButton = ({
  type,
  name,
  isLoading = false,
  variant,
  isDisabled = false,
  onClick,
  children = "Button",
  title,
}) => {
  return (
    <>
      <button
        title={title}
        onClick={onClick}
        type={type}
        name={name}
        id={name}
        disabled={isDisabled}
        className={`${variant} ${
          isDisabled
            ? "cursor-not-allowed"
            : ""
        }
        flex
        justify-center
        gap-1
        items-center
        bg-white
        duration-100
        text-sm
        border
        border-primary_text
        text-primary_text
        hover:text-white
        hover:border-primary
        hover:bg-primary
        active:opacity-[0.7]
        rounded-md
        py-1.5
        px-5
        `}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : children}
      </button>
    </>
  );
};
