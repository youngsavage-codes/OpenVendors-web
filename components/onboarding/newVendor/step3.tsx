'use client'

import React, { useState } from 'react'
import { Profile2User, User } from 'iconsax-reactjs'

const options = [
  { name: "I'm an Independent", icon: User },
  { name: "I'm have a team", icon: Profile2User },
]

const Step3: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (name: string) => {
    setSelected(name)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {options.map(({ name, icon: Icon }) => {
        const isSelected = selected === name
        return (
          <div
            key={name}
            onClick={() => handleSelect(name)}
            className={`
              border-2 rounded-md p-5 cursor-pointer transition-all duration-200 flex flex-col items-center
              ${isSelected ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'}
            `}
          >
            <Icon size={35} className="mb-3" variant="Bold" />
            <h4 className="font-medium text-center">{name}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Step3
