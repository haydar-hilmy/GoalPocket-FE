import { Link } from "react-router";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/button/Button";

const RegisterPage = () => {
  return (
    <AuthLayout type="Buat Akun">
      <div className="flex flex-col gap-2">
        <h1 className="w-full font-bold text-center text-[1.6rem] leading-[100%]">Daftar</h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem] text-center">
          Buat akun baru dengan detail pribadi Anda.
        </h4>
      </div>

      <form className="w-full flex flex-col gap-4">
        <MainInput
            autofocus={true}
            name="username"
            errorMsg=""
            placeholder="misal: johndoe"
            text="Nama Pengguna"
        />
        <MainInput
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
                <Toggle name="isAgree" />
                <small className="text-[0.9rem]" style={{ lineHeight: "100%" }}>Saya setuju dengan <Link to="#" className="text-primary hover:text-blue-300">Kebijakan privasi</Link> dan <Link to="#" className="text-primary hover:text-blue-300">Syarat ketentuan</Link></small>
            </div>
        </div>

        <Button 
        type="submit"
        text="Daftar Akun"
        isLoading={false}
        />
        <span className="text-[0.9rem] text-center">Sudah punya akun? <Link className="text-primary hover:text-blue-300" to={"/login"}>Masuk sekarang</Link></span>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
