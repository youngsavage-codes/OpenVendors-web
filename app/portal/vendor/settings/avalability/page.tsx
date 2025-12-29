'use client'

import CustomButton from '@/components/shared/button'
import { AvailabilityService } from '@/services/availability.service'
import React, { useEffect, useState } from 'react'

const daysOfWeek = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

interface Schedule {
  dayOfWeek: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

const AvailabilityPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(
    daysOfWeek.map((day) => ({
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: day !== 'SUNDAY',
    }))
  )

  useEffect(() => {
    fetchMyAvailability();
  }, []);

  const fetchMyAvailability = async () => {
    try { 
      const res = await AvailabilityService.getMyAvailabilityApi();
      console.log('res', res)
    } catch(error: any) {
      console.log(error);
    }
  }

  const updateSchedule = (
    index: number,
    key: keyof Schedule,
    value: any
  ) => {
    const updated = [...schedules]
    updated[index] = { ...updated[index], [key]: value }
    setSchedules(updated)
  }

  const handleSave = () => {
    const payload = { schedules }
    console.log('Submitting:', payload)
    // 🔗 send to API
  }

  return (
    <div className="px-5 py-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Availability</h2>
        <p className="text-gray-500 text-sm">
          Set when clients can book your services.
        </p>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div
            key={schedule.dayOfWeek}
            className="border border-[#E9EBEC] rounded-lg p-5 flex items-center justify-between"
          >
            {/* Day */}
            <div className="w-32">
              <h4 className="font-medium">{schedule.dayOfWeek}</h4>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4">
              <input
                type="time"
                value={schedule.startTime}
                disabled={!schedule.isAvailable}
                onChange={(e) =>
                  updateSchedule(index, 'startTime', e.target.value)
                }
                className="border-2 border-[#E9EBEC] rounded-md px-3 py-2 text-sm disabled:opacity-50"
              />

              <span className="text-gray-400">to</span>

              <input
                type="time"
                value={schedule.endTime}
                disabled={!schedule.isAvailable}
                onChange={(e) =>
                  updateSchedule(index, 'endTime', e.target.value)
                }
                className="border-2 border-[#E9EBEC] rounded-md px-3 py-2 text-sm disabled:opacity-50"
              />
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${
                  schedule.isAvailable ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {schedule.isAvailable ? 'Available' : 'Unavailable'}
              </span>

              <button
                onClick={() =>
                  updateSchedule(
                    index,
                    'isAvailable',
                    !schedule.isAvailable
                  )
                }
                className={`w-12 h-6 rounded-full transition relative ${
                  schedule.isAvailable ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition ${
                    schedule.isAvailable ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-10 flex justify-end">
        <CustomButton
            onClick={handleSave}
        >
            Save Availability
        </CustomButton>
      </div>
    </div>
  )
}

export default AvailabilityPage
