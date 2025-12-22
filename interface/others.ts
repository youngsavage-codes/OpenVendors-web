export interface Trending {
  image: string
  name: string
  location: string
  type: string
  rating: number
  reviews: number
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  initial: string;
  date: string;
  rating: number;
  comment: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface VenueData {
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