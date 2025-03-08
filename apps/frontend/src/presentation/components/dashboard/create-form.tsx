'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Textarea } from '@/presentation/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { CREATE_NARRATIVE } from '@/infrastructure/graphql/narratives';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/presentation/components/ui/card';
import { Narrative } from '@/entities/Narrative';
import { useAuth } from '@/presentation/hooks/use-user';
import { GraphQLFetcher } from '@/lib/fetcher';
import React from 'react';

const formSchema = z.object({
  name: z.string().min(1, 'name is required').max(100, 'name must be 100 characters or less'),
  tagline: z.string().max(200, 'tagline must be 200 characters or less').optional(),
  blurb: z.string().max(500, 'Blurb must be 500 characters or less').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NarrativeForm({
  addNarrative,
  closeForm,
}: {
  addNarrative: (narrative: Narrative) => void;
  closeForm: () => void;
}) {
  const {user} = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tagline: '',
      blurb: '',
    },
  });

  const handleNarrativeCreation = async (data: FormValues) => {
    if (!user) {
      toast.error('You must be logged in to create a narrative.');
      return;
    }
    setLoading(true);
    setError(null);
    const userID = user.id;
    const currentDate = new Date().toISOString();

    const variables = {
      input: [
        {
          userID: userID,
          tagline: data.tagline || '',
          blurb: data.blurb || '',
          name: data.name || '',
          createdAt: currentDate,
          updatedAt: currentDate,
          narrativeID: `${nanoid(16)}-${Math.floor(Math.random() * 177013)}-${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`,
        },
      ],
    };

    const response = await GraphQLFetcher(CREATE_NARRATIVE, variables) as { data: { createNarratives: {narratives : Narrative[]} } };
    const newNarrative = response.data.createNarratives.narratives[0];
    if (newNarrative) {
      addNarrative(newNarrative);
      toast.success('Narrative created successfully!');
      setLoading(false);
      setError(null);
      form.reset();
      closeForm();
    } else {
      setLoading(false);
      setError('Failed to create narrative.');
      return toast.error('Failed to create narrative. Please try again.');
    }
    
  };

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
