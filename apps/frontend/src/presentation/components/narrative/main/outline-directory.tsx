"use client"
import { PlusCircle, PlusCircleIcon } from "lucide-react"
import type { Act, Chapter, Outline, Scene } from "@/entities/Outline"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/presentation/components/ui/accordion"
import { InlineEdit } from "../../shared/inline-edit"
import { Button } from "../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/presentation/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"
import type { Character } from "@/entities/Character"
import type { Location } from "@/entities/Location"
import { Separator } from "../../ui/separator"

export default function OutlineDirectory({
  story,
  characters,
  locations,
}: { story: Outline; characters: Character[]; locations: Location[] }) {
  return (
    <section className="flex-1 bg-black/10 text-gray-300 rounded-xl space-y-4">
      {story.acts.map((act: Act) => (
        <div key={act.id} className="flex flex-col gap-2 ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <p>
                  {act.title} /{" "}
                  <span className="text-xs">
                    {act.chapters.length} Chapter{act.chapters.length > 1 ? "s" : ""}
                  </span>
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div className={`flex flex-col gap-4`}>
                  {act.chapters.map((chapter: Chapter) => (
                    <Card key={chapter.id} className="p-0 flex flex-col">
                      <CardHeader className="flex justify-between flex-row items-baseline py-2">
                        <div className="flex flex-row items-baseline gap-2">
                          <InlineEdit
                            value={chapter.title}
                            onChange={(value) => {
                              console.log(value)
                            }}
                            fontSize="lg"
                            weight="bolder"
                          />
                          <div>
                            <p className="text-xs text-gray-400">
                              {chapter.scenes.length} Scene{chapter.scenes.length > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <Button
                          size={"sm"}
                          className=" w-fit bg-black/30 text-white/80 hover:bg-black/40 "
                          variant={"outline"}
                        >
                          <PlusCircle size={18} />
                          Add Scene
                        </Button>
                      </CardHeader>
                      <Separator className="my-1" />
                      <CardContent className="flex-1 pt-6">
                        {chapter.scenes.map((scene: Scene) => (
                          <Card key={scene.id} className="p-0 mb-2">
                            <CardHeader className="p-3 flex space-y-0 ">
                              <InlineEdit
                                value={scene.title}
                                onChange={(value) => {
                                  console.log(value)
                                }}
                                fontSize="lg"
                              />

                              <InlineEdit
                                value={scene.summary}
                                onChange={(value) => {
                                  console.log(value)
                                }}
                                rows={8}
                                fontSize="sm"
                                weight="normal"
                                mode="textarea"
                              />
                              <div className="px-3 pb-3 pt-1">
                                {scene.characters.length > 0 && (
                                  <div className="mb-2">
                                    <h4 className="text-xs font-semibold text-gray-400 mb-1">Characters:</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {scene.characters.map((character) => (
                                        <span
                                          key={character.id}
                                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                        >
                                          {character.name}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {scene.locations.length > 0 && (
                                  <div>
                                    <h4 className="text-xs font-semibold text-gray-400 mb-1">Locations:</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {scene.locations.map((location) => (
                                        <span
                                          key={location.id}
                                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                        >
                                          {location.name}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardHeader>
                            <CardFooter className="flex gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size={"sm"} className=" py-1 h-fit w-fit" variant={"outline"}>
                                    <PlusCircleIcon />
                                    Characters
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="font-figtree">
                                  <DropdownMenuLabel>Add Character to {scene.title}</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {characters
                                    .filter((character) => {
                                      return !scene.characters.some((c) => c.id === character.id)
                                    })
                                    .map((character) => (
                                      <DropdownMenuItem key={character.id} onClick={() => console.log(character)}>
                                        <PlusCircleIcon />
                                        {character.name}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size={"sm"} className=" py-1 h-fit w-fit" variant={"outline"}>
                                    <PlusCircleIcon />
                                    Locations
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="font-figtree">
                                  <DropdownMenuLabel>Where does {scene.title} take place?</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {locations
                                    // .filter((location) => !scene.locations.includes(location))
                                    .map((location) => (
                                      <DropdownMenuItem key={location.id} onClick={() => console.log(location)}>
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
                    </Card>
                  ))}
                  <div>
                    <Button
                      size={"sm"}
                      className=" w-fit bg-black/30 text-white/80 hover:bg-black/40 "
                      variant={"outline"}
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
      <Button size={"sm"} className=" w-fit bg-black/30 text-white/80 hover:bg-black/40 " variant={"outline"}>
        <PlusCircle size={24} />
        Add Act
      </Button>
    </section>
  )
}

