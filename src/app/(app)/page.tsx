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
import { Bitcoin, Waves } from "lucide-react";

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

const topMovers = [
  {
    name: "Solana",
    ticker: "SOL",
    price: 150.25,
    change: 12.5,
    icon: <Waves className="h-6 w-6 text-purple-500" />,
  },
  {
    name: "Cardano",
    ticker: "ADA",
    price: 0.45,
    change: 8.2,
    icon: <Waves className="h-6 w-6 text-blue-400" />,
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    price: 35.6,
    change: -5.1,
    icon: <Waves className="h-6 w-6 text-red-500" />,
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    price: 0.15,
    change: 22.3,
    icon: <Waves className="h-6 w-6 text-yellow-500" />,
  },
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
          <CardTitle>Top Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topMovers.map((asset) => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {asset.icon}
                      <span className="font-medium">{asset.name}</span>
                      <span className="text-muted-foreground">{asset.ticker}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${asset.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={asset.change > 0 ? "default" : "destructive"} className={`${asset.change > 0 ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                      {asset.change > 0 ? "+" : ""}{asset.change}%
                    </Badge>
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
