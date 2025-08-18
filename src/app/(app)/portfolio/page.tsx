
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
import { Progress } from "@/components/ui/progress";
import { AppPieChart } from "@/components/pie-chart";
import { Button } from "@/components/ui/button";

const portfolio = {
  totalBalance: 52345.67,
  totalPnl: 2345.67,
  totalPnlPercent: 4.69,
  todayPnl: 123.56,
  todayPnlPercent: 75,
  weekPnl: 1456.78,
  weekPnlPercent: 60,
  monthPnl: 2678.90,
  monthPnlPercent: 45,
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
     {
      name: "Bajaj Finance",
      ticker: "BAJFINANCE",
      quantity: 10,
      avgPrice: 7000.00,
      price: 7150.90,
    },
    {
      name: "Reliance Industries",
      ticker: "RELIANCE",
      quantity: 8,
      avgPrice: 2400.00,
      price: 2450.75,
    }
  ],
};

const chartData = portfolio.holdings.map((h) => ({ 
    name: h.ticker, 
    value: h.quantity * h.price 
}));


export default function PortfolioPage() {

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Your Portfolio</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Value</h3>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-bold text-gray-800">${portfolio.totalBalance.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total value</div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold positive">+${portfolio.totalPnl.toLocaleString()}</div>
                    <div className="text-sm positive">+{portfolio.totalPnlPercent.toFixed(2)}%</div>
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
                        <span className="font-medium positive">+${portfolio.todayPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={portfolio.todayPnlPercent} className="h-2 mt-1" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Week's P&L</span>
                        <span className="font-medium positive">+${portfolio.weekPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={portfolio.weekPnlPercent} className="h-2 mt-1" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Month's P&L</span>
                        <span className="font-medium positive">+${portfolio.monthPnl.toLocaleString()}</span>
                    </div>
                    <Progress value={portfolio.monthPnlPercent} className="h-2 mt-1" />
                </div>
            </div>
        </div>
    </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                {portfolio.holdings.map((asset) => {
                    const currentValue = asset.quantity * asset.price;
                    const investment = asset.quantity * asset.avgPrice;
                    const pnl = currentValue - investment;
                    const pnlPercent = investment !== 0 ? (pnl / investment) * 100 : 0;
                    const pnlClass = pnl >= 0 ? "positive" : "negative";
                    const pnlSign = pnl >= 0 ? "+" : "";

                    return (
                        <TableRow key={asset.ticker} className="hover:bg-gray-50">
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-600 font-medium">{asset.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                    <div className="text-sm text-gray-500">{asset.ticker}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.quantity}</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${asset.avgPrice.toFixed(2)}</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${asset.price.toFixed(2)}</TableCell>
                        <TableCell className={`px-6 py-4 whitespace-nowrap text-sm ${pnlClass}`}>
                            {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${currentValue.toFixed(2)}</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="link" className="text-indigo-600 hover:text-indigo-900 p-0 mr-3">Buy</Button>
                            <Button variant="link" className="text-red-600 hover:text-red-900 p-0">Sell</Button>
                        </TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
