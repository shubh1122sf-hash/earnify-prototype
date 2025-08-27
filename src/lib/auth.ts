
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, User } from "next-auth";
import { getServerSession as originalGetServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Conditionally add the Google provider only if the required environment variables are set.
    // This prevents the app from crashing in environments where secrets are not configured (like Studio Preview).
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import `authOptions` in every file.
 * This function also handles cases where auth environment variables might be missing.
 * @see https://next-auth.js.org/configuration/nextjs
 */
const getServerSession = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  // If essential auth variables are missing, return null to avoid a server crash.
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
      console.warn("Auth environment variables are missing. Authentication will be disabled.");
      return Promise.resolve(null);
  }
  return originalGetServerSession(...args, authOptions);
};

export { authOptions, getServerSession };

