'use client'

import React from 'react'
import AppointmentCard, { Appointment, PositionedAppointment } from './appointmentCard'

interface TimeCalendarProps {
  appointments: Appointment[]
  startHour?: number
  endHour?: number
}

const SLOT_HEIGHT = 80
const parseTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number)
  return hour + minute / 60
}

// Proper overlapping algorithm using sweep line
const getPositionedAppointments = (appointments: Appointment[]): PositionedAppointment[] => {
  const events: { time: number; type: 'start' | 'end'; appt: Appointment }[] = []

  appointments.forEach(appt => {
    events.push({ time: parseTime(appt.start), type: 'start', appt })
    events.push({ time: parseTime(appt.end), type: 'end', appt })
  })

  events.sort((a, b) => a.time - b.time || (a.type === 'start' ? -1 : 1))

  const active: Appointment[] = []
  const positioned: PositionedAppointment[] = []

  events.forEach(event => {
    if (event.type === 'start') {
      active.push(event.appt)
      active.forEach((appt, index) => {
        positioned.push({
          ...appt,
          slotIndex: index,
          totalSlots: active.length,
        })
      })
    } else {
      const idx = active.findIndex(a => a.id === event.appt.id)
      if (idx > -1) active.splice(idx, 1)
    }
  })

  // Remove duplicates keeping latest totalSlots
  const uniqueMap = new Map<number, PositionedAppointment>()
  positioned.forEach(p => uniqueMap.set(p.id, p))
  return Array.from(uniqueMap.values())
}

const TimeCalendar: React.FC<TimeCalendarProps> = ({ appointments, startHour = 8, endHour = 20 }) => {
  const HOURS = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour)
  const positionedAppointments = getPositionedAppointments(appointments)

  return (
    <div className="relative grid grid-cols-[80px_1fr] rounded-lg border-2 border-[#E9EBEC] z-20 bg-white">
      {/* Time column */}
      <div className="border-r-2 border-[#E9EBEC] bg-gray-50 relative pt-10">
        {HOURS.map(hour => (
          <div key={hour} className="h-[80px] relative">
            <span className="absolute -top-[7px] right-2 text-xs text-gray-500 leading-none">
              {hour}:00
            </span>
          </div>
        ))}
      </div>

      {/* Calendar body */}
      <div className="relative py-10">
        {Array.from({ length: endHour - startHour }, (_, i) => (
          <div key={i} className="h-[80px] border-b-2 border-dashed border-[#E9EBEC]" />
        ))}

        {positionedAppointments.map(app => (
          <AppointmentCard key={app.id} appointment={app} slotHeight={SLOT_HEIGHT} startHour={startHour} />
        ))}
      </div>
    </div>
  )
}

export default TimeCalendar
