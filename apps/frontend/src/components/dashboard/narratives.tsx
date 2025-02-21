import React from 'react';
import NarrativeCard from './narrative-card';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';
import NarrativeForm from './create-form';

export type NarrativeCardProps = {
  id: string;
  title: string;
  lastUpdated: string;
  image: string;
};

export default async function Narratives() {
  const sampleNarratives: NarrativeCardProps[] = [
    // {
    //     id: '1',
    //     title: 'A narrative about a cat',
    //     lastUpdated: '2022-01-01',
    //     image: 'https://placekitten.com/200/200'
    // },
    // {
    //     id: '2',
    //     title: 'A narrative about a dog',
    //     lastUpdated: '2022-01-02',
    //     image: 'https://placedog.net/200/200'
    // },
    // {
    //     id: '3',
    //     title: 'A narrative about a bird',
    //     lastUpdated: '2022-01-03',
    //     image: 'https://placebird.net/200/200'
    // },
  ];



  return (
    <div className="flex-1 bg-white/5 rounded-lg p-4 flex flex-wrap gap-4">
      {sampleNarratives.map((narrative) => (
        <NarrativeCard key={narrative.id} {...narrative} />
      ))}
      {sampleNarratives.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-md text-muted-foreground">No narratives found.</p>
          <Dialog>
            <DialogTrigger asChild>
            <Button variant={'ghost'}>Create new narrative</Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl font-figtree'>
              <DialogHeader>
                <DialogTitle>Create New Narrative</DialogTitle>
                <DialogDescription>
                  Let&apos;s start creating a new narrative. The world&apos;s next big story starts here and now!
                </DialogDescription>
              </DialogHeader>
              <Separator/>
              <NarrativeForm/>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
