import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar";
import { HeaderApp } from "../components/header/HeaderApp";
import { CONFIG } from "../config/Config";

const AppLayout = ({
  children,
  title = "App",
  page = "home",
  subtitle = "",
}) => {
  const storedUserData = localStorage.getItem(CONFIG.LS_USERDATA);
  let userData = {};

  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  }

  userData.name = userData.name || "John Doe";

  return (
    <div className="flex flex-col sm:flex-row">
      <Helmet>
        <title>{title} | GoalPocket</title>
      </Helmet>

      <Navbar page={page} user={{ username: userData.name }} />

      <main className="px-5 pt-0 pb-5 w-full">
        <div className="mb-1">
          <HeaderApp username={userData.name} pageName={page} />
          {subtitle && (
            <small className="block text-gray-500 text-sm leading-snug -mt-4 mb-6">
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
