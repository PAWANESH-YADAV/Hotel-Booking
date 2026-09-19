import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { 
  X, 
  Printer, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard,
  QrCode,
  Share2
} from 'lucide-react';

export const BookingVoucher: React.FC = () => {
  const { confirmedBooking, setConfirmedBooking, formatPrice, showToast } = useBooking();

  if (!confirmedBooking) return null;

  const b = confirmedBooking;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(`Reservation #${b.confirmationCode} at ${b.hotelName} for ${b.guestName}`);
    showToast('Reservation details copied to clipboard!', 'success');
  };

  return (
    <div className="modal-backdrop" onClick={() => setConfirmedBooking(null)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '640px', background: '#0e1017' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1b1e26 0%, #12141a 100%)',
          padding: '24px 30px',
          borderBottom: '1px solid var(--border-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              <CheckCircle size={15} />
              <span>Reservation Confirmed</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '4px' }}>The Imperial Stay Pass</h2>
          </div>
          <button className="modal-close-btn" onClick={() => setConfirmedBooking(null)}>
            <X size={18} />
          </button>
        </div>

        {/* Voucher Pass Body */}
        <div style={{ padding: '30px' }} id="printable-voucher">
          {/* Confirmation Code Card */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px dashed var(--border-gold)',
            borderRadius: '8px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Confirmation Reference
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                {b.confirmationCode}
              </div>
            </div>
            <div style={{
              background: '#0a0b0e',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border-gold)',
              fontSize: '0.75rem',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
              Guaranteed
            </div>
          </div>

          {/* Hotel & Room Banner */}
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '24px' }}>
            <img 
              src={b.hotelImage} 
              alt={b.hotelName} 
              style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '4px' }}>{b.hotelName}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <MapPin size={13} color="var(--gold-primary)" />
                <span>{b.hotelNeighborhood}, New Delhi</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)', marginTop: '4px', fontWeight: 600 }}>
                {b.roomName}
              </div>
            </div>
          </div>

          {/* Check-in / Check-out Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'var(--bg-primary)',
            padding: '18px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Check-In</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{b.checkInDate}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={12} color="var(--gold-primary)" /> From 14:00 IST
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Check-Out</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{b.checkOutDate}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={12} color="var(--gold-primary)" /> Until 12:00 IST
              </div>
            </div>
          </div>

          {/* Guest & Payment Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Primary Guest</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{b.guestName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.guestEmail}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.guestPhone}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Charged</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                {formatPrice(b.totalAmount)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.paymentMethod}</div>
            </div>
          </div>

          {/* QR Code & Barcode Visual Section */}
          <div style={{
            borderTop: '1px dashed var(--border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>Front Desk Fast-Track</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
                Present this digital voucher or QR code upon arrival at the concierge for priority room keys.
              </div>
            </div>
            
            {/* Styled QR Code Box */}
            <div style={{
              background: '#ffffff',
              padding: '8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={52} color="#000000" />
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '20px 30px',
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button 
            className="btn-outline-gold"
            onClick={handleShare}
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            <Share2 size={14} />
            <span>Copy Reference</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn-gold"
              onClick={handlePrint}
              style={{ padding: '8px 18px', fontSize: '0.8rem' }}
            >
              <Printer size={14} />
              <span>Print Voucher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
