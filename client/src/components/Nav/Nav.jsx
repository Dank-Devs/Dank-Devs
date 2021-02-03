import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <>
      <nav>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/feed">Feed</Link>
        <Link className="nav-link" to="/profile/ankiiitraj">Profile</Link>
      </nav>
    </>
  );
};

export default Nav;
