'use client'

import React, { useState } from 'react'
import BookingSheet from '../sheets/bookingSheet'

export type Service = {
  title: string
  duration: number
  price: number
}

export type Client = {
  firstName: string
  lastName: string
  email?: string
}

export type Appointment = {
  date: string
  id: number
  start: string
  end: string
  services: Service[]
  client?: Client
  color?: string
}

export type PositionedAppointment = Appointment & {
  slotIndex: number
  totalSlots: number
}

interface AppointmentCardProps {
  appointment: PositionedAppointment
  slotHeight: number
  startHour: number
}

export const getTotalAmount = (services: Service[]) =>
  services.reduce((sum, s) => sum + s.price, 0)

const parseTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number)
  return hour + minute / 60
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, slotHeight, startHour }) => {
  const top = (parseTime(appointment.start) - startHour) * slotHeight
  const height = (parseTime(appointment.end) - parseTime(appointment.start)) * slotHeight
    const [openSheet, setOpenSheet] = useState(false);
    const [appId, setAppId] = useState(null);

  const widthPercent = 100 / appointment.totalSlots
  const leftPercent = widthPercent * appointment.slotIndex

  return (
    <div
      className="absolute mt-10 overflow-visible px-1"
      style={{
        top,
        height,
        left: `${leftPercent}%`,
        width: `calc(${widthPercent}% - 4px)`,
      }}
    >
      <div onClick={() => {
            setOpenSheet(true)
            setAppId(appointment.id as any)
        }} className={`rounded-lg group text-white cursor-pointer ${appointment.color} h-full`}>
        <div className="p-2">
          <div className="font-semibold text-sm">
            {appointment.client?.firstName} {appointment.client?.lastName}
          </div>
          <div className="text-xs">
            {appointment.services.map(s => s.title).join(', ')}
          </div>
          <div className="text-xs">
            {appointment.start} - {appointment.end}
          </div>
        </div>

        <div className="absolute -top-52 w-80 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 p-4 pointer-events-none group-hover:pointer-events-auto">
            <div className='my-5'>
                <h5 className='text-sm font-weight'>{appointment.start} - {appointment.end}</h5>   
            </div>
          {appointment.client && (
            <div className="mb-2 flex items-center gap-3">
              <div className={`${appointment.color} w-[50px] h-[50px] rounded-full flex items-center justify-center`}>
                {appointment.client.firstName[0]}{appointment.client.lastName[0]}
              </div>
              <div>
                <p className="font-medium">{appointment.client.firstName} {appointment.client.lastName}</p>
                {appointment.client.email && <p className="text-xs text-gray-500">{appointment.client.email}</p>}
              </div>
            </div>
          )}
          <div className="mb-2">
            <h4 className="font-semibold text-sm">Services</h4>
            {appointment.services.map((service, i) => (
              <div key={i} className="flex justify-between text-sm">
                <p>{service.title}</p>
                <p>₦{service.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 border-gray-200">
            <p>Total</p>
            <p>₦{getTotalAmount(appointment.services).toLocaleString()}</p>
          </div>
        </div>
      </div>

        <BookingSheet open={openSheet} onOpen={setOpenSheet} appId={appId} />
    </div>
  )
}

export default AppointmentCard
