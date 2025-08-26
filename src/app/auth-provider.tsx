'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define a user type that matches the structure we'll get from our API
interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a new, simplified provider. Its only job is to fetch the current user
// from our own backend API, which will check for the presence of a session cookie.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserStatus() {
      try {
        const response = await fetch('/api/auth/me'); // A new endpoint to get the current user
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user status', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
