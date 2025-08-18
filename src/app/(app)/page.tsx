
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bitcoin, Waves, Briefcase, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialAssets = [
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock' },
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock' },
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: 'https://placehold.co/40x40.png?text=N', type: 'Stock' },
    { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 175.61, change: 0.8, icon: 'https://placehold.co/40x40.png?text=G', type: 'Stock' },
    { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 185.57, change: -1.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock' },
    { name: 'Microsoft Corp', ticker: 'MSFT', price: 442.57, change: 1.2, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock' },
    { name: 'Reliance Industries', ticker: 'RELIANCE', price: 2885.50, change: 2.1, icon: 'https://placehold.co/40x40.png?text=R', type: 'Stock' },
    { name: 'Tata Consultancy', ticker: 'TCS', price: 3825.10, change: -0.8, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock' },
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1665.80, change: 1.5, icon: 'https://placehold.co/40x40.png?text=H', type: 'Stock' },
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: 'https://placehold.co/40x40.png?text=B', type: 'Crypto' },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: 'https://placehold.co/40x40.png?text=E', type: 'Crypto' },
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: 'https://placehold.co/40x40.png?text=S', type: 'Crypto' },
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
        <p className="text-muted-foreground">
          Explore and trade assets. Prices are updated in real-time.
        </p>
      </div>
      
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
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.ticker} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={asset.icon} alt={asset.name} />
                        <AvatarFallback>{asset.ticker.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{asset.name}</span>
                        <span className="ml-2 text-muted-foreground">{asset.ticker}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`flex items-center justify-end gap-1 font-medium ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{asset.change.toFixed(2)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/trade/${asset.ticker}`}>
                      <Button size="sm" variant="ghost">
                        Trade
                        <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
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
