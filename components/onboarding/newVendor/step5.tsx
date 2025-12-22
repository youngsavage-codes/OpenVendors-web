'use client'

import React, { useState } from 'react'

const serviceLocations = [
  { label: 'Client come to me at a physical location', value: 'my_location' },
  { label: 'I visit my client as a mobile operator', value: 'client_location' },
  { label: 'Both', value: 'both' },
]

const Step5: React.FC = () => {
  const [selected, setSelected] = useState<string>('')

  const selectLocation = (value: string) => {
    setSelected(value)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {serviceLocations.map(({ label, value }) => {
          const isSelected = selected === value
          return (
            <div
              key={value}
              onClick={() => selectLocation(value)}
              className={`
                border-2 rounded-md p-5 cursor-pointer transition-all duration-200 text-center
                ${isSelected ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'}
              `}
            >
              <h4 className="font-medium">{label}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step5
