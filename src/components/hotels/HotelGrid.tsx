import React, { useState, useEffect, useMemo } from 'react';
import { Hotel } from '../../types';
import { fetchAllHotels } from '../../services/storageService';
import { useBooking } from '../../context/BookingContext';
import { HotelCard } from './HotelCard';
import { FilterBar } from './FilterBar';
import { Sparkles, RefreshCw } from 'lucide-react';

interface HotelGridProps {
  onRefreshTrigger?: number;
}

export const HotelGrid: React.FC<HotelGridProps> = ({ onRefreshTrigger = 0 }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { filters, resetFilters } = useBooking();

  const loadHotels = async () => {
    setLoading(true);
    try {
      const data = await fetchAllHotels();
      setHotels(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, [onRefreshTrigger]);

  // Reactive filtering
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // 1. Text Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesTagline = hotel.tagline.toLowerCase().includes(query);
        const matchesNeighborhood = hotel.neighborhood.toLowerCase().includes(query);
        const matchesDesc = hotel.description.toLowerCase().includes(query);
        const matchesTags = hotel.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesTagline && !matchesNeighborhood && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Neighborhood
      if (filters.neighborhood !== 'All') {
        if (!hotel.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
          return false;
        }
      }

      // 3. Max Price
      if (hotel.minPricePerNight > filters.maxPrice) {
        return false;
      }

      // 4. Star Rating
      if (filters.starRating !== null) {
        if (hotel.starCategory < filters.starRating) {
          return false;
        }
      }

      // 5. Selected Amenities
      if (filters.selectedAmenities.length > 0) {
        const hasAllAmenities = filters.selectedAmenities.every(amenity => 
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.minPricePerNight - b.minPricePerNight;
      if (filters.sortBy === 'price-desc') return b.minPricePerNight - a.minPricePerNight;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [hotels, filters]);

  return (
    <section id="hotels-section" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Curated Sanctuaries</span>
          </div>
          <h2 className="section-title">The Imperial Stays Collection</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Discover majestic palace retreats, colonial heritage legends, and contemporary sanctuaries across New Delhi’s most prestigious avenues.
          </p>
        </div>

        {/* Reactive Filter & Search Controls */}
        <FilterBar />

        {/* Loading Indicator */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gold-light)' }}>
            <RefreshCw size={28} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '12px', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Unveiling Delhi’s Finest Accommodations...</p>
          </div>
        ) : filteredHotels.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-gold)'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>No Accommodations Matched Your Criteria</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Try broadening your price range, choosing "All" neighborhoods, or clearing specific amenities.
            </p>
            <button className="btn-gold" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Hotel Grid */
          <div className="hotel-grid">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
