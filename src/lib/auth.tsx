'use client';

import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { handleRedirectResult } from "./auth.ts";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // First, check for redirect result
        handleRedirectResult().then((redirectUser) => {
            if (redirectUser) {
                setUser(redirectUser);
            }
            // Then, set up the normal auth state listener
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            return () => unsubscribe();
        }).catch(() => {
            // Ensure loading is always set to false even if redirect check fails
             setLoading(false);
        });
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
