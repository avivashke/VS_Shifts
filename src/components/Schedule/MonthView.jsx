import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useApp } from '../../context/AppContext';

function MonthView() {
  const { shifts, employees, selectedDate } = useApp();

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getShiftsForDay = (date) => {
    return shifts.filter(shift => isSameDay(new Date(shift.date), date));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Month grid */}
      <div className="grid grid-cols-7 gap-px">
        {/* Week day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-50">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map(day => {
          const dayShifts = getShiftsForDay(day);
          return (
            <div 
              key={day.toString()}
              className="min-h-[100px] p-2 border hover:bg-gray-50"
            >
              <div className="font-semibold">{format(day, 'd')}</div>
              <div className="space-y-1">
                {dayShifts.map(shift => {
                  const employee = employees.find(e => e.id === shift.employeeId);
                  return (
                    <div 
                      key={shift.id}
                      className="text-xs p-1 bg-blue-100 rounded truncate"
                    >
                      {employee?.name} ({shift.startTime}-{shift.endTime})
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthView;