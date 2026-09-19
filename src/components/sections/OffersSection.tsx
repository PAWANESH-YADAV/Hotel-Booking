import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';

const OFFERS = [
  {
    title: 'The Royal Heritage Retreat',
    subtitle: 'Valid through 2026 Season',
    discount: 'Complimentary Suite Upgrade',
    benefits: [
      'Daily royal buffet breakfast in 1911 Verandah',
      '60-Minute Signature Ayurvedic Spa therapy for two',
      'Curated private walking tour of Lutyens’ architecture',
      'Early 11:00 check-in and late 16:00 check-out'
    ],
    code: 'IMPERIAL-ROYAL26'
  },
  {
    title: 'Epicurean Delhi Odyssey',
    subtitle: 'Gourmet Gastronomy Package',
    discount: 'Exclusive Dining Credit Included',
    benefits: [
      'Guaranteed reservations at Bukhara & MEGU',
      'Private sommelier wine pairing experience',
      'Airport limousine pickup in luxury Mercedes fleet',
      'Chef’s signature bespoke tasting course'
    ],
    code: 'GOURMET-DELHI26'
  },
  {
    title: 'Sanctuary & Wellness Escape',
    subtitle: 'Weekend Rejuvenation',
    discount: '25% Extended Stay Privileges',
    benefits: [
      'Access to heated rooftop infinity pools',
      'Daily morning yoga & meditation sessions',
      'Customized herbal bath rituals & organic juices',
      'High-speed Wi-Fi and complimentary laundry'
    ],
    code: 'WELLNESS-ESCAPE'
  }
];

export const OffersSection: React.FC = () => {
  const { showToast } = useBooking();

  const handleClaimOffer = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Offer code "${code}" copied! It will apply at checkout.`, 'success');
    const el = document.getElementById('hotels-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="offers-section" style={{ padding: '90px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-tag">
            <Tag size={13} />
            <span>Curated Privileges</span>
          </div>
          <h2 className="section-title">Exclusive Offers & Packages</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Elevate your stay in the capital with bespoke privileges, wellness rituals, and fine dining credits.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {OFFERS.map((offer, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(24,27,35,0.9) 0%, rgba(18,20,26,0.95) 100%)'
              }}
            >
              <div style={{
                display: 'inline-block',
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-light)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '14px',
                width: 'fit-content'
              }}>
                {offer.discount}
              </div>

              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '6px' }}>{offer.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{offer.subtitle}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flexGrow: 1 }}>
                {offer.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e4ea' }}>
                    <Check size={15} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <button
                className="btn-outline-gold"
                onClick={() => handleClaimOffer(offer.code)}
                style={{ width: '100%', padding: '12px', fontSize: '0.82rem' }}
              >
                <span>Claim Package ({offer.code})</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
