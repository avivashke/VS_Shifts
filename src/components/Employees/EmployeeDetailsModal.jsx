import React from 'react';

function EmployeeDetailsModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Employee Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <div className="mt-1 text-gray-900">{employee.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Employee ID</label>
                <div className="mt-1 text-gray-900">{employee.employeeId}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Role</label>
                <div className="mt-1 text-gray-900">{employee.role}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Department</label>
                <div className="mt-1 text-gray-900">{employee.department}</div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-gray-900">{employee.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <div className="mt-1 text-gray-900">{employee.phone}</div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.skills?.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Weekly Availability</h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(employee.availability || {}).map(([day, value]) => (
                <div key={day} className="flex items-center justify-between py-2 border-b">
                  <span className="capitalize">{day}</span>
                  <span>
                    {value.isAvailable ? value.hours : 'Not Available'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsModal;