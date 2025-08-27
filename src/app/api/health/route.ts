import { NextResponse } from 'next/server';

export const runtime = "nodejs";

export async function GET() {
  const requiredEnvs = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ];
  
  const missing = requiredEnvs.filter(env => !process.env[env]);

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, missing },
      { status: 200 } // Return 200 to make it easy to inspect the JSON response
    );
  }

  return NextResponse.json({ ok: true, missing: [] });
}
