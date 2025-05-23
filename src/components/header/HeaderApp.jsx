import { Link } from "react-router";
import { capitalize } from "../../utils/Capitalize";

export const HeaderApp = ({ username = "User", pageName = "Dashboard" }) => {
  return (
    <>
      <header className="flex flex-row justify-between py-5 items-center">
        {/* Left Side */}
        <div className="flex flex-row">
          <h2 className="font-bold">{capitalize(pageName)}</h2>
        </div>

        {/* Right Side */}
        <div className="hidden sm:flex flex-row">
          <Link to={"/profile"} className="flex flex-row gap-3 items-center cursor-pointer">
            <img src="user/default-user.png" className="w-7" />
            <small to={"/profile"} className="font-bold text-base">{username}</small>
          </Link>
        </div>
      </header>
    </>
  );
};
