'use client'

import { useState, useMemo } from 'react'
import { Appointment } from '@/components/calender/appointmentCard'
import TimeCalendar from '@/components/calender/TimeCalendar'
import CustomSelect from '@/components/shared/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CustomInput from '@/components/shared/input'

// Mock clients
const clients = [
  { firstName: 'Aisha', lastName: 'Mohammed', email: 'aisha@gmail.com' },
  { firstName: 'John', lastName: 'Doe', email: 'john@gmail.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane@gmail.com' },
  { firstName: 'Mike', lastName: 'Johnson', email: 'mike@gmail.com' },
  { firstName: 'Sara', lastName: 'Williams', email: 'sara@gmail.com' },
]

// Mock services
const servicesPool = [
  { title: 'Hair Styling', price: 3000, duration: 60 },
  { title: 'Hair Treatment', price: 2000, duration: 30 },
  { title: 'Spa Session', price: 8000, duration: 60 },
  { title: 'Manicure', price: 5000, duration: 60 },
  { title: 'Pedicure', price: 5500, duration: 60 },
]

// Generate time slot helper
const generateTimeSlot = (): { start: string; end: string } => {
  const startHour = 8 + Math.floor(Math.random() * 8)
  const startMinute = Math.random() < 0.5 ? 0 : 30
  const duration = [30, 60, 90, 120][Math.floor(Math.random() * 4)]
  let endHour = startHour + Math.floor((startMinute + duration) / 60)
  let endMinute = (startMinute + duration) % 60
  if (endHour > 18) {
    endHour = 18
    endMinute = 0
  }
  return {
    start: `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
    end: `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
  }
}

// Generate appointments
const generateAppointments = (daysAgo = 0): Appointment[] => {
  const today = new Date()
  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() - daysAgo)
  return clients.map((client, index) => {
    const { start, end } = generateTimeSlot()
    const serviceCount = Math.floor(Math.random() * 2) + 1
    const services = Array.from({ length: serviceCount }, () => servicesPool[Math.floor(Math.random() * servicesPool.length)])
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-yellow-500']
    return {
      id: daysAgo * 10 + index + 1,
      start,
      end,
      client,
      services,
      color: colors[index % colors.length],
      date: targetDate.toDateString(),
    }
  })
}

// Day select options
const dayOptions = [
  { label: 'Today', value: '0' },
  { label: 'Yesterday', value: '1' },
  { label: '2 Days Ago', value: '2' },
  { label: '3 Days Ago', value: '3' },
]

const CalenderPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    ...generateAppointments(0),
    ...generateAppointments(1),
    ...generateAppointments(2),
    ...generateAppointments(3),
  ])
  const [filterDay, setFilterDay] = useState<string>('0')
  const [filterClient, setFilterClient] = useState<string>('all')
  const [filterService, setFilterService] = useState<string>('all')
  const [searchText, setSearchText] = useState<string>('')

  // Day range
  const [rangeStart, setRangeStart] = useState<Date>(new Date())
  const [rangeDays] = useState<number>(5)

const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const filteredAppointments = useMemo(() => {
  const start = normalize(rangeStart)
  const end = normalize(new Date(rangeStart.getTime() + (rangeDays - 1) * 24 * 60 * 60 * 1000))

  return appointments.filter(app => {
    const clientMatch = filterClient === 'all' || `${app.client?.firstName} ${app.client?.lastName}` === filterClient
    const serviceMatch = filterService === 'all' || app.services.some(s => s.title === filterService)
    const textMatch =
      searchText === '' ||
      app.client?.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      app.client?.lastName.toLowerCase().includes(searchText.toLowerCase())

    const appDate = normalize(new Date(app.date))

    const inRange = appDate >= start && appDate <= end

    return clientMatch && serviceMatch && textMatch && inRange
  })
}, [appointments, filterClient, filterService, searchText, rangeStart, rangeDays])



  const uniqueClients = Array.from(new Set(appointments.map(a => `${a.client?.firstName} ${a.client?.lastName}`)))
  const uniqueServices = Array.from(new Set(appointments.flatMap(a => a.services.map(s => s.title))))

  const handlePrevRange = () => setRangeStart(new Date(rangeStart.getTime() - rangeDays * 24 * 60 * 60 * 1000))
  const handleNextRange = () => setRangeStart(new Date(rangeStart.getTime() + rangeDays * 24 * 60 * 60 * 1000))
  const formatRange = () => {
    const startDay = rangeStart.getDate()
    const endDate = new Date(rangeStart.getTime() + (rangeDays - 1) * 24 * 60 * 60 * 1000)
    const endDay = endDate.getDate()
    const month = rangeStart.toLocaleString('default', { month: 'short' })
    const year = rangeStart.getFullYear()
    return `${startDay}-${endDay} ${month} ${year}`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Appointments</h2>

      {/* Top filters + input + day range */}
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* Left: Day range */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevRange}
            className="p-2 rounded hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium">{formatRange()}</span>
          <button
            onClick={handleNextRange}
            className="p-2 rounded hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Right: Filters + search + refresh */}
        <div className="flex flex-wrap items-center gap-4">
          <CustomSelect
            label="Day"
            value={filterDay}
            onValueChange={setFilterDay}
            options={dayOptions}
          />

          <CustomSelect
            label="Client"
            value={filterClient}
            onValueChange={setFilterClient}
            options={[{ label: 'All Clients', value: 'all' }, ...uniqueClients.map(c => ({ label: c, value: c }))]}
          />

          <CustomSelect
            label="Service"
            value={filterService}
            onValueChange={setFilterService}
            options={[{ label: 'All Services', value: 'all' }, ...uniqueServices.map(s => ({ label: s, value: s }))]}
          />

          <CustomInput
            label="Search Keyword"
            placeholder="Type Keyword eg client name, service name"
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            onClick={() => setAppointments([
              ...generateAppointments(0),
              ...generateAppointments(1),
              ...generateAppointments(2),
              ...generateAppointments(3)
            ])}
          >
            Refresh
          </button>
        </div>
      </div>

      <TimeCalendar appointments={filteredAppointments} />
    </div>
  )
}

export default CalenderPage
