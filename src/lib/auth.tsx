
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
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                if (pathname === '/login') {
                    router.push('/');
                }
            } else {
                 setUser(null);
            }
            setLoading(false);
        });

        handleRedirectResult().then((redirectUser) => {
            if (redirectUser) {
                if (!user) {
                    setUser(redirectUser);
                }
                if (pathname === '/login') {
                    router.push('/');
                }
            }
             setLoading(false);
        }).catch(() => {
            setLoading(false);
        })

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [router, pathname, user]);

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
