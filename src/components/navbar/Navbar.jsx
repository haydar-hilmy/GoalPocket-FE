import { Link } from "react-router";
import Logo from "../logo/Logo";
import { NavLink } from "./NavLink";
import { useState } from "react";
import {
  AccountCircleOutlined,
  DashboardOutlined,
  DateRangeOutlined,
  HistoryOutlined,
  KeyOutlined,
  Logout,
  MenuOutlined,
  ReceiptLongOutlined
} from "@mui/icons-material";

const Navbar = ({ page = "home", user }) => {
  const { imgPath, username } = {
    imgPath: "user/default-user.png",
    username: "User",
    ...user
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
          <MenuOutlined />
        </button>

        <Link
          to={"/profile"}
          className="flex flex-row gap-3 items-center cursor-pointer"
        >
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
              <DashboardOutlined />
            </NavLink>
            <NavLink
              text="Rencana"
              hrefTo={"/rencana"}
              isActive={page == "Rencana Penabungan"}
            >
              {/* <Icon.CurrencyCircleDollar /> */}
              <DateRangeOutlined color="currentColor" />
            </NavLink>
            <NavLink
              text="Transaksi"
              hrefTo={"/add"}
              isActive={page == "Catat Transaksi"}
            >
              <ReceiptLongOutlined />
            </NavLink>
            <NavLink
              text="Riwayat Transaksi"
              hrefTo={"/history"}
              isActive={page == "Riwayat Transaksi"}
            >
              <HistoryOutlined />
            </NavLink>
            <NavLink
              hrefTo={"/pass"}
              isActive={page == "Ganti Password"}
              text="Ganti Password"
            >
              <KeyOutlined />
            </NavLink>
            <NavLink
              text="Profil Saya"
              hrefTo={"/profile"}
              isActive={page == "Profil Saya"}
            >
              <AccountCircleOutlined />
            </NavLink>
            <NavLink text="Log out" hrefTo={"/logout"}>
              <Logout color="inherit" />
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
