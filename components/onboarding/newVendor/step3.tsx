'use client'

import React, { useState } from 'react'
import { Profile2User, User } from 'iconsax-reactjs'

export const businessTypes = [
  {
    label: "I'm an Independent",
    value: 'independent',
    icon: User,
  },
  {
    label: "I have a team",
    value: 'team',
    icon: Profile2User,
  },
]


const Step3: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    setSelected(value)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {businessTypes.map(({ label, value, icon: Icon }, index) => {
        const isSelected = selected === value
        return (
          <div
            key={index}
            onClick={() => handleSelect(value)}
            className={`
              border-2 rounded-md p-5 cursor-pointer transition-all duration-200 flex flex-col items-center
              ${isSelected ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'}
            `}
          >
            <Icon size={35} className="mb-3" variant="Bold" />
            <h4 className="font-medium text-center">{label}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Step3
