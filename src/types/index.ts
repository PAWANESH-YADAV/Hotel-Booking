export type UserRole = 'guest' | 'hotelier' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phone?: string;
  loyaltyTier?: 'Silver' | 'Gold' | 'Imperial Platinum';
  favorites: string[]; // Hotel IDs
  createdAt: string;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  type: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: string;
  roomSizeSqFt: number;
  view: string;
  images: string[];
  amenities: string[];
  availableCount: number;
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  starCategory: number;
  minPricePerNight: number;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  tags: string[];
  rooms: Room[];
  ownerId?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export type BookingStatus = 'confirmed' | 'checked-in' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  confirmationCode: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelNeighborhood: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomsCount: number;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxesAndFees: number;
  totalAmount: number;
  currency: 'INR' | 'USD';
  status: BookingStatus;
  paymentMethod: string;
  specialRequests?: string;
  createdAt: string;
  userId: string;
}

export interface SearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export interface FilterState {
  searchQuery: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  starRating: number | null;
  selectedAmenities: string[];
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}
