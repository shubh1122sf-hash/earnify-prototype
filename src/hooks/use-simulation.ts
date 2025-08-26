
'use client';

import { useState, useEffect, useCallback } from 'react';
import { initialAssets } from '@/lib/assets';
import { useAuth } from '@/app/auth-provider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

type Holding = {
  ticker: string;
  quantity: number;
  avgBuyPrice: number;
};

type SimulationState = {
  balance: number;
  holdings: Holding[];
  tradeCount: number;
};

const getInitialState = (): SimulationState => ({
  balance: 10000,
  holdings: [],
  tradeCount: 0,
});

export function useSimulation() {
  const { user, loading: authLoading } = useAuth();
  const [simulation, setSimulation] = useState<SimulationState>(getInitialState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      if (!authLoading) {
        setSimulation(getInitialState());
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    const simDocRef = doc(db, 'simulations', user.uid);

    const unsubscribe = onSnapshot(simDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as SimulationState;
        setSimulation({
          balance: data.balance ?? 10000,
          holdings: data.holdings ?? [],
          tradeCount: data.tradeCount ?? 0
        });
      } else {
        const initialState = getInitialState();
        setDoc(simDocRef, initialState);
        setSimulation(initialState);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching simulation state from Firestore:", error);
      setSimulation(getInitialState());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading]);


  const buyAsset = useCallback(async (ticker: string, quantity: number, price: number) => {
    if (!user) return;
    
    const cost = quantity * price;
    
    setSimulation(prevState => {
      if (prevState.balance < cost) {
        console.error("Insufficient funds"); // Or show a toast
        return prevState;
      }

      const newBalance = prevState.balance - cost;
      const newHoldings = [...prevState.holdings];
      const existingHoldingIndex = newHoldings.findIndex(h => h.ticker === ticker);

      if (existingHoldingIndex > -1) {
        const existingHolding = newHoldings[existingHoldingIndex];
        const totalQuantity = existingHolding.quantity + quantity;
        const totalCost = (existingHolding.avgBuyPrice * existingHolding.quantity) + cost;
        const newAvgPrice = totalCost / totalQuantity;
        
        newHoldings[existingHoldingIndex] = {
          ...existingHolding,
          quantity: totalQuantity,
          avgBuyPrice: newAvgPrice,
        };
      } else {
        newHoldings.push({
          ticker,
          quantity,
          avgBuyPrice: price
        });
      }
      
      const newState: SimulationState = {
          balance: newBalance,
          holdings: newHoldings,
          tradeCount: prevState.tradeCount + 1
      };

      const simDocRef = doc(db, 'simulations', user.uid);
      setDoc(simDocRef, newState, { merge: true });
      return newState;
    });

  }, [user]);
  
  const sellAsset = useCallback(async (ticker: string, quantity: number, price: number) => {
    if (!user) return;
    
    setSimulation(prevState => {
      const existingHolding = prevState.holdings.find(h => h.ticker === ticker);
      if (!existingHolding || existingHolding.quantity < quantity) {
        console.error("Not enough holdings to sell"); // Or show a toast
        return prevState;
      }
      
      const income = quantity * price;
      const newBalance = prevState.balance + income;

      const newHoldings = prevState.holdings.map(h => {
        if (h.ticker === ticker) {
          return { ...h, quantity: h.quantity - quantity };
        }
        return h;
      }).filter(h => h.quantity > 0.00001); // Use a small epsilon for float comparison

      const newState: SimulationState = {
          balance: newBalance,
          holdings: newHoldings,
          tradeCount: prevState.tradeCount + 1
      };
      
      const simDocRef = doc(db, 'simulations', user.uid);
      setDoc(simDocRef, newState, { merge: true });
      return newState;
    });

  }, [user]);

  const getPortfolioValue = useCallback(() => {
    return simulation.holdings.reduce((total, holding) => {
        const asset = initialAssets.find(a => a.ticker === holding.ticker);
        const currentPrice = asset ? asset.price : holding.avgBuyPrice;
        return total + (holding.quantity * currentPrice);
    }, 0);
  }, [simulation.holdings]);

  const getPortfolioPNL = useCallback(() => {
    let totalInvestment = 0;
    const currentValue = simulation.holdings.reduce((total, holding) => {
        const asset = initialAssets.find(a => a.ticker === holding.ticker);
        const currentPrice = asset ? asset.price : holding.avgBuyPrice;
        totalInvestment += (holding.quantity * holding.avgBuyPrice);
        return total + (holding.quantity * currentPrice);
    }, 0);

    if (totalInvestment === 0) {
        return { totalPNL: 0, totalPNLPercent: 0 };
    }

    const totalPNL = currentValue - totalInvestment;
    const totalPNLPercent = (totalPNL / totalInvestment) * 100;

    return { totalPNL, totalPNLPercent };
  }, [simulation.holdings]);


  return { simulation, buyAsset, sellAsset, getPortfolioValue, getPortfolioPNL, loading };
}
