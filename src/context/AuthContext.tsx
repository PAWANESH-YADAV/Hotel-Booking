import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getLocalWishlist, toggleLocalWishlist } from '../services/storageService';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  favorites: string[];
  toggleFavorite: (hotelId: string) => void;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string, role?: UserRole) => Promise<void>;
  signInAsDemoGuest: () => void;
  signInAsDemoHotelier: () => void;
  signOut: () => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
}

const AUTH_USER_KEY = 'the_imperial_stay_current_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_GUEST: UserProfile = {
  uid: 'demo-guest-101',
  displayName: 'Lord Alistair Sterling',
  email: 'guest@theimperialstay.com',
  role: 'guest',
  phone: '+91 98110 54321',
  loyaltyTier: 'Imperial Platinum',
  favorites: ['the-imperial-janpath', 'the-leela-palace-chanakyapuri'],
  createdAt: '2026-01-15'
};

const DEMO_HOTELIER: UserProfile = {
  uid: 'hotelier-demo-owner',
  displayName: 'Vikramaditya Oberoi-Singhania',
  email: 'hotelier@theimperialstay.com',
  role: 'hotelier',
  phone: '+91 11 4000 8888',
  loyaltyTier: 'Imperial Platinum',
  favorites: [],
  createdAt: '2025-10-10'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      return saved ? JSON.parse(saved) : DEMO_GUEST; // Default to demo guest for immediate instant play
    } catch {
      return DEMO_GUEST;
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [activeRole, setActiveRole] = useState<UserRole>(currentUser?.role || 'guest');
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (currentUser) {
      return getLocalWishlist(currentUser.uid);
    }
    return ['the-imperial-janpath', 'the-leela-palace-chanakyapuri'];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
      setActiveRole(currentUser.role);
      setFavorites(getLocalWishlist(currentUser.uid));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
      setFavorites([]);
    }
  }, [currentUser]);

  // Listen to real Firebase Auth changes if configured
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Valued Guest',
          role: 'guest',
          loyaltyTier: 'Gold',
          favorites: getLocalWishlist(user.uid),
          createdAt: new Date().toISOString()
        };
        setCurrentUser(profile);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (hotelId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    const updated = toggleLocalWishlist(currentUser.uid, hotelId);
    setFavorites(updated);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        // Fallback local auth simulation
        const profile: UserProfile = {
          uid: `user-${Date.now()}`,
          email,
          displayName: email.split('@')[0].replace('.', ' '),
          role: email.toLowerCase().includes('hotel') ? 'hotelier' : 'guest',
          loyaltyTier: 'Gold',
          favorites: [],
          createdAt: new Date().toISOString()
        };
        setCurrentUser(profile);
      }
      setAuthModalOpen(false);
    } catch (err: any) {
      throw new Error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (name: string, email: string, pass: string, role: UserRole = 'guest') => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
      const profile: UserProfile = {
        uid: `user-${Date.now()}`,
        email,
        displayName: name,
        role,
        loyaltyTier: 'Silver',
        favorites: [],
        createdAt: new Date().toISOString()
      };
      setCurrentUser(profile);
      setAuthModalOpen(false);
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signInAsDemoGuest = () => {
    setCurrentUser(DEMO_GUEST);
    setActiveRole('guest');
    setAuthModalOpen(false);
  };

  const signInAsDemoHotelier = () => {
    setCurrentUser(DEMO_HOTELIER);
    setActiveRole('hotelier');
    setAuthModalOpen(false);
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    setCurrentUser(null);
    setActiveRole('guest');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        activeRole,
        setActiveRole,
        favorites,
        toggleFavorite,
        signInWithEmail,
        signUpWithEmail,
        signInAsDemoGuest,
        signInAsDemoHotelier,
        signOut,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
