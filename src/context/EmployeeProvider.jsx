import { useState, useCallback, useEffect } from 'react';
import { EmployeeContext } from './EmployeeContext';

const EMPLOYEES_STORAGE_KEY = 'employees';
const NEXT_ID_STORAGE_KEY = 'nextId';

const defaultEmployees = [
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
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultEmployees;
  });

  const [nextId, setNextId] = useState(() => {
    const stored = localStorage.getItem(NEXT_ID_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 3;
  });

  // Save employees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  // Save nextId to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(NEXT_ID_STORAGE_KEY, nextId.toString());
  }, [nextId]);

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
