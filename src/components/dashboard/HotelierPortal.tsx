import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { Hotel, Room, Booking } from '../../types';
import { 
  fetchAllHotels, 
  createHotel, 
  updateHotel, 
  deleteHotel, 
  fetchAllBookings, 
  updateBookingStatus 
} from '../../services/storageService';
import { 
  X, 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Users, 
  Bed, 
  Check, 
  Upload, 
  Star,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const ALL_AMENITIES = [
  'Swimming Pool',
  'Luxury Spa & Salon',
  '24/7 Royal Butler Service',
  'Fine Dining (5 Restaurants)',
  'High-Speed Wi-Fi',
  'Airport Limousine Transfer',
  'Heritage Art Collection',
  'Fitness & Yoga Pavilion',
  'Rooftop Infinity Pool',
  'State-of-the-art Clean Air Tech'
];

interface HotelierPortalProps {
  onDataChanged?: () => void;
}

export const HotelierPortal: React.FC<HotelierPortalProps> = ({ onDataChanged }) => {
  const { currentUser } = useAuth();
  const { 
    hotelierPortalOpen, 
    setHotelierPortalOpen, 
    formatPrice, 
    showToast 
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'hotels' | 'bookings'>('hotels');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal for Add/Edit Hotel
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    neighborhood: 'Janpath, Connaught Place',
    address: '',
    city: 'New Delhi',
    starCategory: 5,
    minPricePerNight: 22000,
    imageUrl: '',
    description: '',
    amenities: [] as string[],
    tags: 'Heritage, Luxury, Central'
  });

  // Modal for Room Management
  const [roomModalHotel, setRoomModalHotel] = useState<Hotel | null>(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomType, setNewRoomType] = useState('Executive Suite');
  const [newRoomPrice, setNewRoomPrice] = useState(25000);
  const [newRoomSize, setNewRoomSize] = useState(550);
  const [newRoomBed, setNewRoomBed] = useState('King Master Bed');
  const [newRoomView, setNewRoomView] = useState('Garden View');
  const [newRoomImage, setNewRoomImage] = useState('');

  useEffect(() => {
    if (hotelierPortalOpen) {
      loadHotelierData();
    }
  }, [hotelierPortalOpen]);

  const loadHotelierData = async () => {
    setLoading(true);
    try {
      const hList = await fetchAllHotels();
      setHotels(hList);

      const bList = await fetchAllBookings();
      setBookings(bList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddHotelModal = () => {
    setEditingHotel(null);
    setFormData({
      name: '',
      tagline: 'A Luxury Residence in New Delhi',
      neighborhood: 'Janpath, Connaught Place',
      address: '',
      city: 'New Delhi',
      starCategory: 5,
      minPricePerNight: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      description: '',
      amenities: ['Swimming Pool', '24/7 Royal Butler Service', 'High-Speed Wi-Fi'],
      tags: 'Luxury, Delhi, Central'
    });
    setHotelModalOpen(true);
  };

  const openEditHotelModal = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      tagline: hotel.tagline,
      neighborhood: hotel.neighborhood,
      address: hotel.address,
      city: hotel.city,
      starCategory: hotel.starCategory,
      minPricePerNight: hotel.minPricePerNight,
      imageUrl: hotel.images[0] || '',
      description: hotel.description,
      amenities: [...hotel.amenities],
      tags: hotel.tags.join(', ')
    });
    setHotelModalOpen(true);
  };

  const handleSaveHotel = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      showToast('Please provide property name and address', 'error');
      return;
    }

    const hotelId = editingHotel ? editingHotel.id : `hotel-${Date.now()}`;
    const defaultRoom: Room = {
      id: `${hotelId}-suite-1`,
      hotelId,
      name: 'Deluxe Premier Suite',
      type: 'Premier King',
      pricePerNight: Number(formData.minPricePerNight),
      capacity: { adults: 2, children: 1 },
      bedType: 'Four-Poster King Bed',
      roomSizeSqFt: 520,
      view: 'Palace Gardens',
      images: [formData.imageUrl],
      amenities: ['Private Marble Bath', 'Wi-Fi', 'Butler on Call'],
      availableCount: 4
    };

    const updatedHotel: Hotel = {
      id: hotelId,
      name: formData.name,
      tagline: formData.tagline,
      neighborhood: formData.neighborhood,
      address: formData.address,
      city: formData.city,
      rating: editingHotel ? editingHotel.rating : 4.9,
      reviewCount: editingHotel ? editingHotel.reviewCount : 1,
      starCategory: Number(formData.starCategory),
      minPricePerNight: Number(formData.minPricePerNight),
      images: [
        formData.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
      ],
      description: formData.description,
      amenities: formData.amenities,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      rooms: editingHotel ? editingHotel.rooms : [defaultRoom],
      ownerId: currentUser?.uid || 'hotelier-demo-owner',
      contactPhone: '+91 11 4500 9000',
      contactEmail: currentUser?.email || 'owner@theimperialstay.com'
    };

    if (editingHotel) {
      await updateHotel(updatedHotel);
      showToast(`${formData.name} updated successfully`, 'success');
    } else {
      await createHotel(updatedHotel);
      showToast(`Added ${formData.name} to portfolio`, 'success');
    }

    setHotelModalOpen(false);
    loadHotelierData();
    onDataChanged?.();
  };

  const handleDeleteHotel = async (hotelId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      await deleteHotel(hotelId);
      showToast(`${name} deleted from catalog`, 'info');
      loadHotelierData();
      onDataChanged?.();
    }
  };

  const handleAddRoomToHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomModalHotel || !newRoomName) return;

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      hotelId: roomModalHotel.id,
      name: newRoomName,
      type: newRoomType,
      pricePerNight: Number(newRoomPrice),
      capacity: { adults: 2, children: 1 },
      bedType: newRoomBed,
      roomSizeSqFt: Number(newRoomSize),
      view: newRoomView,
      images: [newRoomImage || roomModalHotel.images[0]],
      amenities: ['Marble Bath', 'Personal Butler', 'Champagne Bar'],
      availableCount: 3
    };

    const updated = {
      ...roomModalHotel,
      rooms: [...roomModalHotel.rooms, newRoom]
    };

    await updateHotel(updated);
    setRoomModalHotel(updated);
    setNewRoomName('');
    showToast(`Added ${newRoomName} to ${roomModalHotel.name}`, 'success');
    loadHotelierData();
    onDataChanged?.();
  };

  const handleStatusChange = async (bookingId: string, newStatus: any) => {
    await updateBookingStatus(bookingId, newStatus);
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Reservation status updated to ${newStatus}`, 'success');
  };

  if (!hotelierPortalOpen) return null;

  // Calculate Metrics
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.totalAmount : sum, 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="modal-backdrop" onClick={() => setHotelierPortalOpen(false)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '1080px', minHeight: '650px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-primary)'
            }}>
              <Building2 size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', lineHeight: 1.1 }}>Hotelier Management Portal</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Property Management & Guest Reservations
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setHotelierPortalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* KPI Metrics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          padding: '24px 30px',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Portfolio Properties</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{hotels.length}</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Reservations</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)', marginTop: '4px' }}>{activeBookingsCount}</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Revenue</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#48bb78', marginTop: '4px' }}>{formatPrice(totalRevenue)}</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg. Guest Rating</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-primary)', marginTop: '4px' }}>4.9 ★</div>
          </div>
        </div>

        {/* Tab Controls & Add Hotel Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 30px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <button
              onClick={() => setActiveTab('hotels')}
              style={{
                padding: '16px 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'hotels' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                color: activeTab === 'hotels' ? 'var(--gold-light)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              Managed Properties ({hotels.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              style={{
                padding: '16px 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'bookings' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                color: activeTab === 'bookings' ? 'var(--gold-light)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              Guest Reservations ({bookings.length})
            </button>
          </div>

          {activeTab === 'hotels' && (
            <button className="btn-gold" onClick={openAddHotelModal} style={{ padding: '8px 16px', fontSize: '0.78rem' }}>
              <Plus size={14} />
              <span>Add Luxury Hotel</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '30px' }}>
          {/* TAB 1: HOTELS LIST */}
          {activeTab === 'hotels' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hotels.map(h => (
                <div 
                  key={h.id}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    padding: '18px 22px',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto',
                    gap: '20px',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={h.images[0]} 
                    alt={h.name} 
                    style={{ width: '120px', height: '90px', borderRadius: '6px', objectFit: 'cover' }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 600 }}>{h.starCategory}★ Luxury</span>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.neighborhood}</span>
                    </div>

                    <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>{h.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 8px 0' }}>{h.tagline}</p>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--gold-light)' }}>Starting {formatPrice(h.minPricePerNight)}/night</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{h.rooms?.length || 0} Suite Categories</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn-outline-gold"
                      onClick={() => setRoomModalHotel(h)}
                      style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                      title="Manage Rooms"
                    >
                      <Bed size={14} />
                      <span>Rooms</span>
                    </button>

                    <button
                      className="btn-outline-gold"
                      onClick={() => openEditHotelModal(h)}
                      style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                      title="Edit Hotel"
                    >
                      <Edit3 size={14} />
                    </button>

                    <button
                      onClick={() => handleDeleteHotel(h.id, h.name)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      title="Delete Hotel"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: RESERVATIONS LIST */}
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Calendar size={36} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>No Guest Bookings Yet</h3>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '12px 14px' }}>Ref / Date</th>
                        <th style={{ padding: '12px 14px' }}>Hotel & Suite</th>
                        <th style={{ padding: '12px 14px' }}>Guest Details</th>
                        <th style={{ padding: '12px 14px' }}>Stay Duration</th>
                        <th style={{ padding: '12px 14px' }}>Amount</th>
                        <th style={{ padding: '12px 14px' }}>Status</th>
                        <th style={{ padding: '12px 14px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: '#fff' }}>
                          <td style={{ padding: '14px' }}>
                            <div style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{b.confirmationCode}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.createdAt.split('T')[0]}</div>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ fontWeight: 600 }}>{b.hotelName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{b.roomName}</div>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ fontWeight: 600 }}>{b.guestName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.guestEmail}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.guestPhone}</div>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div>{b.checkInDate} to {b.checkOutDate}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.nights} Nights ({b.adults} Guests)</div>
                          </td>
                          <td style={{ padding: '14px', fontWeight: 700, color: 'var(--gold-light)' }}>
                            {formatPrice(b.totalAmount)}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              background: b.status === 'confirmed' ? 'rgba(72,187,120,0.15)' : b.status === 'checked-in' ? 'rgba(66,153,225,0.15)' : 'rgba(239,68,68,0.15)',
                              color: b.status === 'confirmed' ? '#48bb78' : b.status === 'checked-in' ? '#4299e1' : '#ef4444'
                            }}>
                              {b.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              style={{
                                background: '#0a0b0e',
                                border: '1px solid var(--border-gold)',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="checked-in">Checked-In</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT HOTEL SUB-MODAL */}
      {hotelModalOpen && (
        <div className="modal-backdrop" style={{ zIndex: 2600 }} onClick={() => setHotelModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>
                {editingHotel ? 'Edit Luxury Hotel' : 'List New Luxury Property'}
              </h3>
              <button className="modal-close-btn" onClick={() => setHotelModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveHotel} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Hotel Name</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  placeholder="e.g. The Grand Haveli New Delhi"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. A Regal Sanctuary in Lutyens' Delhi"
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Neighborhood / Area</label>
                  <select 
                    className="form-select"
                    value={formData.neighborhood}
                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                  >
                    <option value="Janpath, Connaught Place">Janpath, Connaught Place</option>
                    <option value="Chanakyapuri">Chanakyapuri (Diplomatic Enclave)</option>
                    <option value="Lutyens’ Delhi">Lutyens’ Delhi</option>
                    <option value="Aerocity, IGI Airport">Aerocity, IGI Airport</option>
                    <option value="Lodhi Road">Lodhi Road</option>
                    <option value="Civil Lines">Civil Lines</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Base Price / Night (INR)</label>
                  <input 
                    type="number" 
                    required
                    min={5000}
                    step={1000}
                    className="form-input" 
                    value={formData.minPricePerNight}
                    onChange={e => setFormData({ ...formData, minPricePerNight: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  placeholder="Street, District, New Delhi PIN"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Image URL</label>
                <input 
                  type="url" 
                  required
                  className="form-input" 
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Editorial Description</label>
                <textarea 
                  rows={3} 
                  required
                  className="form-textarea" 
                  placeholder="Describe the atmosphere, architecture, dining, and luxury suites..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Signature Amenities</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {ALL_AMENITIES.map(amenity => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#fff', cursor: 'pointer' }}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={e => {
                            const next = e.target.checked
                              ? [...formData.amenities, amenity]
                              : formData.amenities.filter(a => a !== amenity);
                            setFormData({ ...formData, amenities: next });
                          }}
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '12px' }}>
                <span>Save & Publish Hotel</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE ROOMS SUB-MODAL */}
      {roomModalHotel && (
        <div className="modal-backdrop" style={{ zIndex: 2600 }} onClick={() => setRoomModalHotel(null)}>
          <div className="modal-card" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{roomModalHotel.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>Manage Suite Categories</span>
              </div>
              <button className="modal-close-btn" onClick={() => setRoomModalHotel(null)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Existing Rooms */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '10px' }}>Current Inventory</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {roomModalHotel.rooms.map(r => (
                    <div key={r.id} style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-subtle)' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{r.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.roomSizeSqFt} sq ft • {r.bedType} • {r.view}</div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--gold-light)' }}>
                        {formatPrice(r.pricePerNight)}/night
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Room Form */}
              <form onSubmit={handleAddRoomToHotel} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', marginBottom: '14px' }}>Add New Suite Category</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Suite Name</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Royal Pavilion Suite"
                      value={newRoomName}
                      onChange={e => setNewRoomName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rate / Night (INR)</label>
                    <input 
                      type="number" 
                      required 
                      className="form-input" 
                      value={newRoomPrice}
                      onChange={e => setNewRoomPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Size (Sq Ft)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newRoomSize}
                      onChange={e => setNewRoomSize(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bed Type</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newRoomBed}
                      onChange={e => setNewRoomBed(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">View</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newRoomView}
                      onChange={e => setNewRoomView(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Suite Photo URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://images.unsplash.com/..."
                    value={newRoomImage}
                    onChange={e => setNewRoomImage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '8px' }}>
                  <Plus size={14} />
                  <span>Add Suite Category</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
