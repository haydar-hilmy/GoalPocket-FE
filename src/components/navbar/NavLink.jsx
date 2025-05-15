import { href, Link } from "react-router"

export const NavLink = ({ children, hrefTo }) => {
    return <Link className="
    text-[#8E919F]
    p-2.5
    duration-100
    rounded-lg
    border
    border-transparent
    hover:bg-[#E4EEFD]
    hover:text-[#0087FF]
    hover:border-white
    hover:shadow-md
    " to={hrefTo}>{children}</Link>
}