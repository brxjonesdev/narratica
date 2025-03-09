'use client';
import * as React from 'react';
import { Card } from '@/presentation/components/ui/card';
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
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { Button } from '@/presentation/components/ui/button';
import { MoreVerticalIcon } from 'lucide-react';
import Metadata from './details';

export default function InfoCard() {
  const { id } = useParams();
  const [info, setInfo] = React.useState<{
    name: string;
    tagline: string;
    blurb: string;
    updatedAt: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: FETCH_NARRATIVE_DETAILS,
          variables: { where: { narrativeID: id } },
        }),
      });
      const data = await response.json();
      setInfo(data.data.narratives[0]);
    }
    fetchData();
  }, [id, isModalOpen]);

  if (!info) {
    return (
      <Card className="flex items-center p-3 gap-3 my-4 mx-2">
        <section className="w-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
        </section>
      </Card>
    );
  }
  return (
    <Card className="flex items-center p-3 gap-3 relative group my-4 mx-2 pr-10">
      <section className="w-full">
        <div className="flex items-top justify-between">
          <div>
            <p className="font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis text-sm">
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
    </Card>
  );
}
