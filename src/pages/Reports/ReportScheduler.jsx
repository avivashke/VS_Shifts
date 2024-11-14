// src/pages/Reports/ReportScheduler.jsx
import React, { useState } from 'react';

const ReportScheduler = () => {
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'סיכום שבועי של לוח זמנים',
      frequency: 'שבועי',
      nextRun: '20/03/2024',
      recipients: ['team@example.com']
    },
    {
      id: 2,
      name: 'דוח שעות חודשי',
      frequency: 'חודשי',
      nextRun: '01/04/2024',
      recipients: ['manager@example.com']
    }
  ]);

  // State for new report modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    frequency: 'שבועי',
    nextRun: '',
    recipients: ''
  });

  const handleCreateReport = () => {
    const report = {
      id: Date.now(),
      ...newReport,
      recipients: newReport.recipients.split(',').map(email => email.trim())
    };
    setScheduledReports([...scheduledReports, report]);
    setIsModalOpen(false);
    setNewReport({ name: '', frequency: 'שבועי', nextRun: '', recipients: '' });
  };

  const handleDeleteReport = (id) => {
    setScheduledReports(scheduledReports.filter(report => report.id !== id));
  };

  return (
    <div className="space-y-6 rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">דוחות מתוזמנים</h2>
          <p className="text-gray-500 text-sm">ניהול ותזמון דוחות אוטומטיים</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          תזמן דוח חדש
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-right text-gray-500 text-sm">
              <th className="px-6 py-3">שם הדוח</th>
              <th className="px-6 py-3">תדירות</th>
              <th className="px-6 py-3">ריצה הבאה</th>
              <th className="px-6 py-3">נמענים</th>
              <th className="px-6 py-3">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {scheduledReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4">{report.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {report.frequency}
                  </span>
                </td>
                <td className="px-6 py-4">{report.nextRun}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {report.recipients.map((email, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                      >
                        {email}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 mx-2">
                    מתקשר
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">תזמן דוח חדש</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  שם הדוח
                </label>
                <input
                  type="text"
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תדירות
                </label>
                <select
                  value={newReport.frequency}
                  onChange={(e) => setNewReport({ ...newReport, frequency: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  <option value="שבועי">שבועי</option>
                  <option value="חודשי">חודשי</option>
                  <option value="יומי">יומי</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תאריך התחלה
                </label>
                <input
                  type="date"
                  value={newReport.nextRun}
                  onChange={(e) => setNewReport({ ...newReport, nextRun: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  נמענים (הפרד באמצעות פסיקים)
                </label>
                <input
                  type="text"
                  value={newReport.recipients}
                  onChange={(e) => setNewReport({ ...newReport, recipients: e.target.value })}
                  className="w-full border rounded-md p-2"
                  placeholder="email@example.com, email2@example.com"
                />
              </div>
              <div className="flex justify-end space-x-reverse space-x-2 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  ביטול
                </button>
                <button
                  onClick={handleCreateReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  צור דוח
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportScheduler;