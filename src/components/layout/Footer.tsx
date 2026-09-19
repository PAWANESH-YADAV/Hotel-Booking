import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Mail, Phone, MapPin, Send, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast, currency, setCurrency } = useBooking();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Thank you! Exclusive privileges will be delivered to ${newsletterEmail}`, 'success');
    setNewsletterEmail('');
  };

  return (
    <footer style={{ background: '#07080b', borderTop: '1px solid rgba(212,175,55,0.2)', padding: '80px 0 30px 0' }}>
      <div className="container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', color: 'var(--gold-primary)' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#d4af37" stroke="#e8c869" />
                  <circle cx="12" cy="12" r="2" fill="#07080b" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', letterSpacing: '0.12em', fontWeight: 700 }}>
                THE IMPERIAL STAY
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '20px' }}>
              A refined stay in the heart of India. Curating iconic palace retreats, colonial landmarks, and state-of-the-art sanctuaries across New Delhi.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--gold-primary)" /> Janpath, Connaught Place, New Delhi 110001
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--gold-primary)" /> +91 11 2334 1234 (Concierge 24/7)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--gold-primary)" /> concierge@theimperialstay.com
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Capital Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Janpath Heritage Landmarks</a></li>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Chanakyapuri Diplomatic Enclave</a></li>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Lutyens’ Bungalow Suites</a></li>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Aerocity Gateway Residencies</a></li>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Private Plunge Pool Villas</a></li>
            </ul>
          </div>

          {/* Privileges & Press */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>
              Royal Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><a href="#dining-section" style={{ color: 'inherit', textDecoration: 'none' }}>Michelin-Class Dining</a></li>
              <li><a href="#offers-section" style={{ color: 'inherit', textDecoration: 'none' }}>Curated Packages & Offers</a></li>
              <li><a href="#hotels-section" style={{ color: 'inherit', textDecoration: 'none' }}>Airport Limousine Fleet</a></li>
              <li><a href="#testimonials-section" style={{ color: 'inherit', textDecoration: 'none' }}>Press & Accolades</a></li>
              <li><span style={{ color: 'var(--gold-primary)' }}>Hotelier Partnership Portal</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
              Imperial Gazette
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '16px' }}>
              Receive invitation-only suite unveilings, cultural salon itineraries, and seasonal culinary retreats.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your royal email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flexGrow: 1,
                  background: '#12141a',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '10px 14px' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 The Imperial Stay New Delhi. All Rights Reserved. Luxury Hospitality & Heritage Management.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Privacy Policy</span>
            <span>Terms of Royalty</span>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              style={{ background: 'none', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--gold-light)', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem' }}
            >
              Currency: {currency === 'INR' ? '₹ INR (India)' : '$ USD (International)'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
