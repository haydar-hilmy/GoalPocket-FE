import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";
import Navbar from "../components/navbar/Navbar";
import { HeaderApp } from "../components/header/HeaderApp";

const AppLayout = ({ children, title = "App", page = "home" }) => {
  return (
    <div className="flex flex-row">
      <Helmet>
        <title>{title} | GoalPocket</title>
      </Helmet>

      <Navbar page={page} />

      <main className="px-5 pt-0 pb-5 w-full">
        <HeaderApp pageName={page} />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
