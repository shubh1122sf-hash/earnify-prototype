
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface AppPieChartProps {
  data: any[];
  className?: string;
}

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    '#EC4899',
    '#14B8A6',
    '#F97316'
];

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
    <ChartContainer config={chartConfig} className={cn("h-full w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Tooltip
                cursor={false}
                content={<ChartTooltipContent 
                    hideLabel 
                    formatter={(value, name) => {
                        const total = data.reduce((acc, curr) => acc + curr.value, 0);
                        const percentage = total > 0 ? ((Number(value) / total) * 100).toFixed(2) : 0;
                        return (
                            <div className="flex flex-col">
                               <span className="font-bold">{name}: ${Number(value).toLocaleString()}</span>
                               <span className="text-muted-foreground">{percentage}% of portfolio</span>
                            </div>
                        )
                    }}
                />}
            />
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={'100%'}
                innerRadius={'70%'}
                paddingAngle={2}
                labelLine={false}
                label={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={""} />
                ))}
            </Pie>
            </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
