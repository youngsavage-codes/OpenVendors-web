import CustomInput from '@/components/shared/input'
import MetricsCard from '@/components/shared/metricsCard'
import CustomSelect from '@/components/shared/select'
import React from 'react'

const AppointmentsPage = () => {
    const metrics = [
        {
            title: 'All Appointments',
            metric: 5
        },
        {
            title: 'Upcoming Appointments',
            metric: 5
        },
        {
            title: 'Completed Appointments',
            metric: 5
        },
        {
            title: 'Canceled Appointments',
            metric: 5
        },
    ]
  return (
    <div>
        <div className='grid grid-cols-4 gap-5 mb-10'>
            {metrics.map((metric, index) => (
                <MetricsCard key={index} title={metric.title} metric={metric.metric} />
            ))}
        </div>

       <div className='flex items-center justify-between'>
          <div>
                <h3 className='font-semibold text-2xl'>My Appointments</h3>
                <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!</p>
          </div>
      </div>
      <div className='my-10'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-xl'>All Appointments</h3>
                <div className='grid grid-cols-2 gap-3 w-[700px]'>
                    <CustomInput
                        label=""
                        placeholder="Enter a product name"
                        className="w-full"
                    />
                    <CustomSelect
                        label=""
                        placeholder="Sort by duration" 
                        options={[]} 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AppointmentsPage