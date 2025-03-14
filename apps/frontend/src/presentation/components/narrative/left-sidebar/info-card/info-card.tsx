'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';
import { useParams } from 'next/navigation';
import { FETCH_NARRATIVE_DETAILS } from '@/infrastructure/graphql/narratives';
import { Button } from '@/presentation/components/ui/button';
import { MoreVerticalIcon } from 'lucide-react';
import Metadata from './details';

// Refactor into a hook

export default function InfoCard() {
  const { id } = useParams();
  const [info, setInfo] = React.useState<{
    name: string;
    tagline: string;
    blurb: string;
    updatedAt: string;
  } | null>({
    name: "SpyXFamily",
    tagline: "In a world of espionage, a spy, an assassin, and a telepath form an unlikely family.",
    blurb: "In a world of espionage, a spy, an assassin, and a telepath form an unlikely family.",
    updatedAt: "2025-03-13T00:00:00Z",
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/graphql', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: FETCH_NARRATIVE_DETAILS,
  //         variables: { where: { narrativeID: id } },
  //       }),
  //     });
  //     const data = await response.json();
  //     setInfo(data.data.narratives[0]);
  //   }
  //   fetchData();
  // }, [id, isModalOpen]);


 

  if (!info) {
    return null
  }
  return (
    <section className="w-full bg-white/5 h-full flex flex-col items-center justify-center rounded-md border border-muted/20 shadow-sm shadow-black/5 group relative m-2">
        <div className="flex items-center justify-between h-full w-full">
          <div className='space-y-1 px-4'>
            <p className="font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis text-lg">
              {info.name}
            </p>

            <p className="text-xs text-muted-foreground tracking-wide">{info.tagline}</p>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVerticalIcon />
                  <span className="sr-only">Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl font-figtree">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>Make changes to your project or delete it.</DialogDescription>
                </DialogHeader>
                <Metadata info={info} id={id} closeModal={() => setIsModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
  );
}
