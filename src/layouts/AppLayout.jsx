import { Helmet } from "react-helmet-async";
import Logo from "../components/logo/Logo";
import Navbar from "../components/navbar/Navbar";

const AppLayout = ({ children, type = "App" }) => {
  return (
    <div className="flex flex-col">
        <Helmet>
            <title>{type} | GoalPocket</title>
        </Helmet>

        <Navbar />

        { children }
        
    </div>
  );
};

export default AppLayout;
