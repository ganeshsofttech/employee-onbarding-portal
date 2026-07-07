export default function EmployeeList({ employees }) {
  return (
    <div>
      {employees.map((employee) => (
        // <employeeCard key={employee.id} employee={employee} />
        <div
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 15,
          }}
        >
          <p>Employee ID   :{employee.empid}</p>

          <p>Employee Name :{employee.empname}</p>

          <p>Employee Email:{employee.email}</p>

          <p>Employee Department:{employee.department}</p>

          {/* <p>Stock : {employee.stock}</p>

          <button onClick={() => addToCart(employee)}>Add To Cart</button>

          <br />
          <br />

          <Link to={`/employees/${employee.id}`}>View Details</Link> */}
        </div>
      ))}
    </div>
  );
}
