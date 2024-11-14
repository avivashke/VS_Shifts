import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calendar, Users, BarChart2, Settings } from 'lucide-react';
import Logo from '../assets/voicespin_logo2.png';

function RootLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b flex justify-center items-center">
          <img 
            src={Logo} 
            alt="VoiceSpin.com"
            className="h-16 w-auto object-contain"
          />
        </div>

        <nav className="mt-6 flex-1">
          <Link
            to="/"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Schedule
          </Link>
          <Link
            to="/employees"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-3" />
            Employees
          </Link>
          <Link
            to="/reports"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Reports
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;