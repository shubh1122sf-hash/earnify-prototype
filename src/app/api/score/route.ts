
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

const scoreSchema = z.object({
  value: z.number().int().min(0).max(1_000_000),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  try {
    const json = await req.json();
    const body = scoreSchema.parse(json);

    await prisma.score.create({
      data: {
        userId: session.user.id,
        value: body.value,
      },
    });

    const userBestScore = await prisma.score.aggregate({
      _max: {
        value: true,
      },
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ bestScore: userBestScore._max.value ?? 0 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    console.error('Failed to create score:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
