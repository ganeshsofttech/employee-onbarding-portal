import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../css/Navbar.css";

export default function Navbar({ theme, setTheme }) {
  const activeStyle = {
    color: "red",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="navbar">
      <h2>Employee Onboarding Portal</h2>

      <div className="nav-links">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Home
        </NavLink>

        <NavLink
          to="/employeeregistration"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Employee Registration
        </NavLink>

        <NavLink
          to="/employeedetails"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Employee Details
        </NavLink>

        <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          Contact
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : {})}
        >
          About
        </NavLink>

        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );
}