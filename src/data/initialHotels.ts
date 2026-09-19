import { Hotel } from '../types';

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'the-imperial-janpath',
    name: 'The Imperial New Delhi',
    tagline: 'An Iconic 1931 Heritage Landmark on Janpath',
    neighborhood: 'Janpath, Connaught Place',
    address: 'Janpath Lane, Connaught Place, New Delhi 110001',
    city: 'New Delhi',
    rating: 4.9,
    reviewCount: 1420,
    starCategory: 5,
    minPricePerNight: 24500,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Chosen as Asia’s leading heritage hotel, The Imperial weaves British colonial elegance with Art Deco panache. Stroll through marble colonnades flanked by museum-quality antiquities, relax beside the palm-fringed swimming pool, and dine at world-renowned destinations including 1911 and San Gimignano.',
    amenities: [
      'Swimming Pool',
      'Luxury Spa & Salon',
      '24/7 Royal Butler Service',
      'Fine Dining (5 Restaurants)',
      'High-Speed Wi-Fi',
      'Airport Limousine Transfer',
      'Heritage Art Collection',
      'Fitness & Yoga Pavilion'
    ],
    featured: true,
    tags: ['Heritage Legend', 'Art Deco', 'Michelin-Class Dining', 'City Center'],
    contactPhone: '+91 11 2334 1234',
    contactEmail: 'concierge@theimperialstay.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'imp-heritage-grand',
        hotelId: 'the-imperial-janpath',
        name: 'Heritage Grand Room',
        type: 'Heritage King',
        pricePerNight: 24500,
        capacity: { adults: 2, children: 1 },
        bedType: 'Four-Poster King Bed',
        roomSizeSqFt: 550,
        view: 'Imperial Palm Courtyard',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Italian Marble Bath', 'Pari-Gold Toiletries', 'Nespresso Bar', 'Bose Sound System'],
        availableCount: 6
      },
      {
        id: 'imp-viceroy-suite',
        hotelId: 'the-imperial-janpath',
        name: 'The Royal Viceroy Suite',
        type: 'Presidential Suite',
        pricePerNight: 58000,
        capacity: { adults: 3, children: 2 },
        bedType: 'Imperial Master King',
        roomSizeSqFt: 1200,
        view: 'Private Lutyens Gardens & Fountain',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Private Living Room', 'Jacuzzi with Garden View', 'Dedicated Chauffeur', 'Complimentary Champagne'],
        availableCount: 2
      }
    ]
  },
  {
    id: 'the-leela-palace-chanakyapuri',
    name: 'The Leela Palace New Delhi',
    tagline: 'Modern Royal Splendor in Diplomatic Enclave',
    neighborhood: 'Chanakyapuri',
    address: 'Diplomatic Enclave, Chanakyapuri, New Delhi 110023',
    city: 'New Delhi',
    rating: 4.95,
    reviewCount: 1890,
    starCategory: 5,
    minPricePerNight: 32000,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Majestically set in the heart of Chanakyapuri, The Leela Palace is an architectural homage to Edwin Lutyens with gilded domes, hand-woven carpets, and centuries of Indian artistry. Experience the temperature-controlled rooftop infinity pool overlooking Delhi’s historic skyline and indulge in culinary triumphs at MEGU and Le Cirque.',
    amenities: [
      'Rooftop Infinity Pool',
      'ESPA World-Class Spa',
      'Dedicated Palace Butler',
      'Le Cirque & MEGU Dining',
      'BMW 7-Series Chauffeur',
      'High-Speed Wi-Fi',
      'Palatial Ballroom'
    ],
    featured: true,
    tags: ['Modern Palace', 'Rooftop Infinity Pool', 'Diplomatic Enclave', 'Luxury Spa'],
    contactPhone: '+91 11 3933 1234',
    contactEmail: 'concierge.delhi@theleela.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'leela-grand-deluxe',
        hotelId: 'the-leela-palace-chanakyapuri',
        name: 'Grand Deluxe Palace Room',
        type: 'Palace Suite',
        pricePerNight: 32000,
        capacity: { adults: 2, children: 1 },
        bedType: 'Super King Featherbed',
        roomSizeSqFt: 620,
        view: 'Diplomatic Enclave Greens',
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Walk-in Dressing Room', 'Ad Notam Mirror TV', 'Customized Pillow Menu', 'Rain Shower & Tub'],
        availableCount: 5
      },
      {
        id: 'leela-maharaja-suite',
        hotelId: 'the-leela-palace-chanakyapuri',
        name: 'The Maharaja Presidential Suite',
        type: 'Presidential Suite',
        pricePerNight: 95000,
        capacity: { adults: 4, children: 2 },
        bedType: 'Palatial King Master Bed',
        roomSizeSqFt: 2200,
        view: 'Panoramic Cityscape & Rashtrapati Bhavan',
        images: [
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Private Gymnasium', 'Bulletproof Glass', 'Private Butler Pantry', 'Gold-plated Faucets'],
        availableCount: 1
      }
    ]
  },
  {
    id: 'the-oberoi-delhi',
    name: 'The Oberoi, New Delhi',
    tagline: 'Clean Air Luxury Overlooking Delhi Golf Course',
    neighborhood: 'Dr. Zakir Hussain Marg',
    address: 'Dr. Zakir Hussain Marg, New Delhi 110003',
    city: 'New Delhi',
    rating: 4.92,
    reviewCount: 2100,
    starCategory: 5,
    minPricePerNight: 29000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Positioned on the edge of the historic Delhi Golf Course and UNESCO World Heritage Humayun’s Tomb, The Oberoi is an icon of contemporary luxury. State-of-the-art clean air filtration guarantees the freshest indoor air in the capital. Relish dining at Baoshuan and Cirrus 9, Delhi’s preeminent rooftop lounge.',
    amenities: [
      'State-of-the-art Clean Air Tech',
      'Heated Indoor & Outdoor Pools',
      '24/7 Butler Service',
      'Rooftop Lounge Cirrus 9',
      'Spa by Oberoi',
      'Mercedes-Benz Fleet'
    ],
    featured: true,
    tags: ['Clean Air Oasis', 'Golf Course View', 'Rooftop Bar', 'Contemporary Luxury'],
    contactPhone: '+91 11 2436 3030',
    contactEmail: 'delhi@oberoihotels.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'oberoi-premier-golf',
        hotelId: 'the-oberoi-delhi',
        name: 'Premier Golf View Room',
        type: 'Luxury King',
        pricePerNight: 29000,
        capacity: { adults: 2, children: 1 },
        bedType: 'Signature Oberoi King',
        roomSizeSqFt: 600,
        view: 'Delhi Golf Course & Humayun Tomb',
        images: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Motorised Blackout Blinds', 'High Definition Air Purifier', 'Kohler Deep Soaking Tub'],
        availableCount: 8
      }
    ]
  },
  {
    id: 'taj-mahal-hotel-mansingh',
    name: 'Taj Mahal Hotel, New Delhi',
    tagline: 'Timeless Grandeur at Number One Mansingh Road',
    neighborhood: 'Lutyens’ Delhi',
    address: 'Number One Mansingh Road, Lutyens’ Delhi, New Delhi 110011',
    city: 'New Delhi',
    rating: 4.88,
    reviewCount: 1650,
    starCategory: 5,
    minPricePerNight: 26000,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'An indelible symbol of Indian luxury hospitality, the Taj Mahal Hotel on Mansingh Road features dome-adorned Mughal architecture, warm hospitality, and the legendary 24-hour restaurant Machan and House of Ming.',
    amenities: [
      'J Wellness Circle Spa',
      'Outdoor Swimming Pool',
      'Legendary Machan & Varq Dining',
      'Concierge Butler Service',
      'Club Lounge Access'
    ],
    featured: false,
    tags: ['Lutyens Address', 'Mughal Architecture', 'Iconic Machan', 'Taj Hospitality'],
    contactPhone: '+91 11 6656 6162',
    contactEmail: 'mahal.delhi@tajhotels.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'taj-deluxe-mansingh',
        hotelId: 'taj-mahal-hotel-mansingh',
        name: 'Taj Club Room',
        type: 'Club King',
        pricePerNight: 26000,
        capacity: { adults: 2, children: 1 },
        bedType: 'King Posturepedic Bed',
        roomSizeSqFt: 520,
        view: 'Lutyens Mansingh Greens',
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Club Lounge High Tea', 'Airport Limousine Pickup', 'Forest Essentials Bath Amenities'],
        availableCount: 4
      }
    ]
  },
  {
    id: 'itc-maurya-diplomatic-enclave',
    name: 'ITC Maurya, A Luxury Collection Hotel',
    tagline: 'Culinary Citadel & The Home of Legendary Bukhara',
    neighborhood: 'Diplomatic Enclave',
    address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi 110021',
    city: 'New Delhi',
    rating: 4.87,
    reviewCount: 2340,
    starCategory: 5,
    minPricePerNight: 22000,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Home to world leaders and dignitaries, ITC Maurya celebrates the architectural zenith of the Mauryan dynasty. It is universally celebrated for Bukhara, consistently ranked among the world’s top restaurants, and the holistic Kaya Kalp Ayurvedic Spa.',
    amenities: [
      'Bukhara & Dum Pukht Dining',
      'Kaya Kalp Royal Spa',
      'Solar-Powered LEED Platinum Green',
      'Outdoor Solar Heated Pool',
      'Helipad & Security Fleet'
    ],
    featured: true,
    tags: ['World-Famous Bukhara', 'LEED Platinum', 'Diplomatic Enclave', 'Ayurveda Spa'],
    contactPhone: '+91 11 2611 2233',
    contactEmail: 'reservations.itcmaurya@itchotels.in',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'itc-executive-club',
        hotelId: 'itc-maurya-diplomatic-enclave',
        name: 'The Towers Executive Room',
        type: 'Executive King',
        pricePerNight: 22000,
        capacity: { adults: 2, children: 1 },
        bedType: 'ITC Signature Sleep Bed',
        roomSizeSqFt: 480,
        view: 'Delhi Ridge Reserve Forests',
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Towers Lounge Access', 'Butler On Call', 'Deep Soaking Marble Tub'],
        availableCount: 7
      }
    ]
  },
  {
    id: 'the-lodhi-delhi',
    name: 'The Lodhi New Delhi',
    tagline: 'Private Plunge Pools & Contemporary Bespoke Luxury',
    neighborhood: 'Lodhi Road',
    address: 'Lodhi Road, CGO Complex, Pragati Vihar, New Delhi 110003',
    city: 'New Delhi',
    rating: 4.91,
    reviewCount: 980,
    starCategory: 5,
    minPricePerNight: 35000,
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'An urban sanctuary of serenity and modern minimalist grandeur. Nearly all suites at The Lodhi boast their own private heated plunge pool on expansive stone balconies overlooking leafy Lodhi Gardens.',
    amenities: [
      'Private Suite Plunge Pools',
      'Olympic 50m Lap Pool',
      'The Lodhi Spa & Turkish Hammam',
      'Tennis & Squash Courts',
      'Private Cigar & Wine Vault'
    ],
    featured: false,
    tags: ['Private Plunge Pool', 'Minimalist Architecture', 'Hammam Spa', 'Lodhi Gardens'],
    contactPhone: '+91 11 4363 3333',
    contactEmail: 'experience@thelodhi.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'lodhi-plunge-suite',
        hotelId: 'the-lodhi-delhi',
        name: 'Lodhi Deluxe Plunge Pool Suite',
        type: 'Pool Suite',
        pricePerNight: 35000,
        capacity: { adults: 2, children: 1 },
        bedType: 'Custom Hand-Tufted King',
        roomSizeSqFt: 1350,
        view: 'Private Terrace & Lodhi Estate',
        images: [
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Private Heated Plunge Pool', 'Stone Balcony Daybed', 'Custom Espresso Machine'],
        availableCount: 3
      }
    ]
  },
  {
    id: 'roseate-house-aerocity',
    name: 'Roseate House New Delhi',
    tagline: 'Ultra-Chic Hospitality at Delhi Aerocity Hub',
    neighborhood: 'Aerocity, IGI Airport',
    address: 'Asset 10, Northern Access Rd, Aerocity, Hospitality District, New Delhi 110037',
    city: 'New Delhi',
    rating: 4.83,
    reviewCount: 1720,
    starCategory: 5,
    minPricePerNight: 18500,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A progressive luxury hotel in Aerocity, designed for the international connoisseur. Featuring a 71-seater cinema hall ‘Upstage’, glass-encased rooftop pool, and Aheli Spa.',
    amenities: [
      'Rooftop Infinity Edge Pool',
      'Private Cinema Upstage',
      'Aheli Spa & Wellness Sanctuary',
      'Chhat Bar & Lounge',
      'Direct Airport Express Access'
    ],
    featured: false,
    tags: ['Aerocity Hub', 'Airport Proximity', 'Rooftop Pool', 'Boutique Chic'],
    contactPhone: '+91 11 7155 8800',
    contactEmail: 'info.rhnd@roseatehotels.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'roseate-deluxe-room',
        hotelId: 'roseate-house-aerocity',
        name: 'Deluxe Studio Suite',
        type: 'Studio Suite',
        pricePerNight: 18500,
        capacity: { adults: 2, children: 1 },
        bedType: 'Ergonomic King Bed',
        roomSizeSqFt: 460,
        view: 'Aerocity Plaza Promenade',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['Touchscreen Room Automation', 'Freestanding Bathtub', 'High Speed Fibre Wi-Fi'],
        availableCount: 10
      }
    ]
  },
  {
    id: 'maidens-hotel-civil-lines',
    name: 'Maidens Hotel, Delhi',
    tagline: '1903 Colonial Tranquility in North Delhi',
    neighborhood: 'Civil Lines',
    address: '7 Sham Nath Marg, Civil Lines, New Delhi 110054',
    city: 'New Delhi',
    rating: 4.85,
    reviewCount: 890,
    starCategory: 4,
    minPricePerNight: 15500,
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'One of Delhi’s earliest luxury hotels, built in 1903. Set amid eight acres of emerald gardens with peacocks and colonial porticos, offering an escape to vintage peace.',
    amenities: [
      'Sprawling 8-Acre Gardens',
      'Garden Pavilion Pool',
      'The Curzon Room Dining',
      'Heritage Peacock Walk',
      'Free Valet Parking'
    ],
    featured: false,
    tags: ['Colonial 1903', 'Historic Gardens', 'Peaceful Escape', 'Old Delhi Heritage'],
    contactPhone: '+91 11 2397 5464',
    contactEmail: 'maidens@maidenshotel.com',
    ownerId: 'hotelier-demo-owner',
    rooms: [
      {
        id: 'maidens-heritage-suite',
        hotelId: 'maidens-hotel-civil-lines',
        name: 'Colonial Heritage Suite',
        type: 'Heritage King',
        pricePerNight: 15500,
        capacity: { adults: 2, children: 1 },
        bedType: 'Vintage Teak Wood King',
        roomSizeSqFt: 500,
        view: 'Lush Garden Courtyard',
        images: [
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: ['High Ceilings & Archways', 'Vintage Clawfoot Tub', 'Garden Breakfast Included'],
        availableCount: 5
      }
    ]
  }
];
