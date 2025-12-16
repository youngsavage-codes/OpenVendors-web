'use client';

import React, { useState, useEffect } from 'react';
import Footer from '../../Footer';
import Navbar from '../../Navbar';
import { 
  Star, 
  Clock, 
  MapPin, 
  Share2, 
  Heart,
  CheckCircle,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Import
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

interface Review {
  id: string;
  author: string;
  initial: string;
  date: string;
  rating: number;
  comment: string;
}

interface OpeningHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

interface VenueData {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  openUntil: string;
  images: string[];
  openingHours: OpeningHours[];
  additionalInfo: string[];
  services: Service[];
  team: TeamMember[];
  reviews: Review[];
  about: string;
}

const VenueDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venueData, setVenueData] = useState<VenueData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simulate fetching data
  useEffect(() => {
    const fetchVenueData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dummyData: VenueData = {
        name: 'The Nail Lab',
        rating: 4.8,
        reviewCount: 161,
        address: '2 Sakono Street, Wuse, Abuja, Federal Capital Territory',
        openUntil: '19:00',
        images: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop',
        ],
        openingHours: [
          { day: 'Monday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Tuesday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Wednesday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Thursday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Friday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Saturday', hours: '10:00 - 19:00', isOpen: true },
          { day: 'Sunday', hours: 'Closed', isOpen: false },
        ],
        additionalInfo: [
          'Instant Confirmation',
          'Parking available',
          'Environmentally friendly'
        ],
        services: [
          { id: '1', name: 'Gel polish toes', duration: '45 mins', price: '₦10,000', category: 'Featured' },
          { id: '2', name: 'Gel Polish Take Off', duration: '20 mins', price: '₦3,000', category: 'Featured' },
          { id: '3', name: 'BIAB (Refill Hands)', duration: '2 hrs', price: '₦18,500', category: 'BIAB' },
          { id: '4', name: 'Nail Lab Standard Pedicure (Female)', duration: '55 mins', price: '₦12,000', category: 'Featured' },
          { id: '5', name: 'Hard Gel Full Set', duration: '1 hr 30 mins', price: '₦25,000', category: 'Hard Gel' },
          { id: '6', name: 'GELX Application', duration: '1 hr 45 mins', price: '₦22,000', category: 'GELX' },
        ],
        team: [
          { id: '1', name: 'Mary', role: 'Pedicurist', rating: 0, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
          { id: '2', name: 'Martha', role: 'Nail Technician', rating: 0, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
          { id: '3', name: 'Loveth', role: 'Nail Technician', rating: 4.6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
          { id: '4', name: 'Mike', role: 'Nail Technician', rating: 4.8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
          { id: '5', name: 'Gift', role: 'Pedicurist', rating: 4.8, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
          { id: '6', name: 'Jessica', role: 'Pedicurist', rating: 4.8, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop' },
        ],
        reviews: [
          { id: '1', author: 'Yewande O', initial: 'Y', date: 'Today at 01:17', rating: 5, comment: 'Great service' },
          { id: '2', author: 'Yewande O', initial: 'Y', date: 'Sun, 14 Dec 2025 at 10:59', rating: 5, comment: 'Great service' },
          { id: '3', author: 'Esther', initial: 'E', date: 'Sat, 6 Dec 2025 at 07:11', rating: 5, comment: 'Excellent service' },
          { id: '4', author: 'Oluoma O', initial: 'O', date: 'Thu, 4 Dec 2025 at 19:12', rating: 5, comment: 'Martha did great, I\'d book her next time' },
          { id: '5', author: 'Christabel A', initial: 'C', date: 'Sat, 22 Nov 2025 at 19:46', rating: 5, comment: 'She was patient with my requests and gave me suggestions also. She was polite too' },
          { id: '6', author: 'Esther', initial: 'E', date: 'Sun, 2 Nov 2025 at 02:12', rating: 5, comment: 'Awesome service every time I visit!' },
        ],
        about: 'The Nail Lab is a premier nail care and design studio located at 2 Sakono Street, Wuse 2, Abuja. Renowned for its minimalist aesthetic and meticulous attention to detail, it caters to a diverse clientele seeking both classic and contemporary nail services.'
      };
      
      setVenueData(dummyData);
      setIsLoading(false);
    };

    fetchVenueData();
  }, []);

  const categories = ['Featured', 'BIAB', 'Hard Gel', 'GELX', 'ACRYLICS', 'POLYGEL', 'GEL POLISH'];

  const filteredServices = venueData?.services.filter(
    service => selectedCategory === 'Featured' || service.category === selectedCategory
  ) || [];

  const nextImage = () => {
    if (venueData) {
      setCurrentImageIndex((prev) => (prev + 1) % venueData.images.length);
    }
  };

  const prevImage = () => {
    if (venueData) {
      setCurrentImageIndex((prev) => (prev - 1 + venueData.images.length) % venueData.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!venueData) {
    return <div className="min-h-screen flex items-center justify-center">Error loading venue data</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
        <Navbar />
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold">{venueData.name}</h1>
            <div className="flex gap-2">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <span className="font-bold">{venueData.rating}</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-blue-600">({venueData.reviewCount})</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-green-600 font-semibold">Open until {venueData.openUntil}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">{venueData.address.split(',')[1]}</span>
            <button className="text-blue-600 hover:underline">Get directions</button>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img 
              src={venueData.images[currentImageIndex]} 
              alt={`${venueData.name} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {venueData.images.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative h-44 rounded-2xl overflow-hidden">
                <img src={img} alt={`${venueData.name} ${idx + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <button className="col-span-2 h-44 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <span className="font-semibold">See all images</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Services */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              
              {/* Category Pills */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service List */}
              <div className="space-y-4">
                {filteredServices.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-gray-600 text-sm">{service.duration}</p>
                      <p className="font-bold mt-1">{service.price}</p>
                    </div>
                    <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 font-medium">
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Team</h2>
                <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                  See all
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {venueData.team.slice(0, 6).map(member => (
                  <div key={member.id} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                      />
                      {member.rating > 0 && (
                        <div className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 shadow-md">
                          {member.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
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
                {venueData.reviews.map(review => (
                  <div key={review.id} className="border-b pb-4">
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

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{venueData.about}</p>
            </section>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 bg-white shadow-lg">
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
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Opening times</h3>
                <div className="space-y-2">
                  {venueData.openingHours.map((schedule, idx) => (
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
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Additional information</h3>
                <div className="space-y-3">
                  {venueData.additionalInfo.map((info, idx) => (
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
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default VenueDetailsPage;