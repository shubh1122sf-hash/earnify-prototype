
'use client';

import { createContext, useContext } from 'react';

interface MentorContextType {
  selectedMentor: string | null;
  selectMentor: (mentorId: string) => void;
}

export const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const useMentor = (): MentorContextType => {
  const context = useContext(MentorContext);
  if (context === undefined) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
};
