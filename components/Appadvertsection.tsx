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
import { AppleIcon, Globe } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/constant/images';

function Appadvertsection() {
  return (
    <div className="py-12 px-4 sm:px-6 mt-8">
      <div className="mx-auto">
        <div className="grid lg:grid-cols-12">
          <div className='col-span-1' />
          <div className=" md:text-left col-span-4">
            <p className="text-[20px] font-extrabold flex md:justify-start gap-2  text-sm sm:text-base mb-6">
              Available on <AppleIcon /> <Globe />
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Download the VenStack App
            </h1>

            <p className="text-xl md:text-3xl font-medium leading-relaxed">
              Book unforgettable beauty and wellness experiences with the Fresha mobile app
            </p>

            <div className="border-2 p-4 mt-10 rounded-lg inline-block">
              <Image src={images.qrcode} width={150} height={150} alt='' />
            </div>
          </div>
          <div className='col-span-1' />
          <div className='col-span-5 p-4'>
            <div className='flex items-center justify-end gap-5 lg:gap-10'>
              <img
                src="/images/app.webp"
                className="w-[300px] lg:w-[400px] lg:h-[800px] object-fill"
              />
                <video
                  className="w-[250px] lg:w-[320px] lg:h-[650px] object-fill border-[3.5px] border-black rounded-[40px]"
                  autoPlay loop muted playsInline preload="metadata"
                >
                  <source src="/video/moblievidapp.mp4" type="video/mp4" />
                </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appadvertsection;

