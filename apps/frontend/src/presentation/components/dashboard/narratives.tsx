'use client';

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
} from '@/presentation/components/ui/dialog';
import { Separator } from '../ui/separator';
import NarrativeForm from './create-form';
import { useUserNarratives } from '@/presentation/hooks/use-narratives';
import { PlusCircle } from 'lucide-react';
import Loading from '../shared/loading';



export default function Narratives() {
  const [formOpen, setFormOpen] = React.useState(false);
  const { narratives, addNarrative, loading } = useUserNarratives();

 

 
  return (
    <section className="mt-4 flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Your Narratives.</h3>
        <div>
          <p className="text-xs text-muted-foreground">{narratives.length}/12 slots available</p>
        </div>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-4 flex w-full ">
        {loading ? (
          <Loading
          message='Loading narratives...'
          color='bg-white/10'
          />
        ) : narratives.length > 0 ? (
          <div className="grid grid-cols-6 grid-rows-2 gap-4">
            {narratives
              .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
              .map((narrative) => (
                <NarrativeCard key={narrative.narrativeID} {...narrative} />
              ))}
            {narratives.length < 12 && (
              <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant={'default'}
                    className="w-full bg-white/5 hover:bg-white/10 text-white h-full"
                  >
                    <PlusCircle />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl font-figtree">
                  <DialogHeader>
                    <DialogTitle>Create New Narrative</DialogTitle>
                    <DialogDescription>
                      Let&apos;s start creating a new narrative. The world&apos;s next big story
                      starts here and now!
                    </DialogDescription>
                  </DialogHeader>
                  <Separator />
                  <NarrativeForm
                    addNarrative={addNarrative}
                    closeForm={()=> {
                      setFormOpen(false);
                    }} // Pass the closeForm function to the form
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-md text-muted-foreground">No narratives found.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'ghost'}>Create new narrative</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl font-figtree">
                <DialogHeader>
                  <DialogTitle>Create New Narrative</DialogTitle>
                  <DialogDescription>
                    Let&apos;s start creating a new narrative. The world&apos;s next big story
                    starts here and now!
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <NarrativeForm addNarrative={addNarrative} closeForm={()=> {
                      setFormOpen(false);
                    }}  />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
