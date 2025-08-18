
"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ReferenceDot } from "recharts";

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

interface AppLineChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  className?: string;
}

export function AppLineChart({ data, dataKey, xAxisKey, className }: AppLineChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

  const yAxisDomain = data.length > 0 ? [
      Math.min(...data.map(item => item[dataKey])) * 0.99,
      Math.max(...data.map(item => item[dataKey])) * 1.01,
    ] : ['dataMin', 'dataMax'];
  
  const lastDataPoint = data.length > 0 ? data[data.length - 1] : null;

  return (
    <ChartContainer config={chartConfig} className={cn("h-[250px] w-full", className)}>
        <LineChart
            accessibilityLayer
            data={data}
            margin={{
                left: -10,
                right: 20,
                top: 20,
                bottom: 10,
            }}
        >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ dy: 10, fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
                domain={yAxisDomain}
                orientation="right"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '3 3' }}
                content={<ChartTooltipContent indicator="dot" formatter={(value, name, props) => [`$${Number(value).toFixed(2)}`, props.payload.time]} label="" />}
            />
            <Line
                dataKey={dataKey}
                type="linear"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
            />
            {lastDataPoint && (
              <ReferenceDot
                x={lastDataPoint[xAxisKey]}
                y={lastDataPoint[dataKey]}
                r={5}
                fill="hsl(var(--chart-1))"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              >
                  <foreignObject x={15} y={-10} width={100} height={20}>
                    <div 
                      style={{
                        background: 'hsl(var(--chart-1))',
                        color: 'hsl(var(--primary-foreground))',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius)',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {`$${Number(lastDataPoint[dataKey]).toFixed(2)}`}
                    </div>
                  </foreignObject>
              </ReferenceDot>
            )}
        </LineChart>
    </ChartContainer>
  );
}
