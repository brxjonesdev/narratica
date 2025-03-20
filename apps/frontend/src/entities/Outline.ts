import { Character } from "./Character";
import { Location } from "./Location";

export type Act = {
    id: string;
    narrativeID: string;
    title: string;
    order: number;
    chapters: Chapter[];
}

export type Chapter = {
    id: string;
    actID: string;
    title: string;
    order: number;
    scenes: Scene[];
}

export type Scene = {
    id: string;
    chapterID: string;
    title: string;
    order: number;
    content: string; // Markdown content of the book for draft
    characters: Character[];
    locations: Location [];
    labels: string[];
}

export type Outline = {
    id: string;
    narrativeID: string;
    acts: Act[];
}