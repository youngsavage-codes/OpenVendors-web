'use client'

import React, { useEffect, useState } from 'react'
import { SearchNormal, User } from 'iconsax-reactjs'

const SearchDrawer = () => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mount drawer first, then animate
  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => {
        setOpen(true)
      })
    }
  }, [])

  // Handle open/close properly
  useEffect(() => {
    if (open) {
      setMounted(true)
    } else if (mounted) {
      const timer = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open, mounted])

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setOpen(true)}>
        <SearchNormal size={30} />
      </button>

      {/* Overlay */}
      {mounted && (
        <div
          onClick={() => setOpen(false)}
          className={`
            fixed inset-0 z-40 bg-black/40
            transition-opacity duration-300
            ${open ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* Drawer */}
      {mounted && (
        <div
          className={`
            fixed inset-x-0 bottom-0 z-50
            h-screen bg-white
            flex flex-col
            transform transition-transform duration-300 ease-out
            ${open ? 'translate-y-0' : 'translate-y-full'}
          `}
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 h-12 w-12 rounded-full border-2 border-[#E9EBEC] flex items-center justify-center text-lg"
          >
            ✕
          </button>

          {/* Search Header */}
          <div className="px-10 lg:px-32 pt-20 pb-10 border-b border-[#E9EBEC]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full p-5 text-2xl border-b-2 border-[#E9EBEC] outline-none placeholder:text-[#69787D]"
            />
            <p className="text-sm mt-3 text-gray-400">
              Search by client name, mobile, email or booking reference
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 lg:px-32 py-12">
            <div className="grid lg:grid-cols-2 gap-16">

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Upcoming appointments
                </h3>
                <p className="text-sm text-gray-400">
                  No upcoming appointments found
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Clients (recently added)
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-400 flex items-center justify-center text-white">
                    <User />
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-gray-500">
                      example@gmail.com
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchDrawer
