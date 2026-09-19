import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'The Imperial Stay platform sets the gold standard for hospitality in Delhi. From private plunge pools in Lodhi to the timeless museum corridors of Janpath, every detail is orchestrated to perfection.',
    author: 'Lady Camilla Kensington',
    title: 'Condé Nast Traveler Contributing Editor',
    rating: 5,
    hotel: 'The Imperial New Delhi'
  },
  {
    quote: 'Dining at Bukhara followed by the breathtaking clean-air suites overlooking Delhi Golf Course made our international diplomatic delegation feel genuinely at home. Impeccable butler service.',
    author: 'Ambassador Jean-Luc Mercier',
    title: 'European Diplomatic Mission',
    rating: 5,
    hotel: 'The Oberoi & ITC Maurya'
  },
  {
    quote: 'The rooftop infinity pool at The Leela Palace overlooking the Rashtrapati Bhavan at sunset is arguably one of the most magnificent hotel scenes anywhere in Asia.',
    author: 'Rajiv Singhania',
    title: 'Forbes Travel Guide Connoisseur',
    rating: 5,
    hotel: 'The Leela Palace Chanakyapuri'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-tag">
            <Award size={13} />
            <span>Global Acclaim</span>
          </div>
          <h2 className="section-title">Endorsements & Royal Memories</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Trusted by discerning dignitaries, global tastemakers, and leading luxury publications.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <Quote size={28} color="var(--gold-primary)" style={{ opacity: 0.4, marginBottom: '14px' }} />

              <p style={{ fontStyle: 'italic', fontSize: '0.98rem', color: '#e5e7eb', lineHeight: 1.7, marginBottom: '24px', flexGrow: 1 }}>
                "{item.quote}"
              </p>

              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: '1rem' }}>{item.author}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>{item.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Experience at {item.hotel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
