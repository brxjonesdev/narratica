'use client';

import React from 'react';
import NarrativeCard from './narrative-card';
import { useUserNarratives } from '@/features/narratives/hooks/use-narratives';
import Loading from '@/shared/loading';
import AddNarrative from './add-narrative-btn';

export default function Narratives() {
  const MAX_NARRATIVES = 6;
  const { narratives, addNarrative, loading } = useUserNarratives();

  return (
    <section className="mt-4 flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">Your Narratives.</h3>
          <p className="text-xs text-muted-foreground">
            {narratives.length}/{MAX_NARRATIVES} slots available
          </p>
        </div>
        <div>
          <AddNarrative
            onAddNarrative={addNarrative}
            isMaxedOut={narratives.length > MAX_NARRATIVES}
          />
        </div>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-4 flex w-full ">
        {loading ? (
          <Loading message="Loading narratives..." color="bg-white/10" />
        ) : narratives.length > 0 ? (
          <div className=" grid md:grid-cols-3 md:grid-rows-2 auto-rows-[200px] w-full gap-2">
            {narratives.map((narrative) => (
              <NarrativeCard key={narrative.narrativeID} {...narrative} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-1">
      <p className="text-md text-muted-foreground">No narratives found.</p>
      <p className="text-sm text-muted-foreground">
        Create your first narrative by clicking the button above!
      </p>
    </div>
  );
}
