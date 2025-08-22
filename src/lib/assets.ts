
export type Asset = {
    name: string;
    ticker: string;
    price: number;
    change: number;
    icon: string;
    type: 'Stock' | 'Crypto';
    sector: string;
    volume: string;
    momentum: number;
    volatility: number;
};

export const initialAssets: Asset[] = [
    // US Stocks
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'Technology' , volume: '2.1M', momentum: 0, volatility: 0.8},
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'Automotive' , volume: '3.5M', momentum: 0, volatility: 1.5},
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: 'https://placehold.co/40x40.png?text=N', type: 'Stock', sector: 'Technology' , volume: '5.2M', momentum: 0, volatility: 2.2},
    { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 175.61, change: 0.8, icon: 'https://placehold.co/40x40.png?text=G', type: 'Stock', sector: 'Technology' , volume: '1.8M', momentum: 0, volatility: 1.0},
    { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 185.57, change: -1.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'E-commerce' , volume: '2.5M', momentum: 0, volatility: 1.2},
    { name: 'Microsoft Corp', ticker: 'MSFT', price: 442.57, change: 1.2, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock', sector: 'Technology' , volume: '1.9M', momentum: 0, volatility: 0.7},
    { name: 'Meta Platforms', ticker: 'META', price: 498.45, change: 0.9, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock', sector: 'Technology' , volume: '2.3M', momentum: 0, volatility: 1.3},
    { name: 'JPMorgan Chase', ticker: 'JPM', price: 198.50, change: 0.2, icon: 'https://placehold.co/40x40.png?text=J', type: 'Stock', sector: 'Finance' , volume: '1.7M', momentum: 0, volatility: 0.6},
    { name: 'Johnson & Johnson', ticker: 'JNJ', price: 147.20, change: -0.3, icon: 'https://placehold.co/40x40.png?text=J', type: 'Stock', sector: 'Healthcare' , volume: '1.1M', momentum: 0, volatility: 0.5},
    { name: 'Walmart Inc.', ticker: 'WMT', price: 67.50, change: 0.1, icon: 'https://placehold.co/40x40.png?text=W', type: 'Stock', sector: 'Retail' , volume: '2.8M', momentum: 0, volatility: 0.4},
    
    // Indian Stocks
    { name: 'Reliance Industries', ticker: 'RELIANCE', price: 2885.50, change: 2.1, icon: 'https://placehold.co/40x40.png?text=R', type: 'Stock', sector: 'Conglomerate' , volume: '4.1M', momentum: 0, volatility: 1.4},
    { name: 'Tata Consultancy', ticker: 'TCS', price: 3825.10, change: -0.8, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'IT Services' , volume: '1.5M', momentum: 0, volatility: 0.9},
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1665.80, change: 1.5, icon: 'https://placehold.co/40x40.png?text=H', type: 'Stock', sector: 'Banking' , volume: '3.8M', momentum: 0, volatility: 1.1},
    { name: 'Infosys Ltd', ticker: 'INFY', price: 1520.75, change: -0.5, icon: 'https://placehold.co/40x40.png?text=I', type: 'Stock', sector: 'IT Services' , volume: '2.1M', momentum: 0, volatility: 1.0},
    { name: 'ICICI Bank', ticker: 'ICICIBANK', price: 1125.30, change: 0.7, icon: 'https://placehold.co/40x40.png?text=I', type: 'Stock', sector: 'Banking' , volume: '3.2M', momentum: 0, volatility: 1.2},

    // Cryptocurrencies
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: 'https://placehold.co/40x40.png?text=B', type: 'Crypto', sector: 'Digital Asset', volume: '15.2B', momentum: 0, volatility: 3.5 },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: 'https://placehold.co/40x40.png?text=E', type: 'Crypto', sector: 'Digital Asset', volume: '8.1B', momentum: 0, volatility: 4.0 },
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: 'https://placehold.co/40x40.png?text=S', type: 'Crypto', sector: 'Digital Asset', volume: '2.5B', momentum: 0, volatility: 5.5 },
    { name: 'Dogecoin', ticker: 'DOGE', price: 0.15, change: 5.2, icon: 'https://placehold.co/40x40.png?text=D', type: 'Crypto', sector: 'Digital Asset', volume: '1.8B', momentum: 0, volatility: 8.0 },
    { name: 'Cardano', ticker: 'ADA', price: 0.45, change: -2.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Crypto', sector: 'Digital Asset', volume: '1.1B', momentum: 0, volatility: 6.0 },
    { name: 'XRP', ticker: 'XRP', price: 0.52, change: 0.5, icon: 'https://placehold.co/40x40.png?text=X', type: 'Crypto', sector: 'Digital Asset', volume: '1.5B', momentum: 0, volatility: 5.0 },
    { name: 'Chainlink', ticker: 'LINK', price: 17.80, change: 3.1, icon: 'https://placehold.co/40x40.png?text=L', type: 'Crypto', sector: 'Digital Asset', volume: '0.9B', momentum: 0, volatility: 7.0 },
];
