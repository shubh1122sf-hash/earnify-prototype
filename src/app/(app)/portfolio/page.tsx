
'use client';

import { AppPieChart } from "@/components/pie-chart";
import { Progress } from "@/components/ui/progress";

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
    { name: "Apple Inc.", ticker: "AAPL", quantity: 10, avgPrice: 150.00, price: 195.89 },
    { name: "Tesla, Inc.", ticker: "TSLA", quantity: 5, avgPrice: 200.00, price: 183.01 },
    { name: "NVIDIA Corp", ticker: "NVDA", quantity: 20, avgPrice: 100.00, price: 121.79 },
    { name: "Bitcoin", ticker: "BTC", quantity: 0.1, avgPrice: 60000, price: 67123.45 },
    { name: "Ethereum", ticker: "ETH", quantity: 2, avgPrice: 3000, price: 3456.78 },
  ],
};

const chartData = portfolio.holdings.map((h) => ({ 
    name: h.ticker, 
    value: h.quantity * h.price 
}));

export default function PortfolioPage() {
  return (
    <div>
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
            <AppPieChart data={chartData} className="h-[200px] w-full" />
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

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Holdings</h3>
        <div className="overflow-x-auto">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {portfolio.holdings.map((asset) => {
                        const currentValue = asset.quantity * asset.price;
                        const investment = asset.quantity * asset.avgPrice;
                        const pnl = currentValue - investment;
                        const pnlPercent = investment !== 0 ? (pnl / investment) * 100 : 0;
                        const pnlClass = pnl >= 0 ? "positive" : "negative";
                        const pnlSign = pnl >= 0 ? "+" : "";

                        return (
                            <tr key={asset.ticker} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-primary font-medium">{asset.name.charAt(0)}</span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                        <div className="text-sm text-gray-500">{asset.ticker}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${asset.avgPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${asset.price.toFixed(2)}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${pnlClass}`}>
                                {pnlSign}${Math.abs(pnl).toFixed(2)} ({pnlSign}{Math.abs(pnlPercent).toFixed(2)}%)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${currentValue.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  );
}
