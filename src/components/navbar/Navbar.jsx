import { Link } from "react-router";
import Logo from "../logo/Logo";
import { Icon } from "../icons/icons";
import { NavLink } from "./NavLink";

const Navbar = ({ page = "home" }) => {
  return (
    <div className="bg-transparent flex flex-col h-[100vh] sticky top-0 left-0 w-fit">
      <div className="my-2.5 ml-2.5 p-3 shadow-md bg-bg_base rounded-md h-full w-fit flex flex-col items-center gap-3">
        <Logo />
        <nav className="flex flex-col gap-1">
          <NavLink isActive={page == "dashboard" ? true : false} hrefTo={"/"}><Icon.House /></NavLink>
          <NavLink hrefTo={"/currency"}><Icon.CurrencyCircleDollar /></NavLink>
          <NavLink><Icon.CreditCard /></NavLink>
          <NavLink><Icon.MoneyWavy /></NavLink>
          <NavLink><Icon.Key /></NavLink>
          <NavLink isActive={page == "profile" ? true : false}><Icon.UserCircle /></NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
