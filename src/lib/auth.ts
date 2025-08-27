import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession as originalGetServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { requireEnv } from "./env";

// Ensure required environment variables are present
requireEnv(
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "NEXTAUTH_SECRET"
);

export const authOptions: NextAuthOptions = {
  // The adapter is instantiated here and will only be used in a Node.js environment
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    jwt({ token, user }) {
      // On initial sign-in, user object is available
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import `authOptions` in every file.
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerSession = (
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) => {
  return originalGetServerSession(...args, authOptions);
};
