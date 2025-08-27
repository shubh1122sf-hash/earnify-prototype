// src/app/api/auth/signin/route.ts
import { adminAuth } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const auth = adminAuth();
        // The providerId for Google is 'google.com'
        const provider = auth.getProvider('google.com');

        // Generate a sign-in URL. The redirect URI must be whitelisted in your GCP OAuth client settings.
        // It points to our callback handler.
        const signInUrl = await provider.createRequest({
            // The URL of our callback handler
            redirectUri: `${req.nextUrl.origin}/api/auth/callback`, 
            // Scopes determine what user info we get access to.
            scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        });
        
        // Redirect the user to the generated sign-in URL.
        return NextResponse.redirect(signInUrl);
    } catch (error) {
        console.error('Error creating sign-in URL:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
