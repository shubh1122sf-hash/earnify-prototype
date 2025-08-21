
import React from "react";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import { ChartLine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl p-4 font-sans flex flex-col min-h-screen">
      <header className="bg-card rounded-xl shadow-sm p-4 mb-6 border">
          <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                   <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                        <ChartLine className="h-8 w-8" />
                   </div>
                  <div>
                      <h1 className="text-2xl font-bold text-foreground">Earnify Simulator</h1>
                      <p className="text-muted-foreground">Virtual trading with real market dynamics</p>
                  </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <span>$10,000.00</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Available Balance</div>
                </div>
                <UserNav />
              </div>
          </div>
      </header>

      <main className="bg-card rounded-xl shadow-sm overflow-hidden border flex-grow flex flex-col">
        <div className="flex border-b">
          <Nav />
        </div>
        <div className="p-6 flex-grow">
          {children}
        </div>
      </main>

      <footer className="text-center text-sm text-muted-foreground mt-8">
        <p>This is a simulation. All data is virtual.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="/account" className="hover:text-primary">Account</Link>
            <Link href="/login" className="hover:text-primary">Log Out</Link>
        </div>
      </footer>
    </div>
  );
}
