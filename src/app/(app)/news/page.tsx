
'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { newsArticles, type NewsArticle } from '@/lib/news';
import { summarizeNewsArticle } from '@/ai/flows/summarize-news-flow';
import { Loader2, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type NewsFilter = 'All' | 'Markets' | 'Technology' | 'Crypto' | 'Policy';

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>('All');
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<string | null>(null);

  const handleSummarize = async (article: NewsArticle) => {
    if (summaries[article.id]) return; // Don't fetch if summary exists

    setLoadingSummary(article.id);
    try {
      const summary = await summarizeNewsArticle(article.content);
      setSummaries((prev) => ({ ...prev, [article.id]: summary }));
    } catch (error) {
      console.error('Error summarizing article:', error);
      setSummaries((prev) => ({ ...prev, [article.id]: 'Could not generate summary.' }));
    } finally {
      setLoadingSummary(null);
    }
  };

  const filteredArticles = newsArticles.filter(
    (article) => filter === 'All' || article.category === filter
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Latest News</h1>
        <p className="text-muted-foreground">
          Stay up-to-date with the latest market-moving headlines.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={filter === 'All' ? 'secondary' : 'ghost'}
          onClick={() => setFilter('All')}
        >
          All
        </Button>
        <Button
          variant={filter === 'Markets' ? 'secondary' : 'ghost'}
          onClick={() => setFilter('Markets')}
        >
          Markets
        </Button>
        <Button
          variant={filter === 'Technology' ? 'secondary' : 'ghost'}
          onClick={() => setFilter('Technology')}
        >
          Technology
        </Button>
        <Button
          variant={filter === 'Crypto' ? 'secondary' : 'ghost'}
          onClick={() => setFilter('Crypto')}
        >
          Crypto
        </Button>
        <Button
          variant={filter === 'Policy' ? 'secondary' : 'ghost'}
          onClick={() => setFilter('Policy')}
        >
          Policy
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint={article.imageAiHint}
                />
              </div>
              <Badge variant="outline" className="w-fit mb-2">{article.category}</Badge>
              <CardTitle className="text-lg">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {summaries[article.id] ? (
                 <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md border border-secondary">
                    <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary"/> AI Summary</p>
                    {summaries[article.id]}
                 </div>
              ) : (
                <p className="text-sm text-muted-foreground line-clamp-3">{article.content}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{article.source} &bull; {article.date}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSummarize(article)}
                disabled={loadingSummary === article.id}
              >
                {loadingSummary === article.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                   summaries[article.id] ? 'View Full Article' : 'Summarize with AI'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
