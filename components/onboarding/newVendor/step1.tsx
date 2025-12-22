import CustomInput from '@/components/shared/input'
import React from 'react'

const Step1 = () => {
  return (
    <div>
        <CustomInput
                label="Business name"
                placeholder="Enter your Business name"
                type="text"
                style='w-full'
        />
        <CustomInput
                label="Website (Optional)"
                placeholder="www.yoursite.com"
                type="text"
                style='w-full'
        />
    </div>
  )
}

export default Step1