import React, { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

function ImportPreviewModal({ isOpen, onClose, data, validationErrors, onConfirm }) {
  const [selectedRows, setSelectedRows] = useState([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Validation Summary */}
        {validationErrors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg">
            <h3 className="text-red-800 font-medium mb-2">Validation Errors Found:</h3>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-600">
                  Row {error.row}: {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Data Preview Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                {Object.keys(data[0] || {}).map(header => (
                  <th 
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => {
                const rowErrors = validationErrors.filter(e => e.row === index);
                return (
                  <tr key={index} className={rowErrors.length > 0 ? 'bg-red-50' : ''}>
                    <td className="px-6 py-4">
                      {rowErrors.length > 0 ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </td>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap">
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(data.filter((_, index) => !validationErrors.some(e => e.row === index)))}
            disabled={validationErrors.length === data.length}
            className={`px-4 py-2 rounded-lg ${
              validationErrors.length === data.length
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Import Valid Rows
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportPreviewModal;