import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // 👈 error message
  containerClassName?: string;
}

const CustomInput = ({
  label,
  error,
  className,
  containerClassName,
  ...props
}: CustomInputProps) => {
  return (
    <div className={cn("mb-4", containerClassName)}>
      {label && (
        <Label
          className={cn(
            "mb-1 block text-[16px] font-medium",
            error ? "text-red-600" : "text-[#0D171A]"
          )}
        >
          {label}
        </Label>
      )}

      <Input
        {...props}
        aria-invalid={!!error}
        className={cn(
          "h-14 rounded-sm border-2 shadow-none placeholder:text-[#69787D] placeholder:text-[16px] text-[16px]",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-[#E9EBEC] focus-visible:ring-[#0D171A]",
          className
        )}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
