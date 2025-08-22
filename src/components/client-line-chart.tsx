
'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot,
  ReferenceArea,
} from 'recharts';

export type RegimeArea = {
  x1: string;
  x2: string;
  type: 'Dip' | 'Rally' | 'Normal';
};

interface ClientLineChartProps {
  data: { [key: string]: any }[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  description?: string;
  footerText?: string;
  regimeAreas?: RegimeArea[];
}

export function ClientLineChart({
  data,
  dataKey,
  xAxisKey,
  title,
  description,
  footerText,
  regimeAreas = [],
}: ClientLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p>No data available.</p>
      </div>
    );
  }

  const yAxisDomain = [
    Math.min(...data.map((item) => item[dataKey])) * 0.98,
    Math.max(...data.map((item) => item[dataKey])) * 1.02,
  ];

  const lastDataPoint = data[data.length - 1];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {title && (
        <div className="w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <LineChart
        width={730}
        height={400}
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
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="left"
          domain={yAxisDomain}
          tickFormatter={(value) => `$${Number(value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          width={80}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
        />
        
        {regimeAreas.map((area, index) => {
            let fill = 'transparent';
            if (area.type === 'Dip') fill = 'hsl(var(--destructive) / 0.1)';
            if (area.type === 'Rally') fill = 'hsl(142 71% 45% / 0.1)';

            return (
                 <ReferenceArea 
                    key={index} 
                    x1={area.x1} 
                    x2={area.x2} 
                    stroke="transparent" 
                    fill={fill} 
                    ifOverflow="visible" 
                />
            )
        })}

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
        {lastDataPoint && (
          <ReferenceDot
            x={lastDataPoint[xAxisKey]}
            y={lastDataPoint[dataKey]}
            r={5}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--card))"
            strokeWidth={2}
          />
        )}
      </LineChart>
       {footerText && (
          <div className="text-center text-sm text-muted-foreground">{footerText}</div>
        )}
    </div>
  );
}
