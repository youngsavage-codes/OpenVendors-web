"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface CountryCode {
  label: string;
  value: string;
}

interface PhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  countryCodes?: CountryCode[];
  defaultCode?: string;
  style?: any;
}

const defaultCountryCodes: CountryCode[] = [
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+234", value: "+234" },
  { label: "+91", value: "+91" },
];

const PhoneInput = ({
  label,
  countryCodes = defaultCountryCodes,
  defaultCode = "+234",
  style,
  className,
  ...props
}: PhoneInputProps) => {
  const [selectedCode, setSelectedCode] = useState(defaultCode);

  return (
    <div className={`${style} mb-4`}>
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <div className="flex items-center border-2 border-[#E9EBEC] rounded-sm overflow-hidden">
        {/* Country Code Selector */}
        <Select value={selectedCode} onValueChange={setSelectedCode}>
          <SelectTrigger
            className={cn(
              "h-12 px-3 border-none shadow-none rounded-none bg-white text-[14px] font-normal text-[#0F172A]",
              "focus:outline-none flex items-center"
            )}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-none border-none">
            {countryCodes.map((code) => (
              <SelectItem
                key={code.value}
                value={code.value}
                className="text-[14px] h-10 flex items-center"
              >
                {code.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Input - numeric only */}
        <Input
          {...props}
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          className={cn(
            "border-none flex-1 h-14 placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-medium font-normal text-[16px] rounded-none",
            className
          )}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
