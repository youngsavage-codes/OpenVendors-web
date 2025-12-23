"use client";

import Header from "@/components/shared/header";
import SideNav from "@/components/shared/sideNav";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideNav />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
