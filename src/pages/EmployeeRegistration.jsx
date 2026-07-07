import React, { useState } from "react";
import fs from "fs";
import empdetails from "../data/empdetails.json";
import employees from "../data/employees";
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
    const { name, value } = e.target; // extract field name and value
    setFormData({
      ...formData,
      [name]: value, // update only the changed field
    });
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
    if(formData.department.length < 1){
      newErrors.department = "Department name must be at least 2 charater";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (validate()) {
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
    }
  };

  return (
    <div>
      <center>
        <h2>Register Employee</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label>
              Employee Id:
              <input
                type="number"
                name="empid"
                value={formData.empid}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Employee Name:
              <input
                type="text"
                name="empname"
                value={formData.empname}
                onChange={handleChange}
              />
              {errors.empname && (
                <p style={{ color: "red" }}>{errors.empname}</p>
              )}
            </label>

            <label>
              Employee Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </label>

            <label>
              Employee Department:
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              {errors.department && <p style={{ color: "red" }}>{errors.department}</p>}
            </label>
            <label>
              Employee Designation:
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Employee Joining Date:
              <input
                type="Date"
                name="joiningdate"
                value={formData.joiningdate}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Register</button>
          </form>
        ) : (
          <p style={{ color: "green" }}>✅ Registered Successfully.</p>
        )}
      </center>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "400px",
    marginTop: "20px",
  },
};

export default EmployeeRegistration;
