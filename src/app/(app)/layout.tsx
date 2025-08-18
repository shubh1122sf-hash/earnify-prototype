
import React from "react";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import { ChartLine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-6xl p-4 font-sans">
      <header className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
              <div className="flex items-center">
                   <div className="bg-primary text-white p-3 rounded-xl mr-4">
                        <ChartLine className="h-8 w-8 text-white" />
                   </div>
                  <div>
                      <h1 className="text-2xl font-bold text-gray-800">Earnify Simulator</h1>
                      <p className="text-gray-600">Virtual trading with real market dynamics</p>
                  </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <span>$50,000.00</span>
                    </div>
                    <div className="text-sm text-gray-600">Available Balance</div>
                </div>
                <UserNav />
              </div>
          </div>
      </header>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b">
          <Nav />
        </div>
        <main className="p-6">{children}</main>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>This is a simulation. All data is virtual.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="/account" className="hover:text-primary">Account</Link>
            <Link href="/login" className="hover:text-primary">Log Out</Link>
        </div>
      </footer>
    </div>
  );
}
