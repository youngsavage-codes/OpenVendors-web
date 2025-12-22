import { trends } from '@/constant/data'
import VendorCard from './vendors/vendorCard'
import HorizontalScroller from './shared/HorizontalScroller'


const Trending: React.FC = () => {
  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">Trending</h2>
      <HorizontalScroller>
        {trends.map((rec, index) => (
          <VendorCard key={index} rec={rec} />
        ))}
      </HorizontalScroller>
    </div>
  )
}

export default Trending