import React from 'react';
import { format, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import { useApp } from '../../context/AppContext';

function YearView() {
  const { selectedDate, setSelectedDate, setViewMode } = useApp();
  
  const yearStart = startOfYear(selectedDate);
  const yearEnd = endOfYear(selectedDate);
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const handleMonthClick = (month) => {
    setSelectedDate(month);
    setViewMode('month');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-4 gap-4">
        {months.map(month => (
          <button
            key={month.toString()}
            onClick={() => handleMonthClick(month)}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">
              {format(month, 'MMMM')}
            </h3>
            {/* Add a mini calendar or statistics here */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default YearView;