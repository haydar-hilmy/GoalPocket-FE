import { CONFIG } from "../config/Config";

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Registered Failed");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
