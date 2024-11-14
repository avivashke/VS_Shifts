// src/pages/Reports/ReportDashboard.jsx
import React, { useState, useEffect } from 'react';

const MetricCard = ({ title, value, subtext }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-semibold">{value}</p>
    {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const ReportDashboard = () => {
  // Sample data - replace with actual API calls
  const [metrics, setMetrics] = useState({
    totalShifts: 145,
    totalHours: 1160,
    averageShiftLength: 8,
    employeesScheduled: 32,
    actualHoursWorked: 1130, // New metric
    hoursVariance: -30, // New metric (actual - scheduled)
    attendanceRate: 97 // New metric (%)
  });

  const [recentReports] = useState([
    {
      id: 1,
      name: 'סקירת לוח זמנים חודשית',
      date: '14/03/2024',
      status: 'הושלם',
      type: 'comparison'
    },
    {
      id: 2,
      name: 'סיכום שעות עובדים',
      date: '13/03/2024',
      status: 'ממתין',
      type: 'hours'
    },
    {
      id: 3,
      name: 'דוח כיסוי מחלקתי',
      date: '12/03/2024',
      status: 'הושלם',
      type: 'coverage'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Function to generate new report
  const handleNewReport = () => {
    setIsModalOpen(true);
  };

  // Function to refresh data
  const handleRefresh = () => {
    // Add API call to refresh data
    console.log('Refreshing data...');
  };

  // Function to view report
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="rtl">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="סה״כ משמרות" 
          value={metrics.totalShifts} 
        />
        <MetricCard 
          title="סה״כ שעות מתוכננות" 
          value={metrics.totalHours}
          subtext={`בפועל: ${metrics.actualHoursWorked} שעות`}
        />
        <MetricCard 
          title="אורך משמרת ממוצע" 
          value={`${metrics.averageShiftLength} שעות`} 
        />
        <MetricCard 
          title="עובדים משובצים" 
          value={metrics.employeesScheduled}
          subtext={`אחוז נוכחות: ${metrics.attendanceRate}%`}
        />
      </div>

      {/* Variance Analysis */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h3 className="text-lg font-semibold mb-4">ניתוח פערים</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="text-sm text-gray-500">פער שעות</div>
            <div className={`text-xl font-semibold ${metrics.hoursVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.hoursVariance > 0 ? '+' : ''}{metrics.hoursVariance} שעות
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="text-sm text-gray-500">אחוז נוכחות</div>
            <div className="text-xl font-semibold">
              {metrics.attendanceRate}%
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="text-sm text-gray-500">יעילות תזמון</div>
            <div className="text-xl font-semibold">
              {((metrics.actualHoursWorked / metrics.totalHours) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">דוחות אחרונים</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleNewReport}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              דוח חדש
            </button>
            <button 
              onClick={handleRefresh}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              רענן נתונים
            </button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right text-gray-600">
                <th className="pb-3 pr-4">שם הדוח</th>
                <th className="pb-3 px-4">תאריך</th>
                <th className="pb-3 px-4">סטטוס</th>
                <th className="pb-3 pl-4">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-t">
                  <td className="py-3 pr-4">{report.name}</td>
                  <td className="py-3 px-4">{report.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        report.status === 'הושלם'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 pl-4">
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => handleViewReport(report)}
                    >
                      צפה
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {selectedReport ? 'פרטי דוח' : 'יצירת דוח חדש'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {/* Add report creation/viewing form here */}
            <div className="space-y-4">
              {/* Form content will go here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDashboard;