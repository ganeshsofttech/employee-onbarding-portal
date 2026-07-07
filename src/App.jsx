import React, { useState } from "react";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
import EmployeesDetails from "./pages/EmployeesDetails.jsx";
import EmployeeRegistration from "./pages/EmployeeRegistration.jsx";
import "./index.css";
import Footer from "./component/Footer.jsx";
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("light");

  const renderPage = () => {
    switch (currentPage) {
      case "about": return <About />;
      case "contact": return <Contact />;
      case "registeremployee" : return <EmployeeRegistration />;
      case "employees" : return <EmployeesDetails />;
      default: return <Home />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        theme={theme} 
        setTheme={setTheme} 
      />
      <main style={{ padding: "20px" }}>
        {renderPage()}
        {/* <Footer /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
