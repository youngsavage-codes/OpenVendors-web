/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Search, MapPin, Calendar, Star, Clock, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ServiceDetailsModal from '@/components/ServiceDetailsModal';
import { services, vendorIdMap } from '@/components/services/servicesData';

const categories = ['All', 'Hair Salons', 'Nails', 'Eyebrows & Lashes', 'Skincare', 'Massage', 'Makeup'];

function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location || service.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = parseFloat(service.price.replace('$', '')) >= priceRange[0] && 
                        parseFloat(service.price.replace('$', '')) <= priceRange[1];
    const matchesRating = service.rating >= minRating;
    
    return matchesCategory && matchesSearch && matchesLocation && matchesPrice && matchesRating;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setPriceRange([0, 200]);
    setMinRating(0);
  };

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className='min-h-screen bg-gray-50 font-inter'>
      <Navbar />
      
      {/* Hero Section with Search */}
      <div className='pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-white via-purple-50/30 to-pink-50/30'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-4'>
            Book local selfcare services
          </h1>
          <p className='text-gray-600 text-lg sm:text-xl max-w-3xl mb-8'>
            Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide
          </p>

          {/* Search Bar */}
          <div className='max-w-5xl mt-8'>
            <div className='flex flex-col lg:flex-row items-stretch lg:items-center bg-white rounded-3xl lg:rounded-full px-4 sm:px-6 py-4 lg:py-3 gap-4 border-4 sm:border-[7px] border-white/40 backdrop-blur-md shadow-lg'>
              <div className='flex-1 flex items-center gap-3'>
                <Search className='w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Treatment or venue'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400'
                />
              </div>
              
              <div className='hidden lg:block h-6 w-px bg-gray-300' />
              
              <div className='flex items-center gap-3'>
                <MapPin className='w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400'
                />
              </div>
              
              <div className='hidden lg:block h-6 w-px bg-gray-300' />
              
              <div className='flex items-center gap-3'>
                <Calendar className='w-5 h-5 text-gray-400' />
                <input
                  type='datetime-local'
                  className='flex-1 outline-none text-gray-700'
                />
              </div>
              
              <button className='w-full lg:w-auto lg:ml-4 bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base'>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
          {/* Category Pills */}
          <div className='flex gap-2 overflow-x-auto pb-2 flex-1'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            <Filter className='w-4 h-4' />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className='mt-4 bg-white rounded-2xl p-6 border border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-bold text-lg'>Filters</h3>
              <button
                onClick={clearFilters}
                className='text-sm text-gray-600 hover:text-black'
              >
                Clear all
              </button>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type='range'
                  min='0'
                  max='200'
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className='w-full'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Minimum Rating: {minRating > 0 ? `${minRating}+` : 'Any'}
                </label>
                <div className='flex gap-2'>
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        minRating === rating
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating > 0 ? `${rating}+` : 'Any'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        {filteredServices.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-gray-500 text-lg mb-4'>No services found. Try adjusting your filters.</p>
            <button
              onClick={clearFilters}
              className='px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800'
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6 text-gray-600'>
              Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className='group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer'
                >
                  <div className='relative h-48 overflow-hidden'>
                    <img
                      src={service.image}
                      alt={service.name}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                    />
                    {service.available && (
                      <div className='absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
                        Available
                      </div>
                    )}
                  </div>
                  
                  <div className='p-5'>
                    <div className='flex items-start justify-between mb-2'>
                      <span className='text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                        {service.category}
                      </span>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                        <span className='text-sm font-semibold'>{service.rating}</span>
                        <span className='text-xs text-gray-500'>({service.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className='text-lg font-bold text-black mb-1 group-hover:text-gray-700 transition-colors'>
                      {service.name}
                    </h3>
                    
                    <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                      {service.description}
                    </p>
                    
                    <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{service.duration}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-4 h-4' />
                        <span className='truncate'>{service.location}</span>
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                      <div>
                        <span className='text-2xl font-bold text-black'>{service.price}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                        }}
                        className='px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'
                      >
                        Book Now
                      </button>
                    </div>
                    
                    <p className='text-xs text-gray-500 mt-2'>{service.vendor}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ServiceDetailsModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className='min-h-screen bg-gray-50 font-inter flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

