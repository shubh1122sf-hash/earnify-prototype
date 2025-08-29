
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Allow login_hint from our custom login page to prefill Google prompt
          // NextAuth will merge incoming params from signIn() call
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ account, profile }) {
      // Only allow Google sign-in
      if (account?.provider !== 'google') return false;

      // Ensure Google verified the email
      const isVerified = (profile as any)?.email_verified;
      const email = (profile as any)?.email as string | undefined;
      if (!email || !isVerified) return false;

      // Optional allow-listing via env vars
      const allowedEmails = (process.env.ALLOWED_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS || '')
        .split(',')
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);

      if (allowedEmails.length === 0 && allowedDomains.length === 0) {
        return true;
      }

      const emailLower = email.toLowerCase();
      if (allowedEmails.includes(emailLower)) return true;

      const domain = emailLower.split('@')[1];
      if (domain && allowedDomains.includes(domain)) return true;

      return false;
    },
  },
};
