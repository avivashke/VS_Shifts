import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Template for Excel structure
const EXCEL_TEMPLATE = {
  required: ['name', 'employeeId', 'role', 'email'],
  headers: {
    name: 'Name',
    employeeId: 'Employee ID',
    role: 'Role',
    email: 'Email',
    phone: 'Phone',
    department: 'Department',
    skills: 'Skills',
    availability: 'Availability'
  }
};

export const exportToExcel = (employees) => {
  // Transform data for export
  const exportData = employees.map(employee => ({
    'Name': employee.name,
    'Employee ID': employee.employeeId,
    'Role': employee.role,
    'Email': employee.email,
    'Phone': employee.phone,
    'Department': employee.department,
    'Skills': employee.skills?.join(', ') || '',
    'Availability': JSON.stringify(employee.availability)
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Employees');

  // Generate and save file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, 'employees.xlsx');
};

export const importFromExcel = async (file) => {
  try {
    const data = await readExcelFile(file);
    validateExcelData(data);
    return transformExcelData(data);
  } catch (error) {
    throw new Error(`Import failed: ${error.message}`);
  }
};

const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Invalid Excel file format'));
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsArrayBuffer(file);
  });
};

const validateExcelData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No data found in Excel file');
  }

  const missingFields = [];
  EXCEL_TEMPLATE.required.forEach(field => {
    if (!data[0].hasOwnProperty(field)) {
      missingFields.push(EXCEL_TEMPLATE.headers[field]);
    }
  });

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
};

const transformExcelData = (data) => {
  return data.map(row => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: row['Name'],
    employeeId: row['Employee ID']?.toString(),
    role: row['Role'],
    email: row['Email'],
    phone: row['Phone'] || '',
    department: row['Department'] || '',
    skills: row['Skills']?.split(',').map(skill => skill.trim()) || [],
    availability: tryParseJSON(row['Availability']) || {
      monday: { isAvailable: true, hours: '9-17' },
      tuesday: { isAvailable: true, hours: '9-17' },
      wednesday: { isAvailable: true, hours: '9-17' },
      thursday: { isAvailable: true, hours: '9-17' },
      friday: { isAvailable: true, hours: '9-17' },
      saturday: { isAvailable: false, hours: '' },
      sunday: { isAvailable: false, hours: '' },
    }
  }));
};

const tryParseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};