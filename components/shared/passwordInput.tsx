"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const PasswordInput = ({
  label,
  error,
  className,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <div className="relative">
        <Input
          {...props}
          type={showPassword ? "text" : "password"}
          className={cn(
            "h-14 pr-12 text-[16px] rounded-sm shadow-none placeholder:text-[#69787D] placeholder:text-[16px]",
            error
              ? "border-2 border-red-500 focus-visible:ring-red-500"
              : "border-2 border-[#E9EBEC] focus-visible:ring-0",
            className
          )}
        />

        {/* Show / hide toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
