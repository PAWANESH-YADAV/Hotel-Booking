import React, { createContext, useContext, useState } from 'react';
import { Hotel, Room, Booking, SearchState, FilterState } from '../types';

interface BookingContextType {
  // Search parameters
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
  // Filter parameters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  // Currency & Formatter
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (amountInInr: number) => string;
  // Modals & Active Selections
  selectedHotelForDetail: Hotel | null;
  setSelectedHotelForDetail: (hotel: Hotel | null) => void;
  selectedHotelForBooking: Hotel | null;
  setSelectedHotelForBooking: (hotel: Hotel | null) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  userDashboardOpen: boolean;
  setUserDashboardOpen: (open: boolean) => void;
  hotelierPortalOpen: boolean;
  setHotelierPortalOpen: (open: boolean) => void;
  confirmedBooking: Booking | null;
  setConfirmedBooking: (b: Booking | null) => void;
  // Toast notifications
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const INITIAL_SEARCH: SearchState = {
  destination: 'All Luxury Stays',
  checkIn: '2026-09-19',
  checkOut: '2026-09-22',
  adults: 2,
  children: 0,
  rooms: 1
};

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  neighborhood: 'All',
  minPrice: 10000,
  maxPrice: 100000,
  starRating: null,
  selectedAmenities: [],
  sortBy: 'recommended'
};

const INR_TO_USD_RATE = 1 / 86.5;

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<SearchState>(INITIAL_SEARCH);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [selectedHotelForDetail, setSelectedHotelForDetail] = useState<Hotel | null>(null);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<Hotel | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const [userDashboardOpen, setUserDashboardOpen] = useState<boolean>(false);
  const [hotelierPortalOpen, setHotelierPortalOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const formatPrice = (amountInInr: number): string => {
    if (currency === 'USD') {
      const usdVal = Math.round(amountInInr * INR_TO_USD_RATE);
      return `$${usdVal.toLocaleString('en-US')}`;
    }
    return `₹${amountInInr.toLocaleString('en-IN')}`;
  };

  return (
    <BookingContext.Provider
      value={{
        search,
        setSearch,
        filters,
        setFilters,
        resetFilters,
        currency,
        setCurrency,
        formatPrice,
        selectedHotelForDetail,
        setSelectedHotelForDetail,
        selectedHotelForBooking,
        setSelectedHotelForBooking,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        userDashboardOpen,
        setUserDashboardOpen,
        hotelierPortalOpen,
        setHotelierPortalOpen,
        confirmedBooking,
        setConfirmedBooking,
        toast,
        showToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
