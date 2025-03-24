'use client';
import { Plus, PlusCircle, PlusCircleIcon } from 'lucide-react';
import type { Act, Chapter, Outline, Scene } from '@/entities/Outline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/presentation/components/ui/accordion';
import { InlineEdit } from '../../shared/inline-edit';
import { Button } from '../../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/presentation/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { Character } from '@/entities/Character';
import { Location } from '@/entities/Location';


export default function OutlineDirectory({ story, characters, locations }: { story: Outline, characters: Character[], locations: Location[] }) {
  return (
  <section className="flex-1 bg-black/10 text-gray-300 rounded-xl">
   
      {story.acts.map((act: Act) => (
        <div key={act.id} className="flex flex-col gap-2 py-4 px-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <p>
                  {act.title} /{' '}
                  <span className="text-xs">
                    {act.chapters.length} Chapter{act.chapters.length > 1 ? 's' : ''}
                  </span>
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className={`flex flex-col gap-4`}
                >
                  {act.chapters.map((chapter: Chapter) => (
                    <Card key={chapter.id} className="p-0 flex flex-col">
                      <CardHeader className="p-3 flex flex-row items-baseline gap-2">
                        <InlineEdit
                          value={chapter.title}
                          onChange={(value) => {
                            console.log(value);
                          }}
                          fontSize="lg"
                          weight="bolder"
                        />
                        <div>
                          <p className="text-xs text-gray-400">
                            {chapter.scenes.length} Scene{chapter.scenes.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        {chapter.scenes.map((scene: Scene) => (
                          <Card key={scene.id} className="p-0 mb-2">
                            <CardHeader className="p-3 flex space-y-0 ">
                              <InlineEdit
                                value={scene.title}
                                onChange={(value) => {
                                  console.log(value);
                                }}
                                fontSize="md"
                                weight="bold"
                              />
                              <InlineEdit
                                value={scene.content}
                                onChange={(value) => {
                                  console.log(value);
                                }}
                                rows={8}
                                fontSize="sm"
                                weight="normal"
                                mode="textarea"
                              />
                            </CardHeader>
                            <CardFooter className="flex gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size={'sm'}
                                    className=" py-1 h-fit w-fit"
                                    variant={'outline'}
                                  >
                                    <PlusCircleIcon />
                                    Characters
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="font-figtree">
                                  <DropdownMenuLabel>
                                    Add Character to {scene.title}
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {characters
                                    .filter((character) => !scene.characters.includes(character))
                                    .map((character) => (
                                      <DropdownMenuItem
                                        key={character.id}
                                        onClick={() => console.log(character)}
                                      >
                                        <PlusCircleIcon />
                                        {character.name}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size={'sm'}
                                    className=" py-1 h-fit w-fit"
                                    variant={'outline'}
                                  >
                                    <PlusCircleIcon />
                                    Locations
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="font-figtree">
                                  <DropdownMenuLabel>
                                    Where does {scene.title} take place?
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {locations
                                    // .filter((location) => !scene.locations.includes(location))
                                    .map((location) => (
                                      <DropdownMenuItem
                                        key={location.id}
                                        onClick={() => console.log(location)}
                                      >
                                        <PlusCircleIcon />
                                        {location.name}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </CardFooter>
                          </Card>
                        ))}
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <Button
                          size={'sm'}
                          className="w-fit bg-black/30 text-white/80 hover:bg-black/40"
                        >
                          <Plus size={24} />
                          Add Scene
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  <div>
                    <Button
                      size={'sm'}
                      className="w-fit bg-black/30 text-white/80 hover:bg-black/40"
                    >
                      <PlusCircle size={24} />
                      Add Chapter
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      <Button size={'sm'} className="px-4 w-fit bg-black/30 text-white/80 hover:bg-black/40 ml-8">
        <PlusCircle size={24} />
        Add Act
      </Button>
    </section>);
}
