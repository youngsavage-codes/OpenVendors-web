import { reviews } from '@/constant/data';
import ReviewCard from './reviews/reviewCard';
import HorizontalScroller from './shared/HorizontalScroller';

const ReviewsCarousel = () => {
  return (
    <div className=" py-12 px-4">
      <h2 className="text-3xl font-bold text-black mb-8">Reviews</h2>

      <HorizontalScroller>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
       </HorizontalScroller> 
    </div>
  );
};

export default ReviewsCarousel;