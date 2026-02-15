import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployee = ({ onSuccess }) => {
  const { addEmployee } = useContext(EmployeeContext);

  const handleSubmit = (formData) => {
    addEmployee(formData);
    onSuccess();
  };

  const handleCancel = () => {
    onSuccess();
  };

  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditMode={false}
    />
  );
};

export default AddEmployee;
