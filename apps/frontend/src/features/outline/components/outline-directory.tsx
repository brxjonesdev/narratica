/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Archive, PlusCircle, PlusCircleIcon, Trash2 } from "lucide-react"
import type { Act, Chapter, Outline, Scene } from "@/features/outline/types/Outline"
import { InlineEdit } from "@/shared/inline-edit"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import type { Character } from "@/features/characters/types/Character"
import type { NarrativeLocation } from "@/features/locations/types/Location"
import { Separator } from "@/shared/ui/separator"
import EmptyOutline from "./empty-outline"
import { useState } from "react"

export default function OutlineDirectory({
  story,
  characters,
  locations,
  acts,
  chapters,
  scenes,
}: {
  story: Outline
  characters: Character[]
  locations: NarrativeLocation[]
  acts: { add: (index: number) => void; edit: any; delete: any }
  chapters: { add: (index: number, actID: string) => void; edit: any; delete: any }
  scenes: {
    add: (index: number, chapterID: string) => void
    edit: any
    delete: any
    characters: { add: any; remove: any }
    locations: { add: any; remove: any }
  }
}) {
  const [actToArchive, setActToArchive] = useState<Act | null>(null)
  const [actToDelete, setActToDelete] = useState<Act | null>(null)

  if (story.acts.length === 0) {
    return <EmptyOutline addInitialAct={acts.add} />
  }

  return (
    <section className="flex-1 bg-black/10 text-gray-300 rounded-xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Story Outline</h2>
        <Button
          size="sm"
          className="bg-black/30 text-white/80 hover:bg-black/40"
          variant="outline"
          onClick={() => {
            acts.add(story.acts.length)
          }}
        >
          <PlusCircle size={18} className="" />
          Add Act
        </Button>
      </div>

      <div className="space-y-6">
        {story.acts.map((act: Act) => (
          <Card key={act.id} className="bg-black/20 border-gray-700">
            <CardHeader className="p-3.5 flex flex-row justify-between items-baseline">
              <div className="flex justify-between  flex-col gap-1">
                <h3 className="text-md font-semibold">
                  {`Act ${act.order + 1}: ${act.title}`}
                  <span className="text-xs ml-2 text-gray-400">
                    {act.chapters.length > 0
                      ? `${act.chapters.length} Chapter${act.chapters.length > 1 ? "s" : ""}`
                      : "No Chapters"}
                  </span>
                </h3>
             
              </div>
              <div className="flex gap-2"><Button
                size="sm"
                className="bg-black/30 text-white/80 hover:bg-black/40"
                variant="outline"
                onClick={() => chapters.add(act.chapters.length, act.id)}
              >
                <PlusCircle size={16} />
                Add Chapter
              </Button>
              <Dialog open={actToArchive?.id === act.id} onOpenChange={(open) => !open && setActToArchive(null)}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-black/30 text-white/80 hover:bg-black/40 h-8 w-8"
                        onClick={() => setActToArchive(act)}
                      >
                        <Archive size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-gray-200">
                      <DialogHeader>
                        <DialogTitle>Archive Act</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Are you sure you want to archive Act {act.order + 1}: {act.title}? This will hide it from your
                          outline.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100 "
                          onClick={() => setActToArchive(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={() => {
                            console.log(`Archiving act ${act.id}`)
                            // Here you would call acts.archive(act.id) or similar
                            setActToArchive(null)
                          }}
                        >
                          Archive
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={actToDelete?.id === act.id} onOpenChange={(open) => !open && setActToDelete(null)}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-black/30 text-white/80 hover:bg-black/40 h-8 w-8"
                        onClick={() => setActToDelete(act)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-gray-200">
                      <DialogHeader>
                        <DialogTitle>Delete Act</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Are you sure you want to delete Act {act.order + 1}: {act.title}? This action cannot be
                          undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                          onClick={() => setActToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            console.log(`Deleting act ${act.id}`)
                            // Here you would call acts.delete(act.id)
                            setActToDelete(null)
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
              
              </div>
              
            </CardHeader>

            <Separator className="bg-gray-700" />

            <CardContent className="pt-4 space-y-4">
              {act.chapters.map((chapter: Chapter) => (
                <Card key={chapter.id} className="bg-black/10 border-gray-700">
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-2">
                        <InlineEdit
                          value={chapter.title}
                          onChange={(value) => {
                            console.log(value)
                          }}
                          fontSize="lg"
                          weight="bolder"
                        />
                        <p className="text-xs text-gray-400">
                          {chapter.scenes.length} Scene{chapter.scenes.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-black/30 text-white/80 hover:bg-black/40"
                        variant="outline"
                        onClick={() => scenes.add(chapter.scenes.length, chapter.id)}
                      >
                        <PlusCircle size={16}/>
                        Add Scene
                      </Button>
                     

                  <Dialog open={actToDelete?.id === act.id} onOpenChange={(open) => !open && setActToDelete(null)}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-black/30 text-white/80 hover:bg-black/40 h-8 w-8"
                        onClick={() => setActToDelete(act)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-gray-200">
                      <DialogHeader>
                        <DialogTitle>Delete Act</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Are you sure you want to delete Act {act.order + 1}: {act.title}? This action cannot be
                          undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                          onClick={() => setActToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            console.log(`Deleting act ${act.id}`)
                            // Here you would call acts.delete(act.id)
                            setActToDelete(null)
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                      </div>
                    </div>
                  </CardHeader>

                  <Separator className="bg-gray-700" />

                  <CardContent className="pt-4 space-y-3">
                    {chapter.scenes.map((scene: Scene) => (
                      <Card key={scene.id} className="bg-black/5 border-gray-800">
                        <CardHeader className="p-3">
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
                            rows={6}
                            fontSize="sm"
                            weight="normal"
                            mode="textarea"
                          />

                          <div className="pt-2 space-y-2">
                            {scene.characters.length > 0 && (
                              <div>
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

                        <CardFooter className="flex gap-2 p-3 pt-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" className="py-1 h-fit" variant="outline">
                                <PlusCircleIcon className="mr-1 h-4 w-4" />
                                Characters
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="font-figtree bg-gray-800 border-gray-700">
                              <DropdownMenuLabel>Add Character to {scene.title}</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              {characters
                                .filter((character) => {
                                  return !scene.characters.some((c) => c.id === character.id)
                                })
                                .map((character) => (
                                  <DropdownMenuItem
                                    key={character.id}
                                    onClick={() => console.log(character)}
                                    className="hover:bg-gray-700"
                                  >
                                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                                    {character.name}
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" className="py-1 h-fit" variant="outline">
                                <PlusCircleIcon className="mr-1 h-4 w-4" />
                                Locations
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="font-figtree bg-gray-800 border-gray-700">
                              <DropdownMenuLabel>Where does {scene.title} take place?</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              {locations.map((location) => (
                                <DropdownMenuItem
                                  key={location.id}
                                  onClick={() => console.log(location)}
                                  className="hover:bg-gray-700"
                                >
                                  <PlusCircleIcon className="mr-2 h-4 w-4" />
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
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

