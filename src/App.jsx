import { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeProvider';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const handleAddNew = () => {
    setCurrentView('add');
  };

  const handleEdit = (employeeId) => {
    setEditingEmployeeId(employeeId);
    setCurrentView('edit');
  };

  const handleDelete = () => {
    // Delete is handled in the context, just refresh the view
    setCurrentView('list');
  };

  const handleSuccess = () => {
    setCurrentView('list');
    setEditingEmployeeId(null);
  };

  return (
    <EmployeeProvider>
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
    </EmployeeProvider>
  );
}

export default App;
