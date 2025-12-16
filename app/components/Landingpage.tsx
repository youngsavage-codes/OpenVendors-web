// 'use client'

// import React from 'react'
// import { Search, Locate, Calendar1, QrCodeIcon } from 'lucide-react'

// function Landingpage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="flex flex-col items-center text-center mt-28">

//         {/* Heading */}
//         <h1 className="text-6xl font-extrabold font-inter text-black whitespace-pre-line leading-relaxed">
//           Book local selfcare services
//         </h1>

//         <p className="font-inter text-black text-[20px]">
//           Discover top rated saloon, barbers, medpas, wellness studio and beauty experts trusted by millions worldwide.
//         </p>

//         {/* Search Bar */}
//         <div className="w-full max-w-5xl mt-12">
//           <div className="flex items-center bg-white rounded-full px-4 py-3 gap-4 border-[7px] border-black/10 backdrop-blur-md">

//             {/* Service */}
//             <div className="flex items-center gap-3 flex-1">
//               <Search />
//               <input
//                 type="text"
//                 placeholder="All treatment and ventures"
//                 className="w-full text-[14px] bg-transparent outline-none border-none font-inter text-black placeholder:text-black"
//               />
//             </div>

//             <div className="h-6 w-px bg-gray-300" />

//             {/* Location */}
//             <div className="flex items-center gap-3 flex-1">
//               <Locate />
//               <input
//                 type="search"
//                 placeholder="Current location"
//                 className="w-full text-[14px] bg-transparent outline-none border-none font-inter text-black placeholder:text-black"
//               />
//             </div>

//             <div className="h-6 w-px bg-gray-300" />

//             {/* Date */}
//             <div className="flex items-center gap-3 flex-1">
//               <Calendar1 />
//               <input
//                 type="datetime-local"
//                 className="w-full text-[14px] bg-transparent outline-none border-none font-inter text-black"
//               />
//             </div>

//             {/* Button */}
//             <button className="ml-4 bg-black text-white rounded-full px-8 py-3 font-medium">
//               Search
//             </button>

//           </div>
//         </div>

//         {/* Stats */}
//         <p className="mt-10 text-black font-inter text-[18px]">
//           <span className="font-semibold">597,314</span> appointments booked today
//         </p>

//         {/* App Button */}
//         <button className="bg-white mt-10 flex items-center gap-2 border border-gray-300 rounded-full px-6 py-3 font-medium">
//           Get the app
//          <QrCodeIcon/>
//         </button>

//       </div>
      
//     </div>
//   )
// }

// export default Landingpage
'use client'

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, QrCode, Loader2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [serviceSearch, setServiceSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Simulate search loading for service
  useEffect(() => {
    if (serviceSearch.trim()) {
      setIsServiceLoading(true);
      const timer = setTimeout(() => {
        setIsServiceLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsServiceLoading(false);
    }
  }, [serviceSearch]);

  // Simulate search loading for location
  useEffect(() => {
    if (locationSearch.trim()) {
      setIsLocationLoading(true);
      const timer = setTimeout(() => {
        setIsLocationLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLocationLoading(false);
    }
  }, [locationSearch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center text-center w-full max-w-6xl">

        {/* Heading */}
        <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-inter text-black leading-tight mb-6">
          Book local selfcare services
        </h1>

        <p className="hidden font-inter text-black text-base sm:text-lg md:text-xl max-w-3xl mb-12">
          Discover top rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-5xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center bg-white rounded-3xl lg:rounded-full px-4 sm:px-6 py-4 lg:py-3 gap-4 border-4 sm:border-[7px] border-black/10 backdrop-blur-md">

            {/* Service */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {isServiceLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600 flex-shrink-0" />
              ) : (
                <Search className="w-5 h-5 text-gray-600 flex-shrink-0" />
              )}
              <input
                type="text"
                placeholder="All treatments and venues"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                className="w-full text-sm sm:text-base bg-transparent outline-none border-none font-inter text-black placeholder:text-gray-600"
              />
            </div>

            <div className="hidden lg:block h-6 w-px bg-gray-300" />

            {/* Location */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {isLocationLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600 flex-shrink-0" />
              ) : (
                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0" />
              )}
              <input
                type="text"
                placeholder="Current location"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full text-sm sm:text-base bg-transparent outline-none border-none font-inter text-black placeholder:text-gray-600"
              />
            </div>

            <div className="hidden lg:block h-6 w-px bg-gray-300" />

            {/* Date */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <input
                type="datetime-local"
                className="w-full text-sm sm:text-base bg-transparent outline-none border-none font-inter text-black"
              />
            </div>

            {/* Button */}
            <button className="w-full lg:w-auto lg:ml-4 bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Search
            </button>

          </div>
        </div>

        {/* Stats */}
        <p className="mt-8 sm:mt-10 text-black font-inter text-base sm:text-lg">
          <span className="font-semibold">597,314</span> appointments booked today
        </p>

        {/* App Button */}
        <button className="bg-white mt-8 sm:mt-10 flex items-center gap-2 border border-gray-300 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
          Get the app
          <QrCode className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default LandingPage;