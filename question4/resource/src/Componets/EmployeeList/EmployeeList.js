// EmployeeList.js

import React, { useState } from 'react';
import EditEmployeeModal from './EditEmployeeModal';

const EmployeeList = ({ employees, onUpdateAvailability, onEditEmployee, onDeleteEmployee }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleDeleteClick = (employee) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${employee.name}?`);
    if (shouldDelete) {
      onDeleteEmployee(employee.id);
    }
  };

  return (
    <div className="employee-list-container">
      {/* ... (rest of the code) */}

      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.designation} ({employee.available ? 'Available' : 'Not Available'})
            <button onClick={() => handleEditClick(employee)}>Edit</button>
            <button onClick={() => handleDeleteClick(employee)}>Delete</button>
            {/* ... (rest of the code) */}
          </li>
        ))}
      </ul>

      {showEditModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onUpdateEmployee={onEditEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
