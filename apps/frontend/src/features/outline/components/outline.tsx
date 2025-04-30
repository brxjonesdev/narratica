import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { PlusCircle, PlusCircleIcon, Trash2 } from 'lucide-react';
import type { Act, Chapter, Outline, Scene } from '@/features/outline/types/Outline';
import { InlineEdit } from '@/shared/inline-edit';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Separator } from '@/shared/ui/separator';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { NarrativeLocation } from '@/features/locations/types/Location';
import { Character } from '@/features/characters/types/Character';



type OutlineProps = {
story: Outline;
loading: boolean;
error: string | null;
acts: {
    add: (index: number) => Promise<void>;
    edit: (actID: string, editedAct: Partial<Act>, original: Act) => Promise<void>;
    delete: (actID: string) => Promise<void>;
};
chapters: {
    add: (index: number, actID: string) => Promise<void>;
    edit: (chapterID: string, editedChapter: Partial<Chapter>) => Promise<void>;
    delete: (chapterID: string, scenes: string[]) => Promise<void>;
};
scenes: {
    add: (index: number, chapterID: string) => Promise<void>;
    edit: (sceneID: string, editedScene: Partial<Scene>) => Promise<void>;
    delete: (sceneID: string) => Promise<void>;
    characters: {
        add: (sceneID: string, character: Partial<Character>) => Promise<void>;
        remove: (sceneID: string, characterID: string) => Promise<void>;
    };
    locations: {
        add: (sceneID: string, location: Partial<NarrativeLocation>) => Promise<void>;
        remove: (sceneID: string, locationID: string) => Promise<void>;
    };
};

locations: NarrativeLocation[];
characters: Character[];

}
export default function Outline(
    { story, acts, chapters, scenes, locations, characters}: OutlineProps
) {
  return (
    <>
    {story.acts.map((act: Act) => (
                <Card key={act.id} className="bg-black/20 border-gray-700">
                  <CardHeader className="p-3.5 flex flex-row justify-between items-baseline">
                    <div>
                      <div className="flex flex-row items-baseline gap-1">
                        <Label className="text-xs text-gray-400">Act {act.order + 1}:</Label>
                        <InlineEdit
                          value={act.title}
                          onChange={(value) => {
                            acts.edit(act.id, { title: value }, act);
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
                          <Button
                            size="sm"
                            className="bg-black/30 text-white/80 hover:bg-black/40"
                            variant="outline"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className=" text-white font-figtree">
                          <DialogHeader>
                            <DialogTitle>Delete Act</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Are you sure you want to delete Act {act.order + 1}: {act.title}
                              ? <br />
                              This will delete all associated chapters and scenes, and this
                              action cannot be undone.
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
                                <Label className="text-xs text-gray-400">
                                  Chapter {chapter.order + 1}:
                                </Label>
                                <InlineEdit
                                  value={chapter.title}
                                  onChange={(value) => {
                                    chapters.edit(chapter.id, { title: value });
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
                                <DialogContent className=" text-white font-figtree">
                                  <DialogHeader>
                                    <DialogTitle>Delete Chapter</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                      Are you sure you want to delete Chapter{' '}
                                      {chapter.order + 1}: {chapter.title}? <br /> This action
                                      cannot be undone. This will also delete all associated
                                      scenes as well.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => {}}>
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        chapters.delete(
                                          chapter.id,
                                          chapter.scenes.map((s) => s.id),
                                        )
                                      }
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
                                    <Label className="text-xs text-gray-400">
                                      Scene {scene.order + 1}:
                                    </Label>
                                    <InlineEdit
                                      value={scene.title}
                                      onChange={(value) => {
                                        scenes.edit(scene.id, { title: value });
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
                                      <DialogContent className=" text-white font-figtree">
                                        <DialogHeader>
                                          <DialogTitle>Delete Scene</DialogTitle>
                                          <DialogDescription className="text-gray-400">
                                            Are you sure you want to delete Scene{' '}
                                            {scene.order + 1}: {scene.title}? <br />
                                            This action cannot be undone.
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
                                    scenes.edit(scene.id, { summary: value });
                                  }}
                                  rows={6}
                                  fontSize="sm"
                                  weight="normal"
                                  mode="textarea"
                                />
    
                                <div className="pt-2 space-y-2">
                                  {scene.characters.length > 0 && (
                                    <div>
                                      <h4 className="text-xs font-semibold text-gray-400 mb-1">
                                        Characters:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {scene.characters.map((character) => (
                                          <span
                                            key={character.id}
                                            className="group relative inline-flex items-center px-2 pr-6 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                          >
                                            {character.name}
                                            <span
                                              className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center cursor-pointer"
                                              onClick={() =>
                                                scenes.characters.remove(
                                                  scene.id,
                                                  character.id,
                                                )
                                              }
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
                                      <h4 className="text-xs font-semibold text-gray-400 mb-1">
                                        Locations:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {scene.locations.map((location) => (
                                          <span
                                            key={location.id}
                                            className="group relative inline-flex items-center px-2 pr-6 py-1 rounded-md text-xs bg-black/20 text-white/90"
                                          >
                                            {location.name}
                                            <span
                                              className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center cursor-pointer"
                                              onClick={() =>
                                                scenes.locations.remove(scene.id, location.id)
                                              }
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
                                    <Button
                                      size="sm"
                                      className="py-1 h-fit"
                                      variant="outline"
                                    >
                                      <PlusCircleIcon className="mr-1 h-4 w-4" />
                                      Characters
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="font-figtree bg-gray-400 border-gray-700">
                                    <DropdownMenuLabel>
                                      Add Character to {scene.title}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    {characters
                                      .filter((character) => {
                                        return !scene.characters.some(
                                          (c) => c.id === character.id,
                                        );
                                      })
                                      .map((character) => (
                                        <DropdownMenuItem
                                          key={character.id}
                                          onClick={() => {
                                            scenes.characters.add(scene.id, character);
                                          }}
                                          className="hover:bg-gray-700"
                                        >
                                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                                          {character.name}
                                        </DropdownMenuItem>
                                      ))
                                      .concat(
                                        characters.filter((character) => {
                                          return !scene.characters.some(
                                            (c) => c.id === character.id,
                                          );
                                        }).length === 0
                                          ? [
                                              <DropdownMenuItem
                                                disabled
                                                className="text-cyan-100"
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
                                    <Button
                                      size="sm"
                                      className="py-1 h-fit"
                                      variant="outline"
                                    >
                                      <PlusCircleIcon className="mr-1 h-4 w-4" />
                                      Locations
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="font-figtree bg-gray-400 border-gray-700">
                                    <DropdownMenuLabel>
                                      Where does {scene.title} take place?
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-gray-700" />
                                    {locations
                                      .filter((location) => {
                                        return !scene.locations.some(
                                          (c) => c.id === location.id,
                                        );
                                      })
                                      .map((location) => (
                                        <DropdownMenuItem
                                          key={location.id}
                                          onClick={() => {
                                            scenes.locations.add(scene.id, location);
                                          }}
                                          className="hover:bg-gray-700"
                                        >
                                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                                          {location.name}
                                        </DropdownMenuItem>
                                      ))
                                      .concat(
                                        locations.filter((location) => {
                                          return !scene.locations.some(
                                            (c) => c.id === location.id,
                                          );
                                        }).length === 0
                                          ? [
                                              <DropdownMenuItem
                                                disabled
                                                className="text-cyan-100"
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
              ))}</>
  )
}
