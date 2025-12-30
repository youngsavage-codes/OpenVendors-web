'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import AuthPrompt from '@/components/shared/authPrompt';
import CustomButton from '@/components/shared/button';
import CustomInput from '@/components/shared/input';
import SocialAuth from '@/components/shared/socialAuth';

import { verifyLoginEmailSchema } from '@/schema/authSchema';
import { useEmailStore } from '@/store/useEmailStore';
import { useMutationApi } from '@/hooks/useMutation';

type SignInFormValues = {
  email: string;
};

const SignInPage = () => {
  const router = useRouter();
  const setEmail = useEmailStore((state) => state.setEmail);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(verifyLoginEmailSchema),
    mode: 'onChange', // ✅ validate while typing
    reValidateMode: 'onChange',
  });

  const verifyEmailMutation = useMutationApi({
    url: '/auth/verify-email',
    onSuccess: (data) => {
      console.log(data.data)
      if(data.data.exists) {
        router.replace(
          `/authentication/signin/password`
        );
      } else {
        router.replace(
          `/authentication/signup`
        );
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    },
  })

  const handleGoogle = () => {
    console.log('Login with Google');
  };

  const handleApple = () => {
    console.log('Login with Apple');
  };

  const onSubmit = (values: SignInFormValues) => {
    setEmail(values.email)
    verifyEmailMutation.mutateAsync({
      email: values.email,
    })
  }

  return (
    <div className="w-full lg:w-2/3">
      {/* Header */}
      <div className="text-center mb-6 space-y-3">
        <h1 className="font-bold text-2xl">VenStack for professionals</h1>
        <p className="text-lg text-gray-600">
          Create an account or log in to manage your business.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Email"
          placeholder="Email address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <CustomButton
          type="submit"
          isLoading={verifyEmailMutation.isPending}
          disabled={!isValid || verifyEmailMutation.isPending}
          className="w-full mt-5"
        >
          Continue
        </CustomButton>
      </form>

      {/* Social Auth */}
      <SocialAuth
        onGoogleClick={handleGoogle}
        onAppleClick={handleApple}
      />

      {/* Footer */}
      <div className="mt-6">
        <AuthPrompt
          message="Are you a customer looking to book an appointment?"
          linkText="Go to VenStack for customers"
        />

        <p className="text-gray-500 text-center mt-16 text-sm">
          This site is protected by reCAPTCHA and the Google Privacy Policy
          and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
