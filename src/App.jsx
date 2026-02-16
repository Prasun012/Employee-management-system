import { useState, useContext } from 'react';
import { EmployeeProvider } from './context/EmployeeProvider';
import { EmployeeContext } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const { deleteEmployee } = useContext(EmployeeContext);

  const handleAddNew = () => {
    setCurrentView('add');
  };

  const handleEdit = (employeeId) => {
    setEditingEmployeeId(employeeId);
    setCurrentView('edit');
  };

  const handleDelete = (employeeId) => {
    deleteEmployee(employeeId);
    setCurrentView('list');
  };

  const handleSuccess = () => {
    setCurrentView('list');
    setEditingEmployeeId(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Employee Management System</h1>
      </header>

      <main className="app-main">
        {currentView === 'list' && (
          <EmployeeList
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {currentView === 'add' && <AddEmployee onSuccess={handleSuccess} />}
        {currentView === 'edit' && (
          <EditEmployee
            employeeId={editingEmployeeId}
            onSuccess={handleSuccess}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <>boo you!</>
  )
}

export default App
