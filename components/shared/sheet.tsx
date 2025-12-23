'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Scissors, User } from 'lucide-react'
import CustomButton from "@/components/shared/button"

interface Service {
  name: string
  staff: string
  duration: string // format "1h 15m" or "30m"
  price: number
}

interface Booking {
  status: "upcoming" | "completed" | "canceled"
  date: string
  time: string
  services: Service[]
  notes?: string
}

interface CustomSheetProps {
  open: boolean
  onOpen: (open: boolean) => void
  client?: {
    name: string
    email: string
    gender: string
    joined: string
    totalAppointments: number
    avatar?: string
  }
  booking?: Booking
  appId?: string | null
}

const parseDuration = (duration: string) => {
  const hoursMatch = duration.match(/(\d+)h/)
  const minsMatch = duration.match(/(\d+)m/)
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0
  const mins = minsMatch ? parseInt(minsMatch[1]) : 0
  return hours * 60 + mins
}

const formatDuration = (totalMins: number) => {
  const hours = Math.floor(totalMins / 60)
  const mins = totalMins % 60
  return `${hours > 0 ? hours + 'h ' : ''}${mins}m`
}

const CustomSheet = ({ open, onOpen, client, booking, appId }: CustomSheetProps) => {

  console.log(appId)

  const defaultClient = {
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
    joined: "Dec 2024",
    totalAppointments: 12,
    avatar: "",
  }

  const defaultBooking: Booking = {
    status: "upcoming",
    date: "Sun, 21 Dec 2025",
    time: "11:00 AM – 12:15 PM",
    services: [
      { name: "Hair Color", staff: "Ogala", duration: "1h 15m", price: 5000 },
      { name: "Hair Treatment", staff: "Ogala", duration: "30m", price: 2000 },
    ],
    notes: "Client prefers natural hair color tones and minimal heat."
  }

  const clientData = client || defaultClient
  const bookingData = booking || defaultBooking

  const statusColors: Record<Booking["status"], string> = {
    upcoming: "bg-yellow-50 text-yellow-700",
    completed: "bg-green-50 text-green-700",
    canceled: "bg-red-50 text-red-700",
  }

  const totalPrice = bookingData.services.reduce((acc, s) => acc + s.price, 0)
  const totalDurationMinutes = bookingData.services.reduce(
    (acc, s) => acc + parseDuration(s.duration),
    0
  )
  const totalDuration = formatDuration(totalDurationMinutes)

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetContent className="sm:max-w-[1000px] p-0 flex flex-col h-full">

        <div className="grid grid-cols-12 flex-1 overflow-y-auto">

          {/* ================= Client Profile ================= */}
          <div className="col-span-4 border-r-2 border-[#E9EBEC] p-5 space-y-6">
            <h2 className="text-lg font-semibold">Client Profile</h2>

            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                {clientData.avatar ? (
                  <AvatarImage src={clientData.avatar} />
                ) : (
                  <AvatarFallback>{clientData.name[0]}</AvatarFallback>
                )}
              </Avatar>

              <div>
                <p className="font-medium">{clientData.name}</p>
                <p className="text-sm text-muted-foreground">{clientData.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{clientData.gender}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Client since {clientData.joined}</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#E9EBEC] space-y-2">
              <p className="text-sm text-muted-foreground">Total Appointments</p>
              <p className="text-xl font-semibold">{clientData.totalAppointments}</p>
            </div>
          </div>

          {/* ================= Booking Details ================= */}
          <div className="col-span-8 flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between bg-[#1F363D] text-white h-[100px] px-5">
              <div>
                <h2 className="text-xl font-semibold">{bookingData.date}</h2>
                <p>{bookingData.time}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${statusColors[bookingData.status]}`}
              >
                {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
              </span>
            </div>

            {/* Services List */}
            <div className="space-y-4 text-sm p-5 flex-1 overflow-y-auto">
              {bookingData.services.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-base">{service.name}</p>
                      <p className="text-muted-foreground">
                        With {service.staff} ({service.duration})
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">₦{service.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Notes */}
            {bookingData.notes && (
              <div className="border-t-2 border-[#E9EBEC] space-y-2 p-5">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{bookingData.notes}</p>
              </div>
            )}

            {/* Total & Button */}
            <div className="border-t-2 border-[#E9EBEC] p-5 flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Total: ₦{totalPrice.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Duration: {totalDuration}</p>
              </div>
              <CustomButton className="px-6 py-2">
                Complete Appointment
              </CustomButton>
            </div>

          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet
