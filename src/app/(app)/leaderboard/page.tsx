
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { useSimulation } from "@/hooks/use-simulation";
import { useEffect, useState } from "react";

// This would typically come from a backend API
const generateLeaderboardData = () => [
  { rank: 1, user: "TraderPro", portfolioValue: 112500, trades: 87, avatar: "https://placehold.co/40x40.png?text=T" },
  { rank: 2, user: "MarketWizard", portfolioValue: 111800, trades: 65, avatar: "https://placehold.co/40x40.png?text=M" },
  { rank: 3, user: "BullRider", portfolioValue: 111200, trades: 92, avatar: "https://placehold.co/40x40.png?text=B" },
  { rank: 4, user: "AlphaHunter", portfolioValue: 110500, trades: 78, avatar: "https://placehold.co/40x40.png?text=A" },
  { rank: 5, user: "RiskMaster", portfolioValue: 99800, trades: 56, avatar: "https://placehold.co/40x40.png?text=R" },
  { rank: 6, user: "TrendSetter", portfolioValue: 99200, trades: 72, avatar: "https://placehold.co/40x40.png?text=T" },
];


export default function LeaderboardPage() {
  const { getPortfolioValue, simulation } = useSimulation();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    const userPortfolioValue = getPortfolioValue() + simulation.balance;
    const currentUser = {
      user: "You",
      portfolioValue: userPortfolioValue,
      trades: simulation.tradeCount,
      avatar: "https://placehold.co/40x40.png?text=Y"
    };

    const otherUsers = generateLeaderboardData();

    const combined = [...otherUsers, currentUser]
      .sort((a, b) => b.portfolioValue - a.portfolioValue)
      .map((user, index) => ({ ...user, rank: index + 1 }));
    
    setLeaderboardData(combined);
  }, [getPortfolioValue, simulation]);

  const yourRank = leaderboardData.find(u => u.user === 'You');

  return (
    <div className="flex flex-col gap-6">
       <h2 className="text-2xl font-bold text-foreground mb-4">Leaderboard</h2>
      
      {yourRank && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-medium text-foreground">Your Rank</h3>
                    <p className="text-muted-foreground">You are currently ranked <span className="font-semibold text-primary">#{yourRank.rank}</span> with a portfolio value of <span className="font-semibold text-primary">${yourRank.portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                </div>
            </div>
        </div>
      )}
      
      <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground">Rank</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Trader</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Portfolio Value</TableHead>
                <TableHead className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Trades</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border bg-card">
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank} className={entry.user === 'You' ? 'bg-primary/10' : ''}>
                  <TableCell className="py-4 pl-4 pr-3 whitespace-nowrap text-sm font-medium text-foreground">{entry.rank}</TableCell>
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                       <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">{entry.user}</div>
                      </div>
                    </div>
                  </TableCell>
                   <TableCell className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">${entry.portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    </TableCell>
                  <TableCell className="px-3 py-4 whitespace-nowrap text-sm text-muted-foreground">{entry.trades}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}
