'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/presentation/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { Textarea } from '@/presentation/components/ui/textarea';
import DeleteDialog from './delete';
import { UPDATE_NARRATIVE } from '@/infrastructure/graphql/narratives';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  tagline: z.string().min(2, {
    message: 'Tagline must be at least 2 characters.',
  }),
  blurb: z.string().min(10, {
    message: 'Blurb must be at least 10 characters.',
  }),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: info.name,
      tagline: info.tagline,
      blurb: info.blurb,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: UPDATE_NARRATIVE,
          variables: {
            where: {
              narrativeID: id,
            },
            update: {
              name: values.name,
              tagline: values.tagline,
              blurb: values.blurb,
              updatedAt: new Date().toISOString(),
            },
          },
        }),
      });
      const data = await response.json();
      console.log('Update response:', data);
    } catch (error) {
      console.error('Failed to update metadata:', error);
      // You could add an error notification here
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  }

  async function handleDelete() {
    try {
      // Here you would make an API call to delete the data
      // Example: await deleteMetadata(id)
      console.log('Deleting metadata with ID:', id);
      // You could add a success notification here or redirect
    } catch (error) {
      console.error('Failed to delete metadata:', error);
      // You could add an error notification here
    } finally {
      setIsDeleteDialogOpen(false);
    }
  }

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
