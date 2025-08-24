
'use client';

import { 
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { handleRedirectResult } from "./auth.ts";
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const processAuth = async () => {
            // First, try to get the result from a redirect
            try {
                const redirectUser = await handleRedirectResult();
                if (redirectUser) {
                    setUser(redirectUser);
                }
            } catch (error) {
                console.error("Error processing redirect result in AuthProvider", error);
            }

            // Then, set up the state listener for subsequent changes
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            
            // If there was no redirect user, the initial state might still be loading
            // onAuthStateChanged will handle setting loading to false.
            // If we still don't have a user from the redirect, we check the current auth state
            if (!auth.currentUser) {
                setLoading(false);
            }

            return unsubscribe;
        };

        let unsubscribe: (() => void) | undefined;
        processAuth().then(unsub => unsubscribe = unsub);

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
