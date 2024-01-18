// AddEmployeeModal.js

import React, { useState } from 'react';

const AddEmployeeModal = ({ onClose, onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '',
    age: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate mandatory fields and age as integer
    if (!newEmployee.name || !newEmployee.designation || !newEmployee.age || isNaN(parseInt(newEmployee.age, 10))) {
      setErrorMessage('Please fill all mandatory fields, and ensure age is a valid integer.');
      return;
    }

    // Clear error message on successful validation
    setErrorMessage('');

    // Call the parent component's function to add the new employee
    onAddEmployee(newEmployee);

    // Close the modal
    onClose();
  };

  return (
    <div className="add-employee-modal">
      <h2>Add Employee</h2>
      <label>
        Name:
        <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
      </label>
      <label>
        Designation:
        <input type="text" name="designation" value={newEmployee.designation} onChange={handleInputChange} />
      </label>
      <label>
        Age:
        <input type="text" name="age" value={newEmployee.age} onChange={handleInputChange} />
      </label>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleSubmit}>Add Employee</button>
    </div>
  );
};

export default AddEmployeeModal;
