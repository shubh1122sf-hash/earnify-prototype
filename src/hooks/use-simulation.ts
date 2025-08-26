
'use client';

import { useState, useEffect, useCallback } from 'react';
import { initialAssets } from '@/lib/assets';
import { useAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

  const fetchSimulationState = useCallback(async () => {
    if (!user) {
        // If there's no user and auth is done loading, we can stop loading the sim.
        if (!authLoading) {
            setLoading(false);
        }
        return;
    }

    setLoading(true);
    const simDocRef = doc(db, 'simulations', user.uid);
    try {
      const docSnap = await getDoc(simDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as SimulationState;
        setSimulation({
            balance: data.balance ?? 10000,
            holdings: data.holdings ?? [],
            tradeCount: data.tradeCount ?? 0
        });
      } else {
        // Create initial document for a new user
        const initialState = getInitialState();
        await setDoc(simDocRef, initialState);
        setSimulation(initialState);
      }
    } catch (error) {
      console.error("Error fetching simulation state from Firestore:", error);
      // In case of error, reset to initial state to avoid bad data
      setSimulation(getInitialState());
    } finally {
      setLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    fetchSimulationState();
  }, [fetchSimulationState]);


  const buyAsset = useCallback(async (ticker: string, quantity: number, price: number) => {
    if (!user) return;
    
    const cost = quantity * price;
    if (simulation.balance < cost) {
      return;
    }

    const newBalance = simulation.balance - cost;
    const newHoldings = [...simulation.holdings];
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
        tradeCount: simulation.tradeCount + 1
    };

    setSimulation(newState);
    const simDocRef = doc(db, 'simulations', user.uid);
    await setDoc(simDocRef, newState, { merge: true });

  }, [simulation, user]);
  
  const sellAsset = useCallback(async (ticker: string, quantity: number, price: number) => {
    if (!user) return;
    
    const existingHolding = simulation.holdings.find(h => h.ticker === ticker);
    if (!existingHolding || existingHolding.quantity < quantity) {
      return;
    }
    
    const income = quantity * price;
    const newBalance = simulation.balance + income;

    const newHoldings = simulation.holdings.map(h => {
      if (h.ticker === ticker) {
        return { ...h, quantity: h.quantity - quantity };
      }
      return h;
    }).filter(h => h.quantity > 0.00001);

    const newState: SimulationState = {
        balance: newBalance,
        holdings: newHoldings,
        tradeCount: simulation.tradeCount + 1
    };
    
    setSimulation(newState);
    const simDocRef = doc(db, 'simulations', user.uid);
    await setDoc(simDocRef, newState, { merge: true });

  }, [simulation, user]);

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
