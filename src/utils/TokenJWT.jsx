import { jwtDecode } from "jwt-decode";
import { CONFIG } from "../config/Config";

const TOKEN_KEY = CONFIG.LS_KEY;

export const saveToken = (token) => { // token is JWT value
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY); // return Null if TOKEN_KEY is not exist
}

export const removeToken = () => {
    return localStorage.removeItem(TOKEN_KEY);
}

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // (in second)
    return decoded.exp < now;
  } catch (e) {
    console.error("Token invalid:", e);
    return true;
  }
};