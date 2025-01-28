import { Link } from "react-router";
const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/search" className="nav-link">
          Search Jobs
        </Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <h4 className="nav-link">Selected Country:{props.country.toUpperCase()}</h4>
      </div>
      
    </nav>
  );
};
export default Navbar;
