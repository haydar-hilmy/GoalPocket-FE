import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ isShowModal, setIsShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};