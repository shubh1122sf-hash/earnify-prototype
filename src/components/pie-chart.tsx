
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface AppPieChartProps {
  data: { name: string; value: number }[];
  className?: string;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function AppPieChart({ data, className }: AppPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
        No data available
      </div>
    );
  }
  return (
     <div className={className}>
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
              outerRadius="100%"
              innerRadius="70%"
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
     </div>
  );
}
