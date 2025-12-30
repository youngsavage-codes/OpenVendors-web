"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CustomButton from "@/components/shared/button";
import CustomCheckbox from "@/components/shared/checkbox";
import CustomInput from "@/components/shared/input";
import PasswordInput from "@/components/shared/passwordInput";
import PhoneInput from "@/components/shared/phoneNumberInput";
import CustomSelect from "@/components/shared/select";
import * as countryCodes from "country-codes-list";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema/authSchema";
import { toast } from "react-toastify";
import { useEmailStore } from "@/store/useEmailStore";
import { useToastStore } from "@/store/useToastStore";
import { useMutationApi } from "@/hooks/useMutation";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  isAgreed: boolean;
}

const SignUpContent = () => {
  const router = useRouter();
  const { email, hasHydrated } = useEmailStore();
  // ✅ Zustand toast store
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema as any),
    mode: "onChange",
    defaultValues: {
      email,
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      country: "",
      isAgreed: false,
    },
  });

    const signUpMutation = useMutationApi({
      url: '/auth/register',
      onSuccess: (res) => {
        showToast(res.message, "success"); // ✅ use custom toast
        router.replace("/authentication/account-type");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Something went wrong')
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

  // Country codes for PhoneInput
  const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "{countryCode} +{countryCallingCode}"
  );

  // Country names for CustomSelect
  const myCountryObject = countryCodes.customList(
    "countryCode",
    "{countryNameEn}"
  );

  const countryArray = useMemo(
    () =>
      Object.entries(myCountryObject || {}).map(([code, name]) => ({
        label: name,
        value: code,
      })),
    [myCountryObject]
  );


  const onSubmit = async (data: SignUpFormValues) => {
    const payload: any = {
      email: data.email,
      password: data.password,
      firstName: data?.firstName,
      lastName: data.lastName,
      phone: data?.phone,
      country: data.country,
      role: "user"
    }

    signUpMutation.mutateAsync(payload)
  };

  return (
    <div className="w-full lg:w-2/3">
      <div className="text-center mb-5 space-y-3">
        <h1 className="font-bold text-2xl">Create a professional account</h1>
        <p className="text-lg text-gray-600">
          You're almost there! Create your new account for{" "}
          <span className="font-semibold">{email}</span> by completing these
          details.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit as any)}>
        <CustomInput
          label="First name"
          placeholder="Enter your first name"
          {...register("firstName")}
          className="w-full"
          error={errors.firstName?.message}
        />

        <CustomInput
          label="Last name"
          placeholder="Enter your last name"
          {...register("lastName")}
          className="w-full"
          error={errors.lastName?.message}
        />


        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              label="Phone Number"
              placeholder="Enter phone number"
              countryCodes={myCountryCodesObject}
              value={field.value}
              onChange={field.onChange} // <--- THIS IS KEY
              error={errors.phone?.message}
            />
          )}
        />



        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <CustomSelect
              label="Country"
              placeholder="Select your country"
              options={countryArray}
              value={field.value}
              onValueChange={field.onChange}
              className={errors.country ? "border-red-500" : ""}
              error={errors.country?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={field.value}
              onChange={field.onChange} // ensures validation triggers
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isAgreed"
          render={({ field }) => (
            <CustomCheckbox
              id="terms"
              label="I agree to the Terms of Service and Privacy Policy"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        {errors.isAgreed && (
          <p className="text-red-500 text-sm">{errors.isAgreed.message}</p>
        )}

        <CustomButton
          type="submit"
          className="w-full mt-5"
          isLoading={signUpMutation.isPending}
          disabled={!isValid || signUpMutation.isPending}
        >
          Create Account
        </CustomButton>

        <p className="text-gray-500 text-center mt-10 text-sm">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </form>
    </div>
  );
};

const SignUpPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUpPage;
