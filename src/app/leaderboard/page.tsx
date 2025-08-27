
import { Suspense } from 'react';
import LeaderboardClient from './leaderboard-client';

async function getLeaderboardData() {
  // In a real app, you would fetch this from your API endpoint.
  // The fetch would be cached by default in Next.js App Router.
  // For simplicity here, we'll imagine fetching. The client component will handle polling.
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leaderboard`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  return res.json();
}

export default async function LeaderboardPage() {
  const initialData = await getLeaderboardData();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <Suspense fallback={<div>Loading leaderboard...</div>}>
         <LeaderboardClient initialData={initialData} />
      </Suspense>
    </div>
  );
}
