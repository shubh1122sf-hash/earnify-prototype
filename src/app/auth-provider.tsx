
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
    // This effect handles both the initial redirect result and subsequent auth changes.
    const processAuth = async () => {
      setLoading(true);
      try {
        // Check for redirect result first. This will be null on normal page loads
        // and after popup-based sign-ins. It is only populated after a redirect.
        const result = await getRedirectResult(auth);
        if (result) {
          // User has just signed in via redirect.
          // onAuthStateChanged will also fire, but this gives immediate feedback.
          setUser(result.user);
        }
      } catch (error) {
        console.error("Error processing redirect result:", error);
      }
      
      // Set up the permanent listener for auth state changes.
      // This is the primary mechanism for tracking the user's state.
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });

      // Cleanup the listener on component unmount
      return () => unsubscribe();
    };

    processAuth();
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
