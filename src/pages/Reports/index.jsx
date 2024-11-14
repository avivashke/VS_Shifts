// src/pages/Reports/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

const Reports = () => {
  const location = useLocation();

  const tabs = [
    { path: '/reports', label: 'לוח בקרה', exact: true },
    { path: '/reports/settings', label: 'הגדרת דוחות' },
    { path: '/reports/scheduler', label: 'תזמון דוחות' }
  ];

  return (
    <div className="p-4 rtl">
      <h1 className="text-2xl font-bold mb-6">דוחות</h1>
      
      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <nav className="flex space-x-reverse space-x-4">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`py-2 px-4 -mb-px ${
                (tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path))
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Render child routes */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Reports;