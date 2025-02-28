"use client";
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useParams } from 'next/navigation';
import { FETCH_NARRATIVE_DETAILS } from '@/lib/graphql/narratives';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {MoreVerticalIcon} from 'lucide-react';
import Metadata from './info-views/details';



export default function InfoCard() {
  const {id} = useParams();
  const [info, setInfo] = React.useState<
  { name: string; tagline: string; blurb: string; updatedAt: string } | null
  >(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false)



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
  }, [id, isModalOpen])

  if (!info) {
    return (
      <Card className="flex items-center p-3 gap-3">
        <section className="w-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Separator className="my-2" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </section>
      </Card>
    )
  }

  console.log(info, "meowwww");
  return (
    <Card className="flex items-center p-3 gap-3 relative group">
      <div className='h-full w-1 bg-white/50 rounded-full'/>
      <section className="w-full">
        <div className="flex items-top justify-between">
          <div>
            <p className='text-lg font-semibold tracking-wide'>{info.name}</p>
            <p className="text-xs text-muted-foreground tracking-wide">{info.tagline}</p>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVerticalIcon/>
                  <span className="sr-only">Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-xl font-figtree'>
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>Make changes to your project or delete it.</DialogDescription>
                </DialogHeader>
               <Metadata
                info={info}
                id={id}
                closeModal={() => setIsModalOpen(false)}
             
               />      
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className="my-2" />
        <div>
          <p className="text-xs">
            Last Updated:{" "}
            <span className="text-xs text-muted-foreground">
              {new Date(info.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </p>
        </div>
      </section>
    </Card>
  );
}
