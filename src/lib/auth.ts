
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// =================================================================================
// IMPORTANT: FOR YOUR DEADLINE, PASTE YOUR KEYS DIRECTLY INTO THE QUOTES BELOW.
// This is not secure for a real application, but will guarantee it works for your demo.
// =================================================================================

const GOOGLE_CLIENT_ID: string = "47497742774-7nl9o5pvr54erlv5qpepguc9cn9f1o73.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET: string = "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";
const NEXTAUTH_SECRET: string = "https://9000-firebase-studio-1755358925704.cluster-osvg2nzmmzhzqqjio6oojllbg4.cloudworkstations.dev";

// =================================================================================

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/api/auth/signin',
  },
};
