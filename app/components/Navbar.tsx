// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Menu } from 'lucide-react';

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 5);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <nav
//         className={`p-2 fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
//           scrolled ? 'bg-white shadow-md' : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto ">
//           <div className="flex justify-between items-center h-16">
            
//             <div className="flex-shrink-0">
//               <a href="#" className="text-3xl font-bold text-black">
//                 Logo
//               </a>
//             </div>

            
//             <div className="flex items-center gap-4">
//               {/* Login Link */}
//               <a
//                 href="#login"
//                 className="text-black font-medium text-[18px] hover:bg-gray-300 hover:rounded-2xl hover:py-4 px-4 transition-all hidden sm:block"
//               >
//                 Log in
//               </a>

              
//               <a
//                 href="#list-business"
//                 className=" border border-gray-300 hidden sm:block px-5 py-2 bg-white text-black rounded-3xl hover:bg-gray-300 hover:border-gray-400 transition-colors duration-300 font-medium"
//               >
//                 List Your Business
//               </a>

//               {/* Menu Button */}
//               <button className="bg-white flex items-center gap-2 px-5 py-2 border-2 border-gray-300 rounded-3xl hover:border-gray-400 transition-colors">
//                 <span className="font-medium">Menu</span>
//                 <Menu className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`p-2 fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14 sm:h-16">

          <a href="#" className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Logo
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#login"
              className="hidden sm:block text-sm sm:text-base font-medium px-3 py-2 hover:bg-gray-200 rounded-2xl transition"
            >
              Log in
            </a>

            <a
              href="#list-business"
              className="hidden sm:block text-sm sm:text-base px-4 py-2 border rounded-3xl hover:bg-gray-200 transition"
            >
              List Your Business
            </a>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl text-sm sm:text-base">
              Menu <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
