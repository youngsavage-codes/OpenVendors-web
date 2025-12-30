
import React, { useState } from "react";
import {
  X,
  Calendar,
  Users,
  CalendarX
} from "lucide-react";

interface Appointment {
  id: number;
  time: string;
  customer: string;
  service: string;
  stylist?: string;
  duration: number | string;
  price?: string;
  email?: string;
  status?: string;
  start: number;
}

const AppointmentCalendar: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [emptySlotTime, setEmptySlotTime] =
    useState<string | null>(null);

    const appointments: Appointment[] = [
    {
      id: 1,
      time: '13:00 - 14:30',
      customer: 'Jane Doe',
      service: 'Blow Dry',
      stylist: 'Anthony Achibi',
      duration: 1.5,
      price: 'NGN 25',
      email: 'jane@example.com',
      status: 'New',
      start: 13
    },
     {
      id: 2,
      time: '15:00 - 16:30',
      customer: 'John Doe',
      service: 'barbing',
      stylist: 'Anthony Achibi',
      duration: 1.5,
      price: 'NGN 30',
      email: 'john@example.com',
      status: 'New',
      start: 15
    }
  ];

  const timeSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  const getAppointmentStyle = (
    apt: Appointment
  ): React.CSSProperties => {
    const top = (apt.start - 10) * 96;
    const height =
      typeof apt.duration === "number"
        ? apt.duration * 96
        : 96;

    return { top, height };
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* TIME GRID */}
      <div className="flex">
        {/* Time labels */}
        <div className="flex-shrink-0">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-24 text-sm font-medium text-center pt-1"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Calendar body */}
        <div className="flex-1 relative border-l border-gray-300">
          {/* Empty slots */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-24 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedAppointment(null);
                setEmptySlotTime(time);
              }}
            />
          ))}

          {/* Appointments */}
                    {/* Appointments */}
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="absolute left-0 right-0 bg-blue-200 border-l-4 border-blue-600 rounded cursor-pointer hover:bg-blue-300 transition-colors"
              style={getAppointmentStyle(apt)}
              onMouseEnter={() => setSelectedAppointment(apt)}
              onMouseLeave={() => setSelectedAppointment(null)}
            >
              <div className="p-2 text-sm">
                <div className="font-semibold text-black">
                  {apt.time} {apt.customer}
                </div>
                <div className="text-black">{apt.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Details Modal (hover-based) */}
      {selectedAppointment && (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-center pt-16 z-30">
          <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden pointer-events-auto">
            <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <span className="font-semibold">{selectedAppointment.time}</span>
              <span className="bg-blue-600 px-3 py-1 rounded text-sm">
                Booked
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg mr-4">
                  {selectedAppointment.customer.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {selectedAppointment.customer}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {selectedAppointment.email}
                  </div>

                  {selectedAppointment.status && (
                    <span className="inline-block mt-1 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {selectedAppointment.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">
                    {selectedAppointment.service}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {selectedAppointment.stylist} · {selectedAppointment.duration}
                  </div>
                </div>

                <div className="font-semibold text-gray-900">
                  {selectedAppointment.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ⬜ EMPTY SLOT QUICK ACTION MODAL */}
      {emptySlotTime && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={() => setEmptySlotTime(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold">
                {emptySlotTime}
              </span>
              <button onClick={() => setEmptySlotTime(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Actions */}
            <div className="py-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm">
                <Calendar size={16} />
                Add appointment
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm">
                <Users size={16} />
                Add group appointment
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm">
                <CalendarX size={16} />
                Add blocked time
              </button>

              <button className="w-full px-4 py-2 text-left text-sm text-violet-600 hover:bg-gray-100">
                Quick action setting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
