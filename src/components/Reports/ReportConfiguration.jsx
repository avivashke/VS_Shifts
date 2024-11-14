import React, { useState, useEffect } from 'react';
import { Clock, Mail, Calendar, RefreshCw } from 'lucide-react';

function ReportConfiguration() {
  const [reportSettings, setReportSettings] = useState({
    daily: {
      isActive: true,
      sendTime: '08:00',
      recipients: [],
      includeCharts: true
    },
    weekly: {
      isActive: true,
      sendTime: '09:00',
      sendDay: 'Monday',
      recipients: [],
      includeCharts: true
    },
    monthly: {
      isActive: true,
      sendTime: '10:00',
      sendDate: 1, // 1st of each month
      recipients: [],
      includeCharts: true
    }
  });

  const [newEmail, setNewEmail] = useState('');

  const handleEmailAdd = (type) => {
    if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
      setReportSettings(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          recipients: [...prev[type].recipients, newEmail]
        }
      }));
      setNewEmail('');
    }
  };

  const handleEmailRemove = (type, email) => {
    setReportSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        recipients: prev[type].recipients.filter(e => e !== email)
      }
    }));
  };

  const handleSave = async () => {
    try {
      await fetch('/api/settings/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportSettings)
      });
      alert('Report settings saved successfully!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <RefreshCw className="w-5 h-5 mr-2" />
            Daily Reports
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={reportSettings.daily.isActive}
              onChange={e => setReportSettings(prev => ({
                ...prev,
                daily: { ...prev.daily, isActive: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Send Time</label>
            <input
              type="time"
              value={reportSettings.daily.sendTime}
              onChange={e => setReportSettings(prev => ({
                ...prev,
                daily: { ...prev.daily, sendTime: e.target.value }
              }))}
              className="border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipients</label>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Enter email address"
                className="border rounded p-2 flex-1"
              />
              <button
                onClick={() => handleEmailAdd('daily')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {reportSettings.daily.recipients.map(email => (
                <span
                  key={email}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                >
                  {email}
                  <button
                    onClick={() => handleEmailRemove('daily', email)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Reports - Similar structure */}
      {/* ... */}

      {/* Monthly Reports - Similar structure */}
      {/* ... */}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default ReportConfiguration;