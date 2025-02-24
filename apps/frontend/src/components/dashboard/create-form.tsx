"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useGraphQLRequest from "@/hooks/use-graphql"
import { CREATE_NARRATIVE, CreateNarrativeProps } from "@/lib/graphql/narratives"


const formSchema = z.object({
  name: z.string().min(1, "name is required").max(100, "name must be 100 characters or less"),
  tagline: z.string().max(200, "tagline must be 200 characters or less").optional(),
  blurb: z.string().max(500, "Blurb must be 500 characters or less").optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function NarrativeForm() {
  const { sendRequest, loading, error } = useGraphQLRequest();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Sample name",
      tagline: "Sample tagline",
      blurb: "This is a sample blurb for the narrative.",
    },
  })

  const handleNarrativeCreation = async (data: FormValues) => {
    console.log("Creating narrative with data:", data)
    const variables = {
      input: [
        {
          userID: "placeholder-user-id", // Replace with actual user ID
          tagline: data.tagline || "",
          blurb: data.blurb || "",
          name: data.name || "",
        },
      ],
    };

    const response = await sendRequest(CREATE_NARRATIVE, variables);
    console.log("Response from server:", response);

    
    // Here you would typically send the data to an API or perform other actions
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
                  <FormLabel>name</FormLabel>
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
                  <FormLabel>tagline</FormLabel>
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
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

