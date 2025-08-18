
"use client";

import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot
} from "recharts";

interface AppLineChartProps {
  data: { [key: string]: any }[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  description?: string;
  footerText?: string;
}

export function AppLineChart({
  data,
  dataKey,
  xAxisKey,
  title,
  description,
  footerText,
}: AppLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
        No data available
      </div>
    );
  }

  const yAxisDomain = [
    Math.min(...data.map((item) => item[dataKey])) * 0.95,
    Math.max(...data.map((item) => item[dataKey])) * 1.05,
  ];

  const lastDataPoint = data[data.length - 1];

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {title && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              orientation="right"
              domain={yAxisDomain}
              tickFormatter={(value) => `$${Number(value).toFixed(2)}`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
             {lastDataPoint && (
              <ReferenceDot
                x={lastDataPoint[xAxisKey]}
                y={lastDataPoint[dataKey]}
                r={5}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
       {footerText && (
          <div className="text-sm text-center text-muted-foreground">{footerText}</div>
        )}
    </div>
  );
}
