import React from 'react'

 export const Star = () => (
    <svg className="w-6 h-6 fill-yellow-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

const ReviewCard = ({review}: any) => {
  return (
    <div
        className="min-w-[400px] overflow-hidden"
    >
        <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col">
            <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} />
                ))}
            </div>
                  
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                {review.title}
            </h3>
                  
            <p className="text-gray-700 mb-8 flex-grow leading-relaxed">
                {review.text}
            </p>
                  
            <div className="flex items-center gap-3 mt-auto">
                <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <div className="font-semibold text-gray-900">
                        {review.author}
                    </div>
                    <div className="text-sm text-gray-600">
                        {review.location}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard