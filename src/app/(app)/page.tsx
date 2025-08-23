
'use client';

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { initialAssets as assetList } from "@/lib/assets";
import { Button } from "@/components/ui/button";

type AssetFilter = 'All' | 'Stock' | 'Crypto';

export default function MarketPage() {
  const [assets, setAssets] = useState(assetList);
  const [filter, setFilter] = useState<AssetFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setAssets(prevAssets => 
        prevAssets.map(asset => {
          const baseVolatility = asset.volatility;
          let momentum = asset.momentum * 0.9 + (Math.random() - 0.5) * 0.2;
          
          const meanReversionForce = (assetList.find(a => a.ticker === asset.ticker)!.price - asset.price) / asset.price * 0.01;

          const fameFactor = asset.isFamous && Math.random() < 0.7 ? -0.1 * baseVolatility : 0;
          
          const randomFactor = (Math.random() - 0.5) * baseVolatility * 1.5;
          
          const priceChangePercent = momentum + meanReversionForce + randomFactor + fameFactor;
          
          const newPrice = Math.max(0.01, asset.price * (1 + priceChangePercent / 100));
          const newChange = ((newPrice - asset.price) / asset.price) * 100;
          
          const updatedMomentum = Math.max(-0.5, Math.min(0.5, momentum + newChange / 10));

          return { ...asset, price: newPrice, change: newChange, momentum: updatedMomentum };
        })
      );
    }, 2500);

    return () => {
        clearInterval(priceInterval);
    }
  }, []);

  const filteredAssets = assets
    .filter(asset => {
        if (filter === 'All') return true;
        if (filter === 'Stock') return asset.type === 'Stock';
        if (filter === 'Crypto') return asset.type === 'Crypto';
        return true;
    })
    .filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  if (!isClient) {
      return null;
  }

  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-800">Stock Market</h2>
                <Button variant={filter === 'All' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('All')}>All</Button>
                <Button variant={filter === 'Stock' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('Stock')}>Stocks</Button>
                <Button variant={filter === 'Crypto' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('Crypto')}>Crypto</Button>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <Link href={`/trade/${asset.ticker}`} key={asset.ticker}>
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{asset.ticker}</h3>
                    <p className="text-sm text-gray-600">{asset.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">${asset.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center justify-end gap-1 ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                      {asset.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {asset.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{asset.sector}</span>
                  <span>Vol: {asset.volume}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
