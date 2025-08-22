'use client';

import { useState, useEffect, useCallback } from 'react';
import { initialAssets } from '@/lib/assets';

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

const SIMULATION_KEY = 'earnify-simulation';

const getInitialState = (): SimulationState => {
  if (typeof window === 'undefined') {
    return { balance: 10000, holdings: [], tradeCount: 0 };
  }
  try {
    const savedState = localStorage.getItem(SIMULATION_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Basic validation and add tradeCount if missing
      if (typeof parsedState.balance === 'number' && Array.isArray(parsedState.holdings)) {
          return {
            ...parsedState,
            tradeCount: parsedState.tradeCount || 0
          };
      }
    }
  } catch (error) {
    console.error("Failed to parse simulation state from localStorage", error);
  }
  return { balance: 10000, holdings: [], tradeCount: 0 };
};

export function useSimulation() {
  const [simulation, setSimulation] = useState<SimulationState>({ balance: 10000, holdings: [], tradeCount: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Re-sync with localStorage on mount in case it was updated in another tab
    setSimulation(getInitialState());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            localStorage.setItem(SIMULATION_KEY, JSON.stringify(simulation));
        } catch (error) {
            console.error("Failed to save simulation state to localStorage", error);
        }
    }
  }, [simulation, isInitialized]);
  
  const buyAsset = useCallback((ticker: string, quantity: number, price: number) => {
    setSimulation(prev => {
        const cost = quantity * price;
        if (prev.balance < cost) {
            return prev;
        }

        const newBalance = prev.balance - cost;
        const newHoldings = [...prev.holdings];
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
        return { balance: newBalance, holdings: newHoldings, tradeCount: prev.tradeCount + 1 };
    });
  }, []);
  
  const sellAsset = useCallback((ticker: string, quantity: number, price: number) => {
    setSimulation(prev => {
        const existingHolding = prev.holdings.find(h => h.ticker === ticker);
        if (!existingHolding || existingHolding.quantity < quantity) {
            return prev;
        }
        
        const income = quantity * price;
        const newBalance = prev.balance + income;

        const newHoldings = prev.holdings.map(h => {
            if (h.ticker === ticker) {
                return { ...h, quantity: h.quantity - quantity };
            }
            return h;
        }).filter(h => h.quantity > 0.00001);

        return { balance: newBalance, holdings: newHoldings, tradeCount: prev.tradeCount + 1 };
    });
  }, []);

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


  return { simulation, buyAsset, sellAsset, getPortfolioValue, getPortfolioPNL };
}
