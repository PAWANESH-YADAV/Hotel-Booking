# Implementation Plan: 'The Imperial Stay' Luxury Hotel Booking Platform

Build a responsive luxury hotel booking platform inspired by the uploaded design ("The Imperial Stay - Luxury Hotel Booking"), featuring a hero section with Delhi aesthetics, search bar, Firebase Auth & Firestore integration (with automatic fallback), user booking engine, customer dashboard, and hotelier management portal.

## User Review Required

> [!IMPORTANT]
> **Firebase Configuration & Zero-Setup Fallback Mode**: The platform will support real Firebase Authentication and Firestore via `.env` credentials. To ensure the application is immediately testable and functional without requiring manual GCP project setup, a local reactive Mock Storage & Auth layer will automatically activate if Firebase credentials are not yet configured.

> [!NOTE]
> **Tech Stack**: React with TypeScript and Vite. A bespoke luxury CSS design system (Playfair Display / Cormorant Garamond serif fonts, cursive accent typography, brushed warm gold `#c5a880` & `#d4af37`, deep charcoal obsidian `#0c0d10`, champagne accents) will be crafted to recreate the exact high-end atmosphere in the reference image.

---

## Proposed Architecture & Features

### 1. Visual Aesthetics & Design System (Matching Uploaded Screenshot)
- **Header**: Luxury monogram emblem, navigation links (Home, Rooms, Dining, Experiences, Gallery, Offers, Contact), Hotelier Portal access badge, User Authentication status, and golden "Book Now" CTA.
- **Hero Section**: Opulent royal suite backdrop, signature tagline *"A Refined Stay In The Heart Of India"*, heading *"Experience New Delhi Differently"*, cursive script *"More Than A Stay, A Story"*, and dual CTAs *"Book Your Stay"* & *"Explore Suites"*.
- **Floating Search & Availability Bar**: Location selector (All Luxury Stays, Chanakyapuri, Connaught Place, Aerocity, Lutyens' Delhi, South Delhi), Check-in date, Check-out date, Guest counter dropdown (Adults, Children, Rooms), and golden *"Check Availability"* button.
- **Rich Sections**:
  - **Curated Delhi Hotels**: Cards with high-resolution imagery, star rating, badges (Heritage, Presidential, Michelin Dining), price per night, instant booking and favorite toggle.
  - **Signature Experiences & Dining**: Private dining, heritage walks, luxury spa retreats.
  - **Popular Delhi Destinations**: Lutyens' Bungalow Zone, Connaught Place, Aerocity, Mehrauli Heritage.
  - **Curated Offers & Seasonal Packages**: Weekend Heritage Escapes, Honeymoon Delights, Business Luxury.
  - **Guest Testimonials & Press Mentions**: Forbes Travel Guide, Condé Nast, Luxury Travel Magazine reviews.
  - **Refined Footer**: Concierge contact, newsletter subscription, currency switcher (₹ INR / $ USD), legal & policies.

### 2. User Experience & Booking Engine
- **Authentication**: Modal for Email/Password Sign In & Sign Up, with a 1-click "Demo Guest" and "Demo Hotelier" quick-login for rapid evaluation.
- **Search & Filter Drawer/Bar**: Filter by destination, price range slider, star rating, amenities (Infinity Pool, Spa, Airport Transfer, 24/7 Butler, Heritage Architecture, Fine Dining).
- **Hotel Details & Room Selector**: Image gallery preview, detailed room categories (e.g. Heritage Grand Room, Royal Club Suite, Presidential Suite), amenities breakdown, live price calculator with nights & taxes.
- **Booking Modal & Voucher**: Reservation confirmation, guest details input, special requests, mock payment simulation, and printable booking confirmation ticket with reservation ID and QR code.
- **User Dashboard**:
  - **My Bookings**: View active, upcoming, and past reservations with status badges (Confirmed, Completed, Cancelled) and cancellation option.
  - **Wishlist**: Saved favorite hotels with quick booking.
  - **Profile Details**: Name, email, phone, and loyalty tier (Silver, Gold, Imperial Platinum).

### 3. Hotelier Portal (Owner Management)
- **Hotelier Dashboard View**: Overview of listed properties, total revenue, occupancy rate, and active bookings.
- **Add / Edit Hotel Form**: Property name, Delhi neighborhood, price per night, star rating, image URLs, description, amenities checkboxes, room inventory.
- **Manage Rooms**: Add new suite types, adjust pricing and capacity.
- **Reservations Management**: View live guest bookings for their properties, filter by hotel, and change booking status (Confirmed, Checked-In, Cancelled).
- **Delete Hotel**: Safe removal with confirmation.

### 4. Firebase & Data Persistence Layer
- `src/firebase/config.ts`: Firebase v10 initialization with environment variables.
- `src/services/hotelService.ts`: Unified repository interface for Hotels, Rooms, Bookings, and Wishlist.
  - Pre-seeded with 8 luxury New Delhi hotels (The Imperial Janpath, The Leela Palace Chanakyapuri, The Oberoi New Delhi, Taj Mahal Hotel Mansingh Road, ITC Maurya Diplomatic Enclave, The Lodhi, Roseate House Aerocity, Maidens Hotel Civil Lines).
  - Syncs with Firestore when credentials exist; uses persistent LocalStorage state when offline/unconfigured.
- `src/context/AuthContext.tsx`: Manages active user session, user role (`guest` vs `hotelier`), profile state, and favorites list.

---

## Proposed File Structure

```
Hotel_delhi/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .env.example
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts              # Hotel, Room, Booking, User, Filter types
    ├── firebase/
    │   └── config.ts             # Firebase init with fallback detection
    ├── data/
    │   └── initialHotels.ts      # Curated luxury Delhi hotel listings
    ├── services/
    │   └── storageService.ts     # Firestore + LocalStorage sync manager
    ├── context/
    │   ├── AuthContext.tsx       # Auth state, login/logout, favorites
    │   └── BookingContext.tsx    # Active search dates, currency, active modal
    └── components/
        ├── layout/
        │   ├── Navbar.tsx        # Opulent header matching screenshot
        │   ├── Footer.tsx        # Luxury footer
        │   └── MobileNav.tsx     # Mobile floating quick navigation
        ├── hero/
        │   ├── HeroSection.tsx   # Reference visual reproduction
        │   └── SearchBar.tsx     # Check-in/out, guests, destination filter
        ├── hotels/
        │   ├── HotelCard.tsx     # Luxury hotel card with price, tags, rating
        │   ├── HotelGrid.tsx     # Featured stays grid with filters
        │   ├── HotelDetailModal.tsx # Full suite details & room booking
        │   └── FilterBar.tsx     # Filter by area, price, rating, amenities
        ├── booking/
        │   ├── BookingModal.tsx  # Date selection, guest details & confirmation
        │   └── BookingVoucher.tsx # Printable luxury reservation pass
        ├── dashboard/
        │   ├── UserDashboard.tsx # Bookings list, wishlist, profile
        │   └── HotelierPortal.tsx # Manage hotels, rooms, reservations
        ├── sections/
        │   ├── DestinationsSection.tsx # Delhi hotspots
        │   ├── DiningExperience.tsx    # Luxury dining showcase
        │   ├── OffersSection.tsx       # Special packages
        │   └── Testimonials.tsx        # Press & reviews
        └── auth/
            └── AuthModal.tsx     # Sign In / Sign Up modal with demo accounts
```

---

## Verification Plan

### Automated Build & Typecheck
- Run `npm run build` to verify clean TypeScript compilation and asset bundling.

### Functional Verification
1. **Visual Accuracy**: Compare hero section, fonts, typography, color palette, search bar layout against the user's reference image.
2. **Search & Filter**: Search for "Chanakyapuri" or "Janpath", filter by price range and 5-star rating, confirm reactive hotel card updates.
3. **Room Booking Flow**:
   - Select dates (e.g. 19/09/2026 to 22/09/2026) -> Select room type -> Complete reservation.
   - Confirm booking voucher is issued and appears in "My Bookings" in User Dashboard.
4. **Wishlist**: Toggle favorites on hotels and inspect the Wishlist tab.
5. **Hotelier Portal**:
   - Switch to Hotelier Portal -> Add a new luxury boutique hotel in New Delhi with custom rooms -> Verify it immediately appears in the guest catalog.
   - Edit hotel pricing / rooms -> Inspect guest reservations list.
6. **Responsive Layout**: Validate desktop (1440px), tablet (768px), and mobile phone (390px) viewports with mobile nav and adaptive search bar.
