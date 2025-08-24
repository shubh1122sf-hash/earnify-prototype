
'use client';

import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { handleRedirectResult } from "./auth.ts";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const processAuth = async () => {
            // First, try to get user from redirect result
            const redirectUser = await handleRedirectResult();
            if (redirectUser) {
                setUser(redirectUser);
            }
            
            // Then, set up the state listener for all subsequent auth changes.
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });

            // If there was no redirect user, the initial state might still be loading
            // onAuthStateChanged will handle setting loading to false.
            if (!auth.currentUser && !redirectUser) {
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

    useEffect(() => {
        // This effect handles redirection based on auth state.
        if (!loading) {
            const isAuthPage = pathname === '/login';
            if (user && isAuthPage) {
                // If user is logged in and on the login page, redirect to home
                router.push('/');
            } else if (!user && !isAuthPage) {
                // If user is not logged in and not on the login page, redirect to login
                router.push('/login');
            }
        }
    }, [user, loading, pathname, router]);

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
