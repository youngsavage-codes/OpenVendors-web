import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  style?: any;
}

const CustomTextArea = ({
  label,
  className,
  style,
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
          "border-2 border-[#E9EBEC] min-h-[140px] resize-none",
          "placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-medium font-medium text-[14px]",
          "rounded-sm shadow-none focus-visible:ring-0",
          className
        )}
      />
    </div>
  );
};

export default CustomTextArea;
