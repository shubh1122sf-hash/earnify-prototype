
'use client';

import { onAuthStateChanged, type User, getRedirectResult, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This function now correctly handles all auth states.
        const checkAuth = async () => {
            try {
                // Set persistence at the start.
                await setPersistence(auth, browserLocalPersistence);
                
                // Check for the result of a redirect first.
                const result = await getRedirectResult(auth);
                if (result) {
                    // User signed in via redirect.
                    setUser(result.user);
                }
                
                // Listen for subsequent auth state changes.
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setLoading(false);
                });

                // If no redirect result and no user from onAuthStateChanged, stop loading.
                if (!result) {
                    setLoading(false);
                }

                return unsubscribe;
            } catch (error) {
                console.error("Auth provider error:", error);
                setLoading(false);
            }
        };

        const unsubscribePromise = checkAuth();

        // Cleanup subscription on unmount
        return () => {
            unsubscribePromise.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
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
