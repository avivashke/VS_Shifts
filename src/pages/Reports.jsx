import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Reports() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex space-x-4">
          <Link
            to="/reports"
            className={`px-4 py-2 rounded-lg ${
              location.pathname === '/reports' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/reports/settings"
            className={`px-4 py-2 rounded-lg ${
              location.pathname.includes('/settings') 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Report Settings
          </Link>
          <Link
            to="/reports/scheduler"
            className={`px-4 py-2 rounded-lg ${
              location.pathname.includes('/scheduler') 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Schedule Reports
          </Link>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        {location.pathname === '/reports' && 'Reports Dashboard'}
        {location.pathname.includes('/settings') && 'Reports → Settings'}
        {location.pathname.includes('/scheduler') && 'Reports → Scheduler'}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default Reports;