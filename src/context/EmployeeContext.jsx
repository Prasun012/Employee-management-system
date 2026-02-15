import { useState, useCallback } from 'react';
import { EmployeeContext } from './EmployeeContextValue';

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Developer',
      department: 'IT',
      salary: 50000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      position: 'Manager',
      department: 'HR',
      salary: 60000,
    },
  ]);

  const [nextId, setNextId] = useState(3);

  // Add new employee
  const addEmployee = useCallback((employeeData) => {
    const newEmployee = {
      id: nextId,
      ...employeeData,
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setNextId((prev) => prev + 1);
    return newEmployee;
  }, [nextId]);

  // Update existing employee
  const updateEmployee = useCallback((id, employeeData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...employeeData } : emp))
    );
  }, []);

  // Delete employee
  const deleteEmployee = useCallback((id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  // Get employee by ID
  const getEmployeeById = useCallback(
    (id) => {
      return employees.find((emp) => emp.id === id);
    },
    [employees]
  );

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
