import { useState } from "react";
import employeesData from "../data/employees";
import EmployeeList from "../component/EmployeeList";
import "../css/EmployeesDetails.css";

export default function EmployeesDetails() {
  const [employees, setEmployees] = useState(employeesData);

  return (
    <div className="employees-page">
      <h3 className="page-title">All Employee Details</h3>

      <EmployeeList
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
}