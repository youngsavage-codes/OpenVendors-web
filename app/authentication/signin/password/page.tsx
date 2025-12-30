"use client";

import CustomButton from "@/components/shared/button";
import PasswordInput from "@/components/shared/passwordInput";
import { useMutationApi } from "@/hooks/useMutation";
import { setAccessToken } from "@/lib/tokenManager";
import { verifyLoginPasswordSchema } from "@/schema/authSchema";
import { useEmailStore } from "@/store/useEmailStore";
import { useToastStore } from "@/store/useToastStore";
import { useUserStore } from "@/store/useUserStore";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type SignInFormValues = {
  password: string;
};

const SigninPasswordpage = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();

  const setUser = useUserStore((state) => state.setUser);

  // ✅ Zustand toast store
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(verifyLoginPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

    const loginMutation = useMutationApi({
      url: '/auth/login',
      onSuccess(res) {
        showToast(res.message, "success"); // ✅ use custom toast
        setAccessToken(res?.data?.accessToken);
        setUser(res?.data?.user);
        router.replace("/portal/vendor/dashboard");
      },
      onError(error: any) {
        showToast(error?.response?.data?.message || "Something went wrong", "error");
      },
  })

  useEffect(() => {
    if (!hasHydrated) return;
    if (!email) router.replace("/authentication/signin");
  }, [hasHydrated, email, router]);

  if (!hasHydrated) return null;
  if (!email) return null;
  

  const onSubmit = async (values: SignInFormValues) => {
    loginMutation.mutateAsync({
      email,
      password: values.password
    })
  };

  return (
    <div className="w-full lg:w-2/3">
      <div className="h-fit">
        <div className="text-center mb-5 space-y-3">
          <h1 className="font-bold text-2xl">
            Welcome back to your business account
          </h1>
          <p className="text-lg text-gray-600">
            Enter your password to log in as {email}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors?.password?.message}
          />

          <Link
            className="text-sm text-primary"
            href={`/authentication/forgotpassword`}
          >
            Forgot your password?
          </Link>

          <CustomButton
            isLoading={loginMutation.isPending}
            disabled={!isValid || loginMutation.isPending}
            className="w-full mt-5"
          >
            Login
          </CustomButton>
        </form>
      </div>
    </div>
  );
};


export default SigninPasswordpage;
