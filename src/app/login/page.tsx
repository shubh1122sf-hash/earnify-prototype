
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/lib/auth.tsx";
import { Skeleton } from "@/components/ui/skeleton";


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.854 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l-2.333 2.333c-.933-.933-2.2-2.347-3.573-2.347-3.227 0-5.867 2.6-5.867 5.867s2.64 5.867 5.867 5.867c3.427 0 4.787-2.667 5.067-4.067H12.48z"
      fill="currentColor"
    />
  </svg>
);

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
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-secondary p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <AppIcon />
                    </div>
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-4 w-full max-w-xs mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>
        </main>
    );
  }

  // If a user is already logged in (but loading is false), the useEffect above will trigger the redirect.
  // We can return null here to avoid rendering the login page for a split second.
  if (user) {
      return null;
  }

  return (
      <main className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                  <AppIcon />
              </div>
          <CardTitle className="text-3xl font-bold">Welcome to Earnify</CardTitle>
          <CardDescription>
              The ultimate virtual trading simulator. Sign in to start your journey.
          </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="flex flex-col gap-4">
              <Button
              variant="outline"
              className="w-full h-12 text-lg"
              onClick={signInWithGoogle}
              >
              <GoogleIcon className="mr-2 h-6 w-6" />
              Sign In with Google
              </Button>
          </div>
          </CardContent>
      </Card>
      </main>
  );
}
