"use client";

import AuthPrompt from "@/components/shared/authPrompt";
import CustomButton from "@/components/shared/button";
import { useMutationApi } from "@/hooks/useMutation";
import { useEmailStore } from "@/store/useEmailStore";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();
  const showToast = useToastStore((state) => state.showToast);

  const forgotPasswordMutation = useMutationApi({
    url: '/auth/password/forgot',
    onSuccess: (res) => {
      showToast(res.message, "success"); // ✅ use custom toast
      router.push('/authentication/resetPassword')
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.message || 'Something went wrong', 'error');
    },
  })

  useEffect(() => {
    if (!hasHydrated) return;

    if (!email) {
        router.replace("/authentication/signin");
    }
  }, [hasHydrated, email, router]);

  if (!hasHydrated) return null;
  if (!email) return null;

  const handleSendOtp = async () => {
    forgotPasswordMutation.mutateAsync({
      email
    })
  };


  return (
    <div className="w-full lg:w-2/3">
      <div className="h-fit">
        <div className="text-center mb-5 space-y-3">
          <h1 className="font-bold text-2xl">
            Forgot your business account password
          </h1>
          <p className="text-lg text-gray-600">
            We'll send you a secure link to create a new password to {email}
          </p>
        </div>

        <div className="space-y-3">
          <CustomButton 
            disabled={!email || forgotPasswordMutation.isPending} 
            onClick={handleSendOtp} 
            isLoading={forgotPasswordMutation.isPending} 
            className="w-full mt-5"  
          >
            Reset Password
          </CustomButton>

          <AuthPrompt
            message="Have a customer account?"
            linkText="Go to VenStack for customers"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
