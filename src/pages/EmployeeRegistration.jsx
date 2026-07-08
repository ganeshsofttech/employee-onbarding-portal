import React, { useEffect, useState } from "react";
import fs from "fs";
import empdetails from "../data/empdetails.json";
import employees from "../data/employees";
import "./empreg.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function EmployeeRegistration() {
  const [editId, setEditId] = useState(null);
  const location = useLocation();

  const editEmployee = location.state?.employee;
  useEffect(() => {
    if (editEmployee) {
      setFormData({
        empid: editEmployee.empid,
        empname: editEmployee.empname,
        email: editEmployee.email,
        department: editEmployee.department,
        designation: editEmployee.designation,
        joiningdate: editEmployee.joiningdate.substring(0, 10),
      });

      setEditId(editEmployee._id);
    }
  }, [editEmployee]);

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
  const [submitted, setSubmitted] = useState("");
  const [errors, setErrors] = useState({
    empid: "",
    empname: "",
    email: "",
    department: "",
    designation: "",
    joiningdate: "",
  });
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
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        newErrors.empname = "Only Alphabets allowed";
      }
    }
    if (name === "department") {
      if (!value.trim()) {
        newErrors.department = "Department Name is required";
      } else if (value.length <= 1) {
        newErrors.department = "Department name must be at least 2 charater";
      }
    }
    // setErrors(newErrors);

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
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
    // if (Object.keys(errors).length === 0) {
    //   alert("Form Submitted Successfully");

    //   console.log("Form submitted:", formData);
    //   employees.push({ empid: employees.length + 1, ...formData });

    //   setSubmitted(true);

    //   // Reset form after submission
    //   setFormData({
    //     empid: "",
    //     empname: "",
    //     email: "",
    //     department: "",
    //     designation: "",
    //     joiningdate: "",
    //   });
    // } else {
    //   alert(Object.values(errors).toString());
    // }

    const isValid = validateForm();

    if (isValid) {
      // alert("Form Submitted Successfully");

      // employees.push({
      //   empid: employees.length + 1,
      //   ...formData,
      // });

      // POST Data to Mongo DB
      if (editId) {
        // Update

        axios
          .put(`http://localhost:3000/api/employee/${editId}`, formData)
          .then((response) => {
            console.log(response.data);
            setSubmitted("✅ Updated Successfully.");
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        
        setTimeout(() => {
          setSubmitted("");
        }, 3000);

        // setEditEmployee(null);
        setEditId(null);
      } else {
        axios
          .post("http://localhost:3000/api/employee", formData)
          .then((response) => {
            console.log("Employee added:", response.data);
            setSubmitted("✅ Registered Successfully.");
          })
          .catch((error) => {
            console.log(error);
             alert(error);
          });

        
        setTimeout(() => {
          setSubmitted("");
        }, 3000);
      }
      setFormData({
        empid: "",
        empname: "",
        email: "",
        department: "",
        designation: "",
        joiningdate: "",
      });
    } else {
      alert("Please fix the validation errors.");
    }
  };
  const validateField = (name, value) => {
    switch (name) {
      case "empid":
        if (!value) return "Employee ID is required";
        return "";

      case "empname":
        if (!value.trim()) return "Employee Name is required";
        if (!/^[A-Za-z ]+$/.test(value)) return "Only alphabets allowed";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
        return "";

      case "department":
        if (!value.trim()) return "Department is required";
        if (value.length < 2)
          return "Department should be at least 2 characters";
        return "";

      case "designation":
        if (!value.trim()) return "Designation is required";
        return "";

      case "joiningdate":
        if (!value) return "Joining Date is required";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <div>
      <div className="page-container">
        <center>
          <div>
            <div className="form-card">

              <h2 className="form-title">{editId ? "Update" : "Register"} Employee</h2>
              {submitted && <div className="success-message">{submitted}</div>}
              {/* {!submitted ? ( */}
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
                {/* <div className="form-group">
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
                </div> */}
                <div className="form-group">
                  <label className="form-label">Employee Department:</label>

                  <select
                    className="form-input"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Management">Management</option>
                  </select>

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
                {/* <button type="submit" className="submit-btn">
                  Register
                </button> */}
                <button type="submit" className="submit-btn">
                  {editId ? "Update" : "Register"}
                </button>
              </form>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default EmployeeRegistration;
