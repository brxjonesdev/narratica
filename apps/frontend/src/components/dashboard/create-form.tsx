'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useGraphQLRequest from '@/hooks/use-graphql';
import { CREATE_NARRATIVE } from '@/lib/graphql/narratives';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/utils/client';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(1, 'name is required').max(100, 'name must be 100 characters or less'),
  tagline: z.string().max(200, 'tagline must be 200 characters or less').optional(),
  blurb: z.string().max(500, 'Blurb must be 500 characters or less').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NarrativeForm({ addNarrative, closeForm }: { addNarrative: (narrative : {
  userID: string;
  tagline: string;
  blurb: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  narrativeID: string;
}) => void, closeForm: () => void }) {
  const { sendRequest, loading, error } = useGraphQLRequest();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tagline: '',
      blurb: '',
    },
  });

  const handleNarrativeCreation = async (data: FormValues) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error('User not authenticated');
      return;
    }
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

    const response = await sendRequest(CREATE_NARRATIVE, variables);
    if (response?.createNarratives?.narratives) {
      addNarrative(variables.input[0]);
      form.reset();
      toast.custom(() => (
        <Card className='font-figtree text-sm'>
          <CardHeader>
            <CardTitle>A new Narrative was just created!</CardTitle>
            <CardDescription>{variables.input[0].name}</CardDescription>
          </CardHeader>
        </Card>
      ));
      closeForm();
    } else {
      console.error('Failed to create narrative', response);
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
              {loading ? 'Creating...' : 'Create Narrative'}
              {error && <p className="text-red-500">{error}</p>}
            </Button>
          </CardFooter>
          
        </form>
      </Form>
    </Card>
  );
}
