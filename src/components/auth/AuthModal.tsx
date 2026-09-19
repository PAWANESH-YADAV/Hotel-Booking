import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { UserRole } from '../../types';
import { X, Lock, Mail, User, Building2, Sparkles, LogIn } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    signInWithEmail,
    signUpWithEmail,
    signInAsDemoGuest,
    signInAsDemoHotelier,
    loading
  } = useAuth();

  const { showToast } = useBooking();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('guest');
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (authModalMode === 'signin') {
        await signInWithEmail(email, password);
        showToast('Welcome back to The Imperial Stay', 'success');
      } else {
        if (!displayName) {
          setErrorMsg('Please enter your full name');
          return;
        }
        await signUpWithEmail(displayName, email, password, role);
        showToast(`Account successfully created as ${role === 'hotelier' ? 'Hotelier' : 'Privileged Guest'}`, 'success');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please try again.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setAuthModalOpen(false)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600 }}>
              Imperial Membership
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>
              {authModalMode === 'signin' ? 'Sign In to Your Account' : 'Register Royal Membership'}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={() => setAuthModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Quick 1-Click Demo Login Bar */}
          <div style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid var(--border-gold)',
            borderRadius: '8px',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={12} />
              <span>Instant One-Click Demo Access</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                className="btn-outline-gold"
                onClick={() => {
                  signInAsDemoGuest();
                  showToast('Signed in as Demo Guest (Lord Alistair)', 'success');
                }}
                style={{ padding: '7px 10px', fontSize: '0.75rem' }}
              >
                <User size={13} />
                <span>Demo Guest</span>
              </button>

              <button
                type="button"
                className="btn-outline-gold"
                onClick={() => {
                  signInAsDemoHotelier();
                  showToast('Signed in as Demo Hotelier (Oberoi-Singhania)', 'success');
                }}
                style={{ padding: '7px 10px', fontSize: '0.75rem' }}
              >
                <Building2 size={13} />
                <span>Demo Hotelier</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <div style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                marginBottom: '16px'
              }}>
                {errorMsg}
              </div>
            )}

            {authModalMode === 'signup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Maharaja Vikram Singh"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Account Role</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setRole('guest')}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: role === 'guest' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: role === 'guest' ? 'rgba(212,175,55,0.12)' : '#0f1015',
                        color: role === 'guest' ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <User size={14} />
                      <span>Guest</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('hotelier')}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: role === 'hotelier' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: role === 'hotelier' ? 'rgba(212,175,55,0.12)' : '#0f1015',
                        color: role === 'hotelier' ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Building2 size={14} />
                      <span>Hotelier / Owner</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="your.email@luxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', marginTop: '8px', padding: '13px' }}
            >
              <LogIn size={15} />
              <span>{loading ? 'Processing...' : (authModalMode === 'signin' ? 'Sign In to Portal' : 'Complete Registration')}</span>
            </button>
          </form>

          {/* Mode Switcher */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {authModalMode === 'signin' ? (
              <span>
                Don’t have an account?{' '}
                <button
                  onClick={() => setAuthModalMode('signup')}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Register here
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  onClick={() => setAuthModalMode('signin')}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
