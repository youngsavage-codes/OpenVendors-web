// import React from 'react'
// import { QrCode, Apple, Globe } from 'lucide-react'

// function Appadvertsection() {
//   return (
//     <div className="py-12 px-6 mt-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row gap-8 justify-around">

//           <div className="text-center md:text-left max-w-md">
//             <h6 className="font-bold flex justify-center md:justify-start gap-2 mb-2">
//               Available on <Apple /> <Globe />
//             </h6>
//             <h1 className="text-6xl font-extrabold mb-4 leading-tight">Download the Open vendor App</h1>
//             <p className="text-black text-[20px] leading-relaxed">
//               Book unforgettable beauty and wellness experiences with the Fresha mobile app
//             </p>

//             <div className="bg-gray-100 p-4 mt-[80px] rounded-lg inline-block"><a href="http://"><QrCode className="w-16 h-16" /></a></div>
//           </div>

//            <img
//               src="/images/app.webp"
//               alt="App Screenshot"
//               className="w-[300px] rounded-lg shadow-lg"
//             />
//             <div className='flex items-center justify-center'>

//              <video
//             className="w-[270px] rounded-lg shadow-lg bg-black"
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="metadata"
//             poster="/images/app.webp"
//             >
//             <source src="/video/moblievidapp.mp4" type="video/mp4" />
//         </video>
//             </div>


         
          

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Appadvertsection
import React from 'react';
import { QrCode, AppleIcon, Globe, Apple } from 'lucide-react';

function Appadvertsection() {
  return (
    <div className="py-12 px-4 sm:px-6 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-around">

          <div className=" md:text-left max-w-md">
            <p className="text-[20px] font-extrabold flex md:justify-start gap-2  text-sm sm:text-base mb-6">
              Available on <AppleIcon /> <Globe />
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Download the Open vendor App
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Book unforgettable beauty and wellness experiences with the Fresha mobile app
            </p>

            <div className="bg-gray-100 p-4 mt-10 rounded-lg inline-block">
              <QrCode className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
          </div>

          <div className='flex p-4 gap-2'>
          <img
            src="/images/app.webp"
            className="w-[220px] sm:w-[260px] md:w-[300px] rounded-lg shadow-lg"
          />

          <video
            className="w-[220px] sm:w-[260px] md:w-[270px] rounded-lg shadow-lg bg-black"
            autoPlay loop muted playsInline preload="metadata"
          >
            <source src="/video/moblievidapp.mp4" type="video/mp4" />
          </video>
          </div>

          

        </div>
      </div>
    </div>
  );
}

export default Appadvertsection;

