
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

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
    <ChartContainer config={chartConfig} className={cn("h-[150px] w-[150px]", className)}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Tooltip
                cursor={false}
                content={<ChartTooltipContent 
                    hideLabel 
                    formatter={(value, name, props) => {
                        const total = data.reduce((acc, curr) => acc + curr.value, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
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
                outerRadius={60}
                innerRadius={40}
                paddingAngle={2}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                ))}
            </Pie>
            </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
