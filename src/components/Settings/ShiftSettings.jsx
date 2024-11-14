import React, { useState } from 'react';
import { Clock } from 'lucide-react';

function ShiftSettings() {
  const [shiftSettings, setShiftSettings] = useState({
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
      await fetch('/api/settings/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shiftSettings),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Morning Shift */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Morning Shift
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shiftSettings.morning.isActive}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                morning: { ...prev.morning, isActive: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={shiftSettings.morning.startTime}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                morning: { ...prev.morning, startTime: e.target.value }
              }))}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              value={shiftSettings.morning.endTime}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                morning: { ...prev.morning, endTime: e.target.value }
              }))}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* Evening Shift */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Evening Shift
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shiftSettings.evening.isActive}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                evening: { ...prev.evening, isActive: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={shiftSettings.evening.startTime}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                evening: { ...prev.evening, startTime: e.target.value }
              }))}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              value={shiftSettings.evening.endTime}
              onChange={(e) => setShiftSettings(prev => ({
                ...prev,
                evening: { ...prev.evening, endTime: e.target.value }
              }))}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default ShiftSettings;