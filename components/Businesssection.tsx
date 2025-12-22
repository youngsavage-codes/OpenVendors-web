import React from 'react';

 export const Star = () => (
    <svg className="w-8 h-8 fill-yellow-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

const BusinessSection: React.FC = () => {
  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center flex items-start py-5"
      style={{ backgroundImage: "url('/images/business.webp')" }}
    >

      <div className="relative grid lg:grid-cols-12 w-full px-10">
        
        {/* Left Content */}
        <div className="col-span-5 flex flex-col gap-6 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug lg:leading-tight">
            VenStack for business
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-black leading-relaxed font-medium max-w-2xl">
            Supercharge your business with the world's top booking platform for salons and spas. Independently voted no. 1 by industry professionals.
          </p>

          <div className="mt-4">
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group">
              Find out more
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          <div className='space-y-3 mt-10'>
            <h1 className='text-xl md:text-3xl lg:text-4xl font-bold'>Excellent 5/5</h1>
            <div className='flex items-center gap-2'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <p className='text-lg font-medium'>Over 1250 reviews on</p>
          </div>
        </div>

        {/* Right column intentionally empty */}
        <div className="col-span-7" />
      </div>
    </section>
  );
};

export default BusinessSection;
