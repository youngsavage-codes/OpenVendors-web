"use client";

import AuthPrompt from "@/components/shared/authPrompt";
import CustomButton from "@/components/shared/button";
import { AuthService } from "@/services/auth.services";
import { useEmailStore } from "@/store/useEmailStore";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();
  const [sending, setSending] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

    useEffect(() => {
        if (!hasHydrated) return;

        if (!email) {
            router.replace("/authentication/signin");
    }
    }, [hasHydrated, email, router]);

    if (!hasHydrated) return null;
    if (!email) return null;



  const handleSendOtp = async () => {
    setSending(true);
    try {
      const res = await AuthService.forgotPasswordApi(email);
      if (res) {
        showToast(res.message, "success");
        router.push('/authentication/resetPassword')
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSending(false);
    }
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
          <CustomButton disabled={!email} onClick={handleSendOtp} isLoading={sending} className="w-full mt-5">
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
