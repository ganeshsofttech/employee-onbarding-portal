import employees from "../data/employees";
import EmployeeList from "../component/EmployeeList"
export default function EmployeesDetails() {
  return (
    <div>
      <h3>All Employee Details</h3>

      <EmployeeList employees={employees} />

    </div>
  );
}
