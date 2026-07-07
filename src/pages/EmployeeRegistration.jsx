import React, { useState } from "react";
import  fs  from "fs";
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

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target; // extract field name and value
    setFormData({
      ...formData,
      [name]: value, // update only the changed field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form submitted:", formData);
    employees.push({empid:employees.length + 1, ...formData});
    const jsonString = JSON.stringify(formData, null, 6); 
  
  // Write to file synchronously
  // fs.writeFileSync("../data/empdetails.json", jsonString, "utf8");
   // fs.writeFileSync(DATA_FILE, JSON.stringify(visitors, null, 4));
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
              required
            />
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
        <p style={{ color: "green" }}>
          ✅ Registered Successfully.
        </p>
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
