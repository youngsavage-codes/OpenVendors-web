'use client'

import React, { useState } from 'react'
import { GiHairStrands, GiNails, GiEyeball, GiShinyApple } from 'react-icons/gi'
import { FaSpa, FaHeartbeat, FaUserTie, FaPalette, FaDumbbell, FaSpa as FaMeditation } from 'react-icons/fa'
import { User2, Smile, Zap } from 'lucide-react'

const categories = [
  { name: 'Hair Saloon', icon: GiHairStrands },
  { name: 'Nails', icon: GiNails },
  { name: 'Eyebrows & Lashes', icon: GiEyeball },
  { name: 'Beauty Saloon', icon: User2 },
  { name: 'MedSpa', icon: FaSpa },
  { name: 'Massage', icon: FaUserTie },
  { name: 'Wellness Studio', icon: FaHeartbeat },
  { name: 'Makeup', icon: FaPalette },
  { name: 'Fitness', icon: FaDumbbell },
  { name: 'Meditation', icon: FaMeditation },
  { name: 'Nutrition', icon: GiShinyApple },
  { name: 'Skincare', icon: Smile },
  { name: 'Hair Coloring', icon: Zap },
]

const Step2: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(c => c !== category))
    } else {
      if (selected.length < 4) setSelected([...selected, category])
    }
  }

  return (
    <div>
      <p className="text-gray-600 mb-4">
        Select up to 4 categories that best describe your business
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {categories.map(({ name, icon: Icon }) => {
          const selectedIndex = selected.indexOf(name)
          const isSelected = selectedIndex !== -1

          let label = ''
          if (isSelected) {
            label = selectedIndex === 0 ? 'Primary' : `${selectedIndex + 1}`
          }

          return (
            <div
              key={name}
              onClick={() => toggleCategory(name)}
              className={`
                border-2 rounded-md p-5 cursor-pointer transition-all duration-200 relative flex flex-col items-start
                ${isSelected ? 'border-black bg-black text-white' : 'border-[#E9EBEC] bg-white text-black'}
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-xs bg-white text-black py-1 px-2 rounded-full font-medium">
                  {label}
                </div>
              )}
              <Icon size={35} className="mb-3" />
              <h4 className="font-medium">{name}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step2
