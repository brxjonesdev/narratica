import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type NarrativeOutline = {
  act: {
    title: string;
    chapters: {
      title: string;
      scenes: {
        id: string;
        title: string;
        description: string;
      }[];
    }[];
  }[];
};

type MatrixViewProps = {
  data: NarrativeOutline;
};

export default function MatrixView({ data }: MatrixViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Act</TableHead>
          <TableHead>Chapter</TableHead>
          <TableHead>Scene</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.act.map((act) =>
          act.chapters.map((chapter) =>
            chapter.scenes.map((scene, index) => (
              <TableRow key={scene.id}>
                {index === 0 && <TableCell rowSpan={chapter.scenes.length}>{act.title}</TableCell>}
                {index === 0 && (
                  <TableCell rowSpan={chapter.scenes.length}>{chapter.title}</TableCell>
                )}
                <TableCell>{scene.title}</TableCell>
                <TableCell>{scene.description}</TableCell>
              </TableRow>
            ))
          )
        )}
      </TableBody>
    </Table>
  );
}
