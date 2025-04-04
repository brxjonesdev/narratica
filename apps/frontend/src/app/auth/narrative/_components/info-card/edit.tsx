'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import DeleteDialog from './delete';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { updateNarrativeMetadata } from '@/features/narratives/services/updateNarrativeMetadata';
import { removeNarrative } from '@/features/narratives/services/removeNarrative';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  tagline: z.string().min(2, { message: 'Tagline must be at least 2 characters.' }),
  blurb: z.string().min(10, { message: 'Blurb must be at least 10 characters.' }),
});

export default function EditMetadata({
  info,
  id,
  closeModal,
}: {
  info: { name: string; tagline: string; blurb: string };
  id: string | string[] | undefined;
  closeModal: () => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: info.name,
      tagline: info.tagline,
      blurb: info.blurb,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await updateNarrativeMetadata(id, values);
    } catch (error) {
      console.error('Failed to update metadata:', error);
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  const handleDelete = async () => {
    try {
      const result = await removeNarrative(id);
      if (!result.ok){
        toast.error('Failed to delete narrative');
        return;
      }
      toast.success('Narrative deleted successfully');
      router.push('/');
      
    } catch (error) {
      console.error('Failed to delete metadata:', error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tagline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blurb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blurb</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter blurb"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4 justify-end">
            <DeleteDialog
              narrativeName={info.name}
              isDeleteDialogOpen={isDeleteDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              handleDelete={handleDelete}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
