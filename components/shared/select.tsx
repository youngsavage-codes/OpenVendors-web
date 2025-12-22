"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // ✅ shadcn Label
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string; // shadcn Label
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: string
}

const CustomSelect = ({
  label,
  value,
  onValueChange,
  style,
  options,
  placeholder = "Select option",
  className,
  disabled = false,
}: CustomSelectProps) => {
  return (
    <div className={`${style} mb-4`}>
      {label && (
        <Label className="mb-1 text-[16px] font-medium text-[#0D171A]">
          {label}
        </Label>
      )}

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full rounded-sm border-2 border-[#E9EBEC] bg-white px-3",
            "text-[16px] font-normal text-[#0F172A]",
            "h-14 min-h-14 flex items-center",
            "placeholder:text-[#69787D] placeholder:text-[16px] placeholder:font-medium",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 shadow-none",
            className
          )}
        >
          <SelectValue
            placeholder={<span className="text-[#69787D]">{placeholder}</span>}
          />
        </SelectTrigger>

        <SelectContent className="rounded-lg border border-[#E9EBEC]">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-[14px]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
