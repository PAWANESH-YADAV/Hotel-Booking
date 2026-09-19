import React from 'react';
import { SearchBar } from './SearchBar';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToHotels = () => {
    const el = document.getElementById('hotels-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 11, 14, 0.75), rgba(10, 11, 14, 0.85)), url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85')`
      }}
    >
      <div className="hero-overlay" />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-content">
          {/* Main Hero Left Content */}
          <div>
            <div className="section-tag" style={{ color: 'var(--gold-light)' }}>
              <Sparkles size={13} />
              <span>A Refined Stay in the Heart of India</span>
            </div>

            <h1 className="hero-title">
              Experience<br />
              <span>New Delhi</span><br />
              Differently
            </h1>

            <p className="hero-desc">
              Luxury rooms. World-class dining. Unforgettable experiences. 
              Your perfect stay in New Delhi awaits.
            </p>

            <div className="hero-actions">
              <button className="btn-gold" onClick={scrollToHotels}>
                <span>Book Your Stay</span>
                <ArrowRight size={16} />
              </button>

              <button className="btn-outline-gold" onClick={scrollToHotels}>
                <span>Explore Suites</span>
              </button>
            </div>
          </div>

          {/* Luxury Script Signoff on the Right (Exact match to screenshot) */}
          <div className="hero-script-col">
            <div className="hero-script">
              More Than<br />
              A Stay,<br />
              A Story
            </div>
          </div>
        </div>

        {/* Floating Availability Bar */}
        <SearchBar />
      </div>
    </section>
  );
};
