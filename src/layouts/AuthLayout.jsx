import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";

const AuthLayout = ({ children, type = "signin" || "signup" }) => {
  return (
    <div className="flex justify-center py-[8rem]">
      <Helmet>
        <title>
          {type === "signin"
            ? "Masuk ke Akun Anda"
            : type === "signup"
            ? "Buat Akun"
            : "Auth"}
          | GoalPocket
        </title>
      </Helmet>
      <div className="flex flex-col w-[95%] sm:max-w-[50%] items-center bg-[#F5F5FC] px-20 py-16 border-[3px] border-[#fff] rounded-[30px]">
        <Logo variant="w-16" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
