import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeForm from '../components/EmployeeForm';

const EditEmployee = ({ employeeId, onSuccess }) => {
  const { getEmployeeById, updateEmployee } = useContext(EmployeeContext);
  const employee = getEmployeeById(parseInt(employeeId));

  const handleSubmit = (formData) => {
    updateEmployee(parseInt(employeeId), formData);
    onSuccess();
  };

  const handleCancel = () => {
    onSuccess();
  };

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditMode={true}
    />
  );
};

export default EditEmployee;
