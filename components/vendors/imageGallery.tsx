"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const ImageGallery = ({ venueData, currentImageIndex, prevImage, nextImage }: any) => {
  if (!venueData.images || venueData.images.length === 0) return null;

  // Get side images (exclude the main image)
  const sideImages = venueData.images.filter((_: any, idx: any) => idx !== currentImageIndex).slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
      {/* Main Image */}
      <div className="relative rounded-2xl lg:col-span-7 overflow-hidden h-[400px] lg:h-[700px]">
        <img
          src={venueData.images[currentImageIndex]}
          alt={`${venueData.name} ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Side Images */}
      <div className="hidden lg:grid grid-rows-2 gap-4 lg:col-span-5 h-[700px]">
        {sideImages.map((img: any, idx: any) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden">
            <img
              src={img}
              alt={`${venueData.name} side ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
