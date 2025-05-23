import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar";
import { HeaderApp } from "../components/header/HeaderApp";

const AppLayout = ({
  children,
  title = "App",
  page = "home",
  subtitle = ""
}) => {
  return (
    <div className="flex flex-row">
      <Helmet>
        <title>{title} | GoalPocket</title>
      </Helmet>

      <Navbar page={page} />

      <main className="px-5 pt-0 pb-5 w-full">
        {/* Atur margin agar rapat */}
        <div className="mb-1">
          <HeaderApp pageName={page} />
          {subtitle && (
            <small className="block text-gray-500 text-sm leading-snug -mt-2 mb-6">
              {subtitle}
            </small>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
