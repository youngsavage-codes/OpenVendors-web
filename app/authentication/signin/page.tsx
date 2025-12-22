'use client'
import AuthPrompt from '@/components/shared/authPrompt';
import CustomButton from '@/components/shared/button';
import CustomInput from '@/components/shared/input'
import SocialAuth from '@/components/shared/socialAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [accountExist, setAccountExist] = useState(false)
    const [loading, setLoading] = useState(false);
    const handleGoogle = () => {
        console.log("Login with Google");
    };

    const handleApple = () => {
        console.log("Login with Apple");
    };

    const handleLogin = () => {
      try {
        setLoading(true)

        setTimeout(() => {
          if(!accountExist) {
            router.replace(`/authentication/signup?email=${email}`)
          } else {
            return
          }
        }, 5000)
      } catch(error: any) {

      } finally {
        
      }
    }
  return (
    <div className='w-full lg:w-2/3'>
      <div className='text-center mb-5 space-y-3'>
        <h1 className='font-bold text-2xl'>VenStack for professionals</h1>
        <p className='text-lg text-gray-600'>Create an account or log in to manage your business.</p>
      </div>
      <div>
        <CustomInput
          label="Email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          style='w-full'
        />
        <CustomButton onClick={handleLogin} isLoading={loading} className='w-full mt-5'>
          Continue
        </CustomButton>
        <SocialAuth onGoogleClick={handleGoogle} onAppleClick={handleApple} />
      </div>
      <div className='mt-5'>
        <AuthPrompt message='Are you a customer looking to book an appointment?' linkText='Go to VenStack for customers' />
        <p className='text-gray-500 text-center mt-20 text-sm'>
          This site is protected by reCAPTCHA Google Privacy Policy and Terms of Service apply
        </p>
      </div>
    </div>
  )
}

export default SignInPage