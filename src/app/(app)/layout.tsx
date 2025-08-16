import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-primary"
            >
              <path d="M12 2L1 9l4 2.5V17h14v-5.5L23 9l-3-2.1V4h-4v2.9L12 2zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 3.5 12 3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </svg>
            <h1 className="text-xl font-bold">Earnify</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter>
          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <UserNav />
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
