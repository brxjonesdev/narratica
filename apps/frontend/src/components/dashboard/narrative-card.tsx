'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { NarrativeCardProps } from './narratives';
import { Separator } from '@/components/ui/separator';

export default function NarrativeCard({
  tagline,
  blurb,
  name,
  narrativeID,
  updatedAt,
}: NarrativeCardProps) {


  return (
    <Link
      href={`/narrative/${narrativeID}`}
      className="w-1/5 h-[50%]"
    >
      <Card className="w-full h-full bg-black/50 hover:bg-black/60 transition-all duration-300 ease-in-out flex flex-col justify-between relative">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{tagline}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-2 flex flex-col flex-1">
            <p className="text-sm text-muted-foreground">
            {blurb.length > 100 ? `${blurb.substring(0, 120)}...` : blurb}
            </p>
          <Separator className="mt-auto my-2 " />
          <p className="text-xs text-muted-foreground justify-self">
            Updated at: {new Date(updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
      
      </Card>
    </Link>
  );
}
