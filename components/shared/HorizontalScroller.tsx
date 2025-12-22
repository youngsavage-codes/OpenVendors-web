'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface HorizontalScrollerProps {
  children: ReactNode
  scrollAmount?: number
  className?: string
  buttonClassName?: string
}

const HorizontalScroller = ({
  children,
  scrollAmount = 340,
  className = '',
  buttonClassName = '',
}: HorizontalScrollerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const maxScroll = container.scrollWidth - container.clientWidth

    setCanScrollLeft(container.scrollLeft > 5)
    setCanScrollRight(container.scrollLeft < maxScroll - 5)
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const newPosition =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    })

    setTimeout(updateScrollButtons, 300)
  }

  useEffect(() => {
    updateScrollButtons()

    const container = scrollContainerRef.current
    if (!container) return

    window.addEventListener('resize', updateScrollButtons)

    const images = container.querySelectorAll('img')
    images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', updateScrollButtons)
      }
    })

    return () => {
      window.removeEventListener('resize', updateScrollButtons)
      images.forEach(img => img.removeEventListener('load', updateScrollButtons))
    }
  }, [])

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
            bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all
            ${buttonClassName}`}
          aria-label="Scroll left"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className={`flex gap-6 overflow-x-auto scrollbar-hide ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
            bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all
            ${buttonClassName}`}
          aria-label="Scroll right"
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  )
}

export default HorizontalScroller
