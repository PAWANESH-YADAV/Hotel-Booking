import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Booking } from '../../types';
import { createBooking } from '../../services/storageService';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    selectedHotelForBooking, 
    setSelectedHotelForBooking,
    selectedRoomForBooking,
    setSelectedRoomForBooking,
    search,
    formatPrice,
    currency,
    setConfirmedBooking,
    showToast
  } = useBooking();

  const { currentUser } = useAuth();

  const [guestName, setGuestName] = useState(currentUser?.displayName || 'Lord Alistair Sterling');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || 'guest@theimperialstay.com');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+91 98110 54321');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pay_at_hotel'>('pay_at_hotel');
  const [processing, setProcessing] = useState(false);

  if (!selectedHotelForBooking) return null;

  const hotel = selectedHotelForBooking;
  const currentRoom = selectedRoomForBooking || (hotel.rooms && hotel.rooms[0]);

  // Calculate number of nights
  const checkInDate = new Date(search.checkIn);
  const checkOutDate = new Date(search.checkOut);
  const diffTime = Math.max(1000 * 3600 * 24, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 3600 * 24)));

  const pricePerNight = currentRoom ? currentRoom.pricePerNight : hotel.minPricePerNight;
  const subtotal = pricePerNight * nights * search.rooms;
  const taxesAndFees = Math.round(subtotal * 0.18); // 18% GST Luxury Hospitality
  const totalAmount = subtotal + taxesAndFees;

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      showToast('Please provide your name and contact email', 'error');
      return;
    }

    setProcessing(true);

    try {
      const code = `IMP-DELHI-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        confirmationCode: code,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.images[0],
        hotelNeighborhood: hotel.neighborhood,
        roomId: currentRoom ? currentRoom.id : 'standard',
        roomName: currentRoom ? currentRoom.name : 'Deluxe Suite',
        guestName,
        guestEmail,
        guestPhone,
        checkInDate: search.checkIn,
        checkOutDate: search.checkOut,
        adults: search.adults,
        children: search.children,
        roomsCount: search.rooms,
        nights,
        pricePerNight,
        subtotal,
        taxesAndFees,
        totalAmount,
        currency,
        status: 'confirmed',
        paymentMethod: paymentMethod === 'card' ? 'Online Card (Imperial Express)' : 'Pay on Arrival at Concierge',
        specialRequests,
        createdAt: new Date().toISOString(),
        userId: currentUser?.uid || 'guest-anon'
      };

      await createBooking(newBooking);

      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSelectedHotelForBooking(null);
      setConfirmedBooking(newBooking);
      showToast(`Reservation confirmed! Reference #${code}`, 'success');
    } catch (err: any) {
      showToast('Booking could not be finalized. Please retry.', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedHotelForBooking(null)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600 }}>
              Royal Reservation
            </span>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>{hotel.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={() => setSelectedHotelForBooking(null)}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleConfirmReservation} style={{ padding: '24px 30px' }}>
          {/* Reservation Summary Pill */}
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--border-gold)',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Suite Selection</div>
              <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>{currentRoom?.name || 'Grand Suite'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dates & Duration</div>
              <div style={{ fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.9rem' }}>
                {nights} Night{nights > 1 ? 's' : ''} ({search.checkIn} to {search.checkOut})
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Party Size</div>
              <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>
                {search.adults} Adults • {search.rooms} Room{search.rooms > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Change Suite Selector */}
          {hotel.rooms.length > 1 && (
            <div className="form-group">
              <label className="form-label">Select Suite Category</label>
              <select
                className="form-select"
                value={currentRoom?.id}
                onChange={(e) => {
                  const room = hotel.rooms.find(r => r.id === e.target.value);
                  if (room) setSelectedRoomForBooking(room);
                }}
              >
                {hotel.rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {formatPrice(r.pricePerNight)} / night
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Guest Details Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '14px' }}>Guest Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Late check-out, Airport pickup"
                  className="form-input"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: '12px' }}>Payment Preference</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                onClick={() => setPaymentMethod('pay_at_hotel')}
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: paymentMethod === 'pay_at_hotel' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  background: paymentMethod === 'pay_at_hotel' ? 'rgba(212,175,55,0.1)' : 'var(--bg-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <CheckCircle2 size={18} color={paymentMethod === 'pay_at_hotel' ? 'var(--gold-primary)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Pay at Check-In</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No advance payment needed</div>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: paymentMethod === 'card' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  background: paymentMethod === 'card' ? 'rgba(212,175,55,0.1)' : 'var(--bg-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <CreditCard size={18} color={paymentMethod === 'card' ? 'var(--gold-primary)' : 'var(--text-muted)'} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Credit / Debit Card</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Encrypted instant checkout</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Ledger */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '18px 22px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span>{formatPrice(pricePerNight)} × {nights} Night{nights > 1 ? 's' : ''} ({search.rooms} Room)</span>
              <span style={{ color: '#fff' }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span>Government Hospitality GST & Luxury Levies (18%)</span>
              <span style={{ color: '#fff' }}>{formatPrice(taxesAndFees)}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '12px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>Total Reservation Amount</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gold-primary)' }}>Best Rate Guaranteed • Free cancellation up to 48h prior</div>
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                {formatPrice(totalAmount)}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={processing}
            className="btn-gold"
            style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
          >
            <Lock size={16} />
            <span>{processing ? 'Securing Your Suite...' : 'Confirm & Guarantee Suite'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
