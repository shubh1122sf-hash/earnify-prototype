
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const MENTOR_KEY = 'earnify-mentor';

const mentors = [
  {
    id: "marshall",
    name: "Marshall",
    avatar: "https://placehold.co/128x128.png?text=M",
    specialty: "Value Investing",
    description: "Marshall is a seasoned investor who believes in fundamentals. He'll teach you to find undervalued companies with strong balance sheets and long-term potential. His approach is patient and disciplined.",
    philosophy: "The best time to buy a great company is when it's on sale."
  },
  {
    id: "ken",
    name: "Ken",
    avatar: "https://placehold.co/128x128.png?text=K",
    specialty: "Contrarian Strategy",
    description: "Ken thrives on market psychology. He'll teach you to go against the herd, buying when others are fearful and selling when they're greedy. He's a master of identifying market bubbles and crashes.",
    philosophy: "Be fearful when others are greedy, and greedy when others are fearful."
  },
  {
    id: "purav",
    name: "Purav",
    avatar: "https://placehold.co/128x128.png?text=P",
    specialty: "Fundamental Analysis",
    description: "Purav is all about the data. He digs deep into financial statements, news, and macroeconomic trends. He'll teach you how to research a company thoroughly before ever investing a dollar.",
    philosophy: "Risk comes from not knowing what you're doing."
  },
  {
    id: "david",
    name: "David",
    avatar: "https://placehold.co/128x128.png?text=D",
    specialty: "Technical & Momentum Trading",
    description: "David rides the market waves. He focuses on chart patterns, trading volume, and market momentum. He'll teach you to identify trends and capitalize on short-term price movements.",
    philosophy: "The trend is your friend, until it ends."
  }
];

export default function LearnPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const savedMentor = localStorage.getItem(MENTOR_KEY);
    if (savedMentor) {
      setSelectedMentor(savedMentor);
    }
    setIsClient(true);
  }, []);

  const handleSelectMentor = (mentorId: string) => {
    localStorage.setItem(MENTOR_KEY, mentorId);
    setSelectedMentor(mentorId);
  };

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Meet Your Mentors</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose one mentor to guide you on your trading journey. They will provide you with exclusive tips and insights based on their unique philosophy. You can change your mentor at any time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className={`overflow-hidden flex flex-col transition-all duration-300 ${selectedMentor === mentor.id ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
            <CardHeader className="items-center text-center p-6 bg-secondary/50">
              <Image
                src={mentor.avatar}
                alt={mentor.name}
                width={80}
                height={80}
                data-ai-hint="person portrait"
                className="w-20 h-20 rounded-full mb-4 border-4 border-background"
              />
              <CardTitle>{mentor.name}</CardTitle>
              <CardDescription className="font-medium text-primary">{mentor.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <p className="text-sm text-muted-foreground flex-grow">{mentor.description}</p>
              <p className="text-sm font-medium text-foreground mt-4 pt-4 border-t border-dashed">"{mentor.philosophy}"</p>
              <Button 
                onClick={() => handleSelectMentor(mentor.id)} 
                className="w-full mt-6"
                variant={selectedMentor === mentor.id ? 'secondary' : 'default'}
                disabled={selectedMentor === mentor.id}
              >
                {selectedMentor === mentor.id ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Selected Mentor
                  </>
                ) : 'Choose Mentor'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
