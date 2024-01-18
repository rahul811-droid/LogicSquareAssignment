// Dashboard.js

import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Shuffle employees on page refresh
    const shuffledEmployees = [...employees].sort(() => Math.random() - 0.5);
    setEmployees(shuffledEmployees);
  }, [employees]);

  const handleUpdateAvailability = (employeeId, newAvailability) => {
    // Update availability for the specific employee
    const updatedEmployees = employees.map((employee) =>
      employee.id === employeeId ? { ...employee, available: newAvailability } : employee
    );

    setEmployees(updatedEmployees);
  };

  const handleAddEmployee = (newEmployee) => {
    // Update employee counts and add the new employee at the top
    setTotalEmployees((prevTotal) => prevTotal + 1);
    setAvailableEmployees((prevAvailable) => (newEmployee.available ? prevAvailable + 1 : prevAvailable));
    setEmployees((prevEmployees) => [newEmployee, ...prevEmployees]);
  };

  const handleEditEmployee = (editedEmployee) => {
    // Update the employee in the list
    const updatedEmployees = employees.map((employee) =>
      employee.id === editedEmployee.id ? { ...employee, ...editedEmployee } : employee
    );

    setEmployees(updatedEmployees);

    // Close the modal
    setShowEditModal(false);
  };

  const handleDeleteEmployee = (employeeId) => {
    // Filter out the deleted employee
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);

    // Update employee counts
    setTotalEmployees((prevTotal) => prevTotal - 1);
    setAvailableEmployees((prevAvailable) => {
      const deletedEmployee = employees.find((employee) => employee.id === employeeId);
      return deletedEmployee.available ? prevAvailable - 1 : prevAvailable;
    });

    setEmployees(updatedEmployees);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <div className="dashboard">
      {/* ... (rest of the code) */}

      <div className="employee-list">
        <button onClick={toggleAddModal}>Add Employee</button>
        <EmployeeList
          employees={employees}
          onUpdateAvailability={handleUpdateAvailability}
          onEditEmployee={(employee) => {
            setSelectedEmployee(employee);
            setShowEditModal(true);
          }}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </div>

      {showAddModal && <AddEmployeeModal onClose={toggleAddModal} onAddEmployee={handleAddEmployee} />}
      {showEditModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onUpdateEmployee={handleEditEmployee}
        />
      )}
    </div>
  );
};

export default Dashboard;
