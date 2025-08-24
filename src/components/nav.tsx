
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Trophy, User, GraduationCap, BarChart3, Newspaper } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const links = [
  {
    href: "/",
    label: "Market",
    icon: Home
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: Briefcase
  },
   {
    href: "/news",
    label: "News",
    icon: Newspaper
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy
  },
  {
    href: "/stats",
    label: "Stats",
    icon: BarChart3
  },
  {
    href: "/learn",
    label: "Mentors",
    icon: GraduationCap
  },
  {
    href: "/account",
    label: "Account",
    icon: User
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max">
        {links.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname.startsWith("/trade"));
            return (
            <Link href={link.href} key={link.label}>
                <button
                className={cn(
                    "py-4 px-6 font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center gap-2 border-b-2",
                    isActive ? "border-primary text-primary" : "border-transparent"
                )}
                >
                <link.icon className="h-4 w-4" />
                {link.label}
                </button>
            </Link>
            );
        })}
      </div>
    </ScrollArea>
  );
}
