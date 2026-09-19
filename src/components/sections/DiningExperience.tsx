import React from 'react';
import { Utensils, Award, Sparkles, Wine } from 'lucide-react';

const DINING_EXPERIENCES = [
  {
    name: 'Bukhara at ITC Maurya',
    cuisine: 'North-West Frontier Heritage',
    rating: 'World Top 50 Legacy',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned globally for its clay-oven mastery, slow-cooked Dal Bukhara simmered for 18 hours, and rustic earthen elegance.'
  },
  {
    name: 'MEGU at The Leela Palace',
    cuisine: 'Modern Japanese Fine Dining',
    rating: 'Michelin-Class Innovation',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    description: 'Sumibi Aburiyaki grilling over binchōtan charcoal and fresh sashimi flown from Tokyo Tsukiji market, served in a glass Buddha pavilion.'
  },
  {
    name: 'San Gimignano at The Imperial',
    cuisine: 'Authentic Tuscan Gastronomy',
    rating: 'Condé Nast Gold List',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'An idyllic courtyard setting surrounded by palm canopies, featuring hand-crafted pasta and vintage Italian wine cellars.'
  }
];

export const DiningExperience: React.FC = () => {
  return (
    <section id="dining-section" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-tag">
            <Utensils size={13} />
            <span>Epicurean Journeys</span>
          </div>
          <h2 className="section-title">World-Class Gastronomy</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Indulge in award-winning culinary craft guided by Michelin-decorated chefs, authentic recipes passed down through generations, and sommelier-curated cellars.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {DINING_EXPERIENCES.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(10,11,14,0.85)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--gold-light)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {item.rating}
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.78rem', marginBottom: '6px' }}>
                  <Wine size={13} />
                  <span>{item.cuisine}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>{item.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 'auto' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
