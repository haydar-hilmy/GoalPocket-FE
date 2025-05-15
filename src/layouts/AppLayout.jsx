import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";
import Navbar from "../components/navbar/Navbar";

const AppLayout = ({ children, type = "App" }) => {
  return (
    <div className="flex flex-row">
      <Helmet>
        <title>{type} | GoalPocket</title>
      </Helmet>

      <Navbar />

      <main className="px-5 pt-0 pb-5">
        <header className="flex flex-row justify-between py-5 items-center">

          {/* Left Side */}
          <div className="flex flex-row">
            <h2 className="font-bold">Dashboard</h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-row">
            <div className="flex flex-row gap-3 items-center cursor-pointer">
              <img src="user/default-user.png" className="w-7" />
              <small>John Doe</small>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
