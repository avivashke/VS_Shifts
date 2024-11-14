// src/pages/Reports/ReportConfiguration.jsx
import React, { useState } from 'react';

const ReportConfiguration = () => {
  const [reportTypes] = useState([
    { id: 'schedule', name: 'סקירת לוח זמנים', enabled: true },
    { id: 'hours', name: 'שעות עובדים', enabled: true },
    { id: 'coverage', name: 'כיסוי מחלקתי', enabled: false },
    { id: 'costs', name: 'עלויות עבודה', enabled: false }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportSelect = (reportId) => {
    setSelectedReport(reportId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rtl">
      {/* Report Types List */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">סוגי דוחות</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {reportTypes.map((report) => (
                <li
                  key={report.id}
                  className={`p-3 rounded cursor-pointer ${
                    selectedReport === report.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleReportSelect(report.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{report.name}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {report.enabled ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="md:col-span-2">
        {selectedReport ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              הגדרת {reportTypes.find(r => r.id === selectedReport)?.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  שם הדוח
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  placeholder="הכנס שם דוח"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תיאור
                </label>
                <textarea
                  className="w-full border rounded-md p-2"
                  rows="3"
                  placeholder="הכנס תיאור דוח"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  כלול סעיפים
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    סטטיסטיקות כלליות
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    פירוט מפורט
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    תרשימים וגרפים
                  </label>
                </div>
              </div>
              <div className="pt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  שמור הגדרות
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500">בחר סוג דוח להגדרה</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportConfiguration;