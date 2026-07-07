import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
export default function Navbar({ theme, setTheme }) {
  const activeStyle = {
    color: "red",

    fontWeight: "bold",
  };

  return (
    <nav>
        <h2>Employee Onboarding Portal</h2>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : {})}>
        Home
      </NavLink>

      {" | "}

      <NavLink
        to="/employeeregistration"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Employee Registration
      </NavLink>

      {" | "}
      <NavLink
        to="/employeedetails"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Employee Details
      </NavLink>

      {" | "}

      <NavLink
        to="/contact"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        Contact
      </NavLink>

      {" | "}

      <NavLink
        to="/about"
        style={({ isActive }) => (isActive ? activeStyle : {})}
      >
        About
      </NavLink>


      {" | "}
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </nav>
  );
}
