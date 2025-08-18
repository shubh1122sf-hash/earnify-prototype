
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
import { Progress } from "@/components/ui/progress";
import { AppPieChart } from "@/components/pie-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const portfolio = {
  totalBalance: 52345.67,
  totalPnl: 2345.67,
  totalPnlPercent: 4.69,
  todayPnl: 1234.56,
  weekPnl: 3456.78,
  monthPnl: 5678.90,
  holdings: [
    {
      name: "Tata Steel",
      ticker: "TATASTEEL",
      quantity: 25,
      avgPrice: 142.30,
      price: 145.60,
    },
    {
      name: "ITC Ltd",
      ticker: "ITC",
      quantity: 15,
      avgPrice: 420.50,
      price: 425.75,
    },
    {
      name: "Asian Paints",
      ticker: "ASIANPAINT",
      quantity: 5,
      avgPrice: 3400.00,
      price: 3450.20,
    },
  ],
};

const chartData = portfolio.holdings.map((h, index) => {
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    return { name: h.ticker, value: h.quantity * h.price, fill: colors[index % colors.length]  }
});


export default function PortfolioPage() {
  const totalInvestment = portfolio.holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Your Portfolio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">${portfolio.totalBalance.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total value</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">+${portfolio.totalPnl.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{portfolio.totalPnlPercent.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Allocation</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
             <AppPieChart data={chartData} />
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
           <CardHeader>
            <CardTitle className="text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Today's P&L</span>
                  <span className="font-medium text-green-600">+${portfolio.todayPnl.toLocaleString()}</span>
                </div>
                <Progress value={(portfolio.todayPnl / portfolio.totalBalance) * 100} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Week's P&L</span>
                  <span className="font-medium text-green-600">+${portfolio.weekPnl.toLocaleString()}</span>
                </div>
                <Progress value={(portfolio.weekPnl / portfolio.totalBalance) * 100} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Month's P&L</span>
                  <span className="font-medium text-green-600">+${portfolio.monthPnl.toLocaleString()}</span>
                </div>
                <Progress value={(portfolio.monthPnl / portfolio.totalBalance) * 100} className="h-2 mt-1" />
              </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map((asset) => {
                const currentValue = asset.quantity * asset.price;
                const investment = asset.quantity * asset.avgPrice;
                const pnl = currentValue - investment;
                const pnlPercent = (pnl / investment) * 100;
                const pnlClass = pnl >= 0 ? "text-green-600" : "text-red-600";
                const pnlSign = pnl >= 0 ? "+" : "";

                return (
                    <TableRow key={asset.ticker}>
                    <TableCell>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                    </TableCell>
                    <TableCell>{asset.quantity}</TableCell>
                    <TableCell>${asset.avgPrice.toFixed(2)}</TableCell>
                    <TableCell>${asset.price.toFixed(2)}</TableCell>
                    <TableCell className={pnlClass}>
                        {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                    </TableCell>
                    <TableCell>${currentValue.toFixed(2)}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">Buy</Button>
                        <Button variant="outline" size="sm">Sell</Button>
                    </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
