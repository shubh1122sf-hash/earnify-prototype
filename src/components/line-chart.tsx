
"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

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

interface AppLineChartProps {
  title: string;
  description: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
  footerText: string;
}

export function AppLineChart({ title, description, data, dataKey, xAxisKey, footerText }: AppLineChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  const yAxisDomain = data.length > 0 ? [
      Math.min(...data.map(item => item[dataKey])) * 0.995,
      Math.max(...data.map(item => item[dataKey])) * 1.005,
    ] : ['dataMin', 'dataMax'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 12,
                    right: 12,
                    top: 10,
                    bottom: 10,
                }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey={xAxisKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ dy: 10 }}
                    
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
                    domain={yAxisDomain}
                />
                <Tooltip
                    cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '3 3' }}
                    content={<ChartTooltipContent indicator="dot" formatter={(value, name, props) => [`$${Number(value).toFixed(2)}`, props.payload.time]} label="" />}
                />
                <Line
                    dataKey={dataKey}
                    type="linear"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {footerText} <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
