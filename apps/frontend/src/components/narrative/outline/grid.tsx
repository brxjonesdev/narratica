import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type NarrativeOutline = {
  act: {
    id: string;
    title: string;
    description: string;
    chapters: {
      id: string;
      title: string;
      description: string;
    }[];
  }[];
};

type GridViewProps = {
  data: NarrativeOutline;
};

export default function GridView({ data }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.act.map((act) => (
        <Card key={act.id}>
          <CardHeader>
            <CardTitle>{act.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{act.description}</p>
            <div className="mt-4">
              {act.chapters.map((chapter) => (
                <div key={chapter.id} className="mb-2">
                  <h3 className="font-semibold">{chapter.title}</h3>
                  <p>{chapter.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
