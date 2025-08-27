
'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import type { Session } from 'next-auth';
import React from 'react';

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return <Provider session={session}>{children}</Provider>;
}
