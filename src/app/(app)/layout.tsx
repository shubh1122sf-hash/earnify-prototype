
import React from "react";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import { Wallet, BarChart, BookOpen, User, ArrowRightLeft, Briefcase, LayoutDashboard, Trophy, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl p-4 font-sans">
      <header className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
              <div className="flex items-center">
                   <div className="bg-primary text-white p-3 rounded-xl mr-4">
                        <svg
                          className="h-8 w-8 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128ZM82.34,69.66a8,8,0,0,0-11.32,0L49.66,91a8,8,0,0,0,0,11.31L71,123.66a8,8,0,0,0,11.31-11.32L65.31,96.68,82.34,79.66A8,8,0,0,0,82.34,69.66ZM112,64a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V72A8,8,0,0,0,112,64Zm85.66,92.69-21.32,21.32a8,8,0,0,1-11.32-11.32l17-17L165,132.68a8,8,0,0,1-11.31-11.31L175,99.66a8,8,0,0,1,11.32,0l21.34,21.34a8,8,0,0,1,0,11.32ZM152,168a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8Z" />
                        </svg>
                   </div>
                  <div>
                      <h1 className="text-2xl font-bold text-gray-800">Earnify Simulator</h1>
                      <p className="text-gray-600">Virtual trading with real market dynamics</p>
                  </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
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
