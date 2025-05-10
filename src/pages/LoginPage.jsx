import { Link } from "react-router";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";

const LoginPage = () => {
  return (
    <AuthLayout type="signin">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">Masuk</h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Anda dapat masuk dengan menggunakan email terdaftar.
        </h4>
      </div>

      <form className="w-full flex flex-col gap-4">
        <MainInput
            autofocus={true}
            name="email"
            errorMsg=""
            placeholder="goalpocket@example.com"
            text="Alamat Email"
        />
        <PasswordInput 
            name="password"
            errorMsg=""
            placeholder="********"
            text="Kata Sandi"
        />
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
                <Toggle />
                <small className="text-[0.9rem]" style={{ lineHeight: "100%" }}>Ingat Saya</small>
            </div>
            <Link className="hover:text-primary text-[0.9rem]" to={"/forgot"}>Lupa Password?</Link>
        </div>

        <Button 
        type="submit"
        text="Masuk"
        isLoading={false}
        />
        <span className="text-[0.9rem] text-center">Belum punya akun? <Link className="text-primary hover:text-blue-300" to={"/register"}>Daftar sekarang</Link></span>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
