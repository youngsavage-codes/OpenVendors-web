'use client'

import VendorCard from './vendors/vendorCard'
import HorizontalScroller from '@/components/shared/HorizontalScroller'
import { trends } from '@/constant/data'

const Recomendedsection = () => {
  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">Recommended</h2>

      <HorizontalScroller>
        {trends.map((rec, index) => (
          <VendorCard key={index} rec={rec} />
        ))}
      </HorizontalScroller>
    </div>
  )
}

export default Recomendedsection
