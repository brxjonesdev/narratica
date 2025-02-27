import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type NarrativeOutline = {
  act: {
    id: string;
    title: string;
    description: string;
    chapters: {
      id: string;
      title: string;
      description: string;
      scenes: {
        id: string;
        title: string;
      }[];
    }[];
  }[];
};

type ListViewProps = {
  data: NarrativeOutline;
};

export default function ListView({ data }: ListViewProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.act.map((act) => (
        <AccordionItem key={act.id} value={act.id}>
          <AccordionTrigger>{act.title}</AccordionTrigger>
          <AccordionContent>
            <p>{act.description}</p>
            <ul className="mt-4 space-y-2">
              {act.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <h3 className="font-semibold">{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  <ul className="ml-4 mt-2 space-y-1">
                    {chapter.scenes.map((scene) => (
                      <li key={scene.id}>{scene.title}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
