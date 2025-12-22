import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loaderText?: string;
}

const CustomButton = ({
  children,
  className,
  isLoading = false,
  loaderText = "Processing...",
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn(
        "bg-[#1F363D] h-13 rounded-full font-medium text-[20px]",
        "flex items-center justify-center gap-3",
        isLoading && "opacity-90 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="h-10 w-10 animate-spin text-white" />
          <span>{loaderText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
