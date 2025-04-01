'use client';

import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';
import { Separator } from '@/shared/ui/separator';
import { Narrative } from '@/domain/entities/Narrative';

export default function NarrativeCard({ tagline, blurb, name, narrativeID }: Narrative) {
  return (
    <Link href={`/narrative/${narrativeID}`} className="w-full min-h-[250px]">
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
        </CardContent>
      </Card>
    </Link>
  );
}
