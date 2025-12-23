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
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await UserService.userDetailsApil();
        if (res?.data) {
          setUser(res.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
