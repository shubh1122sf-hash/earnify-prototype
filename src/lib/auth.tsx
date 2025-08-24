
'use client';

import { onAuthStateChanged, type User, getRedirectResult } from "firebase/auth";
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
        const processAuth = async () => {
            setLoading(true);
            try {
                // Check if we are returning from a redirect
                const result = await getRedirectResult(auth);
                if (result) {
                    // This means the user has just signed in.
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Error handling redirect result:", error);
            } finally {
                // Set up the regular auth state listener
                 const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setLoading(false);
                });
                return unsubscribe;
            }
        };

        const unsubscribePromise = processAuth();

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
