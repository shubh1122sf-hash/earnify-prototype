
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const leaderboardData = [
  { rank: 1, user: "TraderPro", profit: 12500, trades: 87, winRate: 72, avatar: "https://placehold.co/40x40.png?text=T" },
  { rank: 2, user: "MarketWizard", profit: 11800, trades: 65, winRate: 78, avatar: "https://placehold.co/40x40.png?text=M" },
  { rank: 3, user: "BullRider", profit: 11200, trades: 92, winRate: 68, avatar: "https://placehold.co/40x40.png?text=B" },
  { rank: 4, user: "AlphaHunter", profit: 10500, trades: 78, winRate: 75, avatar: "https://placehold.co/40x40.png?text=A" },
  { rank: 5, user: "RiskMaster", profit: 9800, trades: 56, winRate: 82, avatar: "https://placehold.co/40x40.png?text=R" },
  { rank: 6, user: "TrendSetter", profit: 9200, trades: 72, winRate: 70, avatar: "https://placehold.co/40x40.png?text=T" },
];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <h2 className="text-xl font-bold text-gray-800 mb-6">Leaderboard</h2>
      
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                  <h3 className="font-medium text-gray-800">Your Rank</h3>
                  <p className="text-gray-600">You are currently ranked <span className="font-semibold text-primary">#97</span> with a profit of <span className="font-semibold positive">$2,345.67</span></p>
              </div>
          </div>
      </div>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Rank</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trader</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Profit</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trades</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell className="py-4 pl-4 pr-3 whitespace-nowrap text-sm font-medium text-gray-900">{entry.rank}</TableCell>
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                       <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{entry.user}</div>
                      </div>
                    </div>
                  </TableCell>
                   <TableCell className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm positive">+${entry.profit.toLocaleString()}</div>
                    </TableCell>
                  <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{entry.trades}</TableCell>
                   <TableCell className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <Progress value={entry.winRate} className="w-24 h-1.5 mr-2" />
                            <span className="text-sm text-gray-600">{entry.winRate}%</span>
                        </div>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}
