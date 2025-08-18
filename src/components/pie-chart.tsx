
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";


interface AppPieChartProps {
  data: any[];
  className?: string;
}

export function AppPieChart({ data, className }: AppPieChartProps) {
  const chartConfig = {
    value: {
      label: "Value",
    },
    ...data.reduce((acc, item) => {
        acc[item.name] = {
            label: item.name,
            color: item.fill,
        };
        return acc;
    }, {})
  };


  return (
    <ChartContainer config={chartConfig} className={cn("h-[200px] w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                paddingAngle={5}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
             <Legend
                content={({ payload }) => {
                return (
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-4 text-sm">
                    {payload?.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-muted-foreground">{entry.value}</span>
                        </li>
                    ))}
                    </ul>
                )
                }}
            />
            </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
