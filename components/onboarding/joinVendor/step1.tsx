'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import CustomButton from '@/components/shared/button'
import CustomInput from '@/components/shared/input'
import { trends } from '@/constant/data'

const Step1: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null);
  const [vendors, setVendors] = useState<any>([])

  const handleSelect = (index: number) => {
    setSelectedBusiness(index)
  }

  useEffect(() => {
    if (!search.trim()) {
      setVendors([])
      return
    }

    const ven = trends.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));

    setVendors(ven);
  }, [search])

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <CustomInput
        placeholder="Find a business in Nigeria"
        type="text"
        style="w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Trending Businesses List */}
      <div className="space-y-6">
        {vendors.map((ven: any, index: number) => {
          const isSelected = selectedBusiness === index
          return (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={`flex items-center justify-between border-2 p-5 rounded-lg cursor-pointer transition
                ${isSelected ? 'border-black bg-black text-white' : 'border-[#E9EBEC] bg-white text-black'}
              `}
            >
              {/* Business Info */}
              <div className="flex items-center gap-5">
                <Image
                  src={ven.image}
                  width={100}
                  height={100}
                  alt={ven.name}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{ven.name}</h2>
                  <p className="text-gray-500 font-medium">{ven.location}</p>
                  <span className="text-gray-500 text-sm">
                    Owner: <span className="font-normal">Chinere</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <CustomButton
                className={`bg-transparent border-2 text-md transition
                  ${isSelected ? 'border-white text-white' : 'border-black text-black hover:bg-black hover:text-white'}
                `}
              >
                View Profile
              </CustomButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step1
