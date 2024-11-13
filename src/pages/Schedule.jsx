import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { useApp } from '../context/AppContext';
import WeeklySchedule from '../components/Schedule/WeeklySchedule';
import MonthView from '../components/Schedule/MonthView';
import YearView from '../components/Schedule/YearView';

function Schedule() {
  const { viewMode, setViewMode, selectedDate, setSelectedDate } = useApp();

  const handlePrevious = () => {
    if (viewMode === 'week') {
      setSelectedDate(prev => subWeeks(prev, 1));
    } else if (viewMode === 'month') {
      setSelectedDate(prev => subMonths(prev, 1));
    } else {
      setSelectedDate(prev => new Date(prev.getFullYear() - 1, 0, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'week') {
      setSelectedDate(prev => addWeeks(prev, 1));
    } else if (viewMode === 'month') {
      setSelectedDate(prev => addMonths(prev, 1));
    } else {
      setSelectedDate(prev => new Date(prev.getFullYear() + 1, 0, 1));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Schedule</h1>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="font-medium">
            {viewMode === 'year' 
              ? format(selectedDate, 'yyyy')
              : format(selectedDate, 'MMMM yyyy')}
          </span>
          
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'week' && <WeeklySchedule />}
      {viewMode === 'month' && <MonthView />}
      {viewMode === 'year' && <YearView />}
    </div>
  );
}

export default Schedule;