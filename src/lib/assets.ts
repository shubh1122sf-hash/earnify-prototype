
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
    isFamous?: boolean;
};

export const initialAssets: Asset[] = [
    // US Stocks (Famous)
    { name: 'Apple Inc.', ticker: 'AAPL', price: 195.89, change: 1.8, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'Technology' , volume: '2.1M', momentum: 0, volatility: 0.8, isFamous: true},
    { name: 'Tesla, Inc.', ticker: 'TSLA', price: 183.01, change: -0.5, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'Automotive' , volume: '3.5M', momentum: 0, volatility: 1.5, isFamous: true},
    { name: 'NVIDIA Corp', ticker: 'NVDA', price: 121.79, change: 3.5, icon: 'https://placehold.co/40x40.png?text=N', type: 'Stock', sector: 'Technology' , volume: '5.2M', momentum: 0, volatility: 2.2, isFamous: true},
    { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 175.61, change: 0.8, icon: 'https://placehold.co/40x40.png?text=G', type: 'Stock', sector: 'Technology' , volume: '1.8M', momentum: 0, volatility: 1.0, isFamous: true},
    { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 185.57, change: -1.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Stock', sector: 'E-commerce' , volume: '2.5M', momentum: 0, volatility: 1.2, isFamous: true},
    { name: 'Microsoft Corp', ticker: 'MSFT', price: 442.57, change: 1.2, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock', sector: 'Technology' , volume: '1.9M', momentum: 0, volatility: 0.7, isFamous: true},
    { name: 'Meta Platforms', ticker: 'META', price: 498.45, change: 0.9, icon: 'https://placehold.co/40x40.png?text=M', type: 'Stock', sector: 'Technology' , volume: '2.3M', momentum: 0, volatility: 1.3, isFamous: true},
    
    // Other Stocks (Not Famous)
    { name: 'JPMorgan Chase', ticker: 'JPM', price: 198.50, change: 0.2, icon: 'https://placehold.co/40x40.png?text=J', type: 'Stock', sector: 'Finance' , volume: '1.7M', momentum: 0, volatility: 0.6},
    { name: 'Johnson & Johnson', ticker: 'JNJ', price: 147.20, change: -0.3, icon: 'https://placehold.co/40x40.png?text=J', type: 'Stock', sector: 'Healthcare' , volume: '1.1M', momentum: 0, volatility: 0.5},
    { name: 'Walmart Inc.', ticker: 'WMT', price: 67.50, change: 0.1, icon: 'https://placehold.co/40x40.png?text=W', type: 'Stock', sector: 'Retail' , volume: '2.8M', momentum: 0, volatility: 0.4},
    { name: 'Reliance Industries', ticker: 'RELIANCE', price: 2885.50, change: 2.1, icon: 'https://placehold.co/40x40.png?text=R', type: 'Stock', sector: 'Conglomerate' , volume: '4.1M', momentum: 0, volatility: 1.4},
    { name: 'Tata Consultancy', ticker: 'TCS', price: 3825.10, change: -0.8, icon: 'https://placehold.co/40x40.png?text=T', type: 'Stock', sector: 'IT Services' , volume: '1.5M', momentum: 0, volatility: 0.9},
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1665.80, change: 1.5, icon: 'https://placehold.co/40x40.png?text=H', type: 'Stock', sector: 'Banking' , volume: '3.8M', momentum: 0, volatility: 1.1},
    { name: 'Infosys Ltd', ticker: 'INFY', price: 1520.75, change: -0.5, icon: 'https://placehold.co/40x40.png?text=I', type: 'Stock', sector: 'IT Services' , volume: '2.1M', momentum: 0, volatility: 1.0},
    { name: 'ICICI Bank', ticker: 'ICICIBANK', price: 1125.30, change: 0.7, icon: 'https://placehold.co/40x40.png?text=I', type: 'Stock', sector: 'Banking' , volume: '3.2M', momentum: 0, volatility: 1.2},

    // Imaginary Stocks
    { name: 'QuantumLeap AI', ticker: 'QLEAP', price: 88.50, change: 4.2, icon: 'https://placehold.co/40x40.png?text=Q', type: 'Stock', sector: 'AI/Robotics', volume: '1.2M', momentum: 0, volatility: 2.8 },
    { name: 'BioSynth Innovations', ticker: 'BSYN', price: 45.20, change: -2.1, icon: 'https://placehold.co/40x40.png?text=B', type: 'Stock', sector: 'Biotechnology', volume: '800k', momentum: 0, volatility: 2.5 },
    { name: 'Helios Energy', ticker: 'HEOS', price: 125.70, change: 1.5, icon: 'https://placehold.co/40x40.png?text=H', type: 'Stock', sector: 'Renewable Energy', volume: '950k', momentum: 0, volatility: 1.8 },
    { name: 'CyberSecure Global', ticker: 'CSEC', price: 210.00, change: 0.5, icon: 'https://placehold.co/40x40.png?text=C', type: 'Stock', sector: 'Cybersecurity', volume: '600k', momentum: 0, volatility: 1.9 },
    { name: 'NextGen Logistics', ticker: 'NGLX', price: 72.30, change: 3.1, icon: 'https://placehold.co/40x40.png?text=N', type: 'Stock', sector: 'Logistics/Supply Chain', volume: '1.4M', momentum: 0, volatility: 1.6 },

    
    // Cryptocurrencies (Famous)
    { name: 'Bitcoin', ticker: 'BTC', price: 67123.45, change: 2.5, icon: 'https://placehold.co/40x40.png?text=B', type: 'Crypto', sector: 'Digital Asset', volume: '15.2B', momentum: 0, volatility: 3.5, isFamous: true },
    { name: 'Ethereum', ticker: 'ETH', price: 3456.78, change: -1.2, icon: 'https://placehold.co/40x40.png?text=E', type: 'Crypto', sector: 'Digital Asset', volume: '8.1B', momentum: 0, volatility: 4.0, isFamous: true },
    
    // Other Cryptocurrencies
    { name: 'Solana', ticker: 'SOL', price: 150.25, change: 12.5, icon: 'https://placehold.co/40x40.png?text=S', type: 'Crypto', sector: 'Digital Asset', volume: '2.5B', momentum: 0, volatility: 5.5 },
    { name: 'Dogecoin', ticker: 'DOGE', price: 0.15, change: 5.2, icon: 'https://placehold.co/40x40.png?text=D', type: 'Crypto', sector: 'Digital Asset', volume: '1.8B', momentum: 0, volatility: 8.0 },
    { name: 'Cardano', ticker: 'ADA', price: 0.45, change: -2.1, icon: 'https://placehold.co/40x40.png?text=A', type: 'Crypto', sector: 'Digital Asset', volume: '1.1B', momentum: 0, volatility: 6.0 },
    { name: 'XRP', ticker: 'XRP', price: 0.52, change: 0.5, icon: 'https://placehold.co/40x40.png?text=X', type: 'Crypto', sector: 'Digital Asset', volume: '1.5B', momentum: 0, volatility: 5.0 },
    { name: 'Chainlink', ticker: 'LINK', price: 17.80, change: 3.1, icon: 'https://placehold.co/40x40.png?text=L', type: 'Crypto', sector: 'Digital Asset', volume: '0.9B', momentum: 0, volatility: 7.0 },
];

export const mentorTips = {
  marshall: [
    "A company's debt is a key indicator of its health. Look for a low debt-to-equity ratio.",
    "Never invest in a business you cannot understand. Simplicity is a virtue.",
    "Price is what you pay. Value is what you get. Don't confuse the two.",
    "Look for companies with a durable competitive advantage, or a 'moat'.",
    "The stock market is a device for transferring money from the impatient to the patient.",
    "Read annual reports. The CEO's letter can tell you a lot about the company's direction.",
    "A stock is not a lottery ticket. It's ownership in a business.",
    "Diversification is a protection against ignorance. It makes little sense if you know what you are doing.",
    "I see potential in companies that provide essential services. Check out a stock like WMT.",
    "A new company, Helios Energy (HEOS), is in the renewable sector. It's a growing field, but do your research on its financials before jumping in.",
    "Ignore market forecasts. Focus on the underlying business.",
    "The best businesses are those that can reinvest their earnings at high rates of return.",
    "When a great company encounters a temporary problem, that's your buying opportunity.",
    "Look at the long-term earnings power of a company, not just the next quarter.",
    "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price."
  ],
  ken: [
    "The market is euphoric about NVDA right now. That's usually a signal to be cautious.",
    "Everyone is panicking about the market dip. This is where opportunities are born.",
    "When a stock is on the front page of every news site, the smart money is already selling.",
    "Buy when there's blood in the streets, even if the blood is your own.",
    "The point of maximum pessimism is the best time to buy.",
    "Don't follow the crowd. They are almost always wrong.",
    "Look at what the 'smart money' is doing, not what the commentators are saying.",
    "Market bubbles are a recurring feature of finance. Learn to spot them, and you'll protect your capital.",
    "Most people are too focused on the upside. You need to obsess about the downside.",
    "A lot of hype around QuantumLeap AI (QLEAP). When a story sounds too good to be true, it usually is.",
    "The more certain an investment seems, the more likely you are to be wrong.",
    "Human emotion is the biggest driver of market cycles. Master your own, and you can exploit others'.",
    "If you want to have a better performance than the crowd, you must do things differently from the crowd.",
    "What the wise do in the beginning, fools do in the end.",
    "The market's job is to fool the majority of people, most of the time."
  ],
  purav: [
    "Always check the latest news on a company before investing. A surprise announcement can change everything.",
    "Macroeconomic data, like inflation rates or employment numbers, can have a huge impact on the market.",
    "A company's earnings report is a health check-up. Read it carefully.",
    "What are the company's competitors doing? A strong competitor can eat into profits.",
    "Pay attention to a company's leadership. A new CEO can signal a change in strategy.",
    "Look at the P/E ratio, but understand its context within the industry.",
    "BioSynth Innovations (BSYN) just had a research paper published. This could be a catalyst for its stock price, positive or negative.",
    "I'm seeing increased regulation chatter in the tech sector. This could impact stocks like GOOGL and META.",
    "The Federal Reserve is hinting at interest rate changes. This will affect the entire market, especially finance stocks like JPM.",
    "Don't just read the headlines. Dig into the details of the news.",
    "Is the company buying back its own stock? That can be a sign of confidence from management.",
    "Look at institutional ownership. If large funds are buying, that's a positive signal.",
    "CyberSecure Global (CSEC) operates in a critical industry. Geopolitical events could be a major factor for its growth.",
    "Analyze the supply chain of a company. A company like NextGen Logistics (NGLX) is a pure play on this.",
    "Never stop learning. The market is always changing, and you need to adapt."
  ],
  david: [
    "Look at the 50-day and 200-day moving averages. A 'golden cross' can be a strong buy signal.",
    "Trading volume is a key indicator. A price move on high volume is more significant than one on low volume.",
    "The RSI (Relative Strength Index) is showing TSLA as overbought. A pullback could be coming.",
    "BTC is forming a bullish flag pattern on the daily chart. This could signal a breakout.",
    "Momentum is strong in the crypto sector. Look for assets like SOL that are outperforming.",
    "Set stop-loss orders to protect your capital. It's the most important rule of trading.",
    "Don't fight the trend. If a stock is in a strong uptrend, look for buying opportunities, not reasons to short it.",
    "Support and resistance levels are like floors and ceilings for a stock's price. Learn to identify them.",
    "A breakout above a key resistance level, especially with high volume, is a powerful signal. Look at QLEAP's chart.",
    "Never add to a losing position. It's like averaging down on a mistake.",
    "The 'handle' is forming on that cup. A classic pattern. Be ready.",
    "LINK is showing divergence between its price and momentum indicators. Be cautious.",
      "The trend is your friend. But friends can betray you. Always have an exit plan.",
    "Chart patterns are just probabilities, not certainties. Always manage your risk.",
    "Let your winners run and cut your losers short. It sounds simple, but it's the hardest part of trading."
  ]
};
