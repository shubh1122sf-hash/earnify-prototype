import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Waves } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const portfolio = {
  totalBalance: 125345.89,
  totalPnl: 15230.32,
  holdings: [
    {
      name: "Bitcoin",
      ticker: "BTC",
      icon: <Bitcoin className="h-6 w-6 text-orange-400" />,
      quantity: 1.5,
      price: 67123.45,
      value: 100685.18,
      change: 2.5,
      allocation: 80.3,
    },
    {
      name: "Ethereum",
      ticker: "ETH",
      icon: <Waves className="h-6 w-6 text-gray-400" />,
      quantity: 7.1,
      price: 3456.78,
      value: 24660.68,
      change: -1.2,
      allocation: 19.7,
    },
  ],
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">My Portfolio</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>The current value of all your assets.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${portfolio.totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Profit & Loss</CardTitle>
            <CardDescription>Your overall portfolio performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${portfolio.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolio.totalPnl >= 0 ? '+' : '-'}${Math.abs(portfolio.totalPnl).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {portfolio.holdings.map(asset => (
                <div key={asset.ticker} className="space-y-1">
                    <div className="flex justify-between font-medium">
                        <span>{asset.name}</span>
                        <span>{asset.allocation}%</span>
                    </div>
                    <Progress value={asset.allocation} className="h-2" />
                </div>
            ))}
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map((asset) => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {asset.icon}
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{asset.quantity.toFixed(4)}</TableCell>
                  <TableCell className="text-right font-mono">${asset.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium font-mono">${asset.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={asset.change > 0 ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}>
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
