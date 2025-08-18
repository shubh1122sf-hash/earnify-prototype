
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/progress";
import { AppPieChart } from "@/components/pie-chart";
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
    const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    return { name: h.ticker, value: h.quantity * h.price, fill: colors[index % colors.length]  }
});


export default function PortfolioPage() {

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-800">Your Portfolio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Value</h3>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-bold text-gray-800">${portfolio.totalBalance.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total value</div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold text-green-500">+${portfolio.totalPnl.toLocaleString()}</div>
                    <div className="text-sm text-green-500">+{portfolio.totalPnlPercent.toFixed(2)}%</div>
                </div>
            </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Allocation</h3>
            <div className="h-[200px] w-[200px] mx-auto">
                <AppPieChart data={chartData} />
            </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance</h3>
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Today's P&L</span>
                        <span className="font-medium text-green-500">+${portfolio.todayPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={(portfolio.todayPnl / portfolio.totalBalance) * 100} className="h-2 mt-1 bg-gray-200 [&>*]:bg-green-500" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Week's P&L</span>
                        <span className="font-medium text-green-500">+${portfolio.weekPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={(portfolio.weekPnl / portfolio.totalBalance) * 100} className="h-2 mt-1 bg-gray-200 [&>*]:bg-green-500" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Month's P&L</span>
                        <span className="font-medium text-green-500">+${portfolio.monthPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={(portfolio.monthPnl / portfolio.totalBalance) * 100} className="h-2 mt-1 bg-gray-200 [&>*]:bg-green-500" />
                </div>
            </div>
        </div>
    </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Value</TableHead>
                <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map((asset) => {
                const currentValue = asset.quantity * asset.price;
                const investment = asset.quantity * asset.avgPrice;
                const pnl = currentValue - investment;
                const pnlPercent = (pnl / investment) * 100;
                const pnlClass = pnl >= 0 ? "text-green-500" : "text-red-500";
                const pnlSign = pnl >= 0 ? "+" : "";

                return (
                    <TableRow key={asset.ticker}>
                    <TableCell>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.ticker}</div>
                    </TableCell>
                    <TableCell>{asset.quantity}</TableCell>
                    <TableCell>${asset.avgPrice.toFixed(2)}</TableCell>
                    <TableCell>${asset.price.toFixed(2)}</TableCell>
                    <TableCell className={pnlClass}>
                        {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                    </TableCell>
                    <TableCell>${currentValue.toFixed(2)}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900">Buy</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">Sell</Button>
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

    