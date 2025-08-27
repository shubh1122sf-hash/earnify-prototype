
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider";
import UserMenu from "@/components/user-menu";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leaderboard App",
  description: "A Next.js leaderboard app with NextAuth and Prisma.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
              <h1 className="text-xl font-bold">Leaderboard</h1>
              {session?.user && <UserMenu user={session.user} />}
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
