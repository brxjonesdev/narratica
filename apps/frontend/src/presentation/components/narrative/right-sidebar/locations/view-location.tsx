import { Location } from '@/entities/Location'
import { InlineEdit } from '@/presentation/components/shared/inline-edit'
import { CardHeader, CardContent } from '@/presentation/components/ui/card'
import { Separator } from '@radix-ui/react-separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/presentation/components/ui/tabs'
import { Delete } from 'lucide-react'
import React from 'react'
import { Button } from '@/presentation/components/ui/button'
import LocationDetails from './views/location-details'

interface LocationViewProps {
    location: Location;
    handleChange: (id: string, updatedLocation: Location) => void;
}

export default function LocationView({location, handleChange}: LocationViewProps) {
    const options = [
    { label: 'Details', value: 'details', component: <LocationDetails location={location} onChange={handleChange}/>},
    { label: "Society", value: 'society', component: <div>Society and Organizations</div>},
    {label: "Events", value: 'events', component: <div>Events</div>},
  
    ]
  return (
    <>
    <CardHeader className="w-full flex items-start flex-col gap-2 h-fit">
                      <div className="flex justify-between items-center w-full">
                        <div>
                            <div className='flex items-baseline w-full'>
                        <InlineEdit
                            value={location.name}
                            onChange={(value) => handleChange( location.id, { ...location, name: value })}
                            fontSize='4xl'
                            weight='bold'
                             />
                             <InlineEdit
                            value={location.subname}
                            onChange={(value) => handleChange( location.id, { ...location, subname: value })}
                            fontSize='xs'
                             />
                             </div>
                             <InlineEdit
                            value={location.description}
                            onChange={(value) => handleChange( location.id, { ...location, description: value })}
                            fontSize='sm'
                            mode='textarea'
                            rows={9}
                             />
                             </div>
                             
                        <Button className="hover:bg-red-600/60" variant={'ghost'} size={'icon'}
                            // onClick={() => {
                            //    onDelete(location.id)
                            // }}
                        >
                          <Delete />
                        </Button>
                      </div>
                    </CardHeader>

                    <Separator className="w-full" />

                    <CardContent className="overflow-y-scroll flex-1 flex pt-4 ">
                      <Tabs defaultValue="details" className="w-full flex-1 overflow-y-scroll  rounded-t-xl pr-4 flex flex-col">
                        <TabsList className="w-full">
                          {options.map((option) => (
                            <TabsTrigger
                              key={option.value}
                              value={option.value}
                              className="w-full"
                              disabled={option.value === 'mentions'}
                            >
                              {option.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {options.map((option) => (
                          <TabsContent key={option.value} value={option.value} className="h-full">
                            {option.component}
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
    </>
  )
}
