import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Schedule from './pages/Schedule';
import Employees from './pages/Employees';
import AppProvider from './context/AppContext';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ErrorBoundary from './utils/ErrorBoundary';
import ReportDashboard from './pages/Reports/ReportDashboard';
import ReportConfiguration from './pages/Reports/ReportConfiguration';
import ReportScheduler from './pages/Reports/ReportScheduler';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Schedule />} />
            <Route path="employees" element={<Employees />} />
            <Route path="reports" element={<Reports />}>
              <Route index element={<ReportDashboard />} />
              <Route path="settings" element={<ReportConfiguration />} />
              <Route path="scheduler" element={<ReportScheduler />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;