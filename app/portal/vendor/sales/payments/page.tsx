import CustomInput from '@/components/shared/input'
import MetricsCard from '@/components/shared/metricsCard'
import CustomSelect from '@/components/shared/select'
import React from 'react'

const PaymentsPage = () => {
  const metrics = [
    {
      title: 'All Payments',
      metric: 500
    },
    {
      title: 'Pending Payments',
      metric: 5000
    },
    {
      title: 'Recieved Payments',
      metric: 500
    },
    {
      title: 'Refunded Payments',
      metric: 500
    },
  ]
  return (
    <div>
      <div className='grid grid-cols-4 gap-5 mb-10'>
        {metrics.map((metric, index) => (
          <MetricsCard key={index} title={metric.title} metric={`NGN ${metric.metric}`} />
        ))}
      </div>
      <div className='flex items-center justify-between'>
          <div>
                <h3 className='font-semibold text-2xl'>My Payments</h3>
                <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!</p>
          </div>
      </div>
      <div className='my-10'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-xl'>All Payments</h3>
                <div className='grid grid-cols-2 gap-3 w-[700px]'>
                    <CustomInput
                        label=""
                        placeholder="Enter a product name"
                        className="w-full"
                    />
                    <div className='flex gap-3'>
                      <CustomSelect
                          label=""
                          placeholder="Sort by status" 
                          options={[]} 
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
    </div>
  )
}

export default PaymentsPage