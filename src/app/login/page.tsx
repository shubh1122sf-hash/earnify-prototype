
'use client';

// This page is temporarily disabled to fix the application.
// You will be taken directly to the main app experience.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-12 w-12 fill-primary"
    >
      <path d="M12 2L1 9l4 2.5V17h14v-5.5L23 9l-3-2.1V4h-4v2.9L12 2zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
  );

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="flex flex-col items-center gap-4">
                <AppIcon />
                <p className="text-muted-foreground">Loading App...</p>
            </div>
        </div>
    );
}
