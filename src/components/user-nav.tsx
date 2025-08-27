
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserNav() {

  return (
    <Avatar className="h-9 w-9">
        <AvatarImage src={'https://placehold.co/40x40.png?text=U'} alt={'User'} />
        <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
