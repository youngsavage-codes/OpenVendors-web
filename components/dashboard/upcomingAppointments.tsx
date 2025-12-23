import { MoreVertical } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
}

const appointments: Appointment[] = [
  {
    id: "1",
    customer: "Jane Doe",
    service: "Hair Coloring",
    date: "Dec 24",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    customer: "Michael Lee",
    service: "Hair Cut",
    date: "Dec 26",
    time: "1:30 PM",
    status: "pending",
  },
];

const UpcomingAppointments = ({setOpenSheet, setAppId}: any) => {
  return (
    <div className="border-2 p-5 border-[#E9EBEC] rounded-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium">Upcoming Appointments</h1>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>

      <div className="mt-6 ">
        {appointments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No upcoming appointments
          </p>
        ) : (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex items-center cursor-pointer hover:bg-gray-100 justify-between border-b-2 border-[#E9EBEC] p-4 last:border-b-0"
              onClick={() => {
                setOpenSheet(true)
                setAppId(appt.id)
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                  {appt.customer.charAt(0)}
                </div>

                <div>
                  <h3 className="font-medium">{appt.customer}</h3>
                  <p className="text-sm text-gray-500">
                    {appt.service} • {appt.date} • {appt.time}
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium capitalize",
                  appt.status === "confirmed"
                    ? "bg-green-50 text-green-700 border border-green-700"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-700"
                )}
              >
                {appt.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
