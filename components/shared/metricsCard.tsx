import React from 'react'

const MetricsCard = ({title, metric}: any) => {
  return (
    <div className='border-2 p-5 border-[#E9EBEC] rounded-sm'>
        <h2 className='font-bold text-3xl'>{metric}</h2>
        <h5 className='font-medium mt-3 text-[#0D171A]'>{title}</h5>
    </div>
  )
}

export default MetricsCard