
'use client';

import { useAuth } from './auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 fill-primary animate-pulse">
        <path d="M12 2L1 9l4 2.5V17h14v-5.5L23 9l-3-2.1V4h-4v2.9L12 2zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
)

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <div className="flex flex-col items-center gap-4">
      <AppIcon />
      <p className="text-muted-foreground">Authenticating...</p>
    </div>
  </div>
);


export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return; // Do nothing while loading
    }

    const isAuthPage = pathname === '/login';

    if (!user && !isAuthPage) {
      router.push('/login');
    }

    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Allow access to login page for unauthenticated users
  if (!user && pathname === '/login') {
    return <>{children}</>;
  }
  
  // Allow access to app for authenticated users
  if (user && pathname !== '/login') {
      return <>{children}</>;
  }

  // In other cases (like transitioning), show loading to prevent flashing content
  return <LoadingScreen />;
};
