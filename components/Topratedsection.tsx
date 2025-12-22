import React from 'react';

const Topratedsection: React.FC = () => {
  return (
    <div className="min-h-screen font-jakarta flex items-center justify-center px-10">
      <div className="max-w-6xl w-full text-center">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          The top-rated destination for selfcare
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-12">
          One solution, one software. Trusted by the best in the selfcare industry
        </p>
        
        {/* Big Number */}
        <div className="mb-16">
          <div className="text-3xl md:text-5xl lg:text-8xl font-extrabold text-pink-500 mb-4">
            1 billion+
          </div>
          <p className="text-xl md:text-2xl text-gray-900">
            appointments booked on Fresha
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold">
              130,000+
            </div>
            <p className="text-lg md:text-[18px] ">
              partner businesses
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold">
              120+ countries
            </div>
            <p className="text-lg md:text-[18px]">
              using Fresha
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl md:text-3xl font-bold">
              450,000+
            </div>
            <p className="text-lg md:text-[18px]">
              stylists and professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topratedsection;