"use client";

import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AiFillApple } from "react-icons/ai"; // Apple icon

interface SocialAuthProps {
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
}

const SocialAuth = ({ onGoogleClick, onAppleClick }: SocialAuthProps) => {
  return (
    <div className="w-full mx-auto mt-10">
       {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="mx-3 text-[#69787D] text-[12px] font-normal">
          or continue with
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
        {/* Social Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          onClick={onGoogleClick}
          className="flex items-center justify-center gap-2 border-2 border-[#E9EBEC] rounded-full py-3 h-12 text-blaxk font-medium text-[16px]"
        >
          <FcGoogle size={30} />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          onClick={onAppleClick}
          className="flex items-center justify-center gap-2 border-2 border-[#E9EBEC] rounded-full py-3 h-12 text-black font-medium text-[16px]"
        >
          <AiFillApple size={30} color="black" />
          Continue with Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
