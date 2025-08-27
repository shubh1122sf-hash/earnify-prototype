
'use client';

import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  userId: string;
  name: string | null;
  image: string | null;
  bestScore: number;
  lastScoreAt: string;
};

async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch('/api/leaderboard');
  if (!res.ok) {
    console.error('Failed to fetch leaderboard');
    return [];
  }
  return res.json();
}

export default function LeaderboardClient({ initialData }: { initialData: LeaderboardEntry[] }) {
  const [data, setData] = useState<LeaderboardEntry[]>(initialData);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchLeaderboard();
      setData(newData);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Player</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Best Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Last Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((entry, index) => (
            <tr key={entry.userId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.image ?? ''} alt={entry.name ?? ''} className="h-10 w-10 rounded-full" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{entry.bestScore.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(entry.lastScoreAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
