'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useParams } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { MoreVerticalIcon } from 'lucide-react';
import Metadata from './details';
import useNarrativeDetails from '@/features/narratives/hooks/use-narrative-details';
import Loading from '@/shared/loading';

export default function InfoCard() {
  const { id } = useParams();
  const { info, setIsModalOpen, isModalOpen } = useNarrativeDetails(id);
  if (!info) {
    return (
      <div className="max-h-[300px] flex items-center justify-center">
        <Loading size="sm" />
      </div>
    );
  }

  return (
    <section className="w-full bg-white/5 h-full flex flex-col items-center justify-center rounded-md border border-muted/20 shadow-sm shadow-black/5 group relative m-2">
      <div className="flex items-center justify-between h-full w-full">
        <div className="space-y-1 px-4">
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
