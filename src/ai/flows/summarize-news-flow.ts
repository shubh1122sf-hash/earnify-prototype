
'use server';
/**
 * @fileOverview A news article summarization AI flow.
 *
 * - summarizeNewsArticle - A function that handles summarizing a news article.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const summarizeNewsArticle = ai.defineFlow(
  {
    name: 'summarizeNewsArticle',
    inputSchema: z.string().describe('The full text content of the news article.'),
    outputSchema: z.string().describe('A concise, easy-to-read summary of the article.'),
  },
  async (articleContent) => {
    const {output} = await ai.generate({
        prompt: `You are a financial news assistant. Your goal is to provide a clear and concise summary of the provided news article. Focus on the key takeaways and the potential impact on the market or the specific company involved. Keep the summary to 2-3 short sentences.

        Article Content:
        ---
        ${articleContent}
        ---
      `,
    });
    return output!;
  }
);
