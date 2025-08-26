
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useAuthListener(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // This checks if the page is loading after a redirect from Google.
        const result = await getRedirectResult(auth);
        if (result) {
          // User signed in.
          setUser(result.user);
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
      }
    };

    // Check for redirect result on initial load.
    handleRedirect();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
