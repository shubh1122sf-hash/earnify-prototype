
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
    "A company's debt is a key indicator of its health. Look for businesses that don't rely too much on borrowing.",
    "Never invest in a business you cannot understand. If it's too complicated, it's probably too risky.",
    "Price is what you pay. Value is what you get. The goal is to buy a great business for a reasonable price.",
    "A good business has a 'moat'—a durable competitive advantage that protects it from competitors. Think of Apple's brand.",
    "The stock market is a device for transferring money from the impatient to the patient. Think long-term.",
    "Try reading the annual report for a company you're interested in. The CEO's letter is often very revealing.",
    "Remember, owning a stock means you own a small piece of that company. Treat it like a business owner.",
    "Putting all your eggs in one basket can be risky. Diversification means spreading your investments across different assets.",
    "Companies that sell things people need every day, like Walmart (WMT), can be very stable investments.",
    "Renewable energy is a growing field. A company like Helios Energy (HEOS) is interesting, but check its financials first.",
    "Don't worry about daily market predictions. Focus on the quality of the business.",
    "It's better to buy a wonderful company at a fair price than a fair company at a wonderful price.",
    "When a great company hits a rough patch, it can be a great time to buy. That's buying 'on sale'.",
    "Look for companies that have a long history of growing their earnings.",
    "Patience is the most important quality of a value investor."
  ],
  ken: [
    "The market is getting very excited about NVIDIA (NVDA). High excitement can sometimes be a warning sign.",
    "When everyone is panicking about a market dip, that's often when the best opportunities appear.",
    "Once a stock is on the front page of every news site, the biggest gains have likely already happened.",
    "The best time to invest is often when it feels the most scary. Be brave when others are fearful.",
    "The time of 'maximum pessimism' is the best time to buy. When everyone has given up, that's your chance.",
    "The crowd is often wrong. Thinking for yourself is your greatest advantage.",
    "Pay attention to a company's real value, not the hype. Hype fades, but value lasts.",
    "Market bubbles happen. Learn to recognize the signs of a bubble to protect your money.",
    "Thinking about how much you could lose is more important than thinking about how much you could win.",
    "The story around QuantumLeap AI (QLEAP) sounds amazing. But be careful, stories can be deceiving.",
    "The more certain an investment seems, the more you should question it. Overconfidence is a trap.",
    "Human emotion drives the market. If you can keep a cool head, you have a huge advantage.",
    "To get better results than everyone else, you have to be willing to do things differently.",
    "Wise investors see opportunities early. Don't be the last one to the party.",
    "The market's job is to surprise people. Always be prepared for the unexpected."
  ],
  purav: [
    "Always check the latest news on a company before investing. A single announcement can change everything.",
    "Big economic news, like inflation or job reports, affects the whole market. Keep an eye on it.",
    "A company's earnings report is like its report card. Read it to see how the business is really doing.",
    "Who are the company's competitors? A strong competitor can be a major risk.",
    "Pay attention to a company's leadership. A new CEO can signal a big change in strategy for better or worse.",
    "The Price-to-Earnings (P/E) ratio helps you understand if a stock is cheap or expensive compared to its profits.",
    "I see BioSynth Innovations (BSYN) was mentioned in a new scientific paper. That could impact its stock price.",
    "There's talk about new government regulations in the tech industry. This could affect giants like GOOGL and META.",
    "Keep an eye on interest rates. Changes can make borrowing money more or less expensive for companies, affecting their growth.",
    "Don't just read the headlines. Dig into the details. The real story is often hidden.",
    "Is a company buying back its own stock? That can be a sign that management believes it's undervalued.",
    "Look at who owns the stock. If large investment funds are buying, it can be a positive sign.",
    "A company like CyberSecure Global (CSEC) is in a critical industry. World events can have a direct impact on its business.",
    "How does a company get its products to customers? Its supply chain is very important. That's the whole business of NGLX.",
    "The market is always changing. The best investors are the ones who never stop learning."
  ],
  david: [
    "An asset's price chart tells a story. Learning to read it can give you clues about where it might go next.",
    "When a stock's price moves on high trading volume, it's a more powerful signal. It means a lot of people are making moves.",
    "Sometimes a stock's price will go up or down very quickly. It's often a good idea to wait for it to settle down before you act.",
    "Momentum is a powerful force. Sometimes the winning stocks keep winning... for a while.",
    "Don't fight the overall trend. It's easier to swim with the current than against it.",
    "Support and resistance are key concepts. Think of them as price levels that a stock has trouble breaking above or below.",
    "A 'breakout' happens when a stock's price moves past a key level, like a previous high. It can signal the start of a new trend.",
    "It's tempting to put more money into a trade that's losing, hoping it will come back. This is usually a bad idea.",
    "Let your winning trades run, and cut your losing trades early. This is a core rule of trading.",
    "Chart patterns can give you clues, but they aren't crystal balls. Always be prepared for them to fail.",
    "Crypto, like DOGE or SOL, can be very volatile. The price can swing wildly. Be prepared for big ups and downs.",
    "Trading isn't just about picking winners, it's about managing your risk so that one bad trade doesn't wipe you out.",
    "Keep an eye on assets that are making new highs. That can be a sign of strong momentum.",
    "Some traders like to look for patterns in the charts. One classic is the 'head and shoulders'—it often signals a trend reversal.",
    "Don't let your emotions control your trades. Have a plan and stick to it."
  ]
};
