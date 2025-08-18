
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Market",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
   {
    href: "/account",
    label: "Account",
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
                "py-4 px-6 font-medium text-gray-600 border-b-2 border-transparent hover:text-primary hover:border-indigo-300 transition",
                isActive && "border-primary text-primary"
              )}
            >
              {link.label}
            </button>
          </Link>
        );
      })}
    </>
  );
}
