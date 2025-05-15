import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";

const AuthLayout = ({ children, type = "GoalPocket Auth" }) => {
  return (
    <div
      className="flex justify-center items-center min-h-screen flex-col"
    >
      <Helmet>
        <title>{type} | GoalPocket</title>
      </Helmet>
      <div className="flex flex-col gap-5 shadow-md w-[95%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] items-center bg-[#F5F5FC] px-20 py-16 my-[3rem] border-[3px] border-[#fff] rounded-[30px]">
        <Logo variant="w-16" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
