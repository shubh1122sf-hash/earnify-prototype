
'use client';

import { AppPieChart } from "@/components/pie-chart";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect } from "react";

export function ClientPieChart(props: React.ComponentProps<typeof AppPieChart>) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
    );
  }

  return <AppPieChart {...props} />;
}
