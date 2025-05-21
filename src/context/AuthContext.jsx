import { createContext, useEffect, useState } from "react";
import { CONFIG } from "../config/Config";
import { isTokenExpired } from "../utils/TokenJWT";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem(CONFIG.LS_KEY);
    return token && !isTokenExpired(token);
  });

  useEffect(() => {
    const token = localStorage.getItem(CONFIG.LS_KEY);
    if(!token || isTokenExpired(token)){
      localStorage.removeItem(CONFIG.LS_KEY);
      setIsLoggedIn(false);
    }
  })

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, }}>
      {children}
    </AuthContext.Provider>
  );
};