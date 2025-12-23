"use client";

import AuthPrompt from "@/components/shared/authPrompt";
import CustomButton from "@/components/shared/button";
import { useEmailStore } from "@/store/useEmailStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();

    useEffect(() => {
        if (!hasHydrated) return;

        if (!email) {
            router.replace("/authentication/signin");
    }
    }, [hasHydrated, email, router]);


    if (!hasHydrated) return null;
    if (!email) return null;


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

        <form className="space-y-3">
          <CustomButton onClick={() => {}} className="w-full mt-5">
            Reset Password
          </CustomButton>

          <AuthPrompt
            message="Have a customer account?"
            linkText="Go to VenStack for customers"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
