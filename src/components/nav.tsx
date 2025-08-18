
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Briefcase, Trophy, User } from "lucide-react";

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
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy
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
    <>
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href === "/" && pathname.startsWith("/trade"));
        return (
          <Link href={link.href} key={link.label}>
            <button
              className={cn(
                "py-4 px-6 font-medium text-gray-600 border-b-2 border-transparent hover:text-primary hover:border-indigo-300 transition flex items-center gap-2",
                isActive && "border-primary text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          </Link>
        );
      })}
    </>
  );
}
