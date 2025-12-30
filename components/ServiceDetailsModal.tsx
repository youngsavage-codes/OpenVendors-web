'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, Star, Clock, MapPin, DollarSign, Building2 } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';

interface Service {
  id: number;
  name: string;
  category: string;
  vendor: string;
  vendorId: number;
  image: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  location: string;
  available: boolean;
  description: string;
}

interface ServiceDetailsModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailsModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailsModalProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!service) return null;

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingComplete = () => {
    // Optionally close the service details modal after booking
    // onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            {service.available && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                Available
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Service Header */}
            <DialogHeader>
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {service.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews})</span>
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold text-left mb-2">
                {service.name}
              </DialogTitle>
              <p className="text-gray-600 text-lg leading-relaxed">
                {service.description}
              </p>
            </DialogHeader>

            {/* Service Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{service.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold text-2xl">{service.price}</p>
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">Vendor Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Vendor Name</p>
                    <p className="font-semibold text-lg">{service.vendor}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{service.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href={`/vendor/${service.vendorId}`}
                className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-full text-center font-medium hover:bg-gray-200 transition-colors"
                onClick={onClose}
              >
                View Vendor Profile
              </Link>
              <button 
                onClick={handleBookNow}
                className="flex-1 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>

      <BookingModal
        service={service}
        isOpen={isBookingModalOpen}
        onClose={handleBookingClose}
        onBookingComplete={handleBookingComplete}
      />
    </Dialog>
  );
}

