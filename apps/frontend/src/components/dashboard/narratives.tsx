'use client';

import React, { useEffect, useState } from 'react';
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
import { GET_USER_NARRATIVES } from '@/lib/graphql/narratives';
import { createClient } from '@/lib/utils/client';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export type NarrativeCardProps = {
  userID: string;
  name: string;
  tagline: string;
  image?: string;
  blurb: string;
  narrativeID: string;
  createdAt: string;
  updatedAt: string;
};

export default function Narratives() {
  const [narratives, setNarratives] = useState<NarrativeCardProps[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNarratives = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;
      console.log('User ID:', userId);
      if (!userId) {
        toast.error('User not found. Please log in again.');
        setLoading(false);
        router.push('/auth');
        return;
      }
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_USER_NARRATIVES,
            variables: {
              where: {
                userID_EQ: userId,
              },
            },
          }),
        });
        const { data } = await response.json();
        setNarratives([...narratives, ...data.narratives]);
      } catch (error) {
        toast.error('Failed to fetch narratives. Please try again later.');
        console.error('Error fetching narratives:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNarratives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addNarrative(narrative: NarrativeCardProps) {
    setNarratives([...narratives, narrative]);
  }

  function closeForm() {
    setFormOpen(false);
  }

  return (
    <section className="mt-4 flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Your Narratives.</h3>
        <div>
          <p className="text-xs text-muted-foreground">{narratives.length}/12 slots available</p>
        </div>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-4 flex ">
        {loading ? (
          <p className="text-muted-foreground">Loading narratives...</p>
        ) : narratives.length > 0 ? (
          <div className="flex flex-wrap w-full gap-4">
            {narratives
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((narrative) => (
                <NarrativeCard key={narrative.narrativeID} {...narrative} />
              ))}
            {narratives.length < 12 && (
              <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant={'default'}
                    className="h-[50%] bg-white/5 hover:bg-white/10 text-white w-1/5"
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
                    closeForm={closeForm} // Pass the closeForm function to the form
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
                <NarrativeForm addNarrative={addNarrative} closeForm={closeForm} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
