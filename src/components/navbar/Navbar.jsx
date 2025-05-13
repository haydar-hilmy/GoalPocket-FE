import { Link } from "react-router";
import Logo from "../logo/Logo";

const Navbar = () => {
  return (
    <header>
      <Logo />
      <nav>
        <Link>Home</Link>
        <Link>Home</Link>
        <Link>Home</Link>
        <Link>Home</Link>
        <Link>Home</Link>
        <Link>Home</Link>
      </nav>
    </header>
  );
};


export default Navbar;