'use client'

import Header from "@/components/shared/header";
import SideNav from "@/components/shared/sideNav";
import { BusinessService } from "@/services/business.service";
import { UserService } from "@/services/user.service";
import { useUserStore } from "@/store/useUserStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await UserService.userDetailsApil();
        if (res?.data) {
          setUser(res.data);
          // router.replace("/protal/vendors/dashboard");
          // if(res?.data?.emailVerified) {
          //   router.replace("/protal/vendors/dashboard");
          // } else {
          //   router.replace('/authentication/verifyEmail')
          //   const res = await BusinessService.getMyWorkspaceApi();
          //   console.log('res', res)
          // }
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
      <div className="max-h-screen">
        {children}
      </div>
  );
};

export default DashboardLayout;
