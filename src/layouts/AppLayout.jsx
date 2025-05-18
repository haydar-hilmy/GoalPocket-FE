import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";
import Navbar from "../components/navbar/Navbar";
import { HeaderApp } from "../components/header/HeaderApp";

const AppLayout = ({ children, type = "App", page = "home" }) => {
  return (
    <div className="flex flex-row">
      <Helmet>
        <title>{type} | GoalPocket</title>
      </Helmet>

      <Navbar page={page} />

      <main className="px-5 pt-0 pb-5">
        <HeaderApp />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
