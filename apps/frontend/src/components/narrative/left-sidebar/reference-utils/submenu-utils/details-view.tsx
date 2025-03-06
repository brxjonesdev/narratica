import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


export default function DetailsView({ content } : { content: string | undefined }) {


  return (
    <section className="h-96 overflow-y-scroll flex flex-col">
      <CardHeader className="py-2 px-0">
        <CardTitle>Details</CardTitle>
        <CardDescription>
          Write all about your entitiy here. Be as detailed as possible.
        </CardDescription>
      </CardHeader>
      <Textarea className="flex-1 resize-none overflow-scroll" defaultValue={content}/>


    </section>
  );
}
