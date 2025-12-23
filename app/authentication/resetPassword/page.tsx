'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/shared/button';
import PasswordInput from '@/components/shared/passwordInput';
import { useEmailStore } from '@/store/useEmailStore';
import { useToastStore } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@/schema/authSchema';
import { AuthService } from '@/services/auth.services';

type ResetPasswordFormValues = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();
  const showToast = useToastStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema as any),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!hasHydrated) return;
    if (!email) router.replace('/authentication/signin');
  }, [hasHydrated, email, router]);

  if (!hasHydrated || !email) return null;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      const res = await AuthService.resetPasswordApi(email, data.newPassword);
      if (res) {
        showToast(res.message, 'success');
        router.replace('/authentication/signin');
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
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
          disabled={!isValid}
          isLoading={loading}
          className="w-full mt-5"
        >
          Reset Password
        </CustomButton>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
