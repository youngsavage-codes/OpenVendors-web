// app/auth/layout.tsx
import Header from "@/components/shared/header";
import SideNav from "@/components/shared/sideNav";
import Link from "next/link";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="max-h-screen overflow-hidden">
      {/* Left side - fixed background image */}
      <Header />
      <div className="flex overflow-hidden">
          <SideNav />

          {/* Right side - auth pages */}
          <div className="bg-white max-h-screen overflow-y-auto w-full">
            <div className="flex-1 flex flex-col   p-5">
              {children}
            </div>
          </div>
      </div> 
    </div>
  );
};

export default DashboardLayout;
