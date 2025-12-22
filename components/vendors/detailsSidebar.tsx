import { VenueData } from '@/interface/others'
import { Clock } from 'iconsax-reactjs'
import { Car, CheckCircle, ChevronDown, MapPin, Star } from 'lucide-react'
import React from 'react'

const VendorDetailsSidebar: React.FC<any> = ({venueData}) => {
  return (
    <div className="sticky top-24 border-2 border-[#E9EBEC] rounded-2xl p-6 bg-white ">
        <h2 className="text-2xl font-bold mb-4">{venueData.name}</h2>
              
              <div className="flex items-center gap-1 mb-4">
                <span className="font-bold">{venueData.rating}</span>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-blue-600">({venueData.reviewCount})</span>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors mb-6">
                Book now
              </button>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <button className="text-green-600 font-semibold flex items-center gap-1 hover:underline">
                      Open until {venueData.openUntil}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{venueData.address}</p>
                    <button className="text-blue-600 hover:underline mt-1">Get directions</button>
                  </div>
                </div>
              </div>

              {/* Opening Times */}
              <div className="my-6 py-6 border-y-2 border-[#E9EBEC]">
                <h3 className="font-bold mb-4">Opening times</h3>
                <div className="space-y-2">
                  {venueData.openingHours.map((schedule: any, idx: any) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${schedule.isOpen ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>{schedule.day}</span>
                      </div>
                      <span className={schedule.isOpen ? 'text-gray-900' : 'text-gray-400'}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="">
                <h3 className="font-bold mb-4">Additional information</h3>
                <div className="space-y-3">
                  {venueData.additionalInfo.map((info: any, idx: any) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      {info.includes('Parking') ? (
                        <Car className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  )
}

export default VendorDetailsSidebar