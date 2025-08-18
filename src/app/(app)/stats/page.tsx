
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, DollarSign, BarChart2, TrendingUp } from "lucide-react";
import { AppLineChart } from "@/components/line-chart";

const statsCards = [
    {
        title: "Total Volume Traded",
        value: "$1.2B",
        change: "+12.5%",
        icon: DollarSign
    },
    {
        title: "Active Users",
        value: "12,345",
        change: "+201 this week",
        icon: Users
    },
    {
        title: "Total Trades",
        value: "5,432,109",
        change: "+5.2% this month",
        icon: BarChart2
    },
    {
        title: "Market Cap",
        value: "$2.3T",
        change: "+2.1%",
        icon: TrendingUp
    }
]

const volumeData = [
    { date: "2024-01", Volume: 200000000 },
    { date: "2024-02", Volume: 350000000 },
    { date: "2024-03", Volume: 500000000 },
    { date: "2024-04", Volume: 450000000 },
    { date: "2024-05", Volume: 700000000 },
    { date: "2024-06", Volume: 1200000000 },
]

const userData = [
    { date: "2024-01", Users: 8000 },
    { date: "2024-02", Users: 9500 },
    { date: "2024-03", Users: 10000 },
    { date: "2024-04", Users: 10500 },
    { date: "2024-05", Users: 11500 },
    { date: "2024-06", Users: 12345 },
]

export default function StatsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Platform Statistics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
            <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardContent className="p-6">
              <div className="h-[400px] w-full">
                <AppLineChart
                    title="Trading Volume"
                    description="Monthly trading volume across the platform."
                    data={volumeData}
                    dataKey="Volume"
                    xAxisKey="date"
                    footerText="Volume is increasing"
                />
              </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <AppLineChart
                      title="User Growth"
                      description="Active users on the platform over time."
                      data={userData}
                      dataKey="Users"
                      xAxisKey="date"
                      footerText="Steady user acquisition"
                  />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
