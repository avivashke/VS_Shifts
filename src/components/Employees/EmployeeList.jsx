import React, { useState } from 'react';
import { Upload, Download, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmployeeModal from './EmployeeModal';

function EmployeeList() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle file import
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      setLoading(true);
      let result;
      
      if (file.name.endsWith('.csv')) {
        result = await parseCSVFile(file);
      } else {
        result = await parseExcelFile(file);
      }
  
      setPreviewData(result.data);
      setValidationErrors(result.errors);
      setShowPreviewModal(true);
    } catch (error) {
      alert('Error importing file: ' + error.message);
    } finally {
      setLoading(false);
      event.target.value = null;
    }
  };
  
  const handleImportConfirm = (validData) => {
    validData.forEach(emp => addEmployee(emp));
    setShowPreviewModal(false);
    setPreviewData(null);
    setValidationErrors([]);
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(employee =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Add Employee Button */}
          <button
            onClick={() => {
              setSelectedEmployee(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Employee
          </button>

          {/* Import Button */}
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </label>
          </div>

          {/* Export Button */}
          <button
            onClick={() => {
              // Add export functionality here
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {employee.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this employee?')) {
                        deleteEmployee(employee.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No employees found
          </div>
        )}
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={(employeeData) => {
          if (selectedEmployee) {
            updateEmployee(selectedEmployee.id, employeeData);
          } else {
            addEmployee(employeeData);
          }
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default EmployeeList;