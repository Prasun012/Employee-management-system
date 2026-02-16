import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import '../styles/EmployeeList.css';

const EmployeeList = ({ onEdit, onDelete, onAddNew }) => {
  const { employees } = useContext(EmployeeContext);

  if (employees.length === 0) {
    return (
      <div className="employee-list-container">
        <div className="empty-state">
          <p>No employees found</p>
          <button className="btn-add" onClick={onAddNew}>
            Add First Employee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <h2>Employees</h2>
        <button className="btn-add" onClick={onAddNew}>
          + Add New Employee
        </button>
      </div>

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>${Number(employee.salary).toLocaleString()}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
