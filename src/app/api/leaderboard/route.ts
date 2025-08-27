
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const scores = await prisma.score.findMany({
      take: 100,
      orderBy: [
        { value: 'desc' },
        { createdAt: 'desc' }
      ],
      distinct: ['userId'],
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    
    // The above query gets the most recent score for each user among the top 100 scores.
    // We need to get the actual best score for each of these users.
    const userIds = scores.map(s => s.userId);

    const bestScores = await prisma.score.groupBy({
        by: ['userId'],
        _max: {
            value: true,
        },
        where: {
            userId: {
                in: userIds,
            },
        },
    });

    const bestScoresMap = new Map(bestScores.map(s => [s.userId, s._max.value]));

    const leaderboard = scores.map(score => ({
      userId: score.userId,
      name: score.user.name,
      image: score.user.image,
      bestScore: bestScoresMap.get(score.userId) ?? 0,
      lastScoreAt: score.createdAt,
    })).sort((a,b) => b.bestScore - a.bestScore);


    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
