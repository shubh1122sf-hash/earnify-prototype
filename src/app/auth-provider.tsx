
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to handle the redirect result
    // and set up the permanent auth state listener.
    const handleAuth = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User has just signed in via redirect.
          setUser(result.user);
        }
        // For subsequent loads, result will be null.
        // We let onAuthStateChanged handle the user state.
      } catch (error) {
        console.error("Error processing redirect result:", error);
      } finally {
        // After processing the redirect (or not), set up the listener.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        
        // Return the cleanup function for the listener.
        return () => unsubscribe();
      }
    };
    
    handleAuth();
    
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
