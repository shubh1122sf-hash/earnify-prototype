
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

const getInitialState = (): SimulationState => ({
  balance: 10000,
  holdings: [],
  tradeCount: 0,
});

export function useSimulation() {
  const [simulation, setSimulation] = useState<SimulationState>(getInitialState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(SIMULATION_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Basic validation
        if(parsedState && typeof parsedState.balance === 'number' && Array.isArray(parsedState.holdings)) {
          setSimulation(parsedState);
        } else {
          setSimulation(getInitialState());
        }
      } else {
        setSimulation(getInitialState());
      }
    } catch (error) {
      console.error("Failed to load simulation state from localStorage:", error);
      setSimulation(getInitialState());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(!loading) {
      try {
        localStorage.setItem(SIMULATION_KEY, JSON.stringify(simulation));
      } catch (error) {
        console.error("Failed to save simulation state to localStorage:", error);
      }
    }
  }, [simulation, loading]);


  const buyAsset = useCallback((ticker: string, quantity: number, price: number) => {
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
      
      return {
          balance: newBalance,
          holdings: newHoldings,
          tradeCount: prevState.tradeCount + 1
      };
    });

  }, []);
  
  const sellAsset = useCallback((ticker: string, quantity: number, price: number) => {
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

      return {
          balance: newBalance,
          holdings: newHoldings,
          tradeCount: prevState.tradeCount + 1
      };
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


  return { simulation, buyAsset, sellAsset, getPortfolioValue, getPortfolioPNL, loading };
}
