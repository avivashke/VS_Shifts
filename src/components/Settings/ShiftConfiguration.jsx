import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

function ShiftConfiguration() {
  const [settings, setSettings] = useState({
    morning: {
      startTime: '09:00',
      endTime: '17:00',
      isActive: true
    },
    evening: {
      startTime: '17:00',
      endTime: '01:00',
      isActive: true
    }
  });

  const handleSave = async () => {
    try {
      // Save settings to database
      await fetch('/api/settings/shifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Shift Settings</h2>
        
        {/* Morning Shift */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Morning Shift</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start Time</label>
              <input
                type="time"
                value={settings.morning.startTime}
                onChange={e => setSettings({
                  ...settings,
                  morning: { ...settings.morning, startTime: e.target.value }
                })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Time</label>
              <input
                type="time"
                value={settings.morning.endTime}
                onChange={e => setSettings({
                  ...settings,
                  morning: { ...settings.morning, endTime: e.target.value }
                })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Evening Shift */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Evening Shift</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start Time</label>
              <input
                type="time"
                value={settings.evening.startTime}
                onChange={e => setSettings({
                  ...settings,
                  evening: { ...settings.evening, startTime: e.target.value }
                })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Time</label>
              <input
                type="time"
                value={settings.evening.endTime}
                onChange={e => setSettings({
                  ...settings,
                  evening: { ...settings.evening, endTime: e.target.value }
                })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default ShiftConfiguration;