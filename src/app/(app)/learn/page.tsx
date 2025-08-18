
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

const lessons = [
  {
    id: "item-1",
    title: "What is a Stock?",
    content: "A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how much stock they own. Units of stock are called 'shares.'",
    image: "https://placehold.co/600x400.png",
    imageHint: "finance chart"
  },
  {
    id: "item-2",
    title: "Understanding Cryptocurrency",
    content: "Cryptocurrency is a digital or virtual currency that is secured by cryptography, which makes it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers.",
    image: "https://placehold.co/600x400.png",
    imageHint: "crypto network"
  },
  {
    id: "item-3",
    title: "The Importance of Diversification",
    content: "Diversification is a strategy of investing in a variety of assets to minimize risk. The idea is that if one investment performs poorly, the others may not be affected, thus balancing out potential losses. A well-diversified portfolio is less volatile than one with only a few assets.",
    image: "https://placehold.co/600x400.png",
    imageHint: "investment portfolio"
  },
  {
    id: "item-4",
    title: "What is Market Capitalization?",
    content: "Market capitalization (or 'market cap') is the total value of all a company's shares of stock. It is calculated by multiplying the price of a stock by its total number of outstanding shares. Investors use this figure to determine a company's size, as opposed to using sales or total asset figures.",
    image: "https://placehold.co/600x400.png",
    imageHint: "business buildings"
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Learn Center</h1>
      <p className="text-muted-foreground">
        Expand your financial knowledge with our interactive lessons.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden">
            <CardHeader>
                <Image
                    src={lesson.image}
                    alt={lesson.title}
                    width={600}
                    height={400}
                    data-ai-hint={lesson.imageHint}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    <AccordionItem value={lesson.id}>
                    <AccordionTrigger className="text-xl font-semibold">{lesson.title}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {lesson.content}
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
