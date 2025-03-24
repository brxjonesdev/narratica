import { Location } from '@/entities/Location';
import { InlineEdit } from '@/presentation/components/shared/inline-edit';
import { CardHeader, CardContent } from '@/presentation/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/presentation/components/ui/tabs';
import { Delete } from 'lucide-react';
import React from 'react';
import { Button } from '@/presentation/components/ui/button';
import LocationDetails from './views/location-details';

interface LocationViewProps {
  location: Location;
  handleChange: (id: string, updatedLocation: Location) => void;
}

export default function LocationView({ location, handleChange }: LocationViewProps) {
  return (
    <>
      <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
        <div className="flex justify-between items-center w-full">
          <div className="w-full">
            <div className="flex items-baseline w-full">
              <div className="flex flex-col">
                <InlineEdit
                  value={location.name}
                  onChange={(value) => handleChange(location.id, { ...location, name: value })}
                  fontSize="2xl"
                  weight="bold"
                />
                <InlineEdit
                  value={location.subname}
                  onChange={(value) => handleChange(location.id, { ...location, subname: value })}
                  fontSize="xs"
                />
              </div>
            </div>
          </div>

          <Button
            className="hover:bg-red-600/60"
            variant={'ghost'}
            size={'icon'}
            // onClick={() => {
            //    onDelete(location.id)
            // }}
          >
            <Delete />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex ">
        <LocationDetails location={location} onUpdate={handleChange} />
      </CardContent>
    </>
  );
}
