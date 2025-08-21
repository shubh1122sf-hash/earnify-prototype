
'use client';

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { initialAssets as assetList } from "@/lib/assets";

const mentorTips = [
    "Josh says: 'The tech sector is showing strong momentum. Time to hunt for growth stocks!'",
    "Marshall advises: 'Diversification is key. Spread your investments across at least 5 different sectors to minimize risk.'",
    "Purav notes: 'Look for companies with a low debt-to-equity ratio. A healthy balance sheet is a good sign.'",
    "Ken suggests: 'When the market is fearful, be greedy. Look for long-term buying opportunities in solid companies.'",
    "Josh says: 'Keep an eye on trading volume. A sudden spike can indicate a potential price move.'",
    "Marshall advises: 'Don't invest in what you don't understand. Do your research before buying any asset.'",
    "Purav notes: 'Check the news! Macroeconomic events can have a huge impact on the entire market.'",
    "Ken suggests: 'Set stop-loss orders to protect your capital from significant downturns.'",
];

type Tip = {
    id: number;
    text: string;
    position: { top: number; left: number; };
};

export default function MarketPage() {
  const [assets, setAssets] = useState(assetList);
  const [marketEvent, setMarketEvent] = useState<string | null>(null);
  const [activeTip, setActiveTip] = useState<Tip | null>(null);

  useEffect(() => {
    // Price update interval
    const priceInterval = setInterval(() => {
      let isMarketEvent = false;
      const sectorTrends: {[key: string]: number} = {};
      
      // 30% chance of a market event on each tick to make it more frequent
      if (Math.random() < 0.3) {
        isMarketEvent = true;
        const eventMessages = [
            "Market Alert: High volatility spike detected!",
            "Breaking News: Major sector-wide movement happening now!",
            "Urgent: Market event in progress - significant trade opportunities available!",
            "Flash Crash: Certain assets are experiencing rapid price drops!",
            "Bull Run: Broad market rally is pushing prices up!"
        ];
        setMarketEvent(eventMessages[Math.floor(Math.random() * eventMessages.length)]);
        setTimeout(() => setMarketEvent(null), 6000); // Event lasts 6 seconds

        // Determine random trends for a few sectors
        const sectors = [...new Set(assets.map(a => a.sector))];
        sectors.forEach(sector => {
            if(Math.random() < 0.4) { // 40% chance for a sector to have a trend
                sectorTrends[sector] = (Math.random() - 0.5) * 5; // Sector trend strength increased
            }
        });
      }

      setAssets(prevAssets => 
        prevAssets.map(asset => {
          const baseVolatility = asset.volatility;
          const eventVolatility = isMarketEvent ? 3.5 : 1; // Increased event volatility multiplier

          // Momentum: tends to continue in the same direction
          let momentum = asset.momentum * 0.9 + (Math.random() - 0.5) * 0.2; // Carry over 90% of momentum, add some randomness
          
          // Mean Reversion: tends to pull back to a baseline (we'll use initial price as a proxy)
          const initialPrice = assetList.find(a => a.ticker === asset.ticker)?.price || asset.price;
          const meanReversionForce = (initialPrice - asset.price) / initialPrice * 0.05; // Gentle pull towards the mean
          
          // Sector Trend
          const sectorTrend = sectorTrends[asset.sector] || 0;

          // Combine forces
          const randomFactor = (Math.random() - 0.5) * baseVolatility * eventVolatility;
          const priceChangePercent = momentum + meanReversionForce + randomFactor + sectorTrend;

          const newPrice = Math.max(0, asset.price * (1 + priceChangePercent / 100));
          const newChange = ((newPrice - asset.price) / asset.price) * 100;
          
          // Update momentum for next tick
          const updatedMomentum = Math.max(-1.5, Math.min(1.5, momentum + newChange / 10)); // Clamp momentum with a higher range

          return { ...asset, price: newPrice, change: asset.change + newChange, momentum: updatedMomentum };
        })
      );
    }, 2000); // Update every 2 seconds

    // Tip interval
    const tipInterval = setInterval(() => {
        const newTipText = mentorTips[Math.floor(Math.random() * mentorTips.length)];
        const newTip: Tip = {
            id: Date.now(),
            text: newTipText,
            position: {
                top: Math.random() * 60 + 15, // Position between 15% and 75% from top
                left: Math.random() * 70 + 15, // Position between 15% and 85% from left
            }
        };
        setActiveTip(newTip);
        setTimeout(() => {
            setActiveTip(prev => prev?.id === newTip.id ? null : prev);
        }, 5000); // Tip disappears after 5 seconds
    }, 10000); // New tip every 10 seconds

    return () => {
        clearInterval(priceInterval);
        clearInterval(tipInterval);
    }
  }, []);

  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Stock Market</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Search stocks..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
        </div>
        
        {marketEvent && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200 flex items-center market-event">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex-1">
                    <span className="text-sm font-medium text-red-800">{marketEvent}</span>
                </div>
            </div>
        )}

        {activeTip && (
             <div
                key={activeTip.id}
                className={cn(
                    "absolute z-20 p-4 max-w-xs w-full bg-card border-2 border-primary rounded-xl shadow-2xl transition-all duration-500",
                    "animate-in fade-in-0 zoom-in-95"
                )}
                style={{
                    top: `${activeTip.position.top}%`,
                    left: `${activeTip.position.left}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="flex items-start gap-3">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-foreground font-medium">{activeTip.text}</p>
                </div>
            </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
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
