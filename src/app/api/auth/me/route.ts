// src/app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const decodedClaims = await adminAuth().verifySessionCookie(sessionCookie, true);
        const user = await adminAuth().getUser(decodedClaims.uid);
        
        return new NextResponse(JSON.stringify({ 
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            } 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
