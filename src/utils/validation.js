export const validateEmployee = (employee) => {
    const errors = {};
  
    // Name validation
    if (!employee.name) {
      errors.name = 'Name is required';
    } else if (employee.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
  
    // Employee ID validation
    if (!employee.employeeId) {
      errors.employeeId = 'Employee ID is required';
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employee.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(employee.email)) {
      errors.email = 'Invalid email format';
    }
  
    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (employee.phone && !phoneRegex.test(employee.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  
    // Role validation
    if (!employee.role) {
      errors.role = 'Role is required';
    }
  
    // Department validation
    if (!employee.department) {
      errors.department = 'Department is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };