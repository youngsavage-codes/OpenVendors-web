"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight2 } from "iconsax-reactjs";
import TokenService from "@/services/token.service";
import { useRouter } from "next/navigation";
import { useEmailStore } from "@/store/useEmailStore";

const AvatarDropDown = () => {
  const router = useRouter()
  const { user, hasHydrated, clearUser } = useUserStore();
  const {clearEmail} = useEmailStore()

  if (!hasHydrated || !user) return null;

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;

  const handleLogout = () => {
    TokenService.clearTokens();
    clearUser();
    clearEmail();
    router.replace('/authentication/signin')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-[50px] h-[50px] rounded-full bg-red-500/40 flex items-center justify-center font-semibold uppercase">
          {initials}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-10 mt-5 w-[400px] border-2 border-[#E9EBEC]">
        <DropdownMenuLabel>
          {/* User Info */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[50px] h-[50px] rounded-full bg-red-500/40 flex items-center justify-center font-semibold uppercase">
              {initials}
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-400">No reviews yet</p>
            </div>
          </div>

          {/* Email Verification Banner */}
          {
            !user.emailVerified && (
              <div className="mb-3 mt-3 bg-red-800 border-2 border-red-600 p-5 text-white rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold">Verify your email account</h4>
                  <p className="text-sm text-white">Secure your account</p>
                </div>
                <ArrowRight2 />
              </div>
            )
          }
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem className="font-medium">My Profile</DropdownMenuItem>
        <DropdownMenuItem className="font-medium">Personal Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="font-medium">Help & Support</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="font-medium">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
