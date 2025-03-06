'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useParams } from 'next/navigation';



export default function NarrativeOutline() {
 
  // const { id } = useParams();

  const views = [
    { name: 'Grid', value: 'grid', component: null },
    { name: 'List', value: 'list', component: null },
    { name: 'Matrix', value: 'matrix', component: null },
  ];

  return (
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
  );
}
