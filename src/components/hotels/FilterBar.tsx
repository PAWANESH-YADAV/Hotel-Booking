import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Search, SlidersHorizontal, Star, X, Check } from 'lucide-react';

const NEIGHBORHOODS = [
  'All',
  'Janpath, Connaught Place',
  'Chanakyapuri',
  'Lutyens’ Delhi',
  'Aerocity, IGI Airport',
  'Lodhi Road',
  'Civil Lines'
];

const AMENITY_OPTIONS = [
  'Swimming Pool',
  'Luxury Spa & Salon',
  '24/7 Royal Butler Service',
  'Fine Dining (5 Restaurants)',
  'Airport Limousine Transfer',
  'Rooftop Infinity Pool',
  'Private Suite Plunge Pools',
  'State-of-the-art Clean Air Tech'
];

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, formatPrice } = useBooking();
  const [expanded, setExpanded] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter(a => a !== amenity)
          : [...prev.selectedAmenities, amenity]
      };
    });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.neighborhood !== 'All' || 
    filters.starRating !== null || 
    filters.selectedAmenities.length > 0 ||
    filters.maxPrice < 100000;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Top Search & Filter Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-secondary)',
        padding: '16px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)'
      }}>
        {/* Keyword Search Input */}
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px', maxWidth: '420px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search hotel name, landmark, dining..."
            className="form-input"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            style={{ paddingLeft: '40px' }}
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sort:</span>
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            style={{ width: 'auto', padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <option value="recommended">Featured & Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Guest Rating</option>
          </select>

          {/* Toggle Advanced Filters */}
          <button
            className={`btn-outline-gold ${expanded ? 'active' : ''}`}
            onClick={() => setExpanded(!expanded)}
            style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Neighborhood Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        padding: '14px 0',
        scrollbarWidth: 'none'
      }}>
        {NEIGHBORHOODS.map(nh => {
          const isSelected = filters.neighborhood === nh;
          return (
            <button
              key={nh}
              onClick={() => setFilters(prev => ({ ...prev, neighborhood: nh }))}
              style={{
                background: isSelected ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#0a0b0e' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 18px',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-smooth)'
              }}
            >
              {nh}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Drawer Section */}
      {expanded && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          marginTop: '12px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          animation: 'fadeIn 0.25s ease'
        }}>
          {/* Price Range Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="form-label">Max Price / Night</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 700 }}>
                {formatPrice(filters.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={100000}
              step={2000}
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>{formatPrice(15000)}</span>
              <span>{formatPrice(100000)}</span>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div>
            <span className="form-label">Minimum Hotel Star Rating</span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              {[null, 4, 5].map(stars => {
                const isSel = filters.starRating === stars;
                return (
                  <button
                    key={stars ?? 'all'}
                    onClick={() => setFilters(prev => ({ ...prev, starRating: stars }))}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: isSel ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSel ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: isSel ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    {stars ? (
                      <>
                        <span>{stars}</span>
                        <Star size={12} fill="#d4af37" color="#d4af37" />
                      </>
                    ) : (
                      'Any Stars'
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Luxury Amenities Filter */}
          <div style={{ gridColumn: '1 / -1' }}>
            <span className="form-label" style={{ marginBottom: '12px' }}>Signature Amenities</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {AMENITY_OPTIONS.map(amenity => {
                const isSelected = filters.selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      color: isSelected ? 'var(--gold-light)' : 'var(--text-secondary)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected && <Check size={12} />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
