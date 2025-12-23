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

interface PhoneInputProps {
  label?: string;
  countryCodes?: Record<string, string>;
  defaultCode?: string;
  style?: string;
  className?: any;
  placeholder?: string;
  error?: string;
  value?: string; // full number including code
  onChange?: (fullNumber: string) => void;
}

const PhoneInput = ({
  label,
  countryCodes = {},
  defaultCode = "+234",
  style,
  value = "",
  placeholder,
  className,
  onChange,
  error,
  ...props
}: PhoneInputProps) => {
  const [selectedCode, setSelectedCode] = useState(defaultCode);

  // Extract unique phone codes
  const phoneCodesArray = useMemo(() => {
    const codes = Object.values(countryCodes)
      .map((item) => item.split(" ")[1])
      .filter(Boolean);
    return Array.from(new Set(codes)).sort();
  }, [countryCodes]);

  // Show only the number without prepended code
  const displayValue = value.startsWith(selectedCode)
    ? value.slice(selectedCode.length)
    : value;

  // Handle code change without clearing input
  const handleCodeChange = (code: string) => {
    setSelectedCode(code);
  };

  return (
    <div className={cn(style, "mb-4")}>
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <div
        className={cn(
          "flex items-center rounded-sm overflow-hidden border-2",
          error ? "border-red-500" : "border-[#E9EBEC]"
        )}
      >
        {/* Country Code Selector */}
        <Select value={selectedCode} onValueChange={handleCodeChange}>
          <SelectTrigger
            className={cn(
              "h-12 px-3 border-none shadow-none rounded-none bg-white text-[14px] font-normal text-[#0F172A]",
              "focus:outline-none flex items-center"
            )}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="rounded-none border-none max-h-60 overflow-auto">
            {phoneCodesArray.map((code) => (
              <SelectItem
                key={code}
                value={code}
                className="text-[14px] h-10 flex items-center"
              >
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Input */}
        <Input
          {...props}
          value={displayValue}
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder={placeholder}
          onChange={(e) =>
            onChange?.(selectedCode + e.target.value.replace(/^0+/, ""))
          }
          className={cn(
            "border-none flex-1 h-14 placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-medium font-normal text-[16px] rounded-none",
            className
          )}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
