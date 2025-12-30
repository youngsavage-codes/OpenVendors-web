"use client";

import React, { useState, useEffect } from "react";
import OtpInput from "@/components/shared/otpInput";
import CustomButton from "@/components/shared/button";
import { useEmailStore } from "@/store/useEmailStore";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/useToastStore";
import { useUserStore } from "@/store/useUserStore";
import { useMutationApi } from "@/hooks/useMutation";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes

  const showToast = useToastStore((state) => state.showToast);

  const verifyEmailMutation = useMutationApi({
      url: '/auth/email/verify',
      onSuccess: (res) => {
        showToast(res.message, "success");
        useUserStore.getState().updateUser({ emailVerified: true });
        router.replace('/authentication/account-type')
      },
      onError: (error: any) => {
        showToast(error?.response?.data?.message || 'Something went wrong', 'error');
      },
  })

  const resendOtpMutation = useMutationApi({
      url: '/auth/email/send-otp',
      onSuccess: (res) => {
        showToast(res.message, "success");
        setOtp("");
        setTimer(300); // reset to 5 minutes
      },
      onError: (error: any) => {
        showToast(error?.response?.data?.message || 'Something went wrong', 'error');
      },
  })

  // Redirect if email is missing
  useEffect(() => {
    if (!hasHydrated) return;
    if (!email) router.replace("/authentication/signin");
  }, [hasHydrated, email, router]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  if (!hasHydrated || !email) return null;


  const handleSubmit = async () => {
    verifyEmailMutation.mutateAsync({
      email, otp
    })
  };

  const handleResend = async () => {
    resendOtpMutation.mutateAsync({
      email
    })
  };

  // Format timer as Xm Ys
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto mt-20">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-gray-600 mt-2">
          Enter the 6-digit code sent to your email {email}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <OtpInput value={otp} onChange={setOtp} length={6} />

        <CustomButton
          disabled={otp.length < 6 || !email || verifyEmailMutation.isPending}
          isLoading={verifyEmailMutation.isPending}
          className="w-full lg:w-1/2"
          onClick={handleSubmit}
        >
          Verify Email
        </CustomButton>

        <div className="text-sm text-gray-600 mt-2">
          <button
            onClick={handleResend}
            disabled={resendOtpMutation.isPending || verifyEmailMutation.isPending}
            className={`underline text-blue-600 ${
              resendOtpMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Resend OTP
          </button>
          <span className="ml-2 text-gray-500">({formatTime(timer)})</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
