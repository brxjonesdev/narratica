'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { createNewNarrative } from '@/features/narratives/types/Narrative';
import { useAuth } from '@/shared/hooks/use-user';
import React from 'react';
import { addNewNarrative } from '@/features/narratives/services/createNewNarrative';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'name is required')
    .max(100, 'name must be 100 characters or less'),
  tagline: z.string().max(200, 'tagline must be 200 characters or less').optional(),
  blurb: z.string().max(500, 'Blurb must be 500 characters or less').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NarrativeForm() {
  const { user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tagline: '',
      blurb: '',
    },
  });

  async function handleNarrativeCreation(values: FormValues) {
    setLoading(true);
    setError(null);
    if (!user?.id) {
      setError('User ID is required to create a narrative.');
      setLoading(false);
      return;
    }
    const newNarrative = createNewNarrative(user.id, values);

    const result = await addNewNarrative(user.id, newNarrative);
    if (!result.ok) {
      setError('Failed to create narrative');
      setLoading(false);
      return;
    }
    router.push(`/narrative/${newNarrative.narrativeID}`);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNarrativeCreation)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name of your story" {...field} />
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
                    <Input placeholder="Enter a tagline (if applicable)" {...field} />
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
                  <FormLabel>Blurb (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description or teaser for your narrative"
                      className="resize-none"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {!error && loading ? 'Creating...' : 'Create Narrative'}
              {error && <p className="text-red-500">{error}</p>}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
