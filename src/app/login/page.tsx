
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is already authenticated
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'authenticated') {
    return null; // or a loading spinner, as redirection is happening
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="mt-2 text-gray-600">
          Sign in to submit your score and see the leaderboard.
        </p>
        <button
          onClick={() => signIn('google')}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
