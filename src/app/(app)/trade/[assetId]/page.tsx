
"use client";

import { useState, useEffect, useCallback } from 'react';
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
import { ClientLineChart } from "@/components/client-line-chart";
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useSimulation } from '@/hooks/use-simulation';
import { initialAssets as assetDetailsList } from '@/lib/assets';

type TimeRange = '1H' | '1D' | '1W' | '1Y';

export default function TradePage({ params }: { params: { assetId: string } }) {
  const assetId = params.assetId.toUpperCase();
  const assetDetails: { [key: string]: any } = {};
  assetDetailsList.forEach(asset => {
      assetDetails[asset.ticker] = { name: asset.name, icon: asset.icon, basePrice: asset.price };
  });

  const [asset, setAsset] = useState<any>(null);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>('1H');
  const [priceHistory, setPriceHistory] = useState<{time: string; value: number}[]>([]);
  const [initialAction, setInitialAction] = useState('buy');
  const [isClient, setIsClient] = useState(false);
  const { simulation } = useSimulation();

  useEffect(() => {
    setIsClient(true);
    if (assetDetails[assetId]) {
      const details = assetDetails[assetId];
      setAsset(details);
      setPrice(details.basePrice);
    }

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const action = searchParams.get('action');
      if (action === 'buy' || action === 'sell') {
        setInitialAction(action);
      }
    }
  }, [assetId]);
  
  const generateHistoricalData = useCallback((range: TimeRange, basePrice: number) => {
    const now = new Date();
    let dataPoints = 0;
    let interval = 0;
    let volatility = 0.0;

    switch(range) {
        case '1H': dataPoints = 60; interval = 60 * 1000; volatility = 0.1; break;
        case '1D': dataPoints = 96; interval = 15 * 60 * 1000; volatility = 0.5; break;
        case '1W': dataPoints = 84; interval = 2 * 60 * 60 * 1000; volatility = 1.5; break;
        case '1Y': dataPoints = 52; interval = 7 * 24 * 60 * 60 * 1000; volatility = 5; break;
    }

    let lastPrice = basePrice;
    const history = Array.from({ length: dataPoints }, (_, i) => {
        const randomFactor = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = lastPrice * (1 + randomFactor / 100);
        lastPrice = newPrice > 0 ? newPrice : lastPrice;
        const time = new Date(now.getTime() - (dataPoints - i - 1) * interval);

        const formatTime = (date: Date) => {
            switch(timeRange) {
                case '1H': return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                case '1D': return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                case '1W': return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                case '1Y': return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
                default: return date.toLocaleTimeString();
            }
        };

        return { time: formatTime(time), value: lastPrice };
    });
    
    setPriceHistory(history);
    if(history.length > 0) {
        setPrice(history[history.length - 1].value);

        const startPrice = history[0]?.value || 0;
        const endPrice = history[history.length - 1]?.value || 0;
        const newChange = startPrice > 0 ? ((endPrice - startPrice) / startPrice) * 100 : 0;
        setChange(newChange);
    }
  }, [timeRange]);


  useEffect(() => {
    if (asset) {
        generateHistoricalData(timeRange, asset.basePrice);
    }
  }, [timeRange, asset, generateHistoricalData]);
  
  useEffect(() => {
    if (timeRange !== '1H' || !asset || !isClient) return;

    const interval = setInterval(() => {
      setPriceHistory(prevHistory => {
        if (prevHistory.length === 0) return [];
        const lastPrice = prevHistory[prevHistory.length - 1].value;
        const randomFactor = (Math.random() - 0.5) * 0.2;
        const newPriceValue = Math.max(0, lastPrice * (1 + randomFactor / 100));
        
        const now = new Date();
        const newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newHistory = [...prevHistory.slice(1), { time: newTime, value: newPriceValue }];
        
        const startPrice = newHistory[0]?.value || 0;
        const endPrice = newHistory[newHistory.length - 1]?.value || 0;
        const newChange = startPrice > 0 ? ((endPrice - startPrice) / startPrice) * 100 : 0;
        setChange(newChange);
        setPrice(endPrice);

        return newHistory;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, [timeRange, asset, isClient]);

  if (!asset || !isClient) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading Asset...</p>
      </div>
    );
  }
  
  const ownedAsset = simulation.holdings.find(h => h.ticker === assetId);

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
           <Card>
             <CardHeader>
                <div className="flex items-baseline gap-4">
                    <p className="text-4xl font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <div className={`flex items-center gap-1 ${change >= 0 ? 'positive' : 'negative'}`}>
                        {change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        <span className="font-medium">{change.toFixed(2)}%</span>
                    </div>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="h-[400px] w-full">
                    {priceHistory.length > 0 ? (
                        <ClientLineChart
                            data={priceHistory}
                            dataKey="value"
                            xAxisKey="time"
                        />
                    ) : <Skeleton className="h-full w-full" />}
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
                <Tabs defaultValue={initialAction} value={initialAction} onValueChange={(value) => setInitialAction(value)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="p-6">
                    <TradeForm key="buy" action="Buy" assetTicker={assetId.toUpperCase()} price={price} />
                    </TabsContent>
                    <TabsContent value="sell" className="p-6">
                    <TradeForm key="sell" action="Sell" assetTicker={assetId.toUpperCase()} price={price} ownedQuantity={ownedAsset?.quantity ?? 0} />
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function TradeForm({ action, assetTicker, price, ownedQuantity = 0 }: { action: 'Buy' | 'Sell', assetTicker: string, price: number, ownedQuantity?: number }) {
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const { toast } = useToast();
  const { simulation, buyAsset, sellAsset } = useSimulation();
  const { balance } = simulation;

  useEffect(() => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setTotal(numericAmount * price);
    } else {
      setTotal(0);
    }
  }, [amount, price]);

  const handleTransaction = () => {
    const numericAmount = parseFloat(amount);
    if (!amount || numericAmount <= 0) return;

    if (action === 'Buy') {
        buyAsset(assetTicker, numericAmount, price);
    } else {
        sellAsset(assetTicker, numericAmount, price);
    }

    toast({
      title: `Order Successful`,
      description: `${action === 'Buy' ? 'Bought' : 'Sold'} ${numericAmount.toLocaleString()} ${assetTicker} for $${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      variant: action === 'Buy' ? 'default' : 'destructive',
    });
    setAmount('');
  }

  const isSellDisabled = action === 'Sell' && (parseFloat(amount) > ownedQuantity);

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
          { action === 'Sell' && (
             <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Owned Quantity</span>
              <span className="font-mono font-medium">{ownedQuantity.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Total</span>
            <span className="font-mono font-medium">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </CardContent>
      </Card>

      <Button 
        className={`w-full text-lg h-12 font-bold`}
        variant={action === 'Buy' ? 'default' : 'destructive'}
        onClick={handleTransaction}
        disabled={!amount || parseFloat(amount) <= 0 || (action === 'Buy' && total > balance) || isSellDisabled}
      >
        {isSellDisabled ? 'Not enough holdings' : (action === 'Buy' && total > balance) ? 'Insufficient funds' : `${action} ${assetTicker}`}
      </Button>
    </div>
  )
}
