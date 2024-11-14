import React, { useState, useEffect } from 'react';
import { Clock, Mail, Calendar, Check } from 'lucide-react';

function ReportScheduler() {
  const [schedules, setSchedules] = useState({
    daily: {
      enabled: false,
      time: '08:00',
      emails: []
    },
    weekly: {
      enabled: false,
      time: '08:00',
      day: 'Monday',
      emails: []
    },
    monthly: {
      enabled: false,
      time: '08:00',
      day: 1,
      emails: []
    }
  });

  const [newEmail, setNewEmail] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleEmailAdd = (type) => {
    if (newEmail && /\S+@\S+\.\S+/.test(newEmail)) {
      setSchedules(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          emails: [...prev[type].emails, newEmail]
        }
      }));
      setNewEmail('');
    }
  };

  const handleEmailRemove = (type, emailToRemove) => {
    setSchedules(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        emails: prev[type].emails.filter(email => email !== emailToRemove)
      }
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/reports/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedules),
      });

      if (response.ok) {
        setSaveStatus('Settings saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setSaveStatus('Error saving settings');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Report Scheduling</h2>

      {/* Daily Reports */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Daily Reports</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={schedules.daily.enabled}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                daily: { ...prev.daily, enabled: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Send Time</label>
            <input
              type="time"
              value={schedules.daily.time}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                daily: { ...prev.daily, time: e.target.value }
              }))}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipients</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email address"
                className="border rounded-lg p-2 flex-1"
              />
              <button
                onClick={() => handleEmailAdd('daily')}
                className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {schedules.daily.emails.map((email, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
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

      {/* Weekly Reports */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Reports</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={schedules.weekly.enabled}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                weekly: { ...prev.weekly, enabled: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day</label>
            <select
              value={schedules.weekly.day}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                weekly: { ...prev.weekly, day: e.target.value }
              }))}
              className="border rounded-lg p-2 w-full"
            >
              {weekDays.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={schedules.weekly.time}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                weekly: { ...prev.weekly, time: e.target.value }
              }))}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* Recipients section similar to daily */}
        </div>
      </div>

      {/* Monthly Reports */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Monthly Reports</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={schedules.monthly.enabled}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                monthly: { ...prev.monthly, enabled: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day of Month</label>
            <select
              value={schedules.monthly.day}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                monthly: { ...prev.monthly, day: parseInt(e.target.value) }
              }))}
              className="border rounded-lg p-2 w-full"
            >
              {monthDays.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={schedules.monthly.time}
              onChange={(e) => setSchedules(prev => ({
                ...prev,
                monthly: { ...prev.monthly, time: e.target.value }
              }))}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* Recipients section similar to daily */}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Schedule Settings
        </button>
      </div>

      {/* Save Status Message */}
      {saveStatus && (
        <div className={`mt-4 p-3 rounded-lg ${saveStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveStatus}
        </div>
      )}
    </div>
  );
}

export default ReportScheduler;