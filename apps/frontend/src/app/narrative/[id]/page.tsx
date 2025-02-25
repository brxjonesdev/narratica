import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GridView from '@/components/narrative/outline/grid';
import ListView from '@/components/narrative/outline/list';
import MatrixView from '@/components/narrative/outline/matrix';

export default function NarrativeOutline() {
  const views = [
    // Pass data to these
    { name: 'Grid', value: 'grid', component: <GridView /> },
    { name: 'List', value: 'list', component: <ListView /> },
    { name: 'Matrix', value: 'matrix', component: <MatrixView /> },
  ];
  const data = true;
  return (
    <section className="flex flex-1 flex-col gap-4 p-4">
      {/* <Tabs defaultValue="grid" className="w-full flex-1">
  <TabsList className='w-fit'>
    {views.map((view) => (
      <TabsTrigger key={view.value} value={view.value} className='w-full'>
        {view.name}
      </TabsTrigger>
    ))}
  </TabsList>
  {views.map((view) => (
    <TabsContent key={view.value} value={view.value} className='w-full'>
      {view.component}
    </TabsContent>
  ))}
</Tabs>   */}
    </section>
  );
}
