import { Hotel, Booking, BookingStatus } from '../types';
import { INITIAL_HOTELS } from '../data/initialHotels';
import { db, isFirebaseConfigured } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const HOTELS_STORAGE_KEY = 'the_imperial_stay_hotels_v1';
const BOOKINGS_STORAGE_KEY = 'the_imperial_stay_bookings_v1';
const WISHLIST_STORAGE_KEY = 'the_imperial_stay_wishlist_v1';

// Helpers for LocalStorage fallback
function getLocalHotels(): Hotel[] {
  try {
    const raw = localStorage.getItem(HOTELS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(INITIAL_HOTELS));
      return INITIAL_HOTELS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_HOTELS;
  }
}

function saveLocalHotels(hotels: Hotel[]) {
  localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
}

function getLocalBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

// ----------------------------------------------------
// HOTELS API
// ----------------------------------------------------
export async function fetchAllHotels(): Promise<Hotel[]> {
  if (isFirebaseConfigured && db) {
    try {
      const hotelsCol = collection(db, 'hotels');
      const snapshot = await getDocs(hotelsCol);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => d.data() as Hotel);
      }
      // If Firestore is empty, seed with INITIAL_HOTELS
      for (const hotel of INITIAL_HOTELS) {
        await setDoc(doc(db, 'hotels', hotel.id), hotel);
      }
      return INITIAL_HOTELS;
    } catch (err) {
      console.warn('Firebase error, falling back to local storage:', err);
    }
  }
  return getLocalHotels();
}

export async function createHotel(hotel: Hotel): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'hotels', hotel.id), hotel);
    } catch (err) {
      console.error('Failed to create hotel in Firebase:', err);
    }
  }
  // Also persist in local storage
  const current = getLocalHotels();
  const updated = [hotel, ...current.filter(h => h.id !== hotel.id)];
  saveLocalHotels(updated);
}

export async function updateHotel(hotel: Hotel): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'hotels', hotel.id), { ...hotel });
    } catch (err) {
      console.error('Failed to update hotel in Firebase:', err);
    }
  }
  const current = getLocalHotels();
  const updated = current.map(h => h.id === hotel.id ? hotel : h);
  saveLocalHotels(updated);
}

export async function deleteHotel(hotelId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'hotels', hotelId));
    } catch (err) {
      console.error('Failed to delete hotel in Firebase:', err);
    }
  }
  const current = getLocalHotels();
  const updated = current.filter(h => h.id !== hotelId);
  saveLocalHotels(updated);
}

// ----------------------------------------------------
// BOOKINGS API
// ----------------------------------------------------
export async function createBooking(booking: Booking): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'bookings', booking.id), booking);
    } catch (err) {
      console.error('Failed to create booking in Firebase:', err);
    }
  }
  const current = getLocalBookings();
  saveLocalBookings([booking, ...current]);
}

export async function fetchUserBookings(userId: string): Promise<Booking[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as Booking);
    } catch (err) {
      console.warn('Firebase error on fetchUserBookings, using local:', err);
    }
  }
  const all = getLocalBookings();
  return all.filter(b => b.userId === userId);
}

export async function fetchAllBookings(): Promise<Booking[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as Booking);
    } catch (err) {
      console.warn('Firebase error on fetchAllBookings, using local:', err);
    }
  }
  return getLocalBookings();
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (err) {
      console.error('Failed to update booking status in Firebase:', err);
    }
  }
  const current = getLocalBookings();
  const updated = current.map(b => b.id === bookingId ? { ...b, status } : b);
  saveLocalBookings(updated);
}

// ----------------------------------------------------
// WISHLIST / FAVORITES
// ----------------------------------------------------
export function getLocalWishlist(userId: string): string[] {
  try {
    const raw = localStorage.getItem(`${WISHLIST_STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleLocalWishlist(userId: string, hotelId: string): string[] {
  const current = getLocalWishlist(userId);
  const exists = current.includes(hotelId);
  const updated = exists ? current.filter(id => id !== hotelId) : [...current, hotelId];
  localStorage.setItem(`${WISHLIST_STORAGE_KEY}_${userId}`, JSON.stringify(updated));
  return updated;
}
