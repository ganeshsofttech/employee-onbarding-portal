import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header({ currentPage, setCurrentPage, theme, setTheme }) {
  return (
    <header style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "5px", 
      background: theme === "light" ? "#282c34" : "#111", 
      color: "#fff" 
    }}>
      <h3>Employee Onboarding</h3> 
      <nav style={{ display: "flex", gap: "10px" }}>
        {/* <h1>Employee Onboarding</h1> */}
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("registeremployee")}>Register Employee</button>
        <button onClick={() => setCurrentPage("employees")}>Employee Details</button>
        <button onClick={() => setCurrentPage("about")}>About</button>
        <button onClick={() => setCurrentPage("contact")}>Contact</button>

        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>
    </header>
  );
}

export default Header;
