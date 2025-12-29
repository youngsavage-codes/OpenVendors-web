'use client'

import { Lightbulb } from 'lucide-react'
import React, { useState } from 'react'

export const teamSizeOptions = [
  { label: '2–5 people', value: '2_5' },
  { label: '5–10 people', value: '5_10' },
  { label: '10–20 people', value: '10_20' },
  { label: '20+ people', value: '20_plus' },
]


const Step4: React.FC = () => {
  const [selected, setSelected] = useState<string>('')

  const selectTeam = (value: string) => {
    setSelected(value)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {teamSizeOptions.map(({ label, value }) => {
          const isSelected = selected === value
          return (
            <div
              key={value}
              onClick={() => selectTeam(value)}
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

      <div className='mt-10 flex items-start gap-5 bg-black p-5 rounded-lg text-white'>
        <Lightbulb size={30} color='white' />
        <p className='text-lg textgray-600'>We'll add 'Wendy' as an example employee so you can see how the system works. You can manage employees later once you're in!</p>
      </div>
    </div>
  )
}

export default Step4
