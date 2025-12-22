import React from 'react'
import { trends } from '@/constant/data'
import HorizontalScroller from '../shared/HorizontalScroller'
import VendorCard from '../vendors/vendorCard'

const Recomendedsection: React.FC = () => {
  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">New to open vendor</h2>
       <HorizontalScroller>
        {trends.map((rec, index) => (
          <VendorCard key={index} rec={rec} />
        ))}
      </HorizontalScroller>
    </div>
  )
}

export default Recomendedsection