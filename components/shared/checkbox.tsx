"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;      // wrapper div
  labelClassName?: string; // label
}

const CustomCheckbox = ({
  id,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  labelClassName,
}: CustomCheckboxProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Checkbox
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="border border-[#E9EBEC] bg-white"
      />
      <Label
        htmlFor={id}
        className={cn("text-[#49494B] font-normal text-[16px]", labelClassName)}
      >
        {label}
      </Label>
    </div>
  );
};

export default CustomCheckbox;
