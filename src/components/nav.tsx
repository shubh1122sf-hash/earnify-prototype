
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
  ArrowRightLeft,
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
    href: "/trade/BTC",
    label: "Trade",
    icon: ArrowRightLeft,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  {
    href: "/account",
    label: "Account",
    icon: User,
  },
];

export function Nav() {
  const pathname = usePathname();

  const isTradePage = pathname.startsWith('/trade');

  return (
    <SidebarMenu>
      {links.map((link) => {
        let isActive = pathname === link.href;
        if (link.href.startsWith('/trade') && isTradePage) {
            isActive = true;
        } else if (link.href === '/') {
            isActive = pathname === '/';
        }

        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full">
              <SidebarMenuButton
                isActive={isActive}
                tooltip={link.label}
                className="w-full justify-start"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
