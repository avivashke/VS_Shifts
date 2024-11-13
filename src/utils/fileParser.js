import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s-']+$/,
    message: 'Name must contain only letters, spaces, hyphens, and apostrophes'
  },
  employeeId: {
    required: true,
    pattern: /^[A-Z0-9]{3,10}$/,
    message: 'Employee ID must be 3-10 characters of uppercase letters and numbers'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  phone: {
    pattern: /^\+?[\d\s-]{10,}$/,
    message: 'Invalid phone number format'
  },
  department: {
    required: true,
    enum: ['Sales', 'Support', 'Technical', 'Administrative'],
    message: 'Invalid department'
  },
  role: {
    required: true,
    enum: ['Agent', 'Team Lead', 'Supervisor', 'Manager'],
    message: 'Invalid role'
  }
};

// Validate a single field
const validateField = (field, value, rule) => {
  if (rule.required && !value) {
    return `${field} is required`;
  }
  if (rule.minLength && value.length < rule.minLength) {
    return `${field} must be at least ${rule.minLength} characters`;
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message;
  }
  if (rule.enum && !rule.enum.includes(value)) {
    return `${field} must be one of: ${rule.enum.join(', ')}`;
  }
  return null;
};

// Validate row data
const validateRow = (row, rowIndex) => {
  const errors = [];
  
  Object.keys(validationRules).forEach(field => {
    const rule = validationRules[field];
    const value = row[field];
    const error = validateField(field, value, rule);
    
    if (error) {
      errors.push({
        row: rowIndex,
        field,
        message: error
      });
    }
  });
  
  return errors;
};

// Parse Excel file
export const parseExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        // Transform and validate data
        const { transformedData, validationErrors } = processData(jsonData);
        
        resolve({ data: transformedData, errors: validationErrors });
      } catch (error) {
        reject(new Error('Error processing Excel file: ' + error.message));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
};

// Parse CSV file
export const parseCSVFile = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const { transformedData, validationErrors } = processData(results.data);
          resolve({ data: transformedData, errors: validationErrors });
        } catch (error) {
          reject(new Error('Error processing CSV file: ' + error.message));
        }
      },
      error: (error) => reject(new Error('Error parsing CSV: ' + error.message))
    });
  });
};

// Process and validate data
const processData = (jsonData) => {
  const transformedData = jsonData.map(row => ({
    name: row.Name || row.name || '',
    employeeId: (row['Employee ID'] || row.EmployeeID || row.employeeId || '').toString(),
    email: row.Email || row.email || '',
    phone: row.Phone || row.phone || '',
    department: row.Department || row.department || '',
    role: row.Role || row.role || '',
    skills: (row.Skills || row.skills || '').split(',').map(s => s.trim()).filter(Boolean)
  }));

  const validationErrors = [];
  transformedData.forEach((row, index) => {
    const rowErrors = validateRow(row, index);
    validationErrors.push(...rowErrors);
  });

  return { transformedData, validationErrors };
};

// Generate Excel template
export const generateExcelTemplate = () => {
  const template = [
    {
      Name: 'John Doe',
      'Employee ID': 'EMP001',
      Email: 'john@example.com',
      Phone: '123-456-7890',
      Department: 'Sales',
      Role: 'Agent',
      Skills: 'Phone,Email,Chat'
    }
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(template);

  // Add column widths
  ws['!cols'] = [
    { wch: 20 }, // Name
    { wch: 15 }, // Employee ID
    { wch: 25 }, // Email
    { wch: 15 }, // Phone
    { wch: 15 }, // Department
    { wch: 15 }, // Role
    { wch: 30 }, // Skills
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Employee Template");
  
  return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
};