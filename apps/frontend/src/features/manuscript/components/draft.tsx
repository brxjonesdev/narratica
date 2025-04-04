import { Character } from '@/features/characters/types/Character';
import { Outline } from '@/features/manuscript/types/Outline';
import { Location } from '@/features/locations/types/Location';
import React from 'react';
import { InlineEdit } from '@/shared/inline-edit';
import { Card, CardFooter, CardHeader } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { PlusCircleIcon,} from 'lucide-react';
import { Button } from '@/shared/ui/button';


export default function Draft({
  story,
  characters,
  locations,
}: {
  story: Outline;
  characters: Character[];
  locations: Location[];
}) {
  return (
    <section className="flex flex-1 flex-col gap-4 p-1 bg-black/5 rounded-xl">
      {story.acts.map((act) => (
        <div key={act.id} className="flex flex-col gap-2 ">
          <div className="flex items-center w-full justify-center">
            <p className="font-semibold">{act.title}</p>
          </div>

          {act.chapters.map((chapter) => (
            <div key={chapter.id} className="flex flex-col gap-2 p-2 bg-black/10 rounded-lg">
              <InlineEdit
                value={chapter.title}
                onChange={(value) => {
                  console.log(value);
                }}
                fontSize="2xl"
                weight="bold"
              />
              {chapter.scenes.map((scene) => (
                <div key={scene.id} className="py-2 px-4 rounded-md">
                  <InlineEdit
                    value={scene.title}
                    onChange={(value) => {
                      console.log(value);
                    }}
                    fontSize="xl"
                  />
                  <div className="grid grid-cols-[2fr_.5fr] gap-2 ">
                    <InlineEdit
                      value={scene.content}
                      onChange={(value) => {
                        console.log(value);
                      }}
                      fontSize="md"
                      weight="normal"
                      mode="textarea"
                      rows={5}
                    />

                    <Card key={scene.id} className="p-0 mb-2 flex flex-col bg-black/10 h-full">
                      {/* Header with improved alignment */}
                      <CardHeader className="px-4 py-3 flex flex-col ">
                        <p className="text-sm font-semibold">Summary</p>
                        <p className="text-sm text-muted-foreground">
                          {scene.summary ? scene.summary : 'No summary available.'}
                        </p>
                      </CardHeader>

                      {/* Footer with buttons properly aligned */}
                      <CardFooter className="flex justify-between gap-2 mt-auto p-4 py-3`1">
                        {/* Characters Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" className="py-1" variant="outline">
                              <PlusCircleIcon className="mr-1 h-4 w-4" />
                              Characters
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="font-figtree">
                            <DropdownMenuLabel>Add Character to {scene.title}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {characters
                              .filter((character) => !scene.characters.includes(character))
                              .map((character) => (
                                <DropdownMenuItem
                                  key={character.id}
                                  onClick={() => console.log(character)}
                                >
                                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                                  {character.name}
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Locations Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" className="py-1" variant="outline">
                              <PlusCircleIcon className="mr-1 h-4 w-4" />
                              Locations
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="font-figtree">
                            <DropdownMenuLabel>
                              Where does {scene.title} take place?
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {locations.map((location) => (
                              <DropdownMenuItem
                                key={location.id}
                                onClick={() => console.log(location)}
                              >
                                <PlusCircleIcon className="mr-2 h-4 w-4" />
                                {location.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
