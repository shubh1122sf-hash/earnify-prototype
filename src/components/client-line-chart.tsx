
'use client';

import { AppLineChart } from "@/components/line-chart";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

export function ClientLineChart(props: React.ComponentProps<typeof AppLineChart>) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Skeleton className="h-full w-full" />;
  }

  return <AppLineChart {...props} />;
}
