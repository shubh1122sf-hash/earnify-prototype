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
import { AppPieChart } from "@/components/pie-chart";

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

const chartData = portfolio.holdings.map(h => ({ name: h.ticker, value: h.value, fill: h.ticker === 'BTC' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))'  }));

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Portfolio</h1>
      </div>


      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Performance</CardTitle>
            </CardHeader>
             <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                    <p className="text-3xl font-bold">${portfolio.totalBalance.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Profit & Loss</p>
                    <p className={`text-3xl font-bold ${portfolio.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {portfolio.totalPnl >= 0 ? '+' : '-'}${Math.abs(portfolio.totalPnl).toLocaleString()}
                    </p>
                </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <AppPieChart data={chartData} />
          </CardContent>
        </Card>
      </div>


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
