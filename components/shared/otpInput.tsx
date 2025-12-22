"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const OtpInput = ({
  length = 6,
  value,
  onChange,
  className,
}: OtpInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const newValue = value.split("");
    newValue[index] = val;
    onChange(newValue.join(""));

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el: any) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="h-14 w-14 lg:h-18 lg:w-18 rounded-sm border-2 border-[#E9EBEC] text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-black"
        />
      ))}
    </div>
  );
};

export default OtpInput;
