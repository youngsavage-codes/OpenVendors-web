import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight,ArrowLeft, ArrowRight } from 'lucide-react';

const ReviewsCarousel = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const reviews = [
    {
      id: 1,
      rating: 5,
      title: "The best booking system",
      text: "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
      author: "Lucy",
      location: "London, UK",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      rating: 5,
      title: "Easy to use & explore",
      text: "Fresha's reminders make life so much easier. I also found a few good barbershops that I didn't know existed.",
      author: "Dan",
      location: "New York, USA",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      rating: 5,
      title: "Great for finding barbers",
      text: "I've been using Fresha for two years and it's by far the best booking platform I've used. Highly recommend it!",
      author: "Dale",
      location: "Sydney, Australia",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
    {
      id: 4,
      rating: 5,
      title: "My go-to for self-care",
      text: "Fresha is my go-to app for massages and facials. I can easily find and book places near me — I love it!",
      author: "Cameron",
      location: "Edinburgh, UK",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 5,
      rating: 5,
      title: "Fantastic service",
      text: "I've tried many booking apps, but Fresha stands out. The interface is intuitive and I love the variety of services available.",
      author: "Emma",
      location: "Toronto, Canada",
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
      id: 6,
      rating: 5,
      title: "Highly recommend",
      text: "Fresha has made booking appointments so much easier. The reminders are helpful and the payment process is seamless!",
      author: "James",
      location: "Dublin, Ireland",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  ];

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const newPosition =
      direction === 'left'
        ? Math.max(0, container.scrollLeft - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, container.scrollLeft + scrollAmount);

    container.scrollTo({ left: newPosition, behavior: 'smooth' });

    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    updateScrollButtons();

    const container = scrollContainerRef.current;
    if (container) {
      const images = container.querySelectorAll('img');
      const handleImageLoad = () => updateScrollButtons();

      images.forEach(img => {
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener('load', handleImageLoad);
        }
      });

      window.addEventListener('resize', updateScrollButtons);

      return () => {
        window.removeEventListener('resize', updateScrollButtons);
        images.forEach(img => img.removeEventListener('load', handleImageLoad));
      };
    }
  }, []);

  const Star = () => (
    <svg className="w-6 h-6 fill-yellow-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className=" py-12 px-4">
      <div className="">
        <h2 className="text-3xl font-bold text-black mb-8">Reviews</h2>
        
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className=" border border-gray-200 flex  absolute left-2 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-[25px] h-[25px] text-black " />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={updateScrollButtons}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[320px] overflow-hidden"
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
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className=" border border-gray-200 flex  absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-[24px] h-[24px] text-black " />
            </button>
          )}
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ReviewsCarousel;