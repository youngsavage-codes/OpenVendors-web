'use client'

import Step1 from '@/components/onboarding/newVendor/step1'
import Step2 from '@/components/onboarding/newVendor/step2'
import Step3 from '@/components/onboarding/newVendor/step3'
import Step4 from '@/components/onboarding/newVendor/step4'
import Step5 from '@/components/onboarding/newVendor/step5'
import Step6 from '@/components/onboarding/newVendor/step6'
import Step7 from '@/components/onboarding/newVendor/step7'
import CustomButton from '@/components/shared/button'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Step {
  label: string
  title: string
  desc: string
  component: React.ReactNode
}

const steps: Step[] = [
  {
    label: 'Account setup',
    title: "What's your business name?",
    desc: 'This is the brand name your clients will see. Your billing and legal name can be added later.',
    component: <Step1 />,
  },
  {
    label: 'Step 2',
    title: 'Select categories that best describe your business',
    desc: 'Choose your primary and up to 3 related service type',
    component: <Step2 />,
  },
  {
    label: 'Step 3',
    title: 'Select account type',
    desc: 'This will help us set up your account correctly',
    component: <Step3 />,
  },
  {
    label: 'Step 4',
    title: "What's your team size",
    desc: 'Select the range that best describes the number of people in your team.',
    component: <Step4 />,
  },
  {
    label: 'Step 5',
    title: 'Where do you provide your services?',
    desc: 'Select the option that best describes how you offer your services.',
    component: <Step5 />,
  },
  {
    label: 'Step 6',
    title: "Set your venue's physical location",
    desc: 'Add your primary business location so your clients can easily find you.',
    component: <Step6 />,
  },
  {
    label: 'Step 7',
    title: "Add Business Image Gallery",
    desc: 'Upload your business images to showcase your services.',
    component: <Step7 />,
  },
]

const OnboardingPage: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
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
              {currentStep === totalSteps - 1 ? 'Done' : 'Continue'}
              <ArrowRight size={20} />
            </CustomButton>
          </div>
        </div>
      </div>

      {/* ✅ Content (push down to avoid overlap) */}
      <div className="pt-10 px-5">
        <div className="space-y-3 max-w-5xl mx-auto">
          <span className="text-gray-500">{label}</span>
          <h2 className="font-bold text-2xl">{title}</h2>
          <p className="text-lg text-gray-600">{desc}</p>
          <div>{component}</div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
