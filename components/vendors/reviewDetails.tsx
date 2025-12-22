import { Star } from 'lucide-react'
import React from 'react'

const ReviewDetails = ({venueData}: any) => {
  return (
      <section>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold">{venueData.rating}</span>
                <span className="text-blue-600">({venueData.reviewCount})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {venueData.reviews.map((review: any) => (
                  <div key={review.id} className="border-b-2 border-[#E9EBEC] pb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {review.initial}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 font-medium">
                See all
              </button>
            </section>
  )
}

export default ReviewDetails