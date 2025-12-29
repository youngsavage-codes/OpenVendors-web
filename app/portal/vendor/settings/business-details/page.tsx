'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Edit } from 'iconsax-reactjs'

const BusinessProfilePage = () => {
  const business = {
    name: 'Savage Salon',
    website: 'https://www.savage.com',
    category: 'Hair & Beauty',
    serviceTypes: ['Hair Styling', 'Spa', 'Makeup', 'Nail Care'],
    accountType: 'Business',
    teamSize: '5-10',
    serviceDelivery: 'On-site & Online',
    location: '123 Main Street, Lagos, Nigeria',
    description:
      'We provide premium hair styling, coloring, and spa services with a focus on customer satisfaction.',
    email: 'contact@savage.com',
    phone: '+234 801 234 5678',
    logo: 'https://via.placeholder.com/120',
    gallery: [
      'https://images.unsplash.com/photo-1723879371709-17908244d70a?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629397683830-9805395892e8?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594254773847-9fce26e950bc?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1759096326551-9ad3745f0431?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577746838851-816a43ca8733?w=900&auto=format&fit=crop',
    ],
    rating: 4.5,
    totalReviews: 128,
  }

  const renderStars = () => {
    const fullStars = Math.floor(business.rating)
    const halfStar = business.rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, idx) => (
          <Star key={idx} size={20} color="#FBBF24" />
        ))}
        {halfStar && <Star size={20} color="#FBBF24" />}
        {[...Array(emptyStars)].map((_, idx) => (
          <Star key={idx} size={20} color="#E5E7EB" fill="#E5E7EB" />
        ))}
        <span className="text-gray-500 text-sm ml-2">
          ({business.totalReviews})
        </span>
      </div>
    )
  }

  return (
    <div className="px-5 py-10 mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src={business.logo}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <p className="text-gray-500">{business.category}</p>
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {business.website}
            </a>
          </div>
        </div>

        {/* Stars + Edit Button */}
        <div className="flex items-center gap-5">
          {renderStars()}
          <Button
            variant={'outline'}
            className="text-black border-2 rounded-md text-sm font-medium hover:border-0 outline-none transition"
          >
            <Edit size={20} />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-600">{business.description}</p>
      </div>

      {/* Categories & Services */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Service Categories</h2>
          <div className="flex flex-wrap gap-2">
            {business.serviceTypes.map((service, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Account Type</h2>
          <p className="text-gray-700">{business.accountType}</p>
        </div>
      </div>

      {/* Team Size & Service Delivery */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Team Size</h2>
          <p className="text-gray-700">{business.teamSize} people</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Service Delivery</h2>
          <p className="text-gray-700">{business.serviceDelivery}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <p className="font-medium">Email</p>
            <p>{business.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>{business.phone}</p>
          </div>
          <div>
            <p className="font-medium">Location</p>
            <p>{business.location}</p>
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Gallery</h2>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {business.gallery.map((img, idx) => (
            <div key={idx} className="break-inside-avoid rounded-lg overflow-hidden border border-gray-200 mb-4">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusinessProfilePage
