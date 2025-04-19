import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import NarrativeForm from './create-form';


interface AddNarrativeProps {
  isMaxedOut?: boolean;
}
export default function AddNarrativeBtn({ isMaxedOut }: AddNarrativeProps) {
  const [formOpen, setFormOpen] = React.useState(false);
  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'default'}
          className="w-full bg-white/5 hover:bg-white/10 text-white h-full"
          disabled={isMaxedOut}
        >
          <PlusCircle />
          <span className="hidden md:inline-block ml-2">Create Narrative</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl font-figtree">
        <DialogHeader>
          <DialogTitle>Create New Narrative</DialogTitle>
          <DialogDescription>
            Let&apos;s start creating a new narrative. The world&apos;s next big story starts here
            and now!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <NarrativeForm
        />
      </DialogContent>
    </Dialog>
  );
}
