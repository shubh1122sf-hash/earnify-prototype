
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useAuthListener(): AuthState {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs once on initial mount to handle the redirect result.
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        // If a result is returned, it means the user has just signed in via redirect.
        if (result) {
          setUser(result.user);
        }
      } catch (error) {
        console.error("Error processing redirect result:", error);
      }
    };

    handleRedirect();

    // onAuthStateChanged sets up a listener for any subsequent auth state changes.
    // It also runs once when it's first attached, giving the current auth state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
