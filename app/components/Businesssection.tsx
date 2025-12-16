// import React from 'react';

// const BusinessSection: React.FC = () => {
//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-10 py-16 lg:py-24">
//       {/* Left Content */}
//       <div className="flex flex-col gap-6 w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
//         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
//           Open vendor for business
//         </h1>
        
//         <p className="text-lg md:text-xl text-black leading-relaxed max-w-lg">
//           Supercharge your business with the world's top booking platform for salons and spas. Independently voted no. 1 by industry professionals.
//         </p>
        
//         <div className="mt-4">
//           <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group">
//             Find out more
//             <svg 
//               className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M17 8l4 4m0 0l-4 4m4-4H3" 
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
      
//       {/* Right Image */}
//       <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
//         <img 
//           src="/images/business.webp" 
//           alt="Fresha business booking interface" 
//           className="w-auto lg:max-w-[1500px] h-auto object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default BusinessSection;
import React from 'react';

const BusinessSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-10 py-12 sm:py-16 lg:py-24">
      
      {/* Left Content */}
      <div className="flex flex-col gap-5 w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-snug lg:leading-tight">
          Open vendor for business
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed max-w-lg">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src="/images/business.webp"
          alt="Fresha business booking interface"
          className="w-full sm:w-[90%] lg:max-w-[700px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default BusinessSection;
