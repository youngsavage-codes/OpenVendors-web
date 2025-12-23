"use client";

import React, { useState, useEffect } from "react";
import OtpInput from "@/components/shared/otpInput";
import CustomButton from "@/components/shared/button";
import { useEmailStore } from "@/store/useEmailStore";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.services";
import { useToastStore } from "@/store/useToastStore";
import { useUserStore } from "@/store/useUserStore";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

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
    if (otp.length < 6) {
      showToast("Please enter the full OTP", "error");
      return;
    }

    setVerifying(true);
    try {
      const res = await AuthService.verifyEmailOtpApi(email, otp);
      if (res) {
        showToast(res.message, "success");
        useUserStore.getState().updateUser({ emailVerified: true });
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await AuthService.sendVerifyEmailOtpApi(email);
      if (res) {
        showToast(res.message, "success");
        setOtp("");
        setTimer(300); // reset to 5 minutes
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setResending(false);
    }
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
          disabled={verifying}
          isLoading={verifying}
          className="w-full lg:w-1/2"
          onClick={handleSubmit}
        >
          Verify Email
        </CustomButton>

        <div className="text-sm text-gray-600 mt-2">
          <button
            onClick={handleResend}
            disabled={resending || verifying}
            className={`underline text-blue-600 ${
              resending ? "opacity-50 cursor-not-allowed" : ""
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
