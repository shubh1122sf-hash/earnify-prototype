
'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInWithGoogle } from "@/lib/auth.ts";
import { useAuth, AuthProvider } from "@/lib/auth.tsx";
import { useRouter } from "next/navigation";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 48 48" >
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.08,44,28.891,44,20C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
)

const AppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 fill-primary">
        <path d="M12 2L1 9l4 2.5V17h14v-5.5L23 9l-3-2.1V4h-4v2.9L12 2zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
)

function LoginPageContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        window.location.href = '/';
      }
    } catch (error) {
        console.error("An error occurred during sign-in:", error);
    }
  };
  
  if (loading || user) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <AppIcon />
            </div>
          <CardTitle className="text-2xl font-bold">Welcome to Earnify Simulator</CardTitle>
          <CardDescription>
            Your personal trading simulator. Sign in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={handleSignIn}>
              <GoogleIcon className="mr-2 h-5 w-5"/>
              Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginPageContent />
        </AuthProvider>
    )
}
