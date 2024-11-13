import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

function ShiftModal({ isOpen, onClose, timeSlot, onSave }) {
  const { employees } = useApp();
  const [shiftData, setShiftData] = useState({
    employeeId: '',
    date: timeSlot ? timeSlot.date : '',
    startTime: timeSlot ? timeSlot.time : '',
    endTime: '',
    role: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(shiftData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Shift</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Employee</label>
            <select
              className="w-full border rounded p-2"
              value={shiftData.employeeId}
              onChange={(e) => setShiftData({ ...shiftData, employeeId: e.target.value })}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                className="w-full border rounded p-2"
                value={shiftData.startTime}
                onChange={(e) => setShiftData({ ...shiftData, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                className="w-full border rounded p-2"
                value={shiftData.endTime}
                onChange={(e) => setShiftData({ ...shiftData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              className="w-full border rounded p-2"
              value={shiftData.notes}
              onChange={(e) => setShiftData({ ...shiftData, notes: e.target.value })}
              rows="3"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShiftModal;