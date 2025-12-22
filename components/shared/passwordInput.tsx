"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // or any icon library you use

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const PasswordInput = ({ label, className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn(
          "border-2 border-[#E9EBEC] h-14 placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-normal text-[16px] rounded-sm pr-12 shadow-none",
          className
        )}
      />

      {/* Show/hide toggle */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-2/3 outline-none -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
