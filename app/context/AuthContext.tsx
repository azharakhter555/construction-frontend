// src/contexts/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { AuthUser } from '@/services/auth/auth.types';
import { httpClient } from '@/services/http/client';

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean; // ✅ added
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ start loading

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        setToken(storedToken);
        setUser(parsedUser);
        httpClient.setAuthToken(storedToken); // attach token to HTTP client
      } catch {
        // Invalid JSON – clear storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    httpClient.clearAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};