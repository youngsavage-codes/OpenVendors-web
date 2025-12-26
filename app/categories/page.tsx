'use client';

import React from 'react';
import { GiHairStrands, GiNails, GiEyeball, GiShinyApple } from 'react-icons/gi';
import { FaSpa, FaHeartbeat, FaUserTie, FaPalette, FaDumbbell } from 'react-icons/fa';
import { User2, Smile, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const categories = [
  { 
    name: 'Hair Salons', 
    icon: GiHairStrands, 
    description: 'Professional hair styling and treatments',
    count: '12,450+',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop'
  },
  { 
    name: 'Nails', 
    icon: GiNails, 
    description: 'Manicures, pedicures, and nail art',
    count: '8,920+',
    color: 'from-pink-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  { 
    name: 'Eyebrows & Lashes', 
    icon: GiEyeball, 
    description: 'Brow shaping and lash extensions',
    count: '6,340+',
    color: 'from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop'
  },
  { 
    name: 'Beauty Salons', 
    icon: User2, 
    description: 'Complete beauty and wellness services',
    count: '15,230+',
    color: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
  },
  { 
    name: 'MedSpa', 
    icon: FaSpa, 
    description: 'Medical spa treatments and therapies',
    count: '3,120+',
    color: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop'
  },
  { 
    name: 'Massage', 
    icon: FaUserTie, 
    description: 'Relaxing and therapeutic massages',
    count: '9,870+',
    color: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop'
  },
  { 
    name: 'Wellness Studio', 
    icon: FaHeartbeat, 
    description: 'Holistic wellness and health services',
    count: '4,560+',
    color: 'from-teal-500 to-green-500',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
  },
  { 
    name: 'Makeup', 
    icon: FaPalette, 
    description: 'Professional makeup services',
    count: '5,430+',
    color: 'from-rose-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
  },
  { 
    name: 'Fitness', 
    icon: FaDumbbell, 
    description: 'Personal training and fitness classes',
    count: '7,890+',
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
  },
  { 
    name: 'Skincare', 
    icon: Smile, 
    description: 'Facial treatments and skincare',
    count: '6,780+',
    color: 'from-violet-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=300&fit=crop'
  },
  { 
    name: 'Hair Coloring', 
    icon: Zap, 
    description: 'Professional hair coloring services',
    count: '10,120+',
    color: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1560869713-7d563b7c4b0c?w=400&h=300&fit=crop'
  },
  { 
    name: 'Nutrition', 
    icon: GiShinyApple, 
    description: 'Nutrition counseling and meal planning',
    count: '2,340+',
    color: 'from-lime-500 to-green-500',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop'
  },
];

export default function CategoriesPage() {
  return (
    <div className='min-h-screen bg-gray-50 font-inter'>
      <Navbar />
      
      <div className='pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-4'>
            Browse by Category
          </h1>
          <p className='text-gray-600 text-lg sm:text-xl max-w-3xl mb-8'>
            Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/services?category=${encodeURIComponent(category.name)}`}
                className='group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer'
              >
                {/* Image Section */}
                <div className='relative h-48 overflow-hidden'>
                  <img
                    src={category.image}
                    alt={category.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />
                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  {/* Category Name on Image */}
                  <h3 className='absolute bottom-4 left-4 right-4 text-white text-xl font-bold'>
                    {category.name}
                  </h3>
                </div>
                
                {/* Content Section */}
                <div className='p-6'>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {category.description}
                  </p>
                  
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-500 text-sm font-medium'>
                      {category.count} venues
                    </span>
                    <ArrowRight className='w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all' />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className='bg-white border-t border-gray-200 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-black mb-2'>1B+</div>
              <div className='text-gray-600 text-sm'>Appointments booked</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-black mb-2'>130K+</div>
              <div className='text-gray-600 text-sm'>Partner businesses</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-black mb-2'>120+</div>
              <div className='text-gray-600 text-sm'>Countries</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-black mb-2'>450K+</div>
              <div className='text-gray-600 text-sm'>Stylists & professionals</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

