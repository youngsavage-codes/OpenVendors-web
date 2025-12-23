import React from "react";
import { cn } from "@/lib/utils";

type ActivityStatus = "booked" | "completed" | "canceled" | "upcoming";

interface AppointmentActivity {
  id: number;
  day: string;
  date: string;
  time: string;
  service: string;
  client: string;
  duration: string;
  staff: string;
  status: ActivityStatus;
}

const activities: AppointmentActivity[] = [
  {
    id: 1,
    day: "21",
    date: "Dec",
    time: "Sun, 21 Dec 2025 11:00",
    service: "Hair Color",
    client: "John Doe",
    duration: "1h 15min",
    staff: "Ogala",
    status: "booked",
  },
  {
    id: 2,
    day: "22",
    date: "Dec",
    time: "Mon, 22 Dec 2025 2:30",
    service: "Hair Cut",
    client: "Mary Jane",
    duration: "45min",
    staff: "Alex",
    status: "completed",
  },
  {
    id: 3,
    day: "23",
    date: "Dec",
    time: "Tue, 23 Dec 2025 10:00",
    service: "Pedicure",
    client: "Samuel",
    duration: "1h",
    staff: "Ogala",
    status: "canceled",
  },
  {
    id: 4,
    day: "24",
    date: "Dec",
    time: "Wed, 24 Dec 2025 4:00",
    service: "Massage",
    client: "Grace",
    duration: "1h 30min",
    staff: "Jane",
    status: "upcoming",
  },
];

const statusStyles: Record<ActivityStatus, string> = {
  booked: "bg-blue-50 text-blue-700 border border-blue-700",
  completed: "bg-green-50 text-green-700 border border-green-700",
  canceled: "bg-red-50 text-red-700 border border-red-700",
  upcoming: "bg-yellow-50 text-yellow-700 border border-yellow-700",
};

const AppointmentActivities = ({setOpenSheet, setAppId}: any) => {
  return (
    <div className="border-2 p-5 border-[#E9EBEC] rounded-sm">
      <h1 className="text-xl font-medium">Appointment Activities</h1>

      <div className="mt-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-5 hover:bg-gray-100 p-3 border-b-2 last:border-b-0 border-[#E9EBEC]" onClick={() => setOpenSheet(true)}>
            {/* Date */}
            <div className="text-center w-12">
              <h2 className="font-semibold text-lg">{activity.day}</h2>
              <h5 className="text-sm text-gray-500">{activity.date}</h5>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-500">{activity.time}</h4>

                {/* Status Badge */}
                <span
                    className={cn(
                        "px-3 py-1.5 whitespace-nowrap self-start rounded-full text-xs font-medium capitalize",
                        statusStyles[activity.status]
                    )}
                >
                    {activity.status}
                </span>

              </div>

              <h3 className="font-semibold text-lg">{activity.service}</h3>
              <p className="text-sm text-gray-600">
                {activity.client}, {activity.duration} with{" "}
                <span className="capitalize">{activity.staff}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentActivities;
