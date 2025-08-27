
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const scoreSchema = z.object({
  value: z.coerce.number().int().min(0).max(1_000_000),
});

export default function HomePage() {
  const router = useRouter();
  const [score, setScore] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validated = scoreSchema.safeParse({ value: score });

    if (!validated.success) {
      setError('Please enter a valid number between 0 and 1,000,000.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: validated.data.value }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score.');
      }
      
      // On success, navigate to the leaderboard
      router.push('/leaderboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Submit Your Score</h2>
      <form onSubmit={handleSubmit} className="mt-4 max-w-sm space-y-4">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score
          </label>
          <input
            id="score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your score"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Score'}
        </button>
      </form>
    </div>
  );
}
