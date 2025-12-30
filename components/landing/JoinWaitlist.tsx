'use client'

import React, { useState } from 'react'
import { Loader, Mail } from 'lucide-react'
import { toast } from 'react-toastify'
import { useToastStore } from '@/store/useToastStore'
import { useMutationApi } from '@/hooks/useMutation'

interface JoinWaitlistProps {
  title?: string
  description?: string
  buttonText?: string
}

const JoinWaitlist: React.FC<JoinWaitlistProps> = ({
  title = 'Join our waitlist',
  description = 'Be the first to know when we launch. No spam, ever.',
  buttonText = 'Join waitlist',
}) => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const showToast = useToastStore((state) => state.showToast)

  const waitlistMutation = useMutationApi<
    { message: string },
    { email: string }
  >({
    url: '/waitlist',
    onSuccess: (data) => {
      showToast(data.message, 'success')
      setSuccess(true)
      setEmail('')
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.message || 'Something went wrong', 'error')
    },
  })

  const handleSubmit = () => {
    if (!email) return

    waitlistMutation.mutate({ email })
  }

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 text-center space-y-6 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-black">
        {title}
      </h2>

      <p className="text-gray-600 text-sm sm:text-base">
        {description}
      </p>

      {success ? (
        <div className="rounded-xl bg-green-50 text-green-700 py-4 text-sm font-medium">
          🎉 You’re on the waitlist!
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 rounded-full border border-gray-300 px-4 py-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={waitlistMutation.isPending}
            className="rounded-full bg-black text-white px-6 py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {waitlistMutation.isPending && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            {buttonText}
          </button>
        </div>
      )}
    </div>
  )
}

export default JoinWaitlist
