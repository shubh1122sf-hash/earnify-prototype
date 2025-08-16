
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Briefcase, Bitcoin, Waves, TrendingUp, TrendingDown } from "lucide-react";
import { AppLineChart } from "@/components/line-chart";

const assetDetails: { [key: string]: any } = {
  BTC: { name: 'Bitcoin', icon: <Bitcoin className="h-8 w-8 text-orange-400" />, basePrice: 67123.45 },
  ETH: { name: 'Ethereum', icon: <Waves className="h-8 w-8 text-gray-400" />, basePrice: 3456.78 },
  SOL: { name: 'Solana', icon: <Waves className="h-8 w-8 text-purple-500" />, basePrice: 150.25 },
  AAPL: { name: 'Apple Inc.', icon: <Briefcase className="h-8 w-8 text-gray-500" />, basePrice: 195.89 },
  TSLA: { name: 'Tesla, Inc.', icon: <Briefcase className="h-8 w-8 text-red-600" />, basePrice: 183.01 },
  NVDA: { name: 'NVIDIA Corp', icon: <Briefcase className="h-8 w-8 text-green-500" />, basePrice: 121.79 },
  GOOGL: { name: 'Alphabet Inc.', icon: <Briefcase className="h-8 w-8 text-blue-500" />, basePrice: 175.61 },
  AMZN: { name: 'Amazon.com, Inc.', icon: <Briefcase className="h-8 w-8 text-yellow-500" />, basePrice: 185.57 },
  MSFT: { name: 'Microsoft Corp', icon: <Briefcase className="h-8 w-8 text-sky-500" />, basePrice: 442.57 },
  RELIANCE: { name: 'Reliance Industries', icon: <Briefcase className="h-8 w-8 text-blue-800" />, basePrice: 2885.50 },
  TCS: { name: 'TCS', icon: <Briefcase className="h-8 w-8 text-indigo-600" />, basePrice: 3825.10 },
  HDFCBANK: { name: 'HDFC Bank', icon: <Briefcase className="h-8 w-8 text-red-700" />, basePrice: 1665.80 },
};

export default function TradePage({ params }: { params: { assetId: string } }) {
  const { assetId } = params;
  const searchParams = useSearchParams();
  const initialAction = searchParams.get('action') || 'buy';
  
  const asset = assetDetails[assetId.toUpperCase()];
  
  const [price, setPrice] = useState(asset?.basePrice || 0);
  const [change, setChange] = useState(0);
  const [priceHistory, setPriceHistory] = useState(() => {
    const initialHistory: {time: number; price: number}[] = [];
    let currentPrice = asset?.basePrice || 0;
    for(let i=0; i < 30; i++) {
        const randomFactor = (Math.random() - 0.5) * 2;
        currentPrice = Math.max(0, currentPrice * (1 + randomFactor / 100));
        initialHistory.push({ time: Date.now() - (30 - i) * 1000, price: currentPrice });
    }
    return initialHistory;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFactor = (Math.random() - 0.5) * 0.2; // Smaller fluctuation for per-second view
      const newChange = Number(randomFactor.toFixed(2));
      let newPriceValue = 0;
      setPrice(prevPrice => {
          newPriceValue = Math.max(0, prevPrice * (1 + randomFactor / 100));
          return newPriceValue;
      });
      setChange(newChange);
      setPriceHistory(prevHistory => [...prevHistory.slice(-29), { time: Date.now(), price: newPriceValue }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    return priceHistory.map(p => ({
        time: new Date(p.time).toLocaleTimeString(),
        value: p.price
    }))
  }, [priceHistory])

  if (!asset) {
    return <div>Asset not found</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        {asset.icon}
        <h1 className="text-3xl font-bold">{asset.name} ({assetId.toUpperCase()})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <AppLineChart
                title="Live Price Chart"
                description="Price movement in the last 30 seconds."
                data={chartData}
                dataKey="value"
                xAxisKey="time"
                footerText="Live data simulation"
            />
        </div>

        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Current Market Price</CardTitle>
                </CardHeader>
                <CardContent className="flex items-baseline gap-4">
                    <p className="text-4xl font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <div className={`flex items-center gap-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        <span className="font-medium">{change.toFixed(2)}%</span>
                        <span className="text-sm text-muted-foreground">/sec</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                <Tabs defaultValue={initialAction} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="p-6">
                    <TradeForm action="Buy" assetTicker={assetId.toUpperCase()} price={price} />
                    </TabsContent>
                    <TabsContent value="sell" className="p-6">
                    <TradeForm action="Sell" assetTicker={assetId.toUpperCase()} price={price} />
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function TradeForm({ action, assetTicker, price }: { action: 'Buy' | 'Sell', assetTicker: string, price: number }) {
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setTotal(numericAmount * price);
    } else {
      setTotal(0);
    }
  }, [amount, price]);

  const handleTransaction = () => {
    alert(`${action}ing ${amount} ${assetTicker} for $${total.toFixed(2)}`);
    setAmount('');
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Quantity ({assetTicker})</Label>
        <Input 
          id="amount" 
          type="number" 
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Total</span>
            <span className="font-medium">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </CardContent>
      </Card>

      <Button 
        className={`w-full ${action === 'Buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
        onClick={handleTransaction}
        disabled={!amount || parseFloat(amount) <= 0}
      >
        {action} {assetTicker}
      </Button>
    </div>
  )
}
