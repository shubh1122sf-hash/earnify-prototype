
'use client';

import { ResponsiveContainer, Pie, PieChart, Tooltip, Cell, Legend } from 'recharts';

interface ClientPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ClientPieChart({ data }: ClientPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground">
        <p>No holdings to display.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value: number, name: string) => {
            const total = data.reduce((acc, curr) => acc + curr.value, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return [`$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${percentage}%)`, name];
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          paddingAngle={2}
          labelLine={false}
          label={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={"hsl(var(--card))"} />
          ))}
        </Pie>
        <Legend 
            iconType="circle" 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
            iconSize={8}
            wrapperStyle={{
                fontSize: '12px',
                lineHeight: '20px'
            }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
