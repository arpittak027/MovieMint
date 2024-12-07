import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  email: string;
  name: string;
  phone: string;
  bookingHistory: BookingDetails[];
  wishlist: string[];
}

interface BookingDetails {
  bookingId: string;
  movieTitle: string;
  showtime: string;
  selectedSeats: any[];
  totalAmount: number;
  paymentInfo: any;
  bookingDate: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addBooking: (booking: BookingDetails) => void;
  addToWishlist: (movieId: string) => void;
  removeFromWishlist: (movieId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedAuth === 'true' && savedProfile) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveToLocalStorage = (profile: UserProfile | null) => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('isAuthenticated');
    }
  };

  const login = async (email: string, password: string) => {
    // In a real app, you'd validate against a backend
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials or user not found. Please sign up first.');
    }

    const profile: UserProfile = {
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      bookingHistory: user.bookingHistory || [],
      wishlist: user.wishlist || []
    };

    setIsAuthenticated(true);
    setUserProfile(profile);
    saveToLocalStorage(profile);
    navigate('/');
  };

  const signup = async (email: string, password: string, name: string) => {
    // In a real app, you'd call a backend API
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUsers.some((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      email,
      password,
      name,
      phone: '',
      bookingHistory: [],
      wishlist: []
    };

    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    // Auto login after signup
    await login(email, password);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    saveToLocalStorage(null);
    navigate('/');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile, ...updates };
    setUserProfile(updatedProfile);
    saveToLocalStorage(updatedProfile);

    // Update in users storage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = savedUsers.map((user: any) => {
      if (user.email === updatedProfile.email) {
        return { ...user, ...updates };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addBooking = (booking: BookingDetails) => {
    if (!userProfile) return;

    const updatedProfile = {
      ...userProfile,
      bookingHistory: [booking, ...userProfile.bookingHistory]
    };
    setUserProfile(updatedProfile);
    saveToLocalStorage(updatedProfile);

    // Update in users storage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = savedUsers.map((user: any) => {
      if (user.email === userProfile.email) {
        return {
          ...user,
          bookingHistory: [booking, ...(user.bookingHistory || [])]
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addToWishlist = (movieId: string) => {
    if (!userProfile) return;

    const updatedProfile = {
      ...userProfile,
      wishlist: [...userProfile.wishlist, movieId]
    };
    setUserProfile(updatedProfile);
    saveToLocalStorage(updatedProfile);

    // Update in users storage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = savedUsers.map((user: any) => {
      if (user.email === userProfile.email) {
        return {
          ...user,
          wishlist: [...user.wishlist, movieId]
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const removeFromWishlist = (movieId: string) => {
    if (!userProfile) return;

    const updatedProfile = {
      ...userProfile,
      wishlist: userProfile.wishlist.filter((id: string) => id !== movieId)
    };
    setUserProfile(updatedProfile);
    saveToLocalStorage(updatedProfile);

    // Update in users storage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = savedUsers.map((user: any) => {
      if (user.email === userProfile.email) {
        return {
          ...user,
          wishlist: user.wishlist.filter((id: string) => id !== movieId)
        };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userProfile,
      login,
      signup,
      logout,
      updateProfile,
      addBooking,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
