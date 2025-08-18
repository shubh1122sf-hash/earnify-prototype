
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface AppPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function AppPieChart({ data }: AppPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        No data available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          formatter={(value: number, name: string) => {
            const total = data.reduce((acc, curr) => acc + curr.value, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return [`$${value.toLocaleString()} (${percentage}%)`, name];
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          innerRadius="60%"
          paddingAngle={2}
          labelLine={false}
          label={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${COLORS[index % COLORS.length]})`} stroke={""} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
