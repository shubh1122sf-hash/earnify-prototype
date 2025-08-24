
'use client';

import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Skeleton } from '@/components/ui/skeleton';
import { ClientPieChart } from '@/components/client-pie-chart';
import { useSimulation } from '@/hooks/use-simulation';
import { initialAssets } from '@/lib/assets';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PortfolioPage() {
  const [isClient, setIsClient] = useState(false);
  const { simulation, getPortfolioValue, getPortfolioPNL } = useSimulation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const portfolioValue = getPortfolioValue();
  const { totalPNL, totalPNLPercent } = getPortfolioPNL();

  const chartData = simulation.holdings.length > 0 ? simulation.holdings.map((h) => {
    const asset = initialAssets.find(a => a.ticker === h.ticker);
    return {
      name: h.ticker,
      value: (asset?.price || 0) * h.quantity
    };
  }) : [];

  if (!isClient) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-foreground/80 mb-6">Your Portfolio</h2>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-foreground/80 mb-6">Your Portfolio</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Portfolio Value</h3>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-bold text-foreground">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-sm text-muted-foreground">Total holdings value</div>
                </div>
                <div className="text-right">
                    <div className={`text-lg font-semibold ${totalPNL >= 0 ? 'positive' : 'negative'}`}>
                        {totalPNL >= 0 ? '+' : '-'}${Math.abs(totalPNL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm ${totalPNL >= 0 ? 'positive' : 'negative'}`}>
                        ({totalPNL >= 0 ? '+' : '-'}{Math.abs(totalPNLPercent).toFixed(2)}%)
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-card p-6 rounded-xl border flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Allocation</h3>
              <ClientPieChart data={chartData} />
        </div>

        <div className="bg-card p-6 rounded-xl border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Account Balance</h3>
             <div className="flex justify-between items-center">
                <div>
                    <div className="text-3xl font-bold text-foreground">${simulation.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-sm text-muted-foreground">Cash available to trade</div>
                </div>
            </div>
        </div>
    </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground/80 mb-4">Your Holdings</h3>
        <div className="overflow-x-auto">
             {simulation.holdings.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-card rounded-lg">
                  <p className="mb-4">You don't have any holdings yet.</p>
                  <Link href="/">
                    <Button>Explore the Market</Button>
                  </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-secondary/50">
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
                        {simulation.holdings.map((holding) => {
                            const asset = initialAssets.find(a => a.ticker === holding.ticker);
                            if (!asset) return null;

                            const currentValue = holding.quantity * asset.price;
                            const investment = holding.quantity * holding.avgBuyPrice;
                            const pnl = currentValue - investment;
                            const pnlPercent = investment !== 0 ? (pnl / investment) * 100 : 0;
                            const pnlClass = pnl >= 0 ? "positive" : "negative";
                            const pnlSign = pnl >= 0 ? "+" : "";

                            return (
                                <tr key={holding.ticker} className="hover:bg-secondary/20">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary font-medium">{asset.name.charAt(0)}</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-foreground">{asset.name}</div>
                                            <div className="text-sm text-muted-foreground">{holding.ticker}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{holding.quantity.toFixed(4)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">${holding.avgBuyPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">${asset.price.toFixed(2)}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${pnlClass}`}>
                                    {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">${currentValue.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </div>
    </div>
  );
}
