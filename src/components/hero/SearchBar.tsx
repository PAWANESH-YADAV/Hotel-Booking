import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Search, 
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

const DESTINATIONS = [
  'All Luxury Stays',
  'Janpath, Connaught Place',
  'Chanakyapuri',
  'Lutyens’ Delhi',
  'Aerocity, IGI Airport',
  'Lodhi Road',
  'Civil Lines'
];

export const SearchBar: React.FC = () => {
  const { search, setSearch, setFilters, showToast } = useBooking();
  
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestDropdownOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setGuestDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = () => {
    // Update active filter query
    setFilters(prev => ({
      ...prev,
      neighborhood: search.destination === 'All Luxury Stays' ? 'All' : search.destination
    }));

    showToast(`Searching luxury stays in ${search.destination} for ${search.adults} guests...`, 'info');

    // Smooth scroll to hotels section
    const el = document.getElementById('hotels-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-search-container">
      <div className="search-bar-card">
        {/* DESTINATION FIELD */}
        <div className="search-field" ref={destRef}>
          <span className="search-label">
            <MapPin size={13} color="#b88d3d" />
            <span>Destination</span>
          </span>
          <div 
            className="search-input-wrapper"
            onClick={() => setDestDropdownOpen(!destDropdownOpen)}
          >
            <span className="search-val">{search.destination}</span>
            <ChevronDown size={14} color="#8c764e" />
          </div>

          {destDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '260px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
              border: '1px solid #dfba73',
              marginTop: '8px',
              zIndex: 100,
              overflow: 'hidden'
            }}>
              {DESTINATIONS.map((dest) => (
                <div
                  key={dest}
                  onClick={() => {
                    setSearch(prev => ({ ...prev, destination: dest }));
                    setDestDropdownOpen(false);
                  }}
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.88rem',
                    color: search.destination === dest ? '#b88d3d' : '#2d3748',
                    fontWeight: search.destination === dest ? 700 : 500,
                    background: search.destination === dest ? '#fcf8f0' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #f0f0ee'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f7f4ed'}
                  onMouseLeave={(e) => e.currentTarget.style.background = search.destination === dest ? '#fcf8f0' : 'transparent'}
                >
                  {dest}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CHECK IN FIELD */}
        <div className="search-field">
          <span className="search-label">
            <CalendarIcon size={13} color="#b88d3d" />
            <span>Check In</span>
          </span>
          <input
            type="date"
            className="search-date-input"
            value={search.checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSearch(prev => ({ ...prev, checkIn: e.target.value }))}
          />
        </div>

        {/* CHECK OUT FIELD */}
        <div className="search-field">
          <span className="search-label">
            <CalendarIcon size={13} color="#b88d3d" />
            <span>Check Out</span>
          </span>
          <input
            type="date"
            className="search-date-input"
            value={search.checkOut}
            min={search.checkIn}
            onChange={(e) => setSearch(prev => ({ ...prev, checkOut: e.target.value }))}
          />
        </div>

        {/* GUESTS FIELD */}
        <div className="search-field" ref={guestRef}>
          <span className="search-label">
            <Users size={13} color="#b88d3d" />
            <span>Guests</span>
          </span>
          <div 
            className="search-input-wrapper"
            onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
          >
            <span className="search-val">
              {search.adults} Adults, {search.rooms} Room{search.rooms > 1 ? 's' : ''}
              {search.children > 0 ? `, ${search.children} Child` : ''}
            </span>
            <ChevronDown size={14} color="#8c764e" />
          </div>

          {guestDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '260px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
              border: '1px solid #dfba73',
              marginTop: '8px',
              zIndex: 100,
              padding: '16px'
            }}>
              {/* Adults Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1f' }}>Adults</div>
                  <div style={{ fontSize: '0.72rem', color: '#718096' }}>Age 13+</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ fontWeight: 600, minWidth: '18px', textAlign: 'center', color: '#1a1a1f' }}>{search.adults}</span>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, adults: Math.min(8, prev.adults + 1) }))}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1f' }}>Children</div>
                  <div style={{ fontSize: '0.72rem', color: '#718096' }}>Ages 0 - 12</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ fontWeight: 600, minWidth: '18px', textAlign: 'center', color: '#1a1a1f' }}>{search.children}</span>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Rooms Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1f' }}>Rooms</div>
                  <div style={{ fontSize: '0.72rem', color: '#718096' }}>Selected Suites</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ fontWeight: 600, minWidth: '18px', textAlign: 'center', color: '#1a1a1f' }}>{search.rooms}</span>
                  <button
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSearch(prev => ({ ...prev, rooms: Math.min(4, prev.rooms + 1) }))}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          className="search-btn"
          onClick={handleSearchSubmit}
        >
          <Search size={18} />
          <span>Check Availability</span>
        </button>
      </div>
    </div>
  );
};
