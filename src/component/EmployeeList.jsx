import "../css/EmployeeList.css";

export default function EmployeeList({ employees, setEmployees }) {

  const deleteUser = (empid) => {
    setEmployees(
      employees.filter((emp) => emp.empid !== empid)
    );
  };

  return (
    <div className="employee-container">
      {employees.map((employee) => (
        <div className="employee-card" key={employee.empid}>

          <p><b>Employee ID:</b> {employee.empid}</p>

          <p><b>Employee Name:</b> {employee.empname}</p>

          <p><b>Employee Email:</b> {employee.email}</p>

          <p><b>Department:</b> {employee.department}</p>

          <p><b>Designation:</b> {employee.designation}</p>

          <p><b>Joining Date:</b> {employee.joiningdate}</p>

          <button
            className="delete-btn"
            onClick={() => deleteUser(employee.empid)}
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}