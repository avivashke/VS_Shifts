import React from 'react';
import { useApp } from '../context/AppContext';
import EmployeeList from '../components/Employees/EmployeeList';

function Employees() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management</h1>
      </div>
      <EmployeeList />
    </div>
  );
}

export default Employees;