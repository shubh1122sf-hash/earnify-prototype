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
import { Bell, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-8 w-8 fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128ZM82.34,69.66a8,8,0,0,0-11.32,0L49.66,91a8,8,0,0,0,0,11.31L71,123.66a8,8,0,0,0,11.31-11.32L65.31,96.68,82.34,79.66A8,8,0,0,0,82.34,69.66ZM112,64a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V72A8,8,0,0,0,112,64Zm85.66,92.69-21.32,21.32a8,8,0,0,1-11.32-11.32l17-17L165,132.68a8,8,0,0,1-11.31-11.31L175,99.66a8,8,0,0,1,11.32,0l21.34,21.34a8,8,0,0,1,0,11.32ZM152,168a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8Z" />
            </svg>
            <h1 className="text-xl font-bold">Earnify</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter>
          <Link href="/account" className="w-full">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
          </Link>
          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background/50 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-10">
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
