"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import CustomButton from "./button";
import { CloseCircle, InfoCircle, TickCircle } from "iconsax-reactjs";

type MessageType = "success" | "error" | "info";

interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  closeText?: string;
  disabled?: boolean;
  title: string;
  description: string;
  type?: MessageType;
  actionText?: string;
  onAction?: () => void;
  children?: any
  showButtons?: boolean; // ✅ optional buttons
}


const CustomDialog = ({
  open,
  onClose,
  onPrev,
  closeText,
  disabled = false,
  title,
  description,
  actionText,
  onAction,
  children,
  showButtons = true, // default: show buttons
}: MessageDialogProps) => {
  return (  
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[#4C5E64] font-normal text-[18px]">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div>
            {children}
        </div>

        {showButtons && (
          <DialogFooter className="flex items-center justify-center gap-4">
            {closeText && (
              <div className="w-full">
                <CustomButton
                  onClick={onPrev}
                  disabled={disabled}
                  className="bg-transparent text-black border border-black hover:text-white w-full"
                >
                  {closeText || "Close"}
                </CustomButton>
              </div>
            )}
            {actionText && (
              <div className="w-full">
                <CustomButton
                    disabled={disabled}
                    onClick={() => {
                        onAction?.();
                    }}
                    className="w-full"
                >
                  {actionText}
                </CustomButton>
              </div>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
