import React, { useState, useRef, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Openvendor {
  image: string
  name: string
  location: string
  type: string
  rating: number
  reviews: number
}

const Recomendedsection: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const openvendor: Openvendor[] = [
    // ... your data (unchanged)
    {
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      name: 'Eighty-8 Covent Garden',
      location: 'Covent Garden, London',
      type: 'Nails',
      rating: 4.6,
      reviews: 467
    },
    {
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop',
      name: 'PIERŌT AMSTERDAM',
      location: 'Amsterdam-zuid, Amsterdam',
      type: 'Hair Salon',
      rating: 4.9,
      reviews: 357
    },
    {
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=300&fit=crop',
      name: 'Trikwan Aesthetics',
      location: 'Mayfair, London',
      type: 'Medspa',
      rating: 5.0,
      reviews: 237
    },
    {
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      name: 'Maria Charles Hair Crawley',
      location: 'Three Bridges, Crawley',
      type: 'Hair Salon',
      rating: 5.0,
      reviews: 1288
    },
    {
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop',
      name: 'The Beauty Lounge',
      location: 'Ikeja, Lagos',
      type: 'Beauty & Spa',
      rating: 4.8,
      reviews: 342
    },
    {
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      name: 'Luxe Nails Studio',
      location: 'Victoria Island, Lagos',
      type: 'Nails',
      rating: 4.7,
      reviews: 198
    }
  ]

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth

    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft < maxScroll - 5)
    setScrollPosition(scrollLeft)
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 340
    const newPosition =
      direction === 'left'
        ? Math.max(0, container.scrollLeft - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount)

    container.scrollTo({ left: newPosition, behavior: 'smooth' })

    // Update buttons after scroll animation
    setTimeout(updateScrollButtons, 300)
  }

  // Initial check and on resize
  useEffect(() => {
    updateScrollButtons()

    const container = scrollContainerRef.current
    if (container) {
      // Also check after images load (in case layout changes)
      const images = container.querySelectorAll('img')
      const handleImageLoad = () => updateScrollButtons()

      images.forEach(img => {
        if (img.complete) {
          handleImageLoad()
        } else {
          img.addEventListener('load', handleImageLoad)
        }
      })

      window.addEventListener('resize', updateScrollButtons)

      return () => {
        window.removeEventListener('resize', updateScrollButtons)
        images.forEach(img => img.removeEventListener('load', handleImageLoad))
      }
    }
  }, [])

  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">New to open vendor</h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={updateScrollButtons}
        >
          {openvendor.map((rec, index) => (
            
            <a
            href='/'
              key={index}
              className="min-w-[320px] rounded-t-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden">
               
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                />
                
                
              </div>
           <div className="mt-2 font-medium">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg flex-1">{rec.name}</h3>
                <div className="flex items-center gap-1 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{rec.rating}</span>
                  <span className="text-gray-500 text-xs">({rec.reviews})</span>
                </div>
              </div>
              <p className="text-gray-600 text-[16px]">{rec.location}</p>
              <p className="text-gray-500 text-[16px]">{rec.type}</p>
              
            </div>
            
          </a>
          
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Recomendedsection