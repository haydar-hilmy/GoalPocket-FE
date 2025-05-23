import { Link } from "react-router";
import Logo from "../logo/Logo";
import { Icon } from "../icons/icons";
import { NavLink } from "./NavLink";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";

const Navbar = ({ page = "home", user }) => {
  const { imgPath, username } = {
    imgPath: "user/default-user.png",
    username: "User",
    ...user,
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="sm:hidden flex flex-row items-center justify-between gap-5 bg-white shadow-sm sticky top-0 py-2.5 px-3 w-full z-[50]">
        <button
          className="hover:bg-slate-300 p-1 rounded-sm"
          onClick={toggleSidebar}
        >
          <Icon.BurgerMenu />
        </button>

        <Link to={"/profile"} className="flex flex-row gap-3 items-center cursor-pointer">
          <img src={imgPath} className="w-7" />
          <small className="font-bold text-base">{username}</small>
        </Link>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 duration-300 bg-transparent flex sm:flex-col h-[100vh] fixed z-[100] sm:sticky top-0 left-0 w-[100vw] sm:w-fit`}
        onClick={closeSidebar}
      >
        {/* Sidebar Container */}
        <div
          className={`my-0 ml-0 sm:my-2.5 sm:ml-2.5 pt-7 sm:pt-5 px-3 sm:p-3 z-40 shadow-md bg-bg_base rounded-none sm:rounded-md h-full w-fit flex flex-col items-center gap-3`}
          onClick={(e) => e.stopPropagation()}
        >
          <Logo />
          <nav className="flex flex-col gap-1">
            <NavLink
              isActive={page == "dashboard"}
              text="Dashboard"
              hrefTo={"/"}
            >
              <Icon.House />
            </NavLink>
            <NavLink text="Currency" hrefTo={"/currency"}>
              <Icon.CurrencyCircleDollar />
            </NavLink>
            <NavLink text="Card" hrefTo={"/add"}>
              <Icon.CreditCard />
            </NavLink>
            <NavLink text="Money">
              <Icon.MoneyWavy />
            </NavLink>
            <NavLink text="Key">
              <Icon.Key />
            </NavLink>
            <NavLink text="Profile" hrefTo={"/profile"} isActive={page == "profile"}>
              <Icon.UserCircle />
            </NavLink>
            <NavLink text="Log out" hrefTo={"/logout"}>
              <Logout />
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
