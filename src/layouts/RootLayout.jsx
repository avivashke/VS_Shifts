import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import Logo from '../assets/voicespin_logo2.png';

function RootLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        {/* Logo section */}
        <div className="p-4 border-b flex justify-center items-center">
          <img 
            src={Logo} 
            alt="VoiceSpin.com"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation */}
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
          {/* Settings link removed */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;