
'use client';

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bitcoin, Waves, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const initialAssets = [
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: <Briefcase className="h-6 w-6 text-gray-500" />, type: 'Stock' },
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: <Briefcase className="h-6 w-6 text-red-600" />, type: 'Stock' },
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: <Briefcase className="h-6 w-6 text-green-500" />, type: 'Stock' },
    { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 175.61, change: 0.8, icon: <Briefcase className="h-6 w-6 text-blue-500" />, type: 'Stock' },
    { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 185.57, change: -1.1, icon: <Briefcase className="h-6 w-6 text-yellow-500" />, type: 'Stock' },
    { name: 'Microsoft Corp', ticker: 'MSFT', price: 442.57, change: 1.2, icon: <Briefcase className="h-6 w-6 text-sky-500" />, type: 'Stock' },
    { name: 'Reliance Industries', ticker: 'RELIANCE', price: 2885.50, change: 2.1, icon: <Briefcase className="h-6 w-6 text-blue-800" />, type: 'Stock' },
    { name: 'TCS', ticker: 'TCS', price: 3825.10, change: -0.8, icon: <Briefcase className="h-6 w-6 text-indigo-600" />, type: 'Stock' },
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1665.80, change: 1.5, icon: <Briefcase className="h-6 w-6 text-red-700" />, type: 'Stock' },
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: <Bitcoin className="h-6 w-6 text-orange-400" />, type: 'Crypto' },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: <Waves className="h-6 w-6 text-gray-400" />, type: 'Crypto' },
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: <Waves className="h-6 w-6 text-purple-500" />, type: 'Crypto' },
];

export default function MarketPage() {
  const [assets, setAssets] = useState(initialAssets);
  const [assetType, setAssetType] = useState<'Stock' | 'Crypto'>('Stock');

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets => 
        prevAssets.map(asset => {
          const isRareEvent = Math.random() < 0.01; // 1% chance of a big jump/drop
          let randomFactor;

          if (isRareEvent) {
            randomFactor = (Math.random() - 0.5) * 20; // -10% to +10%
          } else {
            randomFactor = (Math.random() - 0.5) * 4; // -2% to +2%
          }

          const newPrice = Math.max(0, asset.price * (1 + randomFactor / 100));
          const newChange = ((newPrice - asset.price) / asset.price) * 100;
          
          return { ...asset, price: newPrice, change: newChange };
        })
      );
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter(asset => asset.type === assetType);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Market Overview</h1>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assets</CardTitle>
           <div className="flex gap-2">
            <Button 
                variant={assetType === 'Stock' ? 'default' : 'outline'} 
                onClick={() => setAssetType('Stock')}
            >
                Stocks
            </Button>
            <Button 
                variant={assetType === 'Crypto' ? 'default' : 'outline'}
                onClick={() => setAssetType('Crypto')}
            >
                Crypto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {asset.icon}
                      <span className="font-medium">{asset.name}</span>
                      <span className="text-muted-foreground">{asset.ticker}</span>
                    </div>
                  </TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={asset.change >= 0 ? "default" : "destructive"} className={`${asset.change >= 0 ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                      {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/trade/${asset.ticker}?action=buy`}>
                      <Button size="sm" variant="outline" className="text-green-500 border-green-500 hover:bg-green-500/10 hover:text-green-600">Buy</Button>
                    </Link>
                    <Link href={`/trade/${asset.ticker}?action=sell`}>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10 hover:text-red-600">Sell</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
