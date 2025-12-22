'use client'

import React, { useState } from 'react'
import { ArrowRight, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AccountTypePage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<'new' | 'existing' | null>(null)

  const handleSelect = (type: 'new' | 'existing') => {
    setSelected(type)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if(type === 'new') {
        router.replace(`/onboarding/createBusiness`)
      }else if(type === 'existing') {
        router.replace(`/onboarding/joinBusiness`)
      }
    }, 2000)
  }

  return (
    <div className="w-full lg:w-2/3 mx-auto px-4 py-10">
      <div className="text-center mb-8 space-y-3">
        <h1 className="font-bold text-2xl">
          How would you like to set up your professional account?
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        {/* Option 1 - New Business */}
        <div
          onClick={() => handleSelect('new')}
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 flex justify-between items-center min-h-[100px]
            ${selected === 'new' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'}
          `}
        >
          <div>
            <h2 className="font-semibold text-lg">Create a New Business Account</h2>
          </div>
          <ArrowRight size={28} />
        </div>

        {/* Option 2 - Join Existing */}
        <div
          onClick={() => handleSelect('existing')}
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 flex justify-between items-center min-h-[100px]
            ${selected === 'existing' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'}
          `}
        >
          <div>
            <h2 className="font-semibold text-lg">Join an Existing Business</h2>
            <p className="text-sm mt-1">
              Join an existing business on VenStack and manage your services within their account.
            </p>
          </div>
          <ArrowRight size={28} />
        </div>
      </div>

      {loading && (
        <Loader className="h-6 w-6 animate-spin mx-auto mt-10" />
      )}
    </div>
  )
}

export default AccountTypePage
