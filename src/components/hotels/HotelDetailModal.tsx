import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  MapPin,
  Star,
  Heart,
  Bed,
  Maximize2,
  Eye,
  Check,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const HotelDetailModal: React.FC = () => {
  const {
    selectedHotelForDetail,
    setSelectedHotelForDetail,
    setSelectedHotelForBooking,
    setSelectedRoomForBooking,
    formatPrice
  } = useBooking();

  const { favorites, toggleFavorite } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedHotelForDetail) return null;

  const hotel = selectedHotelForDetail;
  const isFavorite = favorites.includes(hotel.id);

  const handleBookRoom = (room: any) => {
    setSelectedHotelForBooking(hotel);
    setSelectedRoomForBooking(room);
    setSelectedHotelForDetail(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedHotelForDetail(null)}>
      <div
        className="modal-card"
        style={{ maxWidth: '900px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600 }}>
              {hotel.starCategory}★ Luxury Stay • {hotel.neighborhood}
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', lineHeight: 1.2 }}>{hotel.name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              className={`hotel-fav-btn ${isFavorite ? 'active' : ''}`}
              style={{ position: 'static' }}
              onClick={() => toggleFavorite(hotel.id)}
            >
              <Heart size={16} fill={isFavorite ? '#e53e3e' : 'none'} color={isFavorite ? '#e53e3e' : '#ffffff'} />
            </button>
            <button className="modal-close-btn" onClick={() => setSelectedHotelForDetail(null)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px 30px' }}>
          {/* Gallery Showcase */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ width: '100%', height: '360px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
              <img
                src={hotel.images[activeImageIndex] || hotel.images[0]}
                alt={hotel.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {hotel.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                {hotel.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '90px',
                      height: '60px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImageIndex === idx ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      opacity: activeImageIndex === idx ? 1 : 0.65,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Details Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
              <Star size={16} fill="#d4af37" color="#d4af37" />
              <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{hotel.rating.toFixed(2)}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({hotel.reviewCount} Verified Reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <MapPin size={15} color="var(--gold-primary)" />
              <span>{hotel.address}</span>
            </div>

            <div style={{ display: 'flex', gap: '14px', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
              {hotel.contactPhone && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} /> {hotel.contactPhone}
                </span>
              )}
            </div>
          </div>

          {/* Hotel Description */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--gold-light)', marginBottom: '10px' }}>The Experience</h3>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {hotel.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--gold-light)', marginBottom: '14px' }}>Curated Privileges & Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {hotel.amenities.map((amenity, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.85rem',
                    color: '#f3f4f6'
                  }}
                >
                  <Check size={14} color="var(--gold-primary)" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms & Section */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '16px' }}>
              Available Suites & Accommodations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr auto',
                    gap: '20px',
                    alignItems: 'center'
                  }}
                >
                  {/* Room Thumbnail */}
                  <div style={{ width: '100%', height: '120px', borderRadius: '6px', overflow: 'hidden' }}>
                    <img
                      src={room.images[0] || hotel.images[0]}
                      alt={room.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Room Info */}
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '6px' }}>{room.name}</h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Maximize2 size={13} color="var(--gold-primary)" /> {room.roomSizeSqFt} sq ft
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Bed size={13} color="var(--gold-primary)" /> {room.bedType}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Eye size={13} color="var(--gold-primary)" /> {room.view}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {room.amenities.map((ra, idx) => (
                        <span key={idx} className="amenity-pill" style={{ fontSize: '0.7rem' }}>
                          {ra}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div style={{ textAlign: 'right', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Per Night</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
                      {formatPrice(room.pricePerNight)}
                    </div>
                    <button
                      className="btn-gold"
                      onClick={() => handleBookRoom(room)}
                      style={{ padding: '8px 18px', fontSize: '0.75rem', width: '100%' }}
                    >
                      <span>Reserve Suite</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
