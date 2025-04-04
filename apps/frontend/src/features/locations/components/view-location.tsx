import { Location } from '@/features/locations/types/Location';
import { InlineEdit } from '@/shared/inline-edit';
import { CardHeader, CardContent } from '@/shared/ui/card';
import { Delete } from 'lucide-react';
import React from 'react';
import { Button } from '@/shared/ui/button';
import LocationDetails from './location-details';

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
