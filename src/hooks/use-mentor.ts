
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const MENTOR_KEY = 'earnify-mentor';

interface MentorContextType {
  selectedMentor: string | null;
  selectMentor: (mentorId: string) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  const getMentorFromStorage = () => {
    try {
        return localStorage.getItem(MENTOR_KEY);
    } catch (error) {
        console.error("Could not access localStorage", error);
        return null;
    }
  };

  useEffect(() => {
    setSelectedMentor(getMentorFromStorage());
    setIsInitialized(true);
  }, []);

  // This effect listens for changes in other tabs
  useEffect(() => {
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

  // This effect re-checks storage when navigation happens, for SPA behavior
  useEffect(() => {
    if (isInitialized) {
        setSelectedMentor(getMentorFromStorage());
    }
  }, [pathname, isInitialized]);

  const selectMentor = useCallback((mentorId: string) => {
    try {
        localStorage.setItem(MENTOR_KEY, mentorId);
        setSelectedMentor(mentorId);
        // Dispatch a custom event to notify other components immediately
        window.dispatchEvent(new StorageEvent('storage', { key: MENTOR_KEY, newValue: mentorId }));
    } catch (error) {
        console.error("Could not set item in localStorage", error);
    }
  }, []);

  return (
    <MentorContext.Provider value={{ selectedMentor, selectMentor }}>
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = (): MentorContextType => {
  const context = useContext(MentorContext);
  if (context === undefined) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
};
