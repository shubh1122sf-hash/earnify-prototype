"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  Trophy,
  BarChart,
  BookOpen,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  {
    href: "/",
    label: "Market",
    icon: LayoutDashboard,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: Briefcase,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  {
    href: "/stats",
    label: "Stats",
    icon: BarChart,
  },
  {
    href: "/learn",
    label: "Learn",
    icon: BookOpen,
  },
  {
    href: "/account",
    label: "Account",
    icon: User,
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} className="w-full">
            <SidebarMenuButton
              isActive={pathname === link.href}
              tooltip={link.label}
              className="w-full justify-start"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
