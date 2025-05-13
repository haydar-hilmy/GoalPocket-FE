import { Close } from "@mui/icons-material";
import { useState } from "react";

const MiniAlertBox = ({ text = "Default Information", type = "success", isVisible = false, onClose }) => {
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
        <p className="h-fit" role="alert">
          {text}
        </p>
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
