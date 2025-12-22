import { Trending, VenueData } from "@/interface/others";

    export  const trends: Trending[] = [
        {
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
            name: 'Eighty-8 Covent Garden',
            location: 'Covent Garden, London',
            type: 'Nails',
            rating: 4.6,
            reviews: 467
        },
        {
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop',
            name: 'PIERŌT AMSTERDAM',
            location: 'Amsterdam-zuid, Amsterdam',
            type: 'Hair Salon',
            rating: 4.9,
            reviews: 357
        },
        {
            image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=300&fit=crop',
            name: 'Trikwan Aesthetics',
            location: 'Mayfair, London',
            type: 'Medspa',
            rating: 5.0,
            reviews: 237
        },
        {
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
            name: 'Maria Charles Hair Crawley',
            location: 'Three Bridges, Crawley',
            type: 'Hair Salon',
            rating: 5.0,
            reviews: 1288
        },
        {
            image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop',
            name: 'The Beauty Lounge',
            location: 'Ikeja, Lagos',
            type: 'Beauty & Spa',
            rating: 4.8,
            reviews: 342
        },
        {
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
            name: 'Luxe Nails Studio',
            location: 'Victoria Island, Lagos',
            type: 'Nails',
            rating: 4.7,
            reviews: 198
        }
    ]

    export   const reviews = [
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

    export const dummyData: VenueData = {
        name: 'The Nail Lab',
        rating: 4.8,
        reviewCount: 161,
        address: '2 Sakono Street, Wuse, Abuja, Federal Capital Territory',
        openUntil: '19:00',
        images: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1701977501667-20c0e38f5a9d?w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1740198321840-398cec9cb256?w=900&auto=format&fit=crop',
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
      
      export const categories = ['Featured', 'BIAB', 'Hard Gel', 'GELX', 'ACRYLICS', 'POLYGEL', 'GEL POLISH'];