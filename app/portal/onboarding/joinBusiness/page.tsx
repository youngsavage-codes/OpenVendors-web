'use client'

import Step1 from '@/components/onboarding/joinVendor/step1'
import Step2 from '@/components/onboarding/joinVendor/step2'
import CustomButton from '@/components/shared/button'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

// Example components for each step (replace with actual forms/components)

interface Step {
  label: string
  title: string
  desc: string
  component: React.ReactNode
}

const steps: Step[] = [
  {
    label: 'Account setup',
    title: "Search for a business",
    desc: 'Find a business on Fresha to request login access to their workspace',
    component: <Step1 />,
  },
  {
    label: 'Step 2',
    title: 'Send a request to join WALL AND ALL IKEJA',
    desc: 'Choose your primary and up to 3 related service type',
    component: <Step2 />,
  },
]

const OnboardingPage: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else if(totalSteps) {
      router.replace('/portal')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const { label, title, desc, component } = steps[currentStep]

  return (
    <div className="relative">

      {/* ✅ Sticky Header */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="mx-auto pt-5 px-5 p-3 space-y-4">
          {/* Progress */}
          <div className="flex gap-3">
            {steps.map((_, index) => (
              <div key={index} className="flex-1">
                <div
                  className={`h-1 rounded-full transition-all ${
                    index <= currentStep ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={20} />
            </Button>

            <CustomButton className="px-10" onClick={handleNext}>
              {currentStep === totalSteps - 1 ? 'Send Request' : 'Continue'}
              <ArrowRight size={20} />
            </CustomButton>
          </div>
        </div>
      </div>
      {/* Step Content */}
      <div className="pt-10 px-5">
          <div className='space-y-3 max-w-5xl mx-auto'>
            <span className='text-gray-500'>{label}</span>
            <h2 className='font-bold text-2xl'>{title}</h2>
            <p className='text-lg text-gray-600'>{desc}</p>
            <div>{component}</div>
          </div>
      </div>
    </div>
  )
}

export default OnboardingPage
