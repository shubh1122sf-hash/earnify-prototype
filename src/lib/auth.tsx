
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                 // If onAuthStateChanged says no user, check for redirect result.
                 // This handles the case where the page loads after a redirect.
                getRedirectResult(auth)
                    .then((result) => {
                        if (result?.user) {
                            setUser(result.user);
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting redirect result:", error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setUser(currentUser);
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
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
