import { useContext, useEffect } from "react";
import { CONFIG } from "../config/Config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const LogoutPage = () => {
    const navigate = useNavigate();

    const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem(CONFIG.LS_KEY);
    localStorage.removeItem(CONFIG.LS_USERDATA);

    setIsLoggedIn(false)
    
    navigate("/login");
  }, []);

  return null;
}