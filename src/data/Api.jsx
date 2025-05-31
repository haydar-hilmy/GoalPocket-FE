import { CONFIG } from "../config/Config";

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Registered Failed");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error);
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const GetUserProfile = async () => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error || "Gagal mengambil data profil.";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan saat mengambil data profil.");
  }
};


export const UpdateProfile = async ({
  name,
  phoneNumber,
  address,
  country,
}) => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        country: country,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Gagal update profile");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const UpdatePassword = async ({ oldPassword, newPassword }) => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/user/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || result.error || "Gagal update password"
      );
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const RecoveryPassword = async ({ email }) => {
  try {
    const response = await fetch(
      `${CONFIG.BASE_URL}/goalpocket/users/password/forgot`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || result.error || "Gagal update password"
      );
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const PostTarget = async (dataTarget) => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/targets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataTarget),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error;
      if (
        message?.includes("Unique constraint failed on the fields: (`name`)")
      ) {
        throw new Error(
          "Nama rencana sudah digunakan. Silakan pilih nama lain."
        );
      }

      
      throw new Error(message || "Rencana gagal ditambahkan");
    }
    return result;
  } catch (error) {
    console.error("Error: ", error)
    throw new Error(error.message || "Internal server error");
  }
};

export const UpdateTarget = async (id, dataTarget) => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/targets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataTarget),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error;

      throw new Error(message || "Rencana gagal diperbarui");
    }

    return result;
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error(error.message || "Terjadi kesalahan saat mengubah data.");
  }
};


export const GetAllTargets = async () => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);

    const response = await fetch(`${CONFIG.BASE_URL}/targets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error || "Gagal mengambil data target.";
      throw new Error(message);
    }

    return result; 
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan saat mengambil data target.");
  }
}

export const DeleteTargetById = async (id) => {
  try {
    const token = localStorage.getItem(CONFIG.LS_KEY);
    const response = await fetch(`${CONFIG.BASE_URL}/targets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error || "Gagal menghapus rencana.";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error(error.message || "Terjadi kesalahan saat menghapus.");
  }
};