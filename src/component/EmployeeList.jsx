import "../css/EmployeeList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeList({
  employees,
  setEmployees,
  message,
  setMessage,
  setEditEmployee,
}) {
  const navigate = useNavigate();
  const deleteUser = (empid) => {
    setEmployees(employees.filter((emp) => emp.empid !== empid));
  };
  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3000/api/employee/${id}`)
      .then((response) => {
        console.log("Employee deleted:", response.data);
        setMessage(response.data.message);

        // Remove deleted employee from UI
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id),
        );
        // Hide message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleEdit = (employee) => {
    setEditId(employee._id);

    setFormData({
      empid: employee.empid,
      empname: employee.empname,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      joiningdate: employee.joiningdate.substring(0, 10),
    });
  };

  return (
    <div className="employee-container">
      {employees.map((employee) => (
        <div className="employee-card" key={employee.empid}>
          <p>
            <b>Employee ID:</b> {employee.empid}
          </p>

          <p>
            <b>Employee Name:</b> {employee.empname}
          </p>

          <p>
            <b>Employee Email:</b> {employee.email}
          </p>

          <p>
            <b>Department:</b> {employee.department}
          </p>

          <p>
            <b>Designation:</b> {employee.designation}
          </p>

          <p>
            <b>Joining Date:</b> {employee.joiningdate}
          </p>

          <button
            className="delete-btn"
            onClick={() => deleteEmployee(employee._id)}
          >
            Delete
          </button>
          {/* <button onClick={() => setEditEmployee(employee)}>Edit</button> */}
          <button className="edit-btn"
            onClick={() => {
              navigate("/employeeregistration", {
                state: {
                  employee: employee,
                },
              });
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
