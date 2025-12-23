'use client'

import Header from "@/components/shared/header";
import SideNav from "@/components/shared/sideNav";
import { UserService } from "@/services/user.service";
import { useUserStore } from "@/store/useUserStore";
import { Loader } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="max-h-screen overflow-hidden">
      <Header />
      <div className="flex overflow-hidden">
        <SideNav />
        <div className="bg-white max-h-screen overflow-y-auto w-full">
          <div className="flex-1 flex flex-col p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
