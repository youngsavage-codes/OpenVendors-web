import React from 'react'
import { QrCode, Apple, Globe } from 'lucide-react'

function Appadvertsection() {
  return (
    <div className="py-12 px-6 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-around">

          <div className="text-center md:text-left max-w-md">
            <h6 className="font-bold flex justify-center md:justify-start gap-2 mb-2">
              Available on <Apple /> <Globe />
            </h6>
            <h1 className="text-6xl font-extrabold mb-4 leading-tight">Download the Open vendor App</h1>
            <p className="text-black text-[20px] leading-relaxed">
              Book unforgettable beauty and wellness experiences with the Fresha mobile app
            </p>

            <div className="bg-gray-100 p-4 mt-[80px] rounded-lg inline-block"><a href="http://"><QrCode className="w-16 h-16" /></a></div>
          </div>

           <img
              src="/images/app.webp"
              alt="App Screenshot"
              className="w-[300px] rounded-lg shadow-lg"
            />
            <div className='flex items-center justify-center'>

             <video
            className="w-[270px] rounded-lg shadow-lg bg-black"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/app.webp"
            >
            <source src="/video/moblievidapp.mp4" type="video/mp4" />
        </video>
            </div>


         
          

        </div>
      </div>
    </div>
  )
}

export default Appadvertsection
