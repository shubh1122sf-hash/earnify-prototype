
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface AppPieChartProps {
  data: { name: string; value: number }[];
  className?: string;
}

const COLORS = [
  '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
];

export function AppPieChart({ data }: AppPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
        No data available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
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
  );
}
