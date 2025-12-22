"use client";

import React, { useState, useMemo } from "react";
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

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  countryCodes?: Record<string, string>; // now an object
  defaultCode?: string;
  style?: any;
}

const PhoneInput = ({
  label,
  countryCodes,
  defaultCode = "+234",
  style,
  className,
  ...props
}: PhoneInputProps) => {
  const [selectedCode, setSelectedCode] = useState(defaultCode);

  // Convert object into array for Select, keeping key for uniqueness
  const countryArray = useMemo(
    () =>
      Object.entries(countryCodes || {}).map(([key, label]) => {
        const codeMatch = label.match(/\+\d+/); // extract code like +234
        return {
          key, // use country code (AD, AE, etc.) as key
          label,
          value: codeMatch ? codeMatch[0] : "",
        };
      }),
    [countryCodes]
  );

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
              "h-12 px-3 border-none shadow-none outline-none rounded-none bg-white text-[14px] font-normal text-[#0F172A]",
              "focus:outline-none flex items-center"
            )}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-none border-none">
            {countryArray.map((code) => (
              <SelectItem
                key={code.key} // <-- use unique country code
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
