import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { HotelGrid } from './components/hotels/HotelGrid';
import { DestinationsSection } from './components/sections/DestinationsSection';
import { DiningExperience } from './components/sections/DiningExperience';
import { OffersSection } from './components/sections/OffersSection';
import { Testimonials } from './components/sections/Testimonials';
import { HotelDetailModal } from './components/hotels/HotelDetailModal';
import { BookingModal } from './components/booking/BookingModal';
import { BookingVoucher } from './components/booking/BookingVoucher';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { HotelierPortal } from './components/dashboard/HotelierPortal';
import { AuthModal } from './components/auth/AuthModal';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toast } = useBooking();
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleHotelDataChanged = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <div className="app-layout">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section with Live Search & Date Check */}
      <HeroSection />

      {/* Hotels Catalog & Dynamic Filters */}
      <HotelGrid onRefreshTrigger={refreshCounter} />

      {/* Featured Delhi Destinations */}
      <DestinationsSection />

      {/* World-Class Dining & Gastronomy */}
      <DiningExperience />

      {/* Special Privileges & Curated Packages */}
      <OffersSection />

      {/* Press Accolades & Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <HotelDetailModal />
      <BookingModal />
      <BookingVoucher />
      <UserDashboard />
      <HotelierPortal onDataChanged={handleHotelDataChanged} />
      <AuthModal />

      {/* Global Toast Notification */}
      {toast && (
        <div className="toast-banner">
          {toast.type === 'success' && <CheckCircle2 size={18} color="#48bb78" />}
          {toast.type === 'info' && <Info size={18} color="var(--gold-primary)" />}
          {toast.type === 'error' && <AlertTriangle size={18} color="#ef4444" />}
          <span style={{ fontSize: '0.88rem' }}>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
