import React, { useState } from "react";
import fs from "fs";
import empdetails from "../data/empdetails.json";
import employees from "../data/employees";
import "./empreg.css";
function EmployeeRegistration() {
  // State to store form data
  const [formData, setFormData] = useState({
    empid: "",
    empname: "",
    email: "",
    department: "",
    designation: "",
    joiningdate: "",
  });

  // State to track form submission
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  // Handle input changes dynamically
  const handleChange = (e) => {
    // validate();
    const { name, value } = e.target; // extract field name and value
    setFormData({
      ...formData,
      [name]: value, // update only the changed field
    });

    let newErrors = {};

    // Name Validation
    if (name === "empname") {
      if (!value.trim()) {
        newErrors.empname = "Employee Name is required";
      }else if(!/^[A-Za-z ]+$/.test(value)){
        newErrors.empname = "Only Alphabets allowed";
      }
    }
    if (name === "department") {
      if (!value.trim()) {
        newErrors.department = "Department Name is required";
      }else if (value.length <= 1) {
        newErrors.department = "Department name must be at least 2 charater";
      }
    }
    setErrors(newErrors);
  };

  const validate = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.empname.trim()) {
      newErrors.empname = "Employee Name is required";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Employee Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (formData.department.length <= 1) {
      newErrors.department = "Department name must be at least 2 charater";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (Object.keys(errors).length === 0) {
      alert("Form Submitted Successfully");

      console.log("Form submitted:", formData);
      employees.push({ empid: employees.length + 1, ...formData });

      setSubmitted(true);

      // Reset form after submission
      setFormData({
        empid: "",
        empname: "",
        email: "",
        department: "",
        designation: "",
        joiningdate: "",
      });
    }else{
      alert(Object.values(errors).toString());
    }
  };

  return (
    <div className="page-container">
      <center>
        <div>
          <div className="form-card">
            <h2 className="form-title">Register Employee</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label"> Employee Id: </label>
                  <input
                    className="form-input"
                    type="number"
                    name="empid"
                    value={formData.empid}
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Employee Name:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="empname"
                    value={formData.empname}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                  />
                  {errors.empname && (
                    <span style={{ color: "red" }}>{errors.empname}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Employee Email:</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter employee email"
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Employee Department:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    placeholder="Enter employee Department"
                  />
                  {errors.department && (
                    <p style={{ color: "red" }}>{errors.department}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Employee Designation:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    placeholder="Enter employee Designation"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Employee Joining Date:</label>
                  <input
                    className="form-input"
                    type="Date"
                    name="joiningdate"
                    value={formData.joiningdate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Register
                </button>
              </form>
            ) : (
              <p style={{ color: "green" }}>✅ Registered Successfully.</p>
            )}
          </div>
        </div>
      </center>
    </div>
  );
}

const validateField = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.length < 3) return "Minimum 3 characters required";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
      return "";

    default:
      return "";
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    value
  }));

  setErrors((prev) => ({
    ...prev,
    validateField(name, value)
  }));
};

export default EmployeeRegistration;
