'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import CustomButton from '@/components/shared/button'
import CustomCheckbox from '@/components/shared/checkbox'
import CustomInput from '@/components/shared/input'
import PasswordInput from '@/components/shared/passwordInput'
import PhoneInput from '@/components/shared/phoneNumberInput'
import CustomSelect from '@/components/shared/select'

const SignUpContent = () => {
  const router = useRouter()
  const params = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const email = params.get('email')

  const countryOptions = [
    { label: 'Nigeria', value: 'ng' },
    { label: 'Ghana', value: 'gh' },
    { label: 'Kenya', value: 'ke' },
  ]

  const handleSignup = () => {
    setLoading(true)

    setTimeout(() => {
      router.replace('/authentication/account-type')
    }, 5000)
  }

  return (
    <div className="w-full lg:w-2/3">
      <div className="text-center mb-5 space-y-3">
        <h1 className="font-bold text-2xl">Create a professional account</h1>
        <p className="text-lg text-gray-600">
          You're almost there! Create your new account for{' '}
          <span className="font-semibold">{email}</span> by completing these details.
        </p>
      </div>

      <div className="space-y-4">
        <CustomInput
          label="First name"
          placeholder="Enter your first name"
          type="text"
          style="w-full"
        />

        <CustomInput
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          style="w-full"
        />

        <PhoneInput
          label="Phone Number"
          placeholder="Enter phone number"
        />

        <CustomSelect
          label="Country"
          placeholder="Select your country"
          options={countryOptions}
          onValueChange={(value) => console.log(value)}
          style="w-full"
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
        />

        <CustomCheckbox
          id="terms"
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreed}
          onCheckedChange={setAgreed}
        />

        <CustomButton
          onClick={handleSignup}
          isLoading={loading}
          className="w-full mt-5"
          disabled={!agreed}
        >
          Create Account
        </CustomButton>

        <p className="text-gray-500 text-center mt-10 text-sm">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
}

const SignUpPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  )
}

export default SignUpPage
