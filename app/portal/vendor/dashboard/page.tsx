'use client'

import AppointmentActivities from '@/components/dashboard/appointmentActivities'
import RecentTransactions from '@/components/dashboard/recentTransactions'
import TopServices from '@/components/dashboard/topServices'
import UpcomingAppointments from '@/components/dashboard/upcomingAppointments'
import CustomSheet from '@/components/shared/sheet'
import { useState } from 'react'

const DashboardPage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [appId, setAppId] = useState(null);

  return (
    <div>
      <div className='grid grid-cols-2 gap-5'>
        <UpcomingAppointments setOpenSheet={setOpenSheet} setAppId={setAppId} />
        <TopServices />
        <AppointmentActivities setOpenSheet={setOpenSheet} setAppId={setAppId} />
        <RecentTransactions />
      </div>

      {/* <button onClick={() => setOpenSheet(true)}>
        open
      </button> */}

      <CustomSheet open={openSheet} onOpen={setOpenSheet} appId={appId} />
    </div>
  )
}

export default DashboardPage