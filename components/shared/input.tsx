import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label"; // ✅ shadcn Label
import { cn } from "@/lib/utils";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // optional label prop
  style?: any;
}

const CustomInput = ({ label, className, style, ...props }: CustomInputProps) => {
  return (
    <div className={`${style} mb-4`}>
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}
      <Input
        {...props}
        className={cn(
          "border-2 border-[#E9EBEC] h-14 placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-normal text-[16px] rounded-sm capitalize shadow-none",
          className
        )}
      />
    </div>
  );
};

export default CustomInput;
