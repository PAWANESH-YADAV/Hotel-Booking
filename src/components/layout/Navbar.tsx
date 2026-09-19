import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import {
  Building2,
  User,
  Menu,
  X,
  LogOut,
  Bookmark,
  Calendar,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    signOut,
    setAuthModalOpen,
    setAuthModalMode,
    favorites
  } = useAuth();

  const {
    userDashboardOpen,
    setUserDashboardOpen,
    hotelierPortalOpen,
    setHotelierPortalOpen,
    currency,
    setCurrency,
    showToast
  } = useBooking();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setUserDashboardOpen(false);
    setHotelierPortalOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenHotelier = () => {
    setHotelierPortalOpen(true);
    setUserDashboardOpen(false);
    setMobileMenuOpen(false);
  };

  const handleOpenDashboard = () => {
    setUserDashboardOpen(true);
    setHotelierPortalOpen(false);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Brand Logo & Tagline */}
        <div
          className="nav-brand"
          onClick={() => {
            setUserDashboardOpen(false);
            setHotelierPortalOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="brand-emblem">
            {/* Custom 8-point luxury star emblem */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#d4af37" stroke="#e8c869" />
              <circle cx="12" cy="12" r="2.5" fill="#0c0d10" />
            </svg>
          </div>
          <div>
            <span className="brand-title">The Imperial Stay</span>
            <span className="brand-subtitle">A Refined Stay in the Heart of India</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <span
                className="nav-link"
                onClick={() => {
                  setUserDashboardOpen(false);
                  setHotelierPortalOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Home
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('hotels-section')}>
                Rooms
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('dining-section')}>
                Dining
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('destinations-section')}>
                Destinations
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('offers-section')}>
                Offers
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('testimonials-section')}>
                Accolades
              </span>
            </li>
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <button
            className="user-auth-btn"
            title="Toggle Currency"
            onClick={() => {
              const next = currency === 'INR' ? 'USD' : 'INR';
              setCurrency(next);
              showToast(`Currency switched to ${next === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`, 'info');
            }}
            style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: '4px' }}
          >
            <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </span>
          </button>

          {/* Hotelier Portal Button */}
          <button
            className="hotelier-badge-btn"
            onClick={handleOpenHotelier}
            title="Open Hotelier Management Portal"
          >
            <Building2 size={15} />
            <span>Hotelier Portal</span>
          </button>

          {/* User Auth / Profile Dropdown */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                className="user-auth-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border-gold)', borderRadius: '6px' }}
              >
                <User size={16} color="#d4af37" />
                <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.displayName.split(' ')[0]}
                </span>
                {favorites.length > 0 && (
                  <span style={{ background: '#d4af37', color: '#000', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '10px' }}>
                    {favorites.length}
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '240px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '8px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  padding: '12px 0',
                  zIndex: 1100
                }}>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{currentUser.displayName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>{currentUser.loyaltyTier || 'Privileged Guest'}</div>
                  </div>

                  <div
                    onClick={handleOpenDashboard}
                    style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Calendar size={15} color="#d4af37" />
                    <span>My Reservations</span>
                  </div>

                  <div
                    onClick={() => {
                      handleOpenDashboard();
                    }}
                    style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Bookmark size={15} color="#d4af37" />
                    <span>Saved Wishlist ({favorites.length})</span>
                  </div>

                  <div
                    onClick={() => {
                      signOut();
                      setUserDropdownOpen(false);
                      showToast('You have been safely signed out.', 'info');
                    }}
                    style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#ff6b6b', borderTop: '1px solid var(--border-subtle)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="user-auth-btn"
              onClick={() => {
                setAuthModalMode('signin');
                setAuthModalOpen(true);
              }}
            >
              <User size={16} />
              <span>Sign In</span>
            </button>
          )}

          {/* Golden Book Now CTA */}
          <button
            className="btn-outline-gold"
            onClick={() => scrollToSection('hotels-section')}
            style={{ padding: '9px 18px', fontSize: '0.8rem' }}
          >
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="modal-close-btn"
            style={{ display: 'none' }}
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--gold-light)' }}>The Imperial Stay</span>
            <button className="modal-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span className="nav-link" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</span>
            <span className="nav-link" onClick={() => scrollToSection('hotels-section')}>Rooms</span>
            <span className="nav-link" onClick={() => scrollToSection('dining-section')}>Dining</span>
            <span className="nav-link" onClick={() => scrollToSection('destinations-section')}>Destinations</span>
            <span className="nav-link" onClick={() => scrollToSection('offers-section')}>Special Offers</span>
            <span className="nav-link" onClick={() => scrollToSection('testimonials-section')}>Accolades</span>
            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '10px 0' }} />
            <button className="hotelier-badge-btn" onClick={handleOpenHotelier}>
              <Building2 size={16} /> Hotelier Portal
            </button>
            {currentUser ? (
              <button className="btn-outline-gold" onClick={handleOpenDashboard}>
                <User size={16} /> My Dashboard
              </button>
            ) : (
              <button className="btn-gold" onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}>
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
