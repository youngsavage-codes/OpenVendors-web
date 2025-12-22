'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Share2, 
  Heart,
  CheckCircle,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Import
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from 'react-day-picker';
import { VenueData } from '@/interface/others';
import { categories, dummyData } from '@/constant/data';
import VendorDetailsSidebar from '@/components/vendors/detailsSidebar';
import TeamDetails from '@/components/vendors/teamDetails';
import ReviewDetails from '@/components/vendors/reviewDetails';
import ImageGallery from '@/components/vendors/imageGallery';
import ServicesDetails from '@/components/vendors/servicesDetails';

const VenueDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venueData, setVenueData] = useState<VenueData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simulate fetching data
  useEffect(() => {
    const fetchVenueData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVenueData(dummyData);
      setIsLoading(false);
    };

    fetchVenueData();
  }, []);

  const filteredServices = venueData?.services.filter(
    service => selectedCategory === 'Featured' || service.category === selectedCategory
  ) || [];

  const nextImage = () => {
    if (venueData) {
      setCurrentImageIndex((prev) => (prev + 1) % venueData.images.length);
    }
  };

  const prevImage = () => {
    if (venueData) {
      setCurrentImageIndex((prev) => (prev - 1 + venueData.images.length) % venueData.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!venueData) {
    return <div className="min-h-screen flex items-center justify-center">Error loading venue data</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />
        
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold">{venueData.name}</h1>
            <div className="flex gap-2">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <span className="font-bold">{venueData.rating}</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-blue-600">({venueData.reviewCount})</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-green-600 font-semibold">Open until {venueData.openUntil}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">{venueData.address.split(',')[1]}</span>
            <button className="text-blue-600 hover:underline">Get directions</button>
          </div>
        </div>

        {/* Images Gallery */}
        <ImageGallery 
          venueData={venueData} 
          currentImageIndex={currentImageIndex} 
          prevImage={prevImage} 
          nextImage={nextImage} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Services */}
            <ServicesDetails 
              categories={categories} 
              setSelectedCategory={setSelectedCategory} 
              selectedCategory={selectedCategory} 
              filteredServices={filteredServices} 
            />

            <TeamDetails venueData={venueData} />
            {/* Reviews */}
            <ReviewDetails venueData={venueData} />

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{venueData.about}</p>
            </section>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <VendorDetailsSidebar venueData={venueData} />
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default VenueDetailsPage;