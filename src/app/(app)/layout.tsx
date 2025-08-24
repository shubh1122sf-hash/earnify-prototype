
'use client';

import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import Link from "next/link";
import { useSimulation } from "@/hooks/use-simulation";
import { MentorContext } from "@/hooks/use-mentor";
import { usePathname } from 'next/navigation';

const MENTOR_KEY = 'earnify-mentor';

const AppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-primary-foreground">
        <path d="M12 2L1 9l4 2.5V17h14v-5.5L23 9l-3-2.1V4h-4v2.9L12 2zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
)

function MentorProvider({ children }: { children: ReactNode }) {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  const getMentorFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(MENTOR_KEY);
    } catch (error) {
        console.error("Could not access localStorage", error);
        return null;
    }
  }, []);

  useEffect(() => {
    setSelectedMentor(getMentorFromStorage());
    setIsInitialized(true);
  }, [getMentorFromStorage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === MENTOR_KEY) {
        setSelectedMentor(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
        setSelectedMentor(getMentorFromStorage());
    }
  }, [pathname, isInitialized, getMentorFromStorage]);

  const selectMentor = useCallback((mentorId: string) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(MENTOR_KEY, mentorId);
        setSelectedMentor(mentorId);
        // This event dispatch is crucial for cross-component updates
        window.dispatchEvent(new StorageEvent('storage', { key: MENTOR_KEY, newValue: mentorId, url: window.location.href }));
    } catch (error) {
        console.error("Could not set item in localStorage", error);
    }
  }, []);

  return (
    <MentorContext.Provider value={{ selectedMentor, selectMentor }}>
      {children}
    </MentorContext.Provider>
  );
}


function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { simulation } = useSimulation();

  return (
    <div className="container mx-auto max-w-7xl p-4 font-sans flex flex-col min-h-screen">
      <header className="bg-card rounded-xl shadow-sm p-4 mb-6 border">
          <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                   <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                        <AppIcon />
                   </div>
                  <div>
                      <h1 className="text-2xl font-bold text-foreground">Earnify Simulator</h1>
                      <p className="text-muted-foreground">Virtual trading with real market dynamics</p>
                  </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <span>${simulation.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Available Balance</div>
                </div>
                <UserNav />
              </div>
          </div>
      </header>

      <main className="bg-card rounded-xl shadow-sm overflow-hidden border flex-grow flex flex-col">
        <div className="flex border-b">
          <Nav />
        </div>
        <div className="p-6 flex-grow">
          {children}
        </div>
      </main>

      <footer className="text-center text-sm text-muted-foreground mt-8">
        <p>This is a simulation. All data is virtual.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="/account" className="hover:text-primary">Account</Link>
            <Link href="/login" className="hover:text-primary">Log Out</Link>
        </div>
      </footer>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MentorProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </MentorProvider>
  );
}
