import React from 'react';
import { Hotel } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { MapPin, Star, Heart, ArrowUpRight } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { favorites, toggleFavorite } = useAuth();
  const { setSelectedHotelForDetail, setSelectedHotelForBooking, setSelectedRoomForBooking, formatPrice } = useBooking();

  const isFavorite = favorites.includes(hotel.id);

  const handleOpenDetail = () => {
    setSelectedHotelForDetail(hotel);
  };

  const handleQuickBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedHotelForBooking(hotel);
    if (hotel.rooms && hotel.rooms.length > 0) {
      setSelectedRoomForBooking(hotel.rooms[0]);
    }
  };

  return (
    <div className="hotel-card" onClick={handleOpenDetail} style={{ cursor: 'pointer' }}>
      {/* Media & Badges */}
      <div className="hotel-card-media">
        <img 
          src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'} 
          alt={hotel.name}
          className="hotel-card-img"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span className="hotel-card-badge">
          {hotel.starCategory}★ {hotel.tags[0] || 'Luxury Stay'}
        </span>

        {/* Favorite Heart Button */}
        <button
          className={`hotel-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(hotel.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart size={16} fill={isFavorite ? '#e53e3e' : 'none'} color={isFavorite ? '#e53e3e' : '#ffffff'} />
        </button>
      </div>

      {/* Card Body */}
      <div className="hotel-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div className="hotel-location-tag">
            <MapPin size={13} color="var(--gold-primary)" />
            <span>{hotel.neighborhood}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
            <Star size={13} fill="#d4af37" color="#d4af37" />
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{hotel.rating.toFixed(2)}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({hotel.reviewCount})</span>
          </div>
        </div>

        <h3 className="hotel-card-title">{hotel.name}</h3>

        <p className="hotel-card-desc">{hotel.description}</p>

        {/* Amenity Badges */}
        <div className="hotel-amenities-pills">
          {hotel.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="amenity-pill">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="amenity-pill" style={{ color: 'var(--gold-light)' }}>
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Card Footer */}
        <div className="hotel-card-footer">
          <div>
            <div className="hotel-price-label">Starting From</div>
            <div className="hotel-price-val">
              {formatPrice(hotel.minPricePerNight)} <span>/ night</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-gold"
              onClick={handleQuickBook}
              style={{ padding: '8px 16px', fontSize: '0.78rem' }}
            >
              <span>Book</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
