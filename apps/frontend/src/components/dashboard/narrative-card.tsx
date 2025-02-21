import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { NarrativeCardProps } from './narratives';

export default function NarrativeCard({ id, title, lastUpdated, image }: NarrativeCardProps) {
  return (
    <Link href={`/narrative/${id}`}>
      <Card className="h-full max-h-[50%] flex flex-col max-w-36 hover:border-2">
        <CardHeader
          className="flex-1 bg-white/10 rounded-t-xl"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></CardHeader>
        <CardFooter className="flex flex-col gap-2 items-start p-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{lastUpdated}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
