'use client'

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/shared/button';
import PasswordInput from '@/components/shared/passwordInput';
import { useEmailStore } from '@/store/useEmailStore';
import { useToastStore } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@/schema/authSchema';
import { useMutationApi } from '@/hooks/useMutation';

type ResetPasswordFormValues = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema as any),
    mode: 'onChange',
  });

    const resetPasswordMutation = useMutationApi({
        url: '/auth/password/reset',
        onSuccess: (res) => {
          showToast(res.message, "success"); // ✅ use custom toast
          router.replace('/authentication/signin');
        },
        onError: (error: any) => {
          showToast(error?.response?.data?.message || 'Something went wrong', 'error');
        },
  })

  useEffect(() => {
    if (!hasHydrated) return;
    if (!email) router.replace('/authentication/signin');
  }, [hasHydrated, email, router]);

  if (!hasHydrated || !email) return null;
  

  const onSubmit = async (data: ResetPasswordFormValues) => {
    resetPasswordMutation.mutateAsync({
      email: data.email,
      newPassword: data.newPassword
    })
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto mt-20">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <p className="text-gray-600 mt-2">Create a new password for {email}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <input type="hidden" value={email} {...register('email')} />

        <CustomButton
          type="submit"
          disabled={!isValid || resetPasswordMutation.isPending}
          isLoading={resetPasswordMutation.isPending}
          className="w-full mt-5"
        >
          Reset Password
        </CustomButton>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
