"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GridView from '@/components/narrative/outline/grid';
import ListView from '@/components/narrative/outline/list';
import MatrixView from '@/components/narrative/outline/matrix';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import Settings from './settings/page';
import Menu from '@/components/narrative/menu';
import { useParams } from 'next/navigation';

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
        description: string;
        labels: string[];
        associatedLinks: {
          id: string;
          title: string;
          description: string;
          category: string;
        }[];
      }[];
    }[];
  }[];
};

export default function NarrativeOutline({}) {
  const sampleData: NarrativeOutline = {
    act: [
      {
        id: 'act1',
        title: 'Act 1',
        description: 'The beginning of the story',
        chapters: [
          {
            id: 'chapter1',
            title: 'Chapter 1',
            description: 'Introduction to the main character',
            scenes: [
              {
                id: 'scene1',
                title: 'Scene 1',
                description: 'Character wakes up',
                labels: ['morning', 'introduction'],
                associatedLinks: [
                  {
                    id: 'link1',
                    title: "Character's House",
                    description: 'Description of the house',
                    category: 'Location',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const { id } = useParams();

  const views = [
    { name: 'Grid', value: 'grid', component: <GridView data={sampleData} /> },
    { name: 'List', value: 'list', component: <ListView data={sampleData} /> },
    { name: 'Matrix', value: 'matrix', component: <MatrixView data={sampleData} /> },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between pr-4">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Menu id={id} />
        </div>
      </header>
      <section className="flex flex-1 flex-col gap-4 p-4 bg-white/5 m-2 rounded-xl">
        <Tabs defaultValue="grid" className="">
          <TabsList>
            {views.map((view) => (
              <TabsTrigger key={view.value} value={view.value}>
                {view.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {views.map((view) => (
            <TabsContent key={view.value} value={view.value}>
              {view.component}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
}
