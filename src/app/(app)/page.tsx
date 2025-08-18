
'use client';

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const initialAssets = [
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'Technology' , volume: '2.1M'},
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'Automotive' , volume: '3.5M'},
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: 'https://placehold.co/40x40.png?text=N', type: 'Stock', sector: 'Technology' , volume: '5.2M'},
    { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 175.61, change: 0.8, icon: 'https://placehold.co/40x40.png?text=G', type: 'Stock', sector: 'Technology' , volume: '1.8M'},
    { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 185.57, change: -1.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'E-commerce' , volume: '2.5M'},
    { name: 'Microsoft Corp', ticker: 'MSFT', price: 442.57, change: 1.2, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock', sector: 'Technology' , volume: '1.9M'},
    { name: 'Reliance Industries', ticker: 'RELIANCE', price: 2885.50, change: 2.1, icon: 'https://placehold.co/40x40.png?text=R', type: 'Stock', sector: 'Conglomerate' , volume: '4.1M'},
    { name: 'Tata Consultancy', ticker: 'TCS', price: 3825.10, change: -0.8, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'IT Services' , volume: '1.5M'},
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1665.80, change: 1.5, icon: 'https://placehold.co/40x40.png?text=H', type: 'Stock', sector: 'Banking' , volume: '3.8M'},
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: 'https://placehold.co/40x40.png?text=B', type: 'Crypto', sector: 'Digital Asset', volume: '15.2B' },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: 'https://placehold.co/40x40.png?text=E', type: 'Crypto', sector: 'Digital Asset', volume: '8.1B' },
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: 'https://placehold.co/40x40.png?text=S', type: 'Crypto', sector: 'Digital Asset', volume: '2.5B' },
];

const mentorTips = [
    "Josh says: 'The tech sector is showing strong momentum - consider adding growth stocks to your portfolio.'",
    "Marshall advises: 'Don't put all your eggs in one basket. Diversify across at least 5 sectors.'",
    "Purav notes: 'Check the company's debt-to-equity ratio before investing. Less than 1 is ideal.'",
    "Ken suggests: 'Market is fearful today - great buying opportunities for long-term investors.'",
];


export default function MarketPage() {
  const [assets, setAssets] = useState(initialAssets);
  const [marketEvent, setMarketEvent] = useState<string | null>(null);
  const [rollingTip, setRollingTip] = useState(mentorTips[0]);

  useEffect(() => {
    // Price update interval
    const priceInterval = setInterval(() => {
      let isMarketEvent = false;
      
      // 5% chance of a market event on each tick
      if (Math.random() < 0.05) {
        isMarketEvent = true;
        const eventMessages = [
            "Market Alert: Volatility spike detected!",
            "Breaking News: Sector-wide movement happening now!",
            "Quick! Market event in progress - trade opportunities available!",
        ];
        setMarketEvent(eventMessages[Math.floor(Math.random() * eventMessages.length)]);
        setTimeout(() => setMarketEvent(null), 5000); // Event lasts 5 seconds
      }

      setAssets(prevAssets => 
        prevAssets.map(asset => {
          // During market events, make bigger changes
          const volatility = isMarketEvent ? 5 : 0.5; // 5% volatility during event, 0.5% otherwise
          const randomFactor = (Math.random() - 0.5) * volatility; 
          const newPrice = Math.max(0, asset.price * (1 + randomFactor / 100));
          const newChange = ((newPrice - asset.price) / asset.price) * 100;
          
          return { ...asset, price: newPrice, change: asset.change + newChange };
        })
      );
    }, 3000); // Update every 3 seconds

    // Rolling tip interval
    const tipInterval = setInterval(() => {
        setRollingTip(mentorTips[Math.floor(Math.random() * mentorTips.length)])
    }, 6000);

    return () => {
        clearInterval(priceInterval);
        clearInterval(tipInterval);
    }
  }, []);

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Stock Market</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Search stocks..." className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
        </div>
        
        {marketEvent ? (
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200 flex items-center market-event">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div className="flex-1">
                    <span className="text-sm font-medium text-red-800">{marketEvent}</span>
                </div>
            </div>
        ) : (
             <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center">
                <Info className="h-5 w-5 text-yellow-500 mr-3" />
                <div className="flex-1">
                    <span className="text-sm text-yellow-800 transition-opacity duration-300">{rollingTip}</span>
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
