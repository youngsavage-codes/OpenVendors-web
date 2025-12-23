"use client";

import { Toast as ToastType } from "@/store/useToastStore";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  success: "bg-green-50 border-green-500 text-green-700",
  error: "bg-red-50 border-red-500 text-red-700",
  warning: "bg-yellow-50 border-yellow-500 text-yellow-700",
  info: "bg-blue-50 border-blue-500 text-blue-700",
};

interface Props {
  toast: ToastType;
  onClose: () => void;
}

const Toast = ({ toast, onClose }: Props) => {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 p-4 rounded-md border-l-4 shadow-md min-w-[300px]",
        "animate-toast-in", // 👈 animation
        styles[toast.type]
      )}
    >
      <p className="text-sm font-medium">{toast.message}</p>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
