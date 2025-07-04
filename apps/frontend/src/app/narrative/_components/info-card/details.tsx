import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import EditMetadata from './edit';

export default function Metadata({
  info,
  id,
  closeModal,
}: {
  info: { name: string; tagline: string; blurb: string };
  id: string | string[] | undefined;
  closeModal: () => void;
}) {
  const options = [
    {
      value: 'details',
      label: 'Details',
      component: <EditMetadata info={info} id={id} closeModal={closeModal} />,
    },
    { value: 'labels', label: 'Labels', component: <div>Labels</div> },
  ];
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="w-full"
            disabled={option.value !== 'details'}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent key={option.value} value={option.value} className="w-full">
          {option.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
