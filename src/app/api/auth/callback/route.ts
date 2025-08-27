// src/app/api/auth/callback/route.ts
import { adminAuth } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const auth = adminAuth();
        const code = req.nextUrl.searchParams.get('code');

        if (!code) {
            return new NextResponse('Authorization code is missing', { status: 400 });
        }
        
        // Process the OAuth 2.0 authorization code.
        const { idToken } = await auth.processAuthorizationCode(code);

        // Use the ID token to create a session cookie.
        // The session cookie will be used to authenticate subsequent requests.
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.set('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Error during auth callback:', error);
        // Redirect to a failure page or show an error
        return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
    }
}
