import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

// Create the context
const AppContext = createContext(null);

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export function AppProvider({ children }) {
  // Load initial state from localStorage
  const [employees, setEmployees] = useState(() => 
    loadFromLocalStorage('employees', [])
  );
  const [shifts, setShifts] = useState(() => 
    loadFromLocalStorage('shifts', [])
  );
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Persist state changes
  useEffect(() => {
    saveToLocalStorage('employees', employees);
  }, [employees]);

  useEffect(() => {
    saveToLocalStorage('shifts', shifts);
  }, [shifts]);

  // Employee management functions
  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now().toString() }]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...updatedEmployee, id } : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Shift management functions
  const addShift = (shift) => {
    setShifts([...shifts, { ...shift, id: Date.now().toString() }]);
  };

  const updateShift = (id, updatedShift) => {
    setShifts(shifts.map(shift => 
      shift.id === id ? { ...updatedShift, id } : shift
    ));
  };

  const deleteShift = (id) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const value = {
    // State
    employees,
    shifts,
    viewMode,
    selectedDate,
    
    // Setters
    setViewMode,
    setSelectedDate,
    
    // Employee functions
    addEmployee,
    updateEmployee,
    deleteEmployee,
    
    // Shift functions
    addShift,
    updateShift,
    deleteShift
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;