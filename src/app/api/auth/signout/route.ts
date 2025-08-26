// src/app/api/auth/signout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
    try {
        const sessionCookie = cookies().get('session')?.value;
        if (sessionCookie) {
            const decodedClaims = await adminAuth().verifySessionCookie(sessionCookie, true);
            await adminAuth().revokeRefreshTokens(decodedClaims.sub);
        }
        
        // Clear the cookie
        const response = new NextResponse(JSON.stringify({ status: 'success' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

        response.cookies.set('session', '', {
            maxAge: 0,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Error signing out:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
