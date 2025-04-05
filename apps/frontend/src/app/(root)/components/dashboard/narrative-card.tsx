'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';
import { Separator } from '@/shared/ui/separator';
import { Narrative } from '@/features/narratives/types/Narrative';

export default function NarrativeCard({ tagline, blurb, name, narrativeID }: Narrative) {
  return (
    <Link href={`/narrative/${narrativeID}`} className="w-full min-h-[250px]">
      <Card className="w-full h-full bg-black/50 hover:bg-black/60 transition-all duration-300 ease-in-out flex flex-col justify-between relative hover:border-cyan-200 border-2">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{tagline}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col flex-1 bg-white/5 rounded-lg m-4 px-2">
          <p className="text-sm text-muted-foreground py-2 px-0">
            {blurb.length > 100 ? `${blurb.substring(0, 120)}...` : blurb}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
