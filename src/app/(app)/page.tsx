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
import { AppLineChart } from "@/components/line-chart";
import { Bitcoin, Waves, LandPlot, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const marketData = {
  bitcoin: {
    price: 67123.45,
    change: 2.5,
  },
  ethereum: {
    price: 3456.78,
    change: -1.2,
  },
};

const chartData = [
  { month: "Jan", value: 35000 },
  { month: "Feb", value: 42000 },
  { month: "Mar", value: 58000 },
  { month: "Apr", value: 55000 },
  { month: "May", value: 62000 },
  { month: "Jun", value: 67123 },
];

const assets = [
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: <Bitcoin className="h-6 w-6 text-orange-400" />, type: 'Crypto' },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: <Waves className="h-6 w-6 text-gray-400" />, type: 'Crypto' },
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: <Waves className="h-6 w-6 text-purple-500" />, type: 'Crypto' },
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: <Briefcase className="h-6 w-6 text-gray-500" />, type: 'Stock' },
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: <Briefcase className="h-6 w-6 text-red-600" />, type: 'Stock' },
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: <Briefcase className="h-6 w-6 text-green-500" />, type: 'Stock' },
];

export default function MarketPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Market Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bitcoin</CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData.bitcoin.price.toLocaleString()}</div>
            <p className={`text-xs ${marketData.bitcoin.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {marketData.bitcoin.change > 0 ? "+" : ""}{marketData.bitcoin.change}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ethereum</CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData.ethereum.price.toLocaleString()}</div>
            <p className={`text-xs ${marketData.ethereum.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {marketData.ethereum.change > 0 ? "+" : ""}{marketData.ethereum.change}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AppLineChart 
          title="Bitcoin Price (USD)"
          description="Last 6 months"
          data={chartData}
          dataKey="value"
          xAxisKey="month"
          footerText="Trending up by 5.2% this month"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
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
              {assets.map((asset) => (
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
                    ${asset.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={asset.change > 0 ? "default" : "destructive"} className={`${asset.change > 0 ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                      {asset.change > 0 ? "+" : ""}{asset.change}%
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