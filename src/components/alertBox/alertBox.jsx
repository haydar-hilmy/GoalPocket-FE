import { Close } from "@mui/icons-material";
import { useState } from "react";

const MiniAlertBox = ({
  text = "Default Information",
  type = "success",
  isVisible = false,
  onClose,
}) => {
  if (!isVisible) return null;

  let TypeBox;
  switch (type) {
    case "success": // hijau
      TypeBox = "bg-green-500";
      break;
    case "warning": // kuning
      TypeBox = "bg-yellow-500";
      break;
    case "info": // biru
      TypeBox = "bg-blue-500";
      break;
    case "danger": // merah
      TypeBox = "bg-red-500";
      break;
    default:
      TypeBox = "bg-green-500";
  }
  return (
    <>
      <div
        className={`${TypeBox} flex flex-row justify-between items-center text-[0.9rem] rounded-md text-white px-3 py-3`}
      >
        <div className="flex flex-row gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="currentColor"
          >
            <path
              fill="currentColor"
              d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
            ></path>
          </svg>
          <p className="h-fit" role="alert">
            {text}
          </p>
        </div>
        <div
          onClick={onClose}
          className="h-fit w-fit aspect-square cursor-pointer hover:opacity-40"
        >
          <Close fontSize="inherit" />
        </div>
      </div>
    </>
  );
};

export { MiniAlertBox };
