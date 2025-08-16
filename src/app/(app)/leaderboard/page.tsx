import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, user: "Alex Crypto", portfolioValue: 250123.45, weeklyGain: 15.2, avatar: "https://placehold.co/40x40.png?text=A" },
  { rank: 2, user: "Sarah Stocks", portfolioValue: 245678.90, weeklyGain: 12.8, avatar: "https://placehold.co/40x40.png?text=S" },
  { rank: 3, user: "Bitcoin Barry", portfolioValue: 230500.00, weeklyGain: 22.5, avatar: "https://placehold.co/40x40.png?text=B" },
  { rank: 4, user: "Diamond Hands", portfolioValue: 215000.75, weeklyGain: -2.1, avatar: "https://placehold.co/40x40.png?text=D" },
  { rank: 5, user: "ETF Emily", portfolioValue: 210100.25, weeklyGain: 8.9, avatar: "https://placehold.co/40x40.png?text=E" },
  { rank: 6, user: "Moonshot Mike", portfolioValue: 198000.00, weeklyGain: 35.0, avatar: "https://placehold.co/40x40.png?text=M" },
];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Traders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Portfolio Value</TableHead>
                <TableHead className="text-right">Weekly Gain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell>
                    <div className="flex items-center justify-center font-bold text-lg">
                      {entry.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500 mr-2" />}
                      {entry.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${entry.portfolioValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={entry.weeklyGain >= 0 ? "default" : "destructive"} className={entry.weeklyGain > 0 ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}>
                      {entry.weeklyGain >= 0 ? "+" : ""}{entry.weeklyGain.toFixed(1)}%
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
