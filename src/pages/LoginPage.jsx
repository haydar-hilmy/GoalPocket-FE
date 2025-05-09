import { Link } from "react-router";
import { MainInput, PasswordInput } from "../components/input/Input";
import Toggle from "../components/toggle/Toggle";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout type="signin">
      <div>
        <h1 className="w-full font-bold text-center text-[1.6rem]">Masuk</h1>
        <h4 className="font-normal text-[#475467] text-[0.9rem]">
          Anda dapat masuk dengan menggunakan email.
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
            <Link className="hover:text-primary duration-100" to={"/forgot"}>Lupa Password?</Link>
        </div>

        <button className="bg-primary text-white rounded-full py-3">Masuk</button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
