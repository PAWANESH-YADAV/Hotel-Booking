import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { Booking, Hotel } from '../../types';
import { fetchUserBookings, fetchAllHotels, updateBookingStatus } from '../../services/storageService';
import { 
  X, 
  Calendar, 
  Heart, 
  User, 
  Crown, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  Sparkles,
  MapPin,
  Trash2
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser, favorites, toggleFavorite } = useAuth();
  const { 
    userDashboardOpen, 
    setUserDashboardOpen, 
    formatPrice, 
    setConfirmedBooking,
    setSelectedHotelForDetail,
    showToast 
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'tier'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favoriteHotels, setFavoriteHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDashboardOpen && currentUser) {
      loadUserData();
    }
  }, [userDashboardOpen, currentUser, favorites]);

  const loadUserData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const userBookings = await fetchUserBookings(currentUser.uid);
      setBookings(userBookings);

      const allHotels = await fetchAllHotels();
      const favs = allHotels.filter(h => favorites.includes(h.id));
      setFavoriteHotels(favs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (bookingId: string) => {
    if (window.confirm('Are you sure you wish to cancel this royal reservation?')) {
      await updateBookingStatus(bookingId, 'cancelled');
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      showToast('Reservation successfully cancelled', 'info');
    }
  };

  if (!userDashboardOpen || !currentUser) return null;

  return (
    <div className="modal-backdrop" onClick={() => setUserDashboardOpen(false)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '900px', minHeight: '600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-primary)'
            }}>
              <Crown size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', lineHeight: 1.1 }}>{currentUser.displayName}</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {currentUser.loyaltyTier || 'Imperial Club Member'} • {currentUser.email}
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setUserDashboardOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div style={{
          display: 'flex',
          gap: '24px',
          padding: '0 30px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)'
        }}>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '16px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'bookings' ? '2px solid var(--gold-primary)' : '2px solid transparent',
              color: activeTab === 'bookings' ? 'var(--gold-light)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Calendar size={15} />
            <span>My Reservations ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            style={{
              padding: '16px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'wishlist' ? '2px solid var(--gold-primary)' : '2px solid transparent',
              color: activeTab === 'wishlist' ? 'var(--gold-light)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Heart size={15} />
            <span>Saved Wishlist ({favoriteHotels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tier')}
            style={{
              padding: '16px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'tier' ? '2px solid var(--gold-primary)' : '2px solid transparent',
              color: activeTab === 'tier' ? 'var(--gold-light)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Crown size={15} />
            <span>Imperial Privileges</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '30px' }}>
          {/* TAB 1: RESERVATIONS */}
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Calendar size={36} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>No Active Reservations Found</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '6px' }}>
                    Explore our curated suites in New Delhi and reserve your first stay.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {bookings.map(b => (
                    <div 
                      key={b.id}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '18px 22px',
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr auto',
                        gap: '20px',
                        alignItems: 'center'
                      }}
                    >
                      <img 
                        src={b.hotelImage} 
                        alt="" 
                        style={{ width: '100px', height: '80px', borderRadius: '6px', objectFit: 'cover' }}
                      />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: b.status === 'confirmed' ? 'rgba(72,187,120,0.15)' : 'rgba(239,68,68,0.15)',
                            color: b.status === 'confirmed' ? '#48bb78' : '#ef4444'
                          }}>
                            {b.status}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            Ref: {b.confirmationCode}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>{b.hotelName}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)' }}>{b.roomName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {b.checkInDate} to {b.checkOutDate} • {b.nights} Night{b.nights > 1 ? 's' : ''} • {formatPrice(b.totalAmount)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
                        <button
                          className="btn-gold"
                          onClick={() => setConfirmedBooking(b)}
                          style={{ padding: '8px 12px', fontSize: '0.75rem', width: '100%' }}
                        >
                          <Eye size={12} />
                          <span>View Pass</span>
                        </button>

                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelReservation(b.id)}
                            style={{
                              background: 'none',
                              border: '1px solid rgba(239,68,68,0.3)',
                              color: '#ef4444',
                              borderRadius: '4px',
                              padding: '6px 12px',
                              fontSize: '0.72rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel Stay
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {favoriteHotels.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Heart size={36} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Your Wishlist Is Empty</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '6px' }}>
                    Click the heart icon on any Delhi hotel card to save it to your private collection.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                  {favoriteHotels.map(h => (
                    <div 
                      key={h.id}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedHotelForDetail(h);
                        setUserDashboardOpen(false);
                      }}
                    >
                      <div style={{ height: '140px', position: 'relative' }}>
                        <img src={h.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(h.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Heart size={14} fill="#e53e3e" color="#e53e3e" />
                        </button>
                      </div>
                      <div style={{ padding: '14px' }}>
                        <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '4px' }}>{h.name}</h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>{h.neighborhood}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 600 }}>
                          From {formatPrice(h.minPricePerNight)} / night
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IMPERIAL TIER PRIVILEGES */}
          {activeTab === 'tier' && (
            <div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(18,20,26,0.6) 100%)',
                border: '1px solid var(--border-gold)',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    Active Membership Status
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: '#fff', marginTop: '2px' }}>Imperial Platinum Tier</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Enjoy complimentary limousine transfers, bespoke check-in, and 24/7 royal butler assistance.
                  </p>
                </div>
                <Sparkles size={42} color="var(--gold-primary)" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Guaranteed 14:00 Late Checkout</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Relax with complimentary extended stay privileges subject to availability.</div>
                </div>

                <div style={{ background: 'var(--bg-primary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Airport Luxury Chauffeur</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Complimentary one-way Mercedes/BMW airport limousine service in Delhi.</div>
                </div>

                <div style={{ background: 'var(--bg-primary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Dining & Spa 20% Privileges</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Honored at Bukhara, MEGU, San Gimignano, and all participating luxury spa pavilions.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
