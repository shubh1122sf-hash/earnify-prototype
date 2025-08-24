
export type NewsArticle = {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'Markets' | 'Technology' | 'Crypto' | 'Policy';
  imageUrl: string;
  imageAiHint: string;
  content: string;
};

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Federal Reserve Hints at Slower Pace for Rate Hikes Amid Economic Data',
    source: 'MarketWatch',
    date: '3 hours ago',
    category: 'Markets',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'federal reserve building',
    content: 'In a much-anticipated speech, the Federal Reserve Chair suggested that the central bank might slow its aggressive pace of interest rate hikes. Citing recent data showing a slight cooling in inflation and a moderation in consumer spending, the chair emphasized a data-dependent approach. The market reacted positively, with major indices rallying on the news, as investors hope for a less hawkish stance that could prevent a hard economic landing. However, the chair also cautioned that the fight against inflation is far from over and that future decisions will be made meeting by meeting.',
  },
  {
    id: '2',
    title: 'NVIDIA Unveils Next-Generation "Blackwell" AI Chip, Promises 10x Performance Leap',
    source: 'TechCrunch',
    date: '8 hours ago',
    category: 'Technology',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'futuristic microchip',
    content: 'NVIDIA has once again raised the bar in the AI hardware race with the announcement of its new "Blackwell" architecture. The company claims the new chips will offer a tenfold increase in performance for large language model training and inference compared to the current generation. The announcement, made at their annual developers conference, sent ripples through the tech industry. CEO Jensen Huang showcased a demo of the chip powering a real-time conversational AI that was indistinguishable from a human. This move solidifies NVIDIA\'s dominance and puts pressure on competitors like AMD and Intel to respond.',
  },
  {
    id: '3',
    title: 'Bitcoin Surges Past $70,000 as Institutional Interest Grows',
    source: 'CoinDesk',
    date: '1 day ago',
    category: 'Crypto',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'bitcoin graph',
    content: 'The price of Bitcoin has climbed past the significant $70,000 milestone, driven by a fresh wave of institutional adoption. Major investment firms have recently launched new Bitcoin-backed financial products, making it easier for traditional investors to gain exposure to the cryptocurrency. This, combined with a positive macroeconomic outlook, has fueled a strong rally. Analysts are now watching to see if Bitcoin can establish a new support level above $70,000, which could set the stage for a push towards all-time highs later this year.',
  },
  {
    id: '4',
    title: 'White House Issues Executive Order on AI Safety and Regulation',
    source: 'Reuters',
    date: '2 days ago',
    category: 'Policy',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'white house',
    content: 'The White House has taken a significant step towards regulating artificial intelligence by issuing a comprehensive executive order. The order focuses on establishing new standards for AI safety and security, protecting privacy, and ensuring equity. It mandates that leading AI companies share their safety test results with the government and develop standards for watermarking AI-generated content. While the tech industry has offered a mixed response, consumer advocacy groups have praised the move as a crucial first step in mitigating the potential risks of advanced AI.',
  },
  {
    id: '5',
    title: 'Retail Sales Data Weaker Than Expected, Raising Economic Concerns',
    source: 'Bloomberg',
    date: '2 days ago',
    category: 'Markets',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'shopping cart',
    content: 'The latest retail sales report showed a surprising decline last month, falling short of economists\' expectations. The drop was widespread across various sectors, from electronics to furniture, suggesting that consumers are pulling back on discretionary spending amid persistent inflation and higher borrowing costs. This has renewed concerns about the health of the economy and the possibility of a recession. The Federal Reserve will be watching this data closely as it considers its next move on interest rates.',
  },
  {
    id: '6',
    title: 'Apple Announces "Vision Pro" Headset Will Launch in More Countries Next Month',
    source: 'The Verge',
    date: '3 days ago',
    category: 'Technology',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'vr headset',
    content: 'Apple has announced that its highly anticipated Vision Pro mixed-reality headset will be available in eight new countries starting next month, including the UK, Canada, and Germany. The international rollout is a key test for the new product category, which Apple hopes will become its next major growth engine. The high price point remains a concern for many analysts, but the company is betting that the device\'s advanced capabilities will attract developers and early adopters, creating a new ecosystem of spatial computing applications.',
  },
];
