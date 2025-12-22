// app/auth/layout.tsx
import { images } from "@/constant/images";
import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      
      {/* Left side – background image */}
      <div className="hidden md:block relative">
        <Image
          src={images.heroImage}
          alt="Auth background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right side – auth pages */}
      <div className="overflow-y-auto flex flex-col items-center justify-center w-full p-6">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
