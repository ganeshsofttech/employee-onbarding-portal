import { useEffect, useState } from "react";
import employeesData from "../data/employees";
import EmployeeList from "../component/EmployeeList";
import axios from "axios";
import EmployeeRegistration from "./EmployeeRegistration";
import "../css/EmployeesDetails.css";

export default function EmployeesDetails() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="employees-page">
      <h3 className="page-title">All Employee Details</h3>
      {/* Add message here */}
      {message && <div className="success-message">{message}</div>}

      {/* {editEmployee && (
        <EmployeeRegistration
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
        
        />
        
      )} */}
      <EmployeeList
        employees={employees}
        setEmployees={setEmployees}
        message={message}
        setMessage={setMessage}
        setEditEmployee={setEditEmployee}
      />
    </div>
  );
}
