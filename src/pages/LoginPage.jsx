import { Link, useNavigate } from "react-router-dom";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Close } from "@mui/icons-material";
import { MiniAlertBox } from "../components/alertBox/alertBox";
import { AuthContext } from "../context/AuthContext";
import { CONFIG } from "../config/Config";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const [btnLoading, setBtnLoading] = useState(false);
  const [miniAlertBox, setMiniAlertBox] = useState({
    isVisible: false,
    text: "",
    type: "info",
  });

  const onFormSubmit = async (data) => {
    try {
      setBtnLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout jika server tidak merespon

      const response = await fetch(
        `${import.meta.env.VITE_ENDPOINT_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || "Login failed");
      }

      setIsLoggedIn(true);
      localStorage.setItem(CONFIG.LS_KEY, result.loginResult.token);

      const userData = {
        userId: result.loginResult.userId, 
        name: result.loginResult.name,
      }

      localStorage.setItem(CONFIG.LS_USERDATA, JSON.stringify(userData))
      navigate("/");
    } catch (error) {
      let message = "Terjadi kesalahan saat login.";
      if (error.name === "AbortError") {
        message = "Server tidak merespon. Coba lagi nanti.";
      } else if (
        error.message.includes("Email") ||
        error.message.includes("password")
      ) {
        message = "Email atau password yang dimasukkan salah.";
      }

      setMiniAlertBox({
        text: message,
        isVisible: true,
        type: "danger",
      });

      console.error("Login error:", error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <AuthLayout type="Masuk ke Akun Anda">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">
          Masuk
        </h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Anda dapat masuk dengan menggunakan email terdaftar.
        </h4>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <MainInput
          autofocus={true}
          name="email"
          errorMsg={errors.email ? errors.email.message : ""}
          placeholder="goalpocket@example.com"
          text="Alamat Email"
          hook_form={register("email", {
            required: "Email wajib diisi.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
              message: "Masukkan email dengan format yang benar.",
            },
          })}
        />
        <PasswordInput
          isLevelBar={false}
          name="password"
          errorMsg={errors.password ? errors.password.message : ""}
          placeholder="********"
          text="Kata Sandi"
          hook_form={register("password", {
            required: "Kata sandi wajib diisi.",
          })}
        />

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <Toggle hook_form={register("remember")} name="remember" />
            <small className="text-[0.9rem]" style={{ lineHeight: "100%" }}>
              Ingat Saya
            </small>
          </div>
          <Link className="hover:text-primary text-[0.9rem]" to={"/forgot"}>
            Lupa Password?
          </Link>
        </div>

        <MiniAlertBox
          isVisible={miniAlertBox.isVisible}
          text={miniAlertBox.text}
          type={miniAlertBox.type}
          onClose={(prev) => setMiniAlertBox({ ...prev, isVisible: false })}
        />

        <Button
          type="submit"
          text="Masuk"
          isLoading={btnLoading}
          isDisabled={btnLoading}
        />
        <span className="text-[0.9rem] text-center">
          Belum punya akun?{" "}
          <Link className="text-primary hover:text-blue-300" to={"/register"}>
            Daftar sekarang
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
