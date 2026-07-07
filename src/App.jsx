import React, { useState } from "react";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact.jsx";
import EmployeesDetails from "./pages/EmployeesDetails.jsx";
import EmployeeRegistration from "./pages/EmployeeRegistration.jsx";
import "./index.css";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import { Routes, Route, NavLink } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("light");

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "registeremployee":
        return <EmployeeRegistration />;
      case "employees":
        return <EmployeesDetails />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      {/* <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        setTheme={setTheme}
      />
      <main style={{ padding: "20px" }}>{renderPage()}</main> */}
      <Navbar  
        theme={theme}
        setTheme={setTheme}
        
      />

      <hr />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/employeeregistration"
          element={<EmployeeRegistration />}
        />
        <Route path="/employeedetails" element={<EmployeesDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
