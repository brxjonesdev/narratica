'use client'; // Ensures this runs as a Client Component

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

export type NarrativeCardProps = {
  id: string;
  title: string;
  lastUpdated: string;
  image: string;
};

export default function Narratives() {
  const [narratives, setNarratives] = useState<NarrativeCardProps[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch by the correct userID
  // Handle CRUD operations
  // Handle Errors
  // Handle Loading States
  // Handle Empty States
  // Max 12 narratives per account

  useEffect(() => {
    const fetchNarratives = async () => {
      const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) {
      console.error('User ID not found');
    // TOAST ERROR
      setLoading(false);
      return;
    }
      try {
        const response = await fetch("/api/graphql", { // ✅ Uses relative URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: GET_USER_NARRATIVES,
            variables: {
              "where": {
                "userID_EQ": null
              }
            },
          }),
        });
        
        console.log('Response status:', response);
        const { data } = await response.json();
        console.log('Fetched narratives:', data);
        setNarratives(data?.narratives || []);
      } catch (error) {
        console.error('Error fetching narratives:', error);
        // TOAST ERROR
      } finally {
        setLoading(false);
      }
    };

    fetchNarratives();
  }, []);

  return (
    <section className="mt-4 flex-1 flex flex-col gap-4">
      <div className='flex items-center justify-between'>
      <h3 className="font-bold">Your Narratives.</h3>
      <div>
        <p className='text-xs text-muted-foreground'>{narratives.length}/12 slots available</p>
      </div>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-4 flex flex-wrap gap-4">
        {loading ? (
          <p className="text-muted-foreground">Loading narratives...</p>
        ) : narratives.length > 0 ? (
          narratives.map((narrative) => <NarrativeCard key={narrative.id} {...narrative} />)
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
                <NarrativeForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
