'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';

interface DeleteDialogProps {
  narrativeName: string;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  narrativeName,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDelete,
}: DeleteDialogProps) {
  const [firstConfirmation, setFirstConfirmation] = useState('');
  const [secondConfirmation, setSecondConfirmation] = useState('');

  const isConfirmationValid =
    firstConfirmation === narrativeName && secondConfirmation === narrativeName;

  const resetInputs = () => {
    setFirstConfirmation('');
    setSecondConfirmation('');
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetInputs();
    }
    setIsDeleteDialogOpen(open);
  };

  const handleDeleteClick = () => {
    if (isConfirmationValid) {
      handleDelete();
      resetInputs();
    }
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          Delete Narrative
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md font-figtree">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            This will permanently delete the narrative &quot;{narrativeName}&quot; and all connected
            information. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="first-confirmation">
              Type <span className="font-bold">{narrativeName}</span> to confirm:
            </Label>
            <Input
              id="first-confirmation"
              value={firstConfirmation}
              onChange={(e) => setFirstConfirmation(e.target.value)}
              placeholder={'Type the narrative name to confirm'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="second-confirmation">
              Type <span className="font-bold">{narrativeName}</span> again:
            </Label>
            <Input
              id="second-confirmation"
              value={secondConfirmation}
              onChange={(e) => setSecondConfirmation(e.target.value)}
              placeholder={'Type the narrative name again'}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteClick}
            disabled={!isConfirmationValid}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
