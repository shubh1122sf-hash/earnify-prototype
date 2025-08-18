
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
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
import { TrendingUp, TrendingDown } from "lucide-react";
import { AppLineChart } from "@/components/line-chart";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const assetDetails: { [key: string]: any } = {
  BTC: { name: 'Bitcoin', icon: 'https://placehold.co/40x40.png?text=B', basePrice: 67123.45 },
  ETH: { name: 'Ethereum', icon: 'https://placehold.co/40x40.png?text=E', basePrice: 3456.78 },
  SOL: { name: 'Solana', icon: 'https://placehold.co/40x40.png?text=S', basePrice: 150.25 },
  AAPL: { name: 'Apple Inc.', icon: 'https://placehold.co/40x40.png?text=A', basePrice: 195.89 },
  TSLA: { name: 'Tesla, Inc.', icon: 'https://placehold.co/40x40.png?text=T', basePrice: 183.01 },
  NVDA: { name: 'NVIDIA Corp', icon: 'https://placehold.co/40x40.png?text=N', basePrice: 121.79 },
  GOOGL: { name: 'Alphabet Inc.', icon: 'https://placehold.co/40x40.png?text=G', basePrice: 175.61 },
  AMZN: { name: 'Amazon.com, Inc.', icon: 'https://placehold.co/40x40.png?text=A', basePrice: 185.57 },
  MSFT: { name: 'Microsoft Corp', icon: 'https://placehold.co/40x40.png?text=M', basePrice: 442.57 },
  RELIANCE: { name: 'Reliance Industries', icon: 'https://placehold.co/40x40.png?text=R', basePrice: 2885.50 },
  TCS: { name: 'TCS', icon: 'https://placehold.co/40x40.png?text=T', basePrice: 3825.10 },
  HDFCBANK: { name: 'HDFC Bank', icon: 'https://placehold.co/40x40.png?text=H', basePrice: 1665.80 },
};

type TimeRange = '1H' | '1D' | '1W' | '1Y';

export default function TradePage({ params }: { params: { assetId: string } }) {
  const { assetId } = params;
  
  const [asset, setAsset] = useState<any>(null);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>('1H');
  const [priceHistory, setPriceHistory] = useState<{time: number; price: number}[]>([]);
  const [initialAction, setInitialAction] = useState('buy');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const searchParams = new URLSearchParams(window.location.search);
      setInitialAction(searchParams.get('action') || 'buy');
      const upperCaseAssetId = assetId.toUpperCase();
      if (assetDetails[upperCaseAssetId]) {
        setAsset(assetDetails[upperCaseAssetId]);
      }
    }
  }, [assetId, isClient]);
  
  const generateHistoricalData = useCallback((range: TimeRange, basePrice: number) => {
    const now = Date.now();
    let dataPoints = 0;
    let interval = 0;

    switch(range) {
        case '1H': dataPoints = 60; interval = 60 * 1000; break;
        case '1D': dataPoints = 96; interval = 15 * 60 * 1000; break;
        case '1W': dataPoints = 84; interval = 2 * 60 * 60 * 1000; break;
        case '1Y': dataPoints = 52; interval = 7 * 24 * 60 * 60 * 1000; break;
    }

    const history: {time: number; price: number}[] = [];
    let currentPrice = basePrice;
    
    for (let i = dataPoints - 1; i >= 0; i--) {
        const randomFactor = (Math.random() - 0.5) * 2;
        currentPrice = Math.max(0, currentPrice * (1 - randomFactor / 100));
        history.unshift({ time: now - i * interval, price: currentPrice });
    }
    
    if (history.length > 0) {
        history[history.length-1].price = basePrice;
    }
    
    setPriceHistory(history);
    setPrice(basePrice);
  }, []);

  useEffect(() => {
    if (asset) {
        generateHistoricalData(timeRange, asset.basePrice);
    }
  }, [timeRange, asset, generateHistoricalData]);
  
  useEffect(() => {
    if (timeRange !== '1H' || !asset) return;

    const interval = setInterval(() => {
      setPriceHistory(prevHistory => {
        if (prevHistory.length === 0) return [];
        const lastPrice = prevHistory[prevHistory.length - 1].price;
        const randomFactor = (Math.random() - 0.5) * 1; 
        const newPriceValue = Math.max(0, lastPrice * (1 + randomFactor / 100));
        
        setPrice(newPriceValue);
        const newChange = ((newPriceValue - lastPrice) / lastPrice) * 100;
        setChange(newChange);
        
        const newHistory = [...prevHistory.slice(-59), { time: Date.now(), price: newPriceValue }];
        return newHistory;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, [timeRange, asset]);

  const chartData = useMemo(() => {
    const formatTime = (time: number) => {
        switch(timeRange) {
            case '1H': return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '1D': return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '1W': return new Date(time).toLocaleDateString([], { month: 'short', day: 'numeric' });
            case '1Y': return new Date(time).toLocaleDateString([], { month: 'short', year: 'numeric' });
            default: return new Date(time).toLocaleTimeString();
        }
    };
    
    return priceHistory.map(p => ({
        time: formatTime(p.time),
        value: p.price
    }));
  }, [priceHistory, timeRange]);

  if (!isClient || !asset) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading Asset...</p>
      </div>
    );
  }

  const timeRanges: TimeRange[] = ['1H', '1D', '1W', '1Y'];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
            <AvatarImage src={asset.icon} alt={asset.name} />
            <AvatarFallback>{assetId.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{asset.name} ({assetId.toUpperCase()})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
           <Card className="flex-1">
             <CardHeader>
                <div className="flex items-baseline gap-4">
                    <p className="text-4xl font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    {timeRange === '1H' && (
                        <div className={`flex items-center gap-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                            <span className="font-medium">{change.toFixed(2)}%</span>
                        </div>
                    )}
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="h-[350px] w-full">
                  <AppLineChart
                      data={chartData}
                      dataKey="value"
                      xAxisKey="time"
                  />
                </div>
             </CardContent>
           </Card>
            <div className="flex gap-2">
                {timeRanges.map(range => (
                    <Button 
                        key={range}
                        variant={timeRange === range ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                    >
                        {range}
                    </Button>
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-6">
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
  const balance = 50000; // Hardcoded balance

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
        <CardContent className="p-4 space-y-2">
           <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available Balance</span>
            <span className="font-mono font-medium">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Total</span>
            <span className="font-mono font-medium">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </CardContent>
      </Card>

      <Button 
        className={`w-full text-lg h-12 font-bold ${action === 'Buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
        onClick={handleTransaction}
        disabled={!amount || parseFloat(amount) <= 0 || (action === 'Buy' && total > balance)}
      >
        {action} {assetTicker}
      </Button>
    </div>
  )
}
