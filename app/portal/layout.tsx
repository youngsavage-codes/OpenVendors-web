'use client'

import { useFetch } from "@/hooks/useFetch"
import { useUserStore } from "@/store/useUserStore"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { ReactNode, useEffect } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useFetch({
    url: '/auth/me',
    keys: ['auth-user'],
  })

  // ✅ Handle auth result
  useEffect(() => {
    if (isSuccess && data?.data) {
      setUser(data.data)
    }

    if (isError) {
      router.replace('/authentication/signin')
    }
  }, [isSuccess, isError, data, setUser, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  return <div className="min-h-screen">{children}</div>
}

export default DashboardLayout
