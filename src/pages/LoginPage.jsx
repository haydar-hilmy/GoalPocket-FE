import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { MiniAlertBox } from "../components/alertBox/alertBox";
import { AuthContext } from "../context/AuthContext";
import { CONFIG } from "../config/Config";
import { loginUser } from "../data/api";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { register, handleSubmit, control, setValue } = useForm({
    mode: "onSubmit",
  });

  // Condition if token is not valid or something when use location.state
  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      Swal.fire({
        icon: "info",
        title: "Informasi",
        text: location.state.message,
      });
    }
  }, [location.state]);

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const [btnLoading, setBtnLoading] = useState(false);
  const [miniAlertBox, setMiniAlertBox] = useState({
    isVisible: false,
    text: "",
    type: "info",
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");

    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setValue("remember", true);
    }
  }, [setValue]);

  const onFormSubmit = async (data) => {
    setBtnLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout jika server tidak merespon
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (!response.user) {
        throw new Error(
          response.message || response.error || "Email atau password salah."
        );
      }

      const token = response.token;
      const name = response.user.name;

      if (!token) {
        throw new Error("Token dari server tidak valid.");
      }

      localStorage.setItem(CONFIG.LS_KEY, token);
      setIsLoggedIn(true);

      if (data.remember) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang, ${name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: error.message,
      });
      console.error("Login error:", error.message);

      setMiniAlertBox({
        text: error.message,
        isVisible: true,
        type: "danger",
      });
    } finally {
      clearTimeout(timeoutId);
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
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email wajib diisi.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
              message: "Masukkan email dengan format yang benar.",
            },
          }}
          render={({ field, fieldState }) => (
            <MainInput
              {...field}
              autofocus={true}
              errorMsg={fieldState.error?.message || ""}
              placeholder="goalpocket@example.com"
              text="Alamat Email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Kata sandi wajib diisi.",
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              {...field}
              errorMsg={fieldState.error?.message || ""}
              placeholder="********"
              text="Kata Sandi"
              isLevelBar={false}
            />
          )}
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
