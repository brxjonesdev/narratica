"use client"
import { type ManuscriptActions, useManuscript } from "@/features/outline/hooks/use-manuscript"
import { useNarrativeStore } from "@/shared/stores/narrative-store-provider"
import { useMediaQuery } from "react-responsive"
import MobileView from "@/app/narrative/[id]/components/mobile-view"
import Loading from "@/shared/loading"
import OutlineError from "@/features/outline/components/error"
import { Button } from "@/shared/ui/button"
import { PlusCircle, View, X } from "lucide-react"
import EmptyOutline from "@/features/outline/components/empty-outline"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { PlusCircleIcon, Trash2 } from "lucide-react"
import type { Act, Chapter, Scene } from "@/features/outline/types/Outline"
import { InlineEdit } from "@/shared/inline-edit"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Separator } from "@/shared/ui/separator"
import { Label } from "@/shared/ui/label"

export default function NarrativeOutline() {
  const { locations, characters } = useNarrativeStore((store) => store)
  const isMobile = useMediaQuery({ maxWidth: 1080 })
  const { story, acts, chapters, scenes, loading, error }: ManuscriptActions = useManuscript()

  if (isMobile) {
    return (
      <MobileView>
        <div>Hello</div>
      </MobileView>
    )
  }

  if (loading) {
    return <Loading message="Loading the next best story..." />
  }

  if (error) {
    console.log(error)
    return <OutlineError message={error} />
  }

  if (!story || story === undefined || (Array.isArray(story) && story.length === 0)) {
    // If there are no acts, show the empty outline component
    return <EmptyOutline addInitialAct={acts.add} />
  }

  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-4 rounded-xl font-figtree">
      <section className="flex-1 bg-black/10 text-gray-300 rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wider">Outline</h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-black/30 text-white/80 hover:bg-black/40"
              variant="outline"
              onClick={() => {
                acts.add(story?.acts?.length ?? 0)
              }}
            >
              <PlusCircle size={18} className="" />
              Add Act
            </Button>
            <Button size="sm" className="bg-black/30 text-white/80 hover:bg-black/40" variant="outline">
              <View />
              Preview
            </Button>
            <Button size="sm" className="bg-black/30 text-white/80 hover:bg-black/40" variant="outline">
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {story &&
            story.acts &&
            story.acts.map((act: Act) => (
              <Card key={act.id} className="bg-black/20 border-gray-700">
                <CardHeader className="p-3.5 flex flex-row justify-between items-baseline">
                  <div>
                    <div className="flex flex-row items-baseline gap-1">
                      <Label className="text-xs text-gray-400">Act {act.order + 1}:</Label>
                      <InlineEdit
                        value={act.title}
                        onChange={(value) => {
                          acts.edit(act.id, { title: value }, act)
                        }}
                        fontSize="md"
                        weight="bolder"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-black/30 text-white/80 hover:bg-black/40"
                      variant="outline"
                      onClick={() => chapters.add(act.chapters.length, act.id)}
                    >
                      <PlusCircle size={16} />
                      Add Chapter
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-black/30 text-white/80 hover:bg-black/40" variant="outline">
                          <Trash2 size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Delete Act</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Are you sure you want to delete Act {act.order + 1}: {act.title}? This action cannot be
                            undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => acts.delete(act.id)}
                            className="bg-red-600 hover:bg-red-700"
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
                      <CardHeader className="py-3 px-2">
                        <div className="flex justify-between items-center">
                          <div className="">
                            <div className="flex items-baseline">
                              <Label className="text-xs text-gray-400">Chapter {chapter.order + 1}:</Label>
                              <InlineEdit
                                value={chapter.title}
                                onChange={(value) => {
                                  chapters.edit(chapter.id, { title: value })
                                }}
                                fontSize="md"
                                weight="bolder"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-black/30 text-white/80 hover:bg-black/40"
                              variant="outline"
                              onClick={() => scenes.add(chapter.scenes.length, chapter.id)}
                            >
                              <PlusCircle size={16} />
                              Add Scene
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-black/30 text-white/80 hover:bg-black/40"
                                  variant="outline"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Delete Chapter</DialogTitle>
                                  <DialogDescription className="text-gray-400">
                                    Are you sure you want to delete Chapter {chapter.order + 1}: {chapter.title}? This
                                    action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => {}}>
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => chapters.delete(chapter.id)}
                                    className="bg-red-600 hover:bg-red-700"
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
                              <div className="flex justify-between items-center">
                                <div className="flex flex-row items-baseline gap-1">
                                  <Label className="text-xs text-gray-400">Scene {scene.order + 1}:</Label>
                                  <InlineEdit
                                    value={scene.title}
                                    onChange={(value) => {
                                      scenes.edit(scene.id, { title: value })
                                    }}
                                    fontSize="md"
                                    weight="bolder"
                                  />
                                </div>

                                <div>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        className="bg-black/30 text-white/80 hover:bg-black/40"
                                        variant="outline"
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Delete Scene</DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                          Are you sure you want to delete Scene {scene.order + 1}: {scene.title}? This
                                          action cannot be undone.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => {}}>
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={() => scenes.delete(scene.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Delete
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <InlineEdit
                                value={scene.summary}
                                onChange={(value) => {
                                  scenes.edit(scene.id, { summary: value })
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
                                          className="group relative inline-flex items-center px-2 pr-6 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                        >
                                          {character.name}
                                          <span
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center cursor-pointer"
                                            onClick={() => scenes.characters.remove(scene.id, character.id)}
                                          >
                                            <X className="h-3 w-3" />
                                          </span>
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
                                          className="group relative inline-flex items-center px-2 pr-6 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                        >
                                          {location.name}
                                          <span
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center cursor-pointer"
                                            onClick={() => scenes.locations.remove(scene.id, location.id)}
                                          >
                                            <X className="h-3 w-3" />
                                          </span>
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>

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
                                        onClick={() => {
                                          scenes.characters.add(scene.id, character)
                                        }}
                                        className="hover:bg-gray-700"
                                      >
                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                        {character.name}
                                      </DropdownMenuItem>
                                    ))
                                    .concat(
                                      characters.filter((character) => {
                                        return !scene.characters.some((c) => c.id === character.id)
                                      }).length === 0
                                        ? [
                                            <DropdownMenuItem
                                              disabled
                                              className="text-gray-500"
                                              key="no-more-characters"
                                            >
                                              No more characters available
                                            </DropdownMenuItem>,
                                          ]
                                        : [],
                                    )}
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
                                  {locations.length > 0 &&
                                    locations
                                      .filter((location) => {
                                        return !scene.locations.some((c) => c.id === location.id)
                                      })
                                      .map((location) => (
                                        <DropdownMenuItem
                                          key={location.id}
                                          onClick={() => {
                                            scenes.locations.add(scene.id, location)
                                          }}
                                          className="hover:bg-gray-700"
                                        >
                                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                                          {location.name}
                                        </DropdownMenuItem>
                                      ))
                                      .concat(
                                        locations.filter((location) => {
                                          return !scene.locations.some((c) => c.id === location.id)
                                        }).length === 0
                                          ? [
                                              <DropdownMenuItem
                                                disabled
                                                className="text-gray-500"
                                                key="no-more-locations"
                                              >
                                                No more locations available
                                              </DropdownMenuItem>,
                                            ]
                                          : [],
                                      )}
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
    </section>
  )
}
