import { Character } from '@/features/characters/types/Character';
import { NarrativeLocation } from '@/features/locations/types/Location';
import { nanoid } from 'nanoid';

export type Act = {
  id: string;
  title: string;
  order: number;
  chapters: Chapter[];
};

export type Chapter = {
  id: string;
  actID: string;
  title: string;
  order: number;
  scenes: Scene[];
};

export type Scene = {
  id: string;
  chapterID: string;
  title: string;
  order: number;
  summary: string; // Summary of the scene for quick reference
  content: string; // Markdown content of the book for draft
  characters: Character[];
  locations: NarrativeLocation[];
};

export type Outline = {
  id: string;
  narrativeID: string;
  acts: Act[];
};


export function createNewOutline(narrativeID: string): Outline {
  return {
    id: `${nanoid(12)}-${nanoid(6)}`,
    narrativeID,
    acts: [],
  };
}

export function createNewAct(title: string, order: number): Act {
  return {
    id: `act-${nanoid(8)}-${nanoid(6)}`,
    title,
    order,
    chapters: [],
  };
}

export function createNewChapter(title: string, order: number, actID: string): Chapter {
  return {
    id: `chapter-${nanoid(8)}-${nanoid(6)}`,
    actID,
    title,
    order,
    scenes: [],
  };
}

export function createNewScene(title: string, order: number, chapterID: string): Scene {
  return {
    id: `scene-${nanoid(8)}-${nanoid(6)}`,
    chapterID,
    title,
    order,
    summary: '',
    content: '',
    characters: [],
    locations: [],
  };  
}