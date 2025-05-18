import { href, Link } from "react-router"

export const NavLink = ({ children, hrefTo, isActive = false }) => {
    return <Link className={`
    text-[#494a50]
    p-2.5
    duration-100
    rounded-lg
    border
    border-transparent
    ${isActive ? "bg-[#E4EEFD] text-[#0087FF] border-white" : ""}
    hover:bg-[#E4EEFD]
    hover:text-[#0087FF]
    hover:border-white
    hover:shadow-md

    `} to={hrefTo}>{children}</Link>
}