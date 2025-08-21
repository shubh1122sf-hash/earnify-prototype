
'use client';

import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Skeleton } from '@/components/ui/skeleton';
import { ClientPieChart } from '@/components/client-pie-chart';

const initialPortfolio = {
  totalBalance: 12345.67,
  totalPnl: 2345.67,
  totalPnlPercent: 4.69,
  todayPnl: 123.56,
  todayPnlPercent: 75,
  weekPnl: 1456.78,
  weekPnlPercent: 60,
  monthPnl: 2678.90,
  monthPnlPercent: 45,
  holdings: [
    { name: "Apple Inc.", ticker: "AAPL", quantity: 10, avgPrice: 150.00, price: 195.89, value: 1958.90 },
    { name: "Tesla, Inc.", ticker: "TSLA", quantity: 5, avgPrice: 200.00, price: 183.01, value: 915.05 },
    { name: "NVIDIA Corp", ticker: "NVDA", quantity: 20, avgPrice: 100.00, price: 121.79, value: 2435.80 },
    { name: "Bitcoin", ticker: "BTC", quantity: 0.1, avgPrice: 60000, price: 67123.45, value: 6712.34 },
    { name: "Ethereum", ticker: "ETH", quantity: 2, avgPrice: 3000, price: 3456.78, value: 6913.56 },
  ],
};

export default function PortfolioPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartData = initialPortfolio.holdings.map((h) => ({
    name: h.ticker,
    value: h.value
  }));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-foreground/80 mb-6">Your Portfolio</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Portfolio Value</h3>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-bold text-foreground">${initialPortfolio.totalBalance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total value</div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold positive">+${initialPortfolio.totalPnl.toLocaleString()}</div>
                    <div className="text-sm positive">+{initialPortfolio.totalPnlPercent.toFixed(2)}%</div>
                </div>
            </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Allocation</h3>
              {isClient ? <ClientPieChart data={chartData} /> : <Skeleton className="h-[150px] w-[250px] rounded-full" />}
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Performance</h3>
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Today's P&L</span>
                        <span className="font-medium positive">+${initialPortfolio.todayPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={initialPortfolio.todayPnlPercent} />
                </div>
                <div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Week's P&L</span>
                        <span className="font-medium positive">+${initialPortfolio.weekPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={initialPortfolio.weekPnlPercent} />
                </div>
                <div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Month's P&L</span>
                        <span className="font-medium positive">+${initialPortfolio.monthPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={initialPortfolio.monthPnlPercent} />
                </div>
            </div>
        </div>
    </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground/80 mb-4">Your Holdings</h3>
        <div className="overflow-x-auto">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg. Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">P&L</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                    {initialPortfolio.holdings.map((asset) => {
                        const currentValue = asset.quantity * asset.price;
                        const investment = asset.quantity * asset.avgPrice;
                        const pnl = currentValue - investment;
                        const pnlPercent = investment !== 0 ? (pnl / investment) * 100 : 0;
                        const pnlClass = pnl >= 0 ? "positive" : "negative";
                        const pnlSign = pnl >= 0 ? "+" : "";

                        return (
                            <tr key={asset.ticker} className="hover:bg-secondary">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-primary font-medium">{asset.name.charAt(0)}</span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-foreground">{asset.name}</div>
                                        <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{asset.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">${asset.avgPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">${asset.price.toFixed(2)}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${pnlClass}`}>
                                {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">${currentValue.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  );
}
