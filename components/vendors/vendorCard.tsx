import { Star } from 'lucide-react'
import React from 'react'

const VendorCard = ({rec}: any) => {
  return (
    <div
        className="min-w-[350px] lg:min-w-[400px] overflow-hidden cursor-pointer"
    >
        <div className="relative overflow-hidden">
            <img
                src={rec.image}
                alt={rec.name}
                className="w-full h-56 object-cover hover:scale-110 transition-transform duration-300 rounded-xl"
            />
        </div>
        <div className="mt-2 font-medium">
            <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg flex-1">{rec.name}</h3>
                <div className="flex items-center gap-1 px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{rec.rating}</span>
                    <span className="text-gray-500 text-xs">({rec.reviews})</span>
                </div>
            </div>
            <p className="text-gray-600 text-[16px]">{rec.location}</p>
            <p className="text-gray-500 text-[16px]">{rec.type}</p>
        </div>
    </div>
  )
}

export default VendorCard