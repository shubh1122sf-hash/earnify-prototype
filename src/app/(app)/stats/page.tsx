"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown, Percent, Hash, CheckCircle, XCircle } from "lucide-react";
import { useSimulation } from '@/hooks/use-simulation';
import { initialAssets } from '@/lib/assets';
import { ClientPieChart } from '@/components/client-pie-chart';

export default function StatsPage() {
  const [isClient, setIsClient] = useState(false);
  const { simulation, getPortfolioPNL } = useSimulation();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { totalPNL } = getPortfolioPNL();

  const holdingsWithData = simulation.holdings.map(holding => {
    const asset = initialAssets.find(a => a.ticker === holding.ticker);
    if (!asset) return null;
    const currentValue = holding.quantity * asset.price;
    const investment = holding.quantity * holding.avgBuyPrice;
    const pnl = currentValue - investment;
    return { ...holding, pnl, assetName: asset.name };
  }).filter(Boolean);

  const bestPerformer = holdingsWithData.length > 0 
    ? holdingsWithData.reduce((max, h) => h!.pnl > max!.pnl ? h : max)
    : null;
    
  const worstPerformer = holdingsWithData.length > 0
    ? holdingsWithData.reduce((min, h) => h!.pnl < min!.pnl ? h : min)
    : null;

  const winningTrades = holdingsWithData.filter(h => h!.pnl > 0).length;
  const losingTrades = holdingsWithData.filter(h => h!.pnl < 0).length;
  const totalClosedTrades = winningTrades + losingTrades; // Based on current holdings PNL
  const winRate = totalClosedTrades > 0 ? (winningTrades / totalClosedTrades) * 100 : 0;
  
  const sectorAllocation = simulation.holdings.reduce((acc, holding) => {
    const asset = initialAssets.find(a => a.ticker === holding.ticker);
    if (asset) {
        const value = holding.quantity * asset.price;
        acc[asset.sector] = (acc[asset.sector] || 0) + value;
    }
    return acc;
  }, {} as Record<string, number>);

  const sectorChartData = Object.entries(sectorAllocation).map(([name, value]) => ({ name, value }));


  if (!isClient) {
    return <div className="text-center p-12">Loading your stats...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Your Trading Stats</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                <span className={`h-4 w-4 ${totalPNL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {totalPNL >= 0 ? <ArrowUp/> : <ArrowDown/>}
                </span>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${totalPNL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPNL >= 0 ? '+' : '-'}${Math.abs(totalPNL).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Total profit or loss from all assets</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Based on currently held assets</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{simulation.tradeCount}</div>
                <p className="text-xs text-muted-foreground">Total number of buy/sell transactions</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Number of Holdings</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{simulation.holdings.length}</div>
                <p className="text-xs text-muted-foreground">Distinct assets in your portfolio</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Your most and least profitable holdings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {bestPerformer ? (
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Best Performer
                        </div>
                        <p className="text-lg font-semibold">{bestPerformer.assetName}</p>
                        <p className="text-sm text-green-600 font-mono">+${bestPerformer.pnl.toFixed(2)}</p>
                    </div>
                ) : <p className="text-sm text-muted-foreground">No profitable holdings yet.</p>}
                 {worstPerformer ? (
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                            <XCircle className="h-4 w-4" />
                            Worst Performer
                        </div>
                        <p className="text-lg font-semibold">{worstPerformer.assetName}</p>
                        <p className="text-sm text-red-600 font-mono">-${Math.abs(worstPerformer.pnl).toFixed(2)}</p>
                    </div>
                ) : <p className="text-sm text-muted-foreground">No holdings with a loss.</p>}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>How your portfolio value is distributed across different market sectors.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ClientPieChart data={sectorChartData} />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
