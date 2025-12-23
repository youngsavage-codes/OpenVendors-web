import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  style?: any;
  error?: string;
}

const CustomTextArea = ({
  label,
  className,
  style,
  error,
  ...props
}: CustomTextAreaProps) => {
  return (
    <div className={cn(style, "mb-4")}>
      {label && (
        <Label className="mb-1 block text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <Textarea
        {...props}
        className={cn(
          "min-h-[140px] resize-none rounded-sm shadow-none focus-visible:ring-0 border-2",
          error ? "border-red-500" : "border-[#E9EBEC]",
          "placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-medium",
          "font-medium text-[14px]",
          className
        )}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
