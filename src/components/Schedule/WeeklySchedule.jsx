import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useApp } from "../../context/AppContext";
import ShiftModal from "./ShiftModal";

function WeeklySchedule() {
  const { shifts, employees, addShift } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Generate array of days for the week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = [...Array(7)].map((_, index) => {
    const day = addDays(weekStart, index);
    return {
      date: day,
      dayName: format(day, 'EEEE'),
      dayDate: format(day, 'MMM d')
    };
  });

  // Time slots from 00:00 to 23:00
  const timeSlots = [...Array(24)].map((_, index) => {
    return format(new Date().setHours(index, 0), 'HH:mm');
  });

  const handleTimeSlotClick = (day, time) => {
    setSelectedTimeSlot({ day, time });
    setShowModal(true);
  };

  const handleSaveShift = (shiftData) => {
    addShift({
      ...shiftData,
      date: format(selectedTimeSlot.day.date, 'yyyy-MM-dd'),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Weekly Schedule</h2>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Add Shift
          </button>
        </div>
      </div>

      {/* Schedule grid */}
      <div className="overflow-auto">
        <div className="min-w-[800px]">
          {/* Days header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 border-r bg-gray-50"></div>
            {weekDays.map((day) => (
              <div 
                key={day.date.toString()} 
                className="p-2 text-center border-r bg-gray-50"
              >
                <div className="font-semibold">{day.dayName}</div>
                <div className="text-sm text-gray-600">{day.dayDate}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b">
              <div className="p-2 border-r bg-gray-50 text-sm">
                {time}
              </div>
              {weekDays.map((day) => (
                <div 
                  key={`${day.date.toString()}-${time}`}
                  className="p-2 border-r min-h-[3rem] relative hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTimeSlotClick(day, time)}
                >
                  {shifts
                    .filter(shift => {
                      const shiftDate = format(new Date(shift.date), 'yyyy-MM-dd');
                      const cellDate = format(day.date, 'yyyy-MM-dd');
                      return shiftDate === cellDate && shift.startTime === time;
                    })
                    .map(shift => {
                      const employee = employees.find(emp => emp.id === shift.employeeId);
                      return (
                        <div
                          key={shift.id}
                          className="absolute left-0 right-0 bg-blue-100 border border-blue-200 p-1 rounded text-sm"
                        >
                          {employee?.name}
                          <br />
                          {shift.startTime} - {shift.endTime}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Shift Modal */}
      <ShiftModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTimeSlot(null);
        }}
        timeSlot={selectedTimeSlot}
        onSave={handleSaveShift}
      />
    </div>
  );
}

export default WeeklySchedule;