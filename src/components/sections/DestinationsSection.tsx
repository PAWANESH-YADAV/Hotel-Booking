import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

const DELHI_DESTINATIONS = [
  {
    name: 'Janpath & Connaught Place',
    tagline: 'Colonial Colonnades & Heritage High Street',
    count: '6 Luxury Stays',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    neighborhood: 'Janpath, Connaught Place'
  },
  {
    name: 'Chanakyapuri Enclave',
    tagline: 'Embassies, Wide Boulevards & Palaces',
    count: '8 Luxury Stays',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    neighborhood: 'Chanakyapuri'
  },
  {
    name: 'Lutyens’ Bungalow Zone',
    tagline: 'India Gate, Rashtrapati Bhavan & Regal Trees',
    count: '5 Luxury Stays',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    neighborhood: 'Lutyens’ Delhi'
  },
  {
    name: 'Delhi Aerocity Hub',
    tagline: 'World-Class Gateway & Modern Grandeur',
    count: '7 Luxury Stays',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    neighborhood: 'Aerocity, IGI Airport'
  }
];

export const DestinationsSection: React.FC = () => {
  const { setFilters, showToast } = useBooking();

  const handleSelectDestination = (neighborhood: string) => {
    setFilters(prev => ({
      ...prev,
      neighborhood
    }));
    showToast(`Filtering stays in ${neighborhood}`, 'info');
    const el = document.getElementById('hotels-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations-section" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="section-tag">
            <Sparkles size={13} />
            <span>Prime Capital Quarters</span>
          </div>
          <h2 className="section-title">Enchanting New Delhi Destinations</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From the grand imperial circles of Connaught Place to the diplomatic tranquility of Chanakyapuri, discover Delhi's most celebrated neighborhoods.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {DELHI_DESTINATIONS.map((dest, i) => (
            <div
              key={i}
              onClick={() => handleSelectDestination(dest.neighborhood)}
              style={{
                position: 'relative',
                height: '340px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--border-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,11,14,0.1) 0%, rgba(10,11,14,0.85) 100%)'
              }} />

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  <MapPin size={12} />
                  <span>{dest.count}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '4px 0 6px 0', lineHeight: 1.2 }}>{dest.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#d1d5db', marginBottom: '12px' }}>{dest.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                  <span>Explore Stays</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
