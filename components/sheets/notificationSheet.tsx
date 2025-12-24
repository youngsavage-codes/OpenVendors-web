'use client'

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Calendar,
  Notification,
  Speaker,
  Star1,
  Activity,
} from 'iconsax-reactjs'
import { MoreVertical } from 'lucide-react'

/* ================= Tabs ================= */
const notificationTypes = [
  { name: "Appointments", icon: <Calendar size={30} /> },
  { name: "Reviews", icon: <Star1 size={30} /> },
  { name: "Updates", icon: <Speaker size={30} /> },
  { name: "Activities", icon: <Activity size={30} /> },
]

/* ================= Data ================= */
const notificationsData = {
  Appointments: [
    {
      id: 1,
      title: "New Appointment",
      time: "2 days ago",
      description: "Appointment with John Doe at 11:00 AM",
      initials: "JD",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Follow-up Appointment",
      time: "1 day ago",
      description: "Follow-up session with Mary Jane",
      initials: "MJ",
      color: "bg-green-500",
    },
  ],

  Reviews: [
    {
      id: 1,
      title: "New Review",
      time: "3 hours ago",
      description: `"Great service!" — Samuel`,
      initials: "S",
      color: "bg-yellow-500",
    },
    {
      id: 2,
      title: "New Review",
      time: "5 hours ago",
      description: `"Very satisfied." — Grace`,
      initials: "G",
      color: "bg-pink-500",
    },
  ],

  Updates: [
    {
      id: 1,
      title: "System Update",
      time: "10:00 AM",
      description: "System update completed successfully.",
      initials: "SU",
      color: "bg-purple-500",
    },
    {
      id: 2,
      title: "New Feature",
      time: "Yesterday",
      description: "Calendar booking improvements released.",
      initials: "NF",
      color: "bg-indigo-500",
    },
  ],

  Activities: [
    {
      id: 1,
      title: "Profile Updated",
      time: "30 mins ago",
      description: "You updated your business profile information.",
      initials: "PU",
      color: "bg-orange-500",
    },
    {
      id: 2,
      title: "Service Added",
      time: "Today",
      description: "A new service was added to your catalog.",
      initials: "SA",
      color: "bg-teal-500",
    },
  ],
}

type NotificationKey = keyof typeof notificationsData

const NotificationSheet = () => {
  const [activeTab, setActiveTab] = useState<NotificationKey>('Appointments')

  return (
    <Sheet>
      <SheetTrigger>
        <Notification size={30} />
      </SheetTrigger>

      <SheetContent className="sm:max-w-[700px] p-0 flex flex-col h-full">
        <div className="grid grid-cols-12 h-full">

          {/* ================= Left Tabs ================= */}
          <div className="col-span-3 border-r-2 border-[#E9EBEC] flex flex-col pt-10">
            {notificationTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setActiveTab(type.name as NotificationKey)}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-4 w-full transition ${
                  activeTab === type.name
                    ? 'border-l-4 border-blue-700 bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.icon}
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>

          {/* ================= Right Content ================= */}
          <div className="col-span-9 p-5 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between my-6">
              <h3 className="text-lg font-semibold">{activeTab}</h3>
              <MoreVertical />
            </div>

            {/* ================= Notification Cards ================= */}
            <div className="space-y-3">
              {notificationsData[activeTab].map((notif) => (
                <div
                  key={notif.id}
                  className="border-2 border-[#E9EBEC] rounded-md p-4 space-y-3"
                >
                  {/* Title + Time + Avatar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{notif.title}</h4>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>

                    <div
                      className={`${notif.color} w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold`}
                    >
                      {notif.initials}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700">
                    {notif.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationSheet
