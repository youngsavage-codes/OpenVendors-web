'use client'

import ToastContainer from "@/components/shared/toastContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react'

const queryClient = new QueryClient()

const UseWrapper = ({children}: { children: React.ReactNode }) => {
  return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer /> 
      </QueryClientProvider>
  )
}

export default UseWrapper